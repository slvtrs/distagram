import React from 'react';
import { View, Text, ScrollView, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

import Helpers from '../utilities/Helpers';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import Content from '../constants/Content';
import Post from '../components/Post';
import Avatar from '../components/Avatar';

export default class ActivityScreen extends React.Component {
  static navigationOptions = {
    title: 'Profile',
  };

  render() {
    let followers = Math.round(Math.random()*1000)
    let following = Math.round(followers + ((followers*Math.random()) * 3))
    let user = Content.profileUser
    return (
      <ScrollView style={styles.container}>
        <View style={styles.row}>
          <Avatar user={user} size={70} />
          <View style={styles.rightWrapper}>
            <View style={styles.statsWrapper}>
              <View style={styles.stat}>
                <Text style={styles.statCount}>{Content.profile.length}</Text>
                <Text style={styles.statSubtitle}>attention grabs</Text>
              </View>
              <View style={styles.stat}>
                <Text style={styles.statCount}>{followers}</Text>
                <Text style={styles.statSubtitle}>charitable supporters</Text>
              </View>
              <View style={styles.stat}>
                <Text style={styles.statCount}>{following}</Text>
                <Text style={styles.statSubtitle}>sources of insecurity</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.editButton}>
              <Text style={styles.editButtonText}>Try To Sound Better</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={[styles.col]}>
          <Text style={{fontWeight: 'bold'}}>{user.name}</Text>
          <Text>{user.bio}</Text>
        </View>
        <View style={[styles.row, styles.iconRow]}>
          <TouchableOpacity style={styles.icon}>
            <MaterialCommunityIcons name={`grid`} size={26} color={Colors.blue} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.icon}>
            <Ionicons name={`ios-albums`} size={26} color={Colors.lightGray} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.icon}>
            <MaterialIcons name={`person-pin`} size={26} color={Colors.lightGray} />
          </TouchableOpacity>
        </View>
        <View style={[styles.posts]}>
          {Content.profile.map((post, i) => {
            return (
              <Post 
                key={i}
                index={i} 
                shadesOfGray={Content.profile.length} 
                post={post} 
                size={Layout.window.width/3}
                border
              />
            )
          })}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Layout.basePadding,
  },
  iconRow: {
    padding: Layout.medPadding,
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderColor: Colors.lighterGray,
  },
  rightWrapper: {
    flexDirection: 'column',
    flex: 1,
    alignItems: 'stretch',
    marginLeft: Layout.basePadding,
  },
  statsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  stat: {
    flexDirection: 'column',
    flex: 1,
    alignItems: 'center',
  },
  statCount: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  statSubtitle: {
    color: Colors.tabIconDefault,
    textAlign: 'center',
    fontSize: 12,
  },
  editButton: {
    borderWidth: 1.5,
    borderColor: Colors.lightGray,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 6,
    marginTop: 10,
  },
  editButtonText: {
    fontWeight: '500',
    fontSize: 12,
  },
  col: {
    flex: 1,
    padding: Layout.basePadding,
  },
  posts: {
    flex: 1,
    flexWrap: 'wrap',
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: -3,
  },
  textWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingLeft: Layout.basePadding,
    paddingRight: Layout.basePadding,
  },
  postWrapper: {
    width: 40,
    height: 40,
    backgroundColor: 'black',
  },
});
