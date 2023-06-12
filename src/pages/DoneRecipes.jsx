import React, { useState } from 'react';
import copy from 'clipboard-copy';
import Header from '../components/Header';
import DoneRecipesFilter from '../components/DoneRecipesFilter';
import shareIcon from '../images/shareIcon.svg';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

function DoneRecipes() {
  const [isSharedRecipe, setIsSharedRecipe] = useState(false);

  const doneRecipes = [
    {
      id: '52771',
      type: 'meal',
      nationality: 'Italian',
      category: 'Vegetarian',
      alcoholicOrNot: '',
      name: 'Spicy Arrabiata Penne',
      image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
      doneDate: '23/06/2020',
      tags: ['Pasta', 'Curry'],
    },
    {
      id: '178319',
      type: 'drink',
      nationality: '',
      category: 'Cocktail',
      alcoholicOrNot: 'Alcoholic',
      name: 'Aquamarine',
      image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
      doneDate: '23/06/2020',
      tags: [],
    },
  ];

  const [filteredRecipes, setFilteredRecipes] = useState(doneRecipes);

  const handleShareRecipe = (type, id) => {
    const path = `http://localhost:3000/${type}s/${id}`;
    copy(path);
    setIsSharedRecipe(true);
  };

  return (
    <section className="page-done-recipes">
      <Header title="Done Recipes" />
      <DoneRecipesFilter
        setFilteredRecipes={ setFilteredRecipes }
      />
      { filteredRecipes.map((recipe, index) => (
        <div key={ index }>
          <Link
            to={ `/${recipe.type}s/${recipe.id}` }
          >
            <img
              data-testid={ `${index}-horizontal-image` }
              src={ recipe.image }
              alt={ recipe.name }
              className="recipe-img"
            />
          </Link>
          <h3
            data-testid={ `${index}-horizontal-top-text` }
          >
            { recipe.type === 'meal' ? (
              <div>
                { `${recipe.nationality} - ${recipe.category}` }
              </div>
            ) : (
              <div>
                { recipe.alcoholicOrNot }
              </div>
            ) }
          </h3>
          <Link
            to={ `/${recipe.type}s/${recipe.id}` }
          >
            <h3
              data-testid={ `${index}-horizontal-name` }
            >
              { recipe.name }
            </h3>
          </Link>
          <h3
            data-testid={ `${index}-horizontal-done-date` }
          >
            { recipe.doneDate }
          </h3>
          <button
            src={ shareIcon }
            data-testid={ `${index}-horizontal-share-btn` }
            onClick={ () => handleShareRecipe(recipe.type, recipe.id) }
          >
            Share
          </button>
          { isSharedRecipe && (
            <h3>Link copied!</h3>
          ) }
          {recipe.tags.map((tagName) => (
            <h3
              key={ tagName }
              data-testid={ `${index}-${tagName}-horizontal-tag` }
            >
              { tagName }
            </h3>
          ))}
        </div>
      )) }
    </section>
  );
}

export default DoneRecipes;
