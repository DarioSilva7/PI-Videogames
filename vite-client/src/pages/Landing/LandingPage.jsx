import { Link } from "react-router-dom";
// import styles from "./LandingPage.module.css";

export default function LandingPage() {
  const imageUrl =
    "https://www.masgamers.com/wp-content/uploads/2020/09/The-Last-of-Us-Part-II-foto-3.jpg";

  return (
    <div
      className="bg-cover bg-center h-screen"
      style={{ backgroundImage: `url('${imageUrl}')` }}
    >
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm text-center">
          <h1>VIDEOGAMES SPA</h1>
        </div>
        <div className="sm:mx-auto sm:w-full sm:max-w-sm text-center">
          <Link to="/home">
            <button target="_blank">E N T E R</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
