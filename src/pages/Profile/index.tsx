import React, { useCallback, useRef } from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  View,
  Alert,
} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';
import {
  launchCamera,
  launchImageLibrary,
  ImageLibraryOptions,
  ImagePickerResponse,
} from 'react-native-image-picker';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import * as Yup from 'yup';
import api from '../../services/api';
import getValidationsErrors from '../../../utils/getValidationErrors';

import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import Input from '../../components/Input';
import Button from '../../components/Button';

import {
  Container,
  Title,
  UserAvatarButton,
  UserAvatar,
  BackButton,
} from './styles';
import { useAuth } from '../../hooks/auth';
import getValidationErrors from '../../../utils/getValidationErrors';

interface ProfileFormData {
  name?: string;
  email: string;
  password: string;
  oldPassword?: string;
  passwordConfirmation?: string;
}

const ProfileUpdate = () => {
  const { user, updateUser } = useAuth();

  const formRef = useRef<FormHandles>(null);
  const navigation = useNavigation();

  const handleSubmit = useCallback(
    async (data: ProfileFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          oldPassword: Yup.string(),
          password: Yup.string().when('oldPassword', {
            is: (val: string) => !!val.length,
            then: () => Yup.string().required('Campo obrigatório'),
            otherwise: () => Yup.string(),
          }),
          passwordConfirmation: Yup.string()
            .when('oldPassword', {
              is: (val: string) => !!val.length,
              then: (schema) => Yup.string().required('Campo obrigatório'),
              otherwise: () => Yup.string(),
            })
            .oneOf([Yup.ref('password'), undefined], 'Confirmação incorreta'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const { name, email, oldPassword, password, passwordConfirmation } =
          data;

        const formData = {
          name,
          email,
          ...(oldPassword && {
            oldPassword,
            password,
            passwordConfirmation,
          }),
        };
        const response = await api.put('profile', formData);
        updateUser(response.data);
        navigation.goBack();

        console.log(response.data);
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationsErrors(err);
          return formRef.current?.setErrors(errors);
        }
        console.log(err);
        Alert.alert('ainda n foi');
      }
    },
    [updateUser, navigation.goBack],
  );

  const handleUpdateAvatar = useCallback(() => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 200,
      maxWidth: 200,
    };

    Alert.alert('Escolha uma opção', 'Como você deseja escolher a imagem?', [
      {
        text: 'Selecionar da galeria',
        onPress: () =>
          launchImageLibrary(options, (response: ImagePickerResponse) => {
            if (response.didCancel) {
              console.log('User cancelled image picker');
            }
          }),
      },
      {
        text: 'Usar câmera',
        onPress: () =>
          launchCamera(options, (response: ImagePickerResponse) => {
            if (response.didCancel) {
              console.log('User cancelled image picker');
            } else if (response.errorMessage) {
              console.log('ImagePicker Error: ', response.errorMessage);
            } else {
              const data = new FormData();
              data.append('avatar', {
                type: 'image/jpeg',
                name: `${user.id}.jpg`,
                uri: user.avatar_url,
              });

              api.patch('users/avatar', data).then((apiResponse) => {
                updateUser(apiResponse.data);
              });
            }
          }),
      },
      {
        text: 'Cancelar',
        style: 'cancel',
      },
    ]);
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
            <BackButton>
              <Icon
                name="chevron-left"
                size={25}
                color="#999591"
                onPress={() => navigation.goBack()}
              />
            </BackButton>

            <UserAvatarButton onPress={handleUpdateAvatar}>
              <UserAvatar source={{ uri: user.avatar_url }} />
            </UserAvatarButton>

            <View>
              <Title>Meu Perfil</Title>
            </View>

            <Form initialData={user} ref={formRef} onSubmit={handleSubmit}>
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
                name="oldPassword"
                icon="lock"
                containerStyle={{ marginTop: 10 }}
                placeholder="Senha atual"
                secureTextEntry
                returnKeyType="next"
                textContentType="newPassword"
              />
              <Input
                name="password"
                icon="lock"
                placeholder="Nova senha"
                secureTextEntry
                returnKeyType="next"
                textContentType="newPassword"
              />
              <Input
                name="passwordConfirmation"
                icon="lock"
                placeholder="Confirmar senha"
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
              title="Confirmar mudanças"
            />
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
    </GestureHandlerRootView>
  );
};

export default ProfileUpdate;
