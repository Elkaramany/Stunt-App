import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Lists, AddList, PerformanceList, Filter } from '@Screens';
import { INITIAIL_FILTERS, PerformerFilter } from "@RealmTypes";
import { ListStackParamList } from "./types";

interface ListStackNavigatorContextProps {
    filters: PerformerFilter,
    setFilters: React.Dispatch<React.SetStateAction<PerformerFilter>>,
}

const ListNavigatorContext = React.createContext<ListStackNavigatorContextProps>({} as ListStackNavigatorContextProps);

function ListStackNavigatorProvider(props: { children: React.ReactNode }) {
    const [filters, setFilters] = React.useState<PerformerFilter>(INITIAIL_FILTERS);

    return (
        <ListNavigatorContext.Provider value={{ filters, setFilters }}>
            {props.children}
        </ListNavigatorContext.Provider>
    );
}

const ListStackNavigator = createStackNavigator<ListStackParamList>();

const Navigator = () => {
    const { filters, setFilters } = React.useContext(ListNavigatorContext);

    return (
        <ListStackNavigator.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName={'Index'}
        >
            <ListStackNavigator.Screen name="Index" component={Lists} />

            <ListStackNavigator.Screen name="AddList">
                {(props) => <AddList {...props} filters={filters} setFilters={setFilters} />}
            </ListStackNavigator.Screen>

            <ListStackNavigator.Screen name="PerformanceList" component={PerformanceList} />

            <ListStackNavigator.Screen name="Filters">
                {(props) => <Filter {...props} filters={filters} setFilters={setFilters} />}
            </ListStackNavigator.Screen>
        </ListStackNavigator.Navigator>
    );
};

export default function App() {
    return (
        <ListStackNavigatorProvider>
            <Navigator />
        </ListStackNavigatorProvider>
    );
}