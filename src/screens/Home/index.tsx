import React, {useEffect, useRef, useState} from 'react';
import {TextInput, View} from 'react-native';

import ProfileView from '../../components/ProfileView';
import ResponseView from '../../components/ResponseView';
import {images} from '../../constants';
import {HomeProps, Routes} from '../../navigation';
import {GitHubDataType, fetchUser} from '../../services';
import styles from './styles';

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
      try {
        const result = await fetchUser(searchText);
        setIdle(false);
        setProfile(result);
      } catch (err) {
        // Add third party services like Dynatrace to catch production errors
        setProfile(null);
      }
    }, 300);

    return () => {
      clearTimeout(timeout.current);
    };
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
          {...profile}
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
