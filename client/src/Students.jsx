import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function LoadImage() {
  const [profName, setProfName] = useState('');
  const [age, setAge] = useState('');
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
    formData.append("age", age);

    try {
      const result = await axios.post("http://localhost:3000/students", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (result.status === 200) {
        // Handle success, if needed
        console.log('Image uploaded successfully');
        // Refresh the image list after successful upload
        getImage();
      } else {
        // Handle error, if needed
        console.error('Error uploading image');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const onInputChange = (e) => {
    setProfName(e.target.value);
  };

  const onAgeChange = (e) => {
    setAge(e.target.value);
  };

  const onFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const getImage = async () => {
    try {
      const result = await axios.get("http://localhost:3000/students");
      setAllImage(result.data.data);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

// Define styles
const formStyle = {
  width: '300px', // Set your desired width
  margin: '10px', // Center the form horizontally
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
  width: '100%', 
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


  return (
    <div>
      <form onSubmit={submitImage} style={formStyle}>
        <h4>Enter Student's Data</h4>
        <label style={labelStyle}>Student Name:</label>
        <input type="text" value={profName} onChange={onInputChange} style={inputStyle} />

        <label style={labelStyle}>Age:</label>
        <input type="text" value={age} onChange={onAgeChange} style={inputStyle} />

        <label style={labelStyle}>Upload Image:</label>
        <input type="file" accept="image/*" onChange={onFileChange} style={fileInputStyle} />

        <button type="submit" style={submitButtonStyle}>
          Submit
        </button>
      </form>


      <h2>Student's Data</h2>
      <table style={{ width: '70%', borderCollapse: 'collapse', marginBottom: '20px' }}>
        <thead>
          <tr>
            <th style={tableHeaderStyle}>Image</th>
            <th style={tableHeaderStyle}>Student Name</th>
            <th style={tableHeaderStyle}>Age</th>
          </tr>
        </thead>
        <tbody>
          {allImage == null
            ? ""
            : allImage.map((data) => (
                <tr key={data._id.$oid}>
                  <td style={tableCellStyle}>
                    <img
                      src={`/images/${data.image}`}
                      height={50}
                      width={50}
                      alt={data.name}
                    />
                  </td>
                  <td style={tableCellStyle}>{data.name}</td>
                  <td style={tableCellStyle}>{data.age}</td>
                </tr>
              ))}
        </tbody>
      </table>

    </div>
  );
}

// Define styles
const tableHeaderStyle = {
  border: '1px solid #ddd',
  padding: '8px',
  fontSize: '14px',
  background: '#f2f2f2',
};

const tableCellStyle = {
  border: '1px solid #ddd',
  padding: '8px',
  fontSize: '14px',
};
export default LoadImage;
