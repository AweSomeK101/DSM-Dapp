import { Routes, Route, Navigate } from "react-router-dom";
import useWeb3Context from "./context/Web3Context";
import { GlobalProvider } from "./context/Global";
import Welcome from './pages/Welcome';
import Twitter from "./pages/Twitter";
import Feed from "./components/Feed";
import Profile from "./components/Profile";
import "./App.css";



function App() {
  const {state: {account}} = useWeb3Context();
  return (  
    <Routes>
      <Route exact index path="/Welcome" element={<Welcome />} />
      <Route path="/" element={
        account === "" ? 
          <Navigate to="/Welcome" replace={true} /> : 
          <GlobalProvider><Twitter /></GlobalProvider>
      }>
        <Route path="/" index element={<Feed />} />
        <Route path="profile" element={<Profile />} >
          <Route path=":username" element={<Profile />} />
        </Route>
      </Route>
    </Routes>
  );
}
export default App;
