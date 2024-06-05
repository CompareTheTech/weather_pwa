import { Outlet, useLocation } from 'react-router-dom';
import styles from './Layout.module.scss';
import { useEffect } from 'react';

const Layout = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className={styles.container}>
      <Outlet />
    </div>
  );
};

export default Layout;
