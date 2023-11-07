import { auth } from "../firebase/firebaseConfig";

const Messages = ({ msg }) => {
  console.log(msg);

  // mesajı gönderen kişi oturumu açık olan kişiyle eşleşirse
  if (msg.user.uid === auth.currentUser.uid) {
    return <p className="msg-user">{msg.text}</p>;
  }

//   başkası gönderirirse-
  return (
    <div className="msg-other">
      <p>
          <img src={msg.user.photo} />
          <span>{msg.user.name}</span>
      </p>

      <p className="msg-text">
        {msg.text}
      </p>
    </div>
  );
};

export default Messages;
