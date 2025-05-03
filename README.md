# Fluidly

Fluidly is a multi-chain platform that allows users to convert NFTs into ERC20 tokens and back again. The platform operates across multiple blockchains including Polygon, Base, Blast, Optimism, and Arbitrum.

![Fluidly Logo](/public/logo.png)

## ✨ Features

- **NFT Liquidification**: Convert NFTs to ERC20 tokens seamlessly
- **Reverse Conversion**: Convert tokens back to NFTs
- **Multi-chain Support**: Works on Polygon, Base, Blast, Optimism, and Arbitrum
- **Collection Creation**: Create your own NFT collections
- **Mobile-friendly Interface**: Fully responsive design with mobile support

## 🚀 Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn
- MetaMask or another Ethereum wallet

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/liquidify.gg.git
   cd liquidify.gg
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn
   ```

3. Run the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## 🔧 Tech Stack

- **Frontend**: React.js with Next.js framework (App Router)
- **Styling**: TailwindCSS for responsive design
- **Web3 Integration**: RainbowKit, wagmi, and ethers.js
- **State Management**: Zustand
- **Animation**: Framer Motion
- **Database**: MongoDB for backend data storage

## 📱 Application Structure

- **Explore Page**: Browse available NFT collections
- **Create Page**: Create new NFT collections or tokens
- **Rarity Page**: Check rarity scores for NFTs
- **FAQ Page**: Comprehensive guides and information
- **Manage Page**: Manage your created collections

## 🧩 Main Components

- **NFT to Token**: Convert NFTs to ERC20 tokens
- **Token to NFT**: Convert tokens back to NFTs
- **Collection Creator**: Tools for creating new ERC20/ERC(721 or 1155) pairs

## 💻 Development

### Folder Structure

- `/src/app`: Next.js App Router pages and API routes
- `/src/components`: Reusable React components
- `/src/libs`: Utility functions and libraries
- `/public`: Static assets like images and icons
- `/store`: Zustand state management

### Building for Production

```bash
npm run build
# or
yarn build
```

### Running in Production

```bash
npm run start
# or
yarn start
```

### Environment Variables

Please create a `.env` file in the root of the project and add the following:

```bash
MONGO_URL=mongodb
ALCHEMY_KEY=
SIMPLEHASH_KEY=
```

## 🔗 Links

- [Twitter](https://twitter.com/fluidly_app)

## 🤝 Contributing

Fluidly is now deprecated and no longer maintained. Feel free to fork the repository and make your own changes.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
