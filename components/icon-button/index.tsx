import { View, TouchableOpacity, Text } from "react-native"
import Icon from "react-native-vector-icons/FontAwesome"
import { FC } from "react"

import styles from "./style"

interface IProps {
    children?: any
    iconColor?: string
    iconName: string
    iconSize: number
    style?: any | any[]
    disabled?: boolean
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
    style,
    disabled,
    onPress
}) => {
    const receivedStyles = style ? (style instanceof Array ? style : [ style ]) : []

    return (
        <TouchableOpacity
            disabled={disabled}
            style={[ styles.iconButton, ...receivedStyles ]}
            onPress={onPress}
        >
            <View style={styles.iconButtonView}>
                <Icon name={iconName} size={iconSize} color={iconColor}/>
                {children && (
                    <Text style={[ styles.iconButtonText, { color: iconColor } ]}>{children}</Text>
                )}
            </View>
        </TouchableOpacity>
    )
}

export default IconButton