import { FC } from 'react';
import WeatherIcon from '@/components/WeatherIcon';
import { transformTemperatureByUnit } from '@/utils/transformTemperatureByUnit';
import { observer } from 'mobx-react';
import { useStore } from '@/store';
import { TemperatureUnitEnum } from '@/enum/temperatureUnit.enum';
import styles from './WeatherTimeCard.module.scss'
import cx from 'classnames';

export interface WeatherTimeCardProps {
  temperature_2m: number;
  time: string;
  weathercode: number;
  isCurrent?: boolean;
}

const WeatherTimeCard: FC<WeatherTimeCardProps> = observer(
  ({ temperature_2m, time, weathercode, isCurrent }) => {
    const { settingsStore } = useStore();

    return (
      <div className={cx(styles.container, isCurrent && styles.activeContainer)}>
        <div>{isCurrent ? 'now' : time}</div>
        <div className={styles.icon}>
          <WeatherIcon weathercode={weathercode} />
        </div>
        <div className="bold">{`${transformTemperatureByUnit(temperature_2m, settingsStore.temperatureUnit, TemperatureUnitEnum.Celsius)}${settingsStore.temperatureUnit}`}</div>
      </div>
    );
  }
);

export default WeatherTimeCard;
