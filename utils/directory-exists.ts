import * as FileSystem  from "expo-file-system"

export type DirectoryExistsOptions = {
    path: string
}

async function directoryExists({ path }: DirectoryExistsOptions) {
    const info = await FileSystem.getInfoAsync(path)
    return info.exists
}

export default directoryExists