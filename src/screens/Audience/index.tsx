import React, {useCallback, useEffect, useState} from 'react';
import {Alert, FlatList, RefreshControl, Text, View} from 'react-native';
import AudienceItemView from '../../components/AudienceItemView';
import {AudienceProps, Routes} from '../../navigation';
import {capitalize} from '../../utils';
import styles from './styles';
import {fetchAudience} from '../../services';
import {messages} from '../../constants';

export type AudienceType = {
  username: string;
  avatar: string;
  profile: string;
};

const Audience: React.FC<AudienceProps> = ({navigation, route}) => {
  const params = route.params;

  const [page, setPage] = useState(1);
  const [users, setUsers] = useState<AudienceType[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  // TODO: Create a capitalize function
  useEffect(() => {
    navigation.setOptions({
      title: capitalize(params.type),
    });
  }, [navigation, params]);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!params) {
    Alert.alert(messages.GENERAL_ERROR_TITLE, messages.GENERAL_ERROR_MESSAGE, [
      {text: 'Ok', onPress: () => navigation.pop()},
    ]);
    return null;
  }

  function handleProfilePress(user: AudienceType) {
    navigation.navigate(Routes.HOME, {
      username: user.username,
      profile: user.profile,
    });
  }

  async function fetchData() {
    try {
      const audience = await fetchAudience(params.username, params.type, page);
      setUsers(audience);
    } catch (err: any) {
      Alert.alert(messages.GENERAL_ERROR_TITLE, err?.message);
      console.log(err);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.followers}>
          {params.name} {params.type}
        </Text>
        <Text style={styles.count}>Total Followers: {params.count}</Text>
      </View>
      <View style={styles.listContainer}>
        <FlatList
          data={users}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          numColumns={2}
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={styles.columnWrapperStyle}
          keyExtractor={item => item.username}
          onEndReached={() => setPage((prevState: number) => prevState + 1)}
          renderItem={({item}) => {
            return (
              <AudienceItemView
                {...item}
                onPress={() => handleProfilePress(item)}
              />
            );
          }}
        />
      </View>
    </View>
  );
};

export default Audience;
