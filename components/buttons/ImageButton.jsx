import { Image, TouchableOpacity, View } from 'react-native';

const ImageButton = ({ src, onPressed, width, height }) => {
  const defaultSize = Image.resolveAssetSource(src);

  return (
    <TouchableOpacity
      style={{
        width: width || defaultSize.width,
        height: height || defaultSize.height,
      }}
      onPress={onPressed}
      activeOpacity={0.7}
    >
      <Image
        style={{ width: '100%', height: '100%' }}
        source={src}
        resizeMode="stretch"
      />
    </TouchableOpacity>
  );
};

export default ImageButton;
