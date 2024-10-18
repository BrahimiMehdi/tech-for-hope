import React from 'react';
import { createRoot } from 'react-dom/client';
import Quiz from '.components/Quiz';

// Sélectionner l'élément root
const rootElement = document.getElementById('root');

// Créer un "root" avec createRoot et rendre l'application
const root = createRoot(rootElement);
root.render(
  <React.StrictMode>
    <Quiz />
  </React.StrictMode>
);
