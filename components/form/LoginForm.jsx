import { Keyboard, StyleSheet, Text, View } from 'react-native';
import React, { useRef } from 'react';
import Input from './Input';
import TextButton from '../buttons/TextButton';
import EmailIcon from '../../assets/images/icon_email.svg';
import PasswordIcon from '../../assets/images/icon_password.svg';
import NameIcon from '../../assets/images/icon_name.svg';

const LoginForm = ({ isRegister, onLogin, onRegister }) => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const pwconfirmRef = useRef();
  const nameRef = useRef();

  const validateEmail = (text) => {
    if (text.trim().length === 0) {
      return '이메일을 입력해주세요';
    } else if (text.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
      return '';
    } else {
      return '이메일 양식을 확인해주세요';
    }
  };

  const validatePassword = (text) => {
    if (/\s/g.test(text)) {
      return '공백을 제거해주세요';
    } else if (text.length < 8) {
      return '8글자 이상이어야 합니다';
    } else {
      return '';
    }
  };

  const validatePwConfirm = (text) => {
    const { value: password } = passwordRef.current.check();
    if (text !== password) {
      return '비밀번호와 일치하지 않습니다';
    } else {
      return '';
    }
  };

  const validateName = (text) => {
    if (!/^[a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣]+$/.test(text)) {
      return '한글 혹은 영어로만 입력하세요';
    } else if (text.length < 3) {
      return '3글자 이상이어야 합니다';
    } else {
      return '';
    }
  };

  const loginHandler = async () => {
    Keyboard.dismiss();
    const { value: email, isValid: emailIsValid } = emailRef.current.check();
    const { value: password, isValid: pwIsValid } = passwordRef.current.check();

    if (emailIsValid && pwIsValid) {
      // 로그인
      onLogin(email, password);
    } else {
      // 로그인 양식 X
    }
  };

  const registerHandler = () => {
    Keyboard.dismiss();
    const { value: email, isValid: emailIsValid } = emailRef.current.check();
    const { value: password, isValid: pwIsValid } = passwordRef.current.check();
    const { isValid: pwIsSame } = pwconfirmRef.current.check();
    const { value: name, isValid: nameIsValid } = nameRef.current.check();

    if (emailIsValid && pwIsValid && pwIsSame && nameIsValid) {
      // 회원가입
      onRegister(email, password, name);
    } else {
      // 회원가입 양식 X
    }
  };

  return (
    <>
      <Input
        ref={emailRef}
        layoutStyle={styles.input}
        contentStyle={styles.purple}
        placeholder={'이메일을 입력하세요'}
        keyboardType={'email-address'}
        returnKeyType={'next'}
        validate={validateEmail}
        onSubmitEditing={() => {
          passwordRef.current.focus();
        }}
      >
        <EmailIcon style={styles.purple} />
      </Input>
      <Input
        ref={passwordRef}
        layoutStyle={styles.input}
        contentStyle={styles.purple}
        placeholder={'비밀번호를 입력하세요'}
        secureTextEntry={true}
        returnKeyType={isRegister ? 'next' : 'done'}
        validate={validatePassword}
        onSubmitEditing={() => {
          isRegister ? pwconfirmRef.current.focus() : loginHandler();
        }}
      >
        <PasswordIcon style={styles.purple} />
      </Input>
      {isRegister && (
        <>
          <Input
            ref={pwconfirmRef}
            layoutStyle={styles.input}
            contentStyle={styles.purple}
            placeholder={'비밀번호를 다시 입력해주세요'}
            secureTextEntry={true}
            returnKeyType={'next'}
            validate={validatePwConfirm}
            onSubmitEditing={() => nameRef.current.focus()}
          >
            <PasswordIcon style={styles.purple} />
          </Input>
          <Input
            ref={nameRef}
            layoutStyle={styles.input}
            contentStyle={styles.purple}
            placeholder={'닉네임을 입력하세요'}
            returnKeyType={'done'}
            validate={validateName}
            onSubmitEditing={registerHandler}
          >
            <NameIcon style={styles.purple} />
          </Input>
        </>
      )}
      <View style={styles.button}>
        {!isRegister ? (
          <TextButton
            borderColor={'white'}
            color={'purple'}
            onPressed={loginHandler}
            title={'이메일 로그인'}
          />
        ) : (
          <TextButton
            borderColor={'white'}
            color={'purple'}
            onPressed={registerHandler}
            title={'회원가입'}
          />
        )}
      </View>
    </>
  );
};

export default LoginForm;

const styles = StyleSheet.create({
  form: {
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    marginVertical: 8,
  },
  purple: {
    color: 'purple',
  },
  button: {
    marginTop: 16,
  },
});
