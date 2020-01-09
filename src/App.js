import React, { useEffect, useState } from 'react';
import 'rbx/index.css';
import {Card,Column,Image,Content,Level} from 'rbx';


const Cards=({product})=>{
  return(
      <Card key={product.sku}>
        <Card.Image>
          <Image.Container >
            <Image src={require('../public/data/products/'+product.sku+'_1.jpg')} />
          </Image.Container>
        </Card.Image>
        <Card.Content>
          <Content>
            {product.title}
            {product.price}

          </Content>
        </Card.Content>
      </Card>
  )
}







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

  return (
      <Column.Group  >
        {[1, 2, 3, 4,].map(i => (
            <Column key={i}>
              {products.slice(4*(i-1),4*i).map(product=>
                  <Level style={{display:"flex"}}>
                    <Cards product={product}/>
                  </Level>
              )}
            </Column>
        ))}
      </Column.Group>
  );
};

export default App;
