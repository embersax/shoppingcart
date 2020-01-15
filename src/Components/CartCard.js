import {Card, Image, Media, Title,Button} from "rbx";
import React from "react";
import App from "../App";


const CartCard = ({ item }) => {
    console.log(item);

    return (
        <Card>
            <Card.Content>
                <Media>
                    <Media.Item as="figure" align="left">
                        <Image.Container as="p" size={64}>
                            <Image
                                alt="64*64"
                                src={require('../../public/data/products/'+item.sku+'_2.jpg')}
                            />
                        </Image.Container>
                    </Media.Item>
                    <Media.Item>
                        <Title as="p" size={4}>
                            {item.title}
                        </Title>
                        <Title as="p" subtitle size={6}>
                            {item.price}
                        </Title>
                    </Media.Item>
                </Media>
                {/*<Button onClick={removeItems(item.id)}>*/}

                {/*</Button>*/}
            </Card.Content>
        </Card>
    );
};

export default CartCard;
