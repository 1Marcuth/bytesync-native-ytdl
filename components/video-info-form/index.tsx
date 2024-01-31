import normalizeUrl from "normalize-url"
import isSameUrl from "compare-urls"
import { FC, useState, useRef, useEffect } from "react"
import { View, TextInput } from "react-native"

import IconButton from "../icon-button"
import UrlInput from "../url-input"
import styles from "./style"
import Ytdl from "../../utils/ytdl"
import parseVideoFormats, { ParsedVideoFormat } from "../../utils/parse-video-formats"

type OnChangeVideoFormats = (newVideoFormats: ParsedVideoFormat[]) => any
type OnChangeYtdlInstance = (newYtdlInstance: Ytdl) => any

interface IProps {
    onChangeVideoFormats: OnChangeVideoFormats
    onChangeYtdlInstance: OnChangeYtdlInstance
    disabled?: boolean
}

const VideoInfoForm: FC<IProps> = ({
    onChangeVideoFormats,
    onChangeYtdlInstance,
    disabled
}) => {
    const [ videoFormats, setVideoFormats ] = useState<ParsedVideoFormat[]>([])
    const [ videoUrl, setVideoUrl ] = useState<string>()
    const [ ytdl, setYtdl ] = useState<Ytdl>()
    const inputUrlRef = useRef<TextInput>(null)

    function handleChangeText(newText: string): void {
        if (videoUrl) {
            if (isSameUrl(videoUrl, newText)) return
            newText = normalizeUrl(newText)
        }

        return setVideoUrl(newText)
    }

    async function handleGetInfoButtonClick() {
        if (!videoUrl) return

        const ytdlInstance = new Ytdl({ url: videoUrl })

        setYtdl(ytdlInstance)

        const videoInfo = await ytdl!.getInfo()
        const videoFormats = await parseVideoFormats({ formats: videoInfo.formats })

        return setVideoFormats(videoFormats)
    }

    useEffect(() => {
        if (!ytdl) return
        onChangeYtdlInstance(ytdl)
    }, [ytdl])

    useEffect(() => {
        onChangeVideoFormats(videoFormats)
    }, [videoFormats])

    return (
        <View style={styles.videoInfoForm}>
            <UrlInput
                style={styles.urlInput}
                disabled={disabled}
                ref={inputUrlRef}
                onChangeText={handleChangeText}
                placeholder="Sua URL aqui..."
            />
            <IconButton
                style={styles.getInfoButton}
                disabled={disabled}
                onPress={handleGetInfoButtonClick}
                iconName="arrow-right"
                iconSize={20}
                iconColor="#fff"
            />
        </View>
    )
}

export default VideoInfoForm