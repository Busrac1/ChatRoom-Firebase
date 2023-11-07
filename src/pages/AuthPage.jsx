import { signInWithPopup, signInWithRedirect } from "firebase/auth"
import { auth, provider } from "../firebase/firebaseConfig"


const AuthPage = () => {

  const handleClick= () => {
    signInWithRedirect(auth,provider)
  }
  return (
    <div className='auth'>
<h1>Chat Odası</h1>
<p>devam etmek için giriş yapın</p>

<button onClick={handleClick}>
  <img src="/google.png" />
  <span>Google ile giriş yapın</span>
</button>
    </div>
  )
}

export default AuthPage