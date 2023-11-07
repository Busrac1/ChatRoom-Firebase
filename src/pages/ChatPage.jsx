import { addDoc, collection, onSnapshot, serverTimestamp, query,where, orderBy } from "firebase/firestore";
import { db, auth } from '../firebase/firebaseConfig';
import { useEffect, useState } from "react";
import Messages from "../components/Messages";


const ChatPage = ({room, setRoom}) => {
  // mesaj state tut
  const [messages, setMessages] = useState([])
  // koleskisyonun freransını alma
 const messagesCol= collection(db, "messages");

 console.log(auth)

  // formun gönderilmesi
  const handleSubmit = async (e) => {
    e.preventDefault();
   const text = e.target[0].value;

  //  mesaj yazma /döküman ekleme
   await addDoc(messagesCol, {
    text,
    room,
    user:{ 
      name: auth.currentUser.displayName,
      photo:auth.currentUser.photoURL,
      uid: auth.currentUser.uid,
    },
    createdAt: serverTimestamp(),
   });
  }
   
  useEffect(()=> {
    // filrtelme tanımlama
   const  queryOptions= query(
     messagesCol, 
      where("room" , "==", room),
      orderBy("createdAt", "asc"))
    // kolesiyon değişimini izleme
    // kolesksiyon her deiştiğinde fonk çalıştırma
    // ekran görüntüsü alır ve değişiminler old fark güncel halini ekler
   const unsubscribe= onSnapshot(queryOptions, (snapshot) => {
     const comingMessages = [];

    //  dokumanları dönüp doc içindekiler verilere erişip, diziye aktar
    // mesaj içeriği - dokumantasyon içeriği
     snapshot.docs.forEach((doc) => comingMessages.push({...doc.data(), id:doc.id}));
    
     setMessages(comingMessages)
    })

    return () =>{
      // bileşenden çıkınca izlemme dursun diye.
      unsubscribe();
    }
  }, [])
  console.log(messages)
  return (
    <div className="chat">
     <header>
      <p className="user">kullanıcı adı</p>
      <p>{room}</p>
      <a onClick={() => setRoom(null)}>Farklı oda</a>
     </header>
     <main>
    {messages.map((msg) => (

     <Messages key={msg.id} msg={msg} />
    ))}
     </main>

     <form onSubmit={handleSubmit}>
      <input required type="text" placeholder="mesajınızı yazınız.." />
      <button>Gönder</button>
     </form>
    </div>
  );
};

export default ChatPage
