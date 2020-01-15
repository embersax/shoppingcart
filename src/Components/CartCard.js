import {Card, Image, Media, Title,Button} from "rbx";
import React from "react";
import App from "../App";


const CartCard = ({ product,size,count,state}) => {

    var setShowShoppingcart=Object.values(state)[1];
    var cartItems=Object.values(state)[2];
    var setCartItems=Object.values(state)[3];
    return (
        <Card>
            <Card.Content>
                <Media>
                    <Media.Item as="figure" align="left">
                        <Image.Container as="p" size={64}>
                            <Image
                                alt="64*64"
                                src={require('../../public/data/products/'+product.sku+'_2.jpg')}
                            />
                        </Image.Container>
                    </Media.Item>
                    <Media.Item>
                        <Title as="p" size={4}>
                            {product.title}
                        </Title>
                        <Title as="p" subtitle size={6}>
                            {count} x {size} - ${parseFloat(count*product.price).toFixed(2)}
                        </Title>
                    </Media.Item>
                </Media>
                <Button onClick={() => {

                    let index=cartItems.findIndex((item)=>{return item.product === product && item.size === size});

                    cartItems[index].count=0;
                    console.log(cartItems)

                    setCartItems(cartItems.filter((cartItem) => {return cartItem.count>0}));}}>
                    Remove Items
                </Button>
            </Card.Content>
        </Card>
    );
};

export default CartCard;
