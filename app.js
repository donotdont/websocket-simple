// ทำการเชื่อม Websocket Server ตาม url ที่กำหนด
var connection = new WebSocket('ws://localhost:4000')
connection.onopen = function (e) {
  // จะทำงานเมื่อเชื่อมต่อสำเร็จ
  console.log("connect webSocket");
  //connection.send("Hello ABCDEF"); // ส่ง Data ไปที่ Server
  connection.send(JSON.stringify(e.data||{data:"Hello ABCDEF"}));
};

connection.onerror = function (error) {
  console.error('WebSocket Error ' + error);
};

connection.onmessage = function (e) {
  // log ค่าที่ถูกส่งมาจาก server
  console.log("message from server: ", e.data);
  createDivElement(e.data);
};

function createDivElement(data) {
  var obj = JSON.parse(data);
  console.log("obj", obj, obj.x, obj.y, obj["x"], obj["y"])
  var newDiv = document.createElement('div')
  newDiv.setAttribute("id", "myDiv");
  newDiv.innerHTML = "X: "+obj.x+", Y: "+obj.y;
  document.body.appendChild(newDiv);
}

function myFunction(e) {
  var x = e.clientX;
  var y = e.clientY;
  var coor = "Coordinates: (" + x + "," + y + ")";
  document.getElementById("demo").innerHTML = coor;
  connection.onopen({data:{x:x,y:y}});
}

function clearCoor() {
  document.getElementById("demo").innerHTML = "";
}