import React from 'react'

import Header from './Header'
import QuestionYesNo from './QuestionYesNo'
// import AddWidget from './AddWidget'
// import WidgetList from './WidgetList'
// import WidgetDetails from './WidgetDetails'
// import ErrorMessage from './ErrorMessage'

// import { getWidgets } from '../api'

export default class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isResident: null,
      hasKiwiSaverAcc: null,
      hasKiwiSaverThreeYears: null,
    }

    this.residentQuestionOption = this.residentQuestionOption.bind(this)
  }

  // componentDidMount() {

  // }

  showResidentQuestion() {
    return (
      <QuestionYesNo question="Are you a New Zealand citizen or resident?"
        questionNum="1" stateValue={this.state.isResident} callback={ (answer) => { this.residentQuestionOption(answer) } }
      />
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

  showKiwiSaverDurationQuestion() {
    if ((this.state.isResident === true) &&
        (this.state.hasKiwiSaverAcc === true) ) {

      return (
        <form className="container">
          <h3>Do you have your Kiwi Saver Account for more than 3 years?</h3>
            <div className="kiwiSaverDuration-check">
              <label>
                <input type="radio" value="true"
                  checked={this.state.hasKiwiSaverThreeYears === true}
                  onChange={ () => { this.kiwiSaverDurationOption(true) }}
                />
                &nbsp;Yes
              </label>
            </div>
            <div className="kiwiSaverDuration-check">
              <label>
                <input type="radio" value="false"
                  checked={this.state.hasKiwiSaverThreeYears === false}
                  onChange={ () => { this.kiwiSaverDurationOption(false) }}
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

  kiwiSaverDurationOption(answer) {
    this.setState({
      hasKiwiSaverThreeYears : answer
    })
  }

  errorNeedResident() {
    if (this.state.isResident === false) {
      return (
        <div className="container text-white bg-danger">You need to be a NZ Resident to be eligible</div>
      )
    }
  }

  errorNeedKiwiSaverAccount() {
    if (this.state.isResident != true) {
      return
    }

    if (this.state.hasKiwiSaverAcc === false) {
      return (
        <div className="container text-white bg-danger">You need to have a Kiwi Saver Account to be eligible</div>
      )
    }
  }

  errorNeedThreeYearsKiwiSaver() {
    if (this.state.isResident != true ||
        this.state.hasKiwiSaverAcc != true) {
      return
    }

    if (this.state.hasKiwiSaverThreeYears === false) {
      return (
        <div className="container text-white bg-danger">You need to own a Kiwi Saver Account for more than 3 years to be eligible</div>
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
        { this.showKiwiSaverDurationQuestion() }
        { this.errorNeedThreeYearsKiwiSaver() }

      </div>
    )
  }
}

