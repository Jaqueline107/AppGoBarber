import styled from 'styled-components/native';
import { Platform } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';

export const Container = styled.View`
    flex: 1;
    justify-content: center;
    padding: 0 25px ${Platform.OS === 'android'?50: 30}px;
`;

export const Title = styled.Text`
    font-size: 20px;
    color: #f4ede8;
    font-family: 'RobotoSlab-Medium';
    margin: 10px 0;
`;


export const UserAvatarButton = styled.TouchableOpacity``;

export const UserAvatar = styled.Image`
    width: 120px;
    height: 120px;
    border-radius: 98px;
    align-self: center;
    background-color: #f4ede8;
`;

export const BackButton = styled.TouchableOpacity``;
