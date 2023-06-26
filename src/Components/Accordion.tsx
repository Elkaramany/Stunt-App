import React, { ReactNode, useState, useRef } from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    View,
    UIManager,
    LayoutAnimation,
    Animated
} from 'react-native';
import Arrow from './Arrow'
import Text from './Text'
import { ANDROID, GlobalStyles, Colors } from '@Config';
import { scale, verticalScale } from 'react-native-size-matters';

interface Props {
    title: string;
    children: ReactNode;
}

if (ANDROID) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const AccordionItem: React.FC<Props> = ({ children, title }) => {
    const [expanded, setExpanded] = useState(false);
    const animation = useRef(new Animated.Value(0)).current;

    function toggleItem() {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpanded(!expanded);
        Animated.timing(animation, {
            toValue: expanded ? 0 : 1,
            duration: 300,
            useNativeDriver: true
        }).start();
    }

    const body = <View style={styles.accordBody}>{children}</View>;

    const iconRotation = animation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '90deg']
    });

    return (
        <View style={styles.accordContainer}>
            <TouchableOpacity style={styles.accordHeader} onPress={toggleItem}>
                <Text str={title} big />
                <Animated.View style={{ transform: [{ rotate: iconRotation }] }}>
                    <Arrow fill={Colors.placeholder} />
                </Animated.View>
            </TouchableOpacity>
            {expanded && body}
        </View>
    );
};

export default AccordionItem;

const styles = StyleSheet.create({
    accordContainer: {
        ...GlobalStyles.bottomBorder,
        paddingVertical: verticalScale(15),
    },
    accordHeader: {
        padding: scale(5),
        ...GlobalStyles.rowBetween,
    },
    accordBody: {
        padding: scale(5)
    },
});
