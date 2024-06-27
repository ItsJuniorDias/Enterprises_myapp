import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import React, { useRef } from 'react';
import { ActivityIndicator, Pressable, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { theme } from '../../theme';
import { Button } from '../../components';
import Input from '../../components/Input/Input';
import { useAuth } from '../../hooks';

import { Container, Title, Body, TouchableText, Text } from './styles';

export const SignUp = () => {
  const testIDs = useRef({
    inputName: 'input_name_testID',
    inputEmail: 'input_email_testID',
    inputPassword: 'input_password_testID',
    button: 'button_testID',
    pressable: 'pressable_testID',
  }).current;

  const { createUser, loading, formRef } = useAuth();

  const navigation = useNavigation();

  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);

  return (
    <Container>
      <Pressable
        testID="pressable_back_testID"
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
        <Form ref={formRef} onSubmit={(props) => createUser(props)}>
          <Input
            testID={testIDs.inputName}
            name="name"
            icon="user"
            placeholder="Nome"
            onSubmitEditing={() => {
              emailInputRef.current?.focus();
            }}
          />

          <Input
            testID={testIDs.inputEmail}
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
            testID={testIDs.inputPassword}
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
            testID={testIDs.button}
            activeOpacity={0.6}
            onPress={() => {
              formRef.current?.submitForm();
            }}
          >
            {!loading ? (
              <ActivityIndicator
                testID="activity-indicator_testID"
                size="small"
                color="#FFFFFF"
              />
            ) : (
              'Inscrever-se'
            )}
          </Button>

          <TouchableText
            testID={testIDs.pressable}
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
