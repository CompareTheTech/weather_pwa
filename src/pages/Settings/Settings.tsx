import { observer } from 'mobx-react';
import { Select } from 'antd';
import { useStore } from '@/store';
import styles from './Settings.module.scss';
import { TemperatureUnitEnum } from '@/enum/temperatureUnit.enum.ts';
import { WindSpeedUnitEnum } from '@/enum/windSpeedUnit.enum.ts';
import { AtmosphericPressureUnitEnum } from '@/enum/atmosphericPressureUnit.enum.ts';
import { BackHeader } from '@/components/BackHeader/BackHeader.tsx';

const SettingsPage = observer(() => {
  const { settingsStore } = useStore();

  return (
    <>
      <BackHeader title="Settings" />
      <div className={styles.container}>
        <div className={styles.block}>
          <div className={styles.blockHeader}>UNITS</div>
          <div className={styles.blockContent}>
            <div className={styles.blockItem}>
              <div>Temperature units</div>
              <Select
                defaultValue={settingsStore.temperatureUnit}
                onChange={(value) => settingsStore.setTemperatureUnit(value)}
                style={{ width: 120 }}
                options={[
                  { value: TemperatureUnitEnum.Celsius, label: TemperatureUnitEnum.Celsius },
                  { value: TemperatureUnitEnum.Fahrenheit, label: TemperatureUnitEnum.Fahrenheit },
                ]}
              />
            </div>
            <div className={styles.blockItem}>
              <div>Wind speed units</div>
              <Select
                defaultValue={settingsStore.windSpeedUnit}
                onChange={(value) => settingsStore.setWindSpeedUnit(value)}
                style={{ width: 120 }}
                options={[
                  {
                    value: WindSpeedUnitEnum.MetersPerSecond,
                    label: WindSpeedUnitEnum.MetersPerSecond,
                  },
                  {
                    value: WindSpeedUnitEnum.KilometersPerHour,
                    label: WindSpeedUnitEnum.KilometersPerHour,
                  },
                  { value: WindSpeedUnitEnum.MilesPerHour, label: WindSpeedUnitEnum.MilesPerHour },
                ]}
              />
            </div>
            <div className={styles.blockItem}>
              <div>Atmospheric pressure units</div>
              <Select
                defaultValue={settingsStore.atmosphericPressureUnit}
                onChange={(value) => settingsStore.setAtmosphericPressureUnit(value)}
                style={{ width: 120 }}
                options={[
                  {
                    value: AtmosphericPressureUnitEnum.MercuryMM,
                    label: AtmosphericPressureUnitEnum.MercuryMM,
                  },
                  {
                    value: AtmosphericPressureUnitEnum.hPa,
                    label: AtmosphericPressureUnitEnum.hPa,
                  },
                  {
                    value: AtmosphericPressureUnitEnum.atm,
                    label: AtmosphericPressureUnitEnum.atm,
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

export default SettingsPage;
