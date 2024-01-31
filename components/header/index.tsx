import { View, Text } from "react-native"
import { FC } from "react"

import styles from "./styles"

interface IProps {
    statusBarHeight: number
}

const Header: FC<IProps> = ({ statusBarHeight }) => {
    return (
        <View style={[ styles.header, {  marginTop: statusBarHeight } ]}>
            <Text style={styles.headerTitle}>ByteSync NYtdl</Text>
        </View>
    )
}

export default Header