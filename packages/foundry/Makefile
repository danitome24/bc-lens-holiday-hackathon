.PHONE: build deploy

OUT_DIR=zkout
CONTRACT=LensScoreSBT
ABI_DIR=abis
ABI_FILE=$(ABI_DIR)/$(CONTRACT).abi.json

build:
	FOUNDRY_PROFILE=zksync forge build -- --zksync

create:
	FOUNDRY_PROFILE=zksync forge create contracts/LensScoreSBT.sol:LensScoreSBT \
  	--rpc-url https://rpc.testnet.lens.dev \
  	--chain 37111 \
  	--account developer \
  	--from 0xaa4C60b784E2b3E485035399bF1b1aBDeD66A60f \
  	--zksync

deploy:
	FOUNDRY_PROFILE=zksync forge script script/DeployLensScoreSBT.s.sol  \
		--rpc-url https://rpc.testnet.lens.dev \
		--account myKeystore \
		--broadcast \
		--verify \
		--chain 37111 \
		--zksync

extract-abi:
	node script-js/generateAbiAndAddress.js
	@echo "ABI stored at $(ABI_FILE)"

deploy-and-generate-abis: deploy extract-abi
