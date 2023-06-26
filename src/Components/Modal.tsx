import React, { ReactNode, useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Text, ViewStyle } from 'react-native';
import Modal from 'react-native-modal';
import { scale, verticalScale } from 'react-native-size-matters';
import { Colors, GlobalStyles } from '@Config';

interface Props {
    isVisible: boolean;
    setVisible: (val: boolean) => void
    children: ReactNode;
    modalContentStyle?: ViewStyle
}

const CustomModal: React.FC<Props> = ({ children, isVisible, setVisible, modalContentStyle }) => {

    const handleBackdropPress = () => setVisible(false);

    return (
        <Modal
            isVisible={isVisible}
            onBackdropPress={handleBackdropPress}
            backdropOpacity={0.3}
            useNativeDriver={true}
            style={styles.modalContainer}
        >
            <TouchableOpacity
                activeOpacity={1}
                onPress={() => { }}
                style={[styles.modalContent, modalContentStyle]}
            >
                <View style={{ flex: 1, paddingVertical: verticalScale(10), alignItems: 'center' }}>{children}</View>
            </TouchableOpacity>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        width: '100%',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: Colors.primary,
        width: '100%',
        right: '5%',
        top: '3%',
        height: '40%',
        borderRadius: scale(10),
    },
});

export default CustomModal;