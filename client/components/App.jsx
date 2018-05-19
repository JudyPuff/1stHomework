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
      intendToLive: null,
      hasKiwiSaverThreeYears: null,
      contributeThreeYears: null
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

  showIntendToLiveQuestion() {
    if (!this.state.isResident ||
      !this.state.hasKiwiSaverAcc ||
      (this.state.ownedHouse !== false) ) return

      return (
        <QuestionYesNo question="Do you intend to live in the house?"
          questionNum="4" stateValue={this.state.intendToLive}
          callback={
            (answer) => {
              this.setState({intendToLive : answer})
            }
          }
        />
      )
  }

  showKiwiSaverDurationQuestion() {
    if (!this.state.isResident ||
        !this.state.hasKiwiSaverAcc ||
        (this.state.ownedHouse !== false) ||
        !this.state.intendToLive ) return

    return (
      <QuestionYesNo question="Have you had your Kiwi Saver Account for more than three years?" questionNum="5" stateValue={this.state.hasKiwiSaverThreeYears}
        callback={
          (answer) => {
            this.setState({hasKiwiSaverThreeYears : answer})
          }
        }
      />
    )
  }

  showKiwiSaverContributeQuestion() {
    if (!this.state.isResident ||
      !this.state.hasKiwiSaverAcc ||
      (this.state.ownedHouse !== false) ||
      !this.state.intendToLive ||
      !this.state.hasKiwiSaverThreeYears ) return

  return (
    <QuestionYesNo question="Have you contributed to your Kiwi Saver account for more than three years?" questionNum="6" stateValue={this.state.contributeThreeYears}
      callback={
        (answer) => {
          this.setState({contributeThreeYears : answer})
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

  msgMustIntendToLive() {
    if (!this.state.isResident || !this.state.hasKiwiSaverAcc || 
        this.state.ownedHouse === true) {
      return
    }

    if (this.state.intendToLive === false) {
      return (
        <IneligibleMessage message="You must be intended to live at the house. May eligible for exemption" isWarning={true} />
      )
    }

  }

  msgNeedThreeYearsKiwiSaver() {
    if (!this.state.isResident || !this.state.hasKiwiSaverAcc || 
        (this.state.ownedHouse === true) || !this.state.intendToLive) {
      return
    }

    if (this.state.hasKiwiSaverThreeYears === false) {
      return (
        <IneligibleMessage message="You need to own a Kiwi Saver Account for more than 3 years to be eligible" />
      )
    }
  }

  msgNeedContributeThreeYears() {
    if (!this.state.isResident || !this.state.hasKiwiSaverAcc || 
      (this.state.ownedHouse === true) || !this.state.intendToLive ||
      !this.state.hasKiwiSaverThreeYears) {
    return
    }

    if (this.state.contributeThreeYears === false) {
      return (
        <IneligibleMessage message="You are not eligible for Home Start Grant. But you are still eligible for Kiwi Saver withdrawal. Please contact your Kiwi Saver provider today." isWarning={true} />
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
        { this.showIntendToLiveQuestion() }
        { this.msgMustIntendToLive() }
        { this.showKiwiSaverDurationQuestion() }
        { this.msgNeedThreeYearsKiwiSaver() }
        { this.showKiwiSaverContributeQuestion() }
        { this.msgNeedContributeThreeYears() }

      </div>
    )
  }
}

