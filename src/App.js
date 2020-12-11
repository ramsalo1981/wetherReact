import React, { Component } from "react";
import Weather from "./components/Weather";
import Form from "./components/Form";

const API_KEY = "e00717a593b734475e5ecf40b4b36308";
//http://api.openweathermap.org/data/2.5/weather?q=cairo%2Cegypt&appid=e36ed364400282e43250b6c4c0274d44
class App extends Component {
  state = {
    tempreture: "",
    city: "",
    country: "",
    humidity: "",
    description: "",
    error: "",
  };

  getWeather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    const api = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}%2C${country}&appid=${API_KEY}`
    );
    const data = await api.json();
    if (city && country) {
      this.setState({
        tempreture: data.main.temp,
        city: data.name,
        country: data.sys.country,
        humidity: data.main.humidity,
        description: data.weather[0].description,
        error: "",
      });
    } else {
      this.setState({
        tempreture: "",
        city: "",
        country: "",
        humidity: "",
        description: "",
        error: " please enter data",
      });
    }
  };
  render() {
    return (
      <div className="App">
        <Form getWeather={this.getWeather} />
        <Weather
          tempreture={this.state.tempreture}
          city={this.state.city}
          country={this.state.country}
          humidity={this.state.humidity}
          description={this.state.description}
          error={this.state.error}
        />
      </div>
    );
  }
}

export default App;
