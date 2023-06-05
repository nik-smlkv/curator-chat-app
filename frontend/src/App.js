import './App.css';
import { Button } from '@chakra-ui/react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import ChatPage from './components/ChatPage';
import NewsPage from './components/NewsPage';
import AdminPage from './components/AdminPage';

function App() {
   return (
      <div className="App">
         <Routes>
            <Route exact path='/' element={<HomePage />} />
            <Route exact path='/chats' element={<ChatPage />} />
            <Route exact path='/admin' element={<AdminPage />} />
            <Route exact path='/news' element={<NewsPage />} />
         </Routes>
      </div>
   );
}

export default App;
