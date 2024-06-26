import { useState, useEffect, useReducer, useRef, RefObject } from 'react';
import { Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import { FormHandles } from '@unform/core';
import { CreateUserProps, LoginProps } from '../@types';
import { ProfileScreenNavigationProp } from '../routes';

enum AuthActionEnum {
  CREATE = 'CREATE',
  LOADING = 'LOADING',
  LOGIN = 'LOGIN',
  LOGGED = 'LOGGED',
  LOGOUT = 'LOGOUT',
}

export type AuthAction =
  | {
      type: AuthActionEnum.CREATE;
      payload: {
        user: User;
        loading: boolean;
      };
    }
  | {
      type: AuthActionEnum.LOADING;
      payload?: {};
    }
  | {
      type: AuthActionEnum.LOGGED;
      payload: {
        user: User;
      };
    }
  | {
      type: AuthActionEnum.LOGIN;
      payload: {
        email: string;
        password: string;
      };
    }
  | {
      type: AuthActionEnum.LOGOUT;
      payload?: {};
    };

export type User = {
  id?: string;
  name: string | null;
  email: string | null;
  thumbnail: string | null;
};

export type ItemDataUser = {
  _data: User;
};

type AuthState = {
  user: User;
  loading: boolean;
};

type UseAuth = {
  user: User;
  loading: boolean;
  createUser: (props: CreateUserProps) => void;
  login: (props: LoginProps) => void;
  logout: () => Promise<void>;
  formRef: RefObject<FormHandles>;
};

const reducer = (state: AuthState, action: AuthAction): AuthState => {
  const { type, payload } = action;

  switch (type) {
    case AuthActionEnum.CREATE:
      const { user, loading } = payload;

      return {
        ...state,
        user,
        loading,
      };
    case AuthActionEnum.LOADING:
      return {
        ...state,
        ...payload,
      };
    case AuthActionEnum.LOGIN:
      return {
        ...state,
        ...payload,
      };
    case AuthActionEnum.LOGGED:
      return {
        ...state,
        ...payload,
      };
    case AuthActionEnum.LOGOUT:
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
};

export const useAuth = (): UseAuth => {
  const navigation = useNavigation<ProfileScreenNavigationProp>();

  const [authState, dispatchAuthState] = useReducer(reducer, {
    user: {
      id: '',
      name: '',
      email: '',
      thumbnail: '',
    },
    loading: true,
  });

  const [initializing, setInitializing] = useState(true);

  const formRef = useRef<FormHandles>(null);

  useEffect(() => {
    const onAuthStateChanged = async () => {
      await auth().onAuthStateChanged(async (user) => {
        const users = await firestore().collection('users').get();

        const userDoc = users._docs.find(
          (item) => item._data.email === user?.email
        );

        if (!userDoc) {
          throw new Error('User not found');
        }

        const findUserLogged = userDoc._data;

        dispatchAuthState({
          type: AuthActionEnum.LOGGED,
          payload: {
            user: {
              id: findUserLogged.id,
              name: findUserLogged.name,
              email: findUserLogged.email,
              thumbnail: findUserLogged.thumbnail,
            },
          },
        });

        if (initializing) {
          setInitializing(false);
        }

        if (user) {
          return navigation.navigate('Home');
        }
      });
    };

    onAuthStateChanged();
  }, []);

  const createUser = async (props: CreateUserProps) => {
    const { email, password, name } = props;

    const validate = !!name && !!email && !!password;

    if (validate) {
      dispatchAuthState({
        type: AuthActionEnum.LOADING,
        payload: {
          loading: false,
        },
      });

      const { _documentPath } = await firestore().collection('users').add({
        id: '',
        email,
        thumbnail: '',
        name,
      });

      let user: any = {};

      let errorAlreadyInUse: boolean = false;

      if (errorAlreadyInUse) {
      }
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then((response) => {
          user = response._user;

          return;
        })
        .catch((err) => {
          errorAlreadyInUse = err.code;

          if (err.code === 'auth/email-already-in-use') {
            Alert.alert('Erro no cadastro', 'email já cadastrado', [
              {
                text: 'Cancelar',
                onPress: () => {},
                style: 'cancel',
              },
              {
                text: 'OK',
                onPress: () =>
                  dispatchAuthState({
                    type: AuthActionEnum.LOADING,
                    payload: {
                      loading: true,
                    },
                  }),
              },
            ]);
          }
        });

      dispatchAuthState({
        type: AuthActionEnum.CREATE,
        payload: {
          user: {
            id: _documentPath._parts[1],
            name,
            thumbnail: '',
            email: user.email,
          },
          loading: true,
        },
      });

      if (!errorAlreadyInUse) {
        setTimeout(() => {
          firestore()
            .collection('users')
            .doc(`${_documentPath._parts[1]}`)
            .update({
              id: _documentPath._parts[1],
            })
            .then((response) => {
              console.log(response, 'RESPONSE UPDATE USER');
            })
            .catch((e) => {
              console.log(e);
            });

          return navigation.navigate('Home');
        }, 2000);
      }
    } else {
      Alert.alert(
        'Erro no cadastro',
        'Ocorreu um erro no cadastro, cheque as credenciais'
      );
    }
  };

  const login = async (props: LoginProps) => {
    const { email, password } = props;

    await auth().signInWithEmailAndPassword(email, password);
  };

  const logout = async (): Promise<void> => {
    await auth().signOut();
  };

  return {
    ...authState,
    createUser,
    formRef,
    login,
    logout,
  };
};
