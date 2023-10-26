/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useCallback, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';

import {
    Image,
    KeyboardAvoidingView,
    ScrollView,
    Platform,
    type TextInput,
} from 'react-native';

import { GestureHandlerRootView } from 'react-native-gesture-handler';

import Icon from 'react-native-vector-icons/Feather';
import logoImg from '../../assets/logo.png';

import * as Yup from 'yup';

import { Form } from '@unform/mobile';
import { type FormHandles } from '@unform/core';
import { useAuth } from '../../hooks/auth';

import getValidationsErrors from '../../../utils/getValidationErrors';

import Input from '../../components/Input';
import Button from '../../components/Button';

import {
    Container,
    Title,
    ForgotPassword,
    ForgotPasswordText,
    CreateAccountButton,
    CreateAccountButtonText,
} from './styles';

interface SignInFormData {
    email: string;
    password: string;
}

const SignIn = () => {
    const formRef = useRef<FormHandles>(null);

    const passwordInputRef = useRef<TextInput>(null);

    const navigation = useNavigation();

    const { signIn, user } = useAuth();

    console.log(user, 'user');

    const HandleSignIn = useCallback(async (data: SignInFormData) => {
        try {
            formRef.current?.setErrors({});

            const schema = Yup.object().shape({
                email: Yup.string()
                    .required('E-mail obrigatório')
                    .email('Digite um e-mail válido'),
                password: Yup.string().required('Senha obrigatória'),
            });

            await schema.validate(data, {
                abortEarly: false,
            });

            const response = await signIn({
                email: data.email,
                password: data.password,
            });
            console.log(response, 'response');
            return response;
        } catch (err) {
            if (err instanceof Yup.ValidationError) {
                const errors = getValidationsErrors(err);
                return formRef.current?.setErrors(errors);
            }
            console.log(err);
        }
    }, []);

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

                        <Title>Faça seu Login</Title>

                        <Form ref={formRef} onSubmit={HandleSignIn}>
                            <Input
                                name="email"
                                icon="mail"
                                placeholder="E-mail"
                                autoCorrect={false}
                                autoCapitalize="none"
                                keyboardType="email-address"
                                returnKeyType="next"
                                onSubmitEditing={() => {
                                    passwordInputRef.current?.focus();
                                }}
                            />

                            <Input
                                name="password"
                                icon="lock"
                                placeholder="Senha"
                                secureTextEntry
                                returnKeyType="send"
                            />
                        </Form>
                        <Button
                            onPress={() => {
                                formRef.current?.submitForm();
                            }}
                            title="Entrar"
                        />
                        <ForgotPassword onPress={() => {}}>
                            <ForgotPasswordText>
                                Esqueci minha senha
                            </ForgotPasswordText>
                        </ForgotPassword>
                    </Container>
                </ScrollView>
            </KeyboardAvoidingView>

            <CreateAccountButton
                onPress={() => {
                    navigation.navigate('SignUp' as never);
                }}
            >
                <Icon name="log-in" size={20} color="#ff9000" />
                <CreateAccountButtonText>
                    Criar uma conta
                </CreateAccountButtonText>
            </CreateAccountButton>
        </GestureHandlerRootView>
    );
};

export default SignIn;
