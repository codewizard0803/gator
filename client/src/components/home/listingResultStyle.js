import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

export const Container = styled.div`
  margin: 0 auto;
  text-align: center;
`

export const Link = styled(NavLink)`
  color: black;
  :hover {
    color: #330033;
  }
`

export const Card = styled.div`
  width: 280px;
  display: inline-block;
  margin: 20px 20px 20px 20px;
  padding-bottom: 15px;
  border-radius: 10px;
  background-color: white;
  box-shadow: 0px 1px 2px grey; 
`

export const Image = styled.img`
  width: 100%;
  height: 150px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border: 1px solid #dfdfdf;
`

export const Title = styled.div`
  font-weight: bold;
  font-size: 15px;
  text-align: left
  padding-top: 15px;
  padding-bottom: 15px;
  padding-left: 15px;
  width: 50%;
  display: inline-block;
`

export const Type = styled.div`
  width: 50%;
  padding-top: 15px;
  padding-bottom: 15px;
  display: inline-block;
  text-align: right;
`

export const Details = styled.p`  
  text-align: left;
  padding-left: 15px;
  color: #3f3f3f;
`

export const Address = styled.p`
  text-align: left;
  padding-left: 15px;
  color: #595959;
`

export const Space = styled.span`
  padding-right: 8px;
`

export const Circle = styled.span`
  height: 10px;
  width: 10px;
  margin-right: 5px;
  border-radius: 50%;
  background-color: green; 
  display: inline-block;
`

export const Span = styled.span`
  padding-right: 10px;
  color: #595959;
`