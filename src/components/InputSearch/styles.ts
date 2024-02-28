import styled from 'styled-components/native';

export const Touchable = styled.TouchableOpacity`
  border-width: 1px;
  border-color: #f3f3f3;
  width: 100%;
  height: 50px;
  border-radius: 25px;
  margin-top: -8px;

  align-items: center;
  flex-direction: row;
  padding: 0 16px;
`;

export const ContentInput = styled.View`
  width: 90%;
`;

export const Input = styled.TextInput`
  color: #a4a4b2;
  margin-left: 8px;
  font-family: 'Poppins-Regular';
  margin-top: 4px;
`;
