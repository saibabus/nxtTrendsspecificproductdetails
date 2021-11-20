// Write your code here
import './index.css'
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'

import Header from '../Header'
import SimilarProductItem from '../SimilarProductItem'

const apistatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  process: 'IN_PROGRESS',
  failure: 'FAILURE',
}

class ProductItemDetails extends Component {
  state = {
    apistatus: apistatusConstants.initial,
    productDetailsBrief: {},
    similarproductDetials: [],
    count: 1,
  }

  componentDidMount() {
    this.getproductdetails()
  }

  getproductdetails = async () => {
    this.setState({
      apistatus: apistatusConstants.process,
    })
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(`https://apis.ccbp.in/products/${id}`, options)
    console.log(response)
    const data = await response.json()
    console.log(data)
    if (response.ok) {
      const updateddata = {
        id: `${data.id}`,
        availability: `${data.availability}`,
        description: `${data.description}`,
        brand: `${data.brand}`,
        price: `${data.price}`,
        rating: `${data.rating}`,
        imageUrl: `${data.image_url}`,
        title: `${data.title}`,
        totalReviews: `${data.total_reviews}`,
      }

      const updatesimilarproducts = data.similar_products.map(each => ({
        id: each.id,
        availability: each.availability,
        description: each.description,
        brand: each.brand,
        price: each.price,
        rating: each.rating,
        imageUrl: each.image_url,
        title: each.title,
        totalReviews: data.total_reviews,
      }))

      this.setState({
        productDetailsBrief: updateddata,
        similarproductDetials: updatesimilarproducts,
        apistatus: apistatusConstants.success,
      })
    } else {
      this.setState({apistatus: apistatusConstants.failure})
    }
  }

  onIncrease = () => {
    this.setState(prevstate => ({count: prevstate.count + 1}))
  }

  onDecrease = () => {
    const {count} = this.state
    if (count !== 1) {
      this.setState(prevstate => ({count: prevstate.count - 1}))
    }
  }

  rendergetproductsuccesView = () => {
    const {productDetailsBrief, similarproductDetials, count} = this.state

    return (
      <>
        <div className="itemdetailsCon">
          <img
            src={productDetailsBrief.imageUrl}
            alt="product"
            className="eachItemImg"
          />
          <div className="eachproductConContai">
            <h1 className="eachProduct-name">{productDetailsBrief.title}</h1>
            <p className="eachProduct-price">
              Rs {productDetailsBrief.price}/-{' '}
            </p>
            <div className="ratingCon">
              <p className="eachProduct-rating">{productDetailsBrief.rating}</p>
              <img
                src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                alt="star"
                className="starImg"
              />
            </div>
            <p className="eachProduct-description">
              {productDetailsBrief.description}
            </p>
            <p className="eachProduct-availability ">
              <span className="spanstyle">Available: </span>
              {productDetailsBrief.availability}
            </p>
            <p className="eachProduct-brand ">
              <span className="spanstyle">Brand: </span>
              {productDetailsBrief.brand}
            </p>
            <hr className="lineis" />
            <div className="increCon">
              <button
                testid="minus"
                type="button"
                className="countButtons"
                onClick={this.onDecrease}
              >
                <BsDashSquare className="iconstyles" />
              </button>
              <p className="count">{count}</p>
              <button
                testid="plus"
                type="button"
                className="countButtons"
                onClick={this.onIncrease}
              >
                <BsPlusSquare className="iconstyles" />
              </button>
            </div>

            <div>
              <button type="button" className="addcartbtn">
                ADD TO CART
              </button>
            </div>
          </div>
        </div>
        <h1 className="similar-heading">Similar Products</h1>

        <ul className="similarproductsCon">
          {similarproductDetials.map(each => (
            <SimilarProductItem similarproductData={each} key={each.id} />
          ))}
        </ul>
      </>
    )
  }

  changingfromFailureView = () => {
    const {history} = this.props
    history.replace('/products')
  }

  renderFailureView = () => (
    <div className="failureCon">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
        alt="failure view"
        className="error-img"
      />
      <h1 className="failure-heading">Product Not Found</h1>
      <div>
        <button
          type="button"
          className="failurebtn"
          onClick={this.changingfromFailureView}
        >
          Continue Shopping
        </button>
      </div>
    </div>
  )

  renderLoadingView = () => (
    <div className="products-loader-container">
      <div testid="loader">
        <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
      </div>
    </div>
  )

  renderingDiffrentViews = () => {
    const {apistatus} = this.state
    switch (apistatus) {
      case apistatusConstants.process:
        return this.renderLoadingView()
      case apistatusConstants.success:
        return this.rendergetproductsuccesView()
      case apistatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="productItemDetailsCon">
          {this.renderingDiffrentViews()}
        </div>
      </>
    )
  }
}
export default ProductItemDetails
