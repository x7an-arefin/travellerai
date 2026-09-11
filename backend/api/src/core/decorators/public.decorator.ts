import 'reflect-metadata';

export const IS_PUBLIC_KEY = 'isPublic';

export type CustomDecorator = (
  target: object,
  key?: string | symbol,
  descriptor?: any,
) => any;

/**
 * @author arefin
 * @description Decorator to attach arbitrary metadata to classes or route handlers
 */
export const SetMetadata = <K = string, V = unknown>(metadataKey: K, metadataValue: V): CustomDecorator => {
  return (target: object, _key?: string | symbol, descriptor?: any): any => {
    if (descriptor) {
      Reflect.defineMetadata(metadataKey, metadataValue, descriptor.value);
      return descriptor;
    }
    Reflect.defineMetadata(metadataKey, metadataValue, target);
    return target;
  };
};

/**
 * @author arefin
 * @description Mark a route handler as publicly accessible, bypassing the global AuthGuard
 */
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
