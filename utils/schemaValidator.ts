import Ajv from 'ajv';

const ajv = new Ajv();

export function validateSchema(data: unknown, schema: object): void {
  const valid = ajv.validate(schema, data);
  if (!valid) {
    throw new Error(`Schema validation failed:\n${ajv.errorsText()}`);
  }
}