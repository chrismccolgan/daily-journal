import React from 'react';
import classes from './Notification.module.css';
import { useState, useRef, useEffect } from 'react';

const Notification = ({ notification }) => {
  const node = useRef();
  const [open, setOpen] = useState(true);

  const handleClickOutside = (e) => {
    if (node && node.current.contains(e.target)) {
      // inside click
      return;
    }
    // outside click
    setOpen(false);
  };

  useEffect(() => {
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  let specialClasses = '';

  if (notification.status === 'error') {
    specialClasses = classes.error;
  }

  // if (notification.status === 'success') {
  //   specialClasses = classes.success;
  // }

  const cssClasses = `${classes.notification} ${specialClasses}`;

  return (
    <section hidden={!open} ref={node} className={cssClasses}>
      <h2>{notification.title}</h2>
      <p>{notification.message}</p>
    </section>
  );
};

export default Notification;
