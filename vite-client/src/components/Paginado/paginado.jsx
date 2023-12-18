import styles from "./paginado.module.css";

// eslint-disable-next-line react/prop-types
export default function Paginado({ vgPerPage, videogamesQty, paginado }) {
  const pageNumber = [];
  for (let i = 1; i < Math.ceil(videogamesQty / vgPerPage); i++) {
    pageNumber.push(i);
  }
  return (
    <nav className={styles.nav}>
      <div className={styles.nro}>
        <ul className={styles.pagination}>
          {pageNumber &&
            pageNumber.map((nro, index) => (
              <li className={styles.number} key={index}>
                <a className={styles.ancla} onClick={() => paginado(nro)}>
                  {nro}
                </a>
              </li>
            ))}
        </ul>
      </div>
    </nav>
  );
}
