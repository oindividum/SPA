# MessagesApi

All URIs are relative to *http://localhost:8080*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**getFiddFileMetadata**](MessagesApi.md#getfiddfilemetadata) | **GET** /{fiddId}/messages/{messageNumber}/metadata | Get Fidd file metadata for a message |
| [**getFiddIds**](MessagesApi.md#getfiddids) | **GET** /instances | Get all managed Fidd instance IDs |
| [**getLogicalFileInfos**](MessagesApi.md#getlogicalfileinfos) | **GET** /{fiddId}/messages/{messageNumber}/logical-files | List logical files for a message |
| [**getMessageNumbersBefore**](MessagesApi.md#getmessagenumbersbefore) | **GET** /{fiddId}/messages/{messageNumber}/before | Get N message numbers before a given message (descending) |
| [**getMessageNumbersBetween**](MessagesApi.md#getmessagenumbersbetween) | **GET** /{fiddId}/messages/range | Get N message numbers between two bounds (descending) |
| [**getMessageNumbersTail**](MessagesApi.md#getmessagenumberstail) | **GET** /{fiddId}/messages/tail | Get latest N message numbers (descending) |



## getFiddFileMetadata

> FiddFileMetadata getFiddFileMetadata(fiddId, messageNumber)

Get Fidd file metadata for a message

### Example

```ts
import {
  Configuration,
  MessagesApi,
} from '';
import type { GetFiddFileMetadataRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new MessagesApi();

  const body = {
    // string | Name of the Fidd instance
    fiddId: fiddId_example,
    // number
    messageNumber: 789,
  } satisfies GetFiddFileMetadataRequest;

  try {
    const data = await api.getFiddFileMetadata(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **fiddId** | `string` | Name of the Fidd instance | [Defaults to `undefined`] |
| **messageNumber** | `number` |  | [Defaults to `undefined`] |

### Return type

[**FiddFileMetadata**](FiddFileMetadata.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Metadata found |  -  |
| **404** | Resource not found |  -  |
| **500** | Unexpected error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getFiddIds

> Array&lt;string&gt; getFiddIds()

Get all managed Fidd instance IDs

### Example

```ts
import {
  Configuration,
  MessagesApi,
} from '';
import type { GetFiddIdsRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new MessagesApi();

  try {
    const data = await api.getFiddIds();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters

This endpoint does not need any parameter.

### Return type

**Array<string>**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | List of Fidd IDs |  -  |
| **500** | Unexpected error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getLogicalFileInfos

> Array&lt;LogicalFileInfo&gt; getLogicalFileInfos(fiddId, messageNumber)

List logical files for a message

### Example

```ts
import {
  Configuration,
  MessagesApi,
} from '';
import type { GetLogicalFileInfosRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new MessagesApi();

  const body = {
    // string | Name of the Fidd instance
    fiddId: fiddId_example,
    // number
    messageNumber: 789,
  } satisfies GetLogicalFileInfosRequest;

  try {
    const data = await api.getLogicalFileInfos(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **fiddId** | `string` | Name of the Fidd instance | [Defaults to `undefined`] |
| **messageNumber** | `number` |  | [Defaults to `undefined`] |

### Return type

[**Array&lt;LogicalFileInfo&gt;**](LogicalFileInfo.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Logical files found |  -  |
| **404** | Resource not found |  -  |
| **500** | Unexpected error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getMessageNumbersBefore

> Array&lt;number&gt; getMessageNumbersBefore(fiddId, messageNumber, count, inclusive)

Get N message numbers before a given message (descending)

### Example

```ts
import {
  Configuration,
  MessagesApi,
} from '';
import type { GetMessageNumbersBeforeRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new MessagesApi();

  const body = {
    // string | Name of the Fidd instance
    fiddId: fiddId_example,
    // number
    messageNumber: 789,
    // number
    count: 56,
    // boolean | Include the given messageNumber if true
    inclusive: true,
  } satisfies GetMessageNumbersBeforeRequest;

  try {
    const data = await api.getMessageNumbersBefore(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **fiddId** | `string` | Name of the Fidd instance | [Defaults to `undefined`] |
| **messageNumber** | `number` |  | [Defaults to `undefined`] |
| **count** | `number` |  | [Defaults to `undefined`] |
| **inclusive** | `boolean` | Include the given messageNumber if true | [Defaults to `undefined`] |

### Return type

**Array<number>**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Message numbers in descending order |  -  |
| **404** | Resource not found |  -  |
| **400** | Invalid input |  -  |
| **500** | Unexpected error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getMessageNumbersBetween

> Array&lt;number&gt; getMessageNumbersBetween(fiddId, latestMessage, inclusiveLatest, earliestMessage, inclusiveEarliest, count, getLatest)

Get N message numbers between two bounds (descending)

Returns results in descending order. Use getLatest to select which side to favor when count is smaller than the range.

### Example

```ts
import {
  Configuration,
  MessagesApi,
} from '';
import type { GetMessageNumbersBetweenRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new MessagesApi();

  const body = {
    // string | Name of the Fidd instance
    fiddId: fiddId_example,
    // number
    latestMessage: 789,
    // boolean
    inclusiveLatest: true,
    // number
    earliestMessage: 789,
    // boolean
    inclusiveEarliest: true,
    // number
    count: 56,
    // boolean | If true, prefer newer messages when trimming to count
    getLatest: true,
  } satisfies GetMessageNumbersBetweenRequest;

  try {
    const data = await api.getMessageNumbersBetween(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **fiddId** | `string` | Name of the Fidd instance | [Defaults to `undefined`] |
| **latestMessage** | `number` |  | [Defaults to `undefined`] |
| **inclusiveLatest** | `boolean` |  | [Defaults to `undefined`] |
| **earliestMessage** | `number` |  | [Defaults to `undefined`] |
| **inclusiveEarliest** | `boolean` |  | [Defaults to `undefined`] |
| **count** | `number` |  | [Defaults to `undefined`] |
| **getLatest** | `boolean` | If true, prefer newer messages when trimming to count | [Defaults to `undefined`] |

### Return type

**Array<number>**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Message numbers in descending order within the range |  -  |
| **400** | Invalid input |  -  |
| **500** | Unexpected error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getMessageNumbersTail

> Array&lt;number&gt; getMessageNumbersTail(fiddId, count)

Get latest N message numbers (descending)

### Example

```ts
import {
  Configuration,
  MessagesApi,
} from '';
import type { GetMessageNumbersTailRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new MessagesApi();

  const body = {
    // string | Name of the Fidd instance
    fiddId: fiddId_example,
    // number | Number of message numbers to return
    count: 56,
  } satisfies GetMessageNumbersTailRequest;

  try {
    const data = await api.getMessageNumbersTail(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **fiddId** | `string` | Name of the Fidd instance | [Defaults to `undefined`] |
| **count** | `number` | Number of message numbers to return | [Defaults to `undefined`] |

### Return type

**Array<number>**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Message numbers in descending order |  -  |
| **400** | Invalid input |  -  |
| **500** | Unexpected error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

