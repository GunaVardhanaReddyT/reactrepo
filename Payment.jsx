import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Payment.css';

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;

  const {
    selectedCount = 0,
    totalCost = 0,
    movieName = 'Unknown Movie',
    theaterName = 'Unknown Theater',
    showtime = 'Unknown Showtime',
    language = 'Unknown Language',
  } = state || {};

  const [processing, setProcessing] = useState(false);

  const handlePayClick = async () => {
    setProcessing(true);

    // Prepare payment data
    const paymentData = {
      movieName,
      theaterName,
      showtime,
      language,
      selectedCount,
      totalCost,
      paymentId: `pay-${Date.now()}`, // Unique payment ID
      paymentDate: new Date().toISOString(),
    };

    try {
      // Send payment data to backend API
      const response = await fetch('http://localhost:5000/api/payments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData),
      });

      if (!response.ok) {
        throw new Error('Failed to store payment data');
      }

      // Navigate to confirmation page after successful storage
      navigate('/confirmation', {
        state: {
          message: 'Payment Done',
          ...paymentData,
        },
      });
    } catch (error) {
      console.error('Error storing payment data:', error);
      alert('Failed to process payment. Please try again.');
      setProcessing(false);
    }
  };

  return (
    <div className="payment-container">
      <h1>Pay for {movieName}</h1>
      <div className="booking-details">
        <p>Theater: {theaterName}</p>
        <p>Showtime: {showtime}</p>
        <p>Language: {language}</p>
        <p>Seats Selected: {selectedCount}</p>
        <p>Total Cost: ₹{totalCost}</p>
      </div>
      <button onClick={handlePayClick} disabled={processing}>
        {processing ? 'Processing...' : `Pay ₹${totalCost}`}
      </button>
    </div>
  );
};

export default Payment;