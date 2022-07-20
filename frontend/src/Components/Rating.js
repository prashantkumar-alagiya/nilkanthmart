import React from 'react'

const Rating = ({value, text,color}) => {
    const rating = parseInt(value);
    const fullStar = Math.floor(rating);
    const halfStar = rating - fullStar ? 1 : 0;
    const emptyStar = 5 - fullStar - halfStar;
  return (
    <div className = "rating">
        <span>
            {new Array(fullStar).fill(1).map(() => {
                return <i style = {{color}} class="fa-solid fa-star"></i>
            })}
            {
                halfStar ? <i style = {{color}} class="fa-solid fa-star-half-stroke"></i> : ''
            }
            {new Array(emptyStar).fill(1).map(() => {
                return <i style = {{color}} class="fa-regular fa-star"></i>
            })}
        </span>
        <span className = "span-margin-small">{text && text}</span>
    </div>
  )
}

Rating.defaultProps  = {
    color: '#f8e825'
}

export default Rating;

