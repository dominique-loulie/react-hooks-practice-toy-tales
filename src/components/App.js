import React, { useEffect, useState } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

const toysAPI = 'http://localhost:3001/toys';
const headers = {
  Accepts: 'application/json',
  'Content-type': 'application/json',
};

function App() {
  const [showForm, setShowForm] = useState(false);
  const [toys, setToys] = useState([]);

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  function addToy(toy) { 
    fetch(toysAPI, {
      method: 'POST',
      body: JSON.stringify(toy),
      headers,  
    })
      .then((res) => res.json())
      .then((json) => setToys([...toys, json]));
  }

  function deleteToy(id) {
    fetch(`${toysAPI}/${id}`, {
      method: 'DELETE',
      headers,
      }).then(() => setToys(toys.filter((toy) => toy.id !== id)));
  }

  function incrementLikes(toy) {
    fetch(`${toysAPI}/${toy.id}`, {
      method: 'PATCH',
      headers,
      body: JSON.stringify({likes: toy.likes + 1 }),
    }).then(() => 
      setToys( 
        toys.map((theoldToy) => 
          theoldToy.id !== toy.id 
            ? theoldToy 
            : { ...theoldToy, likes: theoldToy.likes + 1 }
        )
      )
    );
  }

  useEffect(() => {
    fetch(toysAPI)
      .then((res) => res.json())
      .then((json) => setToys(json));
  }, []);

  return (
    <>
      <Header />
      {showForm ? <ToyForm handleSubmit={addToy} /> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer 
        toys={toys} 
        handleDelete={deleteToy} 
        handleClickLikes={incrementLikes}/>
    </>
  );
}

export default App;