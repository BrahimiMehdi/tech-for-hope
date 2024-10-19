import React, {useState} from 'react'
import './quiz.css'
import { useState } from 'react';

export default function Quiz() {
  const [answers, setAnswers] = useState({
    age: '',
    familyHistory: '',
    lifestyle: '',
  });

  const [score, setScore] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  // Fonction pour mettre à jour les réponses de l'utilisateur
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAnswers((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Fonction pour calculer le score et afficher les résultats
  const handleSubmit = (e) => {
    e.preventDefault();
    let calculatedScore = 0;

    // Logique pour calculer le risque
    if (answers.age === 'over50') calculatedScore += 30;
    if (answers.familyHistory === 'yes') calculatedScore += 40;
    if (answers.lifestyle === 'unhealthy') calculatedScore += 30;

    setScore(calculatedScore);
    setSubmitted(true);
  };

  return (
    <div>
      <h1>Breast Cancer Risk Quiz</h1>
      <form onSubmit={handleSubmit}>
        {/* Question sur l'âge */}
        <div>
          <label>What is your age?</label>
          <select name="age" value={answers.age} onChange={handleChange}>
            <option value="">Select...</option>
            <option value="under30">Under 30</option>
            <option value="30to50">30 to 50</option>
            <option value="over50">Over 50</option>
          </select>
        </div>

        {/* Historique familial */}
        <div>
          <label>Do you have a family history of breast cancer?</label>
          <select name="familyHistory" value={answers.familyHistory} onChange={handleChange}>
            <option value="">Select...</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>

        {/* Mode de vie */}
        <div>
          <label>How would you describe your lifestyle?</label>
          <select name="lifestyle" value={answers.lifestyle} onChange={handleChange}>
            <option value="">Select...</option>
            <option value="healthy">Healthy</option>
            <option value="unhealthy">Unhealthy</option>
          </select>
        </div>

        <button type="submit">Submit</button>
      </form>

      {submitted && (
        <div>
          <h2>Your estimated risk is: {score}%</h2>
        </div>
      )}
    </div>
  );
}
