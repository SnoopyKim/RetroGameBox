import React, { useState, useRef, useImperativeHandle, useEffect } from 'react';
import { TextInput, StyleSheet, View, Text } from 'react-native';

const Input = (props, ref) => {
  const {
    children: leadingIcon,
    validate,
    layoutStyle,
    contentStyle,
    ...restProps
  } = props;

  const [value, setValue] = useState('');
  const [validResult, setValidResult] = useState('');
  const [isUserChecked, setIsUserChecked] = useState(false);

  useEffect(() => {
    if (isUserChecked && validate) {
      console.log('input', validate(value));
      setValidResult(validate(value));
    } else {
      setValidResult('');
    }
  }, [value, validate, isUserChecked]);

  const inputRef = useRef();
  useImperativeHandle(
    ref,
    () => ({
      check: () => {
        setIsUserChecked(true);
        return {
          value,
          isValid: validate ? validate(value) == '' : true,
        };
      },
      focus: () => {
        inputRef.current.focus();
      },
      blur: () => {
        inputRef.current.blur();
      },
      clear: () => {
        inputRef.current.clear();
        setIsUserChecked(false);
      },
    }),
    [value, validate, validResult, isUserChecked]
  );

  return (
    <View style={[styles.container, layoutStyle]}>
      <View style={styles.row}>
        {leadingIcon}
        <TextInput
          style={[
            { marginStart: leadingIcon ? 8 : 0 },
            styles.input,
            contentStyle,
          ]}
          {...restProps}
          ref={inputRef}
          value={value}
          placeholderTextColor={'#888'}
          onChangeText={(text) => setValue(text)}
          onFocus={() => setIsUserChecked(false)}
          onBlur={() => setIsUserChecked(true)}
        />
      </View>
      {validResult !== '' && <Text style={styles.invalid}>{validResult}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    shadowColor: 'black',
    elevation: 3,
  },
  row: {
    height: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  invalid: {
    height: 13,
    fontFamily: 'DGM',
    textAlignVertical: 'bottom',
    color: 'tomato',
    marginTop: 5,
    marginStart: 32,
    fontSize: 13,
  },
  input: {
    flex: 1,
    fontFamily: 'DGM',
    fontSize: 16,
    color: '#333',
  },
});

export default React.forwardRef(Input);
