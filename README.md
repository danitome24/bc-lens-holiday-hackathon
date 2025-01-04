# LensSocialScore

*Empowering users to track and showcase their influence in the Lens ecosystem.*

## Project Name:
**LensSocialScore**

## Team Members:
- **Daniel Tomé** (Lens Handle: @meketom)
- **Joseph Cho** (Lens `orb.club` Handle: @josephdotpm)

## Project Description:
**LensSocialScore** is a decentralized application (DApp) built on the **Lens Network** that provides a reputation system for users based on their activity and engagement within the network. The goal is to enable users to track their influence and contributions to the Lens ecosystem through metrics like **engagement**, **monetary value**, **diversity of interactions**, and **participation time**.

This application calculates a user’s reputation score by analyzing their interaction patterns, transactions, and the diversity of their activities on Lens. The score is then linked to a **Dynamic Soulbound Token (SBT)**, which serves as a non-transferable credential representing the user’s reputation. The SBT is updated dynamically to reflect changes in activity, ensuring transparency and immutability. Users can view their score and SBT details on a user-friendly dashboard, helping them understand their influence in the community and track their progress over time.

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
- 🎥 [Demo Video](#)
- 🖼️ [Slide Deck](https://www.figma.com/deck/Moc2zF8fmSLQvdxz8Da8ch)

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

