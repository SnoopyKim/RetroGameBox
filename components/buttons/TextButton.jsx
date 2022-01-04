import { Image, Text, TouchableOpacity } from 'react-native';

const TextButton = ({
  title,
  onPressed,
  fontSize,
  color,
  backgroundColor,
  borderColor,
  leading,
  trailing,
}) => {
  const buttonStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 10,
    borderColor: borderColor || '#333',
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: backgroundColor || '#FFF',
  };

  const titleStyle = {
    fontFamily: 'DGM',
    fontSize: fontSize || 20,
    color: color || '#333',
    marginHorizontal: 10,
  };

  return (
    <TouchableOpacity style={buttonStyle} onPress={onPressed}>
      {leading && <Image source={leading} style={{ width: 30, height: 30 }} />}
      <Text style={titleStyle}>{title}</Text>
      {trailing && (
        <Image source={trailing} style={{ width: 30, height: 30 }} />
      )}
    </TouchableOpacity>
  );
};

export default TextButton;
