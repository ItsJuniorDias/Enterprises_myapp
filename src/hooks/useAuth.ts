import { useState, useEffect } from 'react';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';

type User = {
  name: string | null;
  email: string | null;
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
  const navigation = useNavigation();

  const [authState, setAuthState] = useState<AuthState>({
    user: {
      name: '',
      email: '',
    },
    loading: true,
  });
  const [initializing, setInitializing] = useState(true);
  const [userState, setUserState] = useState({});

  useEffect(() => {
    const onAuthStateChanged = async () => {
      await auth().onAuthStateChanged((user) => {
        setUserState(user);

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
    const { email, password } = props;
    setAuthState((prevProps) => ({
      ...prevProps,
      loading: false,
    }));

    const { user } = await auth().createUserWithEmailAndPassword(
      email,
      password
    );

    setAuthState({
      user: {
        name: user.displayName,
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
