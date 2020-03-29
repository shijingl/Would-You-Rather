import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import TitleBar from './TitleBar'
import { formatDate } from '../utils/helpers'
import { FaCheck } from 'react-icons/fa'
import { handleSaveQuestionAnswer } from '../actions/shared'

class PollDetails extends Component {
    state = {
        selectedOption: ''
    }

    selectRadio = (e) => {
        this.setState({
            selectedOption: e.target.value
        })
    }

    submitAnswer = (e) => {
        e.preventDefault()

        const { saveQuestionAnswer } = this.props
        const answer = this.state.selectedOption
        saveQuestionAnswer(answer)
    }

    render() {
        const { question, authorAvatar, timestamp, author, optionOne, optionTwo, answered, isOneAnswered, isTwoAnswered } = this.props
        const optionOneVotes = question.optionOne.votes.length
        const optionTwoVotes = question.optionTwo.votes.length
        const optionOnePercetage = (optionOneVotes / (optionOneVotes + optionTwoVotes) * 100).toFixed(2)
        const optionTwoPercentage = (optionTwoVotes / (optionOneVotes + optionTwoVotes) * 100).toFixed(2) 

        return (
            <Fragment>
                <TitleBar />
                <div className="form margin poll-details-form">
                    <div className="form-header">
                        <p className="form-title">Would You Rather</p>
                    </div>
                    {
                        answered
                        ? (
                            <div className='form-body no-bottom-round'>
                                <ul className='no-padding no-margin'>
                                    <li className="fix-answered-li full-width">
                                        <span className={isOneAnswered ? 'answered' : ''}>{optionOne}</span>
                                        {isOneAnswered ? <FaCheck className='padding-left answered'/> : null}
                                        <span className='vote-result'>{`${optionOneVotes} vote(s) | ${optionOnePercetage}%`}</span>
                                    </li>
                                    <li className="no-padding fix-answered full-width">
                                        <div className='or-seperator'>
                                            <hr/>
                                            <p className='inline-p'>OR</p>
                                            <hr/>
                                        </div>
                                    </li>
                                    <li className="no-padding fix-answered-li full-width">
                                        <span className={isTwoAnswered ? 'answered' : ''}>{optionTwo}</span>
                                        {isTwoAnswered ? <FaCheck className='padding-left answered'/> : null}
                                        <span className='vote-result'>{`${optionTwoVotes} vote(s) | ${optionTwoPercentage}%`}</span>
                                    </li>
                                </ul>
                            </div>
                        )
                        : (
                            <form onSubmit={this.submitAnswer} className="form-body no-bottom-round">
                                <div className="radio_container-div">
                                    <label className="radio_container">
                                        <span className="input_radio">{optionOne}</span>
                                        <input
                                            className='hide'
                                            type='radio'
                                            name='select_option'
                                            value='optionOne'
                                            onClick={this.selectRadio}
                                        />
                                        <span className="checkmark"></span>
                                    </label>

                                    <label className="radio_container">
                                        <span className="input_radio">{optionTwo}</span>
                                        <input 
                                            className='hide'
                                            type='radio'
                                            name='select_option'
                                            value='optionTwo'
                                            onClick={this.selectRadio}
                                        />
                                        <span className='checkmark'></span>
                                    </label>
                                </div>
                                <button className="button">Submit</button>
                            </form>
                        )
                    }
                    <div className="user-details">
                        <ul className="user-detail-ul nav nav-account block">
                            <li className="user-info-li inline-block">
                                <img
                                    src={authorAvatar}
                                    alt={`Avatar of ${author}`}
                                    className='scale-down-mid profile-pic vertical-align' 
                                />
                                <span className="padding-left">{author}</span>
                            </li>
                            <li className="time-stamp user-info-li block">
                                { timestamp }
                            </li>
                        </ul>
                    </div>
                </div>
            </Fragment>
        )
    }
}

function mapStateToProps ({authedUser, questions, users}, props) {
    const { question_id } = props.match.params
    const question = questions[question_id]
    const authorAvatar = users[question.author].avatarURL
    const author = users[question.author].id
    const timestamp = formatDate(question.timestamp)
    const optionOne = question.optionOne.text
    const optionTwo = question.optionTwo.text
    const isOneAnswered = question.optionOne.votes.includes(authedUser)
    const isTwoAnswered = question.optionTwo.votes.includes(authedUser)
    const answered = isOneAnswered || isTwoAnswered

    return {
        authorAvatar,
        author,
        timestamp,
        optionOne,
        optionTwo,
        answered,
        isOneAnswered, 
        isTwoAnswered, 
        question, 
        users,
        questions,
        authedUser,
        question_id,
    }
}

function mapDispatchToProps(dispatch, props) {
    const { question_id } = props.match.params
    return {
        saveQuestionAnswer: (answer) => {
            dispatch(handleSaveQuestionAnswer(question_id, answer))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PollDetails)