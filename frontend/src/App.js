import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Homepage from "./pages/homepage/Homepage";

function App() {

  return (

    <Router>

      <Routes>

        <Route path="/" element={< Homepage />} />

      </Routes>

    </Router>

  );

}

export default App;