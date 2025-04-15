import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Problems from "./components/Problems";
import Leaderboard from "./components/Leaderboard";
import Landing from "./components/Landing";
import CodeEditor from "./components/code-editor-standalone";
import AuthForm from "./components/Auth-Form";



export default function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/problems" element={<Problems />} />
          <Route path="/authenticate" element={<AuthForm />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/problems/:id" element={<CodeEditor />} />
        </Routes>
      </div>
    </Router>
  );
}
