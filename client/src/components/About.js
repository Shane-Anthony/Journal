import React from 'react';
import Sidebar from './Sidebar';

function AboutPage() {
  return (
    <div>
        <Sidebar />
        <div className="main-content">
            <h1>About Jurnal</h1>
            <p>Welcome to our journal app! Our goal is to help you keep track of your thoughts, feelings, and experiences.</p>
            <p>You can create new entries, view past entries, and even share entries with other users.</p>
            <p>Whether you're using our app for personal or professional reasons, we hope it provides you with the assistance you need.</p>
        </div>

    </div>
  );
}

export default AboutPage;
