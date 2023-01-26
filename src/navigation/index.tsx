import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import React from 'react';
import Audience from '../screens/Audience';
import Home from '../screens/Home';

export enum Routes {
  HOME = 'Home',
  AUDIENCE = 'Audience',
}

type StackParamList = {
  [Routes.HOME]:
    | {
        username: string;
        profile: string;
      }
    | undefined;
  [Routes.AUDIENCE]: {
    name: string;
    username: string;
    count: number;
    type: 'following' | 'followers';
  };
};

export type HomeProps = NativeStackScreenProps<StackParamList, Routes.HOME>;
export type AudienceProps = NativeStackScreenProps<
  StackParamList,
  Routes.AUDIENCE
>;

const Stack = createNativeStackNavigator<StackParamList>();
const Navigation: React.FC = (): JSX.Element => {
  return (
    <Stack.Navigator screenOptions={{headerBackTitle: 'Back'}}>
      <Stack.Screen
        name={Routes.HOME}
        options={{title: 'Home'}}
        component={Home}
      />
      <Stack.Screen
        options={{
          headerLargeTitle: false,
        }}
        name={Routes.AUDIENCE}
        component={Audience}
      />
    </Stack.Navigator>
  );
};

export default Navigation;
