import React, { useEffect, useState } from 'react';
import styles from './ProfilePage.css'

const UpdatePage = ({navigate}) =>{
  const [bio, setBio] = useState("")
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [bioSubmit, setBioSubmit] = useState('')
  const [displayName, setDisplayName ] = useState('')
  // handles the change so you can see what you're typing
  const handleChange = (event) => {
    if(event.target.id === "bioedit"){
      setBio(event.target.value)
    }
    else if (event.target.id === "nameEdit")
    setDisplayName(event.target.value)
    
  }
  
  
  
// most of this is a modified version of the make post function
const handleSubmit = async (event) => {
  

  // checks if token (if user signed in)
  if(token){
    
    event.preventDefault();
    
    //uses put rather than post to update
    // and goes to new route user data because it needs to check the token
    fetch('/userData', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    },
    // this has been modified to change the request when the update bio or update
    // display name is clicked, its not super efficient (probobly should figure out how to only send necessary data) 
    //  but it works
    
    body : JSON.stringify({
    bio: bio,
    disName: displayName,
    type: event.target.id
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
      <form id="bioSub" onSubmit={handleSubmit}>
          {/* handles the change so you can see what you're typing  */}
      <textarea id="bioedit" value={bio} onChange={handleChange} className={styles.bio} placeholder="write some shit no one will read"/>
      <label>
          update bio
          <input type="submit" name="submit"/>
        </label>
       

        
      </form>
      <form id="name" onSubmit={handleSubmit}>
          {/* handles the change so you can see what you're typing  */}
      <textarea id="nameEdit" value={displayName} onChange={handleChange} className={styles.bio} placeholder="update your name "/>
      <label>
      update your display name
          <input type="submit" name="submit"/>
        </label>
       

        
      </form>
      
      
      </div>
      
  
    )
    
  }
export default UpdatePage