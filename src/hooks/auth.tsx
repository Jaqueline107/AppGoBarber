import React, {
    createContext,
    useCallback,
    useState,
    useContext,
    useEffect,
    ReactNode,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import api from '../services/api';

interface User {
    id: string;
    avatar_url: string;
    name: string;
    email: string;
}

interface SignInCredencials {
    email: string;
    password: string;
}

interface AuthState {
    user: User;
    token: string;
}

interface AuthContextData {
    user: User;
    loading: boolean;
    signIn(credentials: SignInCredencials): Promise<void>;
    signOut(): void;
    updateUser(user: User): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps){
    const [data, setData] = useState<AuthState>({} as AuthState);
    const [loading, setloading] = useState(true)

    useEffect(() => {
        async function loadStorageData(): Promise<void> {
            const [[, token], [, user]] = await AsyncStorage.multiGet([
                '@GoBarber:token',
                '@GoBarber:user',
            ]);

            if (token && user) {
                setData({ token, user: JSON.parse(user) });
            }
            setloading(false)
        }

        loadStorageData();
    }, []);

    const signIn = useCallback(
        async ({ email, password }:SignInCredencials) => {
            const response = await api.post('/users/sessions', {
                email,
                password,
            }
    )
            const { user, token } = response.data;

            await AsyncStorage.setItem('@GoBarber:token', token);
            await AsyncStorage.setItem('@GoBarber:user', JSON.stringify(user));

            await AsyncStorage.multiSet([
                ['@GoBarber:token', token],
                ['@GoBarber:user', JSON.stringify(user)],
            ]);
            api.defaults.headers.authorization = `Bearer ${token}`;

            setData({
                user,
                token,
            });
        },
        [ setData, ],
    );

    const signOut = useCallback(async () => {
        await AsyncStorage.multiRemove(['@GoBarber:token', '@GoBarber:user']);
        setData({} as AuthState);
    }, []);

    const updateUser = useCallback(
        (user: User) => {
            AsyncStorage.setItem('@GoBarber:user', JSON.stringify(user));

            setData({
                token: data.token,
                user,
            });
        },
        [setData, data.token],
    );

    return (
        <AuthContext.Provider
            value={{ user: data.user, loading, signIn, signOut, updateUser }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth(): AuthContextData {
    const context = useContext(AuthContext);

    return context;
}
