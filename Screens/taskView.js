import React from 'react';
import { StyleSheet, Text, View,Image, ImageBackground, ScrollView, SafeAreaView , TouchableOpacity,ImageBackgroundBase} from 'react-native';
import { Icon } from 'react-native-elements'

export default function TaskView({ navigation }) {
  return (
	<ScrollView>
		<SafeAreaView style={{paddingTop:50,elevation:5}}>
                    <View style={styles.header}>
                        <View style= {{ justifyContent:"flex-start", paddingLeft:80, paddingTop: 70}}>
                            <Text style={styles.txt2}>
                                Task 1
                            </Text>
                        </View>
                    </View> 
                    <View>
                        <Text style={{paddingLeft: 40, color: '#9599b3',fontSize: 14,paddingTop: 10, width:"90%"}}>
                            Task Description Task Description Task Description Task Description Task Description Task Description Task Description Task DescriptionTask Description 
                        </Text>
                    </View> 
                    <View style={{paddingTop:20, alignSelf:"flex-end", fontSize:15,paddingRight:12}}>
                        <TouchableOpacity onPress={() => navigation.navigate('taskDetails')}>
                            <Text style={{fontSize:15, color:"#5F4591", fontWeight:"700"}}>
                                View Task Details -> </Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Text style={{paddingLeft: 40, color: '#352641',fontSize: 16, fontWeight: "bold", paddingTop:20}}>
                            Task assigned to:
                        </Text>
                    </View>                   
                        <View style={{ flexDirection:"row", paddingTop:60,paddingLeft:20}}>
                            <View style={{paddingLeft: 20 , paddingTop:0}}>
                            <TouchableOpacity style={styles.circle3}>
                                <View style={{paddingLeft: 0 , paddingTop:0}}>
                                    <Image 
                                        style={{ height:40,
                                         width:40, 
                                         borderRadius:30                             
                                        }}
                                source={require("../assets/Ava.png")} 
                                    />
                                </View>
                            </TouchableOpacity>
                            </View>
                            <View style={{ flexDirection:"row"}}>
                            <View style={{ flexDirection:"column"}}>
                                <TouchableOpacity onPress={() => navigation.navigate('profileView1')}>
                                <Text  style={styles.txt1}>Officer's Name  </Text>
                                </TouchableOpacity>
                                <Text  style={styles.txt5}>Number of Tasks Assigned   </Text>
                            </View>
                            <TouchableOpacity>
                                <Text style={{ paddingLeft:80, fontSize:20}}>></Text>
                            </TouchableOpacity>
                                
                            </View>
                        </View>
                        <View style={{ flexDirection:"row", paddingTop:50,paddingLeft:20}}>
                            <View style={{paddingLeft: 20 , paddingTop:0}}>
                            <TouchableOpacity style={styles.circle3}>
                                <View style={{paddingLeft: 0 , paddingTop:0}}>
                                    <Image 
                                        style={{ height:40,
                                         width:40, 
                                         borderRadius:30                             
                                        }}
                                source={require("../assets/Ava.png")} 
                                    />
                                </View>
                            </TouchableOpacity>
                            </View>
                            <View style={{ flexDirection:"row"}}>
                            <View style={{ flexDirection:"column"}}>
                                <TouchableOpacity onPress={() => navigation.navigate('profileView1')}>
                                <Text  style={styles.txt1}>Officer's Name  </Text>
                                </TouchableOpacity>
                                <Text  style={styles.txt5}>Number of Tasks Assigned   </Text>
                            </View>
                            <TouchableOpacity>
                                <Text style={{ paddingLeft:80, fontSize:20}}>></Text>
                            </TouchableOpacity>
                                
                            </View>
                        </View>
                        <View style={{ flexDirection:"row", paddingTop:50,paddingLeft:20}}>
                            
                            <View style={{paddingLeft: 20 , paddingTop:0}}>
                            <TouchableOpacity style={styles.circle3}>
                                <View style={{paddingLeft: 0 , paddingTop:0}}>
                                    <Image 
                                        style={{ height:40,
                                         width:40, 
                                         borderRadius:30                             
                                        }}
                                source={require("../assets/Ava.png")} 
                                    />
                                </View>
                            </TouchableOpacity>
                            </View>
                            <View style={{ flexDirection:"row"}}>
                            <View style={{ flexDirection:"column"}}>
                                <TouchableOpacity onPress={() => navigation.navigate('profileView1')}>
                                <Text  style={styles.txt1}>Officer's Name  </Text>
                                </TouchableOpacity> 
                                <Text  style={styles.txt5}>Number of Tasks Assigned   </Text>
                            </View>
                            <TouchableOpacity>
                                <Text style={{ paddingLeft:80, fontSize:20}}>></Text>
                            </TouchableOpacity>
                                
                            </View> 
                        </View>
                        <View style={{ flexDirection:"row", paddingTop:50,paddingLeft:20}}>
                            
                            <View style={{paddingLeft: 20 , paddingTop:0}}>
                            <TouchableOpacity style={styles.circle3}>
                                <View style={{paddingLeft: 0 , paddingTop:0}}>
                                    <Image 
                                        style={{ height:40,
                                         width:40, 
                                         borderRadius:30                             
                                        }}
                                source={require("../assets/Ava.png")} 
                                    />
                                </View>
                            </TouchableOpacity>
                            </View>
                            <View style={{ flexDirection:"row"}}>
                            <View style={{ flexDirection:"column"}}>
                                <TouchableOpacity onPress={() => navigation.navigate('profileView1')}>
                                <Text  style={styles.txt1}>Officer's Name  </Text>
                                </TouchableOpacity>
                                <Text  style={styles.txt5}>Number of Tasks Assigned   </Text>
                            </View>
                            <TouchableOpacity>
                                <Text style={{ paddingLeft:80, fontSize:20}}>></Text>
                            </TouchableOpacity>
                                
                            </View>                         
                        </View>  
                                                                               			
		</SafeAreaView>
	</ScrollView>
  );
}


const styles = StyleSheet.create({ 


    header:{
        width:450,
        height:150,
        borderBottomWidth:.5,

    },

    line:{
        width:50,
        height:100,
        color:"black",
        paddingLeft:50
    },
  txt1: {
    color: 'black',
    fontSize: 18,
    fontWeight:"bold",
    paddingLeft:20,
  },
  txt2: {
    color: 'black',
    fontSize: 26,
    fontWeight:"bold",
  },
  txt3:{
    color:"black",
    fontSize: 16,
    fontWeight:"bold",
  },
  txtaline:{
      paddingTop:10
  },
  circle3: {
    backgroundColor: 'white',
    height:40,
    width:40,
    borderRadius:30,
    elevation:3,
    borderColor:'black',
  },
  txt5: {
    color: '#9599b3',
    fontSize: 13,
    paddingLeft:24,
    fontWeight:"bold"
  },
  


})