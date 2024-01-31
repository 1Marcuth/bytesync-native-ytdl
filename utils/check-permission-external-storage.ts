import * as MediaLibrary from "expo-media-library"

async function checkPermissionExternalStorage(): Promise<boolean> {
    const permission = await MediaLibrary.getPermissionsAsync()

    if (permission.status != "granted") {
        const perm = await MediaLibrary.requestPermissionsAsync()
        if (perm.status !== "granted") return false
    }

    return true
}

export default checkPermissionExternalStorage