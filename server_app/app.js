//modulos para el servidor
var mqtt = require('mqtt');
var express = require('express'); //framework para servidores con nodejs
var MongoClient = require('mongodb').MongoClient; //la base de datos
var assert = require('assert'); //para hacer consultas con bodyparser
var bodyParser = require('body-parser');

(async function(){ 
  var puerto = process.env.PORT || 3000; //asignar puerto
  var app = express(); //crear app
  app.use(bodyParser.json()); //retornar json en las rutas
  app.use(express.static("pagina")); //localizar donde esta la pagina web
  app.use(bodyParser.urlencoded({extended: true})); //recibir query mediante url

  //conexion a mongo
  var uri = "mongodb+srv://Jessica:Jessicacortes28@MyCluster.1lsq5.mongodb.net/InHuevo?retryWrites=true&w=majority";
  var client = MongoClient(uri,{useNewUrlParser: true, useUnifiedTopology: true}); //configuracion bd
  await client.connect(); //conectas
  var collection = client.db('InHuevo').collection('Incubadora'); 

  app.get('/',function(request,response){ //ruteo para el servidor
    response.sendFile('index.html');
  });

  app.get('/datos',(request,response)=>{ //obtener datos de la bd
    collection.find({}).toArray((error, registros)=>{ //va buscar y lo que encuentre lo pasa a un array 
      assert.equal(null,error); //manda error si existe uno 
      response.status(200).json(registros); //si encuentra registros se ejecuta esto manda los registros en un json
    });
  });

  //conexion mqtt
  var client  = mqtt.connect('mqtt://broker.emqx.io');
  //conexion que se suscribe a un topico
  client.on('connect', function () {
    client.subscribe('getTemperatura', function (err) {
    })
  })

  var estado = '';
   
  client.on('message', function (topic, message) {
    // message is Buffer
    const json = JSON.parse(message);
    if(estado!==json.estatus){ //si el estado del foco es diferente de lo que recibe se registra sino no 
      estado = json.estatus; //cambio el valor del estado del foco en el server para agregarlo a la bd
      collection.insertOne(json,(error,er)=>{ //si ocurre un error
        assert.equal(null,error);
      });
    }
  })

  app.listen(puerto,function(){
    console.log(`servidor escuchando en el puerto: ${puerto}!`);
  })


})();
