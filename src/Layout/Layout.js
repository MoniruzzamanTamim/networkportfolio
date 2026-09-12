import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';

const Layout = ({ children }) => {
  return (
    <div className="app-layout" style={styles.layout}>
      <Navbar />

      <main className="main-content" style={styles.main}>
        {children}
      </main>

      <Footer />
    </div>
  );
};

const styles = {
  layout: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor: '#0b1120',
    color: '#ffffff',
  },
  main: {
    flex: 1,
    width: '100%',
    paddingTop: '64px',
  },
};

export default Layout;
