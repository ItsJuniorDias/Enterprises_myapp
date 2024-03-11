import React, { useRef } from 'react';
import { TextInput, Alert, Pressable } from 'react-native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import { useNavigation } from '@react-navigation/native';
import Input from '../../components/Input/Input';
import { Button } from '../../components';
import auth from '@react-native-firebase/auth';

import { Container, Title, Header, Body, ContentButton, Text } from './styles';
import Icon from 'react-native-vector-icons/Feather';
import { theme } from '../../theme';

export const ForgetPassword = () => {
  const navigation = useNavigation();

  const formRef = useRef<FormHandles>(null);
  const passwordInputRef = useRef<TextInput>(null);

  const handleResetPassword = async (props) => {
    if (!props.email) {
      Alert.alert('Digite seu email', 'confirme seu email', [
        {
          text: 'Cancelar',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {},
        },
      ]);

      return;
    }

    try {
      await auth().sendPasswordResetEmail(`${props.email}`);

      Alert.alert(
        'Redefinição de senha enviada',
        ' para seu endereço de e-mail',
        [
          {
            text: 'Cancelar',
            onPress: () => {},
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () => {
              navigation.goBack();
            },
          },
        ]
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
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

        <Header>
          <Title>{`Reset\npassword`}</Title>
          <Text>
            Digite seu endereço de e-mail para solicitar uma redefinição de
            senha
          </Text>
        </Header>

        <Body>
          <Form ref={formRef} onSubmit={(props) => handleResetPassword(props)}>
            <Input
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
          </Form>
        </Body>

        <ContentButton>
          <Button
            activeOpacity={0.6}
            onPress={() => {
              formRef.current?.submitForm();
            }}
          >
            Esqueceu sua senha ?
          </Button>
        </ContentButton>
      </Container>
    </>
  );
};
