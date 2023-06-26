import { scale, verticalScale } from 'react-native-size-matters';
import { Platform, StyleSheet, Dimensions } from 'react-native';

const IOS: boolean = Platform.OS === 'ios';
const ANDROID: boolean = Platform.OS === 'android';
const WIDTH: number = Dimensions.get('window').width
const HEIGHT: number = Dimensions.get('window').height

const Colors = {
    primary: '#FFF',
    background: '#F2F2F2',
    secondary: '#F8F8F8',
    tertiary: '#3e8de2',
    subTitle: '#8083A3',
    blue: '#2222FF',
    placeholder: '#8083A3',
    light: '#f3f3fe',
    lime: '#39D800',
    baige: '#ce9231',
    orange: '#da6928',
    red: '#d7311f',
    brightRed: '#ea475d',
    pink: '#f8d8df',
    black: '#000',
    gray: '#E4E6E8',
}

const GlobalStyles = StyleSheet.create({
    centeredContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerTextStyle: {
        fontSize: verticalScale(5),
        fontWeight: "400",
        color: Colors.secondary
    },
    rowRegular: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    rowBetween: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    rowAround: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    rowCenter: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    rowWrap: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    textInputContainer: {
        marginBottom: verticalScale(30),
        width: scale(90),
        borderRadius: scale(50),
    }, buttonContainer: {
        backgroundColor: Colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        padding: scale(2.4),
        borderRadius: scale(3),
        margin: verticalScale(2),
    }, buttonText: {
        fontSize: verticalScale(3),
        fontWeight: 'bold',
        color: Colors.primary
    }, textMissMatch: {
        color: Colors.gray,
        fontSize: verticalScale(2),
        fontWeight: 'bold',
        textAlign: 'center'
    }, headerContainer: {
        height: verticalScale(20)
    }, regularText: {
        fontSize: scale(20),
        color: Colors.secondary
    }, bottomBorder: {
        borderBottomWidth: 0.25,
        borderColor: Colors.black,
    }, bottomContainer: {
        flex: 1,
        justifyContent: 'flex-end',
    }, bottomAbsoluted: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
    }, checkerContainer: {
        height: scale(20),
        width: scale(20),
        top: verticalScale(15),
        right: scale(10),
        borderWidth: 1,
        borderColor: Colors.black,
        padding: scale(1)
    }
})

export { Colors, GlobalStyles, IOS, ANDROID, WIDTH, HEIGHT };