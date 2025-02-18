import { useState } from "react";
import "./App.css";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import { Chat } from "stream-chat-react";
import { StreamChat } from "stream-chat";
import Cookies from "universal-cookie";
import JoinGame from "./components/JoinGame";

function App() {
  const api_key = "bbnrv7jp8dds";
  const cookies = new Cookies();
  const token = cookies.get("token");

  const [isAuth, setIsAuth] = useState(false);

  const client = StreamChat.getInstance(api_key);

  function logout() {
    cookies.remove("token");
    cookies.remove("userId");
    cookies.remove("firstName");
    cookies.remove("lastName");
    cookies.remove("username");
    cookies.remove("hashedPassword");
    cookies.remove("channelName");
    client.disconnectUser();
    setIsAuth(false);
  }

  if (token)
    client
      .connectUser(
        {
          id: cookies.get("userId"),
          name: cookies.get("username"),
          firstName: cookies.get("firstName"),
          lastName: cookies.get("lastName"),
          hashedPassword: cookies.get("hashedPassword"),
        },
        token
      )
      .then(() => setIsAuth(true));

  return (
    <div className="App">
      {isAuth ? (
        <Chat client={client}>
          <div>
            <JoinGame />
            <button className="btn" onClick={logout}>
              Logout
            </button>
          </div>
        </Chat>
      ) : (
        <>
          <SignUp setIsAuth={setIsAuth} />
          <Login setIsAuth={setIsAuth} />
        </>
      )}
    </div>
  );
}

export default App;
