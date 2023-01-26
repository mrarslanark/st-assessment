import React from 'react';
import {Image, ImageSourcePropType, Text, View} from 'react-native';
import styles from './styles';

type ResponseViewType = {
  image: ImageSourcePropType;
  message: string;
};

const ResponseView: React.FC<ResponseViewType> = ({image, message}) => {
  return (
    <View style={styles.container}>
      <Image source={image} style={styles.image} />
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

export default ResponseView;
