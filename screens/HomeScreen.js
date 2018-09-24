import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
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
        {Content.home.map((post, i) => {
          return (
            <Post 
              key={i}
              index={i} 
              shadesOfGray={Content.home.length*2} 
              post={post} 
              size={Layout.window.width}
              view={'Home'}
              likes={post.likes}
              header
              footer
              doubleTap
            />
          )
        })}
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
