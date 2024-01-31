import { FC, useState } from "react"
import { View } from "react-native"

import { ParsedVideoFormat } from "../../utils/parse-video-formats"
import SelectDropdown from "react-native-select-dropdown"
import downloadFile from "../../utils/download-file"
import formatBytes from "../../utils/format-bytes"
import IconButton from "../icon-button"
import Ytdl from "../../utils/ytdl"
import styles from "./style"

type OnDownloadStart = () => any
type OnDownloadFinish = () => any

interface IProps {
    onDownloadStart: OnDownloadStart
    onDownloadFinish: OnDownloadFinish
    videoFormats: ParsedVideoFormat[]
    ytdlInstance: Ytdl
}

const VideoDownloadForm: FC<IProps> = ({
    onDownloadStart,
    onDownloadFinish,
    videoFormats,
    ytdlInstance,
}) => {
    const [ selectedVideoFormat, setSelectedVideoFormat ] = useState<ParsedVideoFormat>(videoFormats[0])

    function handleChangeVideoFormat(format: ParsedVideoFormat) {
        return setSelectedVideoFormat(format)
    }

    function parseOptionText(format: ParsedVideoFormat) {
        const text = `Vídeo ${format.quality} ${format.fileExtension.toUpperCase()} ${!format.hasAudio ? "(Sem som)": ""} (${format.fps} fps) ${format.size ? `(${formatBytes(format.size)})` : ""}`
        return text
    }

    async function handleDownloadButtonClick() {
        const videoInfo = await ytdlInstance.getBasicInfo()
        const videoTitle = videoInfo.videoDetails.title
        const videoFormat = videoInfo.formats.find(format => Number(selectedVideoFormat.itag) === Number(format.itag))

        const videoDownloadUrls = await ytdlInstance.getDownloadUrls({
            options: { 
                filter: "videoandaudio",
                format: videoFormat
            }
        })

        const videoDownloadUrl = videoDownloadUrls[0]

        const videoFileName = `${videoTitle.replace(/ - /g, "_").replace(/ /g, "_")}_${selectedVideoFormat.quality}.${selectedVideoFormat.fileExtension}`

        onDownloadStart()

        await downloadFile({
            sourceUri: videoDownloadUrl,
            fileName: videoFileName
        })

        onDownloadFinish()
    }

    return (
        <View style={styles.videoDownloadForm}>
            <SelectDropdown
                defaultValueByIndex={0}
                data={videoFormats}
                buttonStyle={styles.selectVideoFormatButtonStyle}
                buttonTextStyle={styles.selectVideoFormatButtonText}
                rowStyle={styles.selectVideoFormatRowStyle}
                onSelect={handleChangeVideoFormat}
                buttonTextAfterSelection={parseOptionText}
                rowTextForSelection={parseOptionText}
            />
            {selectedVideoFormat && (
                <IconButton
                    style={styles.downloadButton}
                    onPress={handleDownloadButtonClick}
                    iconName="download"
                    iconSize={20}
                    iconColor="#fff"
                >
                    Baixar
                </IconButton>
            )}
        </View>
    )
}

export default VideoDownloadForm