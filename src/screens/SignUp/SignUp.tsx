import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import React, { useRef } from 'react';
import { Pressable, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { theme } from 'theme';
import { Button } from '../../components';
import Input from '../../components/Input/Input';
import { useAuth } from '../../hooks';

import { Container, Title, Body, TouchableText, Text } from './styles';

export const SignUp = () => {
  const { createUser } = useAuth();

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

      <Title>Sign Up</Title>

      <Body>
        <Form ref={formRef} onSubmit={createUser}>
          <Input
            name="name"
            icon="user"
            placeholder="Nome"
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
            placeholder="E-mail"
            returnKeyType="next"
            onSubmitEditing={() => {
              passwordInputRef.current?.focus();
            }}
          />

          <Input
            ref={passwordInputRef}
            secureTextEntry
            name="password"
            icon="lock"
            placeholder="Senha"
            returnKeyType="send"
            onSubmitEditing={() => {
              formRef.current?.submitForm();
            }}
          />

          <Button
            activeOpacity={0.6}
            onPress={() => {
              formRef.current?.submitForm();
            }}
          >
            Inscrever-se
          </Button>

          <TouchableText
            onPress={() => navigation.goBack()}
            activeOpacity={0.6}
          >
            <Text>
              Já possui uma conta ? <Text isBold>Entre aqui</Text>
            </Text>
          </TouchableText>
        </Form>
      </Body>
    </Container>
  );
};
