import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

/* Components */
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Sections from "./Components/Sections";
import AddProductHandler from "./Components/AddProductHandler";
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

function App(props) {
  /* state */
  const [token, setToken] = useState(null);
  const [menu, setMenu] = useState(null);
  const [productToAdd, setProductToAdd] = useState({
    name: "papitas",
    ingredients: ["papas, pimienta, ajo"],
    description: "Papas al horno muy ricas",
    price: 4600,
    imgUrl: "",
  });
  const [order, setOrder] = useState([]);
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

  return (
    <div className='App'>
      {menu ? (
        <div>
          <Header />
          {productToAdd && (
            <AddProductHandler
              product={productToAdd}
              addProductToOrder={addProductToOrder}
            />
          )}
          <Sections
            sections={menu.pages[0]["sections"]}
            setProductToAdd={(p) => setProductToAdd(p)}
          />
          <Footer />
        </div>
      ) : (
        <h1>No he podido cargar el menu</h1>
      )}
    </div>
  );
}

export default App;
