import React from "react";
import { createStackNavigator, StackNavigationOptions } from "@react-navigation/stack";
import { Performer } from '@Screens';
import Tabs from './tabs'
import { AppStackParamList } from "../types";

const RootStack = createStackNavigator<AppStackParamList>();

const MainStackNavigator = () => {

    return (
        <RootStack.Navigator screenOptions={{ headerShown: false }}>
            <RootStack.Screen
                name="Tabs"
                component={Tabs}
            />
            <RootStack.Screen
                name="Performer"
                component={Performer}
            />
        </RootStack.Navigator>
    );
};

export default MainStackNavigator;
