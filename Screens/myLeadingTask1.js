import React from 'react';
import { StyleSheet, Text, View,Image, ImageBackground, ScrollView, SafeAreaView , TouchableOpacity,ImageBackgroundBase} from 'react-native';
import { Icon } from 'react-native-elements'

export default function MyLeadingTask1({ navigation }) {
  return (
	<ScrollView>
		<SafeAreaView style={{paddingTop:50,elevation:5}}>
                    <View style={styles.header}>
                        <View style= {{ justifyContent:"flex-start", paddingLeft:80, paddingTop: 70}}>
                            <Text style={styles.txt2}>
                                All Tasks
                            </Text>
                        </View>
                    </View>                      
                        <View style={{ flexDirection:"row", paddingTop:60,paddingLeft:20}}>
                            <View style={styles.circle1}>
                            </View>
                            <View style={{paddingLeft: 20 , paddingTop:0}}>
                            
                            </View>
                            <View style={{ flexDirection:"column"}}>
                            <Text  style={styles.txt1}>Task 1 </Text>
                            <Text  style={styles.txt5}>Time to Complete  </Text>
                            </View>
                        </View>
                        <View style={{ flexDirection:"row", paddingTop:50,paddingLeft:20}}>
                            <View style={styles.circle2}>

                            </View>
                            <View style={{paddingLeft: 20 , paddingTop:0}}>
                            
                            </View>
                            <View style={{ flexDirection:"column"}}>
                            <Text  style={styles.txt1}>Task 2  </Text>
                            <Text  style={styles.txt5}>Time to Complete  </Text>
                            </View>
                        </View>
                        <View style={{ flexDirection:"row", paddingTop:50,paddingLeft:20}}>
                            <View style={styles.circle1}>

                            </View>
                            <View style={{paddingLeft: 20 , paddingTop:0}}>
                            
                            </View>
                            <View style={{ flexDirection:"column"}}>
                            <Text  style={styles.txt1}>Task 3  </Text>
                            <Text  style={styles.txt5}>Time to Complete  </Text>
                            </View> 
                        </View>
                        <View style={{ flexDirection:"row", paddingTop:50,paddingLeft:20}}>
                            <View style={styles.circle1}>

                            </View>
                            <View style={{paddingLeft: 20 , paddingTop:0}}>
                            
                            </View>
                            <View style={{ flexDirection:"column"}}>
                            <Text  style={styles.txt1}>Task 4  </Text>
                            <Text  style={styles.txt5}>Time to Complete  </Text>
                            </View>                          
                        </View>  
                        <TouchableOpacity style={{ alignSelf:"center",paddingTop:50}}>
                            <View style={styles.button}>
                                        <Text style={styles.txt6}>
                                            MODIFY </Text>
                            </View>
                        </TouchableOpacity>                                                       
			
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
 
  circle1: {
    backgroundColor: 'white',
    height:25,
    width:25,
    borderRadius:30,
    elevation:3,
    borderWidth: .2,
    borderColor:'black'
  },
  txt1: {
    color: 'black',
    fontSize: 18,
    fontWeight:"bold",
    paddingLeft:20,
  },
  circle2: {
    backgroundColor: 'white',
    height:25,
    width:25,
    borderRadius:30,
    elevation:3,
    borderWidth: .2,
    borderColor:'black',
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
  txt4:{
    color:"#D47FA6",
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
  button:{
    width:320,
    height:50,
    borderRadius:30,
    justifyContent: "center",
    alignItems:"center",
    backgroundColor:"#D47FA6",
},
txt6: {
    color: 'white',
    fontSize: 14,
    fontWeight:"bold"
  },

})