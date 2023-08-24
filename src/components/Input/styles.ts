import styled, { css } from 'styled-components/native';
import FeatherIcon from 'react-native-vector-icons/Feather';


interface ContainerProps {
    isFocused: boolean;
    isErrored: boolean;
}

export const Container = styled.View<ContainerProps>`
    width: 100%;
    height: 59px;
    padding: 0 17px;
    background: #201b2b;
    border-radius: 10px;
    margin-bottom: 8px;
    border-width: 2px;
    border-color: #201b2b;

    flex-direction: row;
    align-items: center;


    ${props => props.isErrored && css`
        border-color: #c53030;
    `}

    ${props => props.isFocused && css`
        border-color: #ff9000;
    `}

`;

export const TextInput = styled.TextInput`
    flex: 1;
    color: #fff;
    font-size:17px;
    font-family: 'RobotoSlab-Regular';
`;

export const Icon = styled(FeatherIcon)`
    margin-right: 17px;
`;
