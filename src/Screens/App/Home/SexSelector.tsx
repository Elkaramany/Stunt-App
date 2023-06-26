import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Colors, GlobalStyles } from '@Config'
import { verticalScale } from 'react-native-size-matters'
import { Text } from '@Components'
import { CheckMark } from '@Assets'
import { INITIAIL_FILTERS } from '@RealmTypes'

interface SexSelectorProps {
    selectedFilter: string[];
    onSexPress: (val: string) => void;
}

const SexSelector: React.FC<SexSelectorProps> = ({ selectedFilter, onSexPress }) => {
    const sexArray = INITIAIL_FILTERS['sex'];

    return (
        <>
            {sexArray.map((s: string, index: number) => (
                <TouchableOpacity
                    onPress={() => onSexPress(s)}
                    key={s}
                    style={[
                        styles.sexContainer,
                        {
                            borderColor:
                                index === sexArray.length - 1 ? 'transparent' : Colors.black,
                        },
                    ]}
                >
                    <Text str={s} />
                    <View style={{ width: '8%' }}>
                        {selectedFilter.includes(s) && <CheckMark />}
                    </View>
                </TouchableOpacity>
            ))}
        </>
    );
};

const styles = StyleSheet.create({
    sexContainer: {
        flex: 10,
        ...GlobalStyles.bottomBorder,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: verticalScale(15),
    }
});

export default SexSelector