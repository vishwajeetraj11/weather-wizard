import React from "react";
import { Alert } from "react-native";
import Loading from "./Loading";
import * as Location from "expo-location";
import axios from "axios";
import Weather from "./Weather";

const API_KEY = "0a74a6eb371b5421f2255eff131637a6";

export default class extends React.Component {
  state = {
    isLoading: true,
  };

  getWeather = async (latitude, longitude) => {
    try {
      const {
        data: {
          main: { temp },
          weather,
        },
      } = await axios.get(
        `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
      );
      this.setState({
        isLoading: false,
        condition: weather[0].main,
        temp,
      });
    } catch (e) {
      Alert.alert("Alert Promise error");
    }
  };

  getLocation = async () => {
    try {
      await Location.requestPermissionsAsync();
      let {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync();

      // SEND TO API AND GET WETHER
      this.getWeather(latitude, longitude);
    } catch (e) {
      Alert.alert("Can't find you.", "So sad");
    }
  };
  componentDidMount() {
    this.getLocation();
  }

  render() {
    const { isLoading, temp, condition } = this.state;
    return isLoading ? (
      <Loading />
    ) : (
      <Weather temp={Math.round(temp)} condition={"Thunderstorm"} />
    );
  }
}

// const styles = StyleSheet.create({

// });
