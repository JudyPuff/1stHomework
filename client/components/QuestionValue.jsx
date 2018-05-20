import React from 'react'
import RadioChoice from './RadioChoice'

export default function QuestionValue(props) {
    const questionIdentifier = "question-" + props.questionNum
    let enteredValue = 0

    return (
        <div className="container mt-4">
          <h4>{props.questionNum}. {props.question}</h4>
            <input className="ml-4" type="number" min="0" defaultValue={0} name="questionIdentifier" onChange={ (e) => {
                props.callbackUpdate(e.target.value)}} />
            <span className="ml-2">year(s)</span>
            <button className="ml-5" onClick={props.callback}>Next</button>
          </div>
      )
}