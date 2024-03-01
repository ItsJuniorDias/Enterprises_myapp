import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import React, { useRef, useState } from 'react';
import { Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { theme } from '../../theme';
import { Button } from '../../components';
import Input from '../../components/Input/Input';

import {
  Container,
  Title,
  Body,
  Text,
  TouchableDelete,
  TextDelete,
  Content,
  Thumbnail,
} from './styles';

export const Profile = ({ route }) => {
  const { name, email, thumbnail } = route.params;

  const [user, setUser] = useState({
    name,
    email,
  });

  const navigation = useNavigation();

  const formRef = useRef(null);
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);

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
          <Thumbnail />
        </Pressable>
      </Content>

      <Body>
        <Form ref={formRef} onSubmit={(props) => {}}>
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
            onChangeText={(value) =>
              setUser((prevState) => ({
                ...prevState,
                email: value,
              }))
            }
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
            Editar
          </Button>

          <TouchableDelete onPress={() => {}} activeOpacity={0.6}>
            <TextDelete>Deletar conta</TextDelete>
          </TouchableDelete>
        </Form>
      </Body>
    </Container>
  );
};
