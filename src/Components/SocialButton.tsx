import React, { ReactNode } from 'react'
import { StyleSheet, TouchableOpacity, ViewStyle, TextStyle, View } from 'react-native'
import Text from './Text'
import { Colors } from '@Config'
import { scale, verticalScale } from 'react-native-size-matters'

interface Props {
    onPress: () => void
    str: string
    ButtonStyle?: ViewStyle
    TextStyle?: TextStyle
    Icon: ReactNode
}

const SocialButton: React.FC<Props> = ({ onPress, str, ButtonStyle, TextStyle, Icon }) => {
    return (
        <TouchableOpacity onPress={onPress}
            style={[styles.container, ButtonStyle]}>
            {Icon}
            <Text str={str} style={[styles.buttonText, TextStyle]} />
            <View />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: Colors.primary,
        borderWidth: 1,
        borderColor: Colors.black,
        padding: scale(12),
        borderRadius: scale(30),
        marginVertical: verticalScale(7)
    }, buttonText: {
        color: Colors.black,
        fontWeight: 'bold'
    }
})

export default SocialButton;