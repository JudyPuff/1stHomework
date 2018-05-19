import React from 'react'

export default function IneligibleMessage(props) {
    return (
        <div className="container text-white bg-danger">{props.message}</div>
    )
}