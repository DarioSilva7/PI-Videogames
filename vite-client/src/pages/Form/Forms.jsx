import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getGenres, getPlatforms, postGame } from "../../redux/actions";
import Loading from "../../components/Loading/Loading";
import styles from "./Form.module.css";
import loadingStyles from "../../components/Loading/Loading.module.css";

const Forms = () => {
  const initialState = {
    genres: [],
    platforms: [],
    createdInDB: true,
  };
  const photo =
    "https://www.elsoldepuebla.com.mx/gossip/jp9j3s-el-espectaculo-de-super-mario-bros-se-presentara-en-puebla-te-decimos-cuando/alternates/LANDSCAPE_768/El%20espect%C3%A1culo%20de%20Super%20Mario%20Bros%20se%20presentar%C3%A1%20en%20Puebla,%20te%20decimos%20cu%C3%A1ndo";
  const allGenres = useSelector((state) => state.genres);
  const allPlatforms = useSelector((state) => state.platforms);
  const loading = useSelector((state) => state.loading);
  const [form, setForm] = useState(initialState);
  const ratingOpts = [1, 2, 3, 4, 5];
  const dispatch = useDispatch();

  // const navigate = useNavigate();

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]:
        e.target.name == "rating" ? parseInt(e.target.value) : e.target.value,
    });
  }
  function handleGenres(e) {
    const genreTOAdd = allGenres.find((g) => g.id == e.target.value);
    !form.genres.some((g) => g.id == e.target.value) &&
      setForm({
        ...form,
        genres: [...form.genres, genreTOAdd],
      });
  }

  function handlePlatforms(e) {
    const platformTOAdd = allPlatforms.find((p) => p.id == e.target.value);
    !form.platforms.some((p) => p.id == e.target.value) &&
      setForm({
        ...form,
        platforms: [...form.platforms, platformTOAdd],
      });
  }
  const handleDeleteGenre = function (el) {
    setForm({
      ...form,
      genres: form.genres.filter((g) => g !== el),
    });
  };
  const handleDeletePlatform = function (el) {
    setForm({
      ...form,
      platforms: form.platforms.filter((p) => p !== el),
    });
  };

  function handleSubmit(e) {
    try {
      e.preventDefault();
      form.genres = form.genres.map((g) => g.id);
      form.platforms = form.platforms.map((g) => g.id);
      dispatch(postGame(form));
      setForm(initialState);
      // alert("Videogame created 😁");
      // dispatch(getGames());
      // navigate("/home");
    } catch (error) {
      console.log("🚀 ~ file: Forms.jsx:72 ~ handleSubmit ~ error:", error);
    }
  }

  useEffect(() => {
    dispatch(getGenres());
    dispatch(getPlatforms());
    // eslint-disable-next-line
  }, []);
  return (
    <div className={styles.contenedor}>
      {loading ? (
        <Loading className={loadingStyles.loading} />
      ) : (
        <div className={styles.container}>
          <div className="flex items-center content-evenly">
            <h1>CREATE YOUR VIDEOGAME 😀</h1>
            <Link to="/home">
              <button className={styles.btn}>HOME</button>
            </Link>
          </div>
          <form
            autoComplete="off"
            className={styles.createForm}
            onSubmit={handleSubmit}
          >
            <label htmlFor="name">Name:</label>
            <input
              className={styles.input}
              type="text"
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />

            <label htmlFor="description">Description:</label>
            <textarea
              className={styles.input}
              type="textarea"
              id="description"
              name="description"
              value={form.description}
              onChange={handleChange}
              required
              maxLength="1000"
              rows="5"
            />

            <label htmlFor="released date">Released date:</label>
            <input
              className={styles.input}
              type="date"
              id="released date"
              name="released_date"
              value={form.released}
              onChange={(e) => handleChange(e)}
              required
            />

            <label className={styles.rating}>
              Rating:
              {ratingOpts.map((el, index) => {
                return (
                  <div key={index}>
                    <input
                      onChange={(e) => handleChange(e)}
                      type="radio"
                      name="rating"
                      value={el}
                    />
                    {el}
                  </div>
                );
              })}
            </label>

            <label htmlFor="genres">
              Genres:
              <select
                className={styles.input}
                onChange={handleGenres}
                id="genres"
                name="genres"
                defaultValue=""
                required
              >
                {allGenres?.map((g, index) => (
                  <option key={index} value={g.id}>
                    {g.name}
                  </option>
                ))}
              </select>
              <ul>
                <li>
                  {form.genres?.map((el, index) => {
                    return (
                      <div key={index}>
                        {el.name}
                        <button
                          name={el}
                          type="button"
                          onClick={() => handleDeleteGenre(el)}
                        >
                          X
                        </button>
                      </div>
                    );
                  })}
                </li>
              </ul>
            </label>

            <label htmlFor="platforms">
              Platforms:
              <select
                className={styles.input}
                onChange={handlePlatforms}
                id="platforms"
                name="platforms"
                defaultValue=""
                required
              >
                {allPlatforms?.map((p, index) => (
                  <option key={index} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
              <ul>
                <li>
                  {form.platforms?.map((el, index) => {
                    return (
                      <div key={index}>
                        {el.name}
                        <button
                          name={el}
                          type="button"
                          onClick={() => handleDeletePlatform(el)}
                        >
                          X
                        </button>
                      </div>
                    );
                  })}
                </li>
              </ul>
            </label>

            <label htmlFor="image">
              Image:
              <input
                className={styles.input}
                type="text"
                name="img"
                id="image"
                onChange={handleChange}
                value={form.img}
                placeholder="Mario"
              />
              {form.img ? (
                <img className={styles.img} src={form.img} alt="" />
              ) : (
                <img className={styles.img} src={photo} alt="" />
              )}
            </label>
            <div>
              <button className={styles.btnCreate} type="submit">
                CREATE!
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Forms;
