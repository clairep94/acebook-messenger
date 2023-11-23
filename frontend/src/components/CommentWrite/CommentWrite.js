import React, { useState } from 'react';
import getSessionUserID from '../utility/getSessionUserID';
import styles from './CommentWrite.module.css'
import useFetchUserDataByID from '../utility/getselectuserinfo';


const NewCommentForm = ({ currentPost }) => {
  const [message, setMessage] = useState('');
  const [token, setToken] = useState(window.localStorage.getItem('token'));
  let sessionUserID = getSessionUserID(token);

  const handleSubmit = async (event) => {
    if (token) {
      event.preventDefault();
      
      fetch('/comments', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ 
          message: message,
          author: sessionUserID
        })
      })
      .then(async response => {
        let postData = await response.json();
        console.log('Post Data:', postData);
        window.localStorage.setItem('token', postData.token);
        setToken(window.localStorage.getItem('token'));

        if (response.status === 201) {
          console.log('Successful POST request');
          // Return the fetch promise for chaining
          return fetch(`/posts/${currentPost._id}/comment`, {
            method: 'put',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ newCommentID: postData.commentId })
          });
        } else {
          console.log('Unsuccessful POST request');
        }
      })
      .then(response => {
        if (response && response.status === 201) {
          console.log('Successful PUT request');
          window.location.reload(); // Refresh the page after successful PUT request
        } else {
          console.log('Unsuccessful PUT request');
        }
      })
      .catch(error => {
        console.error('Error during fetch:', error);
      });
    }

  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  // Get the parent post's author's first name:
  const threadAuthor = currentPost.user_id.firstName

    // ========= JSX FOR THE UI OF THE COMPONENT =====================
    // one input field and a submit button

    return (
        // <form onSubmit={handleSubmit} >

    //       <textarea id="message" value={message} onChange={handleMessageChange}  placeholder="Share your Thoughts on acebook..."/>
    //       <br/>
    //       <input id="submit" type="submit" value="Submit" />
    //   </form>
         
    // )
    <>
    <div >
        <form onSubmit={handleSubmit} className={styles.Form} >
            <textarea id="message" value={message} onChange={handleMessageChange} className={styles.textarea} placeholder={`Replying to ${threadAuthor}...`} />
            <br />
            <div className={styles.buttonsrow}>
                {/* <input type="file" onChange={handleFileChange} className={styles.Button} /> */}
                <input id="submit" type="submit" value="Submit" className={styles.Button} />

            </div>

        </form>
    </div>
</>
);

}


export default NewCommentForm;