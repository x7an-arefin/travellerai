import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import { loadSpecification } from './dist/lib/specification-loader/index.js';
import { normalizeSpecification } from './dist/lib/normalizer/index.js';
import { renderTemplate } from './dist/lib/template-engine/index.js';

const TARGET_API_DIR = path.resolve(__dirname, '../api');
const SPEC_FILE = path.resolve(__dirname, 'traveller-application.json');
const TARGET_NAMES_FILE = path.resolve(__dirname, 'schemas/hotel-vehicle-entity-names.json');

console.log('🚀 Loading application specification from:', SPEC_FILE);
const { raw, errors } = loadSpecification(SPEC_FILE);
if (errors.length > 0) {
  console.error('❌ Specification load errors:', errors);
  process.exit(1);
}

console.log('📋 Normalizing specification IR...');
const ir = normalizeSpecification(raw);

const targetNames = JSON.parse(fs.readFileSync(TARGET_NAMES_FILE, 'utf-8'));
const entitiesToGenerate = ir.entities.filter((e) => targetNames.includes(e.name));

console.log(`🎯 Found ${entitiesToGenerate.length} Hotel & Vehicle entities to generate.`);

function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function writeFileIfChanged(filePath, content) {
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, content, 'utf-8');
}

let generatedFileCount = 0;

for (const entity of entitiesToGenerate) {
  const baseDir = path.resolve(TARGET_API_DIR, 'src/modules', entity.nameKebab);
  ensureDir(baseDir);

  const ctx = { ir, entity };

  // 1. Entity files
  writeFileIfChanged(path.join(baseDir, `${entity.nameKebab}.schema.ts`), renderTemplate('entity/schema.ts.ejs', ctx));
  writeFileIfChanged(path.join(baseDir, `${entity.nameKebab}.types.ts`), renderTemplate('entity/types.ts.ejs', ctx));
  writeFileIfChanged(path.join(baseDir, `${entity.nameKebab}.repository.ts`), renderTemplate('entity/repository.ts.ejs', ctx));
  writeFileIfChanged(path.join(baseDir, `${entity.nameKebab}.events.ts`), renderTemplate('entity/events.ts.ejs', ctx));
  writeFileIfChanged(path.join(baseDir, `${entity.nameKebab}.module.ts`), renderTemplate('entity/module.ts.ejs', ctx));
  writeFileIfChanged(path.join(baseDir, `${entity.nameKebab}.controller.ts`), renderTemplate('entity/controller.ts.ejs', ctx));
  writeFileIfChanged(path.join(baseDir, `${entity.nameKebab}.service.ts`), renderTemplate('entity/service.ts.ejs', ctx));
  generatedFileCount += 7;

  // 2. Endpoints
  for (const op of entity.operations) {
    const opDir = path.join(baseDir, op.operation);
    ensureDir(opDir);
    const fileBase = `${op.operation}-${entity.nameKebab}`;
    const opCtx = { ir, entity, operation: op };

    writeFileIfChanged(path.join(opDir, `${fileBase}.input.ts`), renderTemplate('endpoint/input.ts.ejs', opCtx));
    writeFileIfChanged(path.join(opDir, `${fileBase}.output.ts`), renderTemplate('endpoint/output.ts.ejs', opCtx));
    writeFileIfChanged(path.join(opDir, `${fileBase}.pre.ts`), renderTemplate('endpoint/pre.ts.ejs', opCtx));
    writeFileIfChanged(path.join(opDir, `${fileBase}.process.ts`), renderTemplate('endpoint/process.ts.ejs', opCtx));
    writeFileIfChanged(path.join(opDir, `${fileBase}.post.ts`), renderTemplate('endpoint/post.ts.ejs', opCtx));
    writeFileIfChanged(path.join(opDir, `${fileBase}.test.ts`), renderTemplate('endpoint/test.ts.ejs', opCtx));
    generatedFileCount += 6;
  }

  console.log(`  ✅ Generated: ${entity.namePascal} (${entity.operations.length} endpoints)`);
}

console.log(`\n🎉 Generated ${generatedFileCount} files for 25 entities.`);

// 3. Update app.module.ts in backend/api
console.log('🔄 Updating app.module.ts with new modules...');
const appModulePath = path.resolve(TARGET_API_DIR, 'src/app.module.ts');
let appModuleContent = fs.readFileSync(appModulePath, 'utf-8');

const newImports = [];
const newModuleNames = [];

for (const entity of entitiesToGenerate) {
  const modName = `${entity.namePascal}Module`;
  const importStatement = `import { ${modName} } from '@modules/${entity.nameKebab}/${entity.nameKebab}.module.js';`;
  if (!appModuleContent.includes(importStatement)) {
    newImports.push(importStatement);
    newModuleNames.push(modName);
  }
}

if (newImports.length > 0) {
  const lastImportIndex = appModuleContent.lastIndexOf('import ');
  const endOfLastImport = appModuleContent.indexOf(';', lastImportIndex) + 1;
  const beforeImports = appModuleContent.slice(0, endOfLastImport);
  const afterImports = appModuleContent.slice(endOfLastImport);

  const updatedImports = beforeImports + '\n' + newImports.join('\n') + afterImports;

  // Insert module names into @Module({ imports: [ ... ] })
  const importsRegex = /(@Module\s*\(\s*\{\s*imports\s*:\s*\[)([\s\S]*?)(\]\s*,\s*\}\s*\))/;
  const match = updatedImports.match(importsRegex);
  if (match) {
    const existingList = match[2].trim();
    const combinedList = existingList ? `${existingList}, ${newModuleNames.join(', ')}` : newModuleNames.join(', ');
    const finalModuleContent = updatedImports.replace(importsRegex, `$1${combinedList}$3`);
    fs.writeFileSync(appModulePath, finalModuleContent, 'utf-8');
    console.log(`  ✅ Added ${newModuleNames.length} modules to app.module.ts`);
  } else {
    console.warn('  ⚠️ Could not find @Module imports array to update automatically.');
  }
} else {
  console.log('  ℹ️ All modules already registered in app.module.ts');
}

// 4. Update openapi.json
console.log('📄 Updating openapi.json...');
function buildOpenApiDocument(allIr) {
  const paths = {};
  const schemas = {};

  for (const entity of allIr.entities) {
    schemas[entity.namePascal] = buildEntitySchema(entity);
    schemas[`New${entity.namePascal}`] = buildCreateSchema(entity);
    schemas[`Update${entity.namePascal}`] = buildUpdateSchema(entity);

    for (const op of entity.operations) {
      const pathKey = op.fullPath.replace(/:(\w+)/g, '{$1}');
      if (!paths[pathKey]) paths[pathKey] = {};
      paths[pathKey][op.method.toLowerCase()] = buildOperation(entity, op);
    }
  }

  return {
    openapi: '3.1.0',
    info: {
      title: allIr.application.name,
      version: '1.0.0',
      description: `API for ${allIr.application.name} — generated from application.json`,
    },
    servers: [{ url: 'https://api.travellerai.com', description: 'Production API' }],
    paths,
    components: {
      schemas: {
        ...schemas,
        ErrorResponse: {
          type: 'object',
          required: ['error', 'message', 'correlationId'],
          properties: {
            error: { type: 'string' },
            message: { type: 'string' },
            correlationId: { type: 'string' },
          },
        },
      },
      securitySchemes: {
        bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      },
    },
  };
}

function fieldToJsonSchema(field) {
  switch (field.type) {
    case 'uuid': return { type: 'string', format: 'uuid' };
    case 'string': return { type: 'string', ...(field.minLength && { minLength: field.minLength }), ...(field.maxLength && { maxLength: field.maxLength }) };
    case 'text': return { type: 'string' };
    case 'integer': return { type: 'integer' };
    case 'bigint': return { type: 'integer', format: 'int64' };
    case 'decimal': return { type: 'string', pattern: '^\\d+(\\.\\d+)?$' };
    case 'boolean': return { type: 'boolean' };
    case 'timestamp': return { type: 'string', format: 'date-time' };
    case 'enum': return { type: 'string', enum: field.enumValues ?? [] };
    case 'json': return { type: 'object', additionalProperties: true };
    default: return { type: 'string' };
  }
}

function buildEntitySchema(entity) {
  const properties = {};
  const required = [];
  for (const field of entity.fields) {
    properties[field.nameCamel] = fieldToJsonSchema(field);
    if (!field.nullable && field.type !== 'timestamp') required.push(field.nameCamel);
  }
  return { type: 'object', required, properties };
}

function buildCreateSchema(entity) {
  const properties = {};
  const required = [];
  const createFields = entity.fields.filter((f) => !f.primary && f.generated === false);
  for (const field of createFields) {
    properties[field.nameCamel] = fieldToJsonSchema(field);
    if (field.required) required.push(field.nameCamel);
  }
  return { type: 'object', required, properties };
}

function buildUpdateSchema(entity) {
  const properties = {};
  const updateFields = entity.fields.filter((f) => !f.primary && f.generated === false);
  for (const field of updateFields) {
    properties[field.nameCamel] = fieldToJsonSchema(field);
  }
  return { type: 'object', minProperties: 1, properties };
}

function buildOperation(entity, op) {
  const tags = [entity.namePascal];
  const security = op.auth ? [{ bearerAuth: [] }] : [];
  const operationId = `${op.operation}${entity.namePascal}`;
  const responses = {
    '4XX': { description: 'Client error', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
    '500': { description: 'Server error', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
  };

  switch (op.operation) {
    case 'create':
      responses['201'] = { description: `${entity.namePascal} created`, content: { 'application/json': { schema: { $ref: `#/components/schemas/${entity.namePascal}` } } } };
      return { operationId, summary: `Create a ${entity.name}`, tags, security, requestBody: { required: true, content: { 'application/json': { schema: { $ref: `#/components/schemas/New${entity.namePascal}` } } } }, responses };
    case 'get':
      responses['200'] = { description: `${entity.namePascal} found`, content: { 'application/json': { schema: { $ref: `#/components/schemas/${entity.namePascal}` } } } };
      return { operationId, summary: `Get a ${entity.name} by ID`, tags, security, parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string', format: 'uuid' } }], responses };
    case 'list':
      responses['200'] = { description: `List of ${entity.namePluralKebab}`, content: { 'application/json': { schema: { type: 'object', properties: { items: { type: 'array', items: { $ref: `#/components/schemas/${entity.namePascal}` } }, nextCursor: { type: 'string', nullable: true }, hasMore: { type: 'boolean' } } } } } };
      return { operationId, summary: `List ${entity.namePluralKebab}`, tags, security, parameters: [{ in: 'query', name: 'cursor', schema: { type: 'string' } }, { in: 'query', name: 'limit', schema: { type: 'integer', default: 20, maximum: 100 } }], responses };
    case 'update':
      responses['200'] = { description: `${entity.namePascal} updated`, content: { 'application/json': { schema: { $ref: `#/components/schemas/${entity.namePascal}` } } } };
      return { operationId, summary: `Update a ${entity.name}`, tags, security, parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string', format: 'uuid' } }], requestBody: { required: true, content: { 'application/json': { schema: { $ref: `#/components/schemas/Update${entity.namePascal}` } } } }, responses };
    case 'delete':
      responses['204'] = { description: `${entity.namePascal} deleted` };
      return { operationId, summary: `Delete a ${entity.name}`, tags, security, parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string', format: 'uuid' } }], responses };
  }
}

const openApiDoc = buildOpenApiDocument(ir);
const openApiPath = path.resolve(TARGET_API_DIR, 'openapi.json');
fs.writeFileSync(openApiPath, JSON.stringify(openApiDoc, null, 2), 'utf-8');
console.log(`  ✅ Written updated openapi.json to ${openApiPath}`);

console.log('\n✨ Backend foundation generation completed successfully!');
