import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import { Info, FAQ, MemberResources, Book, Guidelines, TermsAndConditions, PrivacyPolicy } from '@Screens';
import { InfoStackParamList } from "./types";

const Stack = createStackNavigator<InfoStackParamList>();

const MainStackNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName={'Index'}
        >
            <Stack.Screen name="Index" component={Info} />
            <Stack.Screen name="FAQ" component={FAQ} />
            <Stack.Screen name="MemberResources" component={MemberResources} />
            <Stack.Screen name="Book" component={Book} />
            <Stack.Screen name="Guidelines" component={Guidelines} />
            <Stack.Screen name="TermsAndConditions" component={TermsAndConditions} />
            <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
        </Stack.Navigator>
    );
};

export default MainStackNavigator;