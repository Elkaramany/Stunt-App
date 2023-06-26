import React from 'react'
import { Text, View } from 'react-native'
import { Arrow, Container } from '@Components'
import { PrivacyPolicyNavigationProp } from 'Navigation/types'

interface Props {
    navigation: PrivacyPolicyNavigationProp
}

const PrivacyPolicy: React.FC<Props> = ({ navigation }) => {
    return (
        <Container>
            <View style={{ marginBottom: '3%' }}>
                <Arrow onPress={() => navigation.goBack()} back />
            </View>
            <Text>PrivacyPolicy</Text>
        </Container>
    )
}


export default PrivacyPolicy;