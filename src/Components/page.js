import React from "react";
import {Button, Column, Level, Navbar} from "rbx";

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


    <Column.Group  >
        {[1, 2, 3, 4,].map(i => (
            <Column key={i}>
                {products.slice(4*(i-1),4*i).map(product=>
                    <Level style={{display:"flex"}}>
                        <Cards product={product} />
                    </Level>
                )}
            </Column>
        ))}
    </Column.Group>


</React.Fragment>
