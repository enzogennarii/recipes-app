import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

export default function IngredientList(props) {
  const { isInProgress, ingredients, id, type, setEnableFinish } = props;
  const [checkedIngredients, setCheckedIngredients] = useState([]);
  const checkIngredientFromLocalStorage = (ingr) => {
    try {
      const isInProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
      const exists = isInProgressRecipes[type][id].some(
        (ingredient) => ingredient === ingr,
      );
      return exists;
    } catch (e) {
      return false;
    }
  };
  const buildCheckedIncredients = () => {
    const newArray = ingredients.map(
      (ingredient) => checkIngredientFromLocalStorage(ingredient),
    );
    console.log(newArray);
    setCheckedIngredients(newArray);
    setEnableFinish(newArray.every((ingredient) => ingredient));
  };
  useEffect(() => {
    buildCheckedIncredients();
  }, [props]);

  const saveIngredient = ({ target: { value, checked } }) => {
    const ingredient = value;
    let isInProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (isInProgressRecipes === null) {
      isInProgressRecipes = {
        drinks: {},
        meals: {},
      };
    }
    if (checked) {
      const keys = Object.keys(isInProgressRecipes[type]);
      if (keys.includes(id)) {
        isInProgressRecipes[type][id].push(ingredient);
      } else {
        isInProgressRecipes[type][id] = [ingredient];
      }
    } else {
      isInProgressRecipes[type][id] = isInProgressRecipes[type][id].filter(
        (ingr) => ingr !== ingredient,
      );
    }
    localStorage.setItem('inProgressRecipes', JSON.stringify(isInProgressRecipes));
    buildCheckedIncredients();
  };

  return (
    isInProgress ? (
      <div>
        {
          ingredients.map((ingredient, i) => (
            <div key={ i }>
              <label
                data-testid={ `${i}-ingredient-step` }
                className={ checkedIngredients[i] ? 'checkedIngredient' : '' }
              >
                <input
                  type="checkbox"
                  value={ ingredient }
                  onChange={ saveIngredient }
                  checked={ checkedIngredients[i] }
                />
                { ingredient}
              </label>
            </div>
          ))
        }
      </div>
    )
      : (
        <ul>
          {
            ingredients.map((ingredient, i) => (
              <li
                key={ Math.random() }
                data-testid={ `${i}-ingredient-name-and-measure` }
              >
                {ingredient}
              </li>
            ))
          }
        </ul>
      )
  );
}

IngredientList.propTypes = {
  id: PropTypes.number.isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  isInProgress: PropTypes.bool.isRequired,
  setEnableFinish: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
};
