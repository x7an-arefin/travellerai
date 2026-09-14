import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: ['./src/modules/**/*.schema.ts', './src/core/auth/auth.schema.ts'],
  out: './drizzle/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env['DATABASE_URL'] ?? '',
  },
  verbose: true,
  strict: true,
});
