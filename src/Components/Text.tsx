import React from 'react';
import { Text, TextStyle, ViewStyle, Platform } from 'react-native';
import { scale } from 'react-native-size-matters';
import { Colors, IOS } from '@Config';

interface Props {
    str: string | undefined
    color?: string
    style?: TextStyle | ViewStyle | Array<ViewStyle | TextStyle> | Array<TextStyle | undefined>;
    big?: boolean
    bigger?: boolean
    biggest?: boolean
    small?: boolean
}

const RegText: React.FC<Props> = ({ str, color, style, big, bigger, biggest, small }) => {

    const getSizeOfFont = () => {
        if (str && str?.length > 1000) return IOS ? scale(12) : scale(11);
        if (str && str?.length > 750) return IOS ? scale(15) : scale(13);
        if (big) return IOS ? scale(18) : scale(16);
        else if (bigger) return IOS ? scale(20) : scale(18);
        else if (biggest) return IOS ? scale(34) : scale(32);
        else if (small) return IOS ? scale(13) : scale(11);
        return IOS ? scale(15) : scale(13);
    };

    return (
        <Text style={[{ fontSize: getSizeOfFont(), color: color || Colors.black, fontWeight: biggest || bigger ? 'bold' : 'normal' }, style]}>
            {str}
        </Text>
    )
}

export default RegText