# Development Guide for LensSocialScore

This guide provides instructions for setting up, running, and maintaining the **LensSocialScore** project.

## Project Structure

The project uses a monorepo structure with the following packages:
- **`packages/nextjs`**: The frontend application built with Next.js.
- **`packages/foundry`**: Smart contracts and backend logic, built with Foundry and Hardhat.

## Prerequisites

Ensure you have the following installed:
- **Node.js** (version 16 or later)
- **Yarn** (version 1.22 or later)
- **Foundry** (latest version)

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/danitome24/bc-lens-holiday-hackathon.git
   ```

2. Navigate to the root directory:
   ```bash
   cd bc-lens-holiday-hackathon
   ```

3. Install dependencies:
   ```bash
   yarn install
   ```

## Running the Project

### Frontend (Next.js)

#### Development Server:
To start the development server for the Next.js application, run:
```bash
yarn dev
```
This will start the server at `http://localhost:3000`.

#### Production Build:
To build the frontend for production, run:
```bash
yarn build
```
To start the production server, run:
```bash
yarn start
```

#### Linting:
To run linting on the Next.js codebase, execute:
```bash
yarn lint
```

### Backend (Foundry)

#### Compile Contracts:
To compile the smart contracts:
```bash
yarn foundry:build
```

#### Test Contracts:
To run tests for the smart contracts:
```bash
yarn foundry:test
```

#### Deploy Contracts:
To deploy the smart contracts:
```bash
yarn foundry:deploy
```
Ensure you have the appropriate configuration for deployment in the Foundry package.

#### Format Contracts:
To format the Foundry code:
```bash
yarn foundry:fmt
```

## Contributing

Follow these steps to contribute:
1. Create a new branch for your feature or fix:
   ```bash
   git checkout -b feature-name
   ```

2. Make changes and commit:
   ```bash
   git commit -m "Add feature description"
   ```

3. Push your branch and open a pull request:
   ```bash
   git push origin feature-name
   ```

## Troubleshooting

If you encounter any issues:
- Verify that all dependencies are installed correctly.
- Ensure your Node.js and Foundry versions meet the requirements.
- Check the scripts in the `package.json` file for accurate usage.

For further assistance, feel free to ask in the [Telegram Hackathon Group](http://t.me/meketom).
