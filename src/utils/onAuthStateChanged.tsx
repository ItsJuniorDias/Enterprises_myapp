import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { AuthAction, AuthActionEnum } from '../hooks';

export type AuthStateChangedProps = {
  dispatchAuthState: React.Dispatch<AuthAction>;
  navigation: {
    navigate: (screen: string) => void;
  };
};

export const onAuthStateChanged = ({
  dispatchAuthState,
  navigation,
}: AuthStateChangedProps) => {
  auth().onAuthStateChanged(async (user) => {
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

    if (user) {
      return navigation.navigate('Home');
    }
  });
};
