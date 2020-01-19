import React, { useEffect, useState } from 'react';
import 'rbx/index.css';
import {Card,Column,Image,Content,Level,Divider,Button,Navbar,Media,Title} from 'rbx';
import Sidebar from "react-sidebar";
import CartCard from './Components/CartCard'
import Cards from './Components/Cards'
import db from './Components/db'
// const Cards=({state,product})=>{
//     var setShowShoppingcart=state.setShowShoppingcart;
//     var cartItems=state.cartItems;
//     var setCartItems=state.setCartItems;
//     // var stocks=Object.values(stock);
//     // console.log(stock);
//     var stock=state.stock;
//     var setDataInstock=state.setDataInstock;
//     // // console.log( dataInstock[product.sku]);
//     // var item=dataInstock[product.sku];
//     // let sizes=["S","M","L","XL"];
//     // let newstock=dataInstock
//     console.log( stock[product.sku]);
//     // console.log( dataInstock[product.sku][size]);
//     // console.log(product);
//
//
//
//     // sizes=sizes.filter((key) => {return item[key]>0})
//
//
//     return(
//         <Card key={product.sku}>
//             <Card.Image>
//                 <Image.Container >
//                     <Image src={require('../public/data/products/'+product.sku+'_1.jpg')} />
//                 </Image.Container>
//             </Card.Image>
//             <Card.Content>
//                 <Content>
//                     {product.title}
//                     <Divider>
//                         {product.price+'$'}
//                     </Divider>
//                     <Divider>
//                         {product.description}
//                     </Divider>
//
//
//                 </Content>
//
//             </Card.Content>
//             <Button.Group>
//                 {["S","M","L","XL"].map(size=>
//                     <Button onClick={() => {
//                         console.log( stock);
//                         setShowShoppingcart(true);
//                         let index=cartItems.findIndex((item)=>{return item.product === product && item.size === size});
//                         if (index !==-1){
//                             cartItems[index].count++;
//                         }else{
//                             cartItems.push({product: product,size:size,count:1});
//                         }
//                         // console.log( dataInstock[product.sku][size]);
//                         setCartItems(cartItems);
//
//                     }}>
//
//                         {size}</Button>)}
//             </Button.Group>
//
//         </Card>
//     )
// }


const App = () => {
  const [data, setData] = useState({});
  const products = Object.values(data);
  const [dataInstock,setDataInstock]=useState({});
    const [showShoppingCart,setShowShoppingcart]=useState(false);
    const [cartItems,setCartItems]=useState([]);
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
        // const fetchStock = async () => {
        //             const response = await fetch('./data/inventory.json');
        //             const json = await response.json();
        //             setDataInstock(json);
        //         };

        fetchProducts();
        // fetchStock();


    }, []);


  // useEffect(()=>{
  //     const fetchStock = async () => {
  //         const response = await fetch('./data/inventory.json');
  //         const json = await response.json();
  //         setDataInstock(json);
  //     };
  //     fetchStock();
  // },[]);


  return (
      <React.Fragment>
          <Navbar>
            <Navbar.Brand>
                Nu-Shopping Cart
            </Navbar.Brand>

              <Navbar.Menu>
                  <Navbar.Segment align="end">
                      <Button onClick={()=>{setShowShoppingcart(! showShoppingCart);
                      console.log(dataInstock)}}
                      >
                          🛒
                      </Button>

                  </Navbar.Segment>
              </Navbar.Menu>
          </Navbar>
          <Sidebar open={showShoppingCart} pullRight={true} styles={{ sidebar: { background: "black" } }}
          sidebar={cartItems.map((cartItem,index) =>(
              <Level>
                  <CartCard key={index} product={cartItem.product} size={cartItem.size} count={cartItem.count} state={{showShoppingCart,setShowShoppingcart,cartItems,setCartItems,stock:dataInstock,setDataInstock:setDataInstock}}/>
              </Level>
          ))}/>

          <Column.Group  >
              {[1, 2, 3, 4,].map(i => (
                  <Column key={i}>
                      {products.slice(4*(i-1),4*i).map(product =>
                          <Level style={{display:"flex"}}>
                              <Cards state={{showShoppingCart,setShowShoppingcart,cartItems,setCartItems,stock :dataInstock,setDataInstock :setDataInstock}} product={product} />
                          </Level>
                      )}
                  </Column>
              ))}
          </Column.Group>


      </React.Fragment>


  );
};

export default App;
