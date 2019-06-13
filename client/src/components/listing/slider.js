import React from 'react'
import { Carousel } from 'react-bootstrap'

const Slider = props => {
  return (
    <Carousel interval={null}>
      {props.results.map(item => (
        <Carousel.Item key={item.photo_url}>
          <img
            src={item.photo_url}
            alt="slider"
            height={props.height}
            width={props.width}
          />
        </Carousel.Item>
      ))}
    </Carousel>
  )
}

export default Slider