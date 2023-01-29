import './App.css';
import {useEffect} from "react";
import Header from "./components/Header/Header"
import {useTelegram} from "./Hooks/useTelegram";

function App() {

    const {tg, onToggleButton} = useTelegram()

    useEffect(()=>{
        tg.ready()
    },[])

  return (
      <div className="App">
        <Header/>
          <button onClick={onToggleButton}>Toggle</button>
      </div>
  );
}

export default App;
