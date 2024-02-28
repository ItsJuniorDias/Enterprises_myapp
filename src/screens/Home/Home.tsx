import React, { useState, useEffect } from 'react';
import { View, Image, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { IShow } from 'store/modules/show/types';
import exit from '../../assets/Vector.png';
import not from '../../assets/not.png';
import { logoutUser } from '../../store/modules/auth/actions';
import { IEnterprise } from '../../store/modules/enterprise/types';
import { requestShow } from '../../store/modules/show/actions';
import { InputSearch } from '../../components';

import { useAuth } from 'hooks';

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
  const [dataEnterprise, setDataEnterprise] = useState<IEnterprise[]>([]);
  const [filter, setFilter] = useState(false);
  const [dataFiltered, setDataFiltered] = useState<IEnterprise[]>([]);

  const enterprise = useSelector((state) => state.enterprise);
  const headers = useSelector((state) => state.show);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const { logout } = useAuth();

  useEffect(() => {
    setDataEnterprise(Object.values(enterprise));
  }, [enterprise]);

  const handeExit = () => {
    logout();

    navigation.navigate('/SignIn');
  };

  const handleShow = async (id: IShow) => {
    dispatch(requestShow(headers, id));
    navigation.navigate('/Show');
  };

  const CardItem = ({ title, description, photo, id }) => {
    return (
      <>
        <ContainerCard
          testID="containerCard_testId"
          onPress={() => handleShow(id)}
        >
          <ImageCard
            source={{
              uri: `https://empresas.ioasys.com.br/${photo}`,
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

  const renderItem = ({ item }) => (
    <CardItem
      key={item.id}
      id={item.id}
      title={item.enterprise_name}
      description={item.description}
      photo={item.photo}
    />
  );

  const handleFilterValue = (value: any) => {
    const itemFiltered = dataEnterprise.filter(
      (item) =>
        item.enterprise_name.toLowerCase().includes(value.toLowerCase()) ||
        item.description.toLowerCase().includes(value.toLowerCase())
    );

    if (!!itemFiltered.length) {
      setDataFiltered(itemFiltered);
      setFilter(true);
    } else {
      setFilter(false);
    }
  };

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
          callBackParent={(value) => handleFilterValue(value)}
        />

        <ContentFlat>
          {filter ? (
            <FlatList
              data={dataFiltered}
              ListEmptyComponent={emptyListDataFilter}
              renderItem={renderItem}
              keyExtractor={(_, index) => {
                return index.toString();
              }}
            />
          ) : (
            <FlatList
              data={dataEnterprise}
              renderItem={renderItem}
              keyExtractor={(_, index) => {
                return index.toString();
              }}
            />
          )}
        </ContentFlat>
      </Container>
    </>
  );
};
