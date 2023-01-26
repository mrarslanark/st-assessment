import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import React from 'react';
import Followers from '../screens/Followers/index';
import Following from '../screens/Following';
import Home from '../screens/Home';

export enum Routes {
  HOME = 'Home',
  FOLLOWERS = 'Followers',
  FOLLOWING = 'Following',
}

type StackParamList = {
  [Routes.HOME]: {} | undefined;
  [Routes.FOLLOWERS]:
    | {
        name: string;
        url: string;
        count: number;
      }
    | undefined;
  [Routes.FOLLOWING]:
    | {
        name: string;
        url: string;
        count: number;
      }
    | undefined;
};

export type HomeProps = NativeStackScreenProps<StackParamList, Routes.HOME>;
export type FollowersProps = NativeStackScreenProps<
  StackParamList,
  Routes.FOLLOWERS
>;
export type FollowingProps = NativeStackScreenProps<
  StackParamList,
  Routes.FOLLOWING
>;

const Stack = createNativeStackNavigator<StackParamList>();
const Navigation: React.FC = (): JSX.Element => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={Routes.HOME}
        options={{title: 'GitHub Profiles'}}
        component={Home}
      />
      <Stack.Screen
        name={Routes.FOLLOWERS}
        options={{title: 'Followers'}}
        component={Followers}
      />
      <Stack.Screen
        name={Routes.FOLLOWING}
        options={{title: 'Following'}}
        component={Following}
      />
    </Stack.Navigator>
  );
};

export default Navigation;
