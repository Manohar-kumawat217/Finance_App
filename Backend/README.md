# Finance App Backend

## Endpoints

### Register User

**Endpoint:** `/finance/user/register`

**Method:** `POST`

**Description:** This endpoint is used to register a new user.

**Request Body:**

```json
{
  "userName": "string (required, min length: 3)",
  "email": "string (required, valid email format)",
  "password": "string (required, min length: 6)"
}
```

**Response Body:**

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

**Response Body:**

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

**Response Body:**

- 500 Internal Server Error

```json
{
  "message": "Server Error => string"
}
```

**Example Request:**

```bash
curl -X POST http://localhost:3000/finance/user/register \
-H "Content-Type: application/json" \
-d '{
  "userName": "JohnDoe",
  "email": "johndoe@example.com",
  "password": "password123"
}'
```

**Example Response:**

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

**Endpoint:** `/finance/user/login`

**Method:** `POST`

**Description:** This endpoint is used to log in an existing user.

**Request Body:**

```json
{
  "email": "string (required, valid email format)",
  "password": "string (required, min length: 6)"
}
```

**Response Body:**

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

**Response Body:**

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

**Response Body:**

- 500 Internal Server Error

```json
{
  "message": "Server Error => string"
}
```

**Example Request:**

```bash
curl -X POST http://localhost:3000/finance/user/login \
-H "Content-Type: application/json" \
-d '{
  "email": "johndoe@example.com",
  "password": "password123"
}'
```

**Example Response:**

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
