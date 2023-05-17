import React, { useState } from "react";
import "./Styles.css";

const JournalEntryPopup= ({user,onClose}) => {
 
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [colour, setColour] = useState("#000000"); 
  const [errorMessage, setErrorMessage] = useState("");

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleBodyChange = (event) => {
    setBody(event.target.value);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImageFile(file);
  };

  const handleColourChange = (event) => {
    setColour(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Form submitted");

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

    const formData = new FormData();
    formData.append("title", title);
    formData.append("body", body);
    formData.append("username", user.id);
    formData.append("colour", colour);
    if (imageFile) {
      formData.append("image", imageFile);
    }
    console.log(formData);
    console.log(colour);
    try {
      const response = await fetch("http://localhost:8000/create-entry", {
        method: "POST",
        body: formData,
      });
      console.log("Form data:", formData);
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

  const inputStyle = {
    color: colour,
  };

  return (
    <div className="popup">
      <div className="popup-inner">
      <button className="close-button" onClick={onClose}>
          X
        </button>
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
          style={inputStyle}
        />
        <input type="file" onChange={handleImageChange} />
        <input
          type="color"
          value={colour}
          onChange={handleColourChange}
        />
        {errorMessage && <div className="error">{errorMessage}</div>}
        <button onClick={handleSubmit}>Save</button>
      </div>
    </div>
  );
}

export default JournalEntryPopup;
