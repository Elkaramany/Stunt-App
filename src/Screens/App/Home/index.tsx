import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import { Container, PerformerContainer } from '@Components'
import { verticalScale } from 'react-native-size-matters'
import { LogoSVG } from '@Assets'
import { Colors } from '@Config'
import { Performer, PerformerFilter } from '@RealmTypes'
import { HomeNavigationProp, TabsNavigationProp } from '@NavigationTypes'
import PerformerList from '../PerformerList'

interface Props {
    navigation: HomeNavigationProp & TabsNavigationProp
    filters: PerformerFilter
}

const Index: React.FC<Props> = ({ filters, navigation }) => {

    return (
        <Container>
            <View style={{ alignItems: 'center', marginBottom: verticalScale(5) }}>
                <LogoSVG />
            </View>
            <PerformerList
                navigation={navigation}
                filters={filters}
                renderItem={({ item }: { item: Performer }) => (
                    <TouchableOpacity onPress={() => navigation.navigate('Performer', { item })}>
                        <PerformerContainer item={item} />
                    </TouchableOpacity>
                )}
            />
        </Container>
    )
}

export default Index;