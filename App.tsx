import { NativeModules, Platform, StyleSheet, View, TextInput } from "react-native"
import SelectDropdown from "react-native-select-dropdown"
import { FC, useEffect, useState, useRef } from "react"
import { StatusBar } from "expo-status-bar"
// @ts-ignore ------------------------
import ytdl from "react-native-ytdl" 
import axios from "axios"

import downloadFile from "./utils/download-file"
import IconButton from "./components/icon-button"
import formatBytes from "./utils/format-bytes"
import UrlInput from "./components/url-input"
import Header from "./components/header"

const { StatusBarManager } = NativeModules

type VideoInfoFormat = {
    quality: string
    mimeType: string
    fps: number
    size?: number
    fileExtension: string
    itag: number
    hasAudio: boolean
}

type UrlData = {
    headers: any[],
    url: string
}

const App: FC = () => {
    const [ videoFormats, setVideoFormats ] = useState<VideoInfoFormat[]>([])
    const [ videoRawFormats, setVideoRawFormats ] = useState<any[]>([])
    const [ videoFormat, setVideoFormat ] = useState<VideoInfoFormat>()
    const [ statusBarHeight, setStatusBarHeight ] = useState<number>(0)
    const [ videoTitle, setVideoTitle ] = useState<string>("video")
    const inputUrlRef = useRef<TextInput>(null)
    const [ url, setUrl ] = useState<string>()

    function handleChangeText(text: string) {
        if (text) return setUrl(text)
    }

    function handleChangeSelectVideoFormat(newFormat: VideoInfoFormat) {
        console.log(newFormat)
        return setVideoFormat(newFormat)
    }

    async function handleGetInfoButtonClick() {
        if (url) {
            const videoInfo = await ytdl.getInfo(url)

            setVideoTitle(videoInfo.videoDetails.title ?? "Unnamed Video")
            setVideoRawFormats(videoInfo.formats)

            const formats: VideoInfoFormat[] = (
                await Promise.all(videoInfo.formats
                    .filter((format: any) => format.quality && format.fps && format.qualityLabel)
                    .map(async (format: any) => {
                        const videoInfoFormat: VideoInfoFormat = {
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

            setVideoFormats(formats)
        }

        setVideoFormat(undefined)
    }

    async function handleDownloadButtonClick() {
        if (!videoFormat) return

        const format = videoRawFormats.find(format => Number(videoFormat.itag) === Number(format.itag))

        const urlsData: UrlData[] = await ytdl(url, { 
            filter: "videoandaudio",
            format: format
        })

        const videoDownloadUrl = urlsData[0].url
        const videoFileName = `${videoTitle.replace(/ /g, "_")}_${videoFormat.quality}.${videoFormat.fileExtension}`

        if (inputUrlRef.current) {
            const inputUrl = inputUrlRef.current
            inputUrl.clear()
        }

        await downloadFile(videoDownloadUrl, videoFileName)
    }

    useEffect(() => {
        const statusBarHeight = Math.ceil(Platform.OS === "ios" ? 20 : StatusBarManager.HEIGHT)
        setStatusBarHeight(statusBarHeight)
    }, [])

    return (
        <View style={styles.container}>
            <Header statusBarHeight={statusBarHeight}/>
            <View style={styles.content}>
                <UrlInput
                    ref={inputUrlRef}
                    onChangeText={handleChangeText}
                    placeholder="Sua URL aqui..."
                />
                <IconButton
                    onPress={handleGetInfoButtonClick}
                    iconName="arrow-right"
                    iconSize={20}
                    iconColor="#fff"
                />
            </View>
            {videoFormats.length > 0 && (
                <View style={styles.videoOptions}>
                    <SelectDropdown
                        defaultValueByIndex={0}
                        data={videoFormats}
                        buttonStyle={{ width: 300, borderRadius: 5, backgroundColor: "#fff", borderColor: "#ccc", borderWidth: 1 }}
                        buttonTextStyle={{ fontSize: 12 }}
                        rowStyle={{ width: 300 }}
                        onSelect={handleChangeSelectVideoFormat}
                        buttonTextAfterSelection={(format: VideoInfoFormat, index) => {
                            const text = `Vídeo ${format.quality} ${format.fileExtension.toUpperCase()} (${format.fps} fps) ${format.size ? `(${formatBytes(format.size)})` : ""}`
                            return text
                        }}
                        rowTextForSelection={(format: VideoInfoFormat, index) => {
                            const text = `Vídeo ${format.quality} ${format.fileExtension.toUpperCase()} (${format.fps} fps) ${format.size ? `(${formatBytes(format.size)})` : ""}`
                            return text
                        }}
                    />
                    {videoFormat && (
                        <IconButton
                            onPress={handleDownloadButtonClick}
                            iconName="download"
                            iconSize={20}
                            iconColor="#fff"
                        >
                            Baixar
                        </IconButton>
                    )}
                </View>
            )}
            <StatusBar style="light"/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#373739",
        alignItems: "center",
        justifyContent: "center"
    },
    content: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 10
    },
    videoOptions: {
        marginTop: 15,
        gap: 10
    }
})

export default App