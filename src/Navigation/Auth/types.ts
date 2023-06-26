import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { UserInfo } from '@RealmTypes';

export type AuthStackParamList = {
    Entry: undefined;
    SignIn: undefined;
    SignUp: undefined;
    Success: { user: UserInfo };
};

export type EntryNavigationProp = StackNavigationProp<AuthStackParamList, 'Entry'>;
export type EntryRouteProp = RouteProp<AuthStackParamList, 'Entry'>;

export type SignInNavigationProp = StackNavigationProp<AuthStackParamList, 'SignIn'>;
export type SignInRouteProp = RouteProp<AuthStackParamList, 'SignIn'>;

export type SignUpNavigationProp = StackNavigationProp<AuthStackParamList, 'SignUp'>;
export type SignUpRouteProp = RouteProp<AuthStackParamList, 'SignUp'>;

export type SuccessNavigationProp = StackNavigationProp<AuthStackParamList, 'Success'>;
export type SuccessRouteProp = RouteProp<AuthStackParamList, 'Success'>;