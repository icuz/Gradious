import React from 'react';

function ProfileCard({ imageUrl, name, age, location, description, skills, isOnline, lastSeenDate }) {
  const renderLastSeen = () => {
    if (!lastSeenDate) return null;

    const now = new Date();
    const diffInMilliseconds = now - lastSeenDate;
    const diffInHours = Math.floor(diffInMilliseconds / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));

    if (diffInHours < 24) return `Last seen ${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    if (diffInDays < 7) return `Last seen ${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    return 'Last seen several days ago';
  };

  return (
    <div className="profile-card">
      <div className="profile-image">
        <img src={imageUrl} alt={`${name}'s Profile`} />
      </div>
      <div className="profile">
        <p><strong>{description}</strong></p>
        <p id='earning'>Skills: {skills.join(', ')}</p>
        <div className='profile-details'>
          <h2>{name}, {age}</h2>
          <p>{location}</p>
          <button id='cv'>VIEW CV</button>
          <button id='offer'>MAKE OFFER</button>
          <p>{isOnline ? '🟢Online' : renderLastSeen()}</p>
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;
