import React, { useCallback, useEffect } from 'react';
import { Image, ScrollView, BackHandler, Linking, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { resetState } from '../../store/modules/show/actions';
import arrow from '../../assets/arrow.png';

import {
  Container,
  Header,
  Touchable,
  Row,
  Title,
  Body,
  ImageBody,
  ContenFilterImage,
  Content,
  TitleBody,
  Description,
  RowBody,
  TextLink,
  PressableLink,
  ContentText,
} from './styles';

export const Show = ({ route }) => {
  const { id, title, description, thumbnail, url_link, title_enterprise } =
    route.params;

  const navigation = useNavigation();
  const dispatch = useDispatch();

  function handleBackButtonClick() {
    dispatch(resetState());

    navigation.navigate('/Home');
    return true;
  }

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);

    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick
      );
    };
  }, []);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handlePress = useCallback(
    async (url_link) => {
      // Checking if the link is supported for links with custom URL scheme.
      const supported = await Linking.canOpenURL(url_link);

      if (supported) {
        // Opening the link with some app, if the URL scheme is "http" the web link should be opened
        // by some browser in the mobile
        await Linking.openURL(url_link);
      } else {
        Alert.alert(`Não foi possível abrir este URL: ${url_link}`);
      }
    },
    [url_link]
  );

  return (
    <ScrollView>
      <Container>
        <Header>
          <Row>
            <Touchable
              testID="buttonTouchable_testID"
              onPress={() => handleGoBack()}
            >
              <Image source={arrow} />
            </Touchable>
          </Row>

          <Title numberOfLines={2}>{title}</Title>
        </Header>
      </Container>

      <Body>
        <ImageBody
          resizeMode="cover"
          source={{
            uri: thumbnail,
          }}
        />

        <ContenFilterImage />
      </Body>

      <ContentText>
        <TitleBody>{title_enterprise}</TitleBody>
      </ContentText>

      <Content>
        <Description>{description}</Description>

        <RowBody>
          <TitleBody>Link:</TitleBody>

          <PressableLink
            onPress={() => handlePress(url_link)}
            style={({ pressed }) => [
              {
                opacity: pressed ? 0.6 : 1,
              },
            ]}
          >
            <TextLink numberOfLines={2}>{url_link}</TextLink>
          </PressableLink>
        </RowBody>
      </Content>
    </ScrollView>
  );
};
