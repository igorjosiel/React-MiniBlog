import { Outlet } from 'react-router-dom';
import styles from "./Layout.module.css";

// components
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = () => {
  return (
    <>
      <Navbar />

      <main className={styles.main}>
        <Outlet />
      </main>

      <Footer />
    </>
  );
};

export default Layout;
