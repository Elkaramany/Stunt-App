import React, { createContext, FC, ReactNode, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { REMEMBER, USER } from '@RealmKeys';
import { UserInfo } from '@RealmTypes'

interface AuthContextValue {
    user: UserInfo | null;
    signIn: (user: UserInfo) => Promise<void>;
    signOut: () => Promise<void>;
    loadingUser: boolean
}

// Create a new context object
const AuthContext = createContext<AuthContextValue>({
    user: null,
    signIn: async () => { },
    signOut: async () => { },
    loadingUser: true
});

interface AuthProviderProps {
    children: ReactNode
}

// Create a provider component to wrap your app with the context
const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<UserInfo | null>(null);
    const [loadingUser, setLoading] = React.useState(true)

    // Load user data from AsyncStorage
    const loadUser = async (): Promise<UserInfo | null> => {
        let keyValues = await AsyncStorage.multiGet([USER, REMEMBER]);
        //@ts-ignore
        const user = JSON.parse(keyValues[0][1]) as UserInfo | null;
        //@ts-ignore
        const shouldRemember = JSON.parse(keyValues[1][1]) as boolean;
        if (shouldRemember) setUser(user);
        else AsyncStorage.setItem(USER, JSON.stringify(null))
        setLoading(false)

        return user;
    };

    useEffect(() => {
        loadUser();
    }, []);

    // Sign in the user and update the context state
    const signIn = async (user: UserInfo) => {
        await AsyncStorage.setItem(USER, JSON.stringify(user));
        setUser(user);
    };

    // Sign out the user and update the context state
    const signOut = async () => {
        await AsyncStorage.removeItem(USER);
        setUser(null);
    };

    // Pass the authentication context to the child components
    return (
        <AuthContext.Provider value={{ user, loadingUser, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
