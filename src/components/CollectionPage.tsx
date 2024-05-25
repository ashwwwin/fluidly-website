"use client";

import {
  ArrowLeftCircleIcon,
  ArrowUpRightSquareIcon,
  Blocks,
  BookCheckIcon,
  ChevronLeft,
  Copy,
  Info,
  RefreshCcw,
  Verified,
  X,
} from "lucide-react";
import React from "react";
import "../app/globals.css";
import { useState, useEffect } from "react";
import { useWriteContract, useAccount, useReadContract } from "wagmi";
import LiquidERC721v2 from "../app/abi/LiquidERC721v2.json";
import LiquidERC721v3 from "../app/abi/LiquidERC721v3.json";
import LiquidERC1155v2 from "../app/abi/LiquidERC1155v2.json";
import LiquidERC1155v3 from "../app/abi/LiquidERC1155v3.json";
import { switchChain, watchChainId } from "@wagmi/core";
import { mainnet, base } from "@wagmi/core/chains";
import { config } from "../app/providers";
import toast from "react-hot-toast";
import { parseEther } from "ethers";
import { getFactory } from "@/libs/getFactory";

const CollectionPage = ({ collections }: { collections: any }) => {
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [currentChain, setCurrentChain] = useState<number>(0);
  const [selectedCollection, setSelectedCollection] = useState<any>(undefined);
  const [mode, setMode] = useState<"wrap" | "unwrap" | "summary">("wrap");
  const [tokenIdList, setTokenIdList] = useState<number[]>([]);
  const [tokenId, setTokenId] = useState<number>();
  const [v3_tokenId, v3_setTokenId] = useState<number[]>([]);
  const [selectedTier, setSelectedTier] = useState<any>({});
  const [tierQty, setTierQty] = useState(0);
  const [balance, setBalance] = useState(0);
  const [factoryAddress, setFactoryAddress] = useState<`0x${string}`>(
    "0x90c99e085992a4a93BB3105C8b5cBe4E26A0d420"
  );
  const [storageFee, setStorageFee] = useState("");
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
  const [selectedERC1155v3TokenId, setSelectedERC1155v3TokenId] =
    useState<string>("0");
  const [selectedERC1155v3NftQuantity, setSelectedERC1155v3NftQuantity] =
    useState<string>("0");

  const toastTx = (tx: any) => {
    setTimeout(() => {
      toast.custom(
        <div className="flex flex-col p-3 bg-[#0d0d0d]">
          <span className="text-white">Transaction sent</span>
          <button
            onClick={() => {
              window.open(`${explorer}/tx/${tx}`);
            }}
            className="mt-2 select-none flex w-fit items-center opacity-80 text-white text-sm pl-2 pr-1 py-1 bg-blue-500 rounded-md bg-opacity-80 hover:bg-opacity-100 transition-all"
          >
            Explorer{" "}
            <ArrowUpRightSquareIcon className="ml-0.5 opacity-80 h-[15px]" />
          </button>
        </div>
      );
    }, 2000);
  };

  useEffect(() => {
    let currentChain = account.chainId;

    if (!currentChain) return;

    if (currentChain == 1) setExplorer("https://etherscan.io");
    if (currentChain === 8453) setExplorer("https://basescan.org");

    let _factoryAddress = getFactory(currentChain);

    setFactoryAddress(_factoryAddress as `0x${string}`);
  }, [account.chainId]);

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
            toastTx(tx);
            if (!isERC721TransfersApproved && !isERC1155TransfersApproved) {
              console.log(
                isERC721TransfersApproved,
                isERC1155TransfersApproved
              );
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
        let data: any;

        if (selectedCollection.version == 3) {
          data = {
            address: selectedCollection.liquidifyContract,
            abi: LiquidERC721v3.abi,
            functionName: "wrapERC721",
            value: parseEther(await getStorageFee(v3_tokenId.length)),
            args: [v3_tokenId],
          };
        }

        if (selectedCollection.version == 2) {
          data = {
            address: selectedCollection.liquidifyContract,
            abi: LiquidERC721v2.abi,
            functionName: "wrapERC721",
            args: `${tokenId}`,
          };
        }

        if (!data) return;

        const tx = writeContract(data, {
          onSuccess: async (tx: any) => {
            toastTx(tx);

            setTimeout(async () => {
              await fetchBalance();
              await fetchNftBalances();
            }, 3900);
          },
          onError(error, variables, context) {
            console.log(error.toString());
            if (error.toString().includes("insufficient funds")) {
              toast.error(`Insufficient funds`);
            }
          },
        });
      } catch (err) {
        console.log(err);
      }
    }

    if (selectedCollection.type == "ERC1155") {
      try {
        let data;

        if (selectedCollection.version == 2) {
          data = {
            address: selectedCollection.liquidifyContract,
            abi: LiquidERC1155v2.abi,
            functionName: "wrapERC721",
            args: [`${inputtedERC1155Qty}`],
          };
        }

        if (selectedCollection.version == 3) {
          data = {
            address: selectedCollection.liquidifyContract,
            abi: LiquidERC1155v3.abi,
            functionName: "wrapERC721",
            args: [
              `${selectedERC1155v3TokenId}`,
              `${selectedERC1155v3NftQuantity}`,
            ],
            value: parseEther(
              (await getStorageFee(parseInt(selectedERC1155v3NftQuantity))) || 0
            ),
          };
        }

        if (!data) return;

        const tx = writeContract(data, {
          onSuccess: async (tx: any) => {
            toastTx(tx);

            setTimeout(async () => {
              await fetchBalance();
              await fetchNftBalances();
            }, 3900);
          },
          onError(error, variables, context) {
            console.log(error.toString());
            if (error.toString().includes("insufficient funds")) {
              toast.error(`Insufficient funds`);
            }
          },
        });
      } catch (err) {
        console.log(err);
      }
    }
  };

  const getStorageFee = async (quantity: number) => {
    const response = await fetch(
      `/api/checks/storageFee?factoryAddress=${factoryAddress}&contract=${selectedCollection.liquidifyContract}&quantity=${quantity}&network=${selectedCollection.network}`
    );

    const data = await response.json();

    console.log(data);

    setStorageFee(data.storageFee);

    return data.storageFee.toString();
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
            abi:
              selectedCollection.version === 2
                ? LiquidERC721v2.abi
                : LiquidERC721v3.abi,
            functionName: "unwrapERC721",
            value:
              selectedCollection.version === 2
                ? parseEther("0")
                : parseEther(await getStorageFee(1)),
            args: [
              BigInt(
                selectedCollection.version === 3 &&
                  selectedCollection.type === "ERC721"
                  ? BigInt(selectedTier.amount) * BigInt(10 ** 18)
                  : Math.floor(
                      parseFloat(selectedCollection.tokensPerNft) * 10 ** 18
                    )
              ),
            ],
          },
          {
            onSuccess: async (tx: any) => {
              toastTx(tx);
              setTimeout(async () => {
                await fetchBalance();
                await fetchNftBalances();
              }, 3900);
            },
            onError(error, variables, context) {
              console.log(error.toString());
              if (error.toString().includes("insufficient funds")) {
                toast.error(`Insufficient funds`);
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
            abi:
              selectedCollection.version === 2
                ? LiquidERC1155v2.abi
                : LiquidERC1155v3.abi,
            functionName: "unwrapERC1155",
            value:
              selectedCollection.version === 2
                ? parseEther("0")
                : parseEther(
                    (
                      await getStorageFee(
                        parseInt(selectedERC1155v3NftQuantity)
                      )
                    ).toString()
                  ),
            args:
              selectedCollection.version === 3
                ? [
                    selectedERC1155v3TokenId,
                    selectedERC1155v3NftQuantity.toString(),
                  ]
                : [
                    Math.floor(
                      parseFloat(
                        await selectedCollection.tiers.find(
                          (tier: any) =>
                            tier.tokenId == selectedERC1155v3TokenId
                        ).amount
                      ) *
                        10 ** 18
                    ),
                  ],
          },
          {
            onSuccess: async (tx: any) => {
              toastTx(tx);
              console.log(tx);
              setTimeout(async () => {
                await fetchBalance();
                await fetchNftBalances();
              }, 3900);

              await new Promise((resolve) => setTimeout(resolve, 2000));
            },
            onError(error, variables, context) {
              console.log(error.toString());
              if (error.toString().includes("insufficient funds")) {
                toast.error(`Insufficient funds`);
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
        v3_setTokenId([data.tokenIds[0]]);
      } catch (error) {
        console.error("Failed to fetch token IDs:", error);
      }
    }

    if (selectedCollection.type === "ERC1155") {
      const contractAddress = selectedCollection.nftAddress;
      let url = `/api/checks/ownedERC1155?wallet=${walletAddress}&tokenId=${selectedCollection.tokenId}&contract=${contractAddress}&network=${selectedCollection.network}`;

      if (selectedCollection.version == 3) {
        url = `/api/checks/ownedERC1155?wallet=${walletAddress}&tokenId=${selectedERC1155v3TokenId}&contract=${contractAddress}&network=${selectedCollection.network}`;
      }

      try {
        const response = await fetch(url);

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

        console.log("ERC721Approval -> ", data.isApproved);
        setIsERC721TransfersApproved(data.isApproved as boolean);
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
        console.log("ERC71155Approval -> ", data.isApproved);
        setIsERC1155TransfersApproved(data.isApproved as boolean);
      } catch (error) {
        console.error("Failed to check approval:", error);
      }
    }
  };

  const getQtyForTier = async () => {
    console.log(selectedTier);
    let url = `/api/checks/qtyForTier?wallet=${walletAddress}&contract=${selectedCollection.liquidifyContract}&network=${selectedCollection.network}&tier=${selectedTier.amount}`;

    if (
      selectedCollection.type === "ERC1155" &&
      selectedCollection.version === 3
    ) {
      url = `/api/checks/qtyForTier?wallet=${walletAddress}&contract=${selectedCollection.liquidifyContract}&network=${selectedCollection.network}&tokenId=${selectedERC1155v3TokenId}&type=ERC1155`;
    }

    const response = await fetch(url);

    const data = await response.json();
    console.log(data);
    setTierQty((data.quantity as number) || 0);
  };

  useEffect(() => {
    getQtyForTier();
  }, [selectedTier]);

  useEffect(() => {
    if (selectedCollection == undefined) return;

    if (selectedCollection?.tiers) {
      setSelectedTier(selectedCollection.tiers[0]);
      if (
        selectedCollection.version == 3 &&
        selectedCollection.type == "ERC1155"
      ) {
        setSelectedERC1155v3TokenId(selectedCollection.tiers[0].tokenId);
      }
    }

    fetchBalance();
    fetchApproval();
    fetchNftBalances();
  }, [selectedCollection, walletAddress]);

  useEffect(() => {
    fetchNftBalances();
    getQtyForTier();
  }, [selectedERC1155v3TokenId]);

  return (
    <>
      <div className="flex flex-col w-screen">
        {selectedCollection !== undefined && (
          <>
            <div className="absolute text-white h-[calc(100vh-165px)] w-full flex items-center justify-center z-[999]">
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
                          src="/opensea.png"
                          onClick={() => {
                            window.open(
                              `https://opensea.io/assets/${selectedCollection.network.toLowerCase()}/${
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
                      <div className={"mt-3.5 mb-0.5"}>
                        {(selectedCollection.type === "ERC721" ||
                          selectedCollection.version == 3) &&
                          selectedCollection.type != "ERC1155" && (
                            <>
                              <div className="flex group">
                                <div className="cursor-pointer items-center relative rounded-lg flex flex-grow select-none hover:bg-opacity-20 bg-white bg-opacity-10 px-3 py-2">
                                  <div className="text-white flex flex-grow">
                                    {tokenId == undefined
                                      ? "/"
                                      : tokenId
                                      ? selectedCollection.version === 2
                                        ? tokenId
                                        : v3_tokenId.length > 0
                                        ? `${v3_tokenId.length} NFTs selected`
                                        : tokenId
                                      : "Loading"}
                                  </div>
                                  <ChevronLeft className="group-hover:rotate-[-90deg] h-[15px] transition-all" />
                                </div>

                                {tokenIdList.length >= 1 && (
                                  <>
                                    <div className="select-none flex pt-[50px] absolute rounded-lg group-hover:block hidden w-[317px]  ">
                                      <div className="flex flex-col bg-[#272727] rounded-lg shadow-xl z-[999] p-1 w-full max-h-[280px] overflow-y-auto">
                                        {tokenIdList.map((_tokenId) => {
                                          if (
                                            selectedCollection.version === 2
                                          ) {
                                            return (
                                              <div
                                                onClick={() => {
                                                  setTokenId(_tokenId);
                                                }}
                                                className="px-3 w-full cursor-pointer bg-white bg-opacity-0 hover:bg-opacity-5 py-1 my-0.5 rounded-md"
                                              >
                                                {_tokenId}
                                              </div>
                                            );
                                          }

                                          if (
                                            selectedCollection.version === 3
                                          ) {
                                            return (
                                              <div
                                                onClick={() => {
                                                  if (
                                                    !v3_tokenId.includes(
                                                      _tokenId
                                                    )
                                                  ) {
                                                    return v3_setTokenId([
                                                      ...v3_tokenId,
                                                      _tokenId,
                                                    ]);
                                                  }

                                                  const newV3TokenIds =
                                                    v3_tokenId.filter(
                                                      (id) => id !== _tokenId
                                                    );
                                                  v3_setTokenId(newV3TokenIds);
                                                }}
                                                className={
                                                  "px-3 w-full cursor-pointer bg-white bg-opacity-0 py-1 my-0.5 rounded-md " +
                                                  (v3_tokenId.includes(_tokenId)
                                                    ? "bg-opacity-10"
                                                    : "hover:bg-opacity-5")
                                                }
                                              >
                                                {_tokenId}
                                              </div>
                                            );
                                          }
                                        })}
                                      </div>
                                    </div>
                                  </>
                                )}
                              </div>
                            </>
                          )}

                        {selectedCollection.type === "ERC1155" &&
                          selectedCollection.version == 2 && (
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
                                    setInputtedERC1155Qty(
                                      `${ownedERC1155.toFixed(0)}`
                                    );
                                  }}
                                  className="px-3 py-2 bg-white hover:text-opacity-100 text-sm text-opacity-70 transition-all items-center text-white hover:bg-opacity-[18.5%] flex text-center rounded-r-md outline-none bg-opacity-[15%] flex"
                                >
                                  <span className="mr-1 opacity-70">Max</span>
                                  <span>{ownedERC1155.toFixed(0)}</span>
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

                  {selectedCollection.type === "ERC1155" &&
                    selectedCollection.version == 3 && (
                      <>
                        {/* ERC1155 V3 */}
                        <div
                          className={
                            "flex gap-x-2 " +
                            (mode == "unwrap" && "mt-[16px] mb-0")
                          }
                        >
                          <div className="group">
                            <div className="cursor-pointer min-w-[125px] max-w-[125px] items-center relative rounded-md flex flex-grow select-none hover:bg-opacity-20 bg-white bg-opacity-10 px-3 py-2">
                              <div className="text-white flex flex-grow">
                                {selectedERC1155v3TokenId == undefined ? (
                                  "/"
                                ) : (
                                  <>
                                    <div className="flex items-center">
                                      <span className="mr-2 text-xs opacity-50">
                                        ID
                                      </span>
                                      {selectedERC1155v3TokenId}
                                    </div>
                                  </>
                                )}
                              </div>
                              <ChevronLeft className="group-hover:rotate-[-90deg] h-[15px] transition-all" />
                            </div>

                            <div className="select-none flex pt-[8px] absolute rounded-lg group-hover:block z-[99999] hidden w-[317px]  ">
                              <div className="flex flex-col bg-[#272727] rounded-lg shadow-xl p-1 w-full max-h-[280px] overflow-y-auto">
                                {selectedCollection.tiers.map((tier: any) => {
                                  return (
                                    <div
                                      onClick={() => {
                                        setSelectedERC1155v3TokenId(
                                          tier.tokenId
                                        );
                                      }}
                                      className={
                                        "px-3 w-full cursor-pointer items-center bg-white bg-opacity-0 py-1 my-0.5 rounded-md " +
                                        (tier.tokenId ==
                                        selectedERC1155v3TokenId
                                          ? "bg-opacity-10"
                                          : "hover:bg-opacity-5")
                                      }
                                    >
                                      {tier.name}
                                      <span className="opacity-50 ml-2 text-xs">
                                        (ID {tier.tokenId})
                                      </span>
                                      {/* {_tokenId} */}
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          </div>

                          <div className="flex w-full">
                            {mode == "wrap" && (
                              <>
                                <input
                                  className="px-3 py-2 bg-white rounded-l-md outline-none bg-opacity-10 w-full"
                                  value={selectedERC1155v3NftQuantity}
                                  onChange={async (e) => {
                                    try {
                                      setSelectedERC1155v3NftQuantity(
                                        e.target.value
                                      );
                                    } catch (err) {
                                      console.log(err);
                                    }
                                  }}
                                />
                                <button
                                  onClick={() => {
                                    setSelectedERC1155v3NftQuantity(
                                      `${ownedERC1155}`
                                    );
                                  }}
                                  className="px-3 py-2 bg-white hover:text-opacity-100 text-sm text-opacity-70 transition-all items-center text-white hover:bg-opacity-[18.5%] flex text-center rounded-r-md outline-none bg-opacity-[15%] flex"
                                >
                                  <span className="mr-1 opacity-70">Max</span>
                                  <span>{ownedERC1155}</span>
                                </button>
                              </>
                            )}

                            {mode == "unwrap" && (
                              <>
                                <input
                                  className="px-3 py-2 bg-white rounded-l-md outline-none bg-opacity-10 w-full"
                                  value={selectedERC1155v3NftQuantity}
                                  onChange={async (e) => {
                                    try {
                                      setSelectedERC1155v3NftQuantity(
                                        e.target.value
                                      );
                                    } catch (err) {
                                      console.log(err);
                                    }
                                  }}
                                />
                                <button
                                  onClick={() => {
                                    if (tierQty == 0) return;

                                    setSelectedERC1155v3NftQuantity(
                                      `${
                                        balance /
                                        selectedCollection.tiers.find(
                                          (tier: any) =>
                                            tier.tokenId ==
                                            selectedERC1155v3TokenId
                                        ).amount
                                      }`
                                    );
                                  }}
                                  className="px-3 py-2 bg-white hover:text-opacity-100 text-sm text-opacity-70 transition-all items-center text-white hover:bg-opacity-[18.5%] flex text-center rounded-r-md outline-none bg-opacity-[15%] flex"
                                >
                                  <span className="mr-1 opacity-70">Max</span>
                                  <span>
                                    {tierQty != 0 ? (
                                      <>
                                        {" "}
                                        {balance /
                                          selectedCollection.tiers.find(
                                            (tier: any) =>
                                              tier?.tokenId ==
                                              selectedERC1155v3TokenId
                                          ).amount}
                                      </>
                                    ) : (
                                      <>0</>
                                    )}
                                  </span>
                                </button>
                              </>
                            )}
                          </div>
                        </div>
                      </>
                    )}
                  {mode == "unwrap" && (
                    <>
                      <div className="flex flex-col">
                        {selectedCollection.type === "ERC1155" &&
                          selectedCollection.version == 2 && (
                            <>
                              <div className="flex mt-[18px] w-full mb-0.5">
                                <input
                                  className="px-3 py-2 bg-white rounded-l-md outline-none bg-opacity-10 w-full"
                                  value={inputtedERC1155UnwrapAmt}
                                  onChange={async (e) => {
                                    try {
                                      setInputtedERC1155UnwrapAmt(
                                        e.target.value
                                      );
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

                        {selectedCollection.version == 2 &&
                          selectedCollection.type != "ERC1155" && (
                            <>
                              <span className="select-none mt-6 mb-2 text-center items-center justify-center flex">
                                <span className="select-none mr-2">
                                  Balance:
                                </span>
                                {parseFloat(balance.toFixed(5)).toString()} $
                                {selectedCollection.tokenSymbol}
                              </span>
                            </>
                          )}

                        {selectedCollection.type === "ERC721" &&
                          selectedCollection.version == 3 && (
                            <>
                              <div className="flex flex-col group">
                                {selectedCollection.version == 3 && (
                                  <>
                                    <div className="cursor-pointer mt-[14px] mb-[2px] items-center relative rounded-lg flex flex-grow select-none hover:bg-opacity-20 bg-white bg-opacity-10 px-3 py-2">
                                      <div className="text-white flex flex-grow">
                                        {selectedTier.name}
                                      </div>
                                      <ChevronLeft className="group-hover:rotate-[-90deg] h-[15px] transition-all" />
                                    </div>
                                    {selectedCollection.tiers && (
                                      <>
                                        <div className="z-[100] mt-3.5 select-none flex pt-[50px] absolute rounded-lg group-hover:block hidden w-[317px]">
                                          <div className="flex flex-col bg-[#272727] rounded-lg shadow-xl z-[999] p-1 w-full max-h-[280px] overflow-y-auto">
                                            {selectedCollection?.tiers?.map(
                                              (tier: any) => {
                                                return (
                                                  <div
                                                    onClick={() => {
                                                      setSelectedTier(tier);
                                                    }}
                                                    className={
                                                      "px-3 w-full cursor-pointer items-center flex justify-between bg-white bg-opacity-0 hover:bg-opacity-5 py-1 my-0.5 rounded-md " +
                                                      (selectedTier.name ==
                                                      tier.name
                                                        ? "bg-opacity-5"
                                                        : "")
                                                    }
                                                  >
                                                    <span>{tier.name}</span>
                                                    <span className="text-xs font-mono text-white opacity-50">
                                                      {tier.amount}
                                                    </span>
                                                  </div>
                                                );
                                              }
                                            )}
                                          </div>
                                        </div>
                                      </>
                                    )}
                                  </>
                                )}
                              </div>
                            </>
                          )}
                      </div>
                    </>
                  )}
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
                        }}
                        className="bg-blue-500 px-3 mt-4 outline-none py-2 rounded-md select-none cursor-pointer transition-all bg-opacity-80 w-full justify-between items-center flex hover:bg-opacity-100"
                      >
                        {mode == "wrap" ? (
                          <span className="w-full flex items-center text-center justify-center">
                            {!isERC721TransfersApproved &&
                            !isERC1155TransfersApproved
                              ? "Approve transfer"
                              : "Wrap"}
                          </span>
                        ) : (
                          <>
                            {tierQty == 0 && selectedCollection.version == 3 ? (
                              <>
                                <span className="w-full items-center justify-center">
                                  No NFTs to unwrap in this tier
                                </span>
                              </>
                            ) : (
                              (tierQty != 0 ||
                                selectedCollection.type == "ERC1155" ||
                                selectedCollection.version == 2) && (
                                <>
                                  <span
                                    className={
                                      selectedCollection.version == 2
                                        ? "w-full text-center"
                                        : ""
                                    }
                                  >
                                    Unwrap
                                  </span>
                                  {selectedCollection.version == 3 && (
                                    <>
                                      <span className="text-xs opacity-70">
                                        {selectedCollection.type ==
                                        "ERC1155" ? (
                                          <>
                                            {(
                                              parseInt(
                                                selectedCollection.tiers.find(
                                                  (tier: any) =>
                                                    tier.tokenId ==
                                                    selectedERC1155v3TokenId
                                                ).amount
                                              ) *
                                              parseInt(
                                                selectedERC1155v3NftQuantity
                                              )
                                            ).toLocaleString() || 0}
                                          </>
                                        ) : (
                                          <>
                                            {parseInt(
                                              selectedTier.amount
                                            ).toLocaleString()}
                                          </>
                                        )}
                                      </span>
                                    </>
                                  )}
                                </>
                              )
                            )}
                          </>
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
              <div className="flex text-white gap-3.5 xs:flex-col xs:items-center xs:pb-[100px] flex-wrap min-w-screen mx-10">
                <div className="flex flex-col w-full items-center justify-center">
                  <span className="flex text-2xl items-center py-1 mt-1 select-none font-medium text-white">
                    <BookCheckIcon className="h-[18px] mr-1.5" />
                    Collections
                  </span>

                  <span className="text-sm xs:w-[380px] mb-3 text-center text-white opacity-50 w-[650px]">
                    Verified collections are to indicate where liquidity for the
                    token has been supplied by a lot of community members or by
                    the team behind the project and are by no means an
                    endorsement.
                  </span>
                </div>
                {collections?.liquidNfts?.map((collection: any) => {
                  return (
                    <>
                      <div className="flex w-fit xs:w-full flex flex-col hover:-translate-y-[2.5px] transition-all duration-[200ms]">
                        <div
                          onClick={() => {
                            if (!walletAddress)
                              return toast.error("Please connect your wallet");
                            setSelectedCollection(collection);
                          }}
                          className="flex flex-grow bg-white xs:w-full sm:w-[170px] sm:max-w-[170px] transition-all duration-[55ms] hover:bg-opacity-[13.5%] cursor-pointer select-none flex flex-grow w-full bg-opacity-10 rounded-t-lg select-none w-full px-3 py-2"
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
                                  ${collection.tokenSymbol}
                                </span>
                                <span className="text-xs mb-1 truncate ... opacity-50 mt-0.5">
                                  Chain: {collection.network}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex w-full">
                          <div
                            onClick={() => {
                              window.open(
                                // https://opensea.io/assets/base/0x13dc8261fce63499aa25deb512bb1827b411b83b/6630
                                `https://opensea.io/assets/${collection.network.toLowerCase()}/${
                                  collection.nftAddress
                                }`
                              );
                            }}
                            className="group flex bg-white rounded-bl-lg w-full h-[39px] transition-all duration-[55ms] px-3.5 items-center justify-center hover:bg-opacity-[13.5%] cursor-pointer select-none flex bg-opacity-10 select-none"
                          >
                            <img
                              src="/opensea.png"
                              className="min-h-[15px] transition-all shadow-xl group-hover:shadow-none min-w-[15px] max-h-[15px] max-w-[15px] rounded-md overflow-none"
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
                            className="flex w-full group bg-white transition-all duration-[55ms] px-3.5 items-center justify-center hover:bg-opacity-[13.5%] cursor-pointer select-none flex bg-opacity-10 select-none"
                          >
                            <img
                              src="/etherscan.svg"
                              className="min-h-[15px] transition-all shadow-xl group-hover:shadow-none min-w-[15px] max-h-[15px] max-w-[15px] rounded-md overflow-none"
                            />
                          </div>
                          <div
                            onClick={() => {
                              window.open(
                                `https://app.uniswap.org/#/swap?theme=dark&inputCurrency=ETH&outputCurrency=${collection.liquidifyContract}`
                              );
                            }}
                            className="flex w-full group bg-white rounded-br-lg transition-all duration-[55ms] px-3.5 items-center justify-center hover:bg-opacity-[13.5%] cursor-pointer select-none flex bg-opacity-10 select-none"
                          >
                            <img
                              src="/uniswap.png"
                              className="min-h-[15px] transition-all shadow-xl group-hover:shadow-none min-w-[15px] max-h-[15px] max-w-[15px] rounded-md overflow-none"
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
