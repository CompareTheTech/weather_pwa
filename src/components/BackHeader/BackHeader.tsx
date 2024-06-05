import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import backIcon from '@/assets/icons/back-icon.png';
import styles from './BackHeader.module.scss';

interface BackHeaderProps {
  title: string;
}

export const BackHeader: FC<BackHeaderProps> = ({ title }) => {
  const navigate = useNavigate();

  const back = () => {
    navigate(-1);
  };

  return (
    <div className={styles.container}>
      <img
        onClick={back}
        className={styles.icon}
        draggable="false"
        src={backIcon}
        alt="back-icon"
      />
      <span className={styles.title}>{title}</span>
    </div>
  );
};
