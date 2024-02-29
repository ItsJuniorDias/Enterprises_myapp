import React from 'react';
import { View, Image, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import exit from '../../assets/Vector.png';
import not from '../../assets/not.png';
import { InputSearch } from '../../components';

import { useAuth, useEnterprises } from '../../hooks';

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
} from './styles';

export const Home = () => {
  const navigation = useNavigation();

  const { logout } = useAuth();
  const { data, loading } = useEnterprises();

  const handeExit = () => {
    logout();

    navigation.navigate('/SignIn');
  };

  const handleShow = async (props) => {
    navigation.navigate('/Show', props);
  };

  const renderItem = ({
    _data: { id, title, description, thumbnail, url_link },
  }) => {
    return (
      <>
        <ContainerCard
          testID="containerCard_testId"
          onPress={() =>
            handleShow({
              id,
              title,
              description,
              thumbnail,
              url_link,
            })
          }
        >
          <ImageCard
            source={{
              uri: thumbnail,
            }}
          />
          <ShadowContent>
            <TitleCard>{title}</TitleCard>

            <ContentDescription>
              <DescriptionCard numberOfLines={4}>{description}</DescriptionCard>
            </ContentDescription>
          </ShadowContent>
        </ContainerCard>
      </>
    );
  };

  // const renderItem = ({ item }) => (
  //   <CardItem
  //     key={item.id}
  //     id={item.id}
  //     title={item.enterprise_name}
  //     description={item.description}
  //     photo={item.photo}
  //   />
  // );

  // const handleFilterValue = (value: any) => {
  //   const itemFiltered = dataEnterprise.filter(
  //     (item) =>
  //       item.enterprise_name.toLowerCase().includes(value.toLowerCase()) ||
  //       item.description.toLowerCase().includes(value.toLowerCase())
  //   );

  //   if (!!itemFiltered.length) {
  //     setDataFiltered(itemFiltered);
  //     setFilter(true);
  //   } else {
  //     setFilter(false);
  //   }
  // };

  const emptyListDataFilter = () => (
    <>
      <ContentEmpty>
        <EmptyFilterData> Não Encontrado</EmptyFilterData>
        <Image source={not} />
      </ContentEmpty>
    </>
  );

  return (
    <>
      <Container>
        <Header>
          <View>
            <Title>Olá, Alexandre!</Title>
            <Description>Bem-vindo(a)</Description>
          </View>

          <TouchableExit testID="buttonExit_testId" onPress={() => handeExit()}>
            <Image source={exit} />
          </TouchableExit>
        </Header>

        <InputSearch
          title="Buscar por nome"
          name="filter"
          callBackParent={(value) => {}}
        />

        <ContentFlat>
          <FlatList
            data={data}
            renderItem={({ item }) => renderItem(item)}
            keyExtractor={(_, index) => {
              return index.toString();
            }}
            ListEmptyComponent={emptyListDataFilter}
            showsVerticalScrollIndicator={false}
          />
        </ContentFlat>
      </Container>
    </>
  );
};
