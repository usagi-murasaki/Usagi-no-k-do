const { MongoClient } = require('mongodb')
const mqtt = require('mqtt')
const uuid = require('uuid/v4')
const settings  = require('../settings')

let mongo_db
let mqtt_client

const mongoOptions = {
  server: {
    reconnectTries: 1440,
    reconnectInterval: 5000
  }
}

function getMQTT(){
  if (!mqtt_client) throw new Error('MQTT connection error')
  return mqtt_client
}

async function connectMQTT(){
  const broker = settings('BROKER_URI')

  console.log("try to connect on", broker)
  mqtt_client = mqtt.connect(broker, {
      clientId: 'mqtt_zoib_user_' + uuid().split('-')[0],
      clean: true,
  })

  mqtt_client.on('connect', function() {
      console.log(broker, ": connected");
  })

  mqtt_client.on('close', function() {
      console.log(broker, ": close");
  })

  mqtt_client.on('error', function(error) {
      console.log(broker, ": error");
      console.log(error);
  })

  return mqtt_client
}

async function closeMQTT(){
  if (!mqtt_client) return
  await mqtt_client.end()
}

function getMongoDB(){
  if (!mongo_db) throw new Error('Database connection error')
  return mongo_db
}

async function connectDB(){
  mongo_db = await MongoClient.connect(settings('MONGO_URI'), mongoOptions)
  if(mongo_db){
    console.log('connected to MongoDB :', settings('MONGO_URI'))
  }
}

async function manageDBIndexes(){
}

async function closeDBconnection(){
  if(mongo_db) {
    await mongo_db.close(true)
  }
}

module.exports = {
  getMQTT,
  connectMQTT,
  closeMQTT,
  getMongoDB,
  connectDB,
  manageDBIndexes
}