
import './index.css'
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import 'katex/dist/katex.min.css';

const root = document.getElementById("root");

//pages
import Example from './pages/About';
import Home from './pages/Home';
import Information from './pages/Information';
import Scan from './pages/Scan';
import About from './pages/About';

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/information" element={<Information />} />
      <Route path="/scan" element={<Scan />} />
      <Route path="/about" element={<About />} />
    </Routes>
  </BrowserRouter>,
);
