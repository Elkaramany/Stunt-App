import React from 'react'
import { View, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import { Container, Text, GradientView, Spinner } from '@Components'
import { PerformerListType, usePerformerList } from '@Realm'
import { Colors, GlobalStyles, WIDTH } from '@Config'
import { ListItemIcon, LogoSVG, PlusIccon } from '@Assets'
import { scale, verticalScale } from 'react-native-size-matters'
import { ListIndexNavigationProp, ListIndexRouteProp } from '@NavigationTypes'

interface Props {
    navigation: ListIndexNavigationProp
    route: ListIndexRouteProp
}

const Index: React.FC<Props> = ({ navigation }) => {
    const {
        performerLists,
        isLoading,
        fetchPerformersData,
    } = usePerformerList();

    React.useEffect(() => {
        // Subscribe to the focus event
        const unsubscribe = navigation.addListener('focus', async () => {
            await fetchPerformersData();
        });

        return () => {
            // Unsubscribe from the focus event when the component unmounts
            unsubscribe();
        };
    }, [navigation]);

    const renderItem = ({ item }: { item: PerformerListType }) => {
        if (!item || item.shouldDelete) return <View />
        return (
            <View style={{ width: WIDTH, marginVertical: verticalScale(5) }}>
                <View style={styles.shadow}>
                    <GradientView colors={['#f1f1f3', '#f4fafb', '#e2e4f2']}>
                        <View style={styles.gradientWrapper}>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('PerformanceList', { item })}
                                style={{ padding: scale(15), width: WIDTH * 0.9 }}>
                                <ListItemIcon />
                                <Text str={item.title} bigger style={{ marginVertical: verticalScale(20) }} />
                                <Text str={`Performers: ${item.performersId.length}`} style={{ color: Colors.placeholder }} />
                            </TouchableOpacity>
                        </View>
                    </GradientView>
                </View>
            </View>
        )
    }

    return (
        <Container>
            <View style={GlobalStyles.centeredContainer}>
                <LogoSVG />
            </View>

            <View style={[GlobalStyles.rowBetween, { marginTop: verticalScale(10) }]}>
                <Text str='Lists' biggest />
                <TouchableOpacity onPress={() => navigation.navigate('AddList', { canEdit: false })}>
                    <PlusIccon />
                </TouchableOpacity>
            </View>

            {isLoading ?
                <Spinner />
                :
                <FlatList
                    data={performerLists}
                    keyExtractor={pl => `${pl.id}`}
                    renderItem={renderItem}
                    ListEmptyComponent={() => <Text str={`You don't have any lists created`} style={{ marginTop: verticalScale(10), color: Colors.brightRed }} />}
                />
            }
        </Container>
    )
}

const styles = StyleSheet.create({
    shadow: {
        width: '100%',
        shadowColor: "#000",
        shadowOffset: {
            width: 8,
            height: 5,
        },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 9,
    },
    gradientWrapper: {
        backgroundColor: 'transparent',
        overflow: 'visible',
    },
})


export default Index;