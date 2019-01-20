import React, { Component } from 'react';

class UserList extends Component { 
    // CONSTRUCTOR START
    constructor() {
        super();
        this.state = {
            // task completion state
            doable1Task: false,
            doable2Task: false,
            dailyGoalTask: false
        }
    }
    // CONSTRUCTOR END

    // FUNCTIONS START

    // Task done
    // updates task completion state and alerts message
    taskDone = (event) => { 
        const thisTask = event.target.id 

        if(this.state[thisTask] === false) {
            alert("You did it! Keep up the good work!");

            this.setState({
                [thisTask]: true
            })
        } else if (this.state[thisTask] === true) {
            this.setState({
                [thisTask]: false
            })
        }            
    }  
    
    // Reset Class
    // function to reset this component state
    resetClass = () => {
        this.setState({
            doable1Task: false,
            doable2Task: false,
            dailyGoalTask: false
        })
    }

    // Call Resets
    // function to call the function that will reset this component state and also calls the function in App.js that resets firebase
    callResets = (event) => {
        //preventing the button to refresh the page
        event.preventDefault();

        //calling the functions
        this.resetClass();
        this.props.resetList();
    }
    // FUNCTIONS END
    
    // RENDER START
    render() {
        return (
            this.props.dbRef.doable1
            ? (
            <div className="userList">
                <div className="userList__wrapper wrapper">
                    <h2 className="userList__h2">Things <span className="userList__h2 userList__h2--color">I Can</span> do Today</h2>

                    <ul className="userList__list">
                        {/* Changing the class and the icon */}
                        <li className={
                            this.state.doable1Task
                                ?
                                "userList__item--taskCompleted"
                                :
                                "userList__item"
                        }>
                            <span className="userList__item--color userList__item">#1</span> {this.props.dbRef.doable1} <span className="userList__span">
                                <i onClick={this.taskDone} id="doable1Task" className={
                                    this.state.doable1Task
                                        ?
                                        "userList__icon far fa-check-square"
                                        :
                                        "userList__icon far fa-square"
                                }>
                                </i>
                            </span>
                        </li>

                        <li className={
                            this.state.doable2Task
                                ?
                                "userList__item--taskCompleted"
                                :
                                "userList__item"
                        }>
                            <span className="userList__item--color userList__item">#2</span>  {this.props.dbRef.doable2} <span className="userList__span">
                                <i onClick={this.taskDone} id="doable2Task" className={
                                    this.state.doable2Task
                                        ?
                                        "userList__icon far fa-check-square"
                                        :
                                        "userList__icon far fa-square"
                                }>
                                </i>
                            </span>
                        </li>

                        <li className={
                            this.state.dailyGoalTask
                                ?
                                "userList__item--taskCompleted"
                                :
                                "userList__item"
                        }>
                            <span className="userList__item--color userList__item">#Final Boss!</span> {this.props.dbRef.dailyGoal} <span className="userList__span">
                                <i onClick={this.taskDone} id="dailyGoalTask" className={
                                    this.state.dailyGoalTask
                                        ?
                                        "userList__icon far fa-check-square"
                                        :
                                        "userList__icon far fa-square"
                                }>
                                </i>
                            </span>
                        </li>
                    </ul>

                    {/* resets the list in firebase and this component state */}
                    <input
                        onClick={this.callResets}
                        type="submit"
                        value="Reset the list" className="userList__resetListButton button"
                    />
                </div>
            </div>    
            
            ) 
            :
            (
            <div className="userList userList--empty">
            </div >
            )
        )
    }
    // RENDER END
}

export default UserList;