// Remote Example1 - reciever
// for CHIRIMEN with:microbit

var microBitBle;
var channel;

async function connect() {
  // chirimen with micro:bitの初期化
  microBitBle = await microBitBleFactory.connect();
  msgDiv.innerHTML = "micro:bitとのBLE接続が完了しました";

  // webSocketリレーの初期化
  var relay = RelayServer("achex", "KandKSocket");
  channel = await relay.subscribe("KandKSensors");
  msgDiv.innerText = "achex web socketリレーサービスに接続しました";
  sendSensorData();
}

async function sendSensorData() {
  while (true) {
    var sensorData = await microBitBle.readSensor();
    sensorData.time = new Date().toString();
    channel.send(sensorData);
    channel.send({ stTemp: 0, stSitting: 0, stHumidity: 0 });
    console.log(sensorData);

    msgDiv.innerText =
      "センサデータを送信しました： " + JSON.stringify(sensorData);
    await sleep(1000);
  }
}
