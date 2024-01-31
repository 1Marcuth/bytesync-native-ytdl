import * as ProgressBar from "react-native-progress"
import { View, Text } from "react-native"
import { FC, useState } from "react"

import { ParsedVideoFormat } from "../../utils/parse-video-formats"
import VideoDownloadForm from "../video-download-form"
import VideoInfoForm from "../video-info-form"
import Ytdl from "../../utils/ytdl"
import styles from "./style"

const VideoInfo: FC = () => {
    const [ videoFormats, setVideoFormats ] = useState<ParsedVideoFormat[]>([])
    const [ downloadStarted, setDownloadStarted ] = useState<boolean>(false)
    const [ ytdl, setYtdl ] = useState<Ytdl>()

    function handleChangeVideoFormats(newVideoFormats: ParsedVideoFormat[]) {
        return setVideoFormats(newVideoFormats)
    }

    function handleChangeYtdlInstance(newYtdlInstance: Ytdl) {
        return setYtdl(newYtdlInstance)
    }

    function handleDownloadStart() {
        console.log("Download iniciado!")
        return setDownloadStarted(true)
    }

    function handleDownloadFinish() {
        console.log("Download concluído!")
        return setDownloadStarted(false)
    }

    return (
        <View style={styles.videoInfo}>
            <VideoInfoForm
                onChangeVideoFormats={handleChangeVideoFormats}
                onChangeYtdlInstance={handleChangeYtdlInstance}
                disabled={downloadStarted}
            />
            {ytdl && videoFormats.length > 0 && !downloadStarted && (
                <VideoDownloadForm
                    onDownloadStart={handleDownloadStart}
                    onDownloadFinish={handleDownloadFinish}
                    videoFormats={videoFormats}
                    ytdlInstance={ytdl}
                />
            )}
            {downloadStarted && (
                <>
                    <Text style={styles.downloadTitle}>Baixando...</Text>
                    <ProgressBar.Bar
                        width={styles.downloadProgressBar.width}
                        height={styles.downloadProgressBar.height}
                        style={styles.downloadProgressBar}
                        indeterminate={true}
                    />
                </>
            )}
        </View>
    )
}

export default VideoInfo