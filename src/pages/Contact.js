import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import '../styles/About.css'

import { useContext, useEffect, useState } from 'react';
import { collection, getDocs } from "firebase/firestore";
import { ref, getDownloadURL, getStorage } from "firebase/storage";

import { FBDbContext } from '../contexts/FBDbContext';
import { FBStorageContext } from '../contexts/FBStorageContext';

export function Contact () {

const storage = getStorage();



getDownloadURL(ref(storage, 'movie_cover/Contactus3.jpg'))
  .then((url) => {
    const img = document.getElementById('myimg');
    img.setAttribute('src', url);
    if (img) {
        img.setAttribute('src', url)
        } 
        else {
          console.log('img is null')
      }
  })



    return (
        <Container >
       
            <Col >
            <h1></h1>

            <div >
                <center><h1>
                    </h1> <img id="myimg" src="" alt="Contactus3" /> <h1><p></p></h1>
                    <h1> Welcome to Animation Movie Madness!!</h1>
                    <h1><p></p></h1>
                    <h1></h1>
                    <h3> Classics, Modern and Niche Titles</h3>
                
                <h5><p>A place to browse, search or reaquaint yourself with some wonderful animated movies</p> <p> Feel free to browse and read through all the existing reviews or sign up to submit your own.</p></h5>
                </center>
            
            
            </div>

 
           
            </Col>
        </Container>
    )
}







/* export function Contact () {
    return (
        <div>
            <h1>Contact</h1>
        </div>
    )
} */