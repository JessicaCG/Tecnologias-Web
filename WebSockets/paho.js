//Create a client instance
client = new Paho.MQTT.Client("192.168.100.11", 9001, "ClienteWeb-1234567890");
// set callback handlers
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;
// connect the client
client.connect({onSuccess:onConnect});
// called when the client connects
function onConnect() {
  // Once a connection has been made, make a subscription and send a message.
  console.log("onConnect");
  client.subscribe("outTopic");
  message = new Paho.MQTT.Message("1");
  message.destinationName = "inTopic";
  client.send(message);
}
// called when the client loses its connection
function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0) {
    console.log("onConnectionLost:"+responseObject.errorMessage);
  }
}
// called when a message arrives
function onMessageArrived(message) {
  console.log("onMessageArrived:"+message.payloadString);
  var js = JSON.parse(message.payloadString);
  console.log(js);
  //var marketOptions ={
  //  title : js.idx,
  //  alt : "xxx"
 // }
  var marker = L.marker([js.lat, js.lon]).addTo(mymap);
  marker.bindPopup("Temperatura: "+js.tem).openPopup();
}