const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");
const app=express();

app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){

res.sendFile(__dirname+"/index.html");
});
app.post("/",function(req,res){

  const query=req.body.cityName;
   const apikey="b247db12dddecfc3a0ce1eef7ad2d4f7";
  const unit="metric";
  const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apikey+"&units="+unit+"";
  https.get(url,function(response){
   console.log(response.statusCode);
   response.on("data" ,function(data){
   const weatherdata= JSON.parse(data)
   const temp= weatherdata.main.temp
   const weatherdescription = weatherdata.weather[0].description
   const icon=weatherdata.weather[0].icon
  const imageurl= "http://openweathermap.org/img/wn/"+icon+"@2x.png"
  res.write("<p>The weather is currently " +weatherdescription+"</p>");
   res.write("<h1>The temperature in "+query+" is " + temp +" degree celsius.</h1>");
   res.write("<img src="+imageurl+">");
  res.send()
 })
  })


})





app.listen(3000,function(){
  console.log("server is running on port 3000");
})
