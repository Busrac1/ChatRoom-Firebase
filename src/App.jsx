import { useEffect } from "react";
import AuthPage from "./pages/AuthPage";
import { auth } from "./firebase/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { useState } from "react";
import ChatPage from "./pages/ChatPage";

function App() {
  const [isAuth, setIsAuth] = useState();
  const [room,setRoom]= useState(null);

  useEffect(() => {
    // auth  değerinin değişimini izler. giriş çıkışları
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuth(true);
      } else {
        setIsAuth(false);
      }
    });
  }, []);
   
  const handleSubmit= (e) => {
    e.preventDefault();

    setRoom(e.target[0].value)
  }
  // login sayfasına yönlendirme oturum kapalıysa
  if(isAuth === false){
    return(
      <div className="container">
      <AuthPage />
    </div>
    )
  }

  return (
    // room değişkeni varsa chat bas , yoksa aşağıdaki formu ekrana bas.
    <div className="container">
        { room ? (
           <ChatPage  room={room} setRoom={setRoom}/>
           ) : (

            <form onSubmit={handleSubmit} className="room-page">
            <h1>Chat Odası</h1>
            <p>Hangi odaya gireceksiniz?</p>
  
            <input required type="text" placeholder="örn:haftasonu" />
            <button className="submit">Odaya gir</button>
            <button className="button">Çıkış yap</button>
       
           </form>
           )
        }
    </div>
  );
}

export default App;
