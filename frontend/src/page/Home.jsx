import React, { useState, useEffect } from 'react';
import { signOut } from "firebase/auth";
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import ImageGrid from '../components/ImageGrid';
import './Home.css';

const Home = () => {

    const [imageURLs, setImageURLs] = useState([]);
    const routes = ["http://127.0.0.1:5000/get_aws_images", "http://127.0.0.1:5000/get_google_drive_images"]
    const colors = ["#ffffff", "#1b1b1b"]
    const [selectedIndex, setSelectedIndex] = useState(0); 

    useEffect(() => {
        setImageURLs([]);
        fetch(routes[selectedIndex])
           .then((response) => response.json())
           .then((data) => {
              console.log(data);
              setImageURLs(data['imageURLs']);
           })
           .catch((err) => {
              console.log(err.message);
           });
     }, [selectedIndex]);

    const handleClick = () => {
        const newIndex = selectedIndex ^ 1;
        setSelectedIndex(newIndex);
    };

    const navigate = useNavigate();
 
    const handleLogout = () => {               
        signOut(auth).then(() => {
        // Sign-out successful.
            navigate("/");
            console.log("Signed out successfully")
        }).catch((error) => {
        // An error happened.
        });
    }

    return(
        <>
            <div className="home-screen">
                <div className="navbar">
                    <div className="logo-parent">
                        <div className="logo-icon"><img src="/logo.svg" alt="Filter Pixel Logo"/></div>
                        <div className="logo-text"><p>FilterPixel</p></div>
                    </div>
                    <button className="btn" onClick={handleLogout}>
                        <span className="logo-text">Hi Keshav!</span>
                        <span className="profile-icon">
                            <img src="/profile.png" alt="Profile Image"/>
                        </span>
                    </button>
                </div>
                <div className="grid-selector">
                    <button className="image-button" onClick={handleClick} style={{ backgroundColor: colors[selectedIndex], color: colors[selectedIndex ^ 1] }}>
                        <span>AWS</span>
                    </button>
                    <button className="image-button" onClick={handleClick} style={{ backgroundColor: colors[selectedIndex ^ 1], color: colors[selectedIndex] }}>
                        <span>Google</span>
                    </button>
                </div>
                <ImageGrid imageUrls={imageURLs}/>
                
            </div>
        </>
    )
}

export default Home;
