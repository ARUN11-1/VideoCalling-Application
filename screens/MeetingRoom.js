import React, { useState, useEffect } from "react";
import { Modal, View, Text, StyleSheet, TextInput, Alert, SafeAreaView, TouchableOpacity} from "react-native";
import StartMeeting from "../components/StartMeeting";
import { io } from "socket.io-client";
import { Camera } from "expo-camera";
import Chat from "../components/Chat";

import FontAwesome from "react-native-vector-icons/FontAwesome";

const menuIcons =[
  { 
    id: 1,
    name: "microphone",
    title: "Mute",
    customColor: "#efefef",
  },
  { 
    id: 2,
    name: "video-camera",
    title: "Stop Video",
    customColor: "#efefef",
  },
  { 
    id: 3,
    name: "upload",
    title: "Share Content",
    customColor: "#efefef",
  },
  { 
    id: 4,
    name: "group",
    title: "Participants",
    customColor: "#efefef",
  },
]

let socket;
const MeetingRoom = () => {
  const [name, setName] = useState();
  const [roomId, setRoomId] = useState();
  const [activeUsers, setActiveUsers] = useState(["Arun", "Karan"]);
  const [startCamera, setStartCamera] = useState(false);
  const [modalVisible, setModalVisible] = useState(false)
  const __startCamera = async () => {
    const {status} = await Camera.requestCameraPermissionsAsync();
   if (status === "granted"){
     setStartCamera(true);
} else {
  Alert.alert("Access denied");
}
  
  }
  const joinRoom = () => {
    __startCamera();
    socket.emit("join-room", { roomId: roomId, userName: name });
  };

  useEffect(() => {
    const API_URL = "http://a139-2402-8100-2292-1a8-93c-c5b0-8c5d-3167.ngrok.io ";
    socket = io("http://a139-2402-8100-2292-1a8-93c-c5b0-8c5d-3167.ngrok.io ");
    console.log("Hello");
    socket.on("connection", () => console.log("connected"));
    socket.on("all-users", (users) => {
      
      console.log(users, "After clean up")
      setActiveUsers(users)
    });
  }, []);

  return (
    <View style={styles.container}>
      {startCamera ? (
<SafeAreaView style={{ flex: 1}}>


  <Modal
  animationType="slide"
  transparent={false}
  presentationStyle={"fullScreen"}
  visible={modalVisible}
  onRequestClose={() =>{
   
    setModalVisible(!modalVisible);
  }}
  >
   <Chat
   modalVisible={modalVisible}
   setModalVisible={setModalVisible}
   />
  </Modal>

<View style={styles.cameraContainer}>
<Camera
         type={"front"}
         style = {{width: activeUsers.length <= 1 ? "100%": 200,
         height: activeUsers.length <=1 ? 600 : 200 
        }}
         >

       </Camera>
       {activeUsers.filter(user => (user.userName != name)).map((user, index) =>
       <View key={index} style={styles.activeUserContainer}>
<Text style={{ color: "white"}}>
  {user.userName}
</Text>
       </View>
       )}
       
</View>
      
       <View style={styles.menu}>
         {
           menuIcons.map((icon, index) => 
           

          
           <TouchableOpacity
           key={index}
         style = {styles.tile}
         >
          <FontAwesome  name={icon.name} size={24} color={"#efefef"}/>
          <Text style ={styles.textTile}> {icon.title}</Text>        
          </TouchableOpacity>
           )
        }
           <TouchableOpacity
           onPress={() => setModalVisible(true)}
          
         style = {styles.tile}
         >
          <FontAwesome  name={"comment"} size={24} color={"#efefef"}/>
          <Text style ={styles.textTile}> Chat </Text>        
          </TouchableOpacity>

       </View>
       </SafeAreaView>
      ) : (
        <StartMeeting
        name={name}
        setName={setName}
        roomId={roomId}
        setRoomId={setRoomId}
        joinRoom={joinRoom}
      />

      )
    }

    </View>
  );
};

export default MeetingRoom;
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1c1c1c",
    flex: 1,
  },
  tile:{
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    marginTop: 15
  },
  textTile:{
    color: "white",
    marginTop: 10
  },
  menu: {
flexDirection: "row",
justifyContent: "space-around",
marginBottom: 5
  },
  cameraContainer: {
    flex: 1,
    
    backgroundColor: "black",
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center"
  },
  activeUserContainer: {

    borderColor: "gray",
    borderWidth: 1,
    width: 200,
    height: 200,
    justifyContent: "center",
    alignItems: "center"
  }
});
