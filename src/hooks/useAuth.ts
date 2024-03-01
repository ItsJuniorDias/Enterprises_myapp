import { useState, useEffect } from 'react';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

type User = {
  name: string | null;
  email: string | null;
};

type AuthState = {
  user: User;
  loading: boolean;
};

type CreateUserProps = {
  name: string;
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
  const navigation = useNavigation();

  const [authState, setAuthState] = useState<AuthState>({
    user: {
      name: '',
      email: '',
    },
    loading: true,
  });
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const onAuthStateChanged = async () => {
      await auth().onAuthStateChanged(async (user) => {
        const users = await firestore().collection('users').get();

        const findUserLogged = users._docs.find(
          (item) => item._data.email === user?.email
        )._data;

        setAuthState((prevProps) => ({
          ...prevProps,
          user: {
            name: findUserLogged.name,
            email: findUserLogged.email,
          },
        }));

        if (initializing) {
          setInitializing(false);
        }

        if (user) {
          return navigation.navigate('/Home');
        }
      });
    };

    onAuthStateChanged();
  }, []);

  const createUser = async (props: CreateUserProps) => {
    console.log(props, 'PROPS');

    const { email, password, name } = props;

    setAuthState((prevProps) => ({
      ...prevProps,
      loading: false,
    }));

    const responseCreateUser = await firestore().collection('users').add({
      email,
      password,
      name,
    });

    console.log(responseCreateUser, 'RESPONSE CREATE USER');

    const { user } = await auth().createUserWithEmailAndPassword(
      email,
      password
    );

    setAuthState({
      user: {
        name: '',
        email: user.email,
      },
      loading: true,
    });

    return navigation.navigate('/Home');
  };

  const login = async (props: LoginProps): Promise<User> => {
    const { email, password } = props;

    const response = await auth().signInWithEmailAndPassword(email, password);

    return response.user;
  };

  const logout = async (): Promise<void> => {
    await auth().signOut();
  };

  return {
    ...authState,
    createUser,
    login,
    logout,
  };
};
