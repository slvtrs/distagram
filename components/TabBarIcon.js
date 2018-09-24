import React from 'react';
import { Icon } from 'expo';
import { MaterialCommunityIcons, MaterialIcons, Feather, FontAwesome, Ionicons } from '@expo/vector-icons';

import Colors from '../constants/Colors';

export default class TabBarIcon extends React.Component {  
  static defaultProps = {
    iconSet: 'MaterialCommunityIcons',
  }

  iconSets = {
    MaterialCommunityIcons: MaterialCommunityIcons,
    MaterialIcons: MaterialIcons,
    Feather: Feather,
    FontAwesome: FontAwesome,
    Ionicons: Ionicons,
  }

  render() {
    const Icon = this.iconSets[this.props.iconSet]
    return (
      <Icon
        name={this.props.name}
        size={26}
        style={{ marginBottom: -3 }}
        color={this.props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
      />
    );
  }
}