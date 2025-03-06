import React, {useContext} from "react";
import User from "./User";
import { UserContext } from "../context/UserContext";


// PROP DRILLING
// const Child = ({ userName }) => {
//   return (
//     <div style={{ border: "1px solid gray", padding: "10px", margin: "10px" }}>
//       <h3>Child Component</h3>
//       <User userName={userName} />
//     </div>
//   );
// };



// CONTEXT API
function Child() {
  const username = useContext(UserContext);  //accessing context

  return(
    <h2>Welcome, {username}!</h2>
  )
}

export default Child;