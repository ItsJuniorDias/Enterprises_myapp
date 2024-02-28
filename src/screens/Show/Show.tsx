import React, { useEffect } from 'react';
import { Image, ScrollView, BackHandler, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { resetState } from '../../store/modules/show/actions';
import arrow from '../../assets/arrow.png';
import overflow from '../../assets/Overflow.png';
import { Loading } from '../../components';

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
  SafeArea,
  ContentLoading,
  FloatView,
  FloatLocation,
  FloatDescription,
  SkeletonPhoto,
} from './styles';

export const Show = () => {
  const { show } = useSelector((state) => state.show);

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
    dispatch(resetState());
    navigation.goBack();
  };

  return (
    <>
      {!show && (
        <>
          <ContentLoading>
            <Loading />
          </ContentLoading>
        </>
      )}

      {show && (
        <>
          <SafeArea>
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

                    <Touchable>
                      <Image source={overflow} />
                    </Touchable>
                  </Row>

                  {show.enterprise_name ? (
                    <Title>{show.enterprise_name}</Title>
                  ) : (
                    <FloatView />
                  )}
                </Header>
              </Container>

              <Body>
                <ImageBody
                  source={{
                    uri: `https://empresas.ioasys.com.br/${show.photo}`,
                  }}
                />

                {!show.photo && <SkeletonPhoto />}

                <ContenFilterImage />
              </Body>

              <Content>
                {show.city ? (
                  <TitleBody>
                    {show.city}, {show.country}
                  </TitleBody>
                ) : (
                  <FloatLocation />
                )}

                {show.description ? (
                  <Description>{show.description}</Description>
                ) : (
                  <FloatDescription />
                )}
              </Content>
            </ScrollView>
          </SafeArea>
        </>
      )}
    </>
  );
};
