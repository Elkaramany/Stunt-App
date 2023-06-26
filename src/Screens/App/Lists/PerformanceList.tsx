import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { Container, Spinner, Text, PerformerContainer } from '@Components';
import { PerformanceListNavigationProp, PerformanceListRouteProp, TabsNavigationProp } from '@NavigationTypes';
import { GlobalStyles, Colors } from '@Config';
import { BackArrowBlack, DeleteIcon, LogoSVG, PlusIccon } from '@Assets';
import PerformerList from '../PerformerList';
import { INITIAIL_FILTERS, Performer } from '@RealmTypes';
import Swipeout from 'react-native-swipeout';
import { scale } from 'react-native-size-matters';
import { usePerformanceListLogic } from './usePerformanceListLogic';

interface Props {
    navigation: PerformanceListNavigationProp & TabsNavigationProp
    route: PerformanceListRouteProp;
}

const PerformanceList: React.FC<Props> = ({ navigation, route }) => {
    const { item } = route.params;
    const { isLoading, selectedPerformer, deleteOnePerformer, handleDeleteAll } = usePerformanceListLogic({ navigation, item });

    return (
        <Container>
            <View style={GlobalStyles.rowBetween}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={BackArrowBlack} />
                </TouchableOpacity>
                <LogoSVG />
                <View />
            </View>
            <View style={GlobalStyles.rowBetween}>
                <Text str={`${item.title}`} biggest />
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => handleDeleteAll()}>
                        <DeleteIcon />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{ marginHorizontal: scale(10) }}
                        onPress={() => navigation.navigate('AddList', { canEdit: true, listToEdit: item })}>
                        <PlusIccon />
                    </TouchableOpacity>
                </View>
            </View>
            {
                !item || item.shouldDelete ? <View />
                    :
                    isLoading ? (
                        <Spinner />
                    ) : (
                        <PerformerList
                            navigation={null}
                            filters={INITIAIL_FILTERS}
                            canSearch={false}
                            renderItem={({ item }: { item: Performer }) => {
                                if (!item) return <View />
                                return (
                                    //@ts-ignore
                                    <Swipeout
                                        key={item.id}
                                        style={{ backgroundColor: Colors.primary }}
                                        right={[
                                            {
                                                text: 'Delete',
                                                backgroundColor: 'red',
                                                onPress: () => deleteOnePerformer(item.id),
                                            },
                                        ]}
                                    >
                                        <TouchableOpacity
                                            onPress={() => navigation.navigate('Performer', { item })}>
                                            <PerformerContainer item={item} />
                                        </TouchableOpacity>
                                    </Swipeout>
                                )
                            }}
                            inputArr={selectedPerformer}
                        />
                    )
            }
        </Container>
    );
};

export default PerformanceList;    