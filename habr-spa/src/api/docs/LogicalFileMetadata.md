
# LogicalFileMetadata

Metadata for a logical file

## Properties

Name | Type
------------ | -------------
`updateType` | string
`filePath` | string
`createdAt` | number
`updatedAt` | number
`authorsFileSignatures` | [Array&lt;FiddSignature&gt;](FiddSignature.md)
`progressiveCrcs` | [Array&lt;ProgressiveCrc&gt;](ProgressiveCrc.md)
`externalLinks` | [Array&lt;ExternalResource&gt;](ExternalResource.md)

## Example

```typescript
import type { LogicalFileMetadata } from ''

// TODO: Update the object below with actual values
const example = {
  "updateType": null,
  "filePath": null,
  "createdAt": null,
  "updatedAt": null,
  "authorsFileSignatures": null,
  "progressiveCrcs": null,
  "externalLinks": null,
} satisfies LogicalFileMetadata

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as LogicalFileMetadata
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


