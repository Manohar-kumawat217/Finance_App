# Finance App Backend

## Endpoints

### Register User

**Endpoint :** `/finance/user/register`

**Method :** `POST`

**Description :** This endpoint is used to register a new user.

**Request Body :**

```json
{
  "userName": "string (required, min length: 3)",
  "email": "string (required, valid email format)",
  "password": "string (required, min length: 6)"
}
```

**Response Body :**

- 201 Created

```json
{
  "token": "string",
  "user": {
    "id": "string",
    "userName": "string",
    "email": "string"
  }
}
```

**Response Body :**

- 400 Bad Request

```json
{
  "errors": [
    {
      "msg": "string",
      "param": "string",
      "location": "string"
    }
  ]
}
```

**Response Body :**

- 500 Internal Server Error

```json
{
  "message": "Server Error => string"
}
```

**Example Request :**

```bash
curl -X POST http://localhost:3000/finance/user/register \
-H "Content-Type: application/json" \
-d '{
  "userName": "JohnDoe",
  "email": "johndoe@example.com",
  "password": "password123"
}'
```

**Example Response :**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "60d0fe4f5311236168a109ca",
    "userName": "JohnDoe",
    "email": "johndoe@example.com"
  }
}
```

### Login User

**Endpoint :** `/finance/user/login`

**Method :** `POST`

**Description :** This endpoint is used to log in an existing user.

**Request Body :**

```json
{
  "email": "string (required, valid email format)",
  "password": "string (required, min length: 6)"
}
```

**Response Body :**

- 200 OK

```json
{
  "token": "string",
  "user": {
    "id": "string",
    "userName": "string",
    "email": "string"
  }
}
```

**Response Body :**

- 400 Bad Request

```json
{
  "errors": [
    {
      "msg": "string",
      "param": "string",
      "location": "string"
    }
  ]
}
```

**Response Body :**

- 500 Internal Server Error

```json
{
  "message": "Server Error => string"
}
```

**Example Request :**

```bash
curl -X POST http://localhost:3000/finance/user/login \
-H "Content-Type: application/json" \
-d '{
  "email": "johndoe@example.com",
  "password": "password123"
}'
```

**Example Response :**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "60d0fe4f5311236168a109ca",
    "userName": "JohnDoe",
    "email": "johndoe@example.com"
  }
}
```

### Add Expense

**Endpoint :** `/finance/expense`

**Method :** `POST`

**Description :**
Create a new expense record for the authenticated user.

#### Request Body

| Field    | Type   | Description                    | Required |
| -------- | ------ | ------------------------------ | -------- |
| title    | String | Title of the expense           | Yes      |
| amount   | Number | Amount of the expense          | Yes      |
| category | String | Category of the expense        | Yes      |
| date     | Date   | Date of the expense (optional) | No       |

#### Example Request

```json
{
  "title": "Grocery Shopping",
  "amount": 50,
  "category": "Food",
  "date": "2023-10-01T00:00:00.000Z"
}
```

#### Example Response

```json
{
  "message": "Expense added successfully",
  "expense": {
    "_id": "615c1b8e8f1b2c001c8e4e8b",
    "userId": "615c1b8e8f1b2c001c8e4e8a",
    "title": "Grocery Shopping",
    "amount": 50,
    "category": "Food",
    "date": "2023-10-01T00:00:00.000Z",
    "createdAt": "2023-10-01T12:00:00.000Z",
    "updatedAt": "2023-10-01T12:00:00.000Z"
  }
}
```

#### Status Codes

- **201 Created**: Expense added successfully.
- **400 Bad Request**: Validation error, missing or invalid fields.
- **401 Unauthorized**: Authentication required.
- **500 Internal Server Error**: An error occurred on the server.

### Get Expenses

**Endpoint :** `/finance/expense`

**Method :** `GET`

**Description :**
Retrieve all expense records for the authenticated user.

#### Example Response

```json
[
  {
    "_id": "615c1b8e8f1b2c001c8e4e8b",
    "userId": "615c1b8e8f1b2c001c8e4e8a",
    "title": "Grocery Shopping",
    "amount": 50,
    "category": "Food",
    "date": "2023-10-01T00:00:00.000Z",
    "createdAt": "2023-10-01T12:00:00.000Z",
    "updatedAt": "2023-10-01T12:00:00.000Z"
  },
  {
    "_id": "615c1b8e8f1b2c001c8e4e8c",
    "userId": "615c1b8e8f1b2c001c8e4e8a",
    "title": "Bus Ticket",
    "amount": 2.5,
    "category": "Transport",
    "date": "2023-10-02T00:00:00.000Z",
    "createdAt": "2023-10-02T12:00:00.000Z",
    "updatedAt": "2023-10-02T12:00:00.000Z"
  }
]
```

#### Status Codes

- **200 OK**: Expenses retrieved successfully.
- **401 Unauthorized**: Authentication required.
- **500 Internal Server Error**: An error occurred on the server.
