
import './App.css';
import Header from './componets/Header';
import Contents from './componets/Contents';
import { HashRouter, Route} from 'react-router-dom';
import Navigation from './componets/Navigation';
import Join from './componets/Join';
import Board from "./componets/Board";
import BoardWrite from './componets/BoardWrite';
import BoardDetail from './componets/BoardDetail';
import DayBoard from './componets/DayBoard';

function App() {
  return (
    <div className="App">
      

      <Header/>
      <HashRouter>
          <Navigation />
            <Route path= "/" exact={true} component={Contents}/>

            <Route path= "/join" component={Join}/>
            <Route path= "/board" component={Board}/>
            <Route path= "/board-detail" component={BoardDetail}/>
            <Route path= "/board-write" component={BoardWrite}/>
            <Route path= "/day-board" component={DayBoard}/>
      </HashRouter>
        
    </div>
  );
}

export default App;
