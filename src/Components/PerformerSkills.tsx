import React from 'react'
import { TextStyle, View } from 'react-native'
import Text from './Text'
import { verticalScale } from 'react-native-size-matters'
import { convertCmToFeetAndInches, convertCmToInches, Colors, WIDTH, GlobalStyles } from '@Config'
import { Performer } from '@RealmTypes'

interface PerfromerSkill {
    key: string
    label: string
    value: string | number
}

interface Props {
    item: Performer
    divider: number
    extraData?: PerfromerSkill[]
    boldSkiils?: boolean
    textStyle?: TextStyle
}

const PerformerSkills = React.memo(({ item, divider, extraData, boldSkiils, textStyle }: Props) => {
    const data: PerfromerSkill[] = [
        { key: 'height', label: 'Height', value: convertCmToFeetAndInches(item.height) },
        { key: 'chest', label: 'Chest', value: convertCmToInches(item.chest) },
        { key: 'insideLeg', label: 'Inside Leg', value: convertCmToInches(item.insideLeg) },
        { key: 'waistSize', label: 'Waist', value: convertCmToInches(item.waistSize) },
        { key: 'shoeSize', label: 'Shoe', value: item.shoeSize },
        { key: 'collarSize', label: 'Collar', value: convertCmToInches(item.collarSize) },
    ];

    const renderItem = (item: any) => {
        return (
            <View style={{ width: WIDTH / divider, paddingVertical: verticalScale(5) }}>
                <Text str={`${item.label}: ${item.value}`}
                    style={[{
                        color: boldSkiils ? Colors.black : Colors.subTitle,
                        fontWeight: boldSkiils ? '400' : 'normal'
                    }, textStyle]}
                    small
                />
            </View>
        );
    };

    let arr = [...data]
    if (extraData) arr = [...arr, ...extraData]

    return <View style={GlobalStyles.rowWrap}>{arr.map((d, i) => renderItem(d))}</View>
})

export default React.memo(PerformerSkills);