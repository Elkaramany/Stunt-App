import React from 'react'
import { Text, View } from 'react-native'
import { Arrow, Container } from '@Components'
import { FAQNavigationProp } from 'Navigation/types'

interface Props {
    navigation: FAQNavigationProp
}

const FAQ: React.FC<Props> = ({ navigation }) => {
    return (
        <Container>
            <View style={{ marginBottom: '3%' }}>
                <Arrow onPress={() => navigation.goBack()} back />
            </View>
            <Text>FAQ</Text>
        </Container>
    )
}


export default FAQ;