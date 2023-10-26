import React, { useCallback, useRef } from 'react';
import {
    Image,
    KeyboardAvoidingView,
    ScrollView,
    Platform,
    View,
    Alert,
} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import * as Yup from 'yup';
import api from '../../services/api';

import getValidationsErrors from '../../../utils/getValidationErrors';

import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import Input from '../../components/Input';
import Button from '../../components/Button';

import logoImg from '../../assets/logo.png';

import { Container, Title, BackToLogin, BackToLoginText } from './styles';

interface SignUpFormData {
    name?: string;
    email: string;
    password: string;
}

const SignUp = () => {
    const formRef = useRef<FormHandles>(null);

    const navigation = useNavigation();

    const HandleSignUp = useCallback(
        async (data: SignUpFormData) => {
            try {
                const schema = Yup.object().shape({
                    name: Yup.string().required('Nome obrigatório'),
                    email: Yup.string()
                        .required('E-mail obrigatório')
                        .email('Digite um e-mail válido'),
                    password: Yup.string().min(6, 'No mínimo 6 dígitos'),
                });

                await schema.validate(data, {
                    abortEarly: false,
                });

                const response = await api.post('/users', data);
                navigation.goBack();

                console.log(response.data);
            } catch (err) {
                if (err instanceof Yup.ValidationError) {
                    const errors = getValidationsErrors(err);
                    return formRef.current?.setErrors(errors);
                }
                console.log(err);
            }
        },
        [navigation],
    );

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                enabled
            >
                <ScrollView
                    contentContainerStyle={{ flex: 1 }}
                    keyboardShouldPersistTaps="handled"
                >
                    <Container>
                        <Image source={logoImg} />

                        <View>
                            <Title>Crie sua conta</Title>
                        </View>

                        <Form ref={formRef} onSubmit={HandleSignUp}>

                            <Input
                                name="name"
                                icon="user"
                                placeholder="Nome"
                                autoCorrect={false}
                                autoCapitalize="words"
                                returnKeyType="next"
                            />
                            <Input
                                name="email"
                                icon="mail"
                                placeholder="E-mail"
                                autoCorrect={false}
                                autoCapitalize="none"
                                keyboardType="email-address"
                                returnKeyType="next"
                            />
                            <Input
                                name="password"
                                icon="lock"
                                placeholder="Senha"
                                secureTextEntry
                                returnKeyType="send"
                                textContentType="newPassword"
                                onSubmitEditing={() => {
                                    formRef.current?.submitForm();
                                }}
                            />
                        </Form>
                        <Button
                            onPress={() => {
                                formRef.current?.submitForm();
                            }}
                            title="Cadastrar"
                        />
                    </Container>
                </ScrollView>
            </KeyboardAvoidingView>

            <BackToLogin onPress={() => navigation.goBack()}>
                <Icon name="arrow-left" size={20} color="#fff" />
                <BackToLoginText>Voltar para Login</BackToLoginText>
            </BackToLogin>
        </GestureHandlerRootView>
    );
};

export default SignUp;
