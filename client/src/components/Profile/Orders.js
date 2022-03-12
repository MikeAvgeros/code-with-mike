import React, { useEffect } from "react";
import { useSnapshot } from "valtio";
import store from "../Store/Store";
import api from "../Api/Api";

const Orders = () => {
  const snap = useSnapshot(store);

  useEffect(() => {
    getOrders();
  }, [])

  const getOrders = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${snap.token}`,
      },
    };
    try {
      const { data } = await api.get("order/checkout/", config);
      store.orders = data;
    } catch (err) {
      alert(
        `An error occured while trying to get the wishlist items.\n\r${err}`
      );
    }
  };

  return <div>
    {/* <Stack direction="column" spacing={3}>
          {snap.orders.length > 0 && snap.orders.map((order, i) => (
            <Stack direction="column" spacing={3} key={i}>
              {order.items.map((item, idx) => (
                <Card key={idx}>
                  <Stack direction="row" spacing={2}>
                    <Typography>
                      {item.quantity} x
                    </Typography>
                    <Typography>
                      {item.item.name}
                    </Typography>
                  </Stack>
                </Card>
              ))}
            </Stack>
          ))}
        </Stack> */}
  </div>;
};

export default Orders;
