const express=require("express")
const socket=require("socket.io")
const app=express()

const server=app.listen("4000",()=>{
    console.log("server is running on port on 4000")
})
const io=socket(server,{
    cors:{
        origin:"*"
    }
})

io.on("connection",(socketClient)=>{
    console.log(socketClient.id)

    
    socketClient.on("JoinRoom",(ClientRoom)=>{
        socketClient.join(ClientRoom.groupName)

     io.to(ClientRoom.groupName).emit("Joined",{message:`${ClientRoom.name} join ${ClientRoom.groupName}`,id:socketClient.id})   
      
     socketClient.on("SendMessage",(clientdata)=>{
        io.to(ClientRoom.groupName).emit("sendMessagetoRoom",{message:clientdata,sendBy:ClientRoom.name,id:socketClient.id})
     })
    })
})