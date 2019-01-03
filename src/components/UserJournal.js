import React, { Component } from 'react';

class UserJournal extends Component {
    // CONSTRUCTOR START
    constructor() {
        super();
        this.state = {
        }
    }
    // CONSTRUCTOR END

    // RENDER START
    render() {
        return (
            this.props.dbRefJournal[0]
            ? (
            <div className="userJournal">
                <div className="userJournal__wrapper wrapper">
                    <h2 className="userJournal__h2">My Anxiety Journal</h2>

                    {
                    this.props.dbRefJournal.map((entry) => {
                        return (
                            <div className="userJournal__entry" key={entry[0]}>
                                <h3 className="userJournal__h3">{entry[1].date}</h3>

                                <p className="userJournal__text">Situation: {entry[1].situation}</p>
                      
                                <p className="userJournal__text">Feelings: {entry[1].feelings}</p>
                               
                                <p className="userJournal__text">Physical Reaction: {entry[1].physicalReaction}</p>

                                {
                                    entry[1].anxietyLevel 
                                    ? (
                                    <p className="userJournal__text">Anxiety Level: {entry[1].anxietyLevel}</p>
                                    )
                                    : (
                                    <p className="userJournal__text userJournal__text--empty"></p>
                                    )
                                }
                                
                                {
                                    entry[1].notes 
                                    ? (
                                    <p className="userJournal__text">Notes: {entry[1].notes}</p>
                                    )
                                    : (
                                    <p className="userJournal__text userJournal__text--empty"></p>
                                    )
                                }   
                            </div>
                        )
                    })
                    }
                </div>
            </div>
            )
            : (
            <div className="userJournal userJournal--empty">
            </div>
            )
        )
    }
    // RENDER END
}

export default UserJournal;