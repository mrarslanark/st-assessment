import {StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';

const Home = () => {
  const [searchText, setSearchText] = useState('');
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder={'Search by username'}
          onChangeText={setSearchText}
          value={searchText}
        />
      </View>

      <View>
        <Text>GitHub Profile Details</Text>
        <Text>Username</Text>
        <Text>Name</Text>
        <Text>Description</Text>
        <Text>Follower count: 0</Text>
        <Text>Following count: 0</Text>
      </View>
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
