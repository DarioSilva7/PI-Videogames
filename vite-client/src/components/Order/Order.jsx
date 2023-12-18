/* eslint-disable react/prop-types */
const Order = ({ name, opts, handleSort }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <label htmlFor="order">{name}</label>
      <select name="order" onChange={handleSort}>
        <option label="Random" value={"random"}></option>
        {opts.map((opt, index) => {
          return (
            <option key={index} value={opt.value}>
              {opt.name}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Order;
