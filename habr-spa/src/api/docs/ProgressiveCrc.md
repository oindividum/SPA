
# ProgressiveCrc

Progressive CRC checksum for streaming verification

## Properties

Name | Type
------------ | -------------
`format` | string
`bytes` | string
`progressiveCrcChunkSize` | number

## Example

```typescript
import type { ProgressiveCrc } from ''

// TODO: Update the object below with actual values
const example = {
  "format": CRC32,
  "bytes": null,
  "progressiveCrcChunkSize": null,
} satisfies ProgressiveCrc

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ProgressiveCrc
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


