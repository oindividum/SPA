
# LogicalFileInfo

Describes a logical file within a message

## Properties

Name | Type
------------ | -------------
`metadata` | [LogicalFileMetadata](LogicalFileMetadata.md)
`section` | [FiddKeySection](FiddKeySection.md)
`fileOffset` | number

## Example

```typescript
import type { LogicalFileInfo } from ''

// TODO: Update the object below with actual values
const example = {
  "metadata": null,
  "section": null,
  "fileOffset": null,
} satisfies LogicalFileInfo

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as LogicalFileInfo
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


