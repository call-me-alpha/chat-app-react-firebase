import {
  Routes,
  Route
} from "react-router-dom";
import Login from './components/Login'
import ChatRoom from './components/ChatRoom'
import AuthProvider from './Context/AuthProvider'
import AppProvider from "./Context/AppProvider";
import AddRoom from "./components/Modals/AddRoom";
import InviteMember from "./components/Modals/InviteMember";

function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <Routes >
          <Route path="/" element={<ChatRoom />} />
          <Route path="/login" element={<Login />} />
        </Routes >
        <AddRoom />
        <InviteMember />
      </AppProvider>
    </AuthProvider>
  );
}

export default App;
