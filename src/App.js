import React, { useEffect, useState } from 'react';
import 'rbx/index.css';
import {Card,Column,Image,Content,Level,Divider,Button,Navbar,Media,Title} from 'rbx';
import Sidebar from "react-sidebar";
import CartCard from './Components/CartCard'
import Cards from './Components/Cards'
// const Cards=({product,state})=>{
//   var setShowShoppingcart=Object.values(state)[1];
//   var cartItems=Object.values(state)[2];
//   var setCartItems=Object.values(state)[3];
//   return(
//       <Card key={product.sku}>
//         <Card.Image>
//           <Image.Container >
//             <Image src={require('../public/data/products/'+product.sku+'_1.jpg')} />
//           </Image.Container>
//         </Card.Image>
//         <Card.Content>
//           <Content>
//             {product.title}
//             <Divider>
//                 {product.price+'$'}
//             </Divider>
//               <Divider>
//                   {product.description}
//               </Divider>
//
//
//           </Content>
//
//         </Card.Content>
//           <Button.Group>
//               {['S','M','L','XL'].map(size=>
//                   <Button onClick={() => {
//                   setShowShoppingcart(true);
//                   cartItems.push(product);
//                   setCartItems(cartItems);
//                   console.log(cartItems)
//                   }
//                   }>
//
//                       {size}</Button>)}
//           </Button.Group>
//       </Card>
//   )
// }

// const cartCard = ({ item }) => {
//     console.log("made a cartCard!!");
//
//     return (
//         <Card>
//             <Card.Content>
//                 <Media>
//                     <Media.Item as="figure" align="left">
//                         <Image.Container as="p" size={64}>
//                             <Image
//                                 // alt="64*64"
//                                 src={require('../../public/data/products/'+item.sku+'_2.jpg')}
//                             />
//                         </Image.Container>
//                     </Media.Item>
//                     <Media.Item>
//                         <Title as="p" size={4}>
//                             {item.title}
//                         </Title>
//                         <Title as="p" subtitle size={6}>
//                             {item.price}
//                         </Title>
//                     </Media.Item>
//                 </Media>
//             </Card.Content>
//         </Card>
//     );
// };
//test github



const App = () => {
  const [data, setData] = useState({});
  const products = Object.values(data);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('./data/products.json');
      const json = await response.json();
      setData(json);
    };
    fetchProducts();
  }, []);
    const [showShoppingCart,setShowShoppingcart]=useState(false);
    const [cartItems,setCartItems]=useState([]);
  return (
      <React.Fragment>
          <Navbar>
            <Navbar.Brand>
                Nu-Shopping Cart
            </Navbar.Brand>
              <Navbar.Menu>
                  <Navbar.Segment align="end">
                      <Button onClick={()=>{setShowShoppingcart(! showShoppingCart);
                      console.log(showShoppingCart)}}
                      >
                          🛒
                      </Button>

                  </Navbar.Segment>
              </Navbar.Menu>
          </Navbar>
          <Sidebar open={showShoppingCart} pullRight={true} styles={{ sidebar: { background: "black" } }}
          sidebar={cartItems.map(cartItem =>(
              <Level>
                  <CartCard product={cartItem.product} size={cartItem.size} count={cartItem.count} state={{showShoppingCart,setShowShoppingcart,cartItems,setCartItems}}/>
              </Level>
          ))}/>

          <Column.Group  >
              {[1, 2, 3, 4,].map(i => (
                  <Column key={i}>
                      {products.slice(4*(i-1),4*i).map(product=>
                          <Level style={{display:"flex"}}>
                              <Cards state={{showShoppingCart,setShowShoppingcart,cartItems,setCartItems}} product={product} />
                          </Level>
                      )}
                  </Column>
              ))}
          </Column.Group>


      </React.Fragment>


  );
};

export default App;
