import React from 'react'

import Header from './Header'
import QuestionYesNo from './QuestionYesNo'
import IneligibleMessage from './IneligibleMessage'
import RadioChoice from './RadioChoice'
import QuestionValue from './QuestionValue'

export default class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isResident: null,
      hasKiwiSaverAcc: null,
      ownedHouse: null,
      intendToLive: null,
      hasKiwiSaverThreeYears: null,
      numYearsHasKiwiSaver: 0,
      contributeThreeYears: null,
      buyingLocation: 0,
      housePriceLimit: 800000,
      housePrice: 0,
      isPriceOverLimit: null,
      isBuyingAsIndividual: null,
      isIncomeBelowSingleLimit: null,
      isIncomeBelowCombinedLimit: null,
      singleSaving: 0,
      doubleSaving: 0,
      hasEnteredSingleSaving: null,
      hasEnteredDoubleSaving: null,
      singleKiwiSaverAmount: 0,
      doubleKiwiSaverAmount: 0
    }

    this.updateBuyingLocation = this.updateBuyingLocation.bind(this)
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
      <QuestionYesNo question="Do you have a KiwiSaver Account?"
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
      <QuestionYesNo question="Have you owned a house before?"
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
      <QuestionValue question="How many years have you had your KiwiSaver account?"
        questionNum="5" postLabel="year(s)"
        callbackUpdate={
          (value) => {
            this.state.numYearsHasKiwiSaver = Number(value)
          }

        }
        callback={
          () => {
            let isMoreThanThreeYears = false
            if (this.state.numYearsHasKiwiSaver >= 3) {
              isMoreThanThreeYears = true
            }
            this.setState({hasKiwiSaverThreeYears : isMoreThanThreeYears})
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
      <QuestionYesNo question="Have you contributed to your KiwiSaver account for more than three years?" questionNum="6" stateValue={this.state.contributeThreeYears}
        callback={
          (answer) => {
            this.setState({contributeThreeYears : answer})
          }
        }
      />
    )
  }

  showHouseLocationQuestion() {
    if (!this.state.isResident ||
      !this.state.hasKiwiSaverAcc ||
      (this.state.ownedHouse !== false) ||
       !this.state.intendToLive ||
       !this.state.hasKiwiSaverThreeYears ||
       !this.state.contributeThreeYears) return

      const questionNum = 7
      const questionIdentifier = "question-" + questionNum
      const location1 = "Auckland"
      const location2 = "Hamilton / Tauranga / Western Bay of Plenty / Kapiti Coast / Porirua / Uper Hutt / Hutt City / Wellington / Tasma / Nelson / Waimakariri / Christchurch / Selwyn / Queenstown Lakes"
      const location3 = "Others"
      const stateValue = this.state.buyingLocation

      return (
        <form className="container mt-4">
          <h4>{questionNum}. Where do you intend to buy your house</h4>
            <RadioChoice identifier={questionIdentifier} radioValue={1}
              radioValueStr="1" stateValue={stateValue}
              label={location1}
              callback={this.updateBuyingLocation}
            />
            <RadioChoice identifier={questionIdentifier} radioValue={2}
              radioValueStr="2" stateValue={stateValue}
              label={location2}
              callback={this.updateBuyingLocation}
            />
            <RadioChoice identifier={questionIdentifier} radioValue={3}
              radioValueStr="3" stateValue={stateValue}
              label={location3}
              callback={this.updateBuyingLocation}
            />
          </form>
      )
  }

  updateBuyingLocation(answer) {
    if (answer == 1) {
      this.state.housePriceLimit = 600000
    } else if (answer == 2) {
      this.state.housePriceLimit = 500000
    } else {
      this.state.housePriceLimit = 400000
    }
    this.setState({buyingLocation : answer})
  }

  showHousePriceQuestion() {
    if (!this.state.isResident ||
       !this.state.hasKiwiSaverAcc ||
       (this.state.ownedHouse !== false) ||
       !this.state.intendToLive ||
       !this.state.hasKiwiSaverThreeYears ||
       !this.state.contributeThreeYears ||
       (this.state.buyingLocation <= 0)
      ) return

    return (
      <QuestionValue question="How much is the house you want to buy?"
        questionNum="8" preLabel="$"
        callbackUpdate={
          (value) => {
            this.state.housePrice = Number(value)
          }
        }
        callback={
          () => {
            let isOverLimit = false
            if (this.state.housePrice >= this.state.housePriceLimit) {
              isOverLimit = true
            }
            this.setState({isPriceOverLimit : isOverLimit})
          }
        }
      />
    )
  }

  showWhoBuyingQuestion() {
    if (!this.state.isResident ||
      !this.state.hasKiwiSaverAcc ||
      (this.state.ownedHouse !== false) ||
      !this.state.intendToLive ||
      !this.state.hasKiwiSaverThreeYears ||
      !this.state.contributeThreeYears ||
      (this.state.buyingLocation <= 0) ||
      (this.state.isPriceOverLimit != false) 
     ) return

    return (
      <QuestionYesNo question="Are you buying this house as an individual?" questionNum="9" stateValue={this.state.isBuyingAsIndividual}
        callback={
          (answer) => {
            this.setState({isBuyingAsIndividual : answer})
          }
        }
      />
    )
  }

  showSingleIncomeQuestion() {
    if (!this.state.isResident ||
      !this.state.hasKiwiSaverAcc ||
      (this.state.ownedHouse !== false) ||
      !this.state.intendToLive ||
      !this.state.hasKiwiSaverThreeYears ||
      !this.state.contributeThreeYears ||
      (this.state.buyingLocation <= 0) ||
      (this.state.isPriceOverLimit != false) ||
      (this.state.isBuyingAsIndividual !== true)
     ) return

    return (
      <QuestionYesNo question="Is your income below $85,000 in the last 12 months?" questionNum="10.1" stateValue={this.state.isIncomeBelowSingleLimit}
        callback={
          (answer) => {
            this.setState({isIncomeBelowSingleLimit : answer})
          }
        }
      />
    )
  }

  showCombinedIncomeQuestion() {
    if (!this.state.isResident ||
      !this.state.hasKiwiSaverAcc ||
      (this.state.ownedHouse !== false) ||
      !this.state.intendToLive ||
      !this.state.hasKiwiSaverThreeYears ||
      !this.state.contributeThreeYears ||
      (this.state.buyingLocation <= 0) ||
      (this.state.isPriceOverLimit != false) ||
      (this.state.isBuyingAsIndividual !== false)
     ) return

    return (
      <QuestionYesNo question="Is your household income (including the person you are buying the house with) below $130,000 in the last 12 months?" questionNum="10.2" stateValue={this.state.isIncomeBelowCombinedLimit}
        callback={
          (answer) => {
            this.setState({isIncomeBelowCombinedLimit : answer})
          }
        }
      />
    )
  }

  showSingleSavingQuestion() {
    if (!this.state.isResident ||
      !this.state.hasKiwiSaverAcc ||
      (this.state.ownedHouse !== false) ||
      !this.state.intendToLive ||
      !this.state.hasKiwiSaverThreeYears ||
      !this.state.contributeThreeYears ||
      (this.state.buyingLocation <= 0) ||
      (this.state.isPriceOverLimit != false) ||
      (this.state.isBuyingAsIndividual !== true) ||
      (this.state.isIncomeBelowSingleLimit !== true)
     ) return

    return (
      <QuestionValue question="How much do you have saved in cash?"
        questionNum="11.1" preLabel="$"
        callbackUpdate={
          (value) => {
            this.state.singleSaving = Number(value)
          }
        }
        callback={
          () => {
            this.setState({hasEnteredSingleSaving : true})
          }
        }
      />
    )
  }

  showSingleKiwiSaverAmountQuestion() {
    if (!this.state.isResident ||
      !this.state.hasKiwiSaverAcc ||
      (this.state.ownedHouse !== false) ||
      !this.state.intendToLive ||
      !this.state.hasKiwiSaverThreeYears ||
      !this.state.contributeThreeYears ||
      (this.state.buyingLocation <= 0) ||
      (this.state.isPriceOverLimit != false) ||
      (this.state.isBuyingAsIndividual !== true) ||
      (this.state.isIncomeBelowSingleLimit !== true) ||
      (this.state.hasEnteredSingleSaving !== true)
     ) return

    return (
      <QuestionValue question="How much do you have in your KiwiSaver account now?"
        questionNum="12.1" preLabel="$"
        callbackUpdate={
          (value) => {
            this.state.singleKiwiSaverAmount = Number(value)
          }
        }
        callback={
          () => {
            console.log("Single KS amount is: ", this.state.singleKiwiSaverAmount)
          }
        }
      />
    )
  }

  showCombinedSavingQuestion() {
    if (!this.state.isResident ||
      !this.state.hasKiwiSaverAcc ||
      (this.state.ownedHouse !== false) ||
      !this.state.intendToLive ||
      !this.state.hasKiwiSaverThreeYears ||
      !this.state.contributeThreeYears ||
      (this.state.buyingLocation <= 0) ||
      (this.state.isPriceOverLimit != false) ||
      (this.state.isBuyingAsIndividual !== false) ||
      (this.state.isIncomeBelowCombinedLimit !== true)
    ) return

    return (
      <QuestionValue question="How much do you and your co-buyers have saved in cash?"
        questionNum="11.2" preLabel="$"
        callbackUpdate={
          (value) => {
            this.state.doubleSaving = Number(value)
          }
        }
        callback={
          () => {
            this.setState({hasEnteredDoubleSaving : true})
          }
        }
      />
    )
  }

  showDoubleKiwiSaverAmountQuestion() {
    if (!this.state.isResident ||
      !this.state.hasKiwiSaverAcc ||
      (this.state.ownedHouse !== false) ||
      !this.state.intendToLive ||
      !this.state.hasKiwiSaverThreeYears ||
      !this.state.contributeThreeYears ||
      (this.state.buyingLocation <= 0) ||
      (this.state.isPriceOverLimit != false) ||
      (this.state.isBuyingAsIndividual !== false) ||
      (this.state.isIncomeBelowCombinedLimit !== true) ||
      (this.state.hasEnteredDoubleSaving !== true)
    ) return

    return (
      <QuestionValue question="How much do you and your co-buyers have in both KiwiSaver account now?"
        questionNum="12.2" preLabel="$"
        callbackUpdate={
          (value) => {
            this.state.doubleKiwiSaverAmount = Number(value)
          }
        }
        callback={
          () => {
            console.log("Double KS amount is: ", this.state.doubleKiwiSaverAmount)
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
        <IneligibleMessage message="You need to have a KiwiSaver Account to be eligible" />
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
        <IneligibleMessage message="You need to own a KiwiSaver Account for more than 3 years to be eligible" />
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
        <IneligibleMessage message="You are not eligible for HomeStart Grant. But you are still eligible for KiwiSaver withdrawal. Please contact your KiwiSaver provider today." isWarning={true} />
      )
    }
  }

  msgOverHousePriceLimit() {
    if (!this.state.isResident || !this.state.hasKiwiSaverAcc || 
      (this.state.ownedHouse === true) || !this.state.intendToLive ||
      !this.state.hasKiwiSaverThreeYears || !this.state.contributeThreeYears
    ) {
      return
    }

    if (this.state.isPriceOverLimit === true) {
      return (
        <IneligibleMessage message="The house you want to buy is not within the purchase price threshold to be eligible for the HomeStart Grant" />
      )
    }
  }

  msgSingleIncomeTooHigh() {
    if (!this.state.isResident || !this.state.hasKiwiSaverAcc || 
      (this.state.ownedHouse === true) || !this.state.intendToLive ||
      !this.state.hasKiwiSaverThreeYears || !this.state.contributeThreeYears ||
      this.state.isBuyingAsIndividual !== true) {
      return
    }

    if (this.state.isIncomeBelowSingleLimit === false) {
      return (
        <IneligibleMessage message="Your income is over the threshold" />
      )
    }
  }
  
  msgCombinedIncomeTooHigh() {
    if (!this.state.isResident || !this.state.hasKiwiSaverAcc || 
      (this.state.ownedHouse === true) || !this.state.intendToLive ||
      !this.state.hasKiwiSaverThreeYears || !this.state.contributeThreeYears ||
      this.state.isBuyingAsIndividual !== false) {
      return
    }

    if (this.state.isIncomeBelowCombinedLimit === false) {
      return (
        <IneligibleMessage message="Your combined household income is over the threshold for more than one buyer" />
      )
    }
  }

  render() {
    return (
      <div className="mb-5">
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
        { this.showHouseLocationQuestion() }
        { this.showHousePriceQuestion() }
        { this.msgOverHousePriceLimit() }
        { this.showWhoBuyingQuestion() }
        { this.showSingleIncomeQuestion() }
        { this.showCombinedIncomeQuestion() }
        { this.msgSingleIncomeTooHigh() }
        { this.msgCombinedIncomeTooHigh() }
        { this.showSingleSavingQuestion() }
        { this.showSingleKiwiSaverAmountQuestion() }
        { this.showCombinedSavingQuestion() }
        { this.showDoubleKiwiSaverAmountQuestion() }
      </div>
    )
  }
}

