/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import styles from "./CardGame.module.css";
import foto from "../../videogame.png";

const CardGame = ({ name, image, genre, id }) => {
  return (
    <div className={styles.divcard}>
      <h3 className={styles.h3card}>{name}</h3>
      <Link to={`/videogame/${id}`}>
        <img
          className={styles.imgcard}
          src={image ? image : foto}
          alt="Img not found"
          width="500px"
          height="400px"
        />
      </Link>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        {genre.map((g, index) => (
          <h5 key={index}>{g.name}</h5>
        ))}
      </div>
    </div>
  );
};

// CardGame.propTypes = {
//   name: String,
//   image: String,
//   genre: String,
//   id: Array,
// };

export default CardGame;
