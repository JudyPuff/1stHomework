import React from 'react'

export default function QuestionYesNo(props) {
    let questionIdentifier = "question-" + props.questionNum

    return (
        <form className="container mt-4">
          <h4>{props.questionNum}. {props.question}</h4>
            <div className={questionIdentifier}>
              <label>
                <input type="radio" value="true" 
                  checked={props.stateValue === true}
                  onChange={ () => { props.callback(true) }}         
                />
                &nbsp;Yes
              </label>
            </div>
            <div className={questionIdentifier}>
              <label>
                <input type="radio" value="false" 
                  checked={props.stateValue === false}
                  onChange={ () => { props.callback(false) }}         
                />
                &nbsp;No
              </label>
            </div>
          </form>
      )
}
