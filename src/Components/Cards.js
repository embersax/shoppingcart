import {Button, Card, Content, Divider, Image} from "rbx";
import React from "react";


const Cards=({product,state})=>{
    var setShowShoppingcart=Object.values(state)[1];
    var cartItems=Object.values(state)[2];
    var setCartItems=Object.values(state)[3];
    return(
        <Card key={product.sku}>
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
                {['S','M','L','XL'].map(size=>
                    <Button onClick={() => {
                        setShowShoppingcart(true);
                        let index=cartItems.findIndex((item)=>{return item.product === product && item.size === size});
                        if (index !==-1){
                            cartItems[index].count++;
                        }else{
                            cartItems.push({product: product,size:size,count:1});
                        }

                        setCartItems(cartItems);

                    }}>

                        {size}</Button>)}
            </Button.Group>

        </Card>
    )
}

export default Cards;
