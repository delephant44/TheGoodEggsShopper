import React from 'react'
import {connect} from 'react-redux'
import CheckoutForm from './checkout-form-component'
import {me} from '../store/user'
import {newOrder} from '../store/checkout'
import history from '../history'
import {clearCart} from '../store/cart'

class Checkout extends React.Component {
  constructor() {
    super()
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      shippingAddress: '',
      phoneNumber: '',
      creditCard: '',
      paymentType: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentDidMount = async () => {
    await this.props.findUser()
    const {firstName, lastName, email, address, phone} = this.props.user
    //must be inside the if statement otherwise will turn into an uncontrolled componenet
    if (this.props.user) {
      this.setState({
        firstName,
        lastName,
        email,
        shippingAddress: address,
        phoneNumber: phone
      })
    }
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    const cartItems = JSON.parse(localStorage.getItem('cart'))
    const purchaseTotal = cartItems
      .map(p => p.product.price * p.quantity)
      .reduce((a, b) => a + b, 0)
    this.props.addOrder({
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      phone: this.state.phoneNumber,
      address: this.state.shippingAddress,
      userId: this.props.user.id,
      purchasedTotal: purchaseTotal
    })
    this.props.clear()
    history.push('/thankyou')
  }

  render() {
    return (
      <CheckoutForm
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        userInfo={{
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          email: this.state.email,
          shippingAddress: this.state.shippingAddress,
          phoneNumber: this.state.phoneNumber,
          creditCard: this.state.creditCard,
          paymentType: this.state.paymentType
        }}
      />
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user.currentUser
  }
}

const mapDispatchToProps = dispatch => {
  return {
    findUser: () => dispatch(me()),
    addOrder: value => dispatch(newOrder(value)),
    clear: () => dispatch(clearCart())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
