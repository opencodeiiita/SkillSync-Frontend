# SkillSync API Endpoints

## Authentication

### 1. **User Registration**
**POST** `/api/auth/register`
- **Description**: Register a new user.
- **Request Body**:
  ```json
  {
    "username": "string",
    "email": "string",
    "password": "string"
  }
  ```
- **Response**:
  ```json
  {
    "message": "User registered successfully",
    "userId": "string"
  }
  ```

### 2. **User Login**
**POST** `/api/auth/login`
- **Description**: Authenticate a user.
- **Request Body**:
  ```json
  {
    "email": "string",
    "password": "string"
   }
  ```
- **Response**:
  ```json
  {
    "token": "string",
    "user": {
      "id": "string",
      "username": "string",
      "email": "string"
    }
  }
  ```

### 3. **User Logout**
**POST** `/api/auth/logout`
- **Description**: Log out a user.
- **Headers**:
  - Authorization: `Bearer <token>`
- **Response**:
  ```json
  {
    "message": "Logout successful"
  }
  ```

---

## User Profiles

### 4. **Get User Profile**
**GET** `/api/profile/:userId`
- **Description**: Retrieve user profile information.
- **Headers**:
  - Authorization: `Bearer <token>`
- **Response**:
  ```json
  {
    "id": "string",
    "username": "string",
    "email": "string",
    "skills": ["string"],
    "bio": "string",
    "portfolio": ["string"]
  }
  ```

### 5. **Update User Profile**
**PUT** `/api/profile/:userId`
- **Description**: Update profile details.
- **Headers**:
  - Authorization: `Bearer <token>`
- **Request Body**:
  ```json
  {
    "skills": ["string"],
      "bio": "string",
    "portfolio": ["string"]
  }
  ```
- **Response**:
  ```json
  {
    "message": "Profile updated successfully"
  }
  ```

---

## Session Management

### 6. **Create a Session**
**POST** `/api/sessions`
- **Description**: Schedule a new session.
- **Headers**:
  - Authorization: `Bearer <token>`
- **Request Body**:
  ```json
  {
    "mentorId": "string",
    "skill": "string",
    "dateTime": "ISO_8601 string",
    "duration": "integer (minutes)"
  }
  ```
- **Response**:
  ```json
  {
  "message": "Session created successfully",
    "sessionId": "string"
  }
  ```

### 7. **Get Sessions**
**GET** `/api/sessions`
- **Description**: Get all scheduled sessions for the authenticated user.
- **Headers**:
  - Authorization: `Bearer <token>`
- **Response**:
  ```json
  [
    {
      "sessionId": "string",
      "mentorId": "string",
      "skill": "string",
      "dateTime": "ISO_8601 string",
      "duration": "integer (minutes)",
      "status": "string"
    }
  ]
  ```

### 8. **Update a Session**
**PUT** `/api/sessions/:sessionId`
- **Description**: Update session details.
- **Headers**:
  - Authorization: `Bearer <token>`
- **Request Body**:
  ```json
   {
    "dateTime": "ISO_8601 string",
    "duration": "integer (minutes)",
    "status": "string"
  }
  ```
- **Response**:
  ```json
  {
    "message": "Session updated successfully"
  }
  ```

---

## Community Forum

### 9. **Get All Threads**
**GET** `/api/forum`
- **Description**: Retrieve all discussion threads.
- **Response**:
  ```json
  [
    {
      "threadId": "string",
      "title": "string",
      "author": "string",
      "createdAt": "ISO_8601 string"
    }
  ]
  ```
  
### 10. **Post a New Thread**
**POST** `/api/forum`
- **Description**: Create a new discussion thread.
- **Headers**:
  - Authorization: `Bearer <token>`
- **Request Body**:
  ```json
  {
    "title": "string",
    "content": "string"
  }
  ```
- **Response**:
  ```json
  {
    "message": "Thread created successfully",
    "threadId": "string"
  }
  ```

---

## Gamification

### 11. **Get Leaderboard**
**GET** `/api/gamification/leaderboard`
- **Description**: Retrieve the top mentors and learners leaderboard.
- **Response**:
  ```json
  [
    {
      "userId": "string",
        "username": "string",
      "points": "integer"
    }
  ]
