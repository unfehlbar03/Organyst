import React , {useState} from 'react'
import { StyleSheet, Text, View,Image,TextInput , ImageBackground, ScrollView, SafeAreaView , TouchableOpacity,ImageBackgroundBase,Modal} from 'react-native';
import {BlurView} from 'expo-blur'
import { Input } from 'react-native-elements/dist/input/Input';
import { color } from 'react-native-elements/dist/helpers'
export default function ModifyTask({ navigation }) {
    
  return (
    <ScrollView>
	<SafeAreaView style={{flex:1}}>
        <View style={styles.header}>
            <View style={{flex:1,justifyContent:"center" , paddingLeft:40}}>
            <View style={{flexDirection:"row"}}>
                <Image 
                    style={{ height:60,
                             width:60,
                            borderRadius:30,
                            borderWidth:2,
                            borderColor:"#8a56ac"
                             }}
                    source={require("../assets/Ava.png")} 
                />
                <View style={{paddingLeft:20,flexDirection:"column"}}>
                    <Text style={{fontSize:26,fontWeight:"bold"}}>Modify Task </Text>
                    <View style={{width:180}}>
                    <Text style={{fontSize:12,color:"#9599b3"}}>Find your people and do your thing - together </Text>
                    </View>
                </View>                         
                </View>
            </View>         
        </View>
        <View style={{flex:1}}>
                <View style={styles.bottom}>
                        <View>
                            <View style={{flexDirection:"column"}}>
                            <View style={styles.inp1}>
                                <TextInput   style={styles.txt} placeholder="Task Name" textAlignVertical= 'top'  placeholderTextColor = "#9599b3" underlineColorAndroid={"#8a56ac"}/>
                            </View>
                            <View style={styles.inp1}>                           
                                <TextInput style={styles.txt} placeholder="Subject" textAlignVertical= 'top'  placeholderTextColor = "#9599b3" underlineColorAndroid={"#8a56ac"}/> 
                            </View>
                            <View style={styles.inp1}>
                                <TextInput style={styles.txt} placeholder="Description"  textAlignVertical= 'top' placeholderTextColor = "#9599b3" underlineColorAndroid={"#8a56ac"}/> 
                            </View>
                            </View>
                        </View>
                        <View style={{flexDirection:"row",paddingTop:40}}>
                             <View style={{paddingLeft:20, marginTop:4}}>
                                <Image 
                                    style={{ height:17,
                                            width:17,                              
                                            }}
                                    source={require("../assets/clock.png")} 
                                />                               
                            </View>
                            <Text style={styles.txt2}>Task Date </Text>
                            <Text style={styles.txt3}> > </Text>
                        </View>
                        <View style={{flexDirection:"row", paddingTop:10}}>
                            <View style={{paddingLeft:20}}>
                                <TouchableOpacity style={styles.btn1}>

                                </TouchableOpacity>
                            </View>
                            <View style={{paddingLeft:5}}>
                                <TouchableOpacity style={styles.btn2}>

                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{flexDirection:"row",paddingTop:40}}>
                             <View style={{paddingLeft:20, marginTop:4}}>
                                <Image 
                                    style={{ height:17,
                                            width:17,                              
                                            }}
                                    source={require("../assets/SelectPeople.png")} 
                                />                               
                            </View>
                            <TouchableOpacity>
                                <Text style={styles.txt2}>Selecl People </Text>
                                <Text style={styles.txt4}>Select specific person for the task </Text>
                            </TouchableOpacity>
                            <Text style={styles.txt5}> > </Text>
                        </View>




                        <View style={{alignItems:"center"}}>
                            <View style={{flexDirection:"row", paddingTop:140}} >
                             <TouchableOpacity style={styles.btn}>
                                    <Text style={styles.txt1}>M O D I F Y  </Text>
                             </TouchableOpacity>
                             </View>
                        </View>
                    
                                            
                </View>              
        </View>
    </SafeAreaView>
    </ScrollView>
    )}

    const styles = StyleSheet.create({ 
        header:{
            height:180,
            backgroundColor:"white",
            borderBottomWidth:.5,      
        },
        bottom:{
            height:700,
            backgroundColor:"#241332",      
        },
        inp1:{
            paddingTop:40,
            paddingLeft:20,     
        },
        txt:{
            color:"white",
            fontSize:16,
            fontWeight:"bold",
            height: 40  
        },
        btn:{
            width:327,
            height:50,
            backgroundColor:"#8A56AC",
            borderRadius:30,
            elevation:5,        
            alignItems:"center",
            paddingTop:12      
        },
        txt1:{
            color:"white",
            fontSize:14,
            fontWeight:"bold",
            height: 40,           
        },
        txt2:{
            color:"white",
            fontSize:14,
            fontWeight:"bold",
            paddingLeft:20         
        },
        txt3:{
            color:"white",
            fontSize:14,
            fontWeight:"bold", 
            paddingLeft:250
        },
        txt4:{
            color:"#998FA2",
            fontSize:12,
            fontWeight:"600",
            paddingLeft:20 
        },
        txt5:{
            color:"white",
            fontSize:14,
            fontWeight:"bold", 
            paddingLeft:125
        },
        btn1:{
            width:180,
            height:50,
            backgroundColor:"#707070",
            borderTopLeftRadius:30,
            borderBottomLeftRadius:30,
        
        },
        btn2:{
            width:180,
            height:50,
            backgroundColor:"#707070",
            borderTopRightRadius:30,
            borderBottomRightRadius:30,
        
        }
    })