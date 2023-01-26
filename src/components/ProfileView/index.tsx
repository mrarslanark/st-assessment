import React from 'react';
import {GestureResponderEvent, Image, Text, View} from 'react-native';
import AudienceStatus from '../AudienceStatus';
import styles from './styles';

interface IProfileView {
  avatar: string;
  name: string;
  username: string;
  description: string;
  followers: number;
  following: number;
  onPressFollowers: ((event: GestureResponderEvent) => void) | undefined;
  onPressFollowing: ((event: GestureResponderEvent) => void) | undefined;
}

const ProfileView: React.FC<IProfileView> = ({
  avatar,
  name,
  username,
  followers,
  following,
  description,
  onPressFollowers,
  onPressFollowing,
}) => {
  return (
    <View>
      <Text style={styles.heading}>Profile</Text>
      <View style={styles.headerContainer}>
        <Image source={{uri: avatar}} style={styles.avatar} />
        <View>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.username}>{username}</Text>
        </View>
      </View>
      <View style={styles.audienceContainer}>
        <AudienceStatus
          count={followers}
          onPress={onPressFollowers}
          type="followers"
          disabled={followers === 0}
        />
        <AudienceStatus
          count={following}
          onPress={onPressFollowing}
          type="following"
          disabled={following === 0}
        />
      </View>
      <View style={styles.divider} />
      <View>
        <Text style={styles.descriptionLabel}>Biography</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </View>
  );
};

export default ProfileView;
