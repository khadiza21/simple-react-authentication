import "./App.css";
import app from "../src/firebase.init";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useState } from "react";

const auth = getAuth(app);

function App() {
  const [user, setUser] = useState({});
  const provider = new GoogleAuthProvider(); //pop up provider

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // The signed-in user info.
        const user = result.user;
        console.log(user);
        setUser(user);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleGoogleSignOut = () => {
    signInWithPopup(auth, provider);
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        setUser({});
      })
      .catch((error) => {
        // An error happened.
        setUser({});
      });
  };

  return (
    <div className="App">
      {user.email ? (
        <button onClick={handleGoogleSignOut}>Sign Out</button>
      ) : (
        <button onClick={handleGoogleSignIn}>Google</button>
      )}
      <br />
      <br />
      <h2>Name: {user.displayName}</h2>
      <h2>Name: {user.email}</h2>
      <img src={user.photoURL} alt="" />
    </div>
  );
}

export default App;
