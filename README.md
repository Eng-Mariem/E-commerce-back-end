# Accessories E-commerce Frontend

React + Vite frontend connected to the Accessories E-commerce backend.

## Run

```bash
npm install
npm run dev
```

## Environment

Create `.env`:

```env
VITE_API_URL=https://e-commerce-back-end-sage.vercel.app/api
```

For local backend:

```env
VITE_API_URL=http://localhost:5000/api
```

## Implemented Pages

- Register
- Login
- Products list with search/category filter
- Product details
- Add product
- Edit product
- Cart
- Create order from cart
- My orders
- Profile update
- Feedback on product

## Notes

Protected pages require JWT token in localStorage. The Axios interceptor sends:

```text
Authorization: Bearer TOKEN
```
