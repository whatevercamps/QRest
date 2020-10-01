import React, { useEffect, useState } from "react";

/* Components */
import RestaurantHeader from "../Components/RestaurantHeader";
import NavHeader from "../Components/NavHeader";
import Sections from "../Components/Sections";
import AddProductHandler from "../Components/AddProductHandler";
import CartView from "../Components/CartView";
/* End components */

var getParams = function (url) {
  var params = {};
  var parser = document.createElement("a");
  parser.href = url;
  var query = parser.search.substring(1);
  var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    params[pair[0]] = decodeURIComponent(pair[1]);
  }
  return params;
};

function Client(props) {
  /* state */
  const [token, setToken] = useState(null);
  const [menu, setMenu] = useState(null);
  const [productToAdd, setProductToAdd] = useState(null);
  const [order, setOrder] = useState([
    {
      details: "Hola, sin queso, por favor",
      quantity: 2,
      product: {
        name: "papitas",
        ingredients: ["papas, pimienta, ajo"],
        description: "Papas al horno muy ricas",
        price: 4600,
        imgUrl: "",
      },
    },
  ]);
  const [viewCart, setViewCart] = useState(false);
  /* end state */

  /* Inner functions */

  const addProductToOrder = (product, quantity, details) => {
    const p = { product, quantity, details };
    let o = [...order];
    o.push(p);

    setOrder(o);
    setProductToAdd(null);
  };
  /* End of inner functions */

  /* Getting menu structure */
  useEffect(() => {
    const params = getParams(window.location.href);
    if (params && params.token) {
      setToken(params.token);
      fetch(
        `http://localhost:3001/client/getMenuStructure?token=${params.token}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
        .then((response) => {
          console.log("response", response);
          if (response.status === 200) return response.json();
          throw new Error("failed to authenticate user");
        })
        .then((data) => {
          if (data && data.success && data.data) setMenu(data.data);
        })
        .catch((error) => {
          console.log("error getting menu", error);
        });
    }
  }, []);

  /* Viewcart handler */
  const viewCartHandler = () => {
    if (order.length > 0 && viewCart === false) {
      setViewCart(true);
    } else if (viewCart === true) {
      setViewCart(false);
    }
  };
  /* End of viewcart handler */

  return (
    <div className='Client'>
      {menu ? (
        <div>
          <NavHeader
            setProductToAdd={setProductToAdd}
            productToAdd={productToAdd}
            orderQuantity={order.length}
            viewCartHandler={viewCartHandler}
          />
          <RestaurantHeader />
          {productToAdd && (
            <AddProductHandler
              product={productToAdd}
              addProductToOrder={addProductToOrder}
            />
          )}
          <Sections
            sections={menu}
            setProductToAdd={(p) => setProductToAdd(p)}
          />{" "}
          {viewCart && order.length > 0 && (
            <CartView order={order} token={token} />
          )}
        </div>
      ) : (
        <h1>No he podido cargar el menu</h1>
      )}
    </div>
  );
}

export default Client;
