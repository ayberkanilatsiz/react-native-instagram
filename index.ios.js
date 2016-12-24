/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {AppRegistry,} from 'react-native';

import App from './helpers/app'

export default class instagramFeed extends Component {
  render() {
    return (
      <App/>
    );
  }
}

AppRegistry.registerComponent('instagramFeed', () => instagramFeed);
