import React, { Component } from "react";
import {
StyleSheet,
View,
ListView,
ActivityIndicator,
Image,
Text
} from "react-native";

import instagram from './instagram'
import UserHeader from './userHeaderSegment'
import Row from './row' 

import Icon from 'react-native-vector-icons/Ionicons';
import RNInstagramOAuth  from 'react-native-instagram-oauth';

const INSTAGRAM_TOKEN = '*********** TOKEN **********';

class App extends Component {
  constructor(props){
  super(props)
  this.renderHeader = this.renderHeader.bind(this)
  this.changeSelectedTab = this.changeSelectedTab.bind(this)
   const dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });
    this.state = {
      dataSource: dataSource.cloneWithRows([]),
      isReady : false,
      userInfo:{data:null},
      selectedTab : 1

    };
  }
  getInstagramByMyself (access_token) {
    fetch('https://api.instagram.com/v1/users/self/?access_token='+access_token)
        .then((response) => response.json()).then((responseData) => {
            console.log(responseData);
        });
  }
  componentWillMount(){

    let self = this;
    instagram.getSelfInfo(INSTAGRAM_TOKEN,function(err,userData){
      if(err){
        alert('something went wrong!')
        return;
      }
        instagram.login(INSTAGRAM_TOKEN,function(err,data){
          if(err){
            alert(err);
            return;
          }
          console.log('data-> ',data)
          const dataSource = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2,
          });
          self.setState({dataSource: dataSource.cloneWithRows(data.data),isReady:true,userInfo:userData});
        });
    });
  }
  render() {
    if(this.state.isReady){
      return (
        <View style={styles.container}>
          { this.renderListView() }
        </View>
      );
    }else{
      return(
        <View style={styles.container}>
          { this.renderLoadingView() }
        </View>
      );
    }
  }
  renderLoadingView(){
    return(
      <View style={styles.loadingActivityContainer}>
        <ActivityIndicator
          animating={ !this.state.isReady }
          style={[styles.centering, {height: 80}]}
          size="large"
        />
      </View>
    )
  }
  renderListView(){
    return(
      <View style={styles.listViewContainer}>
        <View style={styles.navigation}>
          <Icon name="md-person-add" size={25} color="black" style={styles.iconImage} /> 
          <Text style= { styles.text }>
            {this.state.userInfo.data.username}
          </Text>
          <Icon name="ios-settings" size={25} color="black"  style={styles.iconImage} /> 
        </View>
        <ListView style={styles.container}
          dataSource={this.state.dataSource}
          renderRow={(rowData) => this.renderRow(rowData)} 
          renderHeader = { this.renderHeader }
        />      
      </View>
    )
  }
  renderRow(rowData){
    if(rowData.hasOwnProperty('images')){
      return(
        <Row data = { rowData }/>
      )
    }
    else{
      return(
        <View/>  
      )  
    }
  }
  renderSeparator (secId,rowId){
    return(
      <View key={rowId+'sep'} style={styles.separator}/>
    )
  }
  renderHeader(){
    return(
      <UserHeader data = { this.state.userInfo.data } changeSelectedTab = { this.changeSelectedTab } selectedTab = { this.state.selectedTab } />
    )
  }
  changeSelectedTab(tab){
    this.setState({selectedTab:tab})
  }


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  listViewContainer:{
    flex:1,
    alignSelf:'stretch'
  },
  navigation:{
    height:60,
    justifyContent:'space-between',
    alignItems:'center',
    flexDirection:'row',
    backgroundColor:'#e5e6e8',
    alignSelf:'stretch'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  text:{
    marginTop:10
  },
  iconImage:{
    marginHorizontal:15,
    marginTop:10
  },
  loadingActivityContainer:{
    alignSelf:'stretch',
    flex:1,
    justifyContent:'center'
  },
  separator:{
    height:1,
    alignSelf:'stretch',
    backgroundColor:'rgba(0, 0, 0, 0.2)'
  }
})

export default App;