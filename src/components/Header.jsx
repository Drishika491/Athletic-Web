import React from 'react';
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';

function Header() {
  const location = useLocation();
  const title = getTitle(location.pathname);

  function getTitle(pathname) {
    switch (pathname) {
        case '/':
            return 'Home | Singapore Athletics';
        case '/about-us':
            return 'About Us | Singapore Athletics';
        case '/events-&-competitions':
            return 'Events & Competitions | Singapore Athletics';
        case '/high-performance':
            return 'High Performance | Singapore Athletics';
        case '/coaches':
            return 'Coaches | Singapore Athletics';
        case '/technical-officials':
            return 'Technical Officials | Singapore Athletics';
        case '/kids-athletics':
            return 'Kids Athletics | Singapore Athletics';
        case '/get-involved':
            return 'Get Involved | Singapore Athletics';
      default:
        return 'Singapore Athletics';
    }
  }

  return (
    <Helmet>
      <title>{title}</title>
    </Helmet>
  );
}

export default Header;
