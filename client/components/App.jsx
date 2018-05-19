import React from 'react'

import Header from './Header'
import QuestionYesNo from './QuestionYesNo'
import IneligibleMessage from './IneligibleMessage'

export default class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isResident: null,
      hasKiwiSaverAcc: null,
      ownedHouse: null,
      hasKiwiSaverThreeYears: null,
    }
  }

  // componentDidMount() {

  // }

  showResidentQuestion() {
    return (
      <QuestionYesNo question="Are you a New Zealand citizen or resident?"
        questionNum="1" stateValue={this.state.isResident} callback={ 
          (answer) => { 
            this.setState({isResident : answer})
          }
        }
      />
    )
  }

  showKiwiSaverAccQuestion() {
    if (this.state.isResident !== true) return

    return (
      <QuestionYesNo question="Do you have a Kiwi Saver Account?"
        questionNum="2" stateValue={this.state.hasKiwiSaverAcc} callback={
          (answer) => {
            this.setState({hasKiwiSaverAcc : answer})
          }
        }
      />
    ) 
  }

  showOwnedHouseQuestion() {
    if (!this.state.isResident ||
        !this.state.hasKiwiSaverAcc ) return

    return (
      <QuestionYesNo question="Do you owned a house before?"
        questionNum="3" stateValue={this.state.ownedHouse} callback={ 
          (answer) => { 
            this.setState({ownedHouse : answer})
          }
        }
      />
    )
  }

  showKiwiSaverDurationQuestion() {
    if (!this.state.isResident ||
        !this.state.hasKiwiSaverAcc ||
        (this.state.ownedHouse !== false) ) return

    return (
      <QuestionYesNo question="Do you have your Kiwi Saver Account for more than 3 years?" questionNum="4" stateValue={this.state.hasKiwiSaverThreeYears}
        callback={
          (answer) => {
            this.setState({hasKiwiSaverThreeYears : answer})
          }
        }
      />
    )
  }

  msgNeedResident() {
    if (this.state.isResident === false) {
      return (
        <IneligibleMessage message="You need to be a NZ Resident to be eligible" />
      )
    }
  }

  msgNeedKiwiSaverAccount() {
    if (!this.state.isResident) return
    
    if (this.state.hasKiwiSaverAcc === false) {
      return (
        <IneligibleMessage message="You need to have a Kiwi Saver Account to be eligible" />
      )
    }
  }

  msgCannotOwnedHouse() {
    if (!this.state.isResident || !this.state.hasKiwiSaverAcc) {
      return
    }

    if (this.state.ownedHouse === true) {
      return (
        <IneligibleMessage message="You must not have owned a house before to be eligible" />
      )
    }
  }

  msgNeedThreeYearsKiwiSaver() {
    if (!this.state.isResident || !this.state.hasKiwiSaverAcc || 
        this.state.ownedHouse === true) {
      return
    }

    if (this.state.hasKiwiSaverThreeYears === false) {
      return (
        <IneligibleMessage message="You need to own a Kiwi Saver Account for more than 3 years to be eligible" />
      )
    }
  }

  

  render() {
    return (
      <div>
        <Header />

        { this.showResidentQuestion() }  
        { this.msgNeedResident() }
        { this.showKiwiSaverAccQuestion() }
        { this.msgNeedKiwiSaverAccount() }
        { this.showOwnedHouseQuestion() }
        { this.msgCannotOwnedHouse() }
        { this.showKiwiSaverDurationQuestion() }
        { this.msgNeedThreeYearsKiwiSaver() }

      </div>
    )
  }
}

