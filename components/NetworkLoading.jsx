import React, { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';

const Dot = ({ delay }) => {
  const bottom = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.delay(delay),
      Animated.loop(
        Animated.sequence([
          Animated.timing(bottom, {
            toValue: 1,
            duration: 300,
            useNativeDriver: false,
          }),
          Animated.delay(900),
        ])
      ),
    ]).start();
  }, []);

  const dotInterpolate = bottom.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 20, 0],
  });

  return (
    <Animated.View
      style={[styles.dot, { marginBottom: dotInterpolate }]}
    ></Animated.View>
  );
};

const NetworkLoading = () => {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Dot delay={0} />
        <Dot delay={300} />
        <Dot delay={600} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  wrapper: {
    flexDirection: 'row',
    width: 50,
    height: 30,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 4,
    backgroundColor: 'white',
  },
});

export default NetworkLoading;
