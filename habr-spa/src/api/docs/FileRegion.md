
# FileRegion

Region of a file in an external resource

## Properties

Name | Type
------------ | -------------
`offset` | number
`length` | number
`regionFileName` | string
`resourceDescriptorType` | string
`resourceDescriptor` | string

## Example

```typescript
import type { FileRegion } from ''

// TODO: Update the object below with actual values
const example = {
  "offset": null,
  "length": null,
  "regionFileName": null,
  "resourceDescriptorType": null,
  "resourceDescriptor": null,
} satisfies FileRegion

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as FileRegion
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


