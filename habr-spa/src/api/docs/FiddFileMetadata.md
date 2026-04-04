
# FiddFileMetadata

Metadata for a message in the Fidd file system

## Properties

Name | Type
------------ | -------------
`messageNumber` | number
`originalMessageNumber` | number
`previousMessageNumber` | number
`postId` | string
`versionNumber` | number
`isNewOrSquash` | boolean
`isDelete` | boolean
`originalMessageCreationTime` | number
`messageCreationTime` | number
`authorsPublicKeyFormat` | string
`authorsPublicKey` | string
`authorsFiddFileSignatureFormats` | Array&lt;string&gt;
`authorsFiddKeyFileSignatureFormats` | Array&lt;string&gt;

## Example

```typescript
import type { FiddFileMetadata } from ''

// TODO: Update the object below with actual values
const example = {
  "messageNumber": 123456789,
  "originalMessageNumber": 123456789,
  "previousMessageNumber": 123456789,
  "postId": null,
  "versionNumber": null,
  "isNewOrSquash": null,
  "isDelete": null,
  "originalMessageCreationTime": null,
  "messageCreationTime": null,
  "authorsPublicKeyFormat": null,
  "authorsPublicKey": null,
  "authorsFiddFileSignatureFormats": null,
  "authorsFiddKeyFileSignatureFormats": null,
} satisfies FiddFileMetadata

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as FiddFileMetadata
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


