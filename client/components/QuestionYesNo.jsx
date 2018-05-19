import React from 'react'

export default function QuestionYesNo(props) {
    let questionIdentifier = "question-" + props.questionNum

    return (
        <form className="container">
          <h3>{props.questionNum}. {props.question}</h3>
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
