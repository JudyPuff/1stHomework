import React from 'react'
import {
  numberWithCommas,
  formatNumberOnMoney,
  calcHomeStartGrant,
  eligibleHomeStart,
  eligibleBankLoan
} from '../payability.js'

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
      contributeThreeYears: null,
      hasReceivedGrant: null,
      numYearsContributeKiwiSaver: 0,
      buyingLocation: 0,
      housePriceLimit: 800000,
      isNewHouse: null,
      housePrice: 0,
      isPriceOverLimit: null,
      isBuyingAsIndividual: null,
      isIncomeBelowSingleLimit: null,
      isIncomeBelowCombinedLimit: null,
      singleSaving: 0,
      doubleSaving: 0,
      hasEnteredSingleSaving: false,
      hasEnteredDoubleSaving: false,
      singleKiwiSaverAmount: 0,
      doubleKiwiSaverAmount: 0,
      hasEnteredSingleKiwiSaverAmount: false,
      hasEnteredDoubleKiwiSaverAmount: false,
    }

    this.repliedIsNewHouse = false
    this.updateBuyingLocation = this.updateBuyingLocation.bind(this)
  }

  // componentDidMount() {

  // }

  showResidentQuestion() {
    return (
      <div>
        <QuestionYesNo question="Are you a New Zealand citizen or resident?"
          questionNum="1" stateValue={this.state.isResident} callback={
            (answer) => {
              this.setState({ isResident: answer })
            }
          }
        />
        {this.msgNeedResident()}
      </div>
    )
  }

  showKiwiSaverAccQuestion() {
    if (this.state.isResident !== true) return

    return (
      <div>
        <QuestionYesNo question="Do you have a KiwiSaver Account?"
          questionNum="2" stateValue={this.state.hasKiwiSaverAcc} callback={
            (answer) => {
              this.setState({ hasKiwiSaverAcc: answer })
            }
          }
        />
        {this.msgNeedKiwiSaverAccount()}
      </div>
    )
  }

  showOwnedHouseQuestion() {
    if (!this.state.isResident ||
      !this.state.hasKiwiSaverAcc) return

    return (
      <div>
        <QuestionYesNo question="Have you owned a house before?"
          questionNum="3" stateValue={this.state.ownedHouse} callback={
            (answer) => {
              this.setState({ ownedHouse: answer })
            }
          }
        />
        {this.msgCannotOwnedHouse()}
      </div>
    )
  }

  showIntendToLiveQuestion() {
    if (!this.state.isResident ||
      !this.state.hasKiwiSaverAcc ||
      (this.state.ownedHouse !== false)) return

    return (
      <div>
        <QuestionYesNo question="Do you intend to live in the house?"
          questionNum="4" stateValue={this.state.intendToLive}
          callback={
            (answer) => {
              this.setState({ intendToLive: answer })
            }
          }
        />
        {this.msgMustIntendToLive()}
      </div>
    )
  }

  showKiwiSaverDurationQuestion() {
    if (!this.state.isResident ||
      !this.state.hasKiwiSaverAcc ||
      (this.state.ownedHouse !== false) ||
      !this.state.intendToLive) return

    return (
      <div>
        <QuestionYesNo question="Have you had your KiwiSaver account for more than 3 years?" questionNum="5" stateValue={this.state.hasKiwiSaverThreeYears}
          callback={
            (answer) => {
              this.setState({ hasKiwiSaverThreeYears: answer })
            }
          }
        />
        {this.msgNeedThreeYearsKiwiSaver()}
      </div>
    )
  }

  showKiwiSaverContributeQuestion() {
    if (!this.state.isResident ||
      !this.state.hasKiwiSaverAcc ||
      (this.state.ownedHouse !== false) ||
      !this.state.intendToLive ||
      !this.state.hasKiwiSaverThreeYears) return

    return (
      <div>
        <QuestionValue question="How many years have you contributed to your KiwiSaver account continuously to date?"
          questionNum="6" postLabel="year(s)"
          callbackUpdate={
            (value) => {
              this.state.numYearsContributeKiwiSaver = Number(value)
            }

          }
          callback={
            () => {
              let isMoreThanThreeYears = false
              if (this.state.numYearsContributeKiwiSaver >= 3) {
                isMoreThanThreeYears = true
              }
              this.setState({ contributeThreeYears: isMoreThanThreeYears })
            }
          }
        />
        {this.msgNeedContributeThreeYears()}
      </div>
    )
  }

  showReceivedGrantQuestion() {
    if (!this.state.isResident ||
      !this.state.hasKiwiSaverAcc ||
      (this.state.ownedHouse !== false) ||
      !this.state.intendToLive ||
      !this.state.hasKiwiSaverThreeYears ||
      (this.state.contributeThreeYears === null)) return

    return (
      <div>
        <QuestionYesNo question="Did you receive KiwiSaver HomeStart grant or KiwiSaver deposit subsidy before?"
          questionNum="7" stateValue={this.state.hasReceivedGrant}
          callback={
            (answer) => {
              this.setState({ hasReceivedGrant: answer })
            }
          }
        />
        {this.msgMustNotReceivedGrant()}
      </div>)
  }

  showHouseLocationQuestion() {
    if (!this.state.isResident ||
      !this.state.hasKiwiSaverAcc ||
      (this.state.ownedHouse !== false) ||
      !this.state.intendToLive ||
      !this.state.hasKiwiSaverThreeYears ||
      (this.state.contributeThreeYears === null) ||
      (this.state.hasReceivedGrant !== false)) return

    const questionNum = 8
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
    this.setState({ buyingLocation: answer })
  }

  showHousePriceQuestion() {
    if (!this.state.isResident ||
      !this.state.hasKiwiSaverAcc ||
      (this.state.ownedHouse !== false) ||
      !this.state.intendToLive ||
      !this.state.hasKiwiSaverThreeYears ||
      (this.state.contributeThreeYears === null) ||
      (this.state.hasReceivedGrant !== false) ||
      (this.state.buyingLocation <= 0)
    ) return

    return (
      <div>
        <QuestionValue question="How much is the house you want to buy?"
          questionNum="9" preLabel="$"
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
              this.setState({ isPriceOverLimit: isOverLimit })
            }
          }
        />
        {this.msgOverHousePriceLimit()}
      </div>
    )
  }

  showNewHouseQuestion() {
    if (!this.state.isResident ||
      !this.state.hasKiwiSaverAcc ||
      (this.state.ownedHouse !== false) ||
      !this.state.intendToLive ||
      !this.state.hasKiwiSaverThreeYears ||
      (this.state.contributeThreeYears === null) ||
      (this.state.hasReceivedGrant !== false) ||
      (this.state.buyingLocation <= 0) ||
      (this.state.isPriceOverLimit != false)
    ) return

    return (
      <QuestionYesNo question="Are you buying a new home, a property bought off the plans or land to build a new home on?" questionNum="10" stateValue={this.state.isNewHouse}
        callback={
          (answer) => {
            this.setState({ isNewHouse: answer })
            this.repliedIsNewHouse = true;
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
      (this.state.contributeThreeYears === null) ||
      (this.state.hasReceivedGrant !== false) ||
      (this.state.buyingLocation <= 0) ||
      (this.state.isPriceOverLimit != false) ||
      !this.repliedIsNewHouse
    ) return

    return (
      <QuestionYesNo question="Are you buying this house as an individual?" questionNum="11" stateValue={this.state.isBuyingAsIndividual}
        callback={
          (answer) => {
            this.setState({ isBuyingAsIndividual: answer })
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
      (this.state.contributeThreeYears === null) ||
      (this.state.hasReceivedGrant !== false) ||
      (this.state.buyingLocation <= 0) ||
      (this.state.isPriceOverLimit != false) ||
      (this.state.isBuyingAsIndividual !== true) ||
      !this.repliedIsNewHouse
    ) return

    return (
      <div>
        <QuestionYesNo question="Is your income below $85,000 in the last 12 months?" questionNum="12.1" stateValue={this.state.isIncomeBelowSingleLimit}
          callback={
            (answer) => {
              this.setState({ isIncomeBelowSingleLimit: answer })
            }
          }
        />
        {this.msgSingleIncomeTooHigh()}
      </div>
    )
  }

  showCombinedIncomeQuestion() {
    if (!this.state.isResident ||
      !this.state.hasKiwiSaverAcc ||
      (this.state.ownedHouse !== false) ||
      !this.state.intendToLive ||
      !this.state.hasKiwiSaverThreeYears ||
      (this.state.contributeThreeYears === null) ||
      (this.state.hasReceivedGrant !== false) ||
      (this.state.buyingLocation <= 0) ||
      (this.state.isPriceOverLimit != false) ||
      (this.state.isBuyingAsIndividual !== false) ||
      !this.repliedIsNewHouse
    ) return

    return (
      <div>
        <QuestionYesNo question="Is your household income (including the person you are buying the house with) below $130,000 in the last 12 months?" questionNum="12.2" stateValue={this.state.isIncomeBelowCombinedLimit}
          callback={
            (answer) => {
              this.setState({ isIncomeBelowCombinedLimit: answer })
            }
          }
        />
        {this.msgCombinedIncomeTooHigh()}
      </div>
    )
  }

  showSingleSavingQuestion() {
    if (!this.state.isResident ||
      !this.state.hasKiwiSaverAcc ||
      (this.state.ownedHouse !== false) ||
      !this.state.intendToLive ||
      !this.state.hasKiwiSaverThreeYears ||
      (this.state.contributeThreeYears === null) ||
      (this.state.hasReceivedGrant !== false) ||
      (this.state.buyingLocation <= 0) ||
      (this.state.isPriceOverLimit != false) ||
      (this.state.isBuyingAsIndividual !== true) ||
      (this.state.isIncomeBelowSingleLimit !== true) ||
      !this.repliedIsNewHouse
    ) return

    return (
      <QuestionValue question="How much do you have saved in cash?"
        questionNum="13.1" preLabel="$"
        callbackUpdate={
          (value) => {
            this.state.singleSaving = Number(value)
          }
        }
        callback={
          () => {
            this.setState({ hasEnteredSingleSaving: true })
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
      (this.state.contributeThreeYears === null) ||
      (this.state.hasReceivedGrant !== false) ||
      (this.state.buyingLocation <= 0) ||
      (this.state.isPriceOverLimit != false) ||
      (this.state.isBuyingAsIndividual !== true) ||
      (this.state.isIncomeBelowSingleLimit !== true) ||
      (this.state.hasEnteredSingleSaving !== true) ||
      !this.repliedIsNewHouse
    ) return

    return (
      <QuestionValue question="How much do you have in your KiwiSaver account now?"
        questionNum="14.1" preLabel="$"
        callbackUpdate={
          (value) => {
            this.state.singleKiwiSaverAmount = Number(value)
          }
        }
        callback={
          () => {
            this.setState({ hasEnteredSingleKiwiSaverAmount: true })
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
      (this.state.contributeThreeYears === null) ||
      (this.state.hasReceivedGrant !== false) ||
      (this.state.buyingLocation <= 0) ||
      (this.state.isPriceOverLimit != false) ||
      (this.state.isBuyingAsIndividual !== false) ||
      (this.state.isIncomeBelowCombinedLimit !== true) ||
      !this.repliedIsNewHouse
    ) return

    return (
      <QuestionValue question="How much do you and your co-buyers have saved in cash?"
        questionNum="13.2" preLabel="$"
        callbackUpdate={
          (value) => {
            this.state.doubleSaving = Number(value)
          }
        }
        callback={
          () => {
            this.setState({ hasEnteredDoubleSaving: true })
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
      (this.state.contributeThreeYears === null) ||
      (this.state.hasReceivedGrant !== false) ||
      (this.state.buyingLocation <= 0) ||
      (this.state.isPriceOverLimit != false) ||
      (this.state.isBuyingAsIndividual !== false) ||
      (this.state.isIncomeBelowCombinedLimit !== true) ||
      (this.state.hasEnteredDoubleSaving !== true) ||
      !this.repliedIsNewHouse
    ) return

    return (
      <QuestionValue question="How much do you and your co-buyers have in both KiwiSaver account now?"
        questionNum="14.2" preLabel="$"
        callbackUpdate={
          (value) => {
            this.state.doubleKiwiSaverAmount = Number(value)
          }
        }
        callback={
          () => {
            this.setState({ hasEnteredDoubleKiwiSaverAmount: true })
          }
        }
      />
    )
  }

  showConclusion() {
    if (!this.state.isResident ||
      !this.state.hasKiwiSaverAcc ||
      (this.state.ownedHouse !== false) ||
      !this.state.intendToLive ||
      !this.state.hasKiwiSaverThreeYears ||
      (this.state.contributeThreeYears === null) ||
      (this.state.hasReceivedGrant !== false) ||
      (this.state.buyingLocation <= 0) ||
      (this.state.isPriceOverLimit != false) ||
      !this.repliedIsNewHouse
    ) return

    if (this.state.isBuyingAsIndividual === true) {
      return (this.showSingleBuyerConclusion())
    } else if (this.state.isBuyingAsIndividual === false) {
      return (this.showCombinedBuyersConclusion())
    }

  }

  showSingleBuyerConclusion() {
    if ((this.state.isIncomeBelowSingleLimit != true) ||
      !this.state.hasEnteredSingleSaving ||
      !this.state.hasEnteredSingleKiwiSaverAmount)
      return

    let homeStartGrant = calcHomeStartGrant(this.state.numYearsContributeKiwiSaver,
      this.state.isNewHouse)
    let totalSaving = this.state.singleSaving + this.state.singleKiwiSaverAmount + homeStartGrant

    return (
      <div className="container mt-5 p-2 rounded bg-primary text-light">
        <div className="text-center mb-2">SINGLE Purchase</div>
        <div>House Price: {formatNumberOnMoney(this.state.housePrice)}</div>
        <div className="pl-4">10% of House price: {formatNumberOnMoney(this.state.housePrice * 0.1)}</div>
        <div className="pl-4">20% of House price: {formatNumberOnMoney(this.state.housePrice * 0.2)}</div>
        <p />
        <div>Total Saving (saving + KiwiStart + HomeStart Grant): {formatNumberOnMoney(totalSaving)}</div>
        <div className="pl-4">Personal Saving: {formatNumberOnMoney(this.state.singleSaving)}</div>
        <div className="pl-4">Personal KiwiSaver: {formatNumberOnMoney(this.state.singleKiwiSaverAmount)}</div>
        <div className="pl-4">HomeStart Grant: {formatNumberOnMoney(homeStartGrant)}</div>
        <p />
        {this.showEligibleHomeStartGrantMessage(this.state.housePrice, totalSaving)}
        {this.showEligibleBankLoanMessage(this.state.housePrice, totalSaving)}
      </div>
    )
  }

  showCombinedBuyersConclusion() {
    if ((this.state.isIncomeBelowCombinedLimit !== true) ||
      !this.state.hasEnteredDoubleSaving ||
      !this.state.hasEnteredDoubleKiwiSaverAmount)
      return

    let homeStartGrant = calcHomeStartGrant(this.state.numYearsContributeKiwiSaver,
      this.state.isNewHouse)
    let totalSaving = this.state.doubleSaving + this.state.doubleKiwiSaverAmount + homeStartGrant

    return (
      <div className="container mt-5 p-2 rounded bg-primary text-light">
        <div className="text-center mb-2">COMBINED Purchase</div>
        <div>House Price: {formatNumberOnMoney(this.state.housePrice)}</div>
        <div className="pl-4">10% of House price: {formatNumberOnMoney(this.state.housePrice * 0.1)}</div>
        <div className="pl-4">20% of House price: {formatNumberOnMoney(this.state.housePrice * 0.2)}</div>
        <p />
        <div>Total Saving (saving + KiwiStart + HomeStart Grant): {formatNumberOnMoney(totalSaving)}</div>
        <div className="pl-4">Combined Saving: {formatNumberOnMoney(this.state.doubleSaving)}</div>
        <div className="pl-4">Combined KiwiSaver: {formatNumberOnMoney(this.state.doubleKiwiSaverAmount)}</div>
        <div className="pl-4">HomeStart Grant: {formatNumberOnMoney(homeStartGrant)}</div>
        <p />
        {this.showEligibleHomeStartGrantMessage(this.state.housePrice, totalSaving)}
        {this.showEligibleBankLoanMessage(this.state.housePrice, totalSaving)}

      </div>
    )
  }

  showEligibleHomeStartGrantMessage(purchasePrice, totalSaving) {
    if (eligibleHomeStart(this.state.housePrice, totalSaving)) {
      return (<div className="p-2 m-2 rounded bg-light text-success">You are eligible for HomeStart Grant, because your total savings exceed the required 10% of the house price</div>)
    } else {
      return (<div className="p-2 m-2 rounded bg-light text-danger">You are NOT eligible for HomeStart Grant, because your total savings does not meet the required 10% of the house price</div>)
    }
    let eligibleLoan = eligibleBankLoan(this.state.housePrice, totalSaving)
  }

  showEligibleBankLoanMessage(purchasePrice, totalSaving) {
    if (eligibleBankLoan(this.state.purchasePrice, totalSaving)) {
      return (<div className="p-2 m-2 rounded bg-light text-success">You are eligible for a Home Loan from a bank, because your total saving exceed the required 20% to pay the deposit</div>)
    } else {
      return (<div className="p-2 m-2 rounded bg-light text-danger">You are NOT eligible for a Home Loan from a bank, because your total saving does not meet the required 20% to pay the deposit</div>)
    }
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
        <IneligibleMessage message="You must be intended to live at the house. May eligible for exemption" />
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
      (this.state.ownedHouse === true) || (this.state.intendToLive === null) ||
      !this.state.hasKiwiSaverThreeYears) {
      return
    }

    if (this.state.contributeThreeYears === false) {
      return (
        <IneligibleMessage message="You are not eligible for HomeStart Grant. But you are still eligible for KiwiSaver withdrawal. Please contact your KiwiSaver provider today." isWarning={true} />
      )
    }
  }

  msgMustNotReceivedGrant() {
    if (!this.state.isResident || !this.state.hasKiwiSaverAcc ||
      (this.state.ownedHouse === true) || !this.state.intendToLive ||
      !this.state.hasKiwiSaverThreeYears ||
      (this.state.hasReceivedGrant === null)) {
      return
    }

    if (this.state.hasReceivedGrant === true) {
      return (
        <IneligibleMessage message="You are no longer eligible for HomeStart Grant and KiwiSaver withdrawal." />
      )
    }
  }

  msgOverHousePriceLimit() {
    if (!this.state.isResident || !this.state.hasKiwiSaverAcc ||
      (this.state.ownedHouse === true) || !this.state.intendToLive ||
      !this.state.hasKiwiSaverThreeYears || (this.state.contributeThreeYears === null)
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
      !this.state.hasKiwiSaverThreeYears || (this.state.contributeThreeYears === null) ||
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
      !this.state.hasKiwiSaverThreeYears || (this.state.contributeThreeYears === null) ||
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

        {this.showResidentQuestion()}
        {this.showKiwiSaverAccQuestion()}
        {this.showOwnedHouseQuestion()}
        {this.showIntendToLiveQuestion()}
        {this.showKiwiSaverDurationQuestion()}
        {this.showKiwiSaverContributeQuestion()}
        {this.showReceivedGrantQuestion()}
        {this.showHouseLocationQuestion()}
        {this.showHousePriceQuestion()}
        {this.showNewHouseQuestion()}
        {this.showWhoBuyingQuestion()}
        {this.showSingleIncomeQuestion()}
        {this.showCombinedIncomeQuestion()}
        {this.showSingleSavingQuestion()}
        {this.showSingleKiwiSaverAmountQuestion()}
        {this.showCombinedSavingQuestion()}
        {this.showDoubleKiwiSaverAmountQuestion()}
        {this.showConclusion()}
      </div>
    )
  }
}

