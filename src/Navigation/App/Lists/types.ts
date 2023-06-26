import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { PerformanceListType } from '@RealmTypes';

export type ListStackParamList = {
    Index: undefined;
    AddList: { canEdit: boolean, listToEdit?: { title: string, id: string, performersId: string[] } };
    PerformanceList: { item: PerformanceListType };
    Filters: undefined;
};

export type ListIndexNavigationProp = StackNavigationProp<ListStackParamList, 'Index'>;
export type ListIndexRouteProp = RouteProp<ListStackParamList, 'Index'>;

export type AddListNavigationProp = StackNavigationProp<ListStackParamList, 'AddList'>;
export type AddListRouteProp = RouteProp<ListStackParamList, 'AddList'>;

export type PerformanceListNavigationProp = StackNavigationProp<ListStackParamList, 'PerformanceList'>;
export type PerformanceListRouteProp = RouteProp<ListStackParamList, 'PerformanceList'>;

export type FiltersNavigationProp = StackNavigationProp<ListStackParamList, 'Filters'>;
export type FiltersRouteProp = RouteProp<ListStackParamList, 'Filters'>;