import React, {useEffect, useRef, useState} from 'react';
import {Alert, TextInput, View} from 'react-native';
import ProfileView from '../../components/ProfileView';
import ResponseView from '../../components/ResponseView';
import {images} from '../../constants';
import {HomeProps, Routes} from '../../navigation';
import styles from './styles';

type GitHubDataType = {
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
};

const Home: React.FC<HomeProps> = ({navigation, route}) => {
  const params = route.params;

  const [searchText, setSearchText] = useState<string>('');
  const [profile, setProfile] = useState<GitHubDataType | null>();
  const [idle, setIdle] = useState<boolean>(true);

  const timeout = useRef<number>(0);

  useEffect(() => {
    if (params?.username) {
      setSearchText(params.username);
    }
  }, [params?.username]);

  useEffect(() => {
    clearTimeout(timeout.current);

    const isTextEmpty = searchText.length === 0;
    if (isTextEmpty) {
      setProfile(null);
      setIdle(true);
      return;
    }

    timeout.current = setTimeout(async () => {
      const url = `https://api.github.com/users/${searchText}`;
      try {
        const response = await fetch(url, {method: 'GET'});
        setIdle(false);
        if (!response.ok) {
          // Not Found
          setProfile(null);
          return;
        }
        const data = await response.json();
        setProfile({
          name: data.name,
          username: data.login,
          avatar: data.avatar_url,
          createdAt: data.created_at,
          updatedAt: data.updated_at,
          description: data.bio,
          followers: {
            count: data.followers,
            url: data.followers_url,
          },
          following: {
            count: data.following,
            url: data.following_url,
          },
        });
      } catch (err) {
        Alert.alert(
          'Something went wrong',
          'Sorry for the inconvinence. The issue has been reported. We will take care of it.',
        );
        console.log(err);
      }
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText]);

  function handleAudience(type: 'following' | 'followers') {
    if (!profile) {
      return;
    }
    const {name, username} = profile;
    navigation.navigate(Routes.AUDIENCE, {
      name,
      username,
      count: profile[type].count,
      type,
    });
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder={'Search Github users by username'}
          onChangeText={setSearchText}
          autoCapitalize={'none'}
          clearButtonMode="while-editing"
          defaultValue={searchText}
        />
      </View>

      {profile ? (
        <ProfileView
          avatar={profile.avatar}
          name={profile.name}
          username={profile.username}
          description={profile.description}
          followers={profile.followers.count}
          following={profile.following.count}
          onPressFollowers={() => handleAudience('followers')}
          onPressFollowing={() => handleAudience('following')}
        />
      ) : idle ? (
        <ResponseView
          image={images.SEARCH}
          message={'Search GitHub Profiles'}
        />
      ) : (
        <ResponseView
          image={images.NOT_FOUND}
          message={'No user found. Try Again'}
        />
      )}
    </View>
  );
};

export default Home;
