import React, { Component } from "react";
import {
StyleSheet,
View,
TouchableOpacity,
Dimensions,
Image,
Text,
LayoutAnimation,
} from "react-native";

import Icon from 'react-native-vector-icons/Ionicons';
import ParsedText from 'react-native-parsed-text';

const TimerMixin = require('react-timer-mixin');

const mL = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const { width, height } = Dimensions.get('window');

class Row extends Component {

  constructor(props){
    super(props)
    this.doubleTap = this.doubleTap.bind(this);
  
    this.state={
      isLiked : false,
      lastPress: 0,
      animation:false,
    }
  }
  returnDate(timestamp){
    return new Date(timestamp*1000)
  }
  
  render() {
    return(
      <View style={styles.container}>
      <View style={styles.infoContainer}>
          <Image source={{uri : this.props.data.user.profile_picture}}
            style={styles.image}  
          />
          <View style={styles.usernameContainer}>
            <Text> { this.props.data.user.username } </Text>
            { (this.props.data.location) ? <Text style={styles.location}> {this.props.data.location.name} > </Text> : null }
          </View>
        </View>
        <TouchableOpacity onPress = { this.doubleTap } activeOpacity ={1}>
          <Image   
            style={{height:width}}
            resizeMode = 'contain'
            source={{uri: this.props.data.images.low_resolution.url}}
          >
            <View style={styles.likedContainer}>
              {(this.state.animation) ? <Icon name="md-heart" size={76} color="white" /> : null}  
            </View>
          </Image>
        </TouchableOpacity>
        <View style={styles.itemImageContainer}>
            <TouchableOpacity style={styles.like} onPress={() => this.setState({isLiked : !this.state.isLiked})}>
              {!this.state.isLiked ? <Icon name="ios-heart-outline" size={30} color="black" /> : <Icon name="ios-heart" size={30} color="red" />}
            </TouchableOpacity>
            <TouchableOpacity style={styles.comment} onPress={() => alert('go comment!')}>
              <Icon name="ios-chatbubbles-outline" size={30} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.share} onPress={() => alert('Share!!')}>
              <Icon name="ios-redo-outline" size={30} color="black" />
            </TouchableOpacity>
          </View>
          <View style={styles.seperator}/>
          <View style={styles.footer}>
            <View style={styles.likeCount}>
              <Icon name="ios-heart" size={12} color="black" />
              <Text style={styles.text}> {this.props.data.likes.count} liked </Text>
            </View>
            <TouchableOpacity style={{width:100}} onPress= { () => alert('go comment')}>
              { this.props.data.comments.count > 0 ? <Text style={styles.commentItem}> { this.props.data.comments.count } more comments </Text> : null}
            </TouchableOpacity>
            <View>
              { this.props.data.caption ? <View style={styles.captionContainer}>
              { <Text style={styles.captionText}> {this.props.data.user.username} </Text>  }
              { <ParsedText
                  style={styles.text}
                  numberOfLines={2}
                  parse={
                  [
                    {pattern: /@[a-zA-Z]+/, style: styles.username, onPress: this.handleNamePress},
                    {pattern: /#[a-zA-Zöüı]+/, style: styles.hashTag}
                  ]
                }
              >{this.props.data.caption.text}</ParsedText>
              }
              </View>  : null}
              <Text style={styles.dateText}> { this.returnDate(this.props.data.created_time).getDate() } { mL[this.returnDate(this.props.data.created_time).getMonth()] } </Text>
            </View>
          </View>
        </View>
    );
  }
  doubleTap(){
    let delta = new Date().getTime() - this.state.lastPress;
    if(delta < 500){
      //DoubleTap
      this.setState({
        lastPress: new Date().getTime(),
        isLiked:true,
        animation:true,
      });
      LayoutAnimation.easeInEaseOut();
      setTimeout(() => {
        this.setState({animation:false})
      }, 1500)
      return;
    }
    this.setState({
      lastPress: new Date().getTime()
    })
  }
  handleNamePress(){
    alert('its coming')
  }
}

const styles = StyleSheet.create({
  container: {backgroundColor:'white',paddingTop:5},
  infoContainer : {flexDirection:'row',height:45,alignSelf:'stretch', marginBottom: 5},
  image: {borderRadius : 20 , width:40 , height:40, marginHorizontal :3 , marginVertical : 3 },
  usernameContainer: {justifyContent:'center',flexDirection:'column'},
  location: {fontSize:10},
  itemImageContainer: {flexDirection:'row', height:40, alignSelf:'stretch'},
  like: {marginHorizontal:5,marginVertical:5,marginLeft:20},
  comment: {marginHorizontal:10,marginVertical:5},
  share: {marginHorizontal:10,marginVertical:5},
  likeCount: {flexDirection:'row',alignItems:'center',marginLeft:2},
  commentItem: {fontSize:10 , color:'rgba(0, 0, 0, 0.5)',marginTop:5},
  captionContainer: {marginTop:2 ,flexDirection:'row',alignItems:'center'},
  captionText: { fontSize:12,fontWeight:'bold' },
  dateText: {fontSize:8 , color:'rgba(0, 0, 0, 0.5)',marginTop:5},
  seperator: {height:1,alignSelf:'stretch',marginHorizontal:10,backgroundColor:'rgba(0, 0, 0, 0.2)'},
  hashTag: {fontStyle: 'italic',color:'blue'},
  footer: {marginVertical:5,alignSelf:'stretch',marginHorizontal:20,flexDirection:'column'},
  username: {color:'blue'},
  text: {fontSize:12,color:'black'},
  likedContainer:{backgroundColor:'transparent',flex:1,justifyContent:'center',alignItems:'center'}
})

export default Row;
