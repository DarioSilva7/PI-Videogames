/* eslint-disable react/prop-types */
import CardGame from "../CardGame/CardGame";

const Cards = ({ videogames }) => {
  return (
    <>
      {videogames.map((vg, index) => (
        <CardGame
          key={index}
          id={vg.id}
          name={vg.name}
          image={vg.img}
          genre={vg.genres}
        />
      ))}
    </>
  );
};

export default Cards;
