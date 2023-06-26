import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

export type MainStackParamList = {
    Index: undefined;
    Filters: undefined;
};

export type HomeNavigationProp = StackNavigationProp<MainStackParamList, 'Index'>;
export type HomeRouteProp = RouteProp<MainStackParamList, 'Index'>;

export type FiltersNavigationProp = StackNavigationProp<MainStackParamList, 'Filters'>;
export type FiltersRouteProp = RouteProp<MainStackParamList, 'Filters'>;
