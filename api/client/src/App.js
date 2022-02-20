import { HashRouter, Routes, Route } from 'react-router-dom';
import Header from "./components/Header";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

const App = () => {
  return (
    <HashRouter>
      <Header />
      <Routes>
        <Route path='/' component={Home} exact />
        <Route path='/about' component={About} />
        <Route path='/contact' component={Contact} />
      </Routes>
      <Footer />
    </HashRouter>
  );
}

export default App;
