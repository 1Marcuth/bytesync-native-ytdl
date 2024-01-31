import { Format2 as VideoRawFormat } from "ytdl-native/lib/info"
import axios from "axios"

export type ParseVideoFormatsOptions = {
    formats: VideoRawFormat[]
}

export type ParsedVideoFormat = {
    quality: string
    mimeType: string
    fps: number
    size?: number
    fileExtension: string
    itag: number
    hasAudio: boolean
}

async function parseVideoFormats({ formats }: ParseVideoFormatsOptions): Promise<ParsedVideoFormat[]> {
    const parsedFormats: ParsedVideoFormat[] = (
        await Promise.all(
            formats
                .filter((format: any) => format.quality && format.fps && format.qualityLabel)
                .map(async (format: any) => {
                    const videoInfoFormat: ParsedVideoFormat = {
                        quality: format.qualityLabel,
                        mimeType: format.mimeType,
                        fps: format.fps,
                        fileExtension: format.container,
                        itag: format.itag,
                        hasAudio: format.audioChannels ? true : false
                    }

                    try {
                        const response = await axios.head(format.url)
                        const contentLength = response.headers["content-length"]
                        videoInfoFormat.size = Number(contentLength)
                    } catch (error) {
                        console.log("> [app] Erro ao obter o tamanho do arquivo:", error)
                    }

                    return videoInfoFormat
                })
        )
    )

    return parsedFormats
}

export default parseVideoFormats