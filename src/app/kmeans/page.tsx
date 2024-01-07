"use client"
import React, { useState } from 'react';
export default function Recommend() {
  const [userId, setUserId] = useState(1);
  const [recommendations, setRecommendations] = useState('');

  const fetchData = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/user_id/'+userId);
      const data = await response.json();
      console.log(data); // Process the data as needed
      setRecommendations(data.message);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <h1>Recommend Component</h1>
      <label>
        Enter User ID:
        <input
          type="number"
          value={userId}
          onChange={(e) => setUserId(Number(e.target.value))}
        />
      </label>
      <button onClick={fetchData}>Fetch Recommendations</button>

      <div>
        <h2>Recommendations:</h2>
        <p>{recommendations}</p>
      </div>
    </div>
  );
}