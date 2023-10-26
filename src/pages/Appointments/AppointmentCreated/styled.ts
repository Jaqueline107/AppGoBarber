import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    padding: 0 24px;
`;


export const Title =  styled.Text`
    font-size: 32px;
    color: #f4ede8;
    font-family: 'RobotoSlab-Medium';
    margin-top: 48px;
    text-align: center;
`;

export const Description = styled.Text`
    font-family: 'RobotoSlab-Regular';
    font-size: 18px;
    color: #999591;
    margin-top: 16px;
`;

export const OkButton = styled.TouchableOpacity`
    background: #ff9000;
    border-radius: 10px;
    padding: 12px 24px;
    margin-top: 24px;
`;

export const OkButtonText = styled.Text`
    font-family: 'RobotoSlab-Medium';
    font-size: 18px;
    color: #312e38;
`;
