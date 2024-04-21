"use client";

import {
  ArrowLeftCircleIcon,
  Blocks,
  BookCheckIcon,
  ChevronLeft,
  Info,
  RefreshCcw,
  Verified,
  X,
} from "lucide-react";
import React from "react";
import "../app/globals.css";
import { useState, useEffect } from "react";
import { useWriteContract, useAccount, useReadContract } from "wagmi";
import LiquidERC721 from "../app/abi/LiquidERC721.json";
import LiquidERC1155 from "../app/abi/LiquidERC1155.json";
import { switchChain, watchChainId } from "@wagmi/core";
import { mainnet, base } from "@wagmi/core/chains";
import { config } from "../app/providers";

const CollectionPage = ({ collections }: { collections: any }) => {
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [currentChain, setCurrentChain] = useState<number>(0);
  const [selectedCollection, setSelectedCollection] = useState<any>(undefined);
  const [mode, setMode] = useState<"wrap" | "unwrap" | "summary">("wrap");
  const [tokenIdList, setTokenIdList] = useState<number[]>([]);
  const [tokenId, setTokenId] = useState<number>();
  const [balance, setBalance] = useState(0);
  const [ownedERC1155, setOwnedERC1155] = useState(0);
  const [isERC721TransfersApproved, setIsERC721TransfersApproved] =
    useState(false);
  const [isERC1155TransfersApproved, setIsERC1155TransfersApproved] =
    useState(false);
  const account = useAccount();
  const {
    data: hash,
    isSuccess,
    isError,
    isPending,
    writeContract,
    error,
  } = useWriteContract();
  const [explorer, setExplorer] = useState("https://etherscan.io");
  const [inputtedERC1155Qty, setInputtedERC1155Qty] = useState<string>("0");
  const [inputtedERC1155UnwrapAmt, setInputtedERC1155UnwrapAmt] =
    useState<string>("0");

  useEffect(() => {
    const unwatch = watchChainId(config, {
      onChange: (chainId: number) => {
        setCurrentChain(chainId);
        console.log(`Chain ID changed to: ${chainId}`);
        // Perform actions based on the chainId if necessary
        if (chainId === 1) {
          console.log("Mainnet detected");
          setExplorer("https://etherscan.io");
          // Add any logic needed for when the chainId is 1 (Ethereum Mainnet)
        }

        if (chainId === 8453) {
          console.log("Base detected");
          setExplorer("https://basescan.org");
        }
      },
    });

    // Cleanup function to stop watching the chainId when the component unmounts
    return () => {
      unwatch();
    };
  }, []);
  // Same standard for ERC1155 and ERC721
  const approveTransfers = async () => {
    if (!selectedCollection || !walletAddress) return;

    const liquidifyContractAddress = selectedCollection.liquidifyContract;

    try {
      const tx = writeContract(
        {
          address: selectedCollection.nftAddress,
          abi: [
            {
              inputs: [
                { internalType: "address", name: "operator", type: "address" },
                { internalType: "bool", name: "approved", type: "bool" },
              ],
              name: "setApprovalForAll",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
          ],
          functionName: "setApprovalForAll",
          args: [liquidifyContractAddress, true],
        },
        {
          onSuccess: async (tx: any) => {
            alert("Waiting for approval to confirm");
            while (!isERC721TransfersApproved && !isERC1155TransfersApproved) {
              await new Promise((resolve) => setTimeout(resolve, 3000));
              fetchApproval();
            }
          },
        }
      );
    } catch (err) {}
  };

  // ${selectedCollection.tokenSymbol} balance: {balance}
  useEffect(() => {
    if (!account?.address) return;
    setWalletAddress(account.address);
  }, [account?.address]);

  const wrap = async () => {
    console.log("trying");
    if (selectedCollection.type == "ERC721") {
      try {
        const tx = writeContract(
          {
            address: selectedCollection.liquidifyContract,
            abi: LiquidERC721.abi,
            functionName: "wrapERC721",
            args: [`${tokenId}`],
          },
          {
            onSuccess: async (tx: any) => {
              setTimeout(async () => {
                await fetchBalance();
                await fetchNftBalances();
              }, 8000);

              window.open(`${explorer}/tx/${tx}`);
            },
            onError(error, variables, context) {
              console.log(error);
            },
          }
        );
      } catch (err) {
        console.log(err);
      }
    }

    if (selectedCollection.type == "ERC1155") {
      try {
        const tx = writeContract(
          {
            address: selectedCollection.liquidifyContract,
            abi: LiquidERC1155.abi,
            functionName: "wrapERC1155",
            args: [`${inputtedERC1155Qty}`],
          },
          {
            onSuccess: async (tx: any) => {
              setTimeout(async () => {
                await fetchBalance();
                await fetchNftBalances();
              }, 8000);

              window.open(`${explorer}/tx/${tx}`);
            },
            onError(error, variables, context) {
              console.log(error);
            },
          }
        );
      } catch (err) {
        console.log(err);
      }
    }
  };

  const unwrap = async () => {
    // await fetchBalance();
    console.log("trying unwrap");

    if (selectedCollection.type == "ERC721") {
      console.log("unwrap erc721");
      try {
        const tx = writeContract(
          {
            address: selectedCollection.liquidifyContract,
            abi: LiquidERC721.abi,
            functionName: "unwrapERC721",
            args: [
              BigInt(
                Math.floor(
                  parseFloat(selectedCollection.tokensPerNft) * 10 ** 18
                )
              ),
            ],
          },
          {
            onSuccess: async (tx: any) => {
              console.log(tx);
              setTimeout(async () => {
                await fetchBalance();
                await fetchNftBalances();
              }, 8000);

              await new Promise((resolve) => setTimeout(resolve, 2000));
              window.open(`${explorer}/tx/${tx}`);
            },
            onError(error, variables, context) {
              if (error.toString().includes("Insufficient funds to unwrap")) {
                alert("Insufficient funds to unwrap");
              }
            },
          }
        );
      } catch (err) {
        console.log(err);
      }
    }

    if (selectedCollection.type == "ERC1155") {
      console.log("unwrap erc1155");
      try {
        const tx = writeContract(
          {
            address: selectedCollection.liquidifyContract,
            abi: LiquidERC1155.abi,
            functionName: "unwrapERC1155",
            args: [
              BigInt(
                Math.floor(parseFloat(inputtedERC1155UnwrapAmt) * 10 ** 18)
              ),
            ],
          },
          {
            onSuccess: async (tx: any) => {
              console.log(tx);
              setTimeout(async () => {
                await fetchBalance();
                await fetchNftBalances();
              }, 8000);

              await new Promise((resolve) => setTimeout(resolve, 2000));
              window.open(`${explorer}/tx/${tx}`);
            },
            onError(error, variables, context) {
              if (error.toString().includes("Insufficient funds to unwrap")) {
                alert("Insufficient funds to unwrap");
              } else {
                console.log(error.toString());
              }
            },
          }
        );
      } catch (err) {
        console.log(err);
      }
    }
  };

  const fetchNftBalances = async () => {
    if (selectedCollection.type === "ERC721") {
      try {
        const contractAddress = selectedCollection.nftAddress; // Assuming selectedCollection holds the contract address
        const response = await fetch(
          `/api/checks/ownedERC721?wallet=${walletAddress}&contract=${contractAddress}&network=${selectedCollection.network}`
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch token IDs: ${response.statusText}`);
        }

        const data = await response.json();
        setTokenIdList(data.tokenIds); // Assuming we want to set the first tokenId, adjust as needed
        setTokenId(data.tokenIds[0]);
      } catch (error) {
        console.error("Failed to fetch token IDs:", error);
      }
    }

    if (selectedCollection.type === "ERC1155") {
      try {
        const contractAddress = selectedCollection.nftAddress; // Assuming selectedCollection holds the contract address
        const response = await fetch(
          `/api/checks/ownedERC1155?wallet=${walletAddress}&tokenId=${selectedCollection.tokenId}&contract=${contractAddress}&network=${selectedCollection.network}`
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch token IDs: ${response.statusText}`);
        }

        let data = await response.json();
        data = await parseInt(data.balance);

        setOwnedERC1155(data);
      } catch (error) {
        console.error("Failed to fetch token IDs:", error);
      }
    }
  };

  const fetchBalance = async () => {
    try {
      const contractAddress = selectedCollection.nftAddress; // Assuming selectedCollection holds the contract address
      const response = await fetch(
        `/api/checks/balances?wallet=${walletAddress}&contract=${selectedCollection.liquidifyContract}&network=${selectedCollection.network}`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch balance: ${response.statusText}`);
      }
      const data = await response.json();
      setBalance(data.balance / 1e18); // Convert to 18 decimal places assuming the API returns balance in the smallest unit
    } catch (error) {
      console.error("Failed to fetch balance:", error);
    }
  };

  const fetchApproval = async () => {
    if (selectedCollection.type === "ERC721") {
      try {
        const contractAddress = selectedCollection.nftAddress; // Assuming selectedCollection holds the contract address
        const liquidifyContractAddress = selectedCollection.liquidifyContract; // Replace with your actual Liquidify contract address
        const response = await fetch(
          `/api/checks/approvalERC721?wallet=${walletAddress}&contract=${contractAddress}&operator=${liquidifyContractAddress}&network=${selectedCollection.network}`
        );

        if (!response.ok) {
          throw new Error(`Failed to check approval: ${response.statusText}`);
        }

        const data = await response.json();
        setIsERC721TransfersApproved(data.isApproved);
      } catch (error) {
        console.error("Failed to check approval:", error);
      }
    }

    if (selectedCollection.type === "ERC1155") {
      try {
        const contractAddress = selectedCollection.nftAddress; // Assuming selectedCollection holds the contract address
        const liquidifyContractAddress = selectedCollection.liquidifyContract; // Replace with your actual Liquidify contract address
        const response = await fetch(
          `/api/checks/approvalERC1155?wallet=${walletAddress}&contract=${contractAddress}&tokenId=${selectedCollection.tokenId}&operator=${liquidifyContractAddress}&network=${selectedCollection.network}`
        );

        if (!response.ok) {
          throw new Error(`Failed to check approval: ${response.statusText}`);
        }

        const data = await response.json();
        setIsERC1155TransfersApproved(data.isApproved);
      } catch (error) {
        console.error("Failed to check approval:", error);
      }
    }
  };

  useEffect(() => {
    if (selectedCollection == undefined) return;

    fetchBalance();
    fetchApproval();
    fetchNftBalances();
  }, [selectedCollection, walletAddress]);

  return (
    <>
      <div className="flex flex-col w-screen">
        <div className="flex flex-col w-full items-center justify-center">
          <span className="flex text-2xl items-center py-1 mt-1 select-none font-medium text-white">
            <BookCheckIcon className="h-[18px] mr-1.5" />
            Collections
          </span>
          <span className="text-sm xs:w-[380px] text-center text-white opacity-50 w-[650px]">
            Verified collections are to indicate where liquidity for the token
            has been supplied by a lot of community members or by the team
            behind the project and are by no means an endorsement.
          </span>
        </div>

        {selectedCollection !== undefined && (
          <>
            <div className="absolute text-white h-[calc(100vh-165px)] w-full flex items-center justify-center bg-black z-[999]">
              <div
                onClick={() => {
                  setTokenIdList([]);
                  setTokenId(undefined);
                  setSelectedCollection(undefined);
                }}
                className="absolute text-white top-1 left-6 cursor-pointer select-none absolute items-center flex px-3 py-2 text-sm bg-white rounded-md bg-opacity-[15%] transition-all hover:bg-opacity-[20.5%]"
              >
                <ArrowLeftCircleIcon className="mr-1 h-[15px]" />
                Back
              </div>

              <div className="flex h-[170px] min-h-[170px] max-h-[170px] w-full items-center justify-center w-[340px] max-w-[340px]">
                <div className="p-3 w-full flex flex-col rounded-lg bg-white bg-opacity-10 ">
                  <div className="flex ">
                    <img
                      className="mr-3 h-[110px] w-[110px] select-none bg-white bg-opacity-10 min-h-[110px] max-h-[110px] object-cover rounded-md outline-none overflow-hidden pointer-events-none"
                      src={selectedCollection.nftProjectImage || "/temp.png"}
                    />
                    <div className="flex flex-col">
                      <span className="select-none text-xl font-semibold flex text-center items-center justify-left">
                        ${selectedCollection.tokenSymbol}
                      </span>
                      <span className="select-none mb-1 text-left ">
                        {selectedCollection.nftName ||
                          selectedCollection.tokenName}
                      </span>
                      <span className="mb-3 select-none flex text-sm item-center justify-left flex">
                        {new Intl.NumberFormat().format(
                          selectedCollection.tokensPerNft
                        )}{" "}
                        ${selectedCollection.tokenSymbol} = 1 NFT
                      </span>
                      <div className="flex items-center gap-x-3.5 justify-left h-[20px] mb-4">
                        <img
                          src="/magiceden.png"
                          onClick={() => {
                            window.open(
                              `https://magiceden.io/collections/${selectedCollection.network.toLowerCase()}/${
                                selectedCollection.nftAddress
                              }`
                            );
                          }}
                          className="min-h-[20px] select-none cursor-pointer opacity-70 hover:opacity-100 transition-all min-w-[20px] max-h-[20px] max-w-[20px] rounded-md overflow-none"
                        />

                        <img
                          src="/etherscan.svg"
                          className="min-h-[20px] select-none cursor-pointer opacity-70 hover:opacity-100 transition-all min-w-[20px] max-h-[20px] max-w-[20px] rounded-md overflow-none"
                          onClick={() => {
                            let baseUrl =
                              selectedCollection.network == "Ethereum"
                                ? "https://etherscan.io/address/"
                                : selectedCollection.network === "Base"
                                ? "https://basescan.org/address/"
                                : "";
                            window.open(
                              `${baseUrl}${selectedCollection.liquidifyContract}`
                            );
                          }}
                        />

                        <img
                          src="/uniswap.png"
                          onClick={() => {
                            window.open(
                              `https://app.uniswap.org/#/swap?theme=dark&inputCurrency=ETH&outputCurrency=${selectedCollection.liquidifyContract}`
                            );
                          }}
                          className="min-h-[20px] select-none cursor-pointer opacity-70 hover:opacity-100 transition-all min-w-[20px] max-h-[20px] max-w-[20px] rounded-md overflow-none"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex w-full text-white rounded-lg border-2 select-none border-[#535353] bg-[#303030]">
                    <div
                      onClick={() => {
                        setMode("wrap");
                      }}
                      className={
                        "cursor-pointer items-center text-center w-full p-0.5 px-1 px-6 bg-white bg-opacity-0 transition-all hover:rounded-md " +
                        (mode == "wrap" && "bg-opacity-10 rounded-md")
                      }
                    >
                      Wrap
                    </div>
                    <div
                      onClick={() => {
                        setMode("unwrap");
                      }}
                      className={
                        "cursor-pointer items-center text-center w-full p-0.5 px-1 px-6 bg-white bg-opacity-0 transition-all hover:rounded-md " +
                        (mode == "unwrap" && "bg-opacity-10 rounded-md")
                      }
                    >
                      Unwrap
                    </div>
                  </div>

                  {mode == "wrap" && (
                    <>
                      <div className="flex group mt-3.5 mb-0.5">
                        {selectedCollection.type === "ERC721" && (
                          <>
                            <div className="cursor-pointer items-center relative rounded-lg flex flex-grow select-none hover:bg-opacity-20 bg-white bg-opacity-10 px-3 py-2">
                              <div className="text-white flex flex-grow">
                                {tokenId == undefined
                                  ? "/"
                                  : tokenId
                                  ? tokenId
                                  : "Loading"}
                              </div>
                              <ChevronLeft className="group-hover:rotate-[-90deg] h-[15px] transition-all" />
                            </div>

                            {tokenIdList.length >= 1 && (
                              <>
                                <div className="select-none flex pt-[50px] absolute rounded-lg group-hover:block hidden w-[317px]  ">
                                  <div className="flex flex-col bg-[#272727] rounded-lg shadow-xl z-[999] p-1 w-full">
                                    {tokenIdList.map((_tokenId) => {
                                      return (
                                        <div
                                          onClick={() => {
                                            setTokenId(_tokenId);
                                          }}
                                          className="px-3 w-full cursor-pointer bg-white bg-opacity-0 hover:bg-opacity-5 py-1.5 rounded-md"
                                        >
                                          {_tokenId}
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                              </>
                            )}
                          </>
                        )}

                        {selectedCollection.type === "ERC1155" && (
                          <>
                            <div className="flex mt-1 w-full">
                              <input
                                className="px-3 py-2 bg-white rounded-l-md outline-none bg-opacity-10 w-full"
                                value={inputtedERC1155Qty}
                                onChange={async (e) => {
                                  try {
                                    setInputtedERC1155Qty(e.target.value);
                                  } catch (err) {
                                    console.log(err);
                                  }
                                }}
                              />
                              <button
                                onClick={() => {
                                  setInputtedERC1155Qty(`${ownedERC1155}`);
                                }}
                                className="px-3 py-2 bg-white hover:text-opacity-100 text-sm text-opacity-70 transition-all items-center text-white hover:bg-opacity-[18.5%] flex text-center rounded-r-md outline-none bg-opacity-[15%] flex"
                              >
                                <span className="mr-1 opacity-70">Max</span>
                                <span>{ownedERC1155}</span>
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                      {/* <input
                          onChange={(e) => {
                            let value = parseInt(e.target.value);
                            setTokenId(value);
                          }}
                          placeholder={`Token Id`}
                          className="text-white bg-white bg-opacity-10 mt-5 w-full outline-none py-1.5 px-2 rounded-md"
                        /> */}
                    </>
                  )}
                  {mode == "unwrap" && (
                    <>
                      <div className="flex flex-col">
                        {selectedCollection.type === "ERC1155" && (
                          <>
                            <div className="flex mt-[18px] w-full mb-0.5">
                              <input
                                className="px-3 py-2 bg-white rounded-l-md outline-none bg-opacity-10 w-full"
                                value={inputtedERC1155UnwrapAmt}
                                onChange={async (e) => {
                                  try {
                                    setInputtedERC1155UnwrapAmt(e.target.value);
                                  } catch (err) {
                                    console.log(err);
                                  }
                                }}
                              />
                              <button
                                onClick={() => {
                                  setInputtedERC1155UnwrapAmt(`${balance}`);
                                }}
                                className="select-none px-3 py-2 bg-white hover:text-opacity-100 text-sm text-opacity-70 transition-all items-center text-white hover:bg-opacity-[18.5%] flex text-center rounded-r-md outline-none bg-opacity-[15%] flex"
                              >
                                <span className="mr-1 opacity-70">Max</span>
                                <span>
                                  {new Intl.NumberFormat().format(balance)}
                                </span>
                              </button>
                            </div>
                          </>
                        )}

                        {selectedCollection.type == "ERC721" && (
                          <span className="select-none mt-6 mb-2 text-center items-center justify-center flex">
                            <span className="select-none mr-2">Balance:</span>
                            {balance} ${selectedCollection.tokenSymbol}
                          </span>
                        )}
                        {/* <div className="mt-1 flex items-center text-sm">
                          <span className="flex cursor-pointer flex">
                            Balance: {new Intl.NumberFormat().format(balance)}{" "}
                            {selectedCollection.tokenSymbol}
                          </span>
                          <RefreshCcw
                            className="p-1.5 cursor-pointer ml-3 rounded-md hover:bg-opacity-10 bg-white bg-opacity-5 transition-all"
                            onClick={fetchBalance}
                          />
                        </div> */}
                      </div>
                    </>
                  )}
                  {/* {mode == "unwrap" && (
                    <>
                      <div className="flex mt-4">
                        <input className="px-3 py-2 bg-white rounded-l-md"/>
                      </div>
                    </>
                  )} */}
                  {mode !== "summary" && (
                    <>
                      <button
                        onClick={() => {
                          if (
                            selectedCollection.network == "Ethereum" &&
                            currentChain != 1
                          ) {
                            switchChain(config, { chainId: 1 });
                          }

                          if (
                            selectedCollection.network == "Base" &&
                            currentChain != 8453
                          ) {
                            switchChain(config, { chainId: 8453 });
                          }

                          if (mode == "unwrap") return unwrap();

                          if (
                            !isERC721TransfersApproved &&
                            !isERC1155TransfersApproved
                          )
                            return approveTransfers();

                          wrap();

                          // Wrap ERC721
                        }}
                        className="bg-blue-500 mt-4 outline-none py-2 rounded-md select-none cursor-pointer transition-all bg-opacity-80 w-full hover:bg-opacity-100"
                      >
                        {mode == "wrap" ? (
                          <>
                            {!isERC721TransfersApproved &&
                            !isERC1155TransfersApproved
                              ? "Approve transfer"
                              : "Wrap"}
                          </>
                        ) : (
                          "Unwrap"
                        )}
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </>
        )}

        {collections?.liquidNfts.length > 0 &&
          selectedCollection === undefined && (
            <>
              <div className="flex text-white mt-5 gap-3.5 xs:flex-col xs:items-center xs:pb-[100px] flex-wrap min-w-screen mx-10">
                {collections?.liquidNfts?.map((collection: any) => {
                  return (
                    <>
                      <div className="flex w-fit xs:w-full flex flex-col">
                        <div
                          onClick={() => {
                            if (!walletAddress)
                              return alert("Please connect your wallet");
                            setSelectedCollection(collection);
                          }}
                          className="flex flex-grow bg-white xs:w-full sm:w-[170px] sm:max-w-[170px] transition-all duration-[100ms] hover:bg-opacity-[17.5%] border-b-0 cursor-pointer select-none flex flex-grow w-full bg-opacity-10 border-t-2 border-x-2 rounded-t-lg select-none border-y-2 border-opacity-10 border-white w-full px-3 py-2"
                        >
                          <div className="flex flex-col xs:flex-row items-center justify-center">
                            <img
                              className="xs:mr-3 h-[143px] mt-1 w-[143px] max-w-[143px] min-w-[143px] min-h-[143px] max-h-[143px] bg-white bg-opacity-10 object-cover rounded-md outline-none overflow-hidden pointer-events-none"
                              src={collection.nftProjectImage || "/temp.png"}
                            />
                            <div className="text-left w-full flex mt-3 max-w-[150px] items-start justify-start">
                              <div className="flex flex-col w-full">
                                <span className="block xs:hidden flex items-center truncate ... max-w-[138px] sm:w-[138px]">
                                  {collection.nftName || collection.tokenName}
                                  {collection.liquidifyVerified && (
                                    <>
                                      <Verified className="h-[13.9px] ml-0" />
                                    </>
                                  )}
                                </span>
                                <span className="hidden xs:block flex items-center">
                                  <span className="flex items-center">
                                    {collection.nftName || collection.tokenName}
                                    {collection.liquidifyVerified && (
                                      <>
                                        <Verified className="h-[13.9px] ml-0" />
                                      </>
                                    )}
                                  </span>
                                </span>
                                {/* <span>{collection.tokenName}</span> */}
                                <span className="text-xs truncate ...">
                                  {new Intl.NumberFormat().format(
                                    collection.tokensPerNft
                                  )}{" "}
                                  ${collection.tokenSymbol} = 1 NFT
                                </span>
                                <span className="text-xs mb-1 truncate ...">
                                  Chain: {collection.network}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex w-full">
                          {/* <div
                    onClick={() => {
                      window.open(
                        `https://etherscan.io/token/${collection.liquidifyContract}`
                      );
                    }}
                    className="flex w-[70px] max-w-[70px] bg-white transition-all duration-[100ms] px-3.5 items-center justify-center hover:bg-opacity-[17.5%] cursor-pointer select-none flex bg-opacity-10 select-none border-y-2 border-opacity-10 border-white"
                  >
                    <Blocks className="h-[18px]" />
                  </div> */}
                          <div
                            onClick={() => {
                              window.open(
                                `https://magiceden.io/collections/${collection.network.toLowerCase()}/${
                                  collection.nftAddress
                                }`
                              );
                            }}
                            className="flex bg-white border-white border-opacity-10 border-l-2 border-b-2 rounded-bl-lg w-full h-[39px] transition-all duration-[100ms] px-3.5 items-center justify-center hover:bg-opacity-[17.5%] cursor-pointer select-none flex bg-opacity-10 select-none"
                          >
                            <img
                              src="/magiceden.png"
                              className="min-h-[15px] min-w-[15px] max-h-[15px] max-w-[15px] rounded-md overflow-none"
                            />
                          </div>
                          {/* https://magiceden.io/collections/ethereum/0x6740ce1bdbbfad351ec6232faa8c110ebeae36bf */}
                          <div
                            onClick={() => {
                              let baseUrl =
                                collection.network == "Ethereum"
                                  ? "https://etherscan.io/address/"
                                  : collection.network === "Base"
                                  ? "https://basescan.org/address/"
                                  : "";
                              window.open(
                                `${baseUrl}${collection.liquidifyContract}`
                              );
                            }}
                            className="flex w-full bg-white transition-all border-white border-opacity-10 border-b-2 duration-[100ms] px-3.5 items-center justify-center hover:bg-opacity-[17.5%] cursor-pointer select-none flex bg-opacity-10 select-none"
                          >
                            <img
                              src="/etherscan.svg"
                              className="min-h-[15px] min-w-[15px] max-h-[15px] max-w-[15px] rounded-md overflow-none"
                            />
                          </div>
                          <div
                            onClick={() => {
                              window.open(
                                `https://app.uniswap.org/#/swap?theme=dark&inputCurrency=ETH&outputCurrency=${collection.liquidifyContract}`
                              );
                            }}
                            className="flex w-full bg-white border-white border-opacity-10 border-b-2 border-r-2 rounded-br-lg  transition-all duration-[100ms] px-3.5 items-center justify-center hover:bg-opacity-[17.5%] cursor-pointer select-none flex bg-opacity-10 select-none"
                          >
                            <img
                              src="/uniswap.png"
                              className="min-h-[15px] min-w-[15px] max-h-[15px] max-w-[15px] rounded-md overflow-none"
                            />
                          </div>
                        </div>
                        {/* <div
                    onClick={() => {
                      window.open(
                        "https://www.dextools.io/app/en/ether/token/0x74fb648e0a76831d5a18bf08333603450da7c221"
                      );
                    }}
                    className="flex w-[70px] max-w-[70px] bg-white transition-all duration-[100ms] px-3.5 items-center justify-center hover:bg-opacity-[17.5%] cursor-pointer select-none flex bg-opacity-10 rounded-r-lg select-none border-y-2 border-r-2 border-opacity-10 border-white"
                  >
                    <img src="/dextools.svg" className="h-[20px]" />
                  </div> */}
                      </div>
                    </>
                  );
                })}
              </div>
            </>
          )}
      </div>
    </>
  );
};

export default CollectionPage;
