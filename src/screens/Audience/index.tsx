import React, {useEffect, useState} from 'react';
import {
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {AudienceProps, Routes} from '../../navigation';
import {capitalize} from '../../utils';

type AudienceType = {
  username: string;
  avatar: string;
  profile: string;
};

const Audience: React.FC<AudienceProps> = ({navigation, route}) => {
  const params = route.params;

  const [page, setPage] = useState(1);
  const [users, setUsers] = useState<AudienceType[]>([]);

  // TODO: Create a capitalize function
  useEffect(() => {
    navigation.setOptions({
      title: capitalize(params.type),
    });
  }, [navigation, params]);

  useEffect(() => {
    (async () => {
      const url = `https://api.github.com/users/${params.username}/${
        params.type
      }?per_page=${page * 10}`;
      try {
        const request = await fetch(url, {method: 'GET'});
        const json = await request.json();
        if (json.length > 0) {
          const data = json.map((user: any) => {
            return {
              username: user.login,
              avatar: user.avatar_url,
              profile: user.url,
            };
          });
          setUsers(data);
        }
      } catch (err) {
        Alert.alert(
          'Something went wrong',
          'Sorry for the inconvinence. The issue has been reported. We will take care of it.',
        );
        console.log(err);
      }
    })();
  }, [page, params.type, params.username]);

  function handleProfilePress(user: AudienceType) {
    navigation.navigate(Routes.HOME, {
      username: user.username,
      profile: user.profile,
    });
  }

  if (!params) {
    Alert.alert(
      'Something went wrong',
      'Sorry for the inconvinence. The issue has been reported. We will take care of it. Kindly, return back to the previous screen',
      [{text: 'Yes', onPress: () => navigation.pop()}],
    );
    return null;
  }

  return (
    <View>
      <Text>
        {params.name} {params.type}
      </Text>
      <Text>Total Followers: {params.count}</Text>
      {users.length > 0 ? (
        <FlatList
          data={users}
          keyExtractor={item => item.username}
          onEndReached={() => setPage((prevState: number) => prevState + 1)}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                onPress={() => handleProfilePress(item)}
                style={styles.itemContainer}>
                <Image source={{uri: item.avatar}} style={styles.avatar} />
                <Text style={styles.username}>{item.username}</Text>
              </TouchableOpacity>
            );
          }}
        />
      ) : null}
    </View>
  );
};

export default Audience;

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    padding: 16,
    alignContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    borderRadius: 100,
  },
  username: {
    marginLeft: 12,
    fontSize: 16,
  },
});
