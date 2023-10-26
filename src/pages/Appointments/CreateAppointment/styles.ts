import styled from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { FlatList } from 'react-native-gesture-handler';
import { Provider } from './index';

interface ProviderContainerProps {
    selected: boolean;
}

interface ProviderNameProps {
  selected: boolean;
}

interface HourProps {
  available: boolean;
  selected: boolean;
}

interface HourTextProps {
  available?: boolean;
  selected: boolean;
}

export const Container = styled.View`
    flex: 1;
`;

export const Header = styled.View`
    padding-top: ${getStatusBarHeight() + 24}px;
    padding: 15px;
    background: #28262e;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

export const BackButton = styled.TouchableOpacity`

`;

export const HeaderTitle = styled.Text`
    color: #f4ede8;
    font-size: 20px;
    font-family: 'RobotoSlab-Medium';
    margin-left: 20px;
`;

export const UserAvatarButton = styled.TouchableOpacity`
`;

export const UserAvatar = styled.Image`
    width: 57px;
    height: 57px;
    border-radius: 35px;
    margin-left: auto;
`;

export const Content = styled.ScrollView``;

export const ProvidersListContainer = styled.View`
    height: 100px;
    padding: 27px 20px;
`;

export const ProviderContainer = styled.TouchableOpacity<ProviderContainerProps>`
    background: ${ props => props.selected ? '#ff9000' : '#3e3b47'};
    flex-direction: row;
    align-items: center;
    padding: 8px 12px;
    margin-right: 15px;
    border-radius: 10px;
`;

export const ProviderAvatar = styled.Image`
    width: 32px;
    height: 32px;
    border-radius: 16px;
    background-color: white;
`;

export const ProviderName = styled.Text<ProviderNameProps>`
    margin-left: 8px;
    font-family: 'RobotoSlab-Medium';
    font-size: 17px;
    color: ${ props => props.selected ? '#233129' : '#f4ede8'};
`;

export const Calendar = styled.View`

`;

export const Title = styled.Text`
    font-family: 'RobotoSlab-Medium';
    color: #f4ede8;
    font-size: 23px;
    margin: 0 24px 24px;
`;

export const OpenDatePickerButton = styled.TouchableOpacity`
    height: 45px;
    background: #ff9000;
    border-radius: 10px;
    align-items: center;
    justify-content: center;
    margin: 0 24px;
`;

export const OpenDatePickerButtonText = styled.Text`
    font-family: 'RobotoSlab-Medium';
    font-size: 17px;
    color: #232129;
`;


export const Schedule  = styled.View`
  padding: 24px 0 17px;
`;

export const Section = styled.View`
  margin-bottom: 24px;
`;

export const SectioTitle = styled.Text`
  font-size: 18px;
  color: #999591;
  font-family: 'RobotoSlab-Regular';
  margin: 0 24px 12px;
`;

export const SectionContent = styled.ScrollView.attrs({
  contentContainerStyle: { paddingHorizontal: 24 },
  horizontal: true,
  showsHorizontalScrollIndicator: false,
})`

`;

export const Hour = styled.TouchableOpacity<HourProps>`
  padding: 12px;
  background: ${props => props.available && props.selected ? '#ff9000' : '#3e3b47'};
  border-radius: 10px;
  margin-right: 8px;

  opacity: ${ props => props.available ? 1 : 0.3};
`;

export const HourText = styled.Text<HourTextProps>`
  color: ${props => props.selected && props.available ? '#232129' : '#f4ede8'};
  font-family: 'RobotoSlab-Regular';
  font-size: 15px;
`;

export const CreateAppointmentButton = styled.TouchableOpacity`
    height: 50px;
    background: #ff9000;
    border-radius: 10px;
    align-items: center;
    justify-content: center;
    margin: 0 24px 24px;
`;

export const CreateAppointmentButtonText = styled.Text`
    font-family: 'RobotoSlab-Medium';
    font-size: 18px;
    color: #232129;
`;
