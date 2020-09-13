import React from 'react'

const StarRating = (props) => { //alternatively use {rating} as the input
  console.log('test');
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= props.rating) {
      stars.push(<i key={i} className="fas fa-star text-warning"></i>);
    } else if (i === Math.ceil(props.rating) && !Number.isInteger(props.rating)) {
      stars.push(<i key={i} className="fas fa-star-half-alt text-warning"></i>);
    } else {
      stars.push(<i key={i} className="far fa-star text-warning"></i>);
    }
  }

  return (<>
    {stars}
  </>);

}

export default StarRating;
