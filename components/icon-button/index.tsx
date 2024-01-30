import { View, TouchableOpacity, Text } from "react-native"
import Icon from "react-native-vector-icons/FontAwesome"
import { FC } from "react"

import styles from "./style"

interface IProps {
    children?: any
    iconColor?: string
    iconName: string
    iconSize: number
    onPress?: () => any
}

const defaultProps = {
    iconColor: "#000"
}

const IconButton: FC<IProps> = ({
    children,
    iconColor = defaultProps.iconColor,
    iconName,
    iconSize,
    onPress
}) => {
    return (
        <TouchableOpacity
            style={styles.iconButton}
            onPress={onPress}
        >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Icon name={iconName} size={iconSize} color={iconColor}/>
                {children && (
                    <Text style={[ styles.iconButtonText, { color: iconColor } ]}>{children}</Text>
                )}
            </View>
        </TouchableOpacity>
    )
}

export default IconButton