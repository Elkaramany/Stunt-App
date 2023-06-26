import React from 'react'
import { Text, View } from 'react-native'
import { Arrow, Container } from '@Components'
import { MemberResourcesNavigationProp } from 'Navigation/types'

interface Props {
    navigation: MemberResourcesNavigationProp
}

const MemberResources: React.FC<Props> = ({ navigation }) => {
    return (
        <Container>
            <View style={{ marginBottom: '3%' }}>
                <Arrow onPress={() => navigation.goBack()} back />
            </View>
            <Text>MemberResources</Text>
        </Container>
    )
}


export default MemberResources;