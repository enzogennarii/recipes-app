import React, { useContext } from 'react';
import { RecipeContext } from '../context';
import RecomendationCard from './RecomendationCard';

function Recomendations() {
  const { recomendations } = useContext(RecipeContext);
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
