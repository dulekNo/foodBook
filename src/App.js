import { useEffect, useState } from 'react';
import Recepie from './Recipe';
import "./App.css"

const App = () => {

  const APP_ID = '4558c908'
  const APP_KEY = 'd353218bd9cfd1e6942e60afb6be8cce'

  const [counter, setCounter] = useState(0)
  const [recipes, setRecipes] = useState([])
  const [search, setSearch] = useState('')
  const [query, setQuery] = useState('chicken')

  useEffect(() => {
    // effect has been run only when component is mounted!
    // thanks to second parameter [] (array can be empty)
    getRecipes();
  }, [query])// eslint-disable-line react-hooks/exhaustive-deps

  const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`)
    const data = await response.json();
    setRecipes(data.hits)
    // console.log(data);
    // console.log(recipes);
  }

  const updateSearch = e => {
    setSearch(e.target.value)
  }

  const getSearch = e => {
    e.preventDefault(); //prevent page reload
    setQuery(search)
    setSearch('')
  }

  return (
    <div className="app">
      <form onSubmit={getSearch} className="search-form">
        <input className="search-bar" type="text" value={search} onChange={updateSearch} />
        <button className="search-button" type="submit" onClick={() => setCounter(counter + 1)}>
          Search please
        </button>
      </form>
      <div>Number of searches - {counter} time(s)!</div>
      <div className="recipes-list">
        {recipes.map((recipe, key) => (
          <Recepie
            key={key}
            title={recipe.recipe.label}
            calories={recipe.recipe.calories}
            image={recipe.recipe.image}
            ingredients={recipe.recipe.ingredients}
          />
        ))}
      </div>
    </div>
  );
}

export default App;

