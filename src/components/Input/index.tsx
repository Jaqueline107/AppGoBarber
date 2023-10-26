import React, { useEffect, useRef, useState, useCallback } from 'react';
import { TextInputProps } from 'react-native';
import { useField } from '@unform/core';

import { Container, TextInput, Icon } from './styles';

interface InputProps extends TextInputProps {
    name: string;
    icon?: string;
    ref?: React.RefObject<InputRef>;
    containerStyle?: {};
}

interface InputValueReference {
    value: string;
}

interface InputRef {
    focus(): void;
}

const Input = ({ name, icon, containerStyle = {}, ...rest }: InputProps) => {
    const inputElementRef = useRef<any>(null);

    const {
        registerField,
        defaultValue = '',
        fieldName,
        error,
    } = useField(name);
    const inputValueRef = useRef<InputValueReference>({ value: defaultValue });

    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);

    const handleInputFocus = useCallback(() => {
        setIsFocused(true);
    }, []);

    const handleInputBlur = useCallback(() => {
        setIsFocused(false);

        setIsFilled(!!inputValueRef.current.value);
    }, []);

    useField(name);

    useEffect(() => {
        return registerField<string>({
            name: fieldName,
            ref: inputValueRef.current,
            path: 'value',
            setValue(ref: any, value) {
                inputValueRef.current.value = value;
                inputElementRef.current.setNativeProps({ text: value });
            },
            clearValue() {
                inputValueRef.current.value = '';
                inputElementRef.current.clear();
            },
        });
    }),
        [fieldName, registerField];

    return (
        <Container style={containerStyle} isFocused={isFocused} isErrored={!!error} >
            {icon && (
                <Icon
                    name={icon}
                    size={23}
                    color={isFocused || isFilled ? '#ff9000' : '#7e7588'}
                />
            )}
            <TextInput
                ref={inputElementRef}
                keyboardAppearance={'dark'}
                placeholderTextColor={'#7e7588'}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                defaultValue={defaultValue}
                onChangeText={value => {
                    inputValueRef.current.value = value;
                }}
                {...rest}
            />
        </Container>
    );
};

export default Input;
