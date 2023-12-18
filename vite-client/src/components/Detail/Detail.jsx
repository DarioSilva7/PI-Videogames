/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import {
  getVideogameDetail,
  resetGames,
  setLoading,
} from "../../redux/actions/index";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Detail.module.css";
import foto from "../../videogame.png";
import Loading from "../Loading/Loading";

export default function Detail() {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLoading());
    dispatch(getVideogameDetail(id));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    return () => {
      dispatch(resetGames());
    };
  }, [dispatch]);

  const videoGameDetail = useSelector((state) => state.detail);
  console.log(
    "🚀 ~ file: Detail.jsx:33 ~ Detail ~ videoGameDetail:",
    videoGameDetail
  );
  const loading = useSelector((state) => state.loading);

  const fnDescription = { __html: videoGameDetail.description };

  return (
    <div className={styles.bg}>
      {loading ? (
        <Loading className={styles.loading} />
      ) : (
        <div className={styles.container}>
          <div style={{ display: "contents" }}>
            <h2>{videoGameDetail.name}</h2>
            <img
              className={styles.img}
              src={videoGameDetail.img ? videoGameDetail.img : foto}
              alt="Img not found"
            ></img>
            <p className={styles.p1}>Rating: {videoGameDetail.rating}</p>
            <p className={styles.p1}>
              Genres:{" "}
              {videoGameDetail.genres?.length > 0
                ? videoGameDetail.genres?.map((g, index) => (
                    <span key={index} className={styles.span}>
                      {" "}
                      {g.name + "  "}{" "}
                    </span>
                  ))
                : "Empty"}
            </p>
            <p className={styles.p1}>
              Platforms:{" "}
              {videoGameDetail.platforms?.length > 0
                ? videoGameDetail.platforms.map((p, index) => (
                    <span key={index} className={styles.span}>
                      {p.name + "  "}
                    </span>
                  ))
                : "Empty"}
            </p>
          </div>
          <div className={styles.info}>
            <h3 className={styles.p1}>Description:</h3>
            <span
              className={styles.p2}
              dangerouslySetInnerHTML={fnDescription}
            ></span>
            <span className={styles.p1}>
              Released: {videoGameDetail.released_date}
            </span>

            <Link style={{ alignSelf: "center" }} to="/home">
              <button className={styles.btn}> Go back 👋</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
