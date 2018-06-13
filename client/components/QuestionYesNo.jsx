import React from 'react'
import RadioChoice from './RadioChoice'
import ScrollableAnchor from 'react-scrollable-anchor'

export default function QuestionYesNo(props) {
  const questionIdentifier = "question-" + props.questionNum
  const anchorIdentifier = "Q-" + props.questionNum

  return (
    <ScrollableAnchor id={anchorIdentifier}>
      <div className="container mt-4 ml-4 mr-4">
        <fieldset>
        <legend>{props.questionNum}. {props.question}</legend>
        <RadioChoice identifier={questionIdentifier} radioValue={true}
          radioValueStr="true" stateValue={props.stateValue}
          callback={props.callback} label="Yes" />
        <RadioChoice identifier={questionIdentifier} radioValue={false}
          radioValueStr="false" stateValue={props.stateValue}
          callback={props.callback} label="No" />
        </fieldset>
      </div>
    </ScrollableAnchor>
  )
}
