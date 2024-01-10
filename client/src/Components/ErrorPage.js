import React from 'react'
import './scss/Error/Error.scss'
import { Link } from 'react-router-dom';

function ErrorPage() {
  return (
    <div class="flex-container">
  <div class="text-center">
    <h1>
      <span class="fade-in" id="digit1">4</span>
      <span class="fade-in" id="digit2">0</span>
      <span class="fade-in" id="digit3">4</span>
    </h1>
    <h3 class="fadeIn">PAGE NOT FOUND</h3>
    <br/><br/><br/>
    <Link to="/"><button type="button" name="button">Return To Home</button></Link>
  </div>
</div>
  )
}

export default ErrorPage
