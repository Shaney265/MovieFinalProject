import Form from "react-bootstrap/Form"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"
import { doc, getDoc, setDoc } from "firebase/firestore";

import { useState, useEffect, useContext } from "react"
import { FBAuthContext } from "../contexts/FBAuthContext"
import { FBDbContext } from "../contexts/FBDbContext"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { useNavigate } from "react-router-dom"

export function Signup ( props ) {
  const [ email, setEmail ] = useState("")
  const [ password, setPassword ] = useState("")
  const [ validEmail, setValidEmail ] = useState(false)
  const [ validPassword, setValidPassword ] = useState( false )
  const [ username, setUserName ] = useState("")
  const [ validUserName, setValidUserName ] = useState( false )
  const [userNameFeedback, setUserNameFeedback] = useState ()

  const FBAuth = useContext( FBAuthContext)
  const FBDb = useContext ( FBDbContext )
  const navigate = useNavigate()

  const allowedChars = "abcdefghijklmnopqrstuvwxyz1234567890_-" 

  // timer variable
  let timer 

  // function to check firebase if user already exsists
  const checkUser = async (user) => {
  const ref = doc( FBDb, "usernames", user )
  const docSnap = await getDoc( ref )
 
  if( docSnap.exists () ) {
 //user already exsists  
  console.log ("exsists")
    
    setValidUserName(false)

    setUserNameFeedback("Username already exsists!")  }

else{
  //user doesnt exsist
    console.log ("doesn't exsists")
    setValidUserName(true)
    setUserNameFeedback(null)
   

    }
  }

  useEffect( () => {
    let userLength = false
    let illegalChars = []

    // check if the username is of a certian length

    if( username.length < 5 ) {
      userLength = false
      console.log ("minimum 5 characters")

    }
    else{
      userLength = true
    }
    // check if username is made of allowedChars

    const chars = Array.from(username)

    chars.forEach((chr) => {
      if( allowedChars.includes(chr) === false) {
        illegalChars.push ( chr )
        console.log("illegal character detected")
      }  
     
    })

    // check if username does not exist in Firebase only if the other 2 checks are successful first
    if (userLength === true && illegalChars.length === 0) {
      clearTimeout ( timer )
      timer = setTimeout ( () => { checkUser(username) }, 800 )
    }
  }, [username])

// if both are true then allow signup
// else do not allow signup

  useEffect( () => {
    if( email.indexOf('@') > 0 ) {
      setValidEmail( true )
    }
    else {
      setValidEmail( false )
    }
  }, [email] )

  useEffect( () => {
    if( password.length >= 8 ) {
      setValidPassword( true )
    }
    else {
      setValidPassword(false)
    }
  }, [password])

  const AddUserName = async () => {
    await setDoc(doc(FBDb, "usernames", username), {
    name: username,
    email: email,
    password: password,
  })
}

  const SignUpHandler = () => {
    createUserWithEmailAndPassword( FBAuth, email, password )
    .then( ( user ) => {
      // user is created in Firebase
      // console.log(user)
      // alert user that account has been created

      AddUserName()
      navigate("/")
    })
    .catch( (error) => {
      console.log( error.code, error.message )
    })
  }

  // function functionName() {} OR () => {}

  return (
      <Container fluid className="mt-4">
        <Row>
          <Col md={{span: 4, offset: 4}}>
            <Form onSubmit={ (evt) => { 
              evt.preventDefault()
              SignUpHandler()
              } }>
              <h3>Sign up for an account</h3>
              {/* input for username */}
              <Form.Group>
                <Form.Label>Username</Form.Label>
                <Form.Control 
                  type="text"
                  placeholder="unique username"
                  onChange={(evt) => setUserName(evt.target.value)}
              
                  value={username}
                  isInvalid={userNameFeedback !== null}
                                     
                  isValid ={userNameFeedback === null}
                />
                <Form.Control.Feedback> Looks Good</Form.Control.Feedback>
              
              
                <Form.Control.Feedback  type= "invalid">{userNameFeedback}</Form.Control.Feedback>

              </Form.Group>
              <Form.Group>
                <Form.Label>Email address</Form.Label>
                <Form.Control 
                  type="email" 
                  placeholder="you@domain.com"
                  onChange={(evt) => setEmail(evt.target.value) }
                  value={email}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control 
                  type="password" 
                  placeholder="minimum 8 characters" 
                  onChange={ (evt) => setPassword(evt.target.value) }
                  value={password}
                />
              </Form.Group>
              <Button 
                variant="primary" 
                type="submit" 
                className="my-2 w-100" 
                size="lg" 
                disabled = { ( validEmail && validPassword && validUserName ) ? false : true }
              >
                Sign up
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
  )
}

