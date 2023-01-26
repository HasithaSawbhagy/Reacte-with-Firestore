import { db } from "./firebase.config"
import { useState, useEffect } from "react"
import { collection, onSnapshot, doc, addDoc, deleteDoc } from "firebase/firestore"

function App() {
  const [recipes, setRecipes] = useState([])
  const [form, setForm] = useState({
    title: "",
    desc: "",
    ingredients: [],
    steps: []
  })
  const [popupActive, setPopupActive] = useState(false)
  const recipesCollectionRef = collection(db, "recipes")

  useEffect(() => {
    onSnapshot(recipesCollectionRef, snapshot => {
      setRecipes(snapshot.docs.map(doc => {
        return {
          id: doc.id,
          viewng: false,
          ...doc.data(),
        }
      }))
    })
  },[])
// additional, [] also
  const handleView = id => {
    const recipesColne = [...recipes]

    recipesColne.forEach(recipe => {
      if (recipe.id === id) {
        recipe.viewing = true
      }else {
        recipe.viewing = false
      }
    })

    setRecipes(recipesColne)
  }

  const handleSubmit = e => {
    e.preventDefault()

    if(
      !form.title ||
      !form.desc ||
      !form.ingredients ||
      !form.steps
    ){
      alert("Please fill out all fields")
      return
    }
    addDoc(recipesCollectionRef, form)

    setForm({
      title: "",
      desc: "",
      ingredients: [],
      steps: []
    })

    setPopupActive(false)
    alert("Data sent succecfully")
  }

  const handleIngredient = (e, i) => {
    const ingredientsClone = [...form.ingredients]

    ingredientsClone[i] = e.target.value

    setForm({
      ...form,
      ingredients: ingredientsClone
    })

  }

  const handleIngredientCount = () => {
    setForm({
      ...form,
      ingredients: [...form.ingredients, ""]
    })

  }

  const handleStepCount = () => {
    setForm({
      ...form,
      steps: [...form.steps, ""]
    }) 

  }

  const handleStep = (e, i) => {
    const stepsClone = [...form.steps]

    stepsClone[i] = e.target.value

    setForm({
      ...form,
      steps: stepsClone
    })

  }

  const removeRecipe = id => {
    deleteDoc(doc(db, "recipes", id))
  }


  return (
    <div className="App">
      <h1><u>Reatc Sis</u></h1>

      <button onClick={() => setPopupActive(!popupActive)}>Add Data</button>
      <div className = "recipes">
        {recipes.map((recipe, i) =>(
          <div className= "recipe" key = {recipe.id}>
            <h3> <u>{ recipe.title }</u> </h3>

            <p dangerouslySetInnerHTML={{ __html: recipe.desc}}></p>
            <div>
                <h4><u>Include</u></h4>
                <ul>
                  { recipe.ingredients && recipe.ingredients.map((ingredient, j) => (
                    <li key = {j}> {ingredient} </li>
                  ))}
                </ul>

                <h4> <u>Steps</u> </h4>
                <ol>
                  { recipe.steps && recipe.steps.map((step, j) => (
                    <li key = {j}> {j+1} {step} </li>
                  ))}
                </ol>
              </div>
              <div className = "button">
                <button onClick = {() => handleView(recipe.id)} > View { recipe.viewing ? 'less' : 'more'}</button>
                <button className = "remove" onClick={() => removeRecipe(recipe.id)}> Remove </button>
              </div>
          </div>
          ))}
      </div>

      {popupActive && <div className = "popup">
        <div className = "popup-inner">
          <h2>Add new data</h2>
          <form onSubmit={handleSubmit}>

            <div className = "form-group">
            <label>Title</label>
            <input
            type = "text"
            vlaue = {form.title}
            onChange = {e => setForm({...form, title: e.target.value})} />
            </div>

            <div className = "form-group">
            <label>Description</label>
            <textarea
            type = "text"
            vlaue = {form.desc}
            onChange = {e => setForm({...form, desc: e.target.value})} />
            </div>

            <div className = "form-group">
            <label>ingredients</label>
            {
              form.ingredients.map((ingredient, i) => (
                <input
                type = "text"
                key={i}
                vlaue = {ingredient}
                onChange = {e => handleIngredient(e, i)} />
              ))
            }
            <button type = "button" onClick={handleIngredientCount}>Add ingredient</button>
            </div>

            <div className = "form-group">
            <label>Steps</label>
            {
              form.steps.map((step, i) => (
                <textarea
                type = "text"
                key={i}
                vlaue = {step}
                onChange = {e => handleStep(e, i)} />
              ))
            }
            <button type = "button" onClick={handleStepCount}>Add step</button>
            </div>

            <div className = "buttons">
              <button type = "submit">Submit</button>
              <button type = "button" class="remove" onClick={() => setPopupActive(false)}>Close</button>
            </div>

          </form>

          {JSON.stringify(form)}
        </div>
        </div>}

    </div>
  );
}

export default App;
