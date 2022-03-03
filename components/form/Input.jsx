import React, {
  useState,
  useRef,
  useImperativeHandle,
  useCallback,
} from 'react';
import { TextInput, StyleSheet, View, Text } from 'react-native';

const Input = (props, ref) => {
  const {
    children: leadingIcon,
    validate,
    layoutStyle,
    contentStyle,
    initValue,
    ...restProps
  } = props;

  const [value, setValue] = useState(initValue || '');
  const [validResult, setValidResult] = useState('');

  const checkInputValue = useCallback(
    (isUserChecked) => {
      if (isUserChecked && validate) {
        setValidResult(validate(value));
      } else {
        setValidResult('');
      }
    },
    [value, validate]
  );

  const inputRef = useRef();
  useImperativeHandle(
    ref,
    () => ({
      check: () => {
        checkInputValue(true);
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
        setValidResult('');
      },
    }),
    [value, validate, validResult]
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
          onFocus={() => checkInputValue(false)}
          onBlur={() => checkInputValue(true)}
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
