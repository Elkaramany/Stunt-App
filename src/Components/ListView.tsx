import React, { useState, useCallback, useRef } from 'react';
import { View, Dimensions } from 'react-native';
import { RecyclerListView, DataProvider, LayoutProvider } from 'recyclerlistview';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

type ItemData = any[]

interface RenderItemInfo {
    item: ItemData;
    index: number;
    separators: any;
}

interface Props {
    data: any[];
    renderItem: (info: RenderItemInfo) => JSX.Element;
    itemHeight: number;
    itemWidth?: number;
    itemSeparator: number;
    onItemPress?: (item: ItemData, index: number) => void;
    style?: object;
}

const ListView: React.FC<Props> = ({
    data,
    renderItem,
    itemHeight,
    itemWidth,
    itemSeparator,
    onItemPress,
    style,
    ...props
}) => {
    const [dataProvider, setDataProvider] = useState(
        new DataProvider((r1, r2) => r1 !== r2).cloneWithRows(data),
    );

    const layoutProvider = useRef(
        new LayoutProvider(
            index => 0,
            (type, dim) => {
                dim.width = itemWidth || Dimensions.get('window').width;
                dim.height = itemHeight || 50;
            },
        ),
    );

    const rowRenderer = useCallback(
        (type: number, item: ItemData, index: number, extendedState: any) => (
            <TouchableWithoutFeedback
                onPress={() => onItemPress && onItemPress(item, index)}>
                <View style={[{ flex: 1, padding: itemSeparator }, style]}>
                    {renderItem({ item, index, separators: extendedState })}
                </View>
            </TouchableWithoutFeedback>
        ),
        [itemSeparator, onItemPress, renderItem, style],
    );

    return (
        <RecyclerListView
            style={{ flex: 1 }}
            dataProvider={dataProvider}
            layoutProvider={layoutProvider.current}
            rowRenderer={rowRenderer}
            {...props}
        />
    );
};

export default ListView;