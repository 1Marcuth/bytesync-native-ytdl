import axios, { AxiosProgressEvent } from "axios"

import fileToDataString from "./file-to-data-string"

export type OnDownloadProgress = ((progressEvent: AxiosProgressEvent) => void)

export type FetchFileDataOptions = {
    url: string
    onDownloadProgress?: OnDownloadProgress
}

async function fetchFileData({ url, onDownloadProgress }: FetchFileDataOptions) {
    const response = await axios.get(url, {
        responseType: "blob",
        headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36"
        },
        onDownloadProgress: onDownloadProgress
    })

    const data = await fileToDataString({ file: response.data })
    
    return data
}

export default fetchFileData