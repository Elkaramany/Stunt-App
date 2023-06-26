import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Entry, SignIn, SignUp, Success } from '@Screens';

import { AuthStackParamList } from "./types";

const Stack = createStackNavigator<AuthStackParamList>();

const MainStackNavigator = () => {

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='Entry'>
            <Stack.Screen name="Entry" component={Entry} />
            <Stack.Screen name="SignIn" component={SignIn} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="Success" component={Success} />
        </Stack.Navigator>
    );
};

export default MainStackNavigator;
