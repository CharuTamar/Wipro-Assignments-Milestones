import './App.css';
import Parent from './components/Parent';
import { UserContext } from './context/UserContext';

function App() {
  // PROP DRILLING
  // return(
  //   <div>
  //     <h1>Prop Drilling vs context API</h1>
  //     <Parent userName="John"/>
  //   </div>
  // )

  // CONTEXT API
  return(
    <UserContext.Provider value="Joe Ben">
      <h1>Prop Drilling vs Context API</h1>
      <Parent/>
    </UserContext.Provider>
  )
}

export default App;