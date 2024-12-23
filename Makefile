.PHONE: build deploy

build:
	FOUNDRY_PROFILE=zksync forge build --zksync

deploy:
	FOUNDRY_PROFILE=zksync forge script script/DeployLensScoreSBT.s.sol  \
		--rpc-url https://rpc.testnet.lens.dev \
		--account myKeystore \
		--broadcast \
		--verify \
		--chain 37111 \
		--zksync

