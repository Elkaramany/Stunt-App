import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Colors, getMembershipStatus } from '@Config'
import Text from './Text'
import { scale, verticalScale } from 'react-native-size-matters'

interface Props {
    grade: number
    checking?: boolean
}

const MemberShip: React.FC<Props> = ({ grade, checking }) => {

    const memberShip = React.useMemo(() => getMembershipStatus(grade), [grade]);

    return (
        <View style={[{ backgroundColor: `${Colors[memberShip.color]}` }, styles.memberShipContainer, { alignSelf: checking ? 'center' : 'flex-start' }]}>
            <Text
                small
                str={memberShip.title}
                style={{ color: Colors.primary, fontWeight: 'bold' }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    memberShipContainer: {
        padding: scale(5),
        borderRadius: scale(10),
        flex: 0,
        marginVertical: scale(1)
    },
})

export default MemberShip;