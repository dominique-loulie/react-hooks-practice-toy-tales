import React from "react";
import ToyCard from "./ToyCard";

function ToyContainer({toys, handleDelete, handleClickLikes }) {
  return (
    <div id="toy-collection">
      {toys.map((toy) => (
        <ToyCard 
          key={toy.id} 
          toy={toy} 
          handleDelete={handleDelete}
          handleClickLikes={handleClickLikes} 
        />
      ))}
    </div>
  );
}

export default ToyContainer;