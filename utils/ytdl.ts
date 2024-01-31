import { VideoBasicInfo, VideoInfo } from "ytdl-native/lib/info"
import ytdl from "ytdl-native"

export type YtdlProps = {
    url: string
}

type UrlData = {
    headers: any[]
    url: string
}

type GetInfoOptions = {
    options: any
}

type GetDownloadUrlsOptions = {
    options: any
}

const getInfoDefaultOptions = {
    options: {}
}

class Ytdl {
    public props: YtdlProps

    public constructor(props: YtdlProps) {
        this.props = props
    }

    public async getInfo(
        { options = {} }: GetInfoOptions = getInfoDefaultOptions
    ): Promise<VideoInfo> {
        const videoInfo = await ytdl.getInfo(this.props.url, options)
        return videoInfo
    }

    public async getBasicInfo(
        { options = {} }: GetInfoOptions = getInfoDefaultOptions
    ): Promise<VideoBasicInfo> {
        const videoBasicInfo = await ytdl.getBasicInfo(this.props.url, options)
        return videoBasicInfo
    }

    public async getDownloadUrls({ options }: GetDownloadUrlsOptions): Promise<string[]> {
        const downloadUrlsData = await ytdl(this.props.url, options) as UrlData[]
        const downloadUrls: string[] = downloadUrlsData.map(urlData => urlData.url)
        return downloadUrls
    }
}

export default Ytdl