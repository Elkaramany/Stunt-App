import React from 'react'
import { StyleSheet, TouchableOpacity, ViewStyle, TextStyle } from 'react-native'
import Text from './Text'
import { Colors } from '@Config'
import { scale, verticalScale } from 'react-native-size-matters'

interface Props {
    onPress: () => void
    str: string
    ButtonStyle?: ViewStyle
    TextStyle?: TextStyle
}

const Button: React.FC<Props> = ({ onPress, str, ButtonStyle, TextStyle }) => {
    return (
        <TouchableOpacity onPress={onPress}
            style={[styles.container, ButtonStyle]}>
            <Text str={str} style={[styles.buttonText, TextStyle]} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.blue,
        padding: scale(12),
        borderRadius: scale(30),
        marginVertical: verticalScale(7)
    }, buttonText: {
        color: Colors.primary,
        fontWeight: 'bold'
    }
})

export default Button;