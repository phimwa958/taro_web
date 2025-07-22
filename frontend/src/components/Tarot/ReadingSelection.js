import React, { useState, useEffect } from 'react';
import TarotService from '../../services/tarotService';

const ReadingSelection = () => {
  const [readings, setReadings] = useState([]);
  const [message, setMessage] = useState('');
  const [currentReading, setCurrentReading] = useState(null);

  useEffect(() => {
    TarotService.getReadings().then(
      (response) => {
        setReadings(response.data);
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setMessage(resMessage);
      }
    );
  }, []);

  const handleRequest = (readingId) => {
    TarotService.requestReading(readingId).then(
      (response) => {
        setMessage(response.data.msg);
        setCurrentReading(response.data.reading);
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setMessage(resMessage);
      }
    );
  };

  return (
    <div>
      <h3>Select a Tarot Reading</h3>
      {readings.length > 0 ? (
        <ul>
          {readings.map((reading) => (
            <li key={reading._id}>
              {reading.name}{' '}
              <button onClick={() => handleRequest(reading._id)}>Request</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No readings available.</p>
      )}
      {message && <p>{message}</p>}

      {currentReading && (
        <div>
          <h4>Your Reading:</h4>
          {currentReading.map((card, index) => (
            <div key={index}>
              <img src={card.imageUrl} alt={card.name} style={{ width: '100px', height: 'auto' }} />
              <p><strong>Card:</strong> {card.name} ({card.orientation})</p>
              <p><strong>Suit:</strong> {card.suit}</p>
              <p><strong>Meaning:</strong> {card.orientation === 'upright' ? card.upright : card.reversed}</p>
              <hr />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReadingSelection;