import React, { useState } from 'react';

function UserInput({ setDisplayName }) {
  const [inputName, setInputName] = useState('');

  const handleNameChange = (e) => {
    setInputName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setDisplayName(inputName);
  };

  return (
    <div className="UserInput">
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Enter Display Name" value={inputName} onChange={handleNameChange} />
        <button type="submit">Start Chat</button>
      </form>
    </div>
  );
}

export default UserInput;
