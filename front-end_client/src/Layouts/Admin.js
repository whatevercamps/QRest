import React, { useState, useEffect } from "react";

/* Components */
import AdminHeader from "../Components/AdminHeader";
import AdminOverview from "../Components/AdminOverview";
import EditMenuView from "../Components/EditMenuView";
/* Components */

export default function Admin() {
  /* State variables */
  const [route, setRoute] = useState("AdminOverview");
  const [restaurants, setRestaurants] = useState([]);
  const [adminId, setAdminId] = useState("5f37012cfbb0d06529521af0");
  const [menuToEditId, setMenuToEditId] = useState(null);
  const [menuToEdit, setMenuToEdit] = useState(null);
  /* End State */

  /* Functions */
  const goHome = () => {
    setMenuToEdit(null);
  };

  const saveChangesHandler = () => {
    fetch(
      `http://localhost:3001/admin/setMenuStructure?restaurantId=${menuToEditId}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ menuStructure: menuToEdit }),
      }
    ).then((res) => {
      console.log("resp", res);

      if (res.status === 200) {
        console.log("mensaje enviado");
      }
    });
  };
  /* End functions */

  /* Hooks effects */
  useEffect(() => {
    fetch(`http://localhost:3001/admin/getRestaurants?adminId=${adminId}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        console.log("response", response);
        if (response.status === 200) return response.json();
        throw new Error("failed to authenticate user");
      })
      .then((data) => {
        console.log("data", data);
        if (data && data.success && data.data) setRestaurants(data.data);
      })
      .catch((error) => {
        console.log("error getting restaurants", error);
      });
  }, []);
  /* End effects */
  return (
    <div className='Admin'>
      <AdminHeader />

      {menuToEdit ? (
        <EditMenuView
          menu={menuToEdit}
          setMenu={setMenuToEdit}
          saveChangesHandler={saveChangesHandler}
        />
      ) : (
        <AdminOverview
          restaurants={restaurants}
          setMenuToEdit={setMenuToEdit}
          setMenuToEditId={setMenuToEditId}
        />
      )}
    </div>
  );
}
