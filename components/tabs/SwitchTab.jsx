import { Animated, StyleSheet, View, TouchableOpacity } from 'react-native';
import React, { useRef, useState } from 'react';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

const SwitchTab = ({
  onSwitched = (prevIdx, currIdx) => {
    console.log(`Switched to ${currIdx} from ${prevIdx}`);
  },
  initialIndex = 0,
  options = ['TAB1', 'TAB2'],
  selectedColor = '#333',
  defaultColor = 'white',
  elevationColor,
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const colorAnims = useRef(
    options.map((opt, i) => new Animated.Value(i === initialIndex ? 0 : 1))
  ).current;

  const onPressTab = (selectedIndex) => {
    if (currentIndex === selectedIndex) return;

    Animated.parallel([
      Animated.timing(colorAnims[selectedIndex], {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(colorAnims[currentIndex], {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }),
    ]).start(() => {
      onSwitched(currentIndex, selectedIndex);
      setCurrentIndex(selectedIndex);
    });
  };

  const colors = colorAnims.map((colorAnim) => ({
    tab: colorAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [selectedColor, defaultColor],
    }),
    text: colorAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [defaultColor, selectedColor],
    }),
  }));

  return (
    <View style={styles.container}>
      <View style={styles.tab}>
        {options.map((option, idx) => {
          return (
            <AnimatedTouchable
              key={idx}
              disabled={currentIndex === idx}
              activeOpacity={0.7}
              style={[styles.tabItem, { backgroundColor: colors[idx].tab }]}
              onPress={() => onPressTab(idx)}
            >
              <Animated.Text
                style={[styles.tabText, { color: colors[idx].text }]}
              >
                {option}
              </Animated.Text>
            </AnimatedTouchable>
          );
        })}
      </View>
      {elevationColor && (
        <View
          style={[styles.elevationHelper, { backgroundColor: elevationColor }]}
        />
      )}
    </View>
  );
};

export default SwitchTab;

const styles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    elevation: 5,
  },
  tab: {
    flexDirection: 'row',
    borderRadius: 10,
    overflow: 'hidden',
    zIndex: 1,
  },
  tabItem: {
    flex: 1,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabText: {
    fontFamily: 'DGM',
    fontSize: 14,
  },
  elevationHelper: {
    width: 300,
    height: 20,
    marginTop: -13,
    borderBottomStartRadius: 20,
    borderBottomEndRadius: 20,
  },
});
