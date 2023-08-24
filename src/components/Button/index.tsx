import React from 'react';
import { Container, ButtonText } from './styles';
import { type RectButtonProperties } from 'react-native-gesture-handler';
import { Text } from 'react-native';

export interface ButtonProps extends RectButtonProperties {
    title: string;
}

const Button = ({ title, ...rest }: ButtonProps) => {
    return (
        <Container {...rest}>
            <ButtonText>{title}</ButtonText>
        </Container>
    );
};

export default Button;
