import React from 'react'
import { NavLink } from 'react-router-dom'
import { withRouter }  from 'react-router'

const bar = {
  listStyleType: 'none',
  margin: '0',
  padding: '0',
  overflow: 'hidden',
  backgroundColor: '#333'
}

const links = {
  textDecoration: 'none',
  color: 'white',
  float: 'left'
}

const link = {
  display: 'block',
  color: 'white',
  textAlign: 'center',
  padding: '14px 16px',
  textDecoration: 'none'
}

class AboutNav extends React.Component {
  render() {
    return (
      <div>
        <ul style={bar}>
          <li style={links}>
            <NavLink to="/" replace style={link}>Home</NavLink>
          </li>
          <li style={links}>
            <NavLink to="/peter" replace style={link}>Peter</NavLink>
          </li>
          <li style={links}>
            <NavLink to="/jay" replace style={link}>Jay</NavLink>
          </li>
          <li style={links}>
            <NavLink to="/anthony" replace style={link}>Anthony</NavLink>
          </li>
          <li style={links}>
            <NavLink to="/wesley" replace style={link}>Wesley</NavLink>
          </li>
          <li style={links}>
            <NavLink to="/mehi" replace style={link}>Mehi</NavLink>
          </li>
          <li style={links}>
            <NavLink to="/franky" replace style={link}>Franky</NavLink>
          </li>
          <li style={links}>
            <NavLink to="/tanya" replace style={link}>Tanya</NavLink>
          </li>
        </ul>
      </div>
    )
  }
}

export default withRouter(AboutNav)