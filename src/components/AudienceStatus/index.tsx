import React from 'react';
import {GestureResponderEvent, Text, TouchableOpacity} from 'react-native';
import styles from './styles';

type AudienceStatusType = {
  onPress: ((event: GestureResponderEvent) => void) | undefined;
  count: number;
  type: 'followers' | 'following';
  disabled?: boolean;
};

const AudienceStatus: React.FC<AudienceStatusType> = ({
  onPress,
  count,
  type,
  disabled,
}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={styles.container}>
      <Text style={styles.count}>{count}</Text>
      <Text style={styles.label}>{type}</Text>
    </TouchableOpacity>
  );
};

export default AudienceStatus;
