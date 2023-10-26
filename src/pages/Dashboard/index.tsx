import React, { useCallback, useEffect, useState } from 'react';

import { useNavigation } from '@react-navigation/core';
import { type RootStackParamList } from '../../@types/navigationTypes';
import { type NativeStackNavigationProp } from '@react-navigation/native-stack';

import Icon from 'react-native-vector-icons/Feather';

import { useAuth } from '../../hooks/auth';
import { FlatList, GestureHandlerRootView } from 'react-native-gesture-handler';

import api from '../../services/api';

import {
  Container,
  Header,
  HeaderTitle,
  UserName,
  ProfileButton,
  ProviderContainer,
  ProviderAvatar,
  UserAvatar,
  ProviderBody,
  ProviderInfo,
  ProviderInfoText,
  ProviderName,
  ProvidersListTitle,
} from './styles';

export interface Provider {
  id: string;
  name: string;
  avatar_url: string;
}

const Dashboard = () => {
  const [providers, setProviders] = useState<Provider[]>([]);
  const { user, signOut } = useAuth();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    api.get('./providers').then((response) => {
      setProviders(response.data);
    });
  }, []);

  const navigateToProfile = useCallback(() => {
    navigation.navigate('Profile' as never);
  }, [navigation]);

  const navigateToCreateAppointment = useCallback(
    (providerId: string) => {
      navigation.navigate('CreateAppointment', { providerId });
    },
    [navigation],
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Container>
        <Header>
          <HeaderTitle>
            Bem vindo /a {'\n'}
            <UserName>{user.name}</UserName>
          </HeaderTitle>

          <ProfileButton onPress={navigateToProfile}>
            <UserAvatar source={{ uri: user.avatar_url }} />
          </ProfileButton>
        </Header>

        <FlatList
          style={{ padding: 23 }}
          data={providers}
          keyExtractor={(provider) => provider.id}
          ListHeaderComponent={
            <ProvidersListTitle> Cabeleireiros</ProvidersListTitle>
          }
          renderItem={({ item: provider }) => (
            <ProviderContainer
              onPress={() => navigateToCreateAppointment(provider.id)}
            >
              <ProviderAvatar
                source={{
                  uri: provider.avatar_url,
                }}
              />
              <ProviderBody>
                <ProviderName>{provider.name}</ProviderName>

                <ProviderInfo>
                  <Icon name="calendar" size={15} color="#ff9000" />
                  <ProviderInfoText>Segunda a Sexta</ProviderInfoText>
                </ProviderInfo>

                <ProviderInfo>
                  <Icon name="clock" size={15} color="#ff9000" />
                  <ProviderInfoText>8h as 18h</ProviderInfoText>
                </ProviderInfo>
              </ProviderBody>
            </ProviderContainer>
          )}
        />
      </Container>
    </GestureHandlerRootView>
  );
};

export default Dashboard;
