import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import DiscoverScreen from '../screens/DiscoverScreen';
import PostScreen from '../screens/PostScreen';
import ActivityScreen from '../screens/ActivityScreen';
import ProfileScreen from '../screens/ProfileScreen';

const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

HomeStack.navigationOptions = {
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={`home${focused ? '' : '-outline'}`}
    />
  ),
};

const DiscoverStack = createStackNavigator({
  Discover: DiscoverScreen,
});

DiscoverStack.navigationOptions = {
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      iconSet={focused ? 'FontAwesome' : 'Feather'}
      focused={focused}
      name={`search`}
    />
  ),
};

const PostStack = createStackNavigator({
  PostScreen: PostScreen,
});

PostStack.navigationOptions = {
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      iconSet={'MaterialCommunityIcons'}
      focused={focused}
      name={`plus-box${focused ? '' : '-outline'}`}
    />
  ),
};

const ActivityStack = createStackNavigator({
  Activity: ActivityScreen,
});

ActivityStack.navigationOptions = {
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      iconSet={'FontAwesome'}
      focused={focused}
      name={`heart${focused ? '' : '-o'}`}
    />
  ),
};

const ProfileStack = createStackNavigator({
  Profile: ProfileScreen,
});

ProfileStack.navigationOptions = {
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      iconSet={'MaterialIcons'}
      focused={focused}
      name={`person${focused ? '' : '-outline'}`}
    />
  ),
};

export default createBottomTabNavigator({
  HomeStack,
  DiscoverStack,
  PostStack,
  ActivityStack,
  ProfileStack,
}, {
  tabBarOptions: {
    showLabel: false
  },
  // initialRouteName: 'PostStack',
  initialRouteName: 'HomeStack',
});
