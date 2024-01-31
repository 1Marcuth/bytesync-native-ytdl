import { TextInput, NativeSyntheticEvent, TextInputTextInputEventData } from "react-native"
import { FC, forwardRef } from "react"

import styles from "./style"

interface IProps {
    placeholder: string
    onChangeText?: ((text: string) => void),
    style?: any | any[],
    disabled?: boolean
}

const UrlInput = forwardRef<TextInput, IProps>(({ placeholder, onChangeText, style, disabled }, ref) => {
    const receivedStyles = style ? (style instanceof Array ? style : [ style ]) : []

    return (
        <TextInput
            ref={ref}
            disableFullscreenUI={disabled}
            onChangeText={onChangeText}
            style={[ styles.urlInput, ...receivedStyles ]}
            placeholder={placeholder}
        />
    )
})

export default UrlInput