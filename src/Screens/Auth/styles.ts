import { StyleSheet } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import { scale, verticalScale } from 'react-native-size-matters'
import { Colors, GlobalStyles } from '@Config'

const styles = StyleSheet.create({
    topContainer: {
        flex: 5,
        paddingTop: getStatusBarHeight()
    },
    titleContainer: {
        ...GlobalStyles.centeredContainer,
        flex: 1,
    },
    rightAlignedSign: {
        alignSelf: 'flex-end',
        backgroundColor: Colors.light,
        padding: scale(10),
        paddingHorizontal: scale(15),
        marginRight: scale(10),
        borderRadius: scale(20),
    },
    bottomContainer: {
        flex: 6,
        backgroundColor: Colors.primary,
        paddingHorizontal: '3%'
    }
})

export default styles
