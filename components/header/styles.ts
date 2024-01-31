import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
    header: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: 60,
        width: "100%",
        backgroundColor: "#19191a",
        position: "absolute",
        top: 0,
        left: 0
    },
    headerTitle: {
        textAlign: "center",
        color: "#fff",
        fontWeight: "600"
    }
})

export default styles