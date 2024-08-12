import React, { useEffect, useState } from 'react';
import { Alert, Button } from 'react-bootstrap';
import { FaClock, FaExternalLinkAlt } from 'react-icons/fa';

const Banner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [description, setDescription] = useState('');
  const [timeLeft, setTimeLeft] = useState(0);
  const [link, setLink] = useState('');

  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    fetch(`${apiUrl}/api/banner`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch banner data');
        }
        return response.json();
      })
      .then((data) => {
        setDescription(data.description);
        setIsVisible(data.is_visible);
        setTimeLeft(data.timer);
        setLink(data.link);
      })
      .catch((error) => console.error('Error fetching banner data:', error));
  }, []);

  useEffect(() => {
    if (timeLeft > 0 && isVisible) {
      const timerId = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(timerId);
    }
  }, [timeLeft, isVisible]);

  if (!isVisible || timeLeft <= 0) return null;

  return (
    <Alert variant="warning" style={styles.banner}>
      <div style={styles.content}>
        <h4>{description}</h4>
        <div style={styles.timer}>
          <FaClock style={styles.icon} />
          <span style={styles.timeText}>{`Time left: ${timeLeft}s`}</span>
        </div>
        {link && (
          <Button variant="outline-dark" href={link} target="_blank" rel="noopener noreferrer">
            LINK <FaExternalLinkAlt style={styles.icon} />
          </Button>
        )}
      </div>
    </Alert>
  );
};

const styles = {
  banner: {
    backgroundColor: '#ffe066',
    backgroundImage: 'linear-gradient(135deg, #ffd54f 0%, #ffecb3 100%)',
    borderRadius: '8px',
    padding: '20px',
    textAlign: 'center',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  content: {
    maxWidth: '600px',
    margin: '0 auto',
  },
  timer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '10px 0',
  },
  icon: {
    marginRight: '8px',
  },
  timeText: {
    fontSize: '1.2em',
    fontWeight: 'bold',
    color: '#ff5722',
    animation: 'pulse 1s infinite',
  },
  link: {
    color: '#0000ff',
    textDecoration: 'underline',
    marginLeft: '10px',
  },
};

export default Banner;
