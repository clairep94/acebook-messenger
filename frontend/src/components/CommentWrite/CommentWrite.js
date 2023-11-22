import React, { useState } from 'react';
import getSessionUserID from '../utility/getSessionUserID';



const NewCommentForm = ({ updateComments, currentPost, navigate }) => {
    
    // =========== STATE VARIABLES ==========================
    const [message, setMessage] = useState("");
    const [token, setToken] = useState(window.localStorage.getItem("token"));
      let sessionUserID = getSessionUserID(token);



    // ============ FORM SUBMISSION FOR NEW POST ==================
    const handleSubmit = async (event) => {

        if(token){ // if user is logged in

            event.preventDefault(); 
            console.log(token);
            // Send POST request to '/posts' endpoint
            fetch( '/comments', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // necessary for requests that need login auth
                },
                body: JSON.stringify({ 
                    message: message,
                    author: sessionUserID
                 }) // <===== BODY OF REQUEST: message
                })
                .then(async response => {
                    let postData = await response.json();
                    console.log("token", postData)
                    console.log(`Post Data: ${postData.commentId}`)
                    window.localStorage.setItem("token", postData.token);
                    setToken(window.localStorage.getItem("token"));
                    
                    fetch(`/posts/${currentPost._id}/comment`, {
                        method: 'put',
                        headers: {
                          'Content-Type': 'application/json',
                          'Authorization': `Bearer ${token}`
                        },
                        body: JSON.stringify({newCommentID:postData.commentId})
                      }) // complete Put request & update token
                })
                


                // .then(response => {
                //     if(response.status === 201) {
                //     console.log('successful') 
                //     window.location.reload()// If successful, refresh current page as this should be the timeline and not the component
                //     const CreatedResponse = response.json()
                //     return CreatedResponse
                //     } else {
                //     console.log('not successful')
                //     navigate('/signup') // If unsuccessful, stay on the signup page
                //     }
                // })
                // .then(async postdata => {
                //     // Updates to a new token when the GET request is complete
                //     window.localStorage.setItem("token", postdata.token)
                //     setToken(window.localStorage.getItem("token"))
                //     console.log(token)

                // })
            }
        }

    // ------------ SUPPORTIVE FUNCTIONS: ----------------
    // FUNCTIONS FOR CHANGING STATE VARIABLES 
    const handleMessageChange = (event) => {
        setMessage(event.target.value)
    }


    // ========= JSX FOR THE UI OF THE COMPONENT =====================
    // one input field and a submit button

    return (
        <form onSubmit={handleSubmit} >

          <textarea id="message" value={message} onChange={handleMessageChange}  placeholder="Share your Thoughts on acebook..."/>
          <br/>
          <input id="submit" type="submit" value="Submit" />
      </form>
         
    )

}

export default NewCommentForm;