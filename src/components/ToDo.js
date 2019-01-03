import React, { Component } from 'react';
import firebase from "../firebase.js";
import UserList from "./UserList.js";

//VARIABLES
const auth = firebase.auth();

//COMPONENT START   
class ToDo extends Component {
    //CONSTRUCTOR START
    constructor() {
        super();
        this.state = {
            //user 
            user: null,
            //user to do list
            doable1: "",
            doable2: "",
            dailyGoal: "",
            //information sent to firebase is stored here when firebase returns the info, it has to have the same structure or react will be faster than firebase and will try to retrieve info that firebase didn't had time to return yet
            dbRef: {
                doable1: "",
                doable2: "",
                dailyGoal: "",
            }
        } 
    }
    //CONSTRUCTOR END

    //FUNCTIONS START

    //Handle Change
    //value being typed updating the respective state property in constructor
    handleChange = (event) => {
        //updating state using the id of the input where the user is typing, id is the same as its correspondent key in state
        this.setState({
            [event.target.id]: event.target.value
        })
    }

    //Handle Submit
    //submitting user entries
    handleSubmit = (event) => {
        //preventing the form from refreshing the page
        event.preventDefault();

        if (this.state.doable1.trim() === "" || this.state.doable2.trim() === "" || this.state.dailyGoal.trim() === "") {
            alert("Please enter a task.");
        } else {
            //making a variable to store the data that will be sent to firebase
            const updateList = {
                doable1: this.state.doable1,
                doable2: this.state.doable2,
                dailyGoal: this.state.dailyGoal
            };

            //sending the info to firebase
            //using set so the user updates the list instead of creating a new list
            this.dbRef.set(updateList);

            //clearing form and state
            this.setState({
                doable1: "",
                doable2: "",
                dailyGoal: ""
            })
        }
    }

    //Reset List
    //reseting whole list
    resetList = () => {

        //making a variable to store empty values to be sent to firebase
        const newList = {
            doable1: "",
            doable2: "",
            dailyGoal: ""
        }

        //updating firebase with the empty object
        this.dbRef.set(newList);
    }

    //FUNCTIONS END

    //RENDER START
    render () {
        return (
            <section className="toDo">
                {
                    this.state.user
                    ? (
                        // TO DO USER ENTRIES START
                        <div className="userEntries">
                            <div className="userEntries__wrapper wrapper">
                                <h2 className="userEntries__h2 userEntries__h2--color">Today...</h2>

                                {/* TO DO FORM START */}
                                <form onSubmit={this.handleSubmit} action="" className="userEntries__form form">

                                    <label htmlFor="doable1" className="form__label"><span className="form__span">I can</span>  finish this task:</label>
                                    <textarea required
                                        type="text"
                                        onChange={this.handleChange}
                                        id="doable1"
                                        className="form__field"
                                        value={this.state.doable1}
                                        ></textarea>

                                    <label htmlFor="doable2" className="form__label"><span className="form__span">If</span> I'm done with the first task I'll <span className="form__span">focus</span> on doing this:</label>
                                    <textarea required
                                        type="text"
                                        onChange={this.handleChange}
                                        id="doable2"
                                        className="form__field"
                                        value={this.state.doable2}
                                        ></textarea>

                                    <label htmlFor="dailyGoal" className="form__label">This task scares me but <span className="form__span">I'll try my best</span> to accomplish it today:</label>
                                    <textarea required
                                        type="text"
                                        onChange={this.handleChange}
                                        id="dailyGoal"
                                        className="form__field"
                                        value={this.state.dailyGoal}
                                        ></textarea>

                                    <input type="submit" value="You've got this!" className="form__submit button" />
                                </form>
                                {/* TO DO FORM END */}
                            </div>
                        </div>
                        // TO DO USER ENTRIES END
                    )
                    : (
                        <div className="userEntries">
                            <div className="userEntries__wrapper wrapper">
                                <p className="userEntries__text userEntries__text--logOut">To use this section please log in with your <span className="userEntries__span">Google account</span> or as a <span className="userEntries__span">Guest</span>.</p>
                            </div>
                        </div>
                    )
                }

                {/* TO DO LIST DISPLAY */}
                <UserList
                    dbRef={this.state.dbRef}
                    resetList={this.resetList}
                />
            </section>
        )
    }
    //RENDER END

    //COMPONENT DID MOUNT START
    componentDidMount() {
        auth.onAuthStateChanged((user) => { 
            if (user) {
                this.setState({
                    user: user
                }, () => {
                    //id specific to that user
                    this.dbRef = firebase.database().ref(`/${user.uid}/toDoList`); //it's creating dbref in state

                    //attaching our event listener to firebase, everytime there's a change, update
                    this.dbRef.on("value", snapshot => {
                        //check to see if snapshot.val() is null, if it is, we need to set state to an empty object, if it's got data, set the state to snapshot.val()
                        this.setState({
                            dbRef: snapshot.val() || {}, //if its null set to an empty object  
                        })
                    })
                })
            } else {
                this.setState({
                    user: null,
                    doable1: "",
                    doable2: "",
                    dailyGoal: "",
                    dbRef: {
                        doable1: "",
                        doable2: "",
                        dailyGoal: "",
                    }
                })
            }
        })
    }
    //COMPONENT DID MOUNT END

    //COMPONENT WILL UNMOUNT START
    //turning off the event listener, so when an user logs in it'll not see info from another user
    componentWillUnmount() {
        if (this.dbRef) {
            this.dbRef.off();
        }
    }
    //COMPONENT WILL UNMOUNT END
}

export default ToDo;