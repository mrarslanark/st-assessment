import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  headerContainer: {
    justifyContent: 'space-evenly',
    alignContent: 'center',
    alignItems: 'center',
    height: 175,
  },
  audienceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontWeight: 'bold',
    fontSize: 28,
    color: 'black',
    textAlign: 'center',
    alignSelf: 'center',
    height: 40,
    width: 100,
  },
  avatar: {
    width: 75,
    height: 75,
    resizeMode: 'contain',
    borderRadius: 100,
  },
  username: {
    fontWeight: '600',
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 24,
    color: 'black',
  },
  descriptionLabel: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 8,
  },
  description: {
    color: 'black',
  },
  divider: {
    width: '100%',
    height: 2,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    marginVertical: 12,
    opacity: 0.2,
  },
});

export default styles;
