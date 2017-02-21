var RedisSMQ = require("rsmq");
var rsmq = new RedisSMQ( {host: "127.0.0.1", port: 6379, ns: "rsmq"} );


rsmq.createQueue({qname:"myqueue"}, function (err, resp) {
        console.log("Creating Queue");
        if (resp===1) {
            console.log("queue created");
        }
});


// send a message

rsmq.sendMessage({qname:"myqueue",message:"Hello World"},function(err,resp){
    console.log("Sending message");
    if(resp){
        console.log("Message sent. ID:",resp);
    }
});


// Receive a message

rsmq.receiveMessage({qname:'myqueue'},function(err,resp){
    console.log("Receiving message");
    if(resp.id){
        console.log("Message received.",resp);
    }else{
        console.log('No messages for me');
    }
});

// Delete Message

rsmq.deleteMessage({qname:"myqueue", id:"dhoiwpiirm15ce77305a5c3a3b0f230c6e20f09b55"}, function (err, resp) {
    console.log("Deleting Message");
    if (resp===1) {
        console.log("Message deleted.") 
    }
    else {
        console.log("Message not found.")
    }
});

// List Queues

rsmq.listQueues( function (err, queues) {
    if( err ){
        console.error( err )
        return
    }
    console.log("Active queues: " + queues.join( "," ) )
});