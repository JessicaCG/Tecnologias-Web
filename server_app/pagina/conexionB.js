//empieza websockets 
// Create a client instance
client = new Paho.MQTT.Client("broker.emqx.io", 8084, "Prueba");
// set callback handlers
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;
// connect the client
client.connect({useSSL: true, onSuccess:onConnect});
// called when the client connects
function onConnect() {
    // Once a connection has been made, make a subscription and send a message.
    console.log("onConnect");
    client.subscribe("getTemperatura");
}
// called when the client loses its connection
function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
        console.log("onConnectionLost:"+responseObject.errorMessage);
        client.connect({useSSL: true, onSuccess:onConnect});
    }
}
// called when a message arrives
function onMessageArrived(message) {
    try {
        const json = JSON.parse(message.payloadString);
        const tem = json.temperatura + "°C";
        const estado = json.estatus;
        document.getElementById('mostrarT').innerHTML = tem;
        document.getElementById('mostrarL').innerHTML = estado;
    }catch(e) {
        console.log(e);
    }
}