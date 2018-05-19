import React from 'react'

export default function IneligibleMessage(props) {
    if (props.isWarning) {
        return (
            <div className="container text-white bg-warning">{props.message}</div>
        )
    } else {
        return (
            <div className="container text-white bg-danger">{props.message}</div>
        )
    }
}