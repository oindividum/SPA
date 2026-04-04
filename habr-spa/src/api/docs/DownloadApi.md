# DownloadApi

All URIs are relative to *http://localhost:8080*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**readLogicalFile**](DownloadApi.md#readlogicalfile) | **GET** /{fiddId}/{messageNumber}/{logicalFilePath} | Read logical file content (full or partial via Range header) |



## readLogicalFile

> Blob readLogicalFile(fiddId, messageNumber, logicalFilePath, range, list, filterIn, filterOut, sort, includeSubfolders)

Read logical file content (full or partial via Range header)

Supports HTTP Range requests for partial content retrieval. Use the standard &#x60;Range&#x60; header (e.g., &#x60;Range: bytes&#x3D;0-1023&#x60;) to request specific byte ranges. 

### Example

```ts
import {
  Configuration,
  DownloadApi,
} from '';
import type { ReadLogicalFileRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new DownloadApi();

  const body = {
    // string | Name of the Fidd instance
    fiddId: fiddId_example,
    // number
    messageNumber: 789,
    // string | Logical file path in Fidd message (URL-encoded)
    logicalFilePath: logicalFilePath_example,
    // string | HTTP Range header for partial content (e.g., \"bytes=0-1023\", \"bytes=500-\", \"bytes=-500\") (optional)
    range: bytes=0-1023,
    // 'm3u' | When set to \"m3u\", returns an M3U playlist of files under the specified folder path instead of file content. The logicalFilePath should be a folder path in this case.  (optional)
    list: list_example,
    // Array<string> | For m3u playlist: Only include files matching these glob patterns (e.g., \"*.mp4\", \"*.mkv\"). Supports wildcards: * (zero or more chars), ? (single char).  (optional)
    filterIn: ...,
    // Array<string> | For m3u playlist: Exclude files matching these glob patterns. Higher priority than filterIn.  (optional)
    filterOut: ...,
    // 'NUMERICAL_ASC' | 'NUMERICAL_DESC' | 'ALPHABETICAL_ASC' | 'ALPHABETICAL_DESC' | For m3u playlist: Sorting order for playlist entries. NUMERICAL sorts by numeric prefix in filenames.  (optional)
    sort: sort_example,
    // boolean | For m3u playlist: If true, include files from subfolders recursively.  (optional)
    includeSubfolders: true,
  } satisfies ReadLogicalFileRequest;

  try {
    const data = await api.readLogicalFile(body);
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
| **logicalFilePath** | `string` | Logical file path in Fidd message (URL-encoded) | [Defaults to `undefined`] |
| **range** | `string` | HTTP Range header for partial content (e.g., \&quot;bytes&#x3D;0-1023\&quot;, \&quot;bytes&#x3D;500-\&quot;, \&quot;bytes&#x3D;-500\&quot;) | [Optional] [Defaults to `undefined`] |
| **list** | `m3u` | When set to \&quot;m3u\&quot;, returns an M3U playlist of files under the specified folder path instead of file content. The logicalFilePath should be a folder path in this case.  | [Optional] [Defaults to `undefined`] [Enum: m3u] |
| **filterIn** | `Array<string>` | For m3u playlist: Only include files matching these glob patterns (e.g., \&quot;*.mp4\&quot;, \&quot;*.mkv\&quot;). Supports wildcards: * (zero or more chars), ? (single char).  | [Optional] |
| **filterOut** | `Array<string>` | For m3u playlist: Exclude files matching these glob patterns. Higher priority than filterIn.  | [Optional] |
| **sort** | `NUMERICAL_ASC`, `NUMERICAL_DESC`, `ALPHABETICAL_ASC`, `ALPHABETICAL_DESC` | For m3u playlist: Sorting order for playlist entries. NUMERICAL sorts by numeric prefix in filenames.  | [Optional] [Defaults to `&#39;NUMERICAL_ASC&#39;`] [Enum: NUMERICAL_ASC, NUMERICAL_DESC, ALPHABETICAL_ASC, ALPHABETICAL_DESC] |
| **includeSubfolders** | `boolean` | For m3u playlist: If true, include files from subfolders recursively.  | [Optional] [Defaults to `false`] |

### Return type

**Blob**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/octet-stream`, `text/plain`, `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | File content, or M3U playlist (when list&#x3D;m3u).  For file downloads: - Returns binary content with appropriate Content-Type based on file extension - Includes caching headers (Last-Modified, Expires, Cache-Control)  For M3U playlists: - Returns text/plain content with Content-Disposition attachment header  |  * Accept-Ranges - Indicates that byte-range requests are supported (file download only) <br>  * Content-Length - Total size of the file or m3u list in bytes <br>  * Content-Disposition - Attachment header for M3U playlist download (e.g., \&quot;attachment; filename&#x3D;\\\&quot;playlist.m3u\\\&quot;\&quot;) <br>  * Content-Type - Type of content returned (e.g., \&quot;application/octet-stream\&quot; for files, \&quot;text/plain\&quot; for M3U) <br>  |
| **206** | Partial content (when Range header is provided) |  * Accept-Ranges -  <br>  * Content-Range - Byte range returned (e.g., \&quot;bytes 0-1023/5000\&quot;) <br>  * Content-Length - Size of the returned content in bytes <br>  * Content-Type - Type of content returned (e.g., \&quot;application/octet-stream\&quot; for files, \&quot;text/plain\&quot; for M3U) <br>  |
| **404** | Resource not found |  -  |
| **400** | Invalid input |  -  |
| **416** | Range not satisfiable (requested range is outside the file bounds) |  * Content-Range - Indicates the total file size (e.g., \&quot;bytes *_/5000\&quot;) <br>  |
| **500** | Unexpected error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

