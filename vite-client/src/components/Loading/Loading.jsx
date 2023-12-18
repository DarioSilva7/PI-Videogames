import style from "./Loading.module.css";

const Loading = () => {
  return (
    <div className={"flex items-center flex-col"}>
      <div className={style.loading}></div>
      <h1 style={{ marginTop: "-25%" }}>L o a d i n g . . .</h1>
    </div>
  );
};

export default Loading;
