import { observer } from 'mobx-react';
import { useEffect, useState } from 'react';
import RightArrowIcon from '@/components/icons/RightArrowIcon';
import { getHourlyWeather } from '@/api/getHourlyWeather';
import { useStore } from '@/store';
import { HourlyWeatherModel } from '@/interfaces/hourlyWeatherModel';
import { format } from 'date-fns';
import styles from './BottomMenu.module.scss';
import cx from 'classnames';
import { Link } from 'react-router-dom';
import WeatherTimeCard, {
  WeatherTimeCardProps,
} from '@/components/WeatherTimeCard/WeatherTimeCard.tsx';

const BottomMenu = observer(() => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.tabs}>
          <div onClick={() => setActiveTabIndex(0)}>
            <div className={cx(styles.tab, activeTabIndex === 0 && styles.activeTab)}>Today</div>
          </div>
          <div onClick={() => setActiveTabIndex(1)}>
            <div className={cx(styles.tab, activeTabIndex === 1 && styles.activeTab)}>Tomorrow</div>
          </div>
        </div>
        <Link to="/nextSevenDays" className={styles.link}>
          <div className={styles.sevenDays}>
            <div>Next 7 Days</div>
            <RightArrowIcon />
          </div>
        </Link>
      </div>
      <Content activeTabIndex={activeTabIndex} />
    </div>
  );
});

const Content = observer(({ activeTabIndex }: { activeTabIndex: number }) => {
  const { activeCity } = useStore();

  const [hourlyWeather, setHourlyWeather] = useState<HourlyWeatherModel | null>(null);
  const [currentTabHourlyWeather, setCurrentTabHourlyWeather] = useState<
    WeatherTimeCardProps[] | null
  >(null);

  useEffect(() => {
    const coordinates = activeCity.getCityCoordinates;
    if (!coordinates) {
      return;
    }
    const [lat, lon] = coordinates;
    getHourlyWeather(lat, lon).then((data) => {
      setHourlyWeather(data);
    });
  }, [activeCity.getCityCoordinates]);

  useEffect(() => {
    if (!hourlyWeather) {
      return;
    }

    const weather: WeatherTimeCardProps[] = [];
    const startIndex = activeTabIndex * 24;
    const currentTime = format(new Date(), 'HH');
    for (let i = startIndex; i < startIndex + 24; i++) {
      const time = format(hourlyWeather?.hourly.time[i], 'HH:mm');

      weather.push({
        temperature_2m: hourlyWeather.hourly.temperature_2m[i],
        time,
        weathercode: hourlyWeather?.hourly.weathercode[i],
        isCurrent: time.split(':')[0] === currentTime,
      });
    }
    setCurrentTabHourlyWeather(weather);
  }, [activeTabIndex, hourlyWeather]);

  if (!currentTabHourlyWeather) {
    return;
  }

  return (
    <div className={styles.cardList}>
      {currentTabHourlyWeather.map((data) => (
        <WeatherTimeCard key={data.time} {...data} />
      ))}
    </div>
  );
});

export default BottomMenu;
