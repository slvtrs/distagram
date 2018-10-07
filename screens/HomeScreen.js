import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';

import Layout from '../constants/Layout';
import Content from '../constants/Content';
import Colors from '../constants/Colors';
import Post from '../components/Post';

import Actions from '../utilities/Actions';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Distragram',
  };

  constructor(props) {
    super(props);
    this.state = {
      initialPostLikes: null,
    }
  }

  componentDidMount(){
    Actions.getLikes().then((res) => {
      this.setState({initialPostLikes: res.likes})
    })
  }

  render() {
    let { initialPostLikes } = this.state
    return (
      <ScrollView style={styles.container}>
        <Post 
          color={Colors.brand}
          color2={Colors.brandDark}
          post={Content.initialPost}
          size={Layout.window.width}
          header
          footer
          user={Content.initialUser}
          likes={initialPostLikes}
          doubleTap
          initialPost
        />
        <FlatList
          data={Content.home}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => {
            return (
              <Post 
                key={index}
                index={index} 
                shadesOfGray={Content.home.length} 
                post={item} 
                size={Layout.window.width}
                view={'Home'}
                likes={item.likes}
                header
                footer
                doubleTap
              />
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
});
