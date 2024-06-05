import { FC, ReactNode } from 'react';
import styles from './WeatherIndicatorCard.module.scss';

interface WeatherIndicatorCardProps {
  icon: ReactNode;
  name: string;
  data: string;
}

const WeatherIndicatorCard: FC<WeatherIndicatorCardProps> = ({ icon, name, data }) => {
  return (
    <div className={styles.container}>
      <div className={styles.icon}>{icon}</div>
      <div className={styles.name}>
        <div>{name}</div>
      </div>
      <div className={styles.data}>{data}</div>
    </div>
  );
};

export default WeatherIndicatorCard;
