import { TextInput, NativeSyntheticEvent, TextInputTextInputEventData } from "react-native"
import { FC, forwardRef } from "react"

import styles from "./style"

interface IProps {
    placeholder: string
    onChangeText?: ((text: string) => void) | undefined
}

const UrlInput = forwardRef<TextInput, IProps>(({ placeholder, onChangeText }, ref) => {
    return (
        <TextInput
            ref={ref}
            onChangeText={onChangeText}
            style={styles.urlInput}
            placeholder={placeholder}
        />
    )
})

export default UrlInput