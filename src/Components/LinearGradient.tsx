import React, { ReactNode } from 'react';
import { View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const GradientView: React.FC<{ colors: string[], children: ReactNode }> = ({ colors, children }) => {
    return (
        <LinearGradient
            colors={colors}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{
                flex: 1,
                width: '90%',
                height: '100%',
                borderRadius: 10,
                padding: 10
            }}>
            {children}
        </LinearGradient>
    );
};

export default GradientView;
