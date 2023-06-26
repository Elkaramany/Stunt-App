import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

export type InfoStackParamList = {
    Index: undefined;
    FAQ: undefined
    MemberResources: undefined
    Guidelines: undefined
    Book: undefined
    TermsAndConditions: undefined
    PrivacyPolicy: undefined
};

export type InfoNavigationProp = StackNavigationProp<InfoStackParamList, 'Index'>;
export type InfoRouteProp = RouteProp<InfoStackParamList, 'Index'>;

export type FAQNavigationProp = StackNavigationProp<InfoStackParamList, 'Index'>;
export type FAQRouteProp = RouteProp<InfoStackParamList, 'Index'>;

export type MemberResourcesNavigationProp = StackNavigationProp<InfoStackParamList, 'Index'>;
export type MemberResourcesRouteProp = RouteProp<InfoStackParamList, 'Index'>;

export type GuidelinesNavigationProp = StackNavigationProp<InfoStackParamList, 'Index'>;
export type GuidelinesRouteProp = RouteProp<InfoStackParamList, 'Index'>;

export type BookNavigationProp = StackNavigationProp<InfoStackParamList, 'Index'>;
export type BookRouteProp = RouteProp<InfoStackParamList, 'Index'>;

export type TermsAndConditionsNavigationProp = StackNavigationProp<InfoStackParamList, 'Index'>;
export type TermsAndConditionsRouteProp = RouteProp<InfoStackParamList, 'Index'>;

export type PrivacyPolicyNavigationProp = StackNavigationProp<InfoStackParamList, 'Index'>;
export type PrivacyPolicyRouteProp = RouteProp<InfoStackParamList, 'Index'>;