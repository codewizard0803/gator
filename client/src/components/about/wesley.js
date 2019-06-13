import React from 'react'
import mypic from './assets/wes.png'

const indent = {
  float: 'left',
  marginTop: '5px',
  marginLeft: '15px'
}

class Wesley extends React.Component {
    render() {
        return (
          <div style={indent}>
                  <h2> Wesley's About Page</h2>
                  <img src={mypic} width="250" height="250" alt="Wes"/>
                  <p>Hello, my name is Wesley Goldfisher. I am working as a backend developer on this website.</p>
          </div>
        )}
}

export default Wesley
