import React from 'react'
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Button, Container, Text } from '@Components'
import { Colors, GlobalStyles, WIDTH } from '@Config'
import { AuthContext } from '@Context'
import { scale, verticalScale } from 'react-native-size-matters'
import { Arrow, FacebookIcon, GenericUser, GoogleIcon, InstagramIcon, Mail, MailRed, PhoneIcon, WebIcon, WhatsappIcon, YoutubeIcon } from '@Assets'
import { InfoNavigationProp, InfoRouteProp, InfoStackParamList } from '@NavigationTypes'

interface Props {
    navigation: InfoNavigationProp
    route: InfoRouteProp
}

const Index: React.FC<Props> = ({ navigation }) => {
    const { signOut } = React.useContext(AuthContext);
    const ICON_WIDTH = WIDTH / 6.5

    const handleLogout = async () => {
        await signOut()
    }

    const tabHeader = (str: string) => <Text str={str} big style={{ fontWeight: '500' }} />

    const tabHbutton = (title: string, destination: keyof InfoStackParamList) => {
        return (
            <TouchableOpacity
                onPress={() => navigation.navigate(destination)}
                style={[styles.seperator, GlobalStyles.rowBetween]}>
                <Text str={title} big />
                <Arrow fill={Colors.placeholder} />
            </TouchableOpacity>
        )
    }

    return (
        <Container>
            <Text str='Info' biggest style={{ padding: verticalScale(20) }} />

            {tabHeader('Get in touch')}
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                style={{ paddingLeft: scale(10), marginTop: verticalScale(10) }}>
                <Text str='Club Admin - Room 66' style={{ color: Colors.subTitle }} />
                <Text str='Pinewood Studios' style={{ color: Colors.subTitle }} />
                <Text str='pinewood Road' style={{ color: Colors.subTitle }} />
                <Text str='Iver Health' style={{ color: Colors.subTitle }} />
                <Text str='SL0 0NH' style={{ color: Colors.subTitle }} />

                <View style={[styles.seperator, GlobalStyles.rowBetween]}>
                    <PhoneIcon width={ICON_WIDTH} height={ICON_WIDTH} />
                    <MailRed fill={'red'} width={ICON_WIDTH} height={ICON_WIDTH} />
                    <WhatsappIcon width={ICON_WIDTH} height={ICON_WIDTH} />
                </View>

                <View style={styles.seperator}>
                    {tabHeader('Opening hours')}
                    <View style={GlobalStyles.rowBetween}>
                        <Text str='Monday - Friday' />
                        <Text str='9 AM - 5 PM' />
                    </View>
                </View>

                <View style={styles.seperator}>
                    <Text str='Socials' big style={{ fontWeight: '500' }} />
                    <View style={GlobalStyles.rowBetween}>
                        <WebIcon width={ICON_WIDTH} height={ICON_WIDTH} />
                        <FacebookIcon width={ICON_WIDTH} height={ICON_WIDTH} />
                        <InstagramIcon width={ICON_WIDTH} height={ICON_WIDTH} />
                        <YoutubeIcon width={ICON_WIDTH} height={ICON_WIDTH} />
                    </View>
                </View>


                {tabHbutton(`FAQ's`, 'FAQ')}
                {tabHbutton(`Member Resources`, 'MemberResources')}
                {tabHbutton(`Get Printed Book`, 'Book')}
                {tabHbutton(`Image Guidelines`, 'Guidelines')}
                {tabHbutton(`Terms and Conditions`, 'TermsAndConditions')}
                {tabHbutton(`Privacy Policy`, 'PrivacyPolicy')}

            </ScrollView>


            <Button
                str='Logout'
                ButtonStyle={styles.bottomButton}
                onPress={handleLogout}
            />
        </Container>
    )
}

const styles = StyleSheet.create({
    bottomButton: {
        backgroundColor: Colors.tertiary,
        borderRadius: scale(10),
        marginHorizontal: '3%',
        marginTop: verticalScale(10),
    }, seperator: {
        borderTopWidth: 0.25,
        ...GlobalStyles.bottomBorder,
        borderBottomWidth: 0,
        paddingVertical: verticalScale(18),
    }
})

export default Index;