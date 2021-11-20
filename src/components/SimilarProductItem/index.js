// Write your code here
import './index.css'

const SimilarProductItem = props => {
  const {similarproductData} = props
  const {imageUrl, title, brand, rating, price} = similarproductData
  return (
    <li className="eachlistItemCon">
      <img
        src={imageUrl}
        className="image-sim"
        alt={`similar product ${title}`}
      />
      <div className="contentCon">
        <h1 className="sim-heaing">{title}</h1>
        <p className="sim-brand">by {brand}</p>
        <div className="rate-ratingCon">
          <p className="sim-price">Rs{price}/-</p>
          <div className="ratingStarCon">
            <p className="sim-ratin">{rating}</p>
            <img
              src="https://assets.ccbp.in/frontend/react-js/star-img.png"
              alt="star"
              className="sim-star"
            />
          </div>
        </div>
      </div>
    </li>
  )
}
export default SimilarProductItem
