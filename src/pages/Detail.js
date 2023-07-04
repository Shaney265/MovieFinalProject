import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

import { ReviewForm } from '../components/ReviewForm';

import { useParams } from 'react-router-dom'

import { useContext, useState, useEffect } from 'react';
import { FBDbContext } from '../contexts/FBDbContext';
import { FBStorageContext } from '../contexts/FBStorageContext';
import { AuthContext } from '../contexts/AuthContext';
import { FBAuthContext } from '../contexts/FBAuthContext';
import { firebaseConfig } from '../config/Config.js'
import { doc, getDoc, addDoc, collection, getDocs } from "firebase/firestore";
import { ref, getDownloadURL,getStorage } from "firebase/storage";
import { onAuthStateChanged } from "firebase/auth";
import { initializeApp } from 'firebase/app';
import '../styles/Details.css'

initializeApp(firebaseConfig);
const storage = getStorage();

export function Detail(props) {
  const [movieData, setMovieData] = useState()
  const [auth, setAuth] = useState()
  const [movieReviews, setMovieReviews] = useState([])
  const [ reviewed, setReviewed]= useState (false)

  let { movieId } = useParams()

  const FBDb = useContext(FBDbContext)
  const FBStorage = useContext(FBStorageContext)
  const FBAuth = useContext(FBAuthContext)

  onAuthStateChanged(FBAuth, (user) => {
    if (user) {
      // user is signed in
      setAuth(user)
    }
    else {
      // user is not signed in
      setAuth(null)
    }
  })

/*   const getReviews = async () => {
    const path = `movies/${movieId}/reviews`
    const querySnapshot = await getDocs(collection(FBDb, path))
    let reviews = []
    querySnapshot.forEach((item) => {
      let review = item.data()
      review.id = item.id
      reviews.push(review)
    if(review.userid === auth.uid){
    setReviewed(true)
    }
    })
    setMovieReviews(reviews)
  } */

  const getReviews = async () => {
    const path = `movies/${movieId}/reviews`
    const querySnapshot = await getDocs(collection(FBDb, path));
    let reviews = [];
    let userReviewed = false;
    querySnapshot.forEach((item) => {
      let review = item.data();
      review.id = item.id;
      reviews.push(review);
      if (review.userid === auth?.uid) {
        userReviewed = true;
      }
    });
    setMovieReviews(reviews);
    setReviewed(userReviewed);
  };

  // reviews collection
  const ReviewCollection = movieReviews.map((item) => {
    return (
      <Col md="3">
        <h1></h1>
        <Card>
          <Card.Body>
            <Card.Title>
              <h5>{item.title}</h5>
            </Card.Title>
            <Card.Text>
              <p>{item.content}</p>
              <p>{item.stars} stars</p>
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    )
  })

  const movieRef = doc(FBDb, "movies", movieId)

  const getMovie = async () => {
    let movie = await getDoc(movieRef)
    if (movie.exists()) {
      setMovieData(movie.data())
      getReviews()
    }
    else {
      // no movie exists with the ID
    }
  }

  useEffect(() => {
    if (!movieData) {
      getMovie(movieId)
    }
  })

  // function to handle review submission
  const ReviewHandler = async (reviewData) => {
    // create a document inside firestore
    const path = `movies/${movieId}/reviews`
    const review = await addDoc(collection(FBDb, path), reviewData)
    // when the user submits a new review, refresh the reviews
    getReviews()
  }

  const Image = (props) => {
    const [imgPath, setImgPath] = useState()
    const imgRef = ref(FBStorage, `movie_cover/${props.path}`)
    getDownloadURL(imgRef).then((url) => setImgPath(url))

    return (
      <img src={imgPath} className="img-fluid" />
    )
  }
  

  if (movieData) {
    return (
      <Container >
        <Row className="my-3">
          <Col md="4">
            <Image path={movieData.image} />
          </Col>
          <Col md="8" >
            <h2 class="headingcolor"><strong>{movieData.title}</strong></h2>
            <h5> {movieData.genre} </h5>
            <strong>Year:</strong> {movieData.year}  <br/> <strong> Rating:</strong> {movieData.ratings}
            <p><strong>Weblink:</strong> <a href={movieData.imdb}>{movieData.imdb}</a></p> 
            <p></p>
            <p><strong>Synopsis:</strong></p>
            <p>{movieData.synopsis}</p>
            <p> <strong>Directors: </strong> {movieData.directors} <br /> <strong> Producers: </strong> {movieData.producers}</p>
            <p><strong>Main Actors: </strong>  {movieData.actors}  </p>
          </Col>
        </Row>
        <Row className="my-3">
          <Col md="6">
            <ReviewForm user={auth} handler={ReviewHandler} reviewed={reviewed} />
          </Col>
        </Row>
        <Row>
          <Col>
          {/* reviews to appear here */}
          {ReviewCollection}
          </Col>
        </Row>
        
      </Container>
    )
  }
  else {
    return (
      <Container>
                <Row>
          <Col>
          {/* reviews to appear here */}
          {ReviewCollection}
          </Col>
        </Row>
        
     
        <Row>
          <Col>
            <h2>Loading...</h2>
          </Col>
        </Row>
      </Container>
  );
}
}
