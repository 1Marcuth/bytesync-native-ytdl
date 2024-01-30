import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
    iconButton: {
        display: "flex",
        flexDirection: "row",
        backgroundColor: "#60d4ea",
        height: "100%", 
        width: "auto",
        paddingHorizontal: 10,
        paddingVertical: 5,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
        maxHeight: 50
    },
    iconButtonText: {
        marginLeft: 5
    }
})

export default styles