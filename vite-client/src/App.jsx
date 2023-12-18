import "./App.css";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/Landing/LandingPage";
import Home from "./pages/Home/Home";
import Detail from "./components/Detail/Detail";
import { useDispatch, useSelector } from "react-redux";
import { Dialog } from "./components/Dialog/Dialog";
import { setErrors, setMessages } from "./redux/actions";
import Forms from "./pages/Form/Forms";

function App() {
  const errors = useSelector((state) => state.error);
  const messages = useSelector((state) => state.message);
  const dispatch = useDispatch();

  const clouseErrorDialog = () => {
    dispatch(setErrors(null));
  };
  const clouseMessageDialog = () => {
    dispatch(setMessages(null));
  };

  return (
    <>
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/videogame/create" element={<Forms />} />
        <Route exact path="/videogame/:id" element={<Detail />} />
      </Routes>
      {errors && <Dialog errors={errors} clouseDialog={clouseErrorDialog} />}
      {messages && (
        <Dialog messages={messages} clouseDialog={clouseMessageDialog} />
      )}
    </>
  );
}

export default App;
