import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changeName } from "../store/slices/name.slice";


const InputName = () => {

  const [ userName, setUserName ] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const enterName = () => {
    dispatch(changeName(userName))
    navigate('/pokedex')
  }

  return (
    <div className="welcome-div">
      <h1>Hello trainer!</h1>
      <p>Please, enter your name :D</p>
     <div className="welcome-input-and-btn">
      <input 
        type="text" 
        onChange={e => setUserName(e.target.value)}
        value={userName}/>
      <button onClick={enterName}>Enter</button>
     </div>
    </div>
  );
};

export default InputName;