import React from 'react'
import { View, StyleSheet, Image } from 'react-native'
import { GlobalStyles } from '@Config'
import { CheckMark, GenericUser } from '@Assets'
import Text from './Text'
import PerformerSkills from './PerformerSkills'
import { scale, verticalScale } from 'react-native-size-matters'
import { Performer } from '@RealmTypes'
import MemberShip from './MemberShip'

interface Props {
    item: Performer
    checking?: boolean
    selected?: boolean
}

const PerformerContainer: React.FC<Props> = ({ item, checking, selected }) => {

    return (
        <View style={styles.container}>
            <View style={[styles.imageContainer, { justifyContent: checking ? 'space-between' : 'flex-start' }]}>
                <Image source={GenericUser} style={styles.userImg} />
                <View>
                    <Text str={item.name} />
                    <MemberShip grade={item.grade} />
                </View>
                {checking &&
                    <View style={GlobalStyles.checkerContainer}>
                        {selected && <CheckMark />}
                    </View>
                }
            </View>
            <View style={{ flex: 2, marginVertical: verticalScale(5) }}>
                <PerformerSkills item={item} divider={3.3} />
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: scale(5),
        justifyContent: 'center',
        height: verticalScale(120), // Add a fixed height
    },
    imageContainer: {
        flex: 2,
        flexDirection: 'row',
    }, userImg: {
        width: scale(45),
        height: scale(45),
        borderRadius: scale(10),
        resizeMode: 'contain',
        marginRight: scale(10)
    }, memberShipContainer: {
        padding: scale(5),
        borderRadius: scale(10),
        flex: 0,
        marginVertical: scale(1)
    },
})

export default React.memo(PerformerContainer);