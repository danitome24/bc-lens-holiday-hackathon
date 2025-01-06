# LensSocialScore

*Revolutionizing Web3 by establishing trust and credibility for wallets in the Lens ecosystem.*

## Project Name:
**LensSocialScore**

## Team Members:
- **Daniel Tomé** (Lens Handle: @meketom)
- **Joseph Cho** (Lens Handle: @josephpm)

## Project Description:
In the decentralized Web3 landscape, trust and credibility are essential yet often difficult to quantify. For DApps and projects, it’s critical to evaluate the trustworthiness of wallets interacting with their platforms to prevent malicious behavior and foster a secure ecosystem.

**LensSocialScore** provides a **decentralized reputation system** for wallets by calculating a trust score based on user activity, engagement, and contributions within the Lens Network. This reputation score is transparently linked to a **Dynamic Soulbound Token (SBT)**, a non-transferable credential that represents a wallet's credibility and trustworthiness. The SBT updates dynamically based on network activity, making it a reliable and up-to-date representation of reputation.

## Problem Statement:
* **Challenge for DApps**: How can they ensure wallets interacting with their platforms are credible and trustworthy?
* **Challenge for users**: How can they demonstrate their legitimacy to access exclusive services or opportunities?

## Solution:
LensSocialScore acts as a trust layer for the Lens ecosystem by providing:

1. A **Reputation Score** to gauge a wallet’s trustworthiness.
2. A **Dynamic SBT** that represents this reputation in a verifiable and non-transferable manner.
3. A system that enables **DApps** to integrate reputation scoring into their access policies, enhancing platform safety and fostering user trust.

### Key Features:
- 📊 **Reputation Calculation**: Metrics like network interactions, monetary transactions, activity diversity, and participation time.
- 🛡️ **Dynamic Soulbound Tokens (SBTs)**: Non-transferable tokens representing user reputation with dynamic updates.
- 🖥️ **User Dashboard**: A simple and intuitive interface to view reputation scores and detailed metrics.
- 🔗 **Integration with Lens Network and ConnectKit**: The app leverages Lens profiles and uses Family's ConnectKit for seamless Web3 interaction.

LensSocialScore is intended to help users gain insights into their role in the Lens community and encourage more engagement and participation within the network.

## Source Code Links:

| Feature           | Link                                                                 |
|-------------------|----------------------------------------------------------------------|
| Lens Network Block Explorer | [View Code](https://github.com/danitome24/bc-lens-holiday-hackathon/blob/master/packages/nextjs/hooks/useFetchTransactions.ts) |
| Score Calculation | [View Code](https://github.com/danitome24/bc-lens-holiday-hackathon/blob/master/packages/nextjs/hooks/useCalculateScore.ts) |
| SBT Contract      | [View Code](https://github.com/danitome24/bc-lens-holiday-hackathon/blob/master/packages/foundry/contracts/LensScoreSBT.sol) |
| Family Connect    | [View Code](https://github.com/danitome24/bc-lens-holiday-hackathon/blob/master/packages/nextjs/components/Web3Provider.tsx) |

## Preview Link:

[LensSocialScore](https://bc-lens-holiday-hackathon.vercel.app/)

## Demo Video/Slide Deck Links:
- 🎥 [Demo Video](https://www.youtube.com/watch?v=MvnuUqFMiCw)
- 🖼️ [Slide Deck](https://drive.google.com/file/d/1-ECUUQQFcdZPQhW38Yeg0zLW_N8uy7uD/view?usp=sharing)

## Screenshots:

### LensSocialScore Home
![LensSocialScore Home](https://github.com/user-attachments/assets/acc384bf-9521-4889-8b47-26e4d7e6c4c2)

### LensSocialScore Details
![LensSocialScore Details](https://github.com/user-attachments/assets/57e6a272-b713-409a-8f78-06f34626c208)

### LensSocialScore SBT
![LensSocialScore SBT](https://github.com/user-attachments/assets/3dcc35bc-1c8d-4721-a95f-fd2c5ec8df77)

### LensSocialScore Leaderboard
![LensSocialScore Leaderboard](https://github.com/user-attachments/assets/26f80589-13ce-4449-9ee5-045264032608)

## License:
This project is open source and available under the [MIT License](https://opensource.org/licenses/MIT).

