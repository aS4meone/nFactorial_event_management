import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import EventDetails from './pages/EventDetails/EventDetails';
import MyEventsPage from "./pages/MyEventsPage/MyEventsPage";

function App() {
    return (
        <Router>
            <div>
                <Header/>
                <Routes>
                    <Route path="/" element={<Main/>}/>
                    <Route path="/events/:id" element={<EventDetails/>}/>
                    <Route path="/my_events" element={<MyEventsPage/>} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
