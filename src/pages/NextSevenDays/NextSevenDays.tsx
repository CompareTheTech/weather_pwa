import { FC, useEffect, useState } from 'react';
import { useStore } from '@/store';
import { observer } from 'mobx-react';
import { TemperatureUnitEnum } from '@/enum/temperatureUnit.enum';
import { getNextSevenDaysWeather } from '@/api/getNextSevenDaysWeather';
import Loader from '@/components/Loader/Loader';
import { transformTemperatureByUnit } from '@/utils/transformTemperatureByUnit';
import WeatherIcon from '@/components/WeatherIcon';
import { format } from 'date-fns';
import SunriseIcon from '@/components/icons/SunriseIcon';
import SunsetIcon from '@/components/icons/SunsetIcon';
import styles from './NextSevenDays.module.scss';
import { BackHeader } from '@/components/BackHeader/BackHeader.tsx';

interface DayWeather {
  sunrise: string;
  sunset: string;
  maxTemp: number;
  minTemp: number;
  weathercode: number;
  time: string;
  isTomorrow: boolean;
}

const NextSevenDaysPage = observer(() => {
  const { activeCity } = useStore();
  const [weather, setWeather] = useState<DayWeather[] | null>(null);

  useEffect(() => {
    if (!activeCity.currentLocation) {
      return;
    }

    const [lat, lon] = activeCity.getCityCoordinates as [string, string];
    getNextSevenDaysWeather(lat, lon).then((data) => {
      const weather = [];
      for (let i = 1; i <= 7; i++) {
        weather.push({
          sunrise: data.daily.sunrise[i],
          sunset: data.daily.sunset[i],
          maxTemp: data.daily.temperature_2m_max[i],
          minTemp: data.daily.temperature_2m_min[i],
          weathercode: data.daily.weathercode[i],
          time: data.daily.time[i],
          isTomorrow: i === 1,
        });
      }
      setWeather(weather);
    });
  }, [activeCity.currentLocation, activeCity.getCityCoordinates]);

  if (!weather) {
    return (
      <>
        <BackHeader title="Next 7 Days" />
        <Loader />
      </>
    );
  }

  return (
    <>
      <BackHeader title="Next 7 Days" />
      <div className={styles.container}>
        <div className={styles.listWrapper}>
          {weather.map((data) => (
            <DayCard key={data.time} {...data} />
          ))}
        </div>
      </div>
    </>
  );
});

const DayCard: FC<DayWeather> = ({
  time,
  maxTemp,
  minTemp,
  weathercode,
  sunrise,
  sunset,
  isTomorrow,
}) => {
  const [isOpenCart, setIsOpenCard] = useState(isTomorrow);

  return (
    <div className={styles.dayCard} onClick={() => setIsOpenCard(!isOpenCart)}>
      <div className={styles.dayData}>
        <div>{isTomorrow ? 'Tomorrow' : format(time, 'EEEE')}</div>
        <WeatherCard maxTemp={maxTemp} minTemp={minTemp} weathercode={weathercode} />
      </div>
      {isOpenCart && (
        <div className={styles.sunWrapper}>
          <div className={styles.sun}>
            <SunriseIcon></SunriseIcon>
            <div className={styles.sunTime}>{format(sunrise, 'HH:mm')}</div>
          </div>
          <div className={styles.sun}>
            <SunsetIcon></SunsetIcon>
            <div className={styles.sunTime}>{format(sunset, 'HH:mm')}</div>
          </div>
        </div>
      )}
    </div>
  );
};

interface WeatherCardProps {
  maxTemp: number;
  minTemp: number;
  weathercode: number;
}

const WeatherCard: FC<WeatherCardProps> = observer(({ maxTemp, minTemp, weathercode }) => {
  const { settingsStore } = useStore();

  return (
    <div className={styles.weatherCard}>
      <div>
        {`${transformTemperatureByUnit(minTemp, settingsStore.temperatureUnit, TemperatureUnitEnum.Celsius)}${settingsStore.temperatureUnit} / ${transformTemperatureByUnit(maxTemp, settingsStore.temperatureUnit, TemperatureUnitEnum.Celsius)}${settingsStore.temperatureUnit}`}
      </div>
      <div className={styles.weatherIcon}>
        <WeatherIcon weathercode={weathercode} />
      </div>
    </div>
  );
});

export default NextSevenDaysPage;
