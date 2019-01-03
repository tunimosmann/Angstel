import React, { Component } from 'react';
import "./styles/style.scss";
import firebase from "./firebase.js";
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import About from "./components/About.js";
import Journal from "./components/Journal.js";
import ToDo from "./components/ToDo.js";
import messages from "./messages.js";
import monster from "./assets/monster.svg";
import bubble from "./assets/bubble.svg";

//VARIABLES
//Login w/ Google in Firebase
const provider = new firebase.auth.GoogleAuthProvider();

//Firebase auth
const auth = firebase.auth();

//Angstl messages
let messageIndex = 0;
//VARIABLES END

//APP START
class App extends Component {
  //CONSTRUCTOR START
  constructor() {
    super();
    this.state = {
      //user info
      user: null, 
      greetingName: null,
      //Angstl messages
      message: messages[messageIndex]   
      }
    }
  //CONSTRUCTOR END

  //FUNCTIONS START
  //login
  logIn = () => {
    //signing in with a pop up and passing provider as an argument 
    //when user clicks log in use method signInWithPopup (provided by Firebase)  
    auth.signInWithPopup(provider).then((result) => { //result is the user info
      this.setState({
        user: result.user //the user info
      });
    });
  }

  //guest login
  guest = () => {
    //signing in with an anon method (provided by Firebase)
    auth.signInAnonymously().then((result) => { //result is th anon user info
      this.setState({
        user: result.user //anon user info
      });
    })
  }

  //logout
  logOut = () => {
    //when user clicks log out use method signOut (provided by firebase) 
    auth.signOut().then(() => {
      this.setState({
        user: null, //set user state and greeting name back to null
        greetingName: null      
      })
    })
  }

  // Change Message
  // changing the mascot message
  changeMessage = () => {     

    const messagesLength = messages.length - 1;

    //cycling through all messages
    if (messageIndex < messagesLength) {
      messageIndex = messageIndex + 1;
      this.setState({
        message: messages[messageIndex]
      })
    } else if (messageIndex === messagesLength) {
      messageIndex = 0; //going back to the first message
      this.setState({
        message: messages[messageIndex]
      })
    }   
  }  
  //FUNCTIONS END

  // RENDER START
  render() {
    return (
      //ROUTER START
      <Router>
      {/* APP START */}
      <div className="App">    
        {/* HEADER START */}
        <header className="header">
          {/* LOGIN START */}
          {
            this.state.user 
            ? (
            <div className="header__logInOut">
              <button className="header__button button button--simple" onClick={this.logOut}>Logout</button>
            </div>
            )
            : (
            <div className="header__logInOut">
                <button className="header__button button button--simple" onClick={this.logIn}>Login</button>

                <button className="header__button button button--simple button--color" onClick={this.guest}>Guest</button>
            </div>
            )
          }
          {/* LOGIN END */}

          <div className="header__wrapper wrapper">      
            <div className="header__headingContainer">
              <h1 className="header__h1"><span className="header__h1 header__h1--color">I CAN</span> Do List</h1>

              <h2 className="header__h2">A <span className="header__h2 header__h2--color">POSITIVE</span> To Do List</h2>
            </div>
          </div>
        </header>
        {/* HEADER END */} 

        {/* NAV START */}
        <nav className="nav">
          {/* MENU START */}
          <ul className="nav__wrapper wrapper">
            <li className="nav__item">
              <Link to="/" className="nav__link">Home</Link>
            </li>

            <li className="nav__item">
              <Link to="/journal" className="nav__link">Journal</Link>
            </li>

            <li className="nav__item">
              <Link to="/todo" className="nav__link">To Do</Link>
            </li>            

            <li className="nav__item">
              <Link to="/about" className="nav__link">About</Link>
            </li>
          </ul>
          {/* MENU END */}
        </nav>
        {/* NAV END */}

        {/* MAIN START */}
        <main className="main">
          {/* HOME START */}
          <section className="home">
            {
              this.state.user 
              ? (
                <div className="home__wrapper wrapper">
                      <h2 className="home__h2">It's good to see you, <span className="home__h2 home__h2--color">{this.state.greetingName}</span>!</h2>

                      <p className="home__text">Every day is a new opportunity, but if you're feeling overwhelmed or anxious, don't worry. It's ok to have bad days! Track those feelings in your <Link to="/journal" className="home__link">Anxiety Journal</Link>. </p>

                  <p className="home__text">Now let's do our best and rock that <Link to="/todo" className="home__link">To Do List</Link>!</p>
                </div>
              ) 
              : (
                <div className="home__wrapper wrapper">
                  <h2 className="home__h2">Welcome, <span className="home__h2 home__h2--color">friend!</span></h2>

                  <p className="home__text">This app was made for people affected by anxiety. It features an anxiety journal and a to do list. You can use it as a guest, but if you want to keep your journal and list for future access, please log in!</p>

                  <h3 className="home__h3">Anxiety Journal</h3>

                  <p className="home__text">We all have automatic thoughts, they might be good or bad, but we don't control them. What we can control is how we deal with them, and to do that we need to understand ourselves better, and what makes us anxious. Keeping a journal is a helpful way to track our thoughts and start discovering our triggers and patterns.</p>

                  <h3 className="home__h3">To Do List</h3>

                  <p className="home__text">You already know the cycle. You make a huge to do list, get overwhelmed by it, do nothing, hate yourself, repeat. This list was designed using common tools for fighting anxiety: do one task at a time, limit the length of your to do list, shift the focus from things that you have to do to things that you can do, and stay positive.</p>

                  <p className="home__text">No matter what you accomplish today, you're doing great!</p>
                </div>
              )
            }          
          </section>
          {/* HOME END */}

          {/* JOURNAL START */}
          <Route path="/journal" component={Journal}/>
          {/* JOURNAL END */}

          {/* TO DO LIST START */}
          <Route path="/todo" component={ToDo} />
          {/* TO DO LIST END */}

          {/* ABOUT START */}
          <Route path="/about" component={About}/>
          {/* ABOUT END */}

          {/* MASCOT START */}
          <section className="mascot">
            <div className="mascot__wrapper wrapper">

              {/* MASCOT TEXT BUBBLE START */}

              {/* BUBBLE START */}
              <div className="mascot__textBubble">
                <div className="mascot__bubbleContainer">
                  <img src={bubble} alt="A square speech bubble." className="mascot__bubble" />
                </div>
                {/* BUBBLE END */}

                {/* MESSAGE START */}
                <div className="mascot__messages">
                  <p className="mascot__text">
                    {this.state.message}
                  </p>
                </div>
                {/* MESSAGE END */}

              </div>
              {/* MASCOT TEXT BUBBLE END */}

              {/* MASCOT IMAGE START */}
              <div className="mascot__imageContainer">
                <img src={monster} alt="Friendly furry monster with two horns and a big smile." className="mascot__image" onClick={this.changeMessage} />
              </div>
              {/* MASCOT IMAGE END */}
            </div>
          </section>
          {/* MASCOT END */}
          </main>
        {/* MAIN END */}

        {/* FOOTER START */}
        <footer className="footer">
          {/* FOOTER WRAPPER START */}
          <div className="footer__wrapper wrapper">
            <p className="footer__text">Developed by  
            <a href="http://tuni.tech" target="_blank" className="footer__link footer__link--inline"> Tuni</a> | Ver. 1.2 | 2019</p>

            <a href="https://thenounproject.com/visuadio/" className="footer__link" target="_blank">Ribbon SVG by Felipe Alvarado from the Noun Project</a>

            <a href="https://thenounproject.com/made.somewhere/collection/speech-bubble/" className="footer__link" target="_blank">Speech mark SVG by Made by Made from the Noun Project</a>

            <a href="https://thenounproject.com/vectorsmarket/collection/cute-funny-monster-characters/" className="footer__link" target="_blank">Greek Monster SVG by Vectors Market from the Noun Project</a>  
          </div>
          {/* FOOTER WRAPPER END */}
        </footer>
        {/* FOOTER END */} 
      </div>
      {/* APP END */}
      </Router>
      //ROUTER END
    );
  }
  // RENDER END

  //COMPONENT DID MOUNT START
  componentDidMount() {

    //onAuthStateChanged checks if there is an user logged in (method provided by Firebase)
    auth.onAuthStateChanged((user) => {
      if (user) { //checking if user is logged in or had logged in recently
        this.setState({
          user: user
        },
        () => {
          //user's name
          if (this.state.user.displayName !== null) {
            const fullName = this.state.user.displayName.split(" ");
            const firstName = fullName[0];

            this.setState({
              greetingName: firstName
            })
          } else {
            this.setState({
              greetingName: "Guest"
            })
          }      
        })
      }      
    }) 
  }
  //COMPONENT DID MOUNT END
}
// APP END

export default App;

