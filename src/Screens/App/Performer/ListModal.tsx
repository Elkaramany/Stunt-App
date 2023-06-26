import React from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import { Modal, Text, Spinner } from '@Components'
import { Colors, GlobalStyles, WIDTH, isPresentInMyIds } from '@Config'
import { scale, verticalScale } from 'react-native-size-matters'
import { CheckMark } from '@Assets'
import { Performer, PerformanceListType } from '@RealmTypes'
import { usePerformerList } from '@Realm'
import { FlatList } from 'react-native-gesture-handler'

interface Props {
    isVisible: boolean,
    setVisible: (val: boolean) => void,
    item: Performer
}

const ListModal: React.FC<Props> = ({ isVisible, setVisible, item }) => {
    const {
        performerLists,
        togglePerformerInList,
        isLoading
    } = usePerformerList();
    const [checkedList, setCheckedList] = React.useState<string[]>([])
    const performerId = item.id

    React.useEffect(() => {
        if (performerLists.length === 0) return;

        let arr = []
        for (let i = 0; i < performerLists.length; i++) {
            let list = performerLists[i]
            if (isPresentInMyIds(performerId, list.performersId)) arr.push(list.id)
        }

        setCheckedList(arr)
    }, [performerLists])

    const renderItem = ({ item }: { item: PerformanceListType }) => {
        return (
            <TouchableOpacity
                style={[GlobalStyles.rowBetween, styles.listContainer]}
                onPress={() => !isLoading && togglePerformerInList(performerId, item.id)}
            >
                <Text str={item.title} />

                <View style={[GlobalStyles.checkerContainer, { top: 0, borderWidth: isLoading ? 0 : 1 }]}>
                    {
                        isLoading ?
                            <Spinner />
                            :
                            isPresentInMyIds(item.id, checkedList) && <CheckMark />
                    }
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <Modal
            isVisible={isVisible}
            setVisible={setVisible}
            modalContentStyle={{ height: '55%' }}
        >
            <View style={styles.contactContainer}>
                <Text str={`Add ${item.firstName} to a list`} style={{ color: Colors.subTitle, }} />
            </View>
            <FlatList
                contentContainerStyle={{ width: '100%' }}
                data={performerLists}
                keyExtractor={pList => `${pList.id}`}
                renderItem={renderItem}
                ListEmptyComponent={() => <Text str='You have no lists created' style={{ marginTop: '5%', color: Colors.brightRed }} />}
            />
        </Modal>
    )
}

const styles = StyleSheet.create({
    contactContainer: {
        width: '100%',
        ...GlobalStyles.centeredContainer,
        ...GlobalStyles.bottomBorder,
        paddingVertical: verticalScale(10),
    }, listContainer: {
        width: WIDTH,
        paddingVertical: verticalScale(10),
        paddingHorizontal: scale(20),
        marginVertical: verticalScale(10),
        ...GlobalStyles.bottomBorder,
    }
})

export default ListModal