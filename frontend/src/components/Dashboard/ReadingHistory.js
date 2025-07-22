
import React, { useState, useEffect } from 'react';
import TarotService from '../../services/tarotService';

const ReadingHistory = () => {
  const [history, setHistory] = useState([]);
  const [message, setMessage] = useState('');

  const fetchReadingHistory = () => {
    TarotService.getReadingHistory().then(
      (response) => {
        setHistory(response.data);
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

  useEffect(() => {
    fetchReadingHistory();
  }, []);

  const handleDeleteReading = async (id) => {
    if (window.confirm('Are you sure you want to delete this reading?')) {
      try {
        await TarotService.deleteReadingRequest(id);
        setMessage('Reading deleted successfully!');
        fetchReadingHistory(); // Re-fetch history to update UI
      } catch (error) {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setMessage(resMessage);
      }
    }
  };

  return (
    <div>
      <h3>Reading History</h3>
      {history.length > 0 ? (
        <ul>
          {history.map((item) => (
            <li key={item._id}>
              <h4>
                {item.tarotReading.name} - {new Date(item.date).toLocaleDateString()}
                <button onClick={() => handleDeleteReading(item._id)} style={{ marginLeft: '10px' }}>Delete</button>
              </h4>
              {item.readingDetails.map((card, index) => (
                <div key={index}>
                  <img src={card.imageUrl} alt={card.name} style={{ width: '100px', height: 'auto' }} />
                  <p><strong>Card:</strong> {card.name} ({card.orientation})</p>
                  <p><strong>Suit:</strong> {card.suit}</p>
                  <p><strong>Meaning:</strong> {card.orientation === 'upright' ? card.upright : card.reversed}</p>
                  <hr />
                </div>
              ))}
            </li>
          ))}
        </ul>
      ) : (
        <p>No readings yet.</p>
      )}
      {message && <p>{message}</p>}
    </div>
  );
};

export default ReadingHistory;
