import React, { ReactNode } from 'react'
import { View, ImageBackground } from 'react-native'
import { Text, Arrow, Spinner, Button } from '@Components'
import { GlobalStyles, Colors, HEIGHT } from '@Config'
import { BitmapSign } from '@Assets'
import styles from './styles'
import { SignInNavigationProp, SignUpNavigationProp } from '@NavigationTypes'
import EmailPassword from './EmailPassword'
import { scale } from 'react-native-size-matters'

interface Props {
    navigation: SignInNavigationProp | SignUpNavigationProp
    screen: string
    title: string
    subTitle: string
    email: string
    setEmail: (val: string) => void
    password: string
    setPassword: (val: string) => void
    radioChild: ReactNode
    loading: boolean
    onPress: () => void
}

const SubHeader: React.FC<Props> = ({ navigation, screen, title, subTitle, email, setEmail, password, setPassword, radioChild, loading, onPress }) => {
    return (
        <View style={{ flex: 1 }}>
            <ImageBackground style={styles.topContainer} source={BitmapSign}>

                <View style={[GlobalStyles.rowBetween, { top: HEIGHT * 0.025, paddingHorizontal: '2%' }]}>
                    <Arrow back onPress={() => navigation.goBack()} />
                    <View style={styles.rightAlignedSign}>
                        <Text str={screen} />
                    </View>
                </View>

                <View style={styles.titleContainer}>
                    <Text
                        str={title}
                        biggest
                    />

                    <Text
                        str={subTitle}
                        style={{ color: Colors.subTitle }}
                    />
                </View>

            </ImageBackground>
            <View style={styles.bottomContainer}>
                <View style={{ flex: 1.1 }}>
                    <EmailPassword
                        email={email}
                        password={password}
                        setEmail={setEmail}
                        setPassword={setPassword}
                    />
                    {radioChild}
                </View>

                <View style={{ flex: 1 }}>
                    {
                        loading ?
                            <Spinner />
                            :
                            <View>
                                <Button
                                    str={screen}
                                    onPress={() => onPress()}
                                />
                            </View>
                    }
                </View>
            </View>
        </View>
    )
}

/*
                                <SocialButton
                                    str='Sign in with Google'
                                    onPress={() => { }}
                                    Icon={<GoogleIcon />}
                                />
                                <SocialButton
                                    str='Sign in with Apple'
                                    onPress={() => { }}
                                    Icon={<GoogleIcon />}
                                />
                                */

export default SubHeader;