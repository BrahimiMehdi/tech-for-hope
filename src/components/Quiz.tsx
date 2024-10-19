import React, {useState} from 'react'
import './quiz.css'
export default function Quiz() {
  const [answers, setAnswers] = useState({
    age: '',
    familyHistory: '',
    lifestyle: '',
    cosmeticProductUsage: '',
  });

  const [score, setScore] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  
  
  // Fonction pour mettre à jour les réponses de l'utilisateur
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAnswers((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Fonction pour calculer le score et afficher les résultats
  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let calculatedScore = 0;

    // Logique pour calculer le risque
    if (answers.age === 'over50') calculatedScore += 30;
    if (answers.familyHistory === 'yes') calculatedScore += 40;
    if (answers.lifestyle === 'unhealthy') calculatedScore += 30;
    if (answers.cosmeticProductUsage === 'daily') {
      calculatedScore += 20;
    } else if (answers.cosmeticProductUsage === 'occasionally') {
      calculatedScore += 10;
    } else if (answers.cosmeticProductUsage === 'never') {
      calculatedScore += 0; // Pas de points ajoutés
    }
    setScore(calculatedScore);
    setSubmitted(true);
  };

  return (
    <div id='container'>
      <h1>Breast Cancer Risk Quiz</h1>
      <hr/>
      <form onSubmit={handleSubmit}>
        {/* Question sur l'âge */}
        <div id='container'>
          <label id='age'>What is your age?</label>
          <select aria-labelledby="age"  name="age" value={answers.age} onChange={handleChange}>
            <option value="">Select...</option>
            <option value="under30">Under 30</option>
            <option value="30to50">30 to 50</option>
            <option value="over50">Over 50</option>
          </select>
        </div>

        {/* Historique familial */}
        <div id='container'>
          <label id='history'>Do you have a family history of breast cancer?</label>
          <select aria-labelledby="history" name="familyHistory" value={answers.familyHistory} onChange={handleChange}>
            <option value="">Select...</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>

        {/* Mode de vie */}
        <div id='container'>
          <label id='lifestyle'>How would you describe your lifestyle?</label>
          <select aria-labelledby="lifestyle" name="lifestyle" value={answers.lifestyle} onChange={handleChange}>
            <option value="healthy">Healthy</option>
            <option value="unhealthy">Unhealthy</option>
          </select>
        </div>
        <div id='container'>
        <label id="cosmeticProductUsage">À quelle fréquence utilisez-vous des produits cosmétiques (comme des déodorants) ?</label>
        <select aria-labelledby="cosmeticProductUsage" name="cosmeticProductUsage">
        <option value="daily">Quotidiennement</option>
        <option value="occasionally">Occasionnellement</option>
        <option value="never">Jamais</option>
        </select>
        </div>
        <button type="submit">Submit</button>
      </form>

      {submitted && (
        <div id='container'>
          <h2>Your estimated risk is: {score}%</h2>
        </div>
      )}
    </div>
  );
}
