import React from 'react';
import { View, TouchableOpacity, Dimensions } from 'react-native';
import { Input, Spinner, Text } from '@Components';
import { verticalScale } from 'react-native-size-matters';
import { Search, FilterIcon } from '@Assets';
import { Colors, GlobalStyles } from '@Config';
import { INITIAIL_FILTERS, Performer, PerformerFilter } from '@RealmTypes';
import { AddListNavigationProp, HomeNavigationProp, ListIndexNavigationProp } from '@NavigationTypes';
import { useIndex } from './useSearchFilter';
import { RecyclerListView, DataProvider, LayoutProvider } from 'recyclerlistview';

interface Props {
    navigation: HomeNavigationProp | AddListNavigationProp
    filters: PerformerFilter;
    renderItem: (params: { item: Performer }) => React.ReactElement;
    canSearch?: boolean
    inputArr?: Performer[]
}

const Index: React.FC<Props> = ({ filters, navigation, renderItem, canSearch = true, inputArr }) => {
    const { performers, isLoading, search, setSearch } = useIndex({ filters, inputArr });

    const dataProvider = new DataProvider((r1, r2) => r1 !== r2).cloneWithRows(performers);

    const layoutProvider = new LayoutProvider(
        () => 0,
        (type, dim) => {
            dim.width = Dimensions.get('window').width || 250;
            dim.height = verticalScale(120); // Use the fixed height
        }
    );

    return (
        <>
            <View style={GlobalStyles.rowBetween}>
                {canSearch &&
                    <View style={{ width: '85%' }}>
                        <Input
                            leftIcon={<Search />}
                            value={search}
                            onChangeText={setSearch}
                            placeholder="e.g. Jon Smith"
                        />
                    </View>
                }
                {navigation && (
                    <TouchableOpacity onPress={() => navigation.navigate('Filters')}>
                        <FilterIcon fill={'red'} />
                        {filters !== INITIAIL_FILTERS && (
                            <View
                                style={{
                                    height: 2,
                                    width: '100%',
                                    backgroundColor: 'red',
                                    marginTop: 3,
                                }}
                            />
                        )}
                    </TouchableOpacity>
                )}
            </View>
            <View style={{ height: verticalScale(10) }} />
            {isLoading ? (
                <Spinner />
            ) :
                performers.length > 0 ?

                    (
                        <RecyclerListView
                            style={{ flex: 1 }}
                            contentContainerStyle={{ backgroundColor: Colors.primary }}
                            dataProvider={dataProvider}
                            layoutProvider={layoutProvider}
                            rowRenderer={(type, item) => renderItem({ item })}
                            renderAheadOffset={500}
                            showsVerticalScrollIndicator={false}

                        />
                    )
                    :
                    (
                        <Text
                            str="No available performers"
                            big
                            style={{
                                color: Colors.brightRed,
                                marginTop: verticalScale(10),
                            }}
                        />
                    )
            }
        </>
    );
};

export default Index;