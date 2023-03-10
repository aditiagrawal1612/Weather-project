const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname+"/index.html");

});

app.post("/", function(req,res){

    const query = req.body.cityName;
    const apiKey = "3eb52839cdd834768985f6a32d995e0f";
    const units = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&units="+units+"&appid="+apiKey;

  https.get(url,function(response){
    console.log(response.statusCode);

    response.on("data", function(data){
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const icon = weatherData.weather[0].icon;
      const imageURL = " http://openweathermap.org/img/wn/"+icon+"@2x.png";


      res.write("<h1>The Temperature in "+ query +" is " + temp + " degree Celcius.</h1>");
      res.write("<image src=" + imageURL +">");
      res.send();
  })


  })
})


app.listen(3000, function(){
  console.log("Server is running on port 3000.");
})
