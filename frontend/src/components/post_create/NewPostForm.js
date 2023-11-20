import React, { useState } from 'react';
import styles from './newPostForm.module.css';

const NewPostForm = ({ navigate }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [message, setMessage] = useState("");
    const [token, setToken] = useState(window.localStorage.getItem("token"));

    const handleMessageChange = (event) => {
        setMessage(event.target.value);
    };

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const createPost = async (imageUrl) => {
        const postPayload = {
            message: message,
            imageUrl: imageUrl
        };

        try {
            const response = await fetch('/posts', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(postPayload)
            });

            if (response.status === 201) {
                navigate('/posts');
            } else {
                navigate('/signup');
            }
        } catch (error) {
            console.error('Error creating post:', error);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (selectedFile && token) {
            const formData = new FormData();
            formData.append('image', selectedFile);

            try {
                const response = await fetch('/upload_image', {
                    method: 'POST',
                    body: formData,
                    headers: { 'Authorization': `Bearer ${token}` },
                });

                if (!response.ok) throw new Error('Image upload failed.');

                const data = await response.json();
                setImageUrl(data.imageUrl);
                createPost(data.imageUrl); // Create post after image upload
            } catch (error) {
                alert(`Image Upload Error: ${error.message}`);
            }
        } else {
            createPost(null); // Create post without image
        }
    };

    return (
        <>
            <div>
                <form onSubmit={handleSubmit} className={styles.Middle}>
                    <textarea id="message" value={message} onChange={handleMessageChange} className={styles.textarea} placeholder="Share your Thoughts on acebook..." />
                    <br />
                    <input type="file" onChange={handleFileChange} className={styles.inputField} />
                    <br />
                    <input id="submit" type="submit" value="Submit" className={styles.Button} />
                </form>
            </div>
        </>
    );
}

export default NewPostForm;
