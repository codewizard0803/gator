import React from 'react'

class TestExpress extends React.Component {
  state = {
    data: null
  }

  componentDidMount() {
    this.callBackAPI()
    .then(res => this.setState({data: res.express}))
    .catch(err => console.log(err))
  }

  callBackAPI = async () => {
    const response = await fetch('/api/test')
    const body = await response.json()

    if(response.status !== 200) {
        throw Error(body.message)
    }
    return body
  }

  render() {
    return <div>
      <h1> testing backend api</h1>
      <p> This line is from backend: {this.state.data}</p>
    </div>
  }
}

export default TestExpress
