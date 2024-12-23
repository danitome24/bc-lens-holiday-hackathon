## Nextjs commands

```bash
# Development
npm run dev

# Build
npm run build

# Start
npm start

# Lint
npm run lint
```

## Contracts commands 

```bash
# Compile contracts with Foundry
FOUNDRY_PROFILE=zksync forge build --zksync

# Deploy contracts with Foundry
FOUNDRY_PROFILE=zksync forge create src/Lock.sol:Lock \
  --constructor-args "42" \
  --account myKeystore \
  --from <KEYSTORE_ADDRESS> \
  --rpc-url https://rpc.testnet.lens.dev \
  --chain 37111 \
  --zksync

# Test contracts with Foundry
FOUNDRY_PROFILE=zksync forge test --zksync
```