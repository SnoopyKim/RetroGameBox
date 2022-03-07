import AppLoading from 'expo-app-loading';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import { useEffect, useState } from 'react';
import { Image } from 'react-native';

function cacheImages(images) {
  return images.map((image) => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

function cacheFonts(fonts) {
  return fonts.map((font) => Font.loadAsync(font));
}

export default function AssetLoading({ images = [], fonts = [], children }) {
  const [isReady, setIsReady] = useState(false);

  const _loadAssets = async () => {
    await Promise.all([...cacheImages(images), ...cacheFonts(fonts)]);
  };

  useEffect(() => {
    _loadAssets().then(() => setIsReady(true));
  }, []);

  if (!isReady) {
    return <AppLoading />;
  }

  return <>{children}</>;
}
