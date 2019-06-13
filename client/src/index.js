import React from 'react'
import ReactDOM from 'react-dom'
import * as serviceWorker from './serviceWorker'
import 'leaflet/dist/leaflet.css'
import 'semantic-ui-css/semantic.min.css'

import Routes from './routes/routes'

ReactDOM.render(
  <Routes />
  ,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
