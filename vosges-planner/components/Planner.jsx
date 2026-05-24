'use client';

import { useState, useEffect } from 'react';

export default function Planner() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState('');

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/plan');
      const data = await response.json();
      setPlans(data);
    } catch (error) {
      console.error('Error fetching plans:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    try {
      const response = await fetch('/api/plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ activity: input }),
      });
      const data = await response.json();
      setPlans([...plans, data]);
      setInput('');
    } catch (error) {
      console.error('Error adding plan:', error);
    }
  };

  return (
    <div className="planner">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a Vosges activity..."
        />
        <button type="submit">Add</button>
      </form>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {plans.map((plan, index) => (
            <li key={index}>{plan.activity}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
