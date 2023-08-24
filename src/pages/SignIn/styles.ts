import styled from 'styled-components/native';
import { Platform } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';

export const Container = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    padding: 0 25px ${Platform.OS === 'android'?50: 30}px;
`;

export const Title = styled.Text`
    font-size: 20px;
    color: #f4ede8;
    font-family: 'RobotoSlab-Medium';
    margin: 50px 0 24px;
`;

export const ForgotPassword = styled.TouchableOpacity`
    margin-top: 24px;
`;


export const ForgotPasswordText = styled.Text`
    font-family: 'RobotoSlab-Regular';
    color: #f4ede8;
    font-size: 17px;
`;

export const CreateAccountButton = styled.TouchableOpacity`
    display: flex;
    flex-direction: row;
    height: 55px;
    justify-content: center;
    align-items: center;
    padding: 17px 0 ${17 + getBottomSpace()}px;
`;

export const CreateAccountButtonText = styled.Text`
    font-family: 'RobotoSlab-Regular';
    color: #ff9000;
    font-size: 17px;
    margin-left: 15px;
`;
