import React, { useContext } from 'react';
import { CurrRecipeContext } from '../context';
import RecomendationCard from './RecomendationCard';

function Recomendations() {
  const { recomendations } = useContext(CurrRecipeContext);
  return (
    <div className="recomendations">
      {
        recomendations.map((rec, i) => (
          <RecomendationCard
            key={ Math.random() }
            recomendation={ rec }
            index={ i }
          />
        ))
      }
    </div>
  );
}

export default Recomendations;
