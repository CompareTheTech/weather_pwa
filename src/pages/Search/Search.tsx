import { FC, useEffect, useState } from 'react';
import SearchIcon from '@/components/icons/SearchIcon';
import CrossIcon from '@/components/icons/CrossIcon';
import { getGeoLocation } from '@/api/getGeoLocation';
import RightArrowIcon from '@/components/icons/RightArrowIcon';
import { countries } from 'country-data';
import { CityLocationData } from '@/interfaces/cityLocationData';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '@/store';
import styles from './Search.module.scss';
import { BackHeader } from '@/components/BackHeader/BackHeader.tsx';

export default function SearchPage() {
  const [search, setSearch] = useState('');
  const [cities, setCities] = useState<CityLocationData[] | null>(null);

  const clearSearch = () => {
    setSearch('');
  };

  useEffect(() => {
    if (!search.length) {
      return;
    }

    const timeOutId = setTimeout(
      () =>
        getGeoLocation(search).then((data) => {
          setCities(data);
        }),
      500
    );
    return () => clearTimeout(timeOutId);
  }, [search]);

  return (
    <>
      <BackHeader title="Search" />
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div className={styles.header}>
            <div className={styles.searchContainer}>
              <div className={styles.searchIcon}>
                <SearchIcon />
              </div>
              <input
                className={styles.search}
                placeholder="Search..."
                value={search}
                onChange={(data) => setSearch(data.target.value)}
                autoFocus={true}
              />
              <div className={styles.crossIcon} onClick={clearSearch}>
                <CrossIcon />
              </div>
            </div>
            <Link to="/" className={styles.cancelButton}>
              <div>Cancel</div>
            </Link>
          </div>
          <CitiesList cities={cities} />
        </div>
      </div>
    </>
  );
}

interface CitiesListProps {
  cities: CityLocationData[] | null;
}

const CitiesList: FC<CitiesListProps> = ({ cities }) => {
  const navigate = useNavigate();
  const { activeCity } = useStore();

  if (cities === null) {
    return;
  }

  if (!cities.length) {
    return (
      <div className={styles.noResult}>
        <div>No result</div>
      </div>
    );
  }

  const selectCity = (city: CityLocationData) => {
    activeCity.setCurrentLocation(city);
    navigate('/');
  };

  return (
    <div>
      {cities.map((city) => (
        <div
          key={`${city.lat}_${city.lon}`}
          className={styles.city}
          onClick={() => selectCity(city)}
        >
          <div>
            <div className={styles.cityName}>{city.name}</div>
            <div>
              {city.state && `${city.state}, `}
              {countries[city.country].name}
            </div>
          </div>
          <RightArrowIcon />
        </div>
      ))}
    </div>
  );
};
