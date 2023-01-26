import React from 'react';
import {GestureResponderEvent, Image, Text, View} from 'react-native';
import AudienceStatus from '../AudienceStatus';
import styles from './styles';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

interface IProfileView {
  username: string;
  avatar: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  followers: {
    url: string;
    count: number;
  };
  following: {
    url: string;
    count: number;
  };
  onPressFollowers: ((event: GestureResponderEvent) => void) | undefined;
  onPressFollowing: ((event: GestureResponderEvent) => void) | undefined;
  loading?: boolean;
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
  loading,
}) => {
  if (loading) {
    return (
      <SkeletonPlaceholder borderRadius={4}>
        <SkeletonPlaceholder.Item>
          <SkeletonPlaceholder.Item
            width={100}
            height={40}
            alignSelf={'center'}
          />
          <SkeletonPlaceholder.Item
            height={175}
            justifyContent={'space-evenly'}
            alignContent={'center'}
            alignItems={'center'}>
            <SkeletonPlaceholder.Item
              width={75}
              height={75}
              borderRadius={100}
              alignSelf={'center'}
            />
            <SkeletonPlaceholder.Item
              width={'60%'}
              height={30}
              alignSelf={'center'}
            />
            <SkeletonPlaceholder.Item
              width={'60%'}
              height={20}
              alignSelf={'center'}
            />
          </SkeletonPlaceholder.Item>
          <SkeletonPlaceholder.Item
            flexDirection="row"
            justifyContent={'space-evenly'}
            alignContent={'center'}
            alignItems={'center'}
            height={50}
          />
          <SkeletonPlaceholder.Item
            width={'100%'}
            height={2}
            marginVertical={12}
          />
          <SkeletonPlaceholder.Item width={120} height={30} marginBottom={8} />
          <SkeletonPlaceholder.Item
            width={'100%'}
            height={100}
            marginBottom={8}
          />
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder>
    );
  }

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
          count={followers.count}
          onPress={onPressFollowers}
          type="followers"
          disabled={followers.count === 0}
        />
        <AudienceStatus
          count={following.count}
          onPress={onPressFollowing}
          type="following"
          disabled={following.count === 0}
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
