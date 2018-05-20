import React from 'react'

export default function RadioChoice(props) {

    return (
        <div className={props.identifier}>
            <label>
            <input type="radio" value={props.radioValueStr}
                checked={props.stateValue === props.radioValue}
                onChange={ () => { props.callback(props.radioValue) }}         
            />
            &nbsp;{props.label}
            </label>
        </div>
      )
}