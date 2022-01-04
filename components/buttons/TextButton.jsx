import { Text, TouchableOpacity } from 'react-native';

const TextButton = ({
  title,
  onPressed,
  fontSize,
  color,
  backgroundColor,
  borderColor,
}) => {
  const buttonStyle = {
    borderWidth: 2,
    borderRadius: 10,
    borderColor: borderColor || '#333',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: backgroundColor || '#FFF',
  };

  const titleStyle = {
    fontFamily: 'DGM',
    fontSize: fontSize || 20,
    color: color || '#333',
  };

  return (
    <TouchableOpacity style={buttonStyle} onPress={onPressed}>
      <Text style={titleStyle}>{title}</Text>
    </TouchableOpacity>
  );
};

export default TextButton;
