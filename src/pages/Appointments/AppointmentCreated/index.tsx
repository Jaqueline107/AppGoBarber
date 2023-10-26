import React, { useCallback, useMemo } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { Container, Title, Description, OkButton, OkButtonText } from './styled';
import { useNavigation, useRoute } from '@react-navigation/native';
import { format } from 'date-fns';

import prBR from 'date-fns/locale/pt-BR';

interface RouteParams {
  date: number;
}

const AppointmentCreated = () => {
  const { reset } = useNavigation();
  const { params } = useRoute();

  const routeParams = params as RouteParams;

    const formattedDate = useMemo(() => {
      return format(
        routeParams.date,
        "EEEE', dia' dd 'de' MMMM 'de' yyyy 'às' HH:mm'h'",
        { locale: prBR }
        );
    }, [routeParams.date]);

    return (
        <Container>
          <Icon name="check" size={80} color="#04d361"/>

          <Title>Agendamento concluido</Title>
          <Description>{formattedDate}</Description>

          <OkButton onPress={() => reset({routes: [{name: 'Dashboard' as never}], index: 1})}>
            <OkButtonText>Ok</OkButtonText>
          </OkButton>
        </Container>
    );
};

export default AppointmentCreated;
