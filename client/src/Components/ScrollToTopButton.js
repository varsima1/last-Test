import React, { useState, useEffect } from 'react';
import './scss/ScrollToTopButton.scss'
import {BsArrowUpCircleFill} from 'react-icons/bs'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUp } from '@fortawesome/free-solid-svg-icons';


const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 100) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`scroll-to-top-button ${isVisible ? 'visible' : ''}`}>
      <button onClick={scrollToTop} className='toup'><FontAwesomeIcon icon={faCircleUp} style={{width:'30px',height:'30px', color: "#007bff" }} /></button>
    </div>
  );
};

export default ScrollToTopButton;
