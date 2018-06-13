import React from 'react'

export default class Header extends React.Component {

  render() {
    return (

      <div className="jumbotron jumbotron-fluid p-4 text-white bg-info">
        <img className="rounded float-left mt-3 ml-4 mr-3" src="images/holding_house.jpg" alt="" height="140" width="210"/>
        <h1 className="pt-2 ml-4">KiwiSaver and HomeStart Grant Eligibility calculator</h1>
        <p className="ml-4 text-lights">Find out if you are eligible to buy a house with KiwiSaver and HomeStart Grant.</p>
      </div>

    )
  }
}