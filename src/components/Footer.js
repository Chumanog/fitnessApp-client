import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark text-white text-center mt-auto fixed-bottom">
      <p>&copy; {new Date().getFullYear()} Fitness App. All rights reserved.</p>
      <p>For Educational Purposes Only</p>
    </footer>
  );
};

export default Footer;