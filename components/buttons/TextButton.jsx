import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const TextButton = ({ title, onPressed, color, backgrounColor }) => {
  return (
    <TouchableOpacity onPress={onPressed}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  title: {
    fontFamily: 'DGM',
    fontSize: 20,
  },
});

export default TextButton;
