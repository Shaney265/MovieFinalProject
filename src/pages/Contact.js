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

export function Contact() {

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
                <h1 class= "headingcolor" >Head Office</h1>
                <p >23 Holiday Dr, Newport NSW 2686</p>
                <p>contactus@amm.com.au</p>
                <p>02 9569 4585</p>
                </center>
                </Col>
                <Col  > 
                <center class ="borderdesign">
                <h1 class= "headingcolor">Help Desk</h1>
                <p class = "textcolor" > Issues regarding your account.</p>
                <p> Contact 1800 6558 212</p>
                <p>Between 9am - 6pm</p>
                </center>
                </Col>
{/*                 <Col > 
                <center>
                <h1>Advertising</h1>
                <p>This is another paragraph.</p>
                </center>
                </Col> */}
            </Row>
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