import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 16,
    justifyContent: 'space-around',
    alignContent: 'center',
    alignItems: 'center',
    width: '49%',
    backgroundColor: 'white',
    height: 170,
    marginBottom: 8,
    borderRadius: 8,
  },
  avatar: {
    width: 75,
    height: 75,
    resizeMode: 'contain',
    borderRadius: 100,
  },
  username: {
    fontSize: 13,
  },
});

export default styles;
