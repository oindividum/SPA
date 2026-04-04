
# FiddKeySection

Section information from FiddKey

## Properties

Name | Type
------------ | -------------
`sectionOffset` | number
`sectionLength` | number
`encryptionAlgorithm` | string
`encryptionKeyData` | string
`crcs` | [Array&lt;FiddSignature&gt;](FiddSignature.md)
`headerLength` | number

## Example

```typescript
import type { FiddKeySection } from ''

// TODO: Update the object below with actual values
const example = {
  "sectionOffset": null,
  "sectionLength": null,
  "encryptionAlgorithm": null,
  "encryptionKeyData": null,
  "crcs": null,
  "headerLength": null,
} satisfies FiddKeySection

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as FiddKeySection
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


