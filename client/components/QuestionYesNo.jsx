import React from 'react'
import RadioChoice from './RadioChoice'
import ScrollableAnchor from 'react-scrollable-anchor'

export default function QuestionYesNo(props) {
  const questionIdentifier = "question-" + props.questionNum
  const anchorIdentifier = "Q-" + props.questionNum

  return (
    <ScrollableAnchor id={anchorIdentifier}>
      <form className="container mt-4">

        <h4>{props.questionNum}. {props.question}</h4>
        <RadioChoice identifier={questionIdentifier} radioValue={true}
          radioValueStr="true" stateValue={props.stateValue}
          callback={props.callback} label="Yes" />
        <RadioChoice identifier={questionIdentifier} radioValue={false}
          radioValueStr="false" stateValue={props.stateValue}
          callback={props.callback} label="No" />

      </form>
    </ScrollableAnchor>
  )
}
