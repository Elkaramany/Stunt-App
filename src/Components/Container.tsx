import React, { ReactNode } from 'react';
import { View, ViewStyle } from 'react-native';
import { Colors, IOS, hasNotch } from '@Config';
import { getStatusBarHeight } from 'react-native-status-bar-height';

interface Props {
    bigContainerStyle?: ViewStyle;
    smallContainerStyle?: ViewStyle;
    backgroundColor?: string;
    paddingHorizontal?: number | string;
    children: ReactNode;
}

const Container: React.FC<Props> = ({
    bigContainerStyle,
    smallContainerStyle,
    backgroundColor = Colors.primary,
    paddingHorizontal = '3%',
    children,
}) => {

    const topPadding = IOS ? getStatusBarHeight() + (hasNotch() ? 40 : 0) : 0

    return (
        <View style={[{ flex: 1, backgroundColor }, bigContainerStyle]}>
            <View style={[{ flex: 1, paddingHorizontal, paddingTop: topPadding }, smallContainerStyle]}>{children}</View>
        </View>
    );
};

export default Container;