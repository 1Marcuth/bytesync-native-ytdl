import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
    iconButton: {
        display: "flex",
        flexDirection: "row",
        backgroundColor: "#008500",
        height: "100%", 
        width: "auto",
        paddingHorizontal: 10,
        paddingVertical: 5,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
        maxHeight: 50
    },
    iconButtonView: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    iconButtonText: {
        marginLeft: 5
    }
})

export default styles