import { useState, useEffect, useReducer, useRef, RefObject } from 'react';
import { Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import { FormHandles } from '@unform/core';
import {
  CreateUserGoogleSignInProps,
  CreateUserProps,
  LoginProps,
} from '../@types';
import { ProfileScreenNavigationProp } from '../routes';
import { onAuthStateChanged } from '../utils';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

export enum AuthActionEnum {
  CREATE = 'CREATE',
  UPDATE_USER = 'UPDATE_USER',
  LOADING = 'LOADING',
  LOGGED = 'LOGGED',
  LOGOUT = 'LOGOUT',
  DEFAULT = 'DEFAULT',
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
      type: AuthActionEnum.UPDATE_USER;
      payload: {
        user: DataUser;
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
      type: AuthActionEnum.DEFAULT;
      payload: {};
    };

export type User = {
  id: string | null;
  name: string | null;
  email: string | null;
  thumbnail: string | null;
};

export type DataUser = {
  data: {
    user: User;
  };
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
  createGoogleSignIn: (props: CreateUserGoogleSignInProps) => void;
  login: (props: LoginProps) => void;
  logout: () => Promise<void>;
  formRef: RefObject<FormHandles>;
  dispatchAuthState: React.Dispatch<AuthAction>;
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
    case AuthActionEnum.UPDATE_USER:
      return {
        ...state,
        user: payload?.user?.data?.user,
      };
    case AuthActionEnum.LOADING:
      return {
        ...state,
        ...payload,
      };
    case AuthActionEnum.LOGGED:
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

  const formRef = useRef<FormHandles>(null);

  useEffect(() => {
    onAuthStateChanged({
      dispatchAuthState,
      navigation,
    });
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
      }

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

          return navigation.navigate('Home', user);
        }, 2000);
      }
    } else {
      Alert.alert(
        'Erro no cadastro',
        'Ocorreu um erro no cadastro, cheque as credenciais'
      );
    }
  };

  const createGoogleSignIn = async ({
    email,
    name,
    thumbnail,
  }: CreateUserGoogleSignInProps) => {
    dispatchAuthState({
      type: AuthActionEnum.LOADING,
      payload: {
        loading: false,
      },
    });

    const { _documentPath } = await firestore().collection('users').add({
      id: '',
      email,
      thumbnail,
      name,
    });

    dispatchAuthState({
      type: AuthActionEnum.CREATE,
      payload: {
        user: {
          id: _documentPath._parts[1],
          email,
          thumbnail,
          name,
        },
        loading: true,
      },
    });
  };

  const login = async (props: LoginProps) => {
    const { email, password } = props;

    await auth().signInWithEmailAndPassword(email, password);
  };

  const logout = async (): Promise<void> => {
    await GoogleSignin.signOut();

    await auth().signOut();
  };

  return {
    ...authState,
    dispatchAuthState,
    createUser,
    createGoogleSignIn,
    formRef,
    login,
    logout,
  };
};
