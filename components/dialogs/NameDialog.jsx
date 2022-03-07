import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useContext, useEffect, useRef, useState } from 'react';
import DialogWrapper from './DialogWrapper';
import { DialogContext } from '../../context/dialog/dialog-context';
import { AuthContext } from '../../context/auth/auth-context';
import CloseIcon from '../../assets/images/icon_close.svg';
import { DatabaseContext } from '../../context/database/database-context';
import Input from '../form/Input';
import TextButton from '../buttons/TextButton';
import NameIcon from '../../assets/images/icon_name.svg';

const NameDialog = () => {
  const { changeName } = useContext(AuthContext);
  const { dismiss } = useContext(DialogContext);
  const { profile } = useContext(DatabaseContext);
  const [name, setName] = useState(profile.name);
  const nameRef = useRef();

  useEffect(() => {
    if (profile.name !== name) {
      dismiss();
    }
  }, [profile, name, dismiss]);

  const validateName = (text) => {
    if (!/^[a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣]+$/.test(text)) {
      return '한글 혹은 영어로만 입력하세요';
    } else if (text.length < 3 || text.length > 8) {
      return '3 ~ 8 글자여야 합니다';
    } else if (name === text) {
      return '현재 닉네임과 같습니다';
    } else {
      return '';
    }
  };

  const changeNameHandler = () => {
    const { value: inputName, isValid: nameIsValid } = nameRef.current.check();
    if (nameIsValid) {
      changeName(inputName);
    }
  };

  return (
    <DialogWrapper>
      <TouchableOpacity style={styles.close} onPress={dismiss}>
        <CloseIcon width={30} height={30} style={{ color: '#333' }} />
      </TouchableOpacity>
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>닉네임 변경</Text>
      </View>
      <Input
        ref={nameRef}
        layoutStyle={styles.input}
        initValue={name}
        placeholder={'닉네임을 입력하세요'}
        returnKeyType={'done'}
        validate={validateName}
        onSubmitEditing={changeNameHandler}
      >
        <NameIcon style={{ color: '#333' }} />
      </Input>
      <TextButton
        color={'whitesmoke'}
        backgroundColor={'#333'}
        onPressed={changeNameHandler}
        title={'확인'}
      />
    </DialogWrapper>
  );
};

export default NameDialog;

const styles = StyleSheet.create({
  close: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  titleWrapper: {
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    color: '#333',
    fontFamily: 'DGM',
    fontSize: 24,
  },
  input: {
    marginTop: 10,
    marginBottom: 15,
  },
});
