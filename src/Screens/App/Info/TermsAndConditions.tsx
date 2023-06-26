import React from 'react'
import { Text, View } from 'react-native'
import { Arrow, Container } from '@Components'
import { TermsAndConditionsNavigationProp } from 'Navigation/types'

interface Props {
    navigation: TermsAndConditionsNavigationProp
}

const TermsAndConditions: React.FC<Props> = ({ navigation }) => {
    return (
        <Container>
            <View style={{ marginBottom: '3%' }}>
                <Arrow onPress={() => navigation.goBack()} back />
            </View>
            <Text>TermsAndConditions</Text>
        </Container>
    )
}


export default TermsAndConditions