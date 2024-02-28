import React, { useState, useCallback, useRef } from 'react';
import { TextInput, Alert, Image, TouchableOpacity } from 'react-native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { loginToAuthRequest } from '../../store/modules/auth/actions';
import { getValidationErrors } from '../../utils/getValidationErrors';
import api from '../../services/api';
import Input from '../../components/Input/Input';
import { Button, Loading } from '../../components';

import { useAuth } from '../../hooks';

import iconGoogle from '../../assets/Google.png';
import iconFacebook from '../../assets/Facebook.png';
import forgotPassword from '../../assets/round-arrow_right_alt-24px.png';

import {
  Container,
  Title,
  Header,
  Body,
  TouchableText,
  Text,
  Footer,
  TextFooter,
  Row,
} from './styles';

interface SignInFormData {
  email: string;
  password: string;
}

export const SignIn = () => {
  const testIDs = useRef({
    input_email: 'inputEmail_testID',
    input_password: 'inputPassword_testID',
    button: 'buttonSignIn_testID',
  }).current;

  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const { login } = useAuth();

  const formRef = useRef<FormHandles>(null);
  const passwordInputRef = useRef<TextInput>(null);

  const handleSignIn = useCallback(async (data: SignInFormData) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        email: Yup.string()
          .required('E-mail obrigatório')
          .email('Digite um e-mail válido'),
        password: Yup.string().required('Senha obrigatória'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      setLoading(true);

      await login(data);

      // dispatch(loginToAuthRequest(data));

      setLoading(false);

      navigation.navigate('/Home');
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);
        return;
      }

      setLoading(false);

      Alert.alert(
        'Erro na autenticação',
        'Ocorreu um erro ao fazer login, cheque as credenciais'
      );
    }
  }, []);

  return (
    <>
      {loading && <Loading />}

      {!loading && (
        <>
          <Container>
            <Header>
              <Title>Login</Title>
            </Header>

            <Body>
              <Form ref={formRef} onSubmit={handleSignIn}>
                <Input
                  testID={testIDs.input_email}
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
                  testID={testIDs.input_password}
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

                <TouchableText isAlign={false} activeOpacity={0.6}>
                  <Text>Esqueceu sua senha ?</Text>
                  <Image source={forgotPassword} />
                </TouchableText>

                <Button
                  activeOpacity={0.6}
                  testID={testIDs.button}
                  onPress={() => {
                    formRef.current?.submitForm();
                  }}
                >
                  Entrar
                </Button>

                <TouchableText
                  onPress={() => navigation.navigate('/SignUp')}
                  isAlign
                  activeOpacity={0.6}
                >
                  <Text>
                    Não tem uma conta ? <Text isBold>Inscrever-se</Text>
                  </Text>
                </TouchableText>
              </Form>
            </Body>

            <Footer>
              <TextFooter>Ou faça login com sua conta</TextFooter>

              <Row>
                <TouchableOpacity activeOpacity={0.6}>
                  <Image source={iconGoogle} />
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={0.6}>
                  <Image source={iconFacebook} />
                </TouchableOpacity>
              </Row>
            </Footer>
          </Container>
        </>
      )}
    </>
  );
};
