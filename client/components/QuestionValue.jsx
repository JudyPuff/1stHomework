import React from 'react'
import RadioChoice from './RadioChoice'
import ScrollableAnchor from 'react-scrollable-anchor'

export default function QuestionValue(props) {
  const questionIdentifier = "question-" + props.questionNum
  const anchorIdentifier = "Q-" + props.questionNum
  let enteredValue = 0

  return (
    <ScrollableAnchor id={anchorIdentifier}>
      <div className="container mt-4">
        <h4>{props.questionNum}. {props.question}</h4>
        <span className="ml-4">{props.preLabel}</span>
        <input type="number" min="0" defaultValue={0} name="questionIdentifier" onChange={(e) => {
          props.callbackUpdate(e.target.value)
        }} />
        <span className="ml-2">{props.postLabel}</span>
        <button className="ml-5" onClick={props.callback}>Next</button>
      </div>
    </ScrollableAnchor>
  )
}