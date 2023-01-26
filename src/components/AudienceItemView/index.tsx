import React from 'react';
import {
  GestureResponderEvent,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import styles from './styles';

interface AudienceItemView {
  onPress: ((event: GestureResponderEvent) => void) | undefined;
  avatar: string;
  username: string;
}

const AudienceItemView: React.FC<AudienceItemView> = ({
  onPress,
  avatar,
  username,
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Image source={{uri: avatar}} style={styles.avatar} />
      <Text style={styles.username}>{username}</Text>
    </TouchableOpacity>
  );
};

export default AudienceItemView;
