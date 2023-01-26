import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    paddingHorizontal: 6,
    paddingVertical: 8,
  },
  followers: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  count: {
    fontSize: 16,
    color: 'black',
    marginTop: 4,
  },
  listContainer: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  columnWrapperStyle: {
    justifyContent: 'space-between',
  },
});

export default styles;
