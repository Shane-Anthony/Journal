import React, { useState } from "react";
import "./Styles.css";

const JournalEntryPopup= ({user,onClose}) => {
 
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [errorMessage, setErrorMessage] = useState("");

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleBodyChange = (event) => {
    setBody(event.target.value);
  };


  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate title and body
    if (!title || !body) {
      setErrorMessage("Please fill in both title and body fields.");
      return;
    }

    // Validate body length
    const wordCount = body.trim().split(/\s+/).length;
    if (wordCount > 200) {
      setErrorMessage("Body field cannot exceed 200 words.");
      return;
    }

    const data = {
      title: title,
      body: body,
      username: user.id,
    };

    try {
      const response = await fetch("http://localhost:8000/create-entry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        const result = await response.text();
        const parsedResult = result ? JSON.parse(result) : null;
        console.log("Entry Saved.");
       
        // Close the popup after successful save
        onClose();

      } else {
        console.log('Error:', response.status);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="popup">
      <div className="popup-inner">
        <p>Write a Journal entry.... {user.id}</p>
        <input
          value={title}
          onChange={handleTitleChange}
          placeholder="Title"
        />
        <textarea
          value={body}
          onChange={handleBodyChange}
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
        {errorMessage && <div className="error">{errorMessage}</div>}
        <button onClick={handleSubmit}>Save</button>
      </div>
    </div>
  );
}

export default JournalEntryPopup;
