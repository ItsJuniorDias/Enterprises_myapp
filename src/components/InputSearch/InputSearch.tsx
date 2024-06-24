import React, { useRef } from 'react';
import { TextInput, TextInputProps, Image } from 'react-native';
import { Touchable, ContentInput, Input } from './styles';
import search from '../../assets/search.png';

interface ISearch extends TextInputProps {
  title: string;
  name: string;
  callBackParent(value: any): void;
}

export const InputSearch: React.FC<ISearch> = ({
  testID = 'inputSearch_testId',
  title,
  name,
  callBackParent,
  ...rest
}) => {
  const inputElementRef = useRef<TextInput>(null);

  const testIDs = useRef({
    input_search: 'inputSearch_testId',
    touchable: 'touchable_testID',
  }).current;

  return (
    <Touchable
      testID={testIDs.touchable}
      onPress={() => inputElementRef.current?.focus()}
    >
      <Image source={search} />

      <ContentInput>
        <Input
          ref={inputElementRef}
          testID={testIDs.input_search}
          placeholder={title}
          placeholderTextColor="#A4A4B2"
          onChangeText={callBackParent}
          {...rest}
        />
      </ContentInput>
    </Touchable>
  );
};
