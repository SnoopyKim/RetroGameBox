import { Image, Text, TouchableOpacity } from 'react-native';

const TextButton = ({
  title,
  onPressed,
  fontSize,
  color,
  backgroundColor,
  borderColor,
  leading,
  leadingTint,
  trailing,
}) => {
  const buttonStyle = {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 10,
    borderColor: borderColor || '#333',
    paddingHorizontal: 6,
    paddingVertical: 6,
    backgroundColor: backgroundColor || '#FFF',
    elevation: 5,
  };

  const titleStyle = {
    fontFamily: 'DGM',
    fontSize: fontSize || 20,
    color: color || '#333',
    marginHorizontal: 10,
  };

  return (
    <TouchableOpacity style={buttonStyle} onPress={onPressed}>
      {leading && (
        <Image
          source={leading}
          style={{ width: 30, height: 30, tintColor: leadingTint }}
        />
      )}
      <Text style={titleStyle}>{title}</Text>
      {trailing && (
        <Image source={trailing} style={{ width: 30, height: 30 }} />
      )}
    </TouchableOpacity>
  );
};

export default TextButton;
