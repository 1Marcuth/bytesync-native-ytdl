import * as FileSystem from "expo-file-system"

import checkPermissionExternalStorage from "./check-permission-external-storage"
import fetchFileData, { OnDownloadProgress } from "./fetch-file-data"
import directoryExists from "./directory-exists"
import writeFileData from "./write-file-data"

export class NoPermissionToWriteToExternalStorageError extends Error {
    public constructor() {
        super("Permission to write to external storage not granted.")
    }
}

export type DownloadFileOptions = {
    sourceUri: string
    fileName: string
    onDownloadProgress?: OnDownloadProgress
}

async function downloadFile({
    sourceUri,
    fileName,
    onDownloadProgress
}: DownloadFileOptions): Promise<void> {
    const hasPermission = await checkPermissionExternalStorage()

    if (!hasPermission) {
        throw new NoPermissionToWriteToExternalStorageError()
    }

    const fileDirectory: string = `${FileSystem.documentDirectory}ByteSyncNYtdl`
    const fileUri: string = `${fileDirectory}/${fileName}`

    const fileDirectoryExists = await directoryExists({ path: fileDirectory })

    if (!fileDirectoryExists) {
        await FileSystem.makeDirectoryAsync(fileDirectory)
    }
    
    const data = await fetchFileData({
        url: sourceUri,
        onDownloadProgress: onDownloadProgress
    })

    await writeFileData({ data: data, outputUri: fileUri })
}

export default downloadFile