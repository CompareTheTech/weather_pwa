import { Link } from 'react-router-dom';
import styles from './Home.module.scss';
import SearchIcon from "@/components/icons/SearchIcon.tsx";
import MenuIcon from "@/components/icons/MenuIcon.tsx";
import { getWeather } from "@/api/getWeather.ts";
import { getCurrentLocation } from "@/api/getCurrentLocation.ts";
import { useEffect } from "react";
import { useStore } from "@/store";
import Loader from "@/components/Loader/Loader.tsx";
import { format } from "date-fns";
import { countries } from 'country-data';
import { transformTemperatureByUnit } from "@/utils/transformTemperatureByUnit.ts";
import WeatherIcon from "@/components/WeatherIcon.tsx";
import WeatherIndicatorList from "@/components/WeatherIndicator/WeatherIndicatorList/WeatherIndicatorList.tsx";
import BottomMenu from "@/components/BottomMenu/BottomMenu.tsx";

export const HomePage = () => {
  const { activeCity, settingsStore } = useStore();

  useEffect(() => {
    let weatherPromise: Promise<any>
    if (!activeCity.currentLocation) {
      weatherPromise = getCurrentLocation().then((location) => {
        activeCity.setCurrentLocation(location);
        const [lat, lon] = location.loc.split(',');
        return getWeather(lat, lon);
      });
    } else {
      const [lat, lon] = activeCity.getCityCoordinates as [string, string];
      weatherPromise = getWeather(lat, lon);
    }

    weatherPromise.then((weather) => {
      activeCity.setWeather(weather);
    });
  }, [activeCity, activeCity.currentLocation]);

  if (!activeCity.currentLocation || !activeCity.weather) {
    return <Loader />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.searchIcon}>
          <Link to="/search">
            <SearchIcon />
          </Link>
        </div>
        <div className={styles.menuIcon}>
          <Link to="/settings">
            <MenuIcon />
          </Link>
        </div>
      </div>
      <div className={styles.location}>
        <div className={styles.city}>
          {'city' in activeCity.currentLocation
            ? activeCity.currentLocation?.city
            : activeCity.currentLocation.name}
        </div>
        <div className={styles.region}>{countries[activeCity.currentLocation.country].name}</div>
        <div className={styles.date}>{format(new Date(), 'EEE, MMM dd')}</div>
      </div>
      <div className={styles.weather}>
        <div className={styles.weatherIcon}>
          <WeatherIcon weatherId={activeCity.weather.weather[0].id} />
        </div>
        <div className={styles.temperatureWrapper}>
          <div className={styles.temperature}>
            <div className={styles.temperatureText}>
              {transformTemperatureByUnit(
                activeCity.weather?.main.temp,
                settingsStore.temperatureUnit
              )}
            </div>
            <div className={styles.temperatureUnit}>{settingsStore.temperatureUnit}</div>
          </div>
          <div className={styles.condition}>{activeCity.weather.weather[0].main}</div>
        </div>
      </div>
      <WeatherIndicatorList weather={activeCity.weather} />
      <BottomMenu />
    </div>
  );
};
