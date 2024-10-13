import React, { useEffect, useState } from 'react';
import { Back_Quiz } from '../config'; 

const ResultsPage = () => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await fetch(`${Back_Quiz}results`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });

        const data = await response.json();
        setResults(data);
      } catch (error) {
        console.error('Error fetching results:', error);
      }
    };

    fetchResults();
  }, []);

  if (!results.length) return <div className="p-6 text-center">No results yet</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Your Results</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {results.map((result) => (
          <div key={result._id} className="bg-white p-4 shadow rounded-md">
            <h3 className="font-bold text-lg">{result.quizTitle}</h3>
            <p>Score: {result.score}/{result.totalQuestions}</p>
            <p>Date: {new Date(result.date).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResultsPage;

