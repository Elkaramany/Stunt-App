import React from 'react'
import { View, StyleSheet, ImageBackground } from 'react-native'
import { GradientBG } from '@Assets'
import { Colors, GlobalStyles } from '@Config'
import { Button, Container, Spinner, Text } from '@Components'
import { EntryNavigationProp } from '@NavigationTypes'
import { scale, verticalScale } from 'react-native-size-matters'
import { AuthContext } from '@Context'

interface Props {
    navigation: EntryNavigationProp;
}

const Entry: React.FC<Props> = ({ navigation }) => {
    const { loadingUser } = React.useContext(AuthContext);

    return (
        <Container paddingHorizontal={0}>
            <ImageBackground style={{ flex: 8 }} source={GradientBG}>
                <View style={styles.titleContainer}>
                    <Text
                        str='Stunt Register'
                        style={{ fontWeight: 'bold', marginBottom: verticalScale(10) }}
                        biggest
                    />
                    <Text
                        str='Find the best stunt perfomers'
                        style={{ color: Colors.subTitle, }}
                    />
                </View>
            </ImageBackground>
            <View style={styles.bottomContainer}>
                {
                    loadingUser ?
                        <Spinner />
                        :
                        <>
                            <Button str='Get Started' onPress={() => navigation.navigate('SignUp')} />
                            <Button
                                str='Sign In'
                                onPress={() => navigation.navigate('SignIn')}
                                ButtonStyle={{ backgroundColor: Colors.light }}
                                TextStyle={{ color: Colors.blue }}
                            />
                        </>
                }
            </View>
        </Container>
    )
}

const styles = StyleSheet.create({
    titleContainer: {
        position: 'absolute',
        bottom: scale(60),
        right: 0,
        left: 0,
        ...GlobalStyles.centeredContainer,
    },
    bottomContainer: {
        flex: 2,
        backgroundColor: Colors.primary,
        paddingHorizontal: '3%'
    }
})

export default Entry;