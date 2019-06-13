import React from 'react'
import { Button } from 'semantic-ui-react'
import styled from 'styled-components'

const Container = styled.div`
  position: fixed;
  background-color: white;
  width: 100%;
`

const buttonStyle = {
  color: 'black',
  float: 'right',
  margin: '10px',
}

const Search = props => {
  return (
    <Container>
      <Button style={buttonStyle} color='yellow' onClick={props.handleFilter}>Toggle Filter</Button>
    </Container>
  )
}

export default Search