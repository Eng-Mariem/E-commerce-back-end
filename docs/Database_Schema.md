# Database Schema

## users

| Field          | Type   | Constraints                     |
| -------------- | ------ | ------------------------------- |
| name           | String | required                        |
| email          | String | required, unique                |
| password       | String | required, hashed                |
| role           | String | enum: user, admin, default user |
| profilePicture | String | default empty                   |
| createdAt      | Date   | automatic timestamp             |
| updatedAt      | Date   | automatic timestamp             |

## products

| Field       | Type    | Constraints         |
| ----------- | ------- | ------------------- |
| name        | String  | required            |
| description | String  | required            |
| price       | Number  | required            |
| category    | String  | required            |
| image       | String  | optional            |
| stock       | Number  | required, default 0 |
| isActive    | Boolean | default true        |
| createdAt   | Date    | automatic timestamp |
| updatedAt   | Date    | automatic timestamp |

## carts

| Field          | Type     | Constraints                |
| -------------- | -------- | -------------------------- |
| user           | ObjectId | ref User, required         |
| items.product  | ObjectId | ref Product                |
| items.quantity | Number   | product quantity           |
| items.price    | Number   | product price at cart time |
| totalPrice     | Number   | calculated total           |
| createdAt      | Date     | automatic timestamp        |
| updatedAt      | Date     | automatic timestamp        |

## orders

| Field           | Type     | Constraints                                             |
| --------------- | -------- | ------------------------------------------------------- |
| user            | ObjectId | ref User, required                                      |
| items.product   | ObjectId | ref Product                                             |
| items.quantity  | Number   | product quantity                                        |
| items.price     | Number   | product price at order time                             |
| totalPrice      | Number   | calculated total                                        |
| shippingAddress | String   | required                                                |
| status          | String   | enum: pending, confirmed, shipped, delivered, cancelled |
| createdAt       | Date     | automatic timestamp                                     |
| updatedAt       | Date     | automatic timestamp                                     |

## feedbacks

| Field     | Type     | Constraints           |
| --------- | -------- | --------------------- |
| user      | ObjectId | ref User, required    |
| product   | ObjectId | ref Product, required |
| rating    | Number   | min 1, max 5          |
| comment   | String   | optional              |
| createdAt | Date     | automatic timestamp   |
| updatedAt | Date     | automatic timestamp   |

## Relationships

- One user can have one cart.
- One user can have many orders.
- One user can write many feedback entries.
- One product can appear in many carts, orders, and feedback entries.
