import React from 'react'
import { View } from 'react-native'
import { Lock, Mail } from '@Assets'
import { Input } from '@Components'
import { verticalScale } from 'react-native-size-matters'

interface Props {
    email: string
    setEmail: (val: string) => void
    password: string
    setPassword: (val: string) => void
}

const EmailPassword: React.FC<Props> = ({ email, setEmail, password, setPassword }) => {

    return (
        <>
            <Input
                value={email}
                onChangeText={setEmail}
                label={'Email'}
                placeholder={'Email'}
                rightIcon={<Mail />}
            />
            <View style={{ height: verticalScale(10) }} />
            <Input
                value={password}
                onChangeText={setPassword}
                label={'password'}
                placeholder={'password'}
                rightIcon={<Lock />}
                secureTextEntry
                hint={'Password must be at least 6 characters long and contain an uppercase letter, a lowercase letter, and a number.'}
            />
        </>
    )
}

export default EmailPassword;