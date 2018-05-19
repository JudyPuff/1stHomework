import React from 'react'

import Header from './Header'
import AddWidget from './AddWidget'
import WidgetList from './WidgetList'
import WidgetDetails from './WidgetDetails'
import ErrorMessage from './ErrorMessage'

import { getWidgets } from '../api'

export default class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isResident: null,
      hasKiwiSaverAcc: null
    }

    this.residentQuestionOption = this.residentQuestionOption.bind(this)
  }

  // componentDidMount() {

  // }

  showResidentQuestion() {
    return (
      <form className="container">
        <h3>Are you a New Zealand citizen or resident?</h3>
          <div className="resident-check">
            <label>
              <input type="radio" value="true" 
                checked={this.state.isResident === true}
                onChange={ () => { this.residentQuestionOption(true) }}         
              />
              &nbsp;Yes
            </label>
          </div>
          <div className="resident-check">
            <label>
              <input type="radio" value="false" 
                checked={this.state.isResident === false}
                onChange={ () => { this.residentQuestionOption(false) }}         
              />
              &nbsp;No
            </label>
          </div>
        </form>
    )
  }

  showKiwiSaverAccQuestion() {
    if (this.state.isResident === true) {
      return (
        <form className="container">
          <h3>Do you have a Kiwi Saver Account?</h3>
            <div className="kiwiSaverAcc-check">
              <label>
                <input type="radio" value="true" 
                  checked={this.state.hasKiwiSaverAcc === true}
                  onChange={ () => { this.kiwiSaverAccountOption(true) }}         
                />
                &nbsp;Yes
              </label>
            </div>
            <div className="kiwiSaverAcc-check">
              <label>
                <input type="radio" value="false" 
                  checked={this.state.hasKiwiSaverAcc === false}
                  onChange={ () => { this.kiwiSaverAccountOption(false) }}         
                />
                &nbsp;No
              </label>
            </div>
          </form>
      )
    } 
  }

  residentQuestionOption(answer) {
    this.setState({
      isResident : answer
    })
  }

  kiwiSaverAccountOption(answer) {
    this.setState({
      hasKiwiSaverAcc : answer
    })
  }

  errorNeedResident() {
    if (this.state.isResident === false) {
      return (
        <div className="container">You need to be a NZ Resident to be eligible</div>
      )
    }
  }

  errorNeedKiwiSaverAccount() {
    if (this.state.isResident != true) {
      return
    }

    if (this.state.hasKiwiSaverAcc === false) {
      return (
        <div className="container">You need to have a Kiwi Saver Account to be eligible</div>
      )
    }
  }

  render() {
    console.log("rendering...")

    return (
      <div>
        <Header />

        { this.showResidentQuestion() }  
        { this.errorNeedResident() }
        { this.showKiwiSaverAccQuestion() }
        { this.errorNeedKiwiSaverAccount() }

      </div>
    )
  }
}

