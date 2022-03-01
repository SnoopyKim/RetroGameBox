import { Animated, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useContext, useEffect, useRef } from 'react';
import { DialogContext } from './../../context/dialog/dialog-context';

const DialogWrapper = ({ children }) => {
  const { show, dismiss } = useContext(DialogContext);
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const marginTopValue = opacityAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [100, 0],
  });

  useEffect(() => {
    Animated.timing(opacityAnim, {
      toValue: show ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [show]);

  return (
    <View style={styles.background}>
      <TouchableOpacity
        activeOpacity={1.0}
        style={styles.touchable}
        onPress={dismiss}
      />
      <Animated.View
        style={[
          styles.container,
          {
            opacity: opacityAnim,
            transform: [{ translateY: marginTopValue }],
          },
        ]}
      >
        {children}
      </Animated.View>
      <View style={styles.elevationHelper} />
    </View>
  );
};

export default DialogWrapper;

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1,
  },
  touchable: {
    width: '100%',
    height: '100%',
  },
  container: {
    position: 'absolute',
    width: 300,
    padding: 16,
    backgroundColor: 'whitesmoke',
    borderColor: '#333',
    borderWidth: 4,
    borderRadius: 16,
    alignItems: 'stretch',
    zIndex: 2,
    elevation: 10,
  },
});
