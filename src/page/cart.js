import React from "react";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Container,
  Button,
  Box,
} from "@mui/material";
import FormTitle from "../components/title/form-title";
import { useNavigate } from "react-router-dom";
import UserLayout from "../layout/userLayout";

const Cart = () => {
  const cartItems = [
    { id: 1, name: "Product 1", price: 100, quantity: 2 },
    { id: 2, name: "Product 2", price: 150, quantity: 1 },
    { id: 3, name: "Product 3", price: 200, quantity: 3 },
  ];

  const navigate = useNavigate();
  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <UserLayout>
      <Container maxWidth="md">
        <FormTitle title={"Cart"} />
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Product</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cartItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>${item.price}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>${item.price * item.quantity}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" style={{ marginTop: 20 }}>
            Total: ${calculateTotal()}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              navigate("/checkout");
            }}
            style={{ marginTop: 20 }}
          >
            Checkout
          </Button>
        </Box>
      </Container>
    </UserLayout>
  );
};

export default Cart;
