import React, { useCallback } from 'react';
import { View, Image, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Icon from 'react-native-vector-icons/Feather';
import exit from '../../assets/Vector.png';
import not from '../../assets/not.png';

import { InputSearch } from '../../components';
import { ProfileScreenNavigationProp } from '../../routes';

import {
  EnterpriseProps,
  ItemEnterprise,
  useAuth,
  useEnterprises,
} from '../../hooks';

import {
  Container,
  Description,
  Header,
  Title,
  TouchableExit,
  ContentFlat,
  ContainerCard,
  ImageCard,
  ShadowContent,
  TitleCard,
  DescriptionCard,
  ContentDescription,
  EmptyFilterData,
  ContentEmpty,
  RowThumbnail,
  Thumbnail,
  WithoutThumbnail,
} from './styles';

export type DataItemProps = {
  _data: EnterpriseProps;
};

export const Home = () => {
  const navigation = useNavigation<ProfileScreenNavigationProp>();

  const { logout, user } = useAuth();
  const { state, dispatch } = useEnterprises();

  const handleExit = () => {
    logout();

    navigation.navigate('SignIn');
  };

  const handleShow = async (props: ItemEnterprise) => {
    navigation.navigate('Show', props);
  };

  const handleFilter = useCallback(
    (value: string) => {
      const itemFiltered = state._data.filter(
        (item) =>
          item._data.title.toLowerCase().includes(value.toLowerCase()) ||
          item._data.description.toLowerCase().includes(value.toLowerCase())
      );

      if (!!itemFiltered.length) {
        dispatch({
          type: 'FILTERED',
          payload: {
            dataFiltered: itemFiltered,
            isFiltered: true,
          },
        });
      } else {
        dispatch({
          type: 'FILTERED',
          payload: {
            dataFiltered: [],
            isFiltered: false,
          },
        });
      }
    },
    [state._data]
  );

  const renderItem = ({
    _data: {
      id,
      type,
      title,
      description,
      thumbnail,
      url_link,
      title_enterprise,
    },
  }: EnterpriseProps) => {
    return (
      <>
        <ContainerCard
          testID="containerCard_testId"
          onPress={() =>
            handleShow({
              id,
              type,
              title,
              description,
              thumbnail,
              url_link,
              title_enterprise,
            })
          }
        >
          <ImageCard
            resizeMode="cover"
            source={{
              uri: thumbnail,
            }}
          />
          <ShadowContent>
            <TitleCard numberOfLines={2}>{title}</TitleCard>

            <ContentDescription>
              <DescriptionCard numberOfLines={4}>{description}</DescriptionCard>
            </ContentDescription>
          </ShadowContent>
        </ContainerCard>
      </>
    );
  };

  const emptyListDataFilter = () => (
    <>
      <ContentEmpty>
        <EmptyFilterData> Não Encontrado</EmptyFilterData>
        <Image source={not} />
      </ContentEmpty>
    </>
  );

  console.log(state._data, 'DATA STATE');

  return (
    <Container>
      <Header>
        <View>
          <RowThumbnail
            onPress={() => navigation.navigate('Profile', user)}
            style={({ pressed }) => [
              {
                opacity: pressed ? 0.6 : 1,
              },
            ]}
          >
            {!user.thumbnail ? (
              <WithoutThumbnail>
                <Icon name={'user'} size={20} color={'#FFFFFF'} />
              </WithoutThumbnail>
            ) : (
              <Thumbnail
                resizeMode="cover"
                source={{ uri: `${user.thumbnail}` }}
              />
            )}

            <Title>Olá, {user.name}!</Title>
          </RowThumbnail>

          <Description>Bem-vindo(a)</Description>
        </View>

        <TouchableExit testID="buttonExit_testId" onPress={() => handleExit()}>
          <Image source={exit} />
        </TouchableExit>
      </Header>

      <InputSearch
        title="Buscar por nome"
        name="filter"
        callBackParent={(value: string) => handleFilter(value)}
      />

      <ContentFlat>
        <FlatList
          data={state.isFiltered ? state.dataFiltered : state._data}
          renderItem={({ item }) => renderItem(item)}
          keyExtractor={(_, index) => {
            return index.toString();
          }}
          ListEmptyComponent={emptyListDataFilter}
          showsVerticalScrollIndicator={false}
        />
      </ContentFlat>
    </Container>
  );
};
