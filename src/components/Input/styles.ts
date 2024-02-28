import styled, { css } from 'styled-components/native';
import FeatherIcon from 'react-native-vector-icons/Feather';

interface ContainerProps {
  isFocused: boolean;
  isErrored: boolean;
  isValue: string;
}

export const Container = styled.View<ContainerProps>`
  width: 100%;
  height: 60px;
  padding: 0 16px;
  background: #f3f3f3;
  border-radius: 10px;
  margin-bottom: 16px;

  border-width: 2px;
  border-color: #f3f3f3;
  flex-direction: row;
  align-items: center;

  ${(props) =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}

  ${(props) =>
    props.isValue &&
    css`
      border-color: #f3f3f3;
    `}

  ${(props) =>
    props.isFocused &&
    css`
      border-color: #2d4379;
    `}
`;

export const TextInput = styled.TextInput`
  flex: 1;
  color: #9d9d9d;
  font-size: 16px;
  font-family: 'Poppins-Regular';
`;

export const Icon = styled(FeatherIcon)`
  margin-right: 16px;
`;
