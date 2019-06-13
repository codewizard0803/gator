import React from 'react'
import itme from './assets/mehipic.jpg'

class Mehi extends React.Component {
  render() {
    return <center><h1> Mehi's about page</h1>
    <img src={itme} alt="" width="400"/>
    <p>I'm a computer science senior at SFSU graduating this Spring !<br/>
    Some of my hobbies are art (drawing, painting, etc.), sewing (clothes and costumes), and story writing.</p></center>
  }
}

export default Mehi
