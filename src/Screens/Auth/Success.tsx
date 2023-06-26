import React from 'react'
import { View, StyleSheet, ImageBackground } from 'react-native'
import { Button, Text } from '@Components'
import { SuccessNavigationProp, SuccessRouteProp } from '@NavigationTypes'
import { AuthContext } from '@Context';

import { Artwork } from '@Assets'
import { Colors } from '@Config'
import { verticalScale } from 'react-native-size-matters'

interface Props {
    navigation: SuccessNavigationProp
    route: SuccessRouteProp
}

const Success: React.FC<Props> = ({ route }) => {
    const { user } = route.params
    const { signIn } = React.useContext(AuthContext);

    const handleAppPress = async () => {
        await signIn(user)
    }

    return (
        <View style={{ flex: 1 }}>
            <ImageBackground style={{ flex: 6.5 }} source={Artwork}>

            </ImageBackground>
            <View style={styles.bottomContainer}>
                <Text
                    str='Thank You'
                    biggest
                />
                <Text
                    str={`We sent an email to \n${user.email}`}
                    style={{ color: Colors.subTitle, marginVertical: verticalScale(20), textAlign: 'center' }}
                />

                <Button
                    str='Go to the App'
                    onPress={handleAppPress}
                    ButtonStyle={{ width: '95%', marginTop: verticalScale(25) }}
                />
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    bottomContainer: {
        flex: 3.5,
        backgroundColor: Colors.primary,
        alignItems: 'center'
    }
})

export default Success;