import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
    <div className="profile-card">
      <div className="profile-image">
        <img src="https://imgs.search.brave.com/FlZqWF7uihR5fnp_ZR_1PF72SuaxpsT2r9psa7rCuV4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9teW5l/d21pY3JvcGhvbmUu/Y29tL3dwLWNvbnRl/bnQvdXBsb2Fkcy8y/MDE5LzA3L21ubV9I/b3dfVG9fSG9sZF9B/X01pY3JvcGhvbmVf/V2hlbl9QdWJsaWNf/U3BlYWtpbmdfQW5k/X1ByZXNlbnRpbmdf/bGFyZ2UuanBn" alt="Profile" />
      </div>
      <div className="profile">
        <p><strong>Film Director, Producer</strong></p>
        <p id='earning'>€14/hour</p>
        <div className='profile-details'>
          <h2>Jeffrey Abrams, 51</h2>
          <p>New York, United States</p>
          <p>
            Jeffrey Abrams is an American film director, producer, and screenwriter. He is known for his work in the genres of action, drama, and science fiction.
          </p>
          <button id='cv'>VIEW CV</button>
          <button id='offer'>MAKE OFFER</button>
          <p>🟢Online</p>
        </div>
      </div>
    </div>
  </div>
  );
}

export default App;