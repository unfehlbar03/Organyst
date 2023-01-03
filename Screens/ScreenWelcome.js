import React from 'react'
import {StyleSheet, Text, View, Button,TouchableOpacity,SafeAreaView,ScrollView} from 'react-native'
 

export default function Header({ navigation }){ 
    return(
        <ScrollView>
        <SafeAreaView>
        <View style={styles.header}>
            <View style={styles.PurpleStyle}>
                <Text style={styles.text}>Welcome to D K</Text>
                <Text style={styles.text1}>Perfection </Text>
            </View>
        </View>
        <TouchableOpacity  style={styles.btn1}>           
        </TouchableOpacity>
        <TouchableOpacity   style={styles.btn} onPress={() => navigation.navigate('signup')} >
                <Text  style={styles.txt} >G E T    S T A R T E D </Text>
        </TouchableOpacity>
        </SafeAreaView>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    header:{
        height:"83%",
        paddingTop: 30,
        backgroundColor: 'black',
        

    },
    PurpleStyle:{
            width: "90%",
            height: 200,
            backgroundColor: "#352641",
            borderBottomLeftRadius: 100,
            borderTopLeftRadius: 5,
            marginLeft: 70,
            marginTop: 500,
            elevation: 5
    },
    text:{
        paddingLeft:50,
        paddingTop:40,
        justifyContent: "center",
        alignItems:"center",
        fontSize: 33,
        fontWeight:"bold",
        color:"white"
        
    },
    text1:{
        paddingLeft:50,
        paddingTop:0,
        justifyContent: "center",
        alignItems:"center",
        fontSize: 33,
        fontWeight:"bold",
        color:"white"
        
    },
    btn:{
        width:200,
        height:50,
        paddingVertical:14,
        paddingLeft:25,
        backgroundColor:"#D47FA6",       
        borderBottomLeftRadius: 30,
        borderTopLeftRadius: 30,
        elevation: 3,      
        alignItems:"flex-end",      
        alignSelf:"flex-end"
    },
    btn1:{
        height:50,
        paddingTop:50,
        paddingLeft:220,
        borderBottomLeftRadius: 20,
        borderTopLeftRadius: 20,
        elevation: 0,
    },
    txt:{
        fontWeight:"bold",
        color:"white",

    }

})