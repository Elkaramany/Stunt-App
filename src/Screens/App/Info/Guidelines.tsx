import React from 'react'
import { Text, View } from 'react-native'
import { Arrow, Container } from '@Components'
import { GuidelinesNavigationProp } from 'Navigation/types'

interface Props {
    navigation: GuidelinesNavigationProp
}

const Guidelines: React.FC<Props> = ({ navigation }) => {
    return (
        <Container>
            <View style={{ marginBottom: '3%' }}>
                <Arrow onPress={() => navigation.goBack()} back />
            </View>
            <Text>Guidelines</Text>
        </Container>
    )
}


export default Guidelines;