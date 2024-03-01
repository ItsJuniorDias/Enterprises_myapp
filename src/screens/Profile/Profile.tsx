import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import React, { useRef, useState } from 'react';
import { ActivityIndicator, Pressable, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { theme } from '../../theme';
import { Button } from '../../components';
import Input from '../../components/Input/Input';

import firestore from '@react-native-firebase/firestore';

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

export const Profile = ({ route }) => {
  const { name, email, thumbnail, id } = route.params;

  const [loadingUpdate, setLoadingUpdate] = useState(false);

  const [user, setUser] = useState({
    name,
    email,
  });

  const navigation = useNavigation();

  const formRef = useRef(null);
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);

  const updateDocument = (props) => {
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
          onPress={() => {}}
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

          <TouchableDelete onPress={() => {}} activeOpacity={0.6}>
            <TextDelete>Deletar conta</TextDelete>
          </TouchableDelete>
        </Form>
      </Body>
    </Container>
  );
};
