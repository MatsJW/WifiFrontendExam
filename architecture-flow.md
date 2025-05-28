# 🔄 WiFi Exam System Service Interactions

```mermaid
flowchart TD
    %% User Layer
    User[👤 User] --> Frontend[📱 Vue 3 Frontend<br/>localhost:3000]
      %% Authentication Service
    Frontend --> ClerkAuth[🔐 Clerk Authentication Service]
    ClerkAuth --> |JWT Token| Frontend

    %% API Communication
    Frontend --> |Authenticated Requests<br/>with JWT Token| Backend[⚙️ .NET 9 Backend<br/>localhost:8080]
    Backend --> AuthService[🔒 Backend Auth Service]
    Backend --> RolesService[👥 Roles Service]
    Backend --> ImportService[📥 Import Service]

    %% Auth Service validates with Clerk
    AuthService --> |Validate JWT Token| ClerkAuth
    ClerkAuth --> |Token Valid/Invalid| AuthService

    %% Database Service
    Backend --> PostgreSQL[🐘 PostgreSQL Database]

    %% Data Sources
    JSONFiles[📁 JSON WiFi Data] --> ImportService
    ImportService --> PostgreSQL
    PostgreSQL --> Backend
    Backend --> |JSON Response| Frontend
    Frontend --> |Charts & Tables| User

    %% Infrastructure
    Docker[🐳 Docker Compose] --> PostgreSQL
    Docker --> Backend

    %% Styling Classes
    classDef frontend fill:#42b883,stroke:#369870,stroke-width:2px,color:#fff
    classDef backend fill:#512bd4,stroke:#3c1e9e,stroke-width:2px,color:#fff
    classDef database fill:#336791,stroke:#26547c,stroke-width:2px,color:#fff
    classDef auth fill:#ff6b35,stroke:#e55a2b,stroke-width:2px,color:#fff
    classDef infrastructure fill:#2496ed,stroke:#1a7bc4,stroke-width:2px,color:#fff
    classDef data fill:#28a745,stroke:#1e7e34,stroke-width:2px,color:#fff

    %% Apply Classes
    class Frontend frontend
    class Backend,AuthService,RolesService,ImportService backend
    class PostgreSQL database
    class ClerkAuth auth
    class Docker infrastructure
    class JSONFiles data
```

## 🔄 Service Interactions

### 1. **Authentication Flow**

- **Frontend** authenticates users via **Clerk Authentication Service**
- **Clerk** provides JWT tokens for API access
- **Frontend** sends requests with JWT tokens to **Backend**
- **Backend Auth Service** validates JWT tokens by communicating with **Clerk**
- **Clerk** confirms token validity back to **Backend Auth Service**

### 2. **API Communication**

- **Frontend** makes authenticated requests to **Backend API**
- **Backend** serves three main endpoints:
  - Ship IDs, Data Usage, Sales information
- **Roles Service** controls ship-specific access permissions

### 3. **Data Management**

- **Import Service** processes JSON WiFi data files
- **PostgreSQL Database** stores all WiFi usage and sales data
- **Backend** queries database and returns formatted responses

### 4. **Infrastructure**

- **Docker Compose** orchestrates database and backend services
- Services communicate over internal Docker network
- **Frontend** runs independently and connects via HTTP API

## 🔧 Key Service Dependencies

- **Frontend** ↔ **Clerk Authentication** ↔ **Backend Auth Service**
- **Backend Auth Service** ↔ **Clerk** (JWT validation)
- **Backend** ↔ **PostgreSQL Database**
- **JSON Data** → **Import Service** → **Database**
- **Docker** → **Backend + Database** containers
