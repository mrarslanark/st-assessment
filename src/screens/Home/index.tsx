import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Alert,
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {HomeProps, Routes} from '../../navigation';
import {debounce} from 'lodash';

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
  const [profile, setProfile] = useState<GitHubDataType | null | undefined>();
  const timeout = useRef<number>(0);

  useEffect(() => {
    if (params && params.username) {
      setSearchText(params.username);
    }
  }, [params]);

  useEffect(() => {
    clearTimeout(timeout.current);

    if (searchText.trim().length === 0) {
      setProfile(null);
      return;
    }

    timeout.current = setTimeout(async () => {
      const url = `https://api.github.com/users/${searchText}`;
      try {
        const response = await fetch(url, {method: 'GET'});
        if (!response.ok) {
          return;
        }
        const data = await response.json();
        if (data.message === 'Not Found') {
          setProfile(null);
          return;
        }
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
  }, [searchText, params?.username]);

  function handleAudience(title: string, count: number, type: string) {
    if (!profile) {
      return;
    }
    navigation.navigate(Routes.AUDIENCE, {
      name: profile.name,
      username: profile.username,
      count,
      title,
      type,
    });
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder={'Search by username'}
          onChangeText={setSearchText}
          value={searchText}
          autoCapitalize={'none'}
        />
      </View>

      {profile ? (
        <View>
          <Text>GitHub Profile Details</Text>
          <Text>Username: {profile.username}</Text>
          <Text>Name: {profile.name}</Text>
          <Text>Description: {profile.description}</Text>
          <TouchableOpacity
            onPress={() =>
              handleAudience('Followers', profile.followers.count, 'followers')
            }>
            <Text>Follower count: {profile.followers.count}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              handleAudience('Following', profile.following.count, 'following')
            }>
            <Text>Following count: {profile.following.count}</Text>
          </TouchableOpacity>
        </View>
      ) : profile === null ? (
        <View>
          <Text>Not Found</Text>
        </View>
      ) : null}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
    padding: 16,
  },
});
