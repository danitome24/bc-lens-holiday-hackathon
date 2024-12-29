.PHONE: build extract-abi deploy-and-generate-abis tests

OUT_DIR=zkout
CONTRACT=LensScoreSBT
ABI_DIR=abis
ABI_FILE=$(ABI_DIR)/$(CONTRACT).abi.json

build:
	yarn hardhat compile

deploy-and-generate-abis:
	yarn hardhat deploy-zksync --script deploy.ts --network lensTestnet
	node script-js/generateAbiAndAddress.js
	@echo "ABI stored at $(ABI_FILE)"

tests:
	forge test
