import React from 'react'
import { View, FlatList } from 'react-native'
import { Button, Container, Text } from '@Components'
import { INITIAIL_FILTERS, PerformerFilter } from '@RealmTypes'
import { Colors, GlobalStyles } from '@Config'
import { FiltersNavigationProp } from '@NavigationTypes'
import { scale, verticalScale } from 'react-native-size-matters'
import FilterItem from './FilterItem'

interface Props {
    filters: PerformerFilter
    setFilters: (val: PerformerFilter) => void
    navigation: FiltersNavigationProp
}

const Filter: React.FC<Props> = ({ filters, setFilters, navigation }) => {
    const [newFilters, setNewFilters] = React.useState(filters)

    const setFilterItem = (key: keyof PerformerFilter, val: string[] | number[]) => {
        let tempFilters = { ...newFilters };
        if (key === 'sex') {
            tempFilters[key] = val as string[];
        } else {
            tempFilters[key] = { min: (val as number[])[0], max: (val as number[])[1] };
        }
        setNewFilters(tempFilters);
    }

    const onReset = () => {
        setFilters(INITIAIL_FILTERS)
        setNewFilters(INITIAIL_FILTERS)
        navigation.goBack()
    }

    return (
        <Container
            bigContainerStyle={{ flex: 1, backgroundColor: Colors.primary }}
            smallContainerStyle={{ paddingTop: verticalScale(10) }}
        >
            <View style={GlobalStyles.rowBetween}>
                <Text str='Filters' biggest />

                <Button
                    str='Cancel'
                    onPress={() => navigation.goBack()}
                    ButtonStyle={{ backgroundColor: Colors.gray, borderRadius: scale(5), padding: scale(8) }}
                    TextStyle={{ color: Colors.tertiary }}
                />
            </View>

            <FlatList
                data={Object.keys(INITIAIL_FILTERS) as ArrayLike<keyof PerformerFilter>}
                keyExtractor={fil => `${fil}`}
                renderItem={({ item }) => (
                    <FilterItem
                        item={item}
                        filters={newFilters}
                        setFilterItem={setFilterItem}
                    />
                )}
            />

            <Button
                str='Apply filters'
                onPress={() => {
                    setFilters(newFilters)
                    navigation.goBack()
                }}
            />

            <Button
                str='Reset all filters'
                ButtonStyle={{
                    backgroundColor: Colors.gray
                }}
                TextStyle={{ color: Colors.black }}
                onPress={() => onReset()}
            />
        </Container>
    )
}

export default Filter;
