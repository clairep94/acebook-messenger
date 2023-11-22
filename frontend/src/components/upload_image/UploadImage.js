import React, { useState } from 'react';
import './UploadImage.css';

const UploadImage = ({ onImageUpload }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [imageUrl, setImageUrl] = useState(null); // State to store the uploaded image URL

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!selectedFile) {
            alert("Please select an image to upload.");
            return;
        }

        const formData = new FormData();
        formData.append('image', selectedFile);

        try {
            const response = await fetch('/upload_image', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) throw new Error('Upload failed.');

            const data = await response.json();
            setImageUrl(data.imageUrl); // Update state with the image URL
            if (onImageUpload) {
                onImageUpload(data.imageUrl); // Call the passed-in callback function with the image URL
            }
        } catch (error) {
            alert(`Error: ${error.message}`);
        }
    };

    return (
        <div className="imageComponentContainer">
            <h3>Upload Image Form</h3>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className='formContainer'>
                    <input type="file" onChange={handleFileChange} className="inputField" id="fileInput" style={{ display: 'none' }} />
                    <label htmlFor="fileInput" className="Button">Choose File</label>
                    <button type="submit" className="Button">Upload Image</button>
                </div>
            </form>
            {selectedFile?.name && <div className="Spacer">{selectedFile.name}</div>}
            {imageUrl && (
                <div className="imageContainer">
                    <img src={imageUrl} alt="Uploaded" className="uploadedImage" />
                </div>
            )}
        </div>
    );
};

export default UploadImage;
