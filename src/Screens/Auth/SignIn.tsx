import React from 'react'
import { RadioBtn } from '@Components'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '@Context';
import { SignEmailPassword } from './utils'
import { REMEMBER } from '@RealmKeys';
import { SignInNavigationProp } from '@NavigationTypes';
import Sign from './Sign';

const SignIn = ({ navigation }: { navigation: SignInNavigationProp }) => {
    const [loading, setLoading] = React.useState(false)
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [remember, setRemember] = React.useState(true)
    const { signIn } = React.useContext(AuthContext);

    React.useEffect(() => {
        const toggleRemember = async () => {
            await AsyncStorage.setItem(REMEMBER, JSON.stringify(remember))
        }

        toggleRemember()
    }, [remember])

    const handleSignIn = async () => {
        setLoading(true)
        const result = await SignEmailPassword(email, password, true)
        if (result?.success && result.user) signIn(result.user)

        setLoading(false)
    }

    return (
        <Sign
            navigation={navigation}
            screen='Sign In'
            title='Welcome Back'
            subTitle='Please sign in to continue'
            email={email}
            password={password}
            setEmail={setEmail}
            setPassword={setPassword}
            radioChild={<RadioBtn selected={remember} onPress={() => setRemember(!remember)} str="Remember me" />}
            loading={loading}
            onPress={() => handleSignIn()}
        />
    )
}

export default SignIn;