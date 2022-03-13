import React from 'react'
import {
  Card,
  CardContent,
  Stack,
  CardHeader,
} from "@mui/material";

const Order = ({ order }) => {
  return (
    <Card sx={{ width: "100%" }}>
      <CardHeader
        sx={{
          height: "24px",
          backgroundImage: "linear-gradient(to right, #5e35b1, #d81b60)",
        }}
      />
      <CardContent sx={{ width: "100%" }}>
        {order.items && order.items.map((item, i) => (
          <Stack direction="row" spacing={5}>
            <p style={{width: "300px"}}>{item.item.name}</p>
            <p>Months: {item.quantity}</p>
            <p>Total: {item.total_price}</p>
          </Stack>
        ))}
        <p>Grand Total: {order.total_price}</p>
        <p>Date of Purchase: {order.created_at}</p>
      </CardContent>
    </Card>
  )
}

export default Order