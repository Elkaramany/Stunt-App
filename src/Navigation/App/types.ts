import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { Performer } from '@RealmTypes';

export type AppTabParamList = {
    Home: undefined;
    Lists: undefined;
    Info: undefined;
};

export type AppStackParamList = {
    Tabs: AppTabParamList;
    Performer: { item: Performer };
};

export type TabsNavigationProp = StackNavigationProp<AppStackParamList>;
export type TabsRouteProp = RouteProp<AppStackParamList, 'Tabs'>;

export type PerformerNavigationProp = StackNavigationProp<AppStackParamList, 'Performer'>;
export type PerformerRouteProp = RouteProp<AppStackParamList, 'Performer'>;