import React, { useState } from 'react';
import styles from './ProfilePage.css';

const UpdatePage = ({user}) => {
  const [bio, setBio] = useState('');
  const [token] = useState(window.localStorage.getItem('token'));
  const [bioSubmit, setBioSubmit] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  // Handles the change in input fields
  const handleChange = (event) => {
    if (event.target.id === 'bioedit') {
      setBio(event.target.value);
    } else if (event.target.id === 'firstNameEdit') {
      setFirstName(event.target.value);
    } else if (event.target.id === 'lastNameEdit') {
      setLastName(event.target.value);
    }
  };

  // Handles form submission for updating user data
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (token) {
      // Makes a PUT request to update user data
      fetch('/userData', {
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          bio: bio,
          firstName: firstName,
          lastName: lastName,
          type: event.target.id // Identifies the type of update
        })
      })
        .then(response => {
          if (response.status === 200) {
            console.log('Updated bio');
            window.location.reload(); // Reloads the page after successful update
            return response.json();
          } else {
            console.log('Update failed');
          }
        });
    }
  };

  return (
    <div>
      {/* Displays confirmation message when bio is updated */}
      {bioSubmit && (
        <div>
          <h2>Bio updated!</h2>
        </div>
      )}
      <span className='Pagetitle'>Update your Profile</span>
      <div style={{ '--spacer-height': '20px' }} className="spacer"></div>


      {/* Form for updating first name */}
      <form id="firstName" onSubmit={handleSubmit}>
      <span className='name'>First name</span>
      <br/>
        <input
          id="firstNameEdit"
          type='text'
          value={firstName}
          onChange={handleChange}
          className='Profileinput-oneline'
          placeholder="Update Your First Name"
        />
        <br/>
          <input type="submit" name="submit" value='Update' className='smallerButton'/>
      </form>

      <div style={{ '--spacer-height': '40px' }} className="spacer"></div>
      {/* Form for updating last name */}
      <form id="lastName" onSubmit={handleSubmit}>
      <span className='name'>Last Name</span>
      <br/>
        <input
          id="lastNameEdit"
          type='text'
          value={lastName}
          onChange={handleChange}
          className='Profileinput-oneline'
          placeholder="Update Your Last Name"
        />
        <br/>
          <input type="submit" name="submit" value='Update' className='smallerButton'/>
      </form>

      <div style={{ '--spacer-height': '40px' }} className="spacer"></div>
            {/* Form for updating bio */}
            <form id="bioSub" onSubmit={handleSubmit}>
        <span className='name'>Biography</span>
        <br/>
        <textarea
          id="bioedit"
          value={bio}
          onChange={handleChange}
          className={styles.bio}
          placeholder="Update Your Bio"
          className='Profileinput-multiline'
        />  
        <br/>
          <input type="submit" name="submit" value='Update' className='smallerButton'/>
      </form>
    </div>
  );
};

export default UpdatePage;
