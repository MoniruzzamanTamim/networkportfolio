import React from 'react';
import Navbar from  '../Navbar/Navbar'   // আপনার Navbar কম্পোনেন্টের পাথ
import Footer from '../Footer/Footer' ; // আপনার Footer কম্পোনেন্টের পাথ

const Layout = ({ children }) => {
  return (
    <div className="app-layout" style={styles.layout}>
      {/* Header / Navbar */}
      <Navbar />

      {/* Main Dynamic Content */}
      <main className="main-content" style={styles.main}>
        {children}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

// inline style for layout structuring
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
