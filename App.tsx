import { NativeModules, Platform, StyleSheet, View } from "react-native"
import { FC, useEffect, useState } from "react"
import { StatusBar } from "expo-status-bar"

import VideoInfo from "./components/video-info"
import Header from "./components/header"

const { StatusBarManager } = NativeModules

const App: FC = () => {
    const [ statusBarHeight, setStatusBarHeight ] = useState<number>(0)

    useEffect(() => {
        const statusBarHeight = Math.ceil(Platform.OS === "ios" ? 20 : StatusBarManager.HEIGHT)
        setStatusBarHeight(statusBarHeight)
    }, [])

    return (
        <View style={styles.container}>
            <Header statusBarHeight={statusBarHeight}/>
            <VideoInfo/>
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