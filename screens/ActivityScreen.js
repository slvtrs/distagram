import React from 'react';
import { View, Text, ScrollView, StyleSheet, FlatList } from 'react-native';

import Layout from '../constants/Layout';
import Content from '../constants/Content';
import Post from '../components/Post';
import Avatar from '../components/Avatar';

export default class ActivityScreen extends React.Component {
  static navigationOptions = {
    title: 'Activity',
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <FlatList
          data={Content.activity}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, i}) => {
            let user = Content.users[ Math.floor(Math.random()*Content.users.length) ]
            return (
              <View style={styles.wrapper} key={i}>
                <Avatar user={user} size={40} />
                <View style={styles.textWrapper}>
                  <Text style={styles.text}>
                    <Text style={{fontWeight: 'bold'}}>{user.name}</Text> {item.text}
                  </Text>
                </View>
                <Post 
                  key={i}
                  index={i} 
                  shadesOfGray={Content.activity.length*2} 
                  size={40}
                />
              </View>
            )
          }}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  wrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Layout.basePadding,
    marginBottom: Layout.basePadding,
  },
  textWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingLeft: Layout.medPadding,
    paddingRight: Layout.medPadding,
  },
});
