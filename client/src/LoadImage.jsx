import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


function LoadImage() {
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

    const result = await axios.post(
      "http://localhost:3000/upload-image",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
  };
  const onInputChange = (e) => {
    setprofName(e.target.value);
  };

  const onRoleChange = (e) => {
    setprofRole(e.target.value);
  };

  const onFileChange = (e) => {
    console.log(e.target.files[0]);
    setImage(e.target.files[0]);
  };


  const getImage = async () => {
    const result = await axios.get("http://localhost:3000/get-image");
    console.log(result);
    setAllImage(result.data.data);
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
    <div>
      <form onSubmit={submitImage} style={{ marginBottom: '20px' }}>
        {/* Your form inputs */}
        <input type="file" accept="image/*" onChange={onFileChange}></input>
         <label>
           Prof Name:
           <input
            type="text"
             value={profName}
             onChange={onInputChange}
           />
         </label>
         <label>
           Prof Role:
           <input
             type="text"
             value={profRole}
             onChange={onRoleChange}
           />
         </label>
         <button type="submit">Submit</button>
      
      </form>
      <Slider {...settings}>
        {allImage == null
          ? ""
          : allImage.map((data) => (
              <div key={data._id.$oid} style={{ textAlign: 'center' }}>
                <img
                  src={`/images/${data.image}`}
                  height={100}
                  width={100}
                  alt={data.name}
                  style={{ marginBottom: '8px' }}
                />
                <p>{data.name}</p>
                <p>{data.role}</p>
              </div>
            ))}
      </Slider>
    </div>
  );
}
export default LoadImage;
