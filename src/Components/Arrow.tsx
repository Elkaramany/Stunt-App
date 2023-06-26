import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Arrow } from '@Assets';

const ArrowIcon: React.FC<{ back?: boolean, fill?: string, onPress?: () => void }> = ({ back, fill, onPress }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{ flex: 0 }}
        >
            <View style={{ transform: [{ scaleX: back ? -1 : 1 }], justifyContent: 'center', alignItems: back ? 'flex-end' : 'flex-start' }}>
                <Arrow fill={fill} />
            </View>
        </TouchableOpacity>
    )
}

export default ArrowIcon;
