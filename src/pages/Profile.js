import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import '../styles/Contact.css'

import { useContext, useEffect, useState } from 'react';
import { collection, getDocs } from "firebase/firestore";
import { ref, getDownloadURL, getStorage } from "firebase/storage";

import { FBDbContext } from '../contexts/FBDbContext';
import { FBStorageContext } from '../contexts/FBStorageContext';

export function Profile() {

    const storage = getStorage();



    getDownloadURL(ref(storage, 'movie_cover/underconstruction.jpg'))
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
            <Row>

                
                    <h1></h1>

                    <div >
                        <center>
                        <img id="myimg" src="" alt="Contactus3" />
                        </center>
                        <h1></h1>

                    </div>
                
            </Row>
            <Row>
 
                <Col  > 
                <center class ="borderdesign">
                <h1 class= "headingcolor">Stay Tuned!!!</h1>
                <p class = "textcolor" > Fun profile page is coming soon</p>
                <p>If you have specific questions </p>
                <p> Contact Help Desk 1800 6558 212  <br/> Between 9am - 6pm</p>
                <p>Or send us an email to contactus@amm.com.au </p>
                <p></p>
                </center>
                </Col>

            </Row>
        </Container>
    )
}
