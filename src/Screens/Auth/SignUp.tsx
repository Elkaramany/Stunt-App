import React from 'react'
import { RadioBtn } from '@Components'
import { ShowToast } from '@Config'
import { SignEmailPassword } from './utils'
import { SignUpNavigationProp } from '@NavigationTypes'
import Sign from './Sign'

const SignUp = ({ navigation }: { navigation: SignUpNavigationProp }) => {
    const [loading, setLoading] = React.useState(false)
    const [agreed, setAgreed] = React.useState(false)
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')

    const handleSignUp = async () => {
        if (!agreed) {
            ShowToast('error', 'Terms & Conditions', ' Please agree to the Terms & Conditions')
            return;
        }
        setLoading(true)
        const result = await SignEmailPassword(email, password, false)
        if (result?.success && result.user) {
            navigation.replace('Success', { user: result.user })
        }
        setLoading(false)
    }

    return (
        <Sign
            navigation={navigation}
            screen='Sign Up'
            title='Sign Up'
            subTitle='Enter your details to process further'
            email={email}
            password={password}
            setEmail={setEmail}
            setPassword={setPassword}
            radioChild={<RadioBtn selected={agreed} onPress={() => setAgreed(!agreed)} str="I agree with Terms & Conditions" />}
            loading={loading}
            onPress={() => handleSignUp()}
        />
    )
}

export default SignUp;