import React, { useRef } from 'react';
import { Image, TextInputProps } from 'react-native';
import { Touchable, ContentInput, Input } from './styles';
import search from '../../assets/search.png';
interface ISearch extends TextInputProps {
  title: string;
  name: string;
  callBackParent(value: any): void;
}

export const InputSearch = ({
  testID = 'inputSearch_testId',
  title,
  name,
  callBackParent,
  ...rest
}: ISearch) => {
  const inputElementRef = useRef<any>(null);

  const testIDs = useRef({
    input_search: 'inputSearch_testId',
    touchable: 'touchable_testID',
  }).current;

  return (
    <Touchable
      testID={testIDs.touchable}
      onPress={() => inputElementRef.current.focus()}
    >
      <Image source={search} />

      <ContentInput>
        <Input
          testID={testIDs.input_search}
          placeholder={title}
          placeholderTextColor="#A4A4B2"
          ref={inputElementRef}
          onChangeText={callBackParent}
          {...rest}
        />
      </ContentInput>
    </Touchable>
  );
};
