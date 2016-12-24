import React, { Component } from "react";
import {
StyleSheet,
View,
Image,
TouchableOpacity,
Text
} from "react-native";

import Icon from 'react-native-vector-icons/Ionicons';

class HeaderSegment extends Component {
  renderToolbar(){
    const tabs = ["md-grid","ios-list-outline","ios-albums-outline","ios-bookmark-outline"]
    return(
      <View style={styles.toolbarContainer}>
        {
          tabs.map((item,i)=>{
            const backgroundColor = (this.props.selectedTab === i) ? "blue": "black"
            return(
              <TouchableOpacity onPress = { ()=> this.pressTabbarButton(i) }>
                <Icon name={item} size={34} color={backgroundColor} />
              </TouchableOpacity>
            )
          })
        }
      </View>
    )
  }
  pressTabbarButton(selectedTab){
    this.props.changeSelectedTab(selectedTab)
  }
  render() {
    if(this.props.data){
      return(
        <View> 
         <View style={styles.containerTop}>
          <View style={styles.profileImageContainer}>
            <Image style={styles.profilIcon} source={{uri: this.props.data.profile_picture }} /> 
            <Text style={styles.textUsername}> { this.props.data.full_name } </Text>
          </View>
           <View style={styles.infoContainer}>
             <View style={styles.followersContainer}>
              <View style={styles.followerColumn}>
                <Text style={styles.countText}>
                  {this.props.data.counts.media}
                </Text>    
                <Text style={styles.text}>
                  media
                </Text>  
              </View>
              <View style={styles.followerColumn}>
                <Text style={styles.countText}>
                  {this.props.data.counts.follows}
                </Text>    
                <Text style={styles.text}>
                  followers
                </Text>  
              </View>
              <View style={styles.followerColumn}>
                <Text style={styles.countText}>
                  {this.props.data.counts.followed_by}
                </Text>    
                <Text style={styles.text}>
                  follows by
                </Text>  
              </View>
             </View>
             <TouchableOpacity style={styles.button} onPress={() => alert('edit')}>
               <Text>
                 Edit Profile
               </Text>
             </TouchableOpacity>
           </View>
         </View>
         <View style={{alignSelf:'stretch',height:50,backgroundColor:'white'}}>
           {this.renderToolbar()}
         </View>
       </View>
      );
    }
    return(<View/>)
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  containerTop:{
    height:100,
    flexDirection:'row',
    backgroundColor:'white'
  },
  profilIcon:{
    height:70,
    width:70,
    borderRadius:35
  },
  profileImageContainer:{
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'flex-start',
    marginLeft:20
  },
  button:{
    alignSelf:'stretch',
    height:20,
    marginHorizontal:20,
    borderWidth:1,
    borderColor:'rgba(0,0,0,0.1)',
    backgroundColor:'transparent',
    alignItems:'center',
    justifyContent:'center',
    borderRadius:2,
    marginTop:10,
  },
  textUsername:{
    marginTop:5,
    fontSize:12
  },
  followersContainer:{
    flexDirection:'row',
    alignSelf:'stretch',
    justifyContent: 'space-around'
  },
  followerColumn:{
    alignItems:'center',
    marginTop:10
  },
  countText:{
    fontSize:14
  },
  text:{
    fontSize:10,
    color:'rgba(0, 0, 0, 0.4)'
  },
  infoContainer:{
    flex:1,
    alignSelf:'stretch',
  },
  toolbarContainer:{
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems:'center',
    flex:1,
    borderBottomWidth:1,
    borderTopWidth:1,
    borderColor:'rgb(219,219,219)'
  }
})

export default HeaderSegment;