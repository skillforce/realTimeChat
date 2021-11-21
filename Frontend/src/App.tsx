import React from 'react';
import './App.css';
import {LongPolling} from './longPolling/DialogPage/LongPolling';
import {EventSoursing} from './EventSoursing/DialogPage/EventSoursing';
import {WebSock} from './webSocket/DialogPage/WebSocket';


function App() {






    return (
        <div className="App">
            <WebSock />
        </div>
    );
}

export default App;
