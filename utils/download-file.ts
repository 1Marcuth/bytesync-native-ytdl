import * as FileSystem from "expo-file-system"

async function downloadFile(fileUri: string, fileName: string) {
    const localUri = `${FileSystem.documentDirectory}${fileName}`
    console.log(`Baixando arquivo da fonte '${fileUri}' para '${localUri}'`)

    try {
        const { uri } = await FileSystem.downloadAsync(fileUri, localUri)
        console.log("Arquivo baixado para:", uri)
    } catch (error) {
        console.error("Erro ao baixar o arquivo:", error)
    }
}

export default downloadFile