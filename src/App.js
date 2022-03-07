import React, {useState} from "react";
import './App.css';
import Sidebar from './Sidebar';
import Chat from "./Chat";
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import Login from "./Login";
import {useStateValue} from './StateProvider';


function App() {

  //2:31:31
  //const [user, setUser] = useState(true);
  const [{user}, dispatch] = useStateValue(); //Pull the user from the data layer //2:53:37

  return (
    <div className="app">
      {!user ? (

      // <h1>Log In</h1>
      <Login />
      
      ):(
        <div className='app__body'>
        <Router> {/*where we tell the app to start looking at the URL -->2:16:50 */}
        <Sidebar />
            <Routes> {/*Switch -> Routes */}
            
              <Route path="/rooms/:roomId" element ={<><Chat /></>} /> {/*roomId -->@:19:17 */}
              <Route path="/" element ={<><Chat /></>} />  
                
              
              
            </Routes>
        </Router>
      </div>
      )}
      
    </div>
  );
}

export default App;
