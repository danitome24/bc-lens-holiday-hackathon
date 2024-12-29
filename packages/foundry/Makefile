.PHONE: build deploy extract-abi deploy-and-generate-abis tests

OUT_DIR=zkout
CONTRACT=LensScoreSBT
ABI_DIR=abis
ABI_FILE=$(ABI_DIR)/$(CONTRACT).abi.json

build:
	yarn hardhat compile

deploy:
	yarn hardhat deploy-zksync --script deploy.ts --network lensTestnet

extract-abi:
	node script-js/generateAbiAndAddress.js
	@echo "ABI stored at $(ABI_FILE)"

deploy-and-generate-abis: deploy extract-abi

tests:
	forge test
