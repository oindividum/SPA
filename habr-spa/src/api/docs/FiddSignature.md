
# FiddSignature

A signature or checksum

## Properties

Name | Type
------------ | -------------
`format` | string
`bytes` | string

## Example

```typescript
import type { FiddSignature } from ''

// TODO: Update the object below with actual values
const example = {
  "format": CRC32,
  "bytes": null,
} satisfies FiddSignature

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as FiddSignature
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


