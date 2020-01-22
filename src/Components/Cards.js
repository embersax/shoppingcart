import {Button, Card, Content, Divider, Image,Message} from "rbx";
import React from "react";


const Cards=({state,product})=>{
    const setShowShoppingcart=state.setShowShoppingcart;
    const cartItems=state.cartItems;
    const setCartItems=state.setCartItems;

    const stock=state.stock;
    const setDataInstock=state.setDataInstock;

    let sizes=["S","M","L","XL"].filter((key) => {
        if (!stock) return true;
        if (!stock[product.sku]) return true;
        return stock[product.sku][key]>0
    });

    return(
        <Card key={product.sku}  style={{height:"100%", display:"flex", flexDirection:"column"}}>
            <Card.Image>
                <Image.Container >
                    <Image src={require('../../public/data/products/'+product.sku+'_1.jpg')} />
                </Image.Container>
            </Card.Image>
            <Card.Content>
                <Content>
                    <Message color="primary">
                        <Message.Header>
                            {product.title}
                        </Message.Header>
                        <Message.Body>
                    <Divider>
                        {product.price+'$'}
                    </Divider>
                    <Divider>
                        {product.description}
                    </Divider>
                        </Message.Body>
                    </Message>

                </Content>

            </Card.Content>
            <Button.Group align="centered" >
                { sizes.length >0 ?

                    sizes.map(size=>
                    <Button onClick={() => {
                        // console.log( stock);
                        setShowShoppingcart(true);
                        let index=cartItems.findIndex((item)=>{return item.product === product && item.size === size});
                        if (index !==-1){
                            cartItems[index].count++;
                        }else{

                            cartItems.push({product: product,size:size,count:1});
                        }
                        // console.log( stock[product.sku][size]);
                        let newstock=stock;
                        newstock[product.sku][size]--;
                        setDataInstock(newstock);
                        setCartItems(cartItems);

                    }}>

                        {size}</Button>) :
                <Button>
                    OUT OF STOCK
                </Button>
                }
            </Button.Group>

        </Card>
    )
}

export default Cards;
