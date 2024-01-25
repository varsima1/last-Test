import React from 'react'
import withLoader from './loader/withLoader'
import './scss/About.scss/About.scss'

function About() {
  return (
    <div className='About'>
      <h1>About</h1>
      <hr />
      <h2>🌟 Welcome to Scroll: Where Stories Unfold in Every Transaction 🌟</h2>
      <h2>Step into a marketplace like no other — welcome to Scroll, where each transaction tells a story.</h2>
      <h2>At Scroll, we've crafted an online haven where buyers and sellers connect, creating narratives through every purchase and sale.</h2>
      <h2>Here, your shopping experience is not just a transaction; it's a chapter in the ever-evolving story of Scroll.</h2>
      <h2>Join us on this journey, where every scroll unveils new possibilities.</h2>
      <h2>Happy scrolling!</h2>
      <hr/>
    <center>
      <h1>Tutorial!!!!!!!</h1>
      <hr/>
      <h2>This logo turn you back in this page</h2>
      <h1 className='Alogo'></h1>
      </center>
      <hr/>
      <h2>The next step is all about colors. Picture a bright white sun and a dark moon</h2>
      <h1 className='Dark'></h1>
      <hr/>
      <h2>Next, we embark on the journey of crafting a card, both in the bustling marketplace and for your application. It's a straightforward process — just click the '+' icon on the pages and meticulously complete all the essential details.<br/> <p style={{color:'red'}}>important!!!</p> if user is not Seller cannot see this icon</h2>
      <h1 className='Add'></h1>
      <hr/>
      <h2>in Market page you can sell and buy items</h2>
      <h1 className='Market'></h1>
      <hr/>
      <h2>Embark on your journey with us. Your entry point awaits - you can elegantly log in or begin your adventure with a simple sign-up, all right from this spot.</h2>
      <h1 className='log'></h1>
      <hr/>
      <h2>you can see all your cards here.this thing onlu seller user can see</h2>
      <h1 className='AmyCard'></h1>
      <hr/>
      <h2>if you are creating account you will see checkpoint,with this you become seller</h2>
      <h1 className='Aseller'></h1>
      <hr/>
      <h2>after login you will see small icon from there you can check your profile,edit information and logout</h2>
      <h1 className='Algoicon'></h1>
      <hr/>
      <h2>if you scroll to much and you want go up back just click this icon</h2>
      <h1 className='arrow'></h1>
      <hr/>
      <h2>when you go in market you can find this icon inside cards<br/> with this you can add item in Shopping Basket</h2>
      <h1 className='chooseitem'></h1>
      <hr/>
      <h2>when you choose item and click on shopping basket icon your icon become green.that mean you added the item in shopp page </h2>
      <h1 className='accepted'></h1>
      <hr/>
      <h2>your choosen item will be here</h2>
      <h1 className='busket'></h1>
      <hr/>
      <h2>if you are seller and you create card you will see 2 icons with this you can edit or delete your card.<br/>only seller can add delete or edit his own car</h2>
      <h1 className='sellericons'></h1>
    </div>
  )
}

export default withLoader(About);