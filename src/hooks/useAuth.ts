import { useState, useEffect } from 'react';
import auth from '@react-native-firebase/auth';

type User = {
  name: string;
  email: string;
  password: string;
};

type AuthState = {
  user: User;
  loading: boolean;
};

type CreateUserProps = {
  email: string;
  password: string;
};

type LoginProps = {
  email: string;
  password: string;
};

type UseAuth = {
  user: User;
  loading: boolean;
  createUser: (props: CreateUserProps) => Promise<User>;
  login: (props: LoginProps) => Promise<User>;
  logout: () => Promise<void>;
};

export const useAuth = (): UseAuth => {
  const [authState, setAuthState] = useState<AuthState>({
    user: {
      name: '',
      email: '',
      password: '',
    },
    loading: true,
  });

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((user) => {
      setAuthState({ user, loading: false });
    });

    return unsubscribe;
  }, []);

  const createUser = async (props: CreateUserProps): Promise<User> => {
    const { email, password } = props;

    const { user } = await auth().createUserWithEmailAndPassword(
      email,
      password
    );

    console.log(user, 'USER RESPONSE');

    return user;
  };

  const login = async (props: LoginProps): Promise<User> => {
    const { email, password } = props;

    const response = await auth().signInWithEmailAndPassword(email, password);

    console.log(response, 'RESPONSE LOGIN');

    return response.user;
  };

  const logout = async (): Promise<void> => {
    await auth().signOut();
  };

  return { ...authState, createUser, login, logout };
};
