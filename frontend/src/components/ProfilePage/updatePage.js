import React, { useEffect, useState } from 'react';
import styles from './ProfilePage.css'

const UpdatePage = ({navigate}) =>{
  const [bio, setBio] = useState("")
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [bioSubmit, setBioSubmit] = useState('')

  // handles the change so you can see what you're typing
  const handleBioChange = (event) => {
    setBio(event.target.value)
  }
  
// most of this is a modified version of the make post function
const handleSubmit = async (event) => {
  // checks if token (if user signed in)
  if(token){
    
    event.preventDefault();
    // submits bio
    setBioSubmit(bio);
    //uses put rather than post to update
    fetch('/userData', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    },
    // there may be a way to modify this so we can send diffrent requests 
    // to update a profile pic or display name
    body : JSON.stringify({
    bio: bio
    })
    })
    .then(response =>{
      // the respone code is 200 for a put request rather than 201
      // not sure if its necessary or just convention  
      if(response.status === 200){
        console.log("updated bio")
        return response.json()
      }
      else{
        console.log("did not work")
      }
    })
    
    }  
  
  };
  
    return( 
      <div>
        <a href='/profile' class="right" >return to your page</a>

       
          {/* This is conditonal, if you dont change your bio it wont display  */}
          {/* also check it our, I just learnt how to to comment in react :) */}
      {bioSubmit && (
          <div>
           
            <h2>Bio updated!</h2>
            
      
          </div>
        )}
      {/* button for submiting the put request  */}
      <form onSubmit={handleSubmit}>
          {/* handles the change so you can see what you're typing  */}
      <textarea id="bioedit" value={bio} onChange={handleBioChange} className={styles.bio} placeholder="write some shit no one will read"/>
      <label>
          update your bio
          <input type="submit" name="submit"/>
        </label>
       

        
      </form>
      
      
      </div>
      
  
    )
    
  }
export default UpdatePage