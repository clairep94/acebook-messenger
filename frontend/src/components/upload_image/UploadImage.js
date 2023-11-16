import React, { useState } from 'react';

const UploadImage = () => {
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
            const response = await fetch('/upload_image', {   //call the route in backend
                method: 'POST',
                body: formData,
            });

            if (!response.ok) throw new Error('Upload failed.');

            const data = await response.json();
            setImageUrl(data.imageUrl); // Update state with the image URL
        } catch (error) {
            alert(`Error: ${error.message}`);
        }
    };

    return (
        <div>
            <h3>Upload Image Test Form</h3>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <input type="file" onChange={handleFileChange} />
                <button type="submit">Upload Image</button>
            </form>
            {imageUrl && <img src={imageUrl} alt="Uploaded" style={{ marginTop: '20px' }} />} {/* Display the image */}
        </div>
    );
};

export default UploadImage;