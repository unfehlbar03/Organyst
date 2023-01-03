import React from 'react';
import { StyleSheet, Text, View,Image, ImageBackground, ScrollView, SafeAreaView , TouchableOpacity,ImageBackgroundBase} from 'react-native';
import { Icon } from 'react-native-elements'

export default function Myleading({ navigation }) {
  return (
	<SafeAreaView>
		<ScrollView style={{paddingTop:50,elevation:5}}>
                    <View style={styles.header}>
                        <View style= {{ justifyContent:"flex-start", paddingLeft:100, paddingTop: 70}}>
                            <Text style={styles.txt2}>
                                My Tasks
                            </Text>
                        </View>
                    </View>
                    <View style={{flexDirection:"row", justifyContent:"space-evenly"}}>
                    <TouchableOpacity style={styles.txtaline}>
                    <Text style={styles.txt3}>
                        Leading Tasks </Text>
                    </TouchableOpacity>
                    <View
                            style={{
                                height:50,
                                width:1,
                                borderColor: '#9599b3',
                                borderWidth:1
                             }}
                            />
                        <TouchableOpacity style={styles.txtaline} onPress={() => navigation.navigate('myfollowingtask')}>
                        <Text style={styles.txt4}>
                        Following Tasks </Text>
                        </TouchableOpacity>

                    </View>                       
                      <View style={{ flexDirection:"row", paddingTop:60,paddingLeft:20}}>
                            <View style={styles.circle1}>

                            </View>
                            <Text  style={styles.txt1}>Task 1</Text> 
                            </View>
                            <View style={{ flexDirection:"row", paddingTop:50,paddingLeft:20}}>
                            <View style={styles.circle2}>

                            </View>
                            <Text  style={styles.txt1}>Task 2</Text>
                        </View>
                        <View style={{ flexDirection:"row", paddingTop:50,paddingLeft:20}}>
                            <View style={styles.circle1}>

                            </View>
                            <Text  style={styles.txt1}>Task 3</Text> 
                        </View>
                        <View style={{ flexDirection:"row", paddingTop:50,paddingLeft:20}}>
                            <View style={styles.circle1}>

                            </View>
                            <Text  style={styles.txt1}>Task 4</Text> 
                        </View>                                                         
			
		</ScrollView>
	</SafeAreaView>
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
    color: '#5F4591',
    fontSize: 18,
    fontWeight:"bold",
    paddingLeft:30,
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
    color:"#5F4591",
    fontSize: 16,
    fontWeight:"bold",
  },
  txt4:{
    color:"black",
    fontSize: 16,
    fontWeight:"bold",
  },
  txtaline:{
      paddingTop:10
  }

})