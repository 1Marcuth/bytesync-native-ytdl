import * as FileSystem from "expo-file-system"

export type WriteFileDataOptions = {
    data: string
    outputUri: string
}

async function writeFileData({
    data,
    outputUri
}: WriteFileDataOptions): Promise<void> {
    await FileSystem.writeAsStringAsync(outputUri, data, {
        encoding: FileSystem.EncodingType.Base64
    })
}

export default writeFileData