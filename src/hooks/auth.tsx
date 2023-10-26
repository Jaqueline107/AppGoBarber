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
    name: string;
    email: string;
    avatar_url: string;
  }
  interface AuthState {
    token: string;
    user: User;
  }

  interface SignInCredentials {
    email: string;
    password: string;
  }

  interface AuthContextData {
    user: User;
    loading: boolean;
    signIn(credentials: SignInCredentials): Promise<void>;
    signOut(): void;
    updateUser(user: User): Promise<void>;
  }

  interface AuthProviderProps {
    children: ReactNode;
  }


  const AuthContext = createContext<AuthContextData>({} as AuthContextData);

  export function AuthProvider({ children }: AuthProviderProps) {
    const [data, setData] = useState<AuthState>({} as AuthState);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      async function loadStorageData(): Promise<void> {
        const [token, user] = await AsyncStorage.multiGet([
          '@GoBarber:token',
          '@GoBarber:user',
        ]);

        if (token[1] && user[1]) {
          api.defaults.headers.Authorization = `Bearer ${token[1]}`;

          setData({ token: token[1], user: JSON.parse(user[1]) });
        }

        setLoading(false);
      }

      loadStorageData();
    }, []);

    const signIn = useCallback(
        async ({ email, password }: SignInCredentials) => {
            const response = await api.post('/sessions', {
                email,
                password,
            });

      const { token, user } = response.data;

      await AsyncStorage.multiSet([
        ['@GoBarber:token', token],
        ['@GoBarber:user', JSON.stringify(user)],
      ]);

      api.defaults.headers.Authorization = `Bearer ${token}`;

      setData({ token, user });
    }, []);

    const signOut = useCallback(async () => {
      await AsyncStorage.multiRemove(['@GoBarber:token', '@GoBarber:user']);

      setData({} as AuthState);
    }, []);

    const updateUser = useCallback(
      async(user: User) => {
        await AsyncStorage.setItem('@GoBarber:user', JSON.stringify(user));
        setData({
          token: data.token,
          user,
        })
      },[setData, data.token]);

    return (
      <AuthContext.Provider value={{ user: data.user, loading, signIn, signOut, updateUser }}>
        {children}
      </AuthContext.Provider>
    );
  };

  export function useAuth(): AuthContextData {
    const context = useContext(AuthContext);

    if (!context) {
      throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
  }
