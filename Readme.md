Here's the **README.md** file for your project to run it locally with and without Docker Compose:

---

# Insurance Application Micro-Frontend System

This repository contains a micro-frontend-based insurance application with three main components:

1. **Container Application**: Manages shared state and routes between micro-frontends.
2. **MFE1 - Check Details**: Displays insurance details and uses a web worker for premium calculations.
3. **MFE2 - Pay Premium**: Allows premium payments and updates the shared state.

The application can be run either using **Node.js locally** or with **Docker Compose**.

---

## Prerequisites

### To Run Locally:
- [Node.js](https://nodejs.org/en/) (version 16 or above)
- [NPM](https://www.npmjs.com/)

### To Run with Docker:
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

---

## Installation and Running Locally

### 1. Clone the Repository

```bash
git clone https://github.com/meghaaprasad/ClientArchitectureMFE.git

```

### 2. Install Dependencies for Each App

Navigate into each folder and install dependencies:

#### Container App
```bash
cd container
npm install
npm run serve
```

#### MFE1 - Check Details
```bash
cd ../mfe-check-details
npm install
npm run serve
```

#### MFE2 - Pay Premium
```bash
cd ../mfe-pay-premium
npm install
npm run serve
```

### 3. Access the Apps

- **Container App**: http://localhost:3000
- **MFE1 - Check Details**: http://localhost:3001
- **MFE2 - Pay Premium**: http://localhost:3002

---

## Running with Docker Compose

### 1. Build and Start Containers

Make sure you are in the root directory of the project, where `docker-compose.yml` is located.

Run the following command:

```bash
docker-compose build
docker-compose up
```

### 2. Access the Apps

Once the containers are up, the apps will be available at:

- **Container App**: http://localhost:3000
- **MFE1 - Check Details**: http://localhost:3001
- **MFE2 - Pay Premium**: http://localhost:3002

### 3. Stop the Containers

To stop the Docker containers, use:

```bash
docker-compose down
```

---

## Features

- **Dynamic Micro-Frontend Loading**: MFEs are dynamically loaded into the container app using Webpack Module Federation.
- **Shared State**: State is managed centrally in the container app using Vuex.
- **Web Worker Integration**: A web worker performs premium calculations in the MFE1.
- **Cross-Origin Resource Sharing (CORS)**: Configured in Nginx to allow communication between services.
- **Dockerized Setup**: Easily run the system with Docker Compose.

---

## Troubleshooting

### Common Errors and Fixes

1. **CORS Issues**
   - Ensure CORS headers are enabled in the `default.conf` file for Nginx.

2. **Port Conflicts**
   - Make sure ports `3000`, `3001`, and `3002` are not in use by other processes.

3. **Web Worker Not Loading**
   - Verify that `worker-loader` is properly configured in Webpack.
   - Check that `docker-compose.yml` correctly maps the services and ports.

---