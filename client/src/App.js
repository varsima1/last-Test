import './App.css';
import ArrowToUp from './Components/ScrollToTopButton';
import { Footer } from './Components/Footer';
import Router from './Router';
import withLoader from './Components/loader/withLoader';
import Header from './Components/Header';

function App() {
  return (
    <div className="App">
      <Header/>
    <ArrowToUp/>
      <Router/>
    <Footer/>
    </div>
  );
}

export default withLoader(App);