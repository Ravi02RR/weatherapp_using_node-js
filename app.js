const express = require("express");

const https = require("https");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");



});

app.post("/", function (req, res) {
    console.log(req.body.cityName);
    const city = req.body.cityName;
    const url = "https://api.openweathermap.org/data/2.5/weather?appid=7ffaee9ee0b37145467200652fa3f5ce&q=" + city + "&units=metric";
    https.get(url, function (res1) {
        console.log(res1.statusCode);

        res1.on("data", function (data) {
            const wData = JSON.parse(data);
            const temp = wData.main.temp;
            const feel_like = wData.main.feels_like;
            const discription = wData.weather[0].description;
            const icon = wData.weather[0].icon;

            const iconurl = "https://openweathermap.org/img/wn/" + icon + "@2x.png";

            console.log(iconurl);

            res.write("<h1>The temperature in " + city + " is " + temp + " &#8451</h1>");
            res.write("<h3>It feels like : " + feel_like + " &#8451</h3>");
            res.write("<h3>The weather is currently: " + discription + "</h3>");
            res.write("<img src=" + iconurl + ">");

            res.send();


        });

    });
});













app.listen(3000, function () {
    console.log("server is running");
})