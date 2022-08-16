import {BrowserRouter,Route,Routes} from "react-router-dom"
import Login from "./components/Login";
import Register from "./components/Register";
import Protected from "./components/Protected";
import Todo from "./components/Todo";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login/>}></Route>
        <Route path="/Register" element={<Register/>}></Route>
        <Route path="/Todo" element={<Protected><Todo/></Protected>}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
