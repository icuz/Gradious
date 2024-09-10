import React, { useState, useEffect } from 'react';
import './App.css';
import ProfileCard from './ProfileCard';

function App() {
  const [profiles, setProfiles] = useState([]);

  // Load profiles from the JSON file
  useEffect(() => {
    fetch('/profiles.json')
      .then(response => response.json())
      .then(data => setProfiles(data));
  }, []);

  return (
    <div className="App">
      {profiles.map(profile => (
        <ProfileCard
          key={profile.id}
          imageUrl={profile.imageUrl}
          name={profile.name}
          age={profile.age}
          location={profile.location}
          description={profile.description}
          skills={profile.skills}
          isOnline={profile.isOnline}
          lastSeenDate={profile.lastSeenDate ? new Date(profile.lastSeenDate) : null}
        />
      ))}
    </div>
  );
}

export default App;
