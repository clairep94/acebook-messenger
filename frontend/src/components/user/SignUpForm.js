import React, { useState } from 'react';
import styles from './SignUpForm.module.css';

// Signup Page
const SignUpForm = ({ navigate, onSignupSuccess }) => {

  // STATE VARIABLES ==========================
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("")

  // FORM SUBMISSION FOR NEW USER ====================

  const handleSubmit = async (event) => {
    event.preventDefault(); 
    // Send POST request to '/users' endpoint
    fetch( '/users', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        firstName: firstName, // TODO set to title case
        lastName: lastName, // TODO set to title case
        fullName: `${firstName} ${lastName}`,
        email: email, // <====== UNIQUE
        password: password, // TODO create password rules like length, char types, etc.
        bio: null,
      }) 
    })
      .then(async response => {
        if(response.status === 201) {
          onSignupSuccess();
          
        } else {
          const errorData = await response.json();
          setError(errorData.message)
          console.log(errorData.message)
        }
      })
  }

  // FUNCTIONS FOR CHANGING STATE VARIABLES ==================
  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value)
  }

  const handleLastNameChange = (event) => {
    setLastName(event.target.value)
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }



  // JSX FOR THE UI OF THE COMPONENT =====================
    // currently shows two input fields and one button with no styling.
    return (<div className={styles.Middle}>
      <form onSubmit={handleSubmit}>
        {error && <p className={styles.errorMessage}>{error}</p>}
          <input placeholder="First Name" id="first_name" type='text' value={ firstName } className={styles.inputField} onChange={handleFirstNameChange} />
          <br/>
          <input placeholder="Last Name" id="last_name" type='text' value={ lastName } className={styles.inputField} onChange={handleLastNameChange} />
          <br/>
          <input placeholder="Email" id="email" type='text' value={ email } className={styles.inputField} onChange={handleEmailChange} />
          <br/>
          <input placeholder="Password" id="password" type='password' value={ password } className={styles.inputField} onChange={handlePasswordChange} />
          <br/>
          <br/>
        <input id='submit' type="submit" className={styles.Button} value="Submit"/>
      </form>
    </div>
);
}


export default SignUpForm;
