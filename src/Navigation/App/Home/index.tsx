import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Home, Filter } from '@Screens';
import { INITIAIL_FILTERS, PerformerFilter } from "@RealmTypes";

const Stack = createStackNavigator();

interface MainStackNavigatorContextProps {
    filters: PerformerFilter,
    setFilters: React.Dispatch<React.SetStateAction<PerformerFilter>>,
}

const MainStackNavigatorContext = React.createContext<MainStackNavigatorContextProps>({} as MainStackNavigatorContextProps);

function MainStackNavigatorProvider(props: { children: React.ReactNode }) {
    const [filters, setFilters] = React.useState<PerformerFilter>(INITIAIL_FILTERS);

    return (
        <MainStackNavigatorContext.Provider value={{ filters, setFilters }}>
            {props.children}
        </MainStackNavigatorContext.Provider>
    );
}

const MainStackNavigator = () => {
    const { filters, setFilters } = React.useContext(MainStackNavigatorContext);

    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName={'Index'}
        >
            <Stack.Screen name="Index">
                {(props) => <Home {...props} filters={filters} />}
            </Stack.Screen>
            <Stack.Screen name="Filters">
                {(props) => <Filter {...props} filters={filters} setFilters={setFilters} />}
            </Stack.Screen>
        </Stack.Navigator>
    );
};

export default function App() {
    return (
        <MainStackNavigatorProvider>
            <MainStackNavigator />
        </MainStackNavigatorProvider>
    );
}