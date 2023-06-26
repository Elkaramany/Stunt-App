import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TextInputProps } from 'react-native';
import { Colors, GlobalStyles, validatePassword } from '@Config';
import { scale, verticalScale } from 'react-native-size-matters';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Text from './Text'

interface Props extends TextInputProps {
    label?: string;
    rightIcon?: React.ReactNode;
    leftIcon?: React.ReactNode;
    placeholder?: string
    hint?: string
}

const Input: React.FC<Props> = ({ label, placeholder, value, onChangeText, secureTextEntry, onSubmitEditing, rightIcon, leftIcon, hint, ...rest }) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);

    return (
        <TouchableWithoutFeedback
            style={{
                backgroundColor: Colors.primary,
                borderColor: isFocused ? Colors.black : Colors.gray,
                borderWidth: 1,
                borderRadius: verticalScale(8),
                paddingHorizontal: scale(15),
            }}
            onPress={() => handleFocus()}>
            {label && isFocused && <Text str={label} style={{ fontSize: scale(13), marginTop: verticalScale(12), fontWeight: '500' }} />}
            <View style={[
                styles.inputContainer,
                GlobalStyles.centeredContainer]}>
                {leftIcon && <View style={styles.iconContainer}>{leftIcon}</View>}
                <TextInput
                    style={[
                        styles.input,
                        {
                            paddingLeft: leftIcon ? 15 : 0,
                            paddingRight: rightIcon ? 15 : 0,
                        },
                    ]}
                    placeholder={placeholder}
                    placeholderTextColor={Colors.placeholder}
                    value={value}
                    onChangeText={onChangeText}
                    secureTextEntry={secureTextEntry}
                    onSubmitEditing={onSubmitEditing}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    {...rest}
                />
                {rightIcon && <View style={styles.iconContainer}>{rightIcon}</View>}
            </View>
            {secureTextEntry && !validatePassword(value) && <Text style={{ fontSize: scale(8), color: Colors.placeholder, bottom: scale(5) }} str={hint} />}
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconContainer: {
        paddingHorizontal: 10,
    },
    input: {
        paddingHorizontal: 10,
        paddingVertical: verticalScale(11),
        marginBottom: verticalScale(3.5),
        fontSize: 16,
        color: Colors.black,
        fontWeight: 'bold',
        flex: 1,
    },
    inputWithLeftIcon: {
        paddingLeft: 40,
    },
    inputWithRightIcon: {
        paddingRight: 40,
    },
    focusedInput: {
        borderColor: Colors.tertiary,
    },
});

export default Input;