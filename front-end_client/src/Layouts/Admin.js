import React, { useState, useEffect } from "react";

/* Components */
import AdminHeader from "../Components/AdminHeader";
import AdminOverview from "../Components/AdminOverview";
/* Components */

export default function Admin() {
  /* State variables */
  const [route, setRoute] = useState("AdminOverview");
  const [restaurants, setRestaurants] = useState([]);
  const [adminId, setAdminId] = useState("5f37012cfbb0d06529521af0");
  /* End State */

  /* Hooks effects */
  useEffect(() => {
    fetch(`http://192.168.0.7:3001/admin/getRestaurants?adminId=${adminId}`, {
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
        if (data && data.success && data.data)
          setRestaurants(
            data.data
              .concat(data.data)
              .concat(data.data)
              .concat(data.data)
              .concat(data.data)
              .concat(data.data)
          );
      })
      .catch((error) => {
        console.log("error getting restaurants", error);
      });
  }, []);
  /* End effects */
  return (
    <div className='Admin'>
      <AdminHeader />

      {route === "AdminOverview" ? (
        <AdminOverview restaurants={restaurants} />
      ) : (
        <></>
      )}
    </div>
  );
}
