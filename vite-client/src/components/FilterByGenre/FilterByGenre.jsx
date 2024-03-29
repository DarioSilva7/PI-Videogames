// eslint-disable-next-line react/prop-types
const FilterByGenre = ({ handleFilterGenre }) => {
  return (
    <>
      <select onChange={handleFilterGenre}>
        <option disabled={true} value="All">
          Genres
        </option>
        <option value="All">All</option>
        <option value="Action">Action</option>
        <option value="Indie">Indie</option>
        <option value="Adventure">Adventure</option>
        <option value="Strategy">Strategy</option>
        <option value="RPG">RPG</option>
        <option value="Shooter">Shooter</option>
        <option value="Casual">Casual</option>
        <option value="Simulation">Simulation</option>
        <option value="Puzzle">Puzzle</option>
        <option value="Arcade">Arcade</option>
        <option value="Platformer">Platformer</option>
        <option value="Racing">Racing</option>
        <option value="Massively Multiplayer">Massively Multiplayer</option>
        <option value="Sports">Sports</option>
        <option value="Fighting">Fighting</option>
        <option value="Family">Family</option>
        <option value="Board Games">Board Games</option>
        <option value="Educational">Educational</option>
        <option value="Card">Card</option>
        <option value="Action">Action</option>
      </select>
    </>
  );
};

FilterByGenre.propTypes = {};

export default FilterByGenre;
