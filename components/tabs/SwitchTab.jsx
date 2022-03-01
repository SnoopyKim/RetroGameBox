import { Animated, StyleSheet, View, TouchableOpacity } from 'react-native';
import React, { useRef } from 'react';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

const SwitchTab = ({
  onSwitch,
  currentOptionName,
  firstOptionName,
  secondOptionName,
}) => {
  const colorAnim = useRef(new Animated.Value(0)).current;

  const onPressTab = (selectedOption) => {
    if (currentOptionName === selectedOption) return;
    Animated.timing(colorAnim, {
      toValue: currentOptionName === firstOptionName ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start(() => onSwitch(selectedOption));
  };

  const loginColor = {
    tab: colorAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ['mediumorchid', 'white'],
    }),
    text: colorAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ['white', 'mediumorchid'],
    }),
  };

  const registerColor = {
    tab: colorAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ['white', 'mediumorchid'],
    }),
    text: colorAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ['mediumorchid', 'white'],
    }),
  };
  return (
    <>
      <View style={styles.tab}>
        <AnimatedTouchable
          disabled={currentOptionName === firstOptionName}
          activeOpacity={0.7}
          style={[styles.tabItem, { backgroundColor: loginColor.tab }]}
          onPress={() => onPressTab(firstOptionName)}
        >
          <Animated.Text style={[styles.tabText, { color: loginColor.text }]}>
            로그인
          </Animated.Text>
        </AnimatedTouchable>
        <AnimatedTouchable
          disabled={currentOptionName === secondOptionName}
          activeOpacity={0.7}
          style={[styles.tabItem, { backgroundColor: registerColor.tab }]}
          onPress={() => onPressTab(secondOptionName)}
        >
          <Animated.Text
            style={[styles.tabText, { color: registerColor.text }]}
          >
            회원가입
          </Animated.Text>
        </AnimatedTouchable>
      </View>
      <View style={styles.elevationHelper} />
    </>
  );
};

export default SwitchTab;

const styles = StyleSheet.create({
  tab: {
    width: 300,
    flexDirection: 'row',
    borderRadius: 10,
    // borderColor: 'mediumorchid',
    // borderWidth: 2,
    overflow: 'hidden',
    zIndex: 1,
  },
  tabItem: {
    flex: 1,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  tabText: {
    fontFamily: 'DGM',
    fontSize: 14,
    color: 'mediumorchid',
  },
  elevationHelper: {
    width: 300,
    height: 20,
    marginTop: -13,
    backgroundColor: 'purple',
    borderBottomStartRadius: 20,
    borderBottomEndRadius: 20,
  },
});
