import { WeatherData } from '@/interfaces/weatherData';
import { transformWindByUnit } from '@/utils/transformWindByUnit';
import AtmosphericPressureIcon from '@/components/icons/indicators/AtmosphericPressureIcon';
import { transformPressureByUnit } from '@/utils/transformPressureByUnit';
import WindIcon from '@/components/icons/indicators/WindIcon.xml';
import HumidityIcon from '@/components/icons/indicators/HumidityIcon';
import { observer } from 'mobx-react';
import WeatherIndicatorCard from '@/components/WeatherIndicator/WeatherIndicatorCard/WeatherIndicatorCard.tsx';
import styles from './WeatherIndicatorList.module.scss';
import { FC } from 'react';
import { useStore } from '@/store';

interface WeatherListProps {
  weather: WeatherData;
}

const WeatherIndicatorList: FC<WeatherListProps> = observer(({ weather }) => {
  const { settingsStore } = useStore();

  return (
    <div className={styles.container}>
      <WeatherIndicatorCard
        icon={<AtmosphericPressureIcon />}
        name="Atmospheric pressure"
        data={`${transformPressureByUnit(weather.main.pressure, settingsStore.atmosphericPressureUnit)} ${settingsStore.atmosphericPressureUnit}`}
      />
      <WeatherIndicatorCard
        icon={<WindIcon />}
        name="Wind"
        data={`${transformWindByUnit(weather.wind.speed, settingsStore.windSpeedUnit)} ${settingsStore.windSpeedUnit}`}
      />
      <WeatherIndicatorCard
        icon={<HumidityIcon />}
        name="Humidity"
        data={`${weather.main.humidity} %`}
      />
    </div>
  );
});

export default WeatherIndicatorList;
