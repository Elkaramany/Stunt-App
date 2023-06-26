import React from 'react';
import { View } from 'react-native';
import { Accordion, Text, Slider } from '@Components';
import { convertCmToFeetAndInches, convertCmToInches, GlobalStyles } from '@Config';
import { INITIAIL_FILTERS, PerformerFilter } from '@RealmTypes';
import SexSelector from './SexSelector';

// Define the properties received by the FilterItem component
interface Props {
    item: keyof PerformerFilter;
    filters: PerformerFilter
    setFilterItem: (key: keyof PerformerFilter, val: number[] | string[]) => void
}

// Define a helper interface for filters with min and max values
interface FilterWithMinMax {
    min: number;
    max: number;
}

// Define a helper function to initialize the low and high state values
const initializeLowHigh = (
    selectedFilter: PerformerFilter[keyof PerformerFilter],
    key: keyof FilterWithMinMax
): number | null => {
    return Array.isArray(selectedFilter) || !(key in selectedFilter)
        ? null
        : (selectedFilter as FilterWithMinMax)[key];
};

// FilterItem component
const FilterItem: React.FC<Props> = ({ item, filters, setFilterItem }) => {
    // Get the selected filter from the provided filters
    const selectedFilter = filters[item]

    // Initialize the low and high state values using the helper function
    const [low, setLow] = React.useState(() => initializeLowHigh(selectedFilter, 'min'));
    const [high, setHigh] = React.useState(() => initializeLowHigh(selectedFilter, 'max'));

    // Generate a capitalized version of the item (e.g., 'height' -> 'Height', 'waistSize' -> 'Waist Size')
    const capitalizedWord = React.useMemo(() => {
        const words = item.replace(/([a-z])([A-Z])/g, "$1 $2").split(" ");
        const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
        return capitalizedWords.join(" ");
    }, [item]);

    // Update the filter item when the low and high values change
    React.useEffect(() => {
        if (low && high) setFilterItem(item, [low, high])
    }, [low, high]);

    // Generate the displayed text for the current filter item according to each filter
    const getTextOfFilter = (min: number, max: number) => {
        if (item === 'height') return `${convertCmToFeetAndInches(min)} - ${convertCmToFeetAndInches(max)}`
        if (item === 'shoeSize') return `${min} - ${max}`
        return `${convertCmToInches(min)} - ${convertCmToInches(max)}`
    }

    // Handle sex selection changes
    const onSexPress = (val: string) => {
        let newArr = [...selectedFilter as string[]]
        if (newArr.includes(val)) {
            const index = newArr.indexOf(val);
            if (index > -1) {
                newArr.splice(index, 1);
            }
        } else newArr.push(val)

        setFilterItem('sex', newArr)
    }

    const rangeSelector = () => {
        if (item !== 'sex' && low && high) {
            return (
                <View style={GlobalStyles.rowBetween}>
                    <Text str={getTextOfFilter(low, high)} />
                    <View style={{ flex: 1, }}>
                        <Slider
                            low={low}
                            setLow={setLow}
                            high={high}
                            setHigh={setHigh}
                            min={INITIAIL_FILTERS[item].min}
                            max={INITIAIL_FILTERS[item].max}
                        />
                    </View>
                </View>
            )
        }

        return <SexSelector selectedFilter={selectedFilter as string[]} onSexPress={onSexPress} />;
    }

    return (
        <Accordion
            title={capitalizedWord}
            children={rangeSelector()}
        />
    );
};

export default FilterItem;