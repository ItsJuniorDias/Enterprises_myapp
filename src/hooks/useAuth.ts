import { useState, useEffect, useReducer, useRef, RefObject } from 'react';
import { Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import { FormHandles } from '@unform/core';
import { CreateUserProps, LoginProps } from '../@types';

enum AuthActionEnum {
  CREATE = 'CREATE',
  LOADING = 'LOADING',
  LOGIN = 'LOGIN',
  LOGGED = 'LOGGED',
  LOGOUT = 'LOGOUT',
}

export type AuthAction =
  | {
      type: 'CREATE';
      payload?: {
        user: User;
        loading: boolean;
      };
    }
  | {
      type: 'LOADING';
      payload?: {};
    }
  | {
      type: 'LOGGED';
      payload?: {};
    }
  | {
      type: 'LOGIN';
      payload?: {
        email: string;
        password: string;
      };
    }
  | {
      type: 'LOGOUT';
      payload?: {};
    };

type User = {
  id?: string;
  name: string | null;
  email: string | null;
  thumbnail: string | null;
};

type AuthState = {
  user: User;
  loading: boolean;
};

type UseAuth = {
  user: User;
  loading: boolean;
  createUser: (props: CreateUserProps) => Promise<User>;
  login: (props: LoginProps) => Promise<User>;
  logout: () => Promise<void>;
  formRef: RefObject<FormHandles>;
};

const reducer = (state: AuthState, action: AuthAction): AuthState => {
  const { type, payload } = action;

  switch (type) {
    case AuthActionEnum.CREATE:
      const { user, loading } = payload;

      console.log(
        {
          user,
          loading,
        },
        'CREATE USER'
      );

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
  const navigation = useNavigation();

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

        const findUserLogged = users._docs.find(
          (item) => item._data.email === user?.email
        )._data;

        dispatchAuthState({
          type: 'LOGGED',
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
          return navigation.navigate('/Home');
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
        type: 'LOADING',
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

      let user = {};
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
                    type: 'LOADING',
                    payload: {
                      loading: true,
                    },
                  }),
              },
            ]);
          }
        });

      dispatchAuthState({
        type: 'CREATE',
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

          return navigation.navigate('/Home');
        }, 2000);
      }
    } else {
      Alert.alert(
        'Erro no cadastro',
        'Ocorreu um erro no cadastro, cheque as credenciais'
      );
    }
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
    formRef,
    login,
    logout,
  };
};
