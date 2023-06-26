import React, { useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import RangeSlider from 'rn-range-slider';
import { scale, verticalScale } from 'react-native-size-matters';
import { Colors, GlobalStyles } from '@Config';

interface RangeSliderProps {
    low: number
    setLow: (val: number) => void
    high: number
    setHigh: (val: number) => void
    min: number;
    max: number;

}

const Slider: React.FC<RangeSliderProps> = ({ low, high, min, setLow, max, setHigh }) => {

    const renderThumb = useCallback(
        () => (
            <View
                style={{
                    height: scale(24),
                    width: scale(24),
                    borderRadius: scale(12),
                    backgroundColor: Colors.primary,
                    borderWidth: 0.25,
                    borderColor: Colors.black
                }}
            />
        ),
        []
    );

    const renderRail = useCallback(() => (
        <View
            style={{
                height: scale(2),
                backgroundColor: '#ddd',
                flex: 1,
            }}
        />
    ), []);

    const renderRailSelected = useCallback(() => (
        <View
            style={{
                height: scale(5),
                backgroundColor: Colors.tertiary,
                flex: 1,
            }}
        />
    ), []);

    const handleValueChange = useCallback((low: number, high: number) => {
        const minDifference = 10; // Adjust this value as needed

        if (Math.abs(high - low) >= minDifference) {
            setLow(low);
            setHigh(high);
        }
    }, []);

    return (
        <View style={GlobalStyles.centeredContainer}>
            <RangeSlider
                style={styles.slider}
                min={min}
                max={max}
                low={low}
                high={high}
                step={1}
                floatingLabel={true}
                renderThumb={renderThumb}
                renderRail={renderRail}
                renderRailSelected={renderRailSelected}
                onValueChanged={handleValueChange}
            />
        </View>
    );
};


const styles = StyleSheet.create({
    slider: {
        width: '85%',
        paddingVertical: verticalScale(15),
        justifyContent: 'center'
    },
});

export default Slider;