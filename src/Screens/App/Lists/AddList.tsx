import React from 'react'
import { View, TouchableOpacity, Alert, TouchableWithoutFeedback, TouchableHighlight } from 'react-native'
import { Container, Input, Text, Button, PerformerContainer, Spinner } from '@Components'
import { Colors, GlobalStyles } from '@Config'
import { verticalScale } from 'react-native-size-matters'
import { usePerformerList } from '@Realm'
import { AddListNavigationProp, AddListRouteProp } from '@NavigationTypes'
import { INITIAIL_FILTERS, Performer, PerformerFilter } from '@RealmTypes'
import PerformerList from '../PerformerList'
import { addPerformer, isSelected } from './utils'

interface Props {
    navigation: AddListNavigationProp
    route: AddListRouteProp
    filters: PerformerFilter
    setFilters: (newFilter: PerformerFilter) => void
}

const AddList: React.FC<Props> = ({ navigation, route, filters, setFilters }) => {
    const { canEdit, listToEdit } = route.params
    const { addPerformerList, updatePerformerList } = usePerformerList()
    const [title, setTitle] = React.useState('')
    const [ids, setIds] = React.useState<string[]>([])
    const [loading, setLoading] = React.useState(true)

    React.useEffect(() => {
        console.log(listToEdit)
        setLoading(true)

        if (canEdit && listToEdit) {
            setTitle(listToEdit?.title)
            setIds(listToEdit.performersId)
        }

        setLoading(false)
    }, [])

    const handleAdd = () => {
        if (title.length === 0) {
            Alert.alert("Please make sure to have a suitable title and actors selected")
            return;
        }
        if (canEdit && listToEdit) {
            updatePerformerList(listToEdit?.id, title, ids)
        } else {
            addPerformerList(title, ids)
        }
        setFilters(INITIAIL_FILTERS)
        navigation.goBack()
    }

    const renderItem = ({ item }: { item: Performer }) => {
        return (
            <TouchableOpacity
                onPress={() => addPerformer(item.id, ids, setIds)}
                style={GlobalStyles.rowBetween}
            >
                <PerformerContainer item={item} checking selected={isSelected(item.id, ids)} />
            </TouchableOpacity>
        )
    }

    return (
        <Container>
            <View style={[GlobalStyles.centeredContainer, { marginBottom: verticalScale(20) }]}>
                <Text str={canEdit ? `Edit ` : 'Add new ' + 'list'} biggest />
            </View>
            {loading ?
                <Spinner />
                :
                <>
                    <Input
                        value={title}
                        onChangeText={setTitle}
                        label='List Title'
                        placeholder='My new movie name'
                    />

                    <Text
                        str='Select the perfromer you want to add:'
                        big
                        style={{ marginVertical: verticalScale(10), color: Colors.tertiary }}
                    />

                    <PerformerList
                        navigation={navigation}
                        filters={filters}
                        renderItem={renderItem}
                    />
                    <Button str={canEdit ? `Edit ${listToEdit?.title}` : "Add"} onPress={() => handleAdd()} />
                </>
            }

        </Container>
    )
}

export default AddList;