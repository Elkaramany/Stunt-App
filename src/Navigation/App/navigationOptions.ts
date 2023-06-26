import { ANDROID, Colors } from "@Config";

export const bottomTabOptions = {
    headerShown: false,
    tabBarShowLabel: false,
    tabBarStyle: {
        backgroundColor: Colors.primary,
        borderTopWidth: 0,
        elevation: ANDROID ? 8 : 0,
    },
};
