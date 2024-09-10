import React from 'react';
import './App.css';
import ProfileCard from './ProfileCard';

function App() {
  return (
    <div className="App">
      <ProfileCard
        imageUrl="https://upload.wikimedia.org/wikipedia/en/0/03/Walter_White_S5B.png"
        name="Jeffrey Abrams"
        age={51}
        location="New York, United States"
        description="American film director, producer, and screenwriter known for action, drama, and sci-fi."
        skills={["Directing", "Producing", "Writing"]}
        lastSeenDate={new Date('2024-09-06T10:00:00')}
      />
      <ProfileCard
        imageUrl="https://upload.wikimedia.org/wikipedia/en/6/69/Gustavo_Fring_BCS_S3E10.png"
        name="Jane Doe"
        age={28}
        location="Los Angeles, United States"
        description="Digital artist and graphic designer specializing in 3D art and animations."
        skills={["Graphic Design", "3D Modeling", "Animation"]}
        isOnline={true}
      />
    </div>
  );
}

export default App;
