import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import React, { useRef, useState } from 'react';
import { ActivityIndicator, Pressable, Alert, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { FormHandles } from '@unform/core';
import { theme } from '../../theme';
import { Button } from '../../components';
import Input from '../../components/Input/Input';

import {
  launchImageLibrary,
  ImagePickerResponse,
} from 'react-native-image-picker';

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import {
  Container,
  Title,
  Body,
  TouchableDelete,
  TextDelete,
  Content,
  Thumbnail,
  WithoutThumbnail,
} from './styles';
import { RFValue } from 'react-native-responsive-fontsize';
import { ProfileScreenNavigationProp } from '../../routes';
import { RefObject } from 'react';

export type ProfileProps = {
  route: {
    params: {
      id: string;
      name: string;
      email: string;
      thumbnail: string;
    };
  };
};

export type UserDocument = {
  name: string;
  email: string;
};

export const Profile = ({ route }: ProfileProps) => {
  const { name, email, thumbnail, id } = route.params;

  const [loadingUpdate, setLoadingUpdate] = useState(false);

  const [user, setUser] = useState({
    name,
    email,
  });

  const navigation = useNavigation<ProfileScreenNavigationProp>();

  const formRef = useRef<FormHandles>(null);
  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);

  const updateDocument = (props: UserDocument) => {
    setLoadingUpdate(true);

    firestore()
      .collection('users')
      .doc(`${id}`)
      .update({
        name: props.name,
        email: props.email,
      })
      .then(() => {
        Alert.alert(
          'Seus dados foram atualizado com sucesso',
          'Reinicie o app por favor !',
          [
            {
              text: 'Cancelar',
              onPress: () => {},
              style: 'cancel',
            },
            { text: 'OK', onPress: () => {} },
          ]
        );

        setLoadingUpdate(false);
      });
  };

  const updateThumnail = (props: string | undefined) => {
    setLoadingUpdate(true);

    firestore()
      .collection('users')
      .doc(`${id}`)
      .update({
        name,
        email,
        thumbnail: props,
      })
      .then(() => {
        Alert.alert(
          'Seus dados foram atualizado com sucesso',
          'Reinicie o app por favor !',
          [
            {
              text: 'Cancelar',
              onPress: () => {},
              style: 'cancel',
            },
            { text: 'OK', onPress: () => {} },
          ]
        );

        setLoadingUpdate(false);
      });
  };

  const handleSelectImage = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        maxWidth: 2000,
        maxHeight: 2000,
      },
      async (response: ImagePickerResponse) => {
        const { uri } = response.assets[0];

        updateThumnail(uri);
      }
    );
  };

  const handleDeleteAccount = () => {
    Alert.alert('Seus dados serão excluidos', 'tem certeza disso ?', [
      {
        text: 'Cancelar',
        onPress: () => {},
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          firestore()
            .collection('users')
            .doc(`${id}`)
            .delete()
            .then(() => {
              console.log('User deleted!');

              const user = auth().currentUser;

              user?.delete().then(() => {
                auth().signOut();

                return navigation.navigate('SignIn');
              });
            });
        },
      },
    ]);
  };

  return (
    <Container>
      <Pressable
        onPress={() => navigation.goBack()}
        style={({ pressed }) => [
          {
            opacity: pressed ? 0.6 : 1,
          },
        ]}
      >
        <Icon name="arrow-left" size={28} color={theme.colors.secondary} />
      </Pressable>

      <Title>Profile</Title>

      <Content>
        <Pressable
          onPress={() => handleSelectImage()}
          style={({ pressed }) => [
            {
              opacity: pressed ? 0.6 : 1,
            },
          ]}
        >
          {!thumbnail ? (
            <WithoutThumbnail>
              <Icon name={'user'} size={RFValue(40)} color={'#FFFFFF'} />
            </WithoutThumbnail>
          ) : (
            <Thumbnail resizeMode="cover" source={{ uri: `${thumbnail}` }} />
          )}
        </Pressable>
      </Content>

      <Body>
        <Form ref={formRef} onSubmit={() => updateDocument(user)}>
          <Input
            name="name"
            icon="user"
            placeholder="Nome"
            value={user.name}
            onChangeText={(value) =>
              setUser((prevState) => ({
                ...prevState,
                name: value,
              }))
            }
            onSubmitEditing={() => {
              emailInputRef.current?.focus();
            }}
          />

          <Input
            ref={emailInputRef}
            autoCorrect={false}
            autoCapitalize="none"
            keyboardType="email-address"
            name="email"
            icon="mail"
            value={user.email}
            placeholder="E-mail"
            returnKeyType="next"
            onSubmitEditing={() => {
              passwordInputRef.current?.focus();
            }}
          />

          <Button
            activeOpacity={0.6}
            onPress={() => {
              formRef.current?.submitForm();
            }}
          >
            {loadingUpdate ? (
              <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
              'Editar'
            )}
          </Button>

          <TouchableDelete
            onPress={() => handleDeleteAccount()}
            activeOpacity={0.6}
          >
            <TextDelete>Deletar conta</TextDelete>
          </TouchableDelete>
        </Form>
      </Body>
    </Container>
  );
};
