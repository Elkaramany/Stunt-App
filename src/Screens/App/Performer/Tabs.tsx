import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Text } from '@Components'
import { GlobalStyles, Colors } from '@Config'
import { PerformerIcon } from '@Assets'
import { scale, verticalScale } from 'react-native-size-matters'
import { Performer } from '@RealmTypes'
import Details from './Details'
import Skills from './Skills'
import Images from './Images'
import { ScrollView } from 'react-native-gesture-handler'

const TABS = ['Details', 'Skills', 'Images']

const Tabs: React.FC<{ item: Performer }> = ({ item }) => {
    const [index, setIndex] = React.useState(0)

    const renderTab = () => {
        switch (index) {
            case 0:
                return <Details item={item} />
            case 1:
                return <Skills item={item} />
            case 2:
                return <Images item={item} />
            default:
            // code block
        }
    }

    const renderTabHeader = () => {
        if (index === 0) return 'Details'
        else if (index === 1) return 'Skills'
        else return 'Images'
    }

    return (
        <>
            <View style={[GlobalStyles.rowAround, styles.seperator]}>
                {TABS.map((t, i) => {
                    return (
                        <TouchableOpacity
                            onPress={() => setIndex(i)}
                            style={[styles.container,
                            {
                                borderBottomWidth: index === i ? 1.5 : 0
                            }]}
                            key={t}>
                            <Text
                                str={t}
                                style={{ fontWeight: '500', color: index === i ? Colors.black : Colors.placeholder }}
                            />
                        </TouchableOpacity>
                    )
                })}
            </View>
            <ScrollView style={{ paddingHorizontal: scale(15) }}>
                <View style={styles.tabContainer}>
                    <PerformerIcon />
                    <Text str={`  Perfromer ${renderTabHeader()}`} />
                </View>
                {renderTab()}
            </ScrollView>
        </>

    )
}

const styles = StyleSheet.create({
    tabContainer: {
        paddingVertical: verticalScale(20),
        flexDirection: 'row',
    },
    seperator: {
        borderColor: Colors.placeholder,
        borderBottomWidth: 0.4,
        marginBottom: scale(10),
    },
    container: {
        paddingBottom: verticalScale(10),
        borderColor: Colors.black
    }
})

export default Tabs;