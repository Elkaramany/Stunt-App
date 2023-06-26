import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image } from 'react-native'
import { ListsIcon, HomeIcon, InfoIcon, HomeUnfocused, ListsUnfocused, InfoUnfocused } from "@Assets";
import Home from './Home'
import Lists from './Lists'
import Info from './Info'
import { SvgProps } from "react-native-svg";
import { bottomTabOptions } from "./navigationOptions";
import { AppTabParamList } from "../types";

type TabIconProps = {
    icon: React.ComponentType<SvgProps>;
    inActiveIcon: any;
    focused: boolean;
}

const ICON_SIZE = 30;

const Tab = createBottomTabNavigator<AppTabParamList>();

const TabIcon: React.FC<TabIconProps> = ({ icon: IconComponent, inActiveIcon, focused }) => (
    focused ?
        <IconComponent
            width={ICON_SIZE + 5}
            height={ICON_SIZE + 5}
        />
        :
        <Image source={inActiveIcon} style={{ width: ICON_SIZE, height: ICON_SIZE }} />
);

export default function BottomTabNavigator() {
    return (
        <Tab.Navigator initialRouteName="Home" screenOptions={bottomTabOptions}>
            <Tab.Screen
                name="Home"
                component={Home}
                options={{ tabBarIcon: ({ focused }) => <TabIcon icon={HomeIcon} inActiveIcon={HomeUnfocused} focused={focused} /> }}
            />
            <Tab.Screen
                name="Lists"
                component={Lists}
                options={{ tabBarIcon: ({ focused }) => <TabIcon icon={ListsIcon} inActiveIcon={ListsUnfocused} focused={focused} /> }}
            />
            <Tab.Screen
                name="Info"
                component={Info}
                options={{ tabBarIcon: ({ focused }) => <TabIcon icon={InfoIcon} inActiveIcon={InfoUnfocused} focused={focused} /> }}
            />
        </Tab.Navigator>
    );
}
