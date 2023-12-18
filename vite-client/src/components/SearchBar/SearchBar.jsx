import styles from "./SearchBar.module.css";

// eslint-disable-next-line react/prop-types
export default function SearchBar({ handleChange, handleSubmit }) {
  return (
    <div className={styles.contenedor}>
      <input
        className={styles.input}
        type="search"
        placeholder="Search by name"
        onChange={handleChange}
      />
      <button className={styles.btn} type="submit" onClick={handleSubmit}>
        Search
      </button>
    </div>
  );
}
