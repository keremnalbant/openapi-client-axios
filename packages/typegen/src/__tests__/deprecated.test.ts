import path from 'path';
import { generateTypesForDocument } from '../typegen';

const deprecatedAPIYAML = path.join(__dirname, 'resources', 'deprecated-test-api.openapi.yml');

describe('typegen with deprecated elements', () => {
  let schemaTypes: string;
  let operationTypings: string;

  beforeAll(async () => {
    const types = await generateTypesForDocument(deprecatedAPIYAML, {
      transformOperationName: (operationId: string) => operationId,
    });
    schemaTypes = types[1];
    operationTypings = types[2];
  });

  test('adds @deprecated JSDoc to deprecated schemas', () => {
    expect(schemaTypes).toMatch(/\/\*\*\s*\n\s*\*\s*@deprecated\s*\n\s*\*\/\s*\nexport interface PetV1/);
  });

  test('adds @deprecated JSDoc to deprecated operations', () => {
    expect(operationTypings).toMatch(/\/\*\*\s*\n\s*\*\s*@deprecated.*\n\s*\*\/\s*\n.*getPetsV1/);
  });

  test('adds @deprecated JSDoc to nested deprecated properties with descriptions', () => {
    // Check legacyDetails property with description
    expect(schemaTypes).toMatch(/legacyDetails:.*\/\*\*\s*\n\s*\*\s*@deprecated\s*\n\s*\*\s*Use the new 'details' field instead\s*\n\s*\*\//s);
    
    // Check status field with description
    expect(schemaTypes).toMatch(/status:.*\/\*\*\s*\n\s*\*\s*@deprecated\s*\n\s*\*\s*Use 'healthStatus' field instead\s*\n\s*\*\//s);
  });

  test('adds @deprecated JSDoc to deprecated schema types with migration notes', () => {
    // Check PagingV1 type deprecation with migration notes
    expect(schemaTypes).toMatch(/\/\*\*\s*\n\s*\*\s*@deprecated\s*\n\s*\*\s*Use the new 'PagingV2' type which includes cursor-based pagination\s*\n\s*\*\/\s*\nexport interface PagingV1/s);
  });
});
