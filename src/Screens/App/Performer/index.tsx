import React from 'react'
import { View, StyleSheet, ImageBackground, Image, TouchableOpacity } from 'react-native'
import { Button, MemberShip, Text } from '@Components'
import { ProfileHeader, GenericUser, BackArrow, AddToListIcon } from '@Assets'
import { PerformerRouteProp, PerformerNavigationProp } from '@NavigationTypes'
import { Colors, GlobalStyles } from '@Config'
import Tabs from './Tabs'
import { scale, verticalScale } from 'react-native-size-matters'
import ModalPerformer from './ModalPerformer'
import ModalPDF from './ModalPDF'
import ListModal from './ListModal'

interface Props {
    navigation: PerformerNavigationProp
    route: PerformerRouteProp
}

const Index: React.FC<Props> = ({ navigation, route }) => {
    const { item } = route.params
    const [contactVisible, setContactVisible] = React.useState(false)
    const [pdfVisible, setPdfVisible] = React.useState(false)
    const [listModal, setListModal] = React.useState(false)

    return (
        <View style={{ flex: 1 }}>
            {contactVisible && <ModalPerformer isVisible={contactVisible} setVisible={setContactVisible} item={item} />}
            {listModal && <ListModal isVisible={listModal} setVisible={setListModal} item={item} />}
            {pdfVisible && <ModalPDF isVisible={pdfVisible} setVisible={setPdfVisible} item={item} />}
            <ImageBackground source={ProfileHeader} style={{ flex: 3 }}>
                <View style={[GlobalStyles.rowBetween, { paddingTop: verticalScale(40), paddingHorizontal: scale(20) }]}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}>
                        <BackArrow />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => setListModal(true)}
                    >
                        <Image source={AddToListIcon} style={{ width: scale(30), height: scale(30), tintColor: 'red' }} />
                    </TouchableOpacity>
                </View>
            </ImageBackground>

            <View style={styles.container}>
                <View style={[GlobalStyles.centeredContainer, { bottom: scale(50) }]}>
                    <Image
                        source={GenericUser}
                        style={styles.userImgStyle}
                    />

                    <Text str={item.name} bigger />
                    <MemberShip grade={item.grade} checking />
                </View>
                <View style={{ bottom: scale(30) }}>
                    <Tabs item={item} />
                </View>
            </View>

            <View style={[GlobalStyles.bottomContainer, GlobalStyles.rowAround, { backgroundColor: Colors.primary }]}>
                <Button
                    str='Create PDF'
                    ButtonStyle={{ width: '45%', backgroundColor: Colors.pink }}
                    TextStyle={{ color: '#3D435F' }}
                    onPress={() => setPdfVisible(true)}
                />
                <Button
                    str='Contact'
                    ButtonStyle={{ width: '45%', backgroundColor: Colors.brightRed }}
                    onPress={() => setContactVisible(true)}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 7,
        borderTopRightRadius: scale(15),
        borderTopLeftRadius: scale(15),
        backgroundColor: Colors.primary,
        bottom: scale(10),
    },
    userImgStyle: {
        width: scale(90),
        height: scale(90),
        borderRadius: scale(90),
        resizeMode: 'contain',
        marginBottom: verticalScale(10),
    }
})

export default Index;