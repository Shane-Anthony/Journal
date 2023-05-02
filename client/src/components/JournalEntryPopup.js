import React, { useState } from 'react';
import './Styles.css';

function JournalEntryPopup(props) {
  const [text, setText] = useState('');

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const handleSave = () => {
    // Save the journal entry text and customization options
    // ...
    // Close the popup
    props.onClose();
  };

  return (
    <div className="popup">
      <div className="popup-inner">
        <textarea
          value={text}
          onChange={handleChange}
          placeholder="Write your journal entry here..."
        />
        <div className="options">
          <select>
            <option>Font 1</option>
            <option>Font 2</option>
            <option>Font 3</option>
          </select>
          <select>
            <option>Small</option>
            <option>Medium</option>
            <option>Large</option>
          </select>
        </div>
        <button onClick={handleSave}>Save</button>
      </div>
    </div>
  );
}

export default JournalEntryPopup;
