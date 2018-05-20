import React from 'react'

export default function IneligibleMessage(props) {
    if (props.isWarning) {
        return (
            <div className="container">
                <div className="mt-1 ml-1 mr-1 pl-2 pr-2 text-dark bg-warning">{props.message}</div>
            </div>
        )
    } else {
        return (
            <div className="container">
                <div className="mt-1 ml-1 mr-1 pl-2 pr-2 container text-white bg-danger">{props.message}</div>
            </div>
        )
    }
}