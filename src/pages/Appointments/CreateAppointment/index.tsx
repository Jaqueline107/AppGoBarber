import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

import { type RootStackParamList } from '../../../@types/navigationTypes';
import { type NativeStackNavigationProp } from '@react-navigation/native-stack';

import Icon from 'react-native-vector-icons/Feather';
import { Alert, Platform } from 'react-native';
import { format } from 'date-fns';

import DateTimePicker from '@react-native-community/datetimepicker';

import { useAuth } from '../../../hooks/auth';

import api from '../../../services/api';

import { FlatList, GestureHandlerRootView } from 'react-native-gesture-handler';

import {
  Container,
  Header,
  BackButton,
  HeaderTitle,
  UserAvatarButton,
  UserAvatar,
  Content,
  ProvidersListContainer,
  ProviderAvatar,
  ProviderName,
  ProviderContainer,
  Calendar,
  Title,
  OpenDatePickerButton,
  OpenDatePickerButtonText,
  Schedule,
  Section,
  SectioTitle,
  SectionContent,
  Hour,
  HourText,
  CreateAppointmentButton,
  CreateAppointmentButtonText,
} from './styles';

interface RouteParams {
  providerId: string;
}

export interface Provider {
  id: string;
  name: string;
  avatar_url: string;
}

interface AvailabilityItem {
  hour: number;
  available: boolean;
}

const CreateAppointment = () => {
  const { user } = useAuth();
  const route = useRoute();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const routeParams = route.params as RouteParams;

  const [availability, setAvailability] = useState<AvailabilityItem[]>([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedHour, setSelectedHour] = useState(0);
  const [providers, setProviders] = useState<Provider[]>([]);
  const [selectedProvider, setSelectedProvider] = useState(
    routeParams.providerId,
  );

  useEffect(() => {
    api.get('./providers').then((response) => {
      setProviders(response.data);
    });
  }, []);

  useEffect(() => {
    api
      .get(`providers/${selectedProvider}/day-availability`, {
        params: {
          year: selectedDate.getFullYear(),
          month: selectedDate.getMonth() + 1,
          day: selectedDate.getDate(),
        },
      })
      .then((response) => {
        setAvailability(response.data);
      });
  }, [selectedDate, selectedProvider]);

  const navigateBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleSelectProvider = useCallback((providerId: string) => {
    setSelectedProvider(providerId);
  }, []);

  const handleToggleDatePicker = useCallback(() => {
    setShowDatePicker((state) => !state);
  }, []);

  const handleDateChanged = useCallback(
    (event: any, date: Date | undefined) => {
      if (Platform.OS === 'android') {
        setShowDatePicker(false);
      }
      if (date) {
        setSelectedDate(date);
      }
    },
    [],
  );

  const handleSelectHour = useCallback((hour: number) => {
    setSelectedHour(hour);
  }, []);

  const moringAvailability = useMemo(() => {
    return availability
      .filter(({ hour }) => hour < 12)
      .map(({ hour, available }) => {
        return {
          hour,
          available,
          hourFormatted: format(new Date().setHours(hour), 'HH:00'),
        };
      });
  }, [availability]);

  const afternoonAvailability = useMemo(() => {
    return availability
      .filter(({ hour }) => hour >= 12)
      .map(({ hour, available }) => {
        return {
          hour,
          available,
          hourFormatted: format(new Date().setHours(hour), 'HH:00'),
        };
      });
  }, [availability]);

  const handleCreateAppointmet = useCallback(async () => {
    try {
      const date = new Date(selectedDate);
      date.setHours(selectedHour);
      date.setMinutes(0);
      date.setSeconds(0);
      date.setMilliseconds(0);

      await api.post('/appointments', {
        provider_id: selectedProvider,
        date,
      });

      navigation.navigate('AppointmentCreated', { date: date.getTime() });
    } catch (error) {
      console.log(selectedProvider, selectedDate, selectedHour);
      Alert.alert(
        'Erro ao criar agendamento',
        'Ocorreu um erro ao criar agendamento, tente novamente',
      );

      console.log(error);
    }
  }, [selectedDate, selectedHour, selectedProvider]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Container>
        <Header>
          <BackButton onPress={navigateBack}>
            <Icon name="chevron-left" size={24} color="#879591" />
          </BackButton>

          <HeaderTitle> Cabeleleiros </HeaderTitle>

          <UserAvatarButton>
            <UserAvatar source={{ uri: user.avatar_url }} />
          </UserAvatarButton>
        </Header>

        <Content>
          <ProvidersListContainer>
            <FlatList
              horizontal
              data={providers}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(provider) => provider.id}
              renderItem={({ item: provider }) => (
                <ProviderContainer
                  onPress={() => handleSelectProvider(provider.id)}
                  selected={provider.id === selectedProvider}
                >
                  <ProviderAvatar source={{ uri: provider.avatar_url }} />

                  <ProviderName selected={provider.id === selectedProvider}>
                    {provider.name}
                  </ProviderName>
                </ProviderContainer>
              )}
            />
          </ProvidersListContainer>

          <Calendar>
            <Title> Escolha a data </Title>

            <OpenDatePickerButton onPress={handleToggleDatePicker}>
              <OpenDatePickerButtonText>
                Selecionar data
              </OpenDatePickerButtonText>
            </OpenDatePickerButton>

            {showDatePicker && (
              <DateTimePicker
                mode="date"
                is24Hour
                onChange={handleDateChanged}
                display="calendar"
                value={selectedDate}
              />
            )}
          </Calendar>

          <Schedule>
            <Title>Escolha o Horário</Title>

            <Section>
              <SectioTitle>Manhã</SectioTitle>

              <SectionContent horizontal>
                {moringAvailability.map(
                  ({ hourFormatted, hour, available }) => (
                    <Hour
                      selected={selectedHour === hour}
                      available={available}
                      key={hourFormatted}
                      onPress={() => {
                        handleSelectHour(hour);
                      }}
                    >
                      <HourText
                        selected={selectedHour === hour}
                        available={available}
                      >
                        {hourFormatted}
                      </HourText>
                    </Hour>
                  ),
                )}
              </SectionContent>
            </Section>

            <Section>
              <SectioTitle>Tarde</SectioTitle>

              <SectionContent horizontal>
                {afternoonAvailability.map(
                  ({ hourFormatted, hour, available }) => (
                    <Hour
                      selected={selectedHour === hour}
                      available={available}
                      key={hourFormatted}
                      onPress={() => {
                        handleSelectHour(hour);
                      }}
                    >
                      <HourText
                        selected={selectedHour === hour}
                        available={available}
                      >
                        {hourFormatted}
                      </HourText>
                    </Hour>
                  ),
                )}
              </SectionContent>
            </Section>
          </Schedule>

          <CreateAppointmentButton onPress={handleCreateAppointmet}>
            <CreateAppointmentButtonText>Agendar</CreateAppointmentButtonText>
          </CreateAppointmentButton>
        </Content>
      </Container>
    </GestureHandlerRootView>
  );
};

export default CreateAppointment;
