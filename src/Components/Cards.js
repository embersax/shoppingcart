import {Button, Card, Content, Divider, Image} from "rbx";
import React from "react";


const Cards=({state,product})=>{
    var setShowShoppingcart=state.setShowShoppingcart;
    var cartItems=state.cartItems;
    var setCartItems=state.setCartItems;
    // var stocks=Object.values(stock);
    // console.log(stock);
    var stock=state.stock;
    var setDataInstock=state.setDataInstock;
    // // console.log( dataInstock[product.sku]);
    // var item=dataInstock[product.sku];
    // let sizes=["S","M","L","XL"];
    // let newstock=dataInstock
    // var a=stock[product.sku]
    // console.log( stock[product.sku]["S"]);
    // console.log( dataInstock[product.sku][size]);
    // console.log(product);



    // sizes=sizes.filter((key) => {return item[key]>0})


    return(
        <Card key={product.sku}  style={{height:"100%", display:"flex", flexDirection:"column"}}>
            <Card.Image>
                <Image.Container >
                    <Image src={require('../../public/data/products/'+product.sku+'_1.jpg')} />
                </Image.Container>
            </Card.Image>
            <Card.Content>
                <Content>
                    {product.title}
                    <Divider>
                        {product.price+'$'}
                    </Divider>
                    <Divider>
                        {product.description}
                    </Divider>


                </Content>

            </Card.Content>
            <Button.Group>
                {["S","M","L","XL"].filter((key) => {return stock[product.sku][key]>0}).map(size=>
                    <Button onClick={() => {
                        // console.log( stock);
                        setShowShoppingcart(true);
                        let index=cartItems.findIndex((item)=>{return item.product === product && item.size === size});
                        if (index !==-1){
                            cartItems[index].count++;
                        }else{
                            cartItems.push({product: product,size:size,count:1});
                        }
                        console.log( stock[product.sku][size]);
                        setCartItems(cartItems);

                    }}>

                        {size}</Button>)}
            </Button.Group>

        </Card>
    )
}

export default Cards;
