import React, { useEffect, useState } from 'react';
import 'rbx/index.css';
import {Card,Column,Image,Content,Level,Divider,Button,Navbar,Media,Title,Message} from 'rbx';
import Sidebar from "react-sidebar";
import CartCard from './Components/CartCard'
import Cards from './Components/Cards'
import db from './Components/db'
import firebase from 'firebase/app';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import 'firebase/auth';
import 'firebase/database';


const App = () => {
  const [data, setData] = useState({});
  const products = Object.values(data);
  const [dataInstock,setDataInstock]=useState({});
    var total = 0.0;

    const Welcome = ({ user }) => (
        <Message color="info">
            <Message.Header>
                Welcome, {user.displayName}
                <Button primary onClick={() => firebase.auth().signOut()}>
                    Log out
                </Button>
            </Message.Header>
        </Message>
    );
    const SignIn = () => (
        <StyledFirebaseAuth
            uiConfig={uiConfig}
            firebaseAuth={firebase.auth()}
        />
    );

    const [showShoppingCart,setShowShoppingcart]=useState(false);
    const [cartItems,setCartItems]=useState([]);
    const [user, setUser] = useState(null);
    cartItems.forEach((item) => {total += item.product.price * item.count})
    const uiConfig = {
        signInFlow: 'popup',
        signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID
        ],
        callbacks: {
            signInSuccessWithAuthResult: () => false
        }
    };

    useEffect(() => {
        const handleData = snap => {
            if(snap.val()) setDataInstock(snap.val());
        }
        db.on('value', handleData, error => alert(error));
        return () => { db.off('value', handleData); };
    }, []);


    useEffect(() => {
        const fetchProducts = async () => {
            const responseI = await fetch('./data/products.json');
            const jsonI = await responseI.json();
            setData(jsonI);
        };
        fetchProducts();
    }, []);

    useEffect(() => {
        firebase.auth().onAuthStateChanged(setUser);
    }, []);
    console.log(user)
  return (
      <React.Fragment>

          <Navbar>

            <Navbar.Brand>
                Nu-Shopping Cart
            </Navbar.Brand>

              <Navbar.Menu>
                  <Navbar.Segment>
                      { user ? <Welcome user={ user } /> : <SignIn /> }
                  </Navbar.Segment>
                  <Navbar.Segment align="end">
                      <Button onClick={()=>{setShowShoppingcart(! showShoppingCart);
                      console.log(cartItems)}}
                      >
                          cart
                      </Button>

                  </Navbar.Segment>
              </Navbar.Menu>
          </Navbar>
          <Sidebar open={showShoppingCart} pullRight={true} styles={{ sidebar: { background: "white" ,paddingTop:"50px",psoition:"fixed"} }} sidebar=
              {<React.Fragment>
                  <Message>
                      <Message.Header>
                          <p> total price</p>

                      </Message.Header>
                      <Message.Body>
                          ${parseFloat(total).toFixed(2)}
                      </Message.Body>
                  </Message>

              {cartItems.map((cartItem,index) =>(
              <Level>
                  <CartCard key={index} product={cartItem.product} size={cartItem.size} count={cartItem.count} state={{showShoppingCart,setShowShoppingcart,cartItems,setCartItems,stock:dataInstock,setDataInstock:setDataInstock} } user={user}/>
              </Level>

          ))}
              </React.Fragment>
              }/>

          <Column.Group  >
              {[1, 2, 3, 4,].map(i => (
                  <Column key={i}>
                      {products.slice(4*(i-1),4*i).map(product =>
                          <Level style={{display:"flex"}}>
                              <Cards state={{showShoppingCart,setShowShoppingcart,cartItems,setCartItems,stock :dataInstock,setDataInstock :setDataInstock}} product={product} user={user} />
                          </Level>
                      )}
                  </Column>
              ))}
          </Column.Group>


      </React.Fragment>


  );
};

export default App;
