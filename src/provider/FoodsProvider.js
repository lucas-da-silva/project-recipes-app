import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import FoodsContext from './FoodsContext';
import fetchApi from '../services/fetchApi';

function FoodsProvider({ children }) {
  const history = useHistory();
  const [foods, setFoods] = useState({});
  const [site, setSite] = useState('');

  const getFoods = (url) => {
    fetchApi(url).then((data) => {
      setFoods(data);
      if (data.meals && data.meals.length === 1) {
        history.push(`/meals/${data.meals[0].idMeal}`);
      } if (data.drinks && data.drinks.length === 1) {
        history.push(`/drinks/${data.drinks[0].idDrink}`);
      }
    });
  };

  const contextType = {
    foods,
    getFoods,
    site,
    setSite,
  };

  return (
    <FoodsContext.Provider value={ contextType }>
      {children}
    </FoodsContext.Provider>
  );
}

FoodsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FoodsProvider;