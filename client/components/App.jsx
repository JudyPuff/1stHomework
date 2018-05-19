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
      isResident: false,
      // error: null,
      // widgets: [],
      // activeWidget: null,
      // detailsVisible: false,
      // addWidgetVisible: false
    }

    // this.refreshList = this.refreshList.bind(this)
    // this.showDetails = this.showDetails.bind(this)
    // this.hideDetails = this.hideDetails.bind(this)
    // this.renderWidgets = this.renderWidgets.bind(this)
    // this.showAddWidget = this.showAddWidget.bind(this)
  }

  componentDidMount() {
    //this.refreshList()
  }

  // renderWidgets(err, widgets) {
  //   this.setState({
  //     error: err,
  //     widgets: widgets || []
  //   })
  // }

  // refreshList(err) {
  //   this.setState({
  //     error: err,
  //     addWidgetVisible: false
  //   })
  //   getWidgets(this.renderWidgets)
  // }

  // showAddWidget() {
  //   this.setState({
  //     addWidgetVisible: true
  //   })
  // }

  // showDetails(widget) {
  //   this.setState({
  //     activeWidget: widget,
  //     detailsVisible: true
  //   })
  // }

  // hideDetails() {
  //   this.setState({
  //     detailsVisible: false
  //   })
  // }

  render() {
    return (
      <div>
        <Header />

        <form className="container">
          <h3>Are you a New Zealand citizen or resident?</h3>
          <div className="form-check">
            <label>
              <input type="radio" name="applicant.isNZResident-group" /> <span className="label-text" value="true">Yes</span>
            </label>
          </div>
          <div className="form-check">
            <label>
              <input type="radio" name="applicant.isNZResident-group" /> <span className="label-text" value="false">No</span>
            </label>
          </div>
        </form>






        {/* <h1>Widgets FTW!</h1>

        <WidgetList
          showDetails={this.showDetails}
          widgets={this.state.widgets} />

        <p>
          <a id='show-widget-link' href='#'
            onClick={this.showAddWidget}>Add widget</a>
        </p>

        {this.state.addWidgetVisible && <AddWidget
          finishAdd={this.refreshList} />}

        {this.state.detailsVisible && <WidgetDetails
          isVisible={this.state.detailsVisible}
          hideDetails={this.hideDetails}
          widget={this.state.activeWidget} />} */}
      </div>
    )
  }
}

