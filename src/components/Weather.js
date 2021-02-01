import React from "react";
import apiKeys from "../api/apiKeys";
import loader from "../image/WeatherIcons.gif";
import ReactAnimatedWeather from "react-animated-weather";

class Weather extends React.Component {
  state = {
    lat: undefined,
    lon: undefined,
    errorMessage: undefined,
    temperatureC: undefined,
    temperatureF: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    icon: "CLEAR_DAY",
    sunrise: undefined,
    sunset: undefined,
    errorMsg: undefined,
  };

  getPosition = () => {
    return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  };
  getWeather = async (latitude, longitude) => {
    const api_call = await fetch(
      `${apiKeys.base}weather?lat=${latitude}&lon=${longitude}&units=metric&APPID=${apiKeys.key}`);
      const data = await api_call.json();
      this.setState({
        lat: latitude,
        lon: longitude,
        city: data.name,
        temperatureC: Math.round(data.main.temp),
        temperatureF: Math.round(data.main.temp * 1.8 + 32),
        description: data.weather[0].description,
        humidity: data.main.humidity,
        main: data.weather[0].main,
        country: data.sys.country,
      });

    switch (this.state.main) {
      case "Haze":
        this.setState({ icon: "CLEAR_DAY" });
        break;
      case "Clouds":
        this.setState({ icon: "CLOUDY" });
        break;
      case "Rain":
        this.setState({ icon: "RAIN" });
        break;
      case "Snow":
        this.setState({ icon: "SNOW" });
        break;
      case "Dust":
        this.setState({ icon: "WIND" });
        break;
      case "Drizzle":
        this.setState({ icon: "SLEET" });
        break;
      case "Fog":
        this.setState({ icon: "FOG" });
        break;
      case "Smoke":
        this.setState({ icon: "FOG" });
        break;
      case "Tornado":
        this.setState({ icon: "WIND" });
        break;
      default:
        this.setState({ icon: "CLEAR_DAY" });
    }
  };
  componentDidMount() {
    this.getPosition()
    .then((position) => {
       this.getWeather(position.coords.latitude,     
       position.coords.longitude)
     })
     .catch((err) => {
       this.setState({errorMessage: err.message});
     });

     this.timerID = setInterval(
      () => this.getWeather(this.state.lat, this.state.lon),
      600000
    );
 }

 componentWillUnmount(){
   clearInterval(this.timerID);
 }
  
  render() {
    const{ city, temperatureC, temperatureF,sunrise,sunset} = this.state;
    if (city) {
      return (
        <React.Fragment>
              <div className="main-container">
                <div className="city">
                    <h2 className="city-name">
                        <span>{this.state.city}</span>
                        <sup>{this.state.country}</sup>
                    </h2>
                    <div className="forecast-icon">
                      <ReactAnimatedWeather
                        icon={this.state.icon} 
                        weather={this.state.main}
                      />
                    </div>
                    <div className="city-description">
                        Description: {this.state.description}
                    </div>
                    <div className="city-temp">
                        Temperature: {this.state.temperatureC}
                        <sup>&deg;C</sup>
                    </div>
                    <div className="city-humidity">
                        Humidity: {this.state.humidity}%
                    </div>
                </div>
              </div>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <img src={loader} style={{ marginTop: "0px", width: "30%", WebkitUserDrag: "none" }} alt="" />
          <h3 style={{ color: "white", fontSize: "22px", fontWeight: "600" }}>
            Detecting your location
          </h3>
        </React.Fragment>
      );
    }
  }
}

export default Weather;
