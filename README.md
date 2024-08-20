# React Social

This project gave me the opportunity to get up to speed with React and its ecosystem. I also get the chance to experiment TantStack Query while managing the server in Node.js, using Express.js

This README provides instructions on how to set up and run the project, including launching the PostgreSQL database server, installing dependencies, and running the development server.

## Prerequisites

- **Docker**: Ensure Docker is installed on your machine.
- **Bun**: The project uses Bun for package management and running scripts.
- **Node.js and npm**: Required for running some commands.

## 1. Launch the PostgreSQL Database Server

Use Docker Compose to launch the PostgreSQL database server.

### Steps:

1. **Start the PostgreSQL server:**

   ```bash
   docker-compose up -d

   ```

1. **Verify the server is running::**
   ```bash
   docker ps

   ```

## 2. Install dependencies

Navigate to the root of your project and install all required dependencies using Bun.

```bash
 bun install
```

## 3. Set Up Prisma

The project uses Prisma as the ORM. You need to generate the Prisma client and run migrations.

### Steps:

1. **Nagivate to the server folder**

   ```bash
   cd server

   ```

2. **Generate the Prisma client:**
   ```bash
   npx prisma generate
   ```
3. **Run database migrations:**
   ```bash
   npx prisma migrate dev --name init

   ```

## 4. Run the Development Server

The project is split into two parts: the client and the server. **From the root folder**, use Bun to start both in development mode.

### Steps:

1. **Start the client:**

```bash
bun client:dev
```

2. **Start the server:**

```bash
bun server:dev
```

## FAQ

### CORS Error

If you encounter CORS issues, ensure that the origin in index.ts is set to the correct frontend URL.
