# Add @deprecated annotation support to Generated Types

## Overview
This PR implements the requested feature to add @deprecated annotations to generated TypeScript types. The implementation handles both deprecated endpoints and deprecated schemas in OpenAPI specifications.

## Changes
- Added support for `@deprecated` JSDoc annotations on deprecated operations
- Added support for `@deprecated` JSDoc annotations on deprecated schemas
- Implemented handling of nested deprecated properties in complex schemas
- Added comprehensive test suite with example deprecated APIs

## Examples

### 1. Deprecated API Endpoints
When an API endpoint is marked as deprecated in the OpenAPI spec:
```yaml
paths:
  /pets/v1:
    get:
      deprecated: true
      operationId: getPetsV1
```

The generated TypeScript includes the appropriate JSDoc annotation:
```typescript
/**
 * @deprecated
 * getPetsV1 - Returns all pets in database - use v2 endpoint instead
 */
getPetsV1(parameters?: Parameters<...>): OperationResponse<...>;
```

### 2. Deprecated Schema Types
When a schema type is marked as deprecated with migration notes:
```yaml
components:
  schemas:
    PagingV1:
      deprecated: true
      description: Use the new 'PagingV2' type which includes cursor-based pagination
      type: object
      properties:
        offset:
          type: integer
        limit:
          type: integer
```

The generated TypeScript preserves the deprecation notice and migration guidance:
```typescript
/**
 * @deprecated
 * Use the new 'PagingV2' type which includes cursor-based pagination
 */
export interface PagingV1 {
    offset: number;
    limit: number;
}
```

### 3. Deprecated Properties
Individual properties can also be marked as deprecated with migration guidance:
```yaml
    PetV2:
      type: object
      properties:
        legacyDetails:
          deprecated: true
          description: Use the new 'details' field instead
          type: object
          properties:
            color:
              type: string
```

The generated TypeScript includes property-level deprecation notices:
```typescript
export interface PetV2 {
    /**
     * @deprecated
     * Use the new 'details' field instead
     */
    legacyDetails?: {
        color: string;
    };
    // ... other properties
}
```

## Testing
- Added new test file `deprecated.test.ts` specifically for deprecated type scenarios
- Tests cover both operation and schema deprecation
- Tests verify proper JSDoc annotation formatting
- Includes test cases for nested deprecated properties

## Implementation Details
- Modifies operation generation to check and add `@deprecated` annotations
- Processes schemas recursively to handle nested deprecated properties
- Preserves existing descriptions while adding deprecation notices
- Uses OpenAPI's standard `deprecated: true` flag for detection

## Breaking Changes
None. This is a non-breaking enhancement that only adds deprecation annotations where specified in the OpenAPI schema.
