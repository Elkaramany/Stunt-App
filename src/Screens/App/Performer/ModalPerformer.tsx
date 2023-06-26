import React from 'react'
import { View, TouchableOpacity, StyleSheet, Linking } from 'react-native'
import { Modal, Text } from '@Components'
import { Colors, GlobalStyles } from '@Config'
import { verticalScale } from 'react-native-size-matters'
import { Performer } from '@RealmTypes'

interface Props {
    isVisible: boolean,
    setVisible: (val: boolean) => void, 
    item: Performer
}

const ModalPerformer: React.FC<Props> = ({ isVisible, setVisible, item }) => {
    return (
        <Modal
            isVisible={isVisible}
            setVisible={setVisible}
        >
            <View style={styles.contactContainer}>
                <Text str={`Contact ${item.firstName}`} style={{ color: Colors.subTitle, }} />
            </View>
            <TouchableOpacity
                onPress={() => Linking.openURL(`tel:${'1234567890'}`)}
                style={styles.contactContainer}>
                <Text str={`Call ${item.firstName}`} style={{ color: Colors.tertiary, fontWeight: '500' }} big />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() =>
                    Linking.openURL(
                        `whatsapp://send?text=Hello&phone=${'1234567890'}`
                    )
                }
                style={styles.contactContainer}>
                <Text str={`Whatsapp Message ${item.firstName}`} style={{ color: Colors.tertiary, fontWeight: '500' }} big />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => Linking.openURL(`mailto:${'email@example.com'}`)}
                style={[styles.contactContainer, { borderBottomWidth: 0 }]}>
                <Text str={`Email ${item.firstName}`} style={{ color: Colors.tertiary, fontWeight: '500' }} big />
            </TouchableOpacity>
        </Modal>
    )
}

const styles = StyleSheet.create({
    contactContainer: {
        width: '100%',
        ...GlobalStyles.centeredContainer,
        ...GlobalStyles.bottomBorder,
        paddingVertical: verticalScale(20),
    }
})

export default ModalPerformer