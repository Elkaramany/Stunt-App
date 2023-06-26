import React from 'react'
import { Text, View } from 'react-native'
import { Arrow, Container } from '@Components'
import { BookNavigationProp } from 'Navigation/types'

interface Props {
    navigation: BookNavigationProp
}

const Book: React.FC<Props> = ({ navigation }) => {
    return (
        <Container>
            <View style={{ marginBottom: '3%' }}>
                <Arrow onPress={() => navigation.goBack()} back />
            </View>
            <Text>Book</Text>
        </Container>
    )
}


export default Book;