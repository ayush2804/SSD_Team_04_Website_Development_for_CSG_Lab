import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const LoadImage = () => {
  const [profName, setprofName] = useState('');
  const [profRole, setprofRole] = useState('');
  const [image, setImage] = useState(null);
  const [allImage, setAllImage] = useState(null);

  useEffect(() => {
    getImage();
  }, []);

  const submitImage = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", image);
    formData.append("profName", profName);
    formData.append("profRole", profRole);

    try {
      const result = await axios.post(
        "http://localhost:3000/upload-image",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (result.status === 200) {
        console.log('Image uploaded successfully');
        // Optionally, you can reset the form or perform other actions after successful submission
        setprofName('');
        setprofRole('');
        setImage(null);
        fetchImagesData(); // Fetch updated image data
      } else {
        console.error('Error uploading image');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const onInputChange = (e) => {
    setprofName(e.target.value);
  };

  const onRoleChange = (e) => {
    setprofRole(e.target.value);
  };

  const onFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const getImage = async () => {
    try {
      const result = await axios.get("http://localhost:3000/get-image");

      if (result.status === 200) {
        setAllImage(result.data.data);
      } else {
        console.error('Error fetching images data');
      }
    } catch (error) {
      console.error('Error fetching images data:', error);
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Adjust the number of slides shown at once
    slidesToScroll: 1,
    centerMode: true,
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <form onSubmit={submitImage} style={formStyle}>
        <label style={labelStyle}>Prof Name:</label>
        <input
          type="text"
          value={profName}
          onChange={onInputChange}
          style={inputStyle}
          required
        />
        <label style={labelStyle}>Prof Role:</label>
        <input
          type="text"
          value={profRole}
          onChange={onRoleChange}
          style={inputStyle}
          required
        />
        <label style={labelStyle}>Upload Image:</label>
        <input
          type="file"
          accept="image/*"
          onChange={onFileChange}
          style={fileInputStyle}
          required
        />
        <button type="submit" style={submitButtonStyle}>
          Submit
        </button>
      </form>
      <h2>Faculty Data</h2>
      <table style={{ width: '70%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ddd', padding: '8px', fontSize: '14px' }}>Image</th>
            <th style={{ border: '1px solid #ddd', padding: '8px', fontSize: '14px' }}>Name</th>
            <th style={{ border: '1px solid #ddd', padding: '8px', fontSize: '14px' }}>Role</th>
          </tr>
        </thead>
        <tbody>
          {allImage &&
            allImage.map((data) => (
              <tr key={data._id.$oid}>
                <td style={{ border: '1px solid #ddd', padding: '8px', fontSize: '14px' }}>
                  <img
                    src={`/images/${data.image}`}
                    height={50}
                    width={50}
                    alt={data.name}
                    style={{ marginBottom: '8px' }}
                  />
                </td>
                <td style={{ border: '1px solid #ddd', padding: '8px', fontSize: '14px' }}>{data.name}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px', fontSize: '14px' }}>{data.role}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

// Define styles
const formStyle = {
  width: '300px', 
  margin: '1px', 
  padding: '20px',
  border: '1px solid #ccc',
  borderRadius: '8px',
};

const labelStyle = {
  marginBottom: '5px',
  fontSize: '14px',
  display: 'block',
};

const inputStyle = {
  marginBottom: '10px',
  padding: '8px',
  fontSize: '14px',
  width: '100%', // Make the input full width
};

const fileInputStyle = {
  marginBottom: '10px',
  fontSize: '14px',
  width: '100%', // Make the file input full width
};

const submitButtonStyle = {
  padding: '8px 12px',
  fontSize: '14px',
  cursor: 'pointer',
  backgroundColor: '#4CAF50', // Green color
  color: 'white',
  border: 'none',
  borderRadius: '4px',
};

const sliderItemStyle = {
  textAlign: 'center',
};

export default LoadImage;
