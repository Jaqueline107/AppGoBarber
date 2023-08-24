import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
    width: 100%;
    height: 59px;
    background: #ff9000;
    margin-top: 7px;

    justify-content: center;
    align-items: center;
    border-radius: 10px;
`;

export const ButtonText = styled.Text`
    font-family: 'RobotoSlab-Medium';
    color: #312e38;
    font-size: 18px;
`;
