/* eslint-disable react/prop-types */
const Filter = ({ name, opts, handleFilter }) => {
  console.log("🚀 ~ file: Filter.jsx:3 ~ Filter ~ opts:", opts);
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <label htmlFor="filter">{name}</label>
      <select name="filter" onChange={handleFilter}>
        <option label="Default" value={"default"}></option>
        {opts.map((opt, index) => {
          return (
            <option key={index} value={opt.id}>
              {opt.name}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Filter;
