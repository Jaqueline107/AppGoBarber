import styled from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { FlatList } from 'react-native-gesture-handler';

import { Provider } from './index';

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

export const HeaderTitle = styled.Text`
    color: #f4ede8;
    font-size: 20px;
    font-family: 'RobotoSlab-Regular';
    line-height: 28px;
`;

export const UserName = styled.Text`
    color: #ff9000;
    font-family: 'RobotoSlab-Medium';
`;

export const ProfileButton = styled.TouchableOpacity`
`;


export const UserAvatar = styled.Image`
    width: 57px;
    height: 57px;
    border-radius: 35px;
    background-color: aqua;
`;

export const ProvidersListTitle = styled.Text`
    font-size: 23px;
    margin-bottom: 24px;
    color: #f4ede8;
    font-family: 'RobotoSlab-Medium';
`;

export const ProviderContainer = styled.TouchableOpacity`
    background: #3e3b47;
    border-radius: 10px;
    padding: 20px;
    margin-bottom: 17px;
    flex-direction: row;
    align-items: center;
`;

export const ProviderAvatar = styled.Image`
    width: 57px;
    height: 57px;
    border-radius: 35px;
`;

export const ProviderBody = styled.View`
    flex: 1;
    margin-left: 20px;
`;

export const ProviderName = styled.Text`
    font-family: 'RobotoSlab-Medium';
    font-size: 18px;
    color: #f4ede8;
`;

export const ProviderInfo = styled.View`
    flex-direction: row;
    align-items: center;
    margin-top: 8px;
`;

export const ProviderInfoText = styled.Text`
    margin-left: 8px;
    color: #989591;
    font-size: 15px;
    font-family: 'RobotoSlab-Regular';
`;
