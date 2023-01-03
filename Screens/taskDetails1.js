import React , {useState} from 'react'
import { StyleSheet, Text, View,Image,TextInput , ImageBackground, ScrollView, SafeAreaView , TouchableOpacity,ImageBackgroundBase,Modal} from 'react-native';
import {BlurView} from 'expo-blur'



export default function TaskDetails1({ navigation }) {
    const [modalOpen, setModalOpen] = useState(false);
    const [modal2Open, setModal2Open] = useState(false);
  return (
    <ScrollView>
	<SafeAreaView style={styles.header}>
                    <View >
                        <View style= {{ flexDirection:"row", justifyContent:"flex-start", paddingLeft:80, paddingTop: 80}}>
                            <Text style={styles.txt2}>
                                Task 1
                            </Text>
                            <View style={{paddingLeft: 200 }}>
                            <Image 
                                style={{ height:27,
                                        width:27,                              
                                        }}
                            source={require("../assets/clock.png")} 
                            />
                            </View>
                        </View>
                        <View style={{paddingTop:80}}>
                            <View style={styles.line}>

                            </View> 
                        </View>
                        <View style={{flexDirection:"row"}}>                       
                            <View style={{paddingLeft: 40, paddingTop:30 }}>
                                <Image 
                                     style={{ height:11,
                                        width:11,                              
                                        }}
                                source={require("../assets/Oval.png")} 
                                />
                                <Text style={{paddingLeft: 60, fontWeight:"bold", fontSize:18,
                                                color:'white',marginTop:-10}}>Who May Use the Services?  </Text>
                            
                                <View style={{marginTop:-25, marginLeft:-6}}>
                                    <Image 
                                        style={{ height:27,
                                        width:27,                              
                                        }}
                                    source={require("../assets/person.png")} 
                                    />  
                                </View> 
                                <View style={{width:300}}>
                                    <Text style={styles.txt1}>
                                    When one door of happiness closes, another opens, but often we look so long at the closed door that we do not see the one that has been opened for us. 
                                    </Text>
                                </View>
                                <View style={{paddingLeft:50,width:320, paddingTop:50, flexDirection:'column'}}>
                                    <Text style={styles.txt3}>
                                    <Text style={{ color:"white", fontSize:16,fontWeight:"bold"}}>• Step 1:</Text> You may use the Services only if you agree to form a binding contract with us and are not a person barred from receiving services under the laws of the applicable jurisdiction. 
                                    </Text>
                                    <Text style={styles.txt4}>
                                    <Text style={{ color:"white", fontSize:16,fontWeight:"bold"}}>• Step 2:</Text>  Our Privacy Policy describes how we handle the information you provide to us when you use our Services. 
                                    </Text>
                                </View>
                                <View style={{flexDirection:"row" , paddingTop:40}}>
                                    <Image 
                                        style={{ height:32,
                                         width:25,                              
                                            }}
                                    source={require("../assets/shield.png")} 
                                    />
                                    <Text style={styles.txt5}>
                                        Privacy </Text> 
                                </View>
                                <View style={{width:300}}>
                                    <Text style={styles.txt7}>
                                    When one door of happiness closes, another opens, but often we look so long at the closed door that we do not see the one that has been opened for us. 
                                    </Text>
                                </View>
                                <View style={{paddingTop:20}}>
                                <TouchableOpacity style={styles.con}>
                                <View>
                                <View >
                    <Modal  transparent={true} visible={modalOpen} animationType="fade">
                    <BlurView
                        blurType='light'
                        style={styles.contentWrap}>
                      <View style={styles.modalView}>
                      <TouchableOpacity>
                      <Text style={styles.txt10} onPress={() => setModalOpen(false)} >x</Text>
                      </TouchableOpacity>
                      <Text style={styles.txt8} >Write Your Review  </Text>
                        <View style={{paddingLeft:20,paddingTop:10}}>
                        <TextInput style={{height:127, width:270,backgroundColor:"white",borderRadius:10}}/> 
                        </View>                                         
                      <View style={{flexDirection:"column", paddingLeft :35, paddingTop: 10 ,}}>                                           
                                            
                                <TouchableOpacity>
                                   <View style={styles.btn}>
                                      <Text style={styles.txt9}>
                                          SUBMIT
                                      </Text>
                                   </View>
                                 </TouchableOpacity>
                                 <View style={{paddingTop: 20}}>
                                 <TouchableOpacity onPress={() => setModalOpen(false)}>
                                   <View style={styles.btn1}>                                  
                                      <Text style={styles.txt9} >
                                          CANCLE
                                      </Text>
                                      </View>
                                 </TouchableOpacity> 
                                 </View>                              
                                </View>                     
                                            </View>
                                        </BlurView>
                                     </Modal>
                                    </View>         
                                    <Text style={styles.txt6} onPress={() => setModalOpen(true)}> R e v i e w </Text>
                                    </View>
                                </TouchableOpacity> 
                                </View>
                                <View style={{paddingTop:20,flexDirection:"row",justifyContent:"space-between"}}>
                                <TouchableOpacity style={styles.con2}>
                                <View>        
                                    <Text style={styles.txt11}> View Attached </Text>
                                </View>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.con2}>
                                <View>
                                <View >
                    <Modal  transparent={true} visible={modal2Open} animationType="fade">
                    <BlurView
                        blurType='light'
                        style={styles.contentWrap}>
                      <View style={styles.modalView}>
                      <TouchableOpacity>
                      <Text style={styles.txt10} onPress={() => setModal2Open(false)} >x</Text>
                      </TouchableOpacity>
                      <Text style={styles.txt8} >Appreciation </Text>
                        <View style={{paddingLeft:20,paddingTop:10}}>
                        <TextInput style={{height:127, width:270,backgroundColor:"white",borderRadius:10}}/> 
                        </View>                                         
                            <View style={{flexDirection:"column", paddingLeft :35, paddingTop: 10 ,}}>                                           
                                            
                                <TouchableOpacity onPress={() => navigation.navigate('Tasks')}>
                                   <View style={styles.btn}>
                                      <Text style={styles.txt9}>
                                          CONFIRM
                                      </Text>
                                   </View>
                                 </TouchableOpacity>
                                 <View style={{paddingTop: 20}}>
                                 <TouchableOpacity onPress={() => setModal2Open(false)}>
                                   <View style={styles.btn1}>                                  
                                      <Text style={styles.txt9} >
                                          CANCLE
                                      </Text>
                                      </View>
                                 </TouchableOpacity> 
                                 </View>                              
                                </View>                     
                                            </View>
                                        </BlurView>
                                     </Modal>
                                    </View> 
                                    <Text style={styles.txt11} onPress={() => setModal2Open(true)}> Close the Task </Text>
                                </View>
                                </TouchableOpacity>  
                                </View>                          
                            </View>
                                                         
                        </View>                    
                    </View>
                    
	</SafeAreaView>
    </ScrollView>
  );
}


const styles = StyleSheet.create({ 
    header:{
        height:900,
        backgroundColor:"#241332",      
    },
    txt2: {
        color: 'white',
        fontSize: 26,
        fontWeight:"bold",
    },
    line:{
        width:450,
        height:1,
        borderWidth:.3,
        borderColor:"#9599b3"    
    },
    txt1: {
        paddingTop:20,
        color: '#998FA2',
        fontSize: 14,
        fontWeight:"bold",
    },
    txt3: {
        color: '#998FA2',
        fontSize: 14,
        fontWeight:"bold",
    },
    txt4: {
        color: '#998FA2',
        fontSize: 14,
        fontWeight:"bold",
        paddingTop:20
    },
    txt5: {
        color: 'white',
        fontSize: 18,
        fontWeight:"bold",
        paddingLeft:30,

    },
    con:{
        width:327,
        height:50,
        paddingLeft:115,
        backgroundColor:"#8A56AC",       
        borderRadius: 30,
        elevation: 3
    },
    con2:{
        width:155,
        height:50,
        paddingLeft:35,
        backgroundColor:"#8A56AC",       
        borderRadius: 30,
        elevation: 3
    },
    txt6: {
        color: 'white',
        fontSize: 14,
        fontWeight:"bold",
        paddingTop:15,

    },
    txt11: {
        color: 'white',
        fontSize: 12,
        fontWeight:"bold",
        paddingTop:15,

    },
    txt7: {
        paddingTop:10,
        color: '#998FA2',
        fontSize: 14,
        fontWeight:"bold",
    },
    contentWrap: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        width: 327,
        height:370,
        borderWidth:1,
        borderRadius:10,
        backgroundColor:"#241332"
    },
    txt10: {
        color: 'white',
        fontSize: 24,
        paddingTop: 10,
        paddingLeft:20,
        fontWeight:"bold"
      },
      txt8: {
        color: 'white',
        fontSize: 24,
        paddingTop: 10,
        paddingLeft:44,
        fontWeight:"bold"
      },
      btn:{
        width:246,
        height:44,
        borderTopLeftRadius:30,
        borderTopRightRadius:30,
        borderBottomLeftRadius:30,
        borderBottomRightRadius:30,
        backgroundColor:"#8A56AC",
        elevation:5,
      },
      txt9: {
        color: 'white',
        fontSize: 14,
        paddingTop: 10,
        paddingLeft:100,
        fontWeight:"bold"
      },
      btn1:{
        width:246,
        height:44,
        borderTopLeftRadius:30,
        borderTopRightRadius:30,
        borderBottomLeftRadius:30,
        borderBottomRightRadius:30,
        backgroundColor:"#D47FA6",
        elevation:3,
      },
      btn2:{
        width:246,
        height:44,
        borderTopLeftRadius:30,
        borderTopRightRadius:30,
        borderBottomLeftRadius:30,
        borderBottomRightRadius:30,
        backgroundColor:"#998FA2",
        elevation:5,
      },

})