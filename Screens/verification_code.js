import React,{useState} from 'react';
import {StyleSheet,IconButton, Colors, Text, View, Image,TouchableOpacity, CustomTextInput, TextInput,SafeAreaView} from 'react-native'
import { Content, Item, Input, Form } from 'native-base';
import { Grid, Col } from 'react-native-easy-grid';
import verifyOtp from "../utils/verify_otp";

export default function Vcode({route, navigation }) {

    const { mobile } = route.params;
    const [char1, setChar1] = useState("");
    const [char2, setChar2] = useState("");
    const [char3, setChar3] = useState("");
    const [char4, setChar4] = useState("");

    const handleVerify = async ()=>{
        let otp = char1+char2+char3+char4;
        const verify_response = await verifyOtp(otp,mobile);
        console.log("verification response",verify_response)
        if(verify_response.status==="success"){
            navigation.navigate("signin")
        }


    }
    return(
        <SafeAreaView >
            <View style={styles.PurpleStyle}>
                <Text style={styles.txt}>Verification Code</Text>
            </View>
            <View style={{ flex: 1 , paddingTop: 100}}>
                <View style={{ flex:0.6, justifyContent:"space-evenly", flexDirection:"row"}}>
                    <TextInput
                        keyboardType={'default'}
                        maxLength={1}      
                        textAlign="center"
                        style={{backgroundColor: 'white',
                        fontWeight: "600",
                        alignSelf:'center',
                        fontSize: 20,
                        height: 55,
                        width: '10%',
                        borderRadius: 10,
                        borderWidth: 0.5,
                        borderColor:'grey',
                        elevation:3,
                        }}
                        onChangeText={(char1) => setChar1(char1)}
                        defaultValue={char1}
                    />
                    <TextInput
         
                        maxLength={1}
                        keyboardType={'default'}
                        textAlign="center"
                        style={{backgroundColor: 'white',
                        fontWeight: "600",
                        alignSelf:'center',
                        fontSize: 20,
                        height: 55,
                        width: '10%',
                        borderRadius: 10,
                        borderWidth: 0.5,
                        borderColor:'grey',
                        elevation:3
                        }}
                        onChangeText={(char2) => setChar2(char2)}
                        defaultValue={char2}
                    />
                    <TextInput
                        
                        maxLength={1}
                        keyboardType={'default'}
                        textAlign="center"
                        style={{backgroundColor: 'white',
                        fontWeight: "600",
                        alignSelf:'center',
                        fontSize: 20,
                        height: 55,
                        width: '10%',
                        borderRadius: 10,
                        borderWidth: 0.5,
                        borderColor:'grey',
                        elevation:3
                        }}
                        onChangeText={(char3) => setChar3(char3)}
                        defaultValue={char3}
                    />
                    <TextInput
                        
                        maxLength={1}
                        keyboardType={'default'}
                        textAlign="center"
                        style={{backgroundColor: 'white',
                        fontWeight: "600",
                        alignSelf:'center',
                        fontSize: 20,
                        height: 55,
                        width: '10%',
                        borderRadius: 10,
                        borderWidth: 0.5,
                        borderColor:'grey',
                        elevation:3
                        }}
                        onChangeText={(char4) => setChar4(char4)}
                        defaultValue={char4}
                    />
                </View>

            </View>
                <View style={{alignSelf:"center",paddingTop:100}}>         
                    <TouchableOpacity >
                        <Text style={styles.txt1}>Resend code </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.aline}>
                <TouchableOpacity style={styles.next} onPress={handleVerify}>
                    <Text style={styles.txt2} >N E X T</Text>
                </TouchableOpacity>
                </View>
            </SafeAreaView>
    )
}




const styles = StyleSheet.create({
    PurpleStyle:{
            width: "100%",
            height: "31%",
            backgroundColor: "white",
            borderBottomLeftRadius: 100,
            borderTopLeftRadius: 5,   
            elevation: 5
    },
    txt:{
        paddingLeft:65,
        paddingTop:110,
        justifyContent: "center",
        alignItems:"center",
        fontSize: 33,
        fontWeight:"bold"
    },
    txt1:{
        justifyContent: "center",
        alignItems:"center",
        fontSize: 15,
        fontWeight:"bold",
        color:"#8A56AC",
        
    },
    txt2:{
        fontSize: 20,
        fontWeight:"bold",
        color:"white",
        
    },
    next:{
        width:"100%",
        height:90,
        backgroundColor: "#8A56AC",
        paddingVertical:30,
        alignItems:"center"
    
    },
    aline:{   
        paddingVertical:65,
    
    },
    


})