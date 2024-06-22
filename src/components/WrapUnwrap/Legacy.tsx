"use client";

import {
  ArrowUpRightSquareIcon,
  ChevronLeft,
  ImagesIcon,
  X,
} from "lucide-react";
import React from "react";
import "../../app/globals.css";
import { useState, useEffect } from "react";
import { useWriteContract, useAccount, useReadContract } from "wagmi";
import LiquidERC721v2 from "../../app/abi/LiquidERC721v2.json";
import LiquidERC721v3 from "../../app/abi/LiquidERC721v3.json";
import LiquidERC1155v2 from "../../app/abi/LiquidERC1155v2.json";
import LiquidERC1155v3 from "../../app/abi/LiquidERC1155v3.json";
import LiquidifyStandardForMutatioWrapper from "../../app/abi/LiquidifyStandardForMutatioWrapper.json";
import { switchChain, watchChainId } from "@wagmi/core";
import { config } from "../../app/providers";
import toast, { Toaster } from "react-hot-toast";
import { parseEther, MaxUint256 } from "ethers";
import { getFactory } from "@/libs/getFactory";
import { connectToDatabase } from "@/libs/database";
import Navbar from "@/components/Navbar";

const LiquidifyMutatio = "0xF9d450590b238CDA15E570F924C9B9fA577A9872";

const LegacyWrapUnwrap: React.FC<{ selectedCollection: any }> = ({
  selectedCollection,
}) => {
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [currentChain, setCurrentChain] = useState<number>(0);
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
  const [mutatioAllowance, setMutatioAllowance] = useState<number>(0);
  const [showNftSelection, setShowNftSelection] = useState<boolean>(false);
  const [nftSelection, setNftSelection] = useState<any>();
  const [loadedOwnedNfts, setLoadedOwnedNfts] = useState<boolean>(false);

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
    if (currentChain === 137) setExplorer("https://polygonscan.com");
    if (currentChain === 81457) setExplorer("https://blastscan.io");

    let _factoryAddress = getFactory(currentChain);

    setFactoryAddress(_factoryAddress as `0x${string}`);
  }, [account.chainId]);

  // Same standard for ERC1155 and ERC721
  const approveTransfers = async () => {
    if (!account.address || !walletAddress)
      return toast.error("Please connect your wallet");

    const liquidifyContractAddress = selectedCollection?.liquidifyContract;

    try {
      const tx = writeContract(
        {
          address: selectedCollection?.nftAddress,
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

  // ${selectedCollection?.tokenSymbol} balance: {balance}
  useEffect(() => {
    if (!account?.address) return;
    setWalletAddress(account.address);
  }, [account?.address]);

  const fetchMutatioERC20Allowance = async () => {
    const item = await fetch(
      `/api/checks/allowanceERC20?wallet=${walletAddress}&contract=0x8b67f2E56139cA052a7EC49cBCd1aA9c83F2752a&operator=${selectedCollection?.liquidifyContract}&network=${selectedCollection?.network}`
    );

    const data = await item.json();

    console.log("mutatioAllowance", data.allowance);
    setMutatioAllowance(data.allowance);
  };

  const wrap = async () => {
    if (!account.address || !walletAddress)
      return toast.error("Please connect your wallet");

    console.log("trying");
    if (selectedCollection?.type == "ERC721") {
      try {
        let data: any;

        if (selectedCollection?.version == 3) {
          data = {
            address: selectedCollection?.liquidifyContract,
            abi: LiquidERC721v3.abi,
            functionName: "wrapERC721",
            value: parseEther(await getStorageFee(v3_tokenId.length)),
            args: [v3_tokenId],
          };
        }

        if (selectedCollection?.version == 2) {
          data = {
            address: selectedCollection?.liquidifyContract,
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

    if (selectedCollection?.type == "ERC1155") {
      try {
        let data;

        if (selectedCollection?.version == 2) {
          data = {
            address: selectedCollection?.liquidifyContract,
            abi: LiquidERC1155v2.abi,
            functionName: "wrapERC1155",
            args: [`${inputtedERC1155Qty}`],
          };
        } else if (selectedCollection?.liquidifyContract == LiquidifyMutatio) {
          data = {
            address: selectedCollection?.liquidifyContract,
            abi: LiquidifyStandardForMutatioWrapper.abi,
            functionName: "wrapERC1155",
            args: [`${selectedERC1155v3NftQuantity}`],
          };
        } else {
          data = {
            address: selectedCollection?.liquidifyContract,
            abi: LiquidERC1155v3.abi,
            functionName: "wrapERC1155",
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
      `/api/checks/storageFee?factoryAddress=${factoryAddress}&contract=${selectedCollection?.liquidifyContract}&quantity=${quantity}&network=${selectedCollection?.network}`
    );

    const data = await response.json();

    console.log(data);

    setStorageFee(data.storageFee);

    return data.storageFee.toString();
  };

  const unwrap = async () => {
    if (!account.address || !walletAddress)
      return toast.error("Please connect your wallet");
    // await fetchBalance();
    console.log("trying unwrap");

    if (selectedCollection?.type == "ERC721") {
      console.log("unwrap erc721");
      try {
        const tx = writeContract(
          {
            address: selectedCollection?.liquidifyContract,
            abi:
              selectedCollection?.version === 2
                ? LiquidERC721v2.abi
                : LiquidERC721v3.abi,
            functionName: "unwrapERC721",
            value:
              selectedCollection?.version === 2
                ? parseEther("0")
                : parseEther(await getStorageFee(1)),
            args: [
              BigInt(
                selectedCollection?.version === 3 &&
                  selectedCollection?.type === "ERC721"
                  ? BigInt(selectedTier.amount) * BigInt(10 ** 18)
                  : Math.floor(
                      parseFloat(selectedCollection?.tokensPerNft) * 10 ** 18
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

    if (selectedCollection?.type == "ERC1155") {
      let data;

      if (selectedCollection?.version == 2) {
        data = {
          address: selectedCollection?.liquidifyContract,
          abi: LiquidERC1155v2.abi,
          functionName: "unwrapERC1155",
          args: [
            Math.floor(
              parseFloat(
                await selectedCollection?.tiers.find(
                  (tier: any) => tier.tokenId == selectedERC1155v3TokenId
                ).amount
              ) *
                10 ** 18
            ),
          ],
        };
      } else if (selectedCollection?.liquidifyContract == LiquidifyMutatio) {
        data = {
          address: selectedCollection?.liquidifyContract,
          abi: LiquidifyStandardForMutatioWrapper.abi,
          functionName: "unwrapERC1155",
          args: [selectedERC1155v3NftQuantity.toString()],
        };
      } else {
        data = {
          address: selectedCollection?.liquidifyContract,
          abi: LiquidERC1155v3.abi,
          functionName: "unwrapERC1155",
          value: parseEther(
            (
              await getStorageFee(parseInt(selectedERC1155v3NftQuantity))
            ).toString()
          ),
          args: [
            selectedERC1155v3TokenId,
            selectedERC1155v3NftQuantity.toString(),
          ],
        };
      }

      console.log("unwrap erc1155");
      try {
        const tx = writeContract(data, {
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
        });
      } catch (err) {
        console.log(err);
      }
    }
  };

  const fetchNftBalances = async () => {
    if (selectedCollection?.type === "ERC721") {
      try {
        const contractAddress = selectedCollection?.nftAddress; // Assuming selectedCollection holds the contract address
        const response = await fetch(
          `/api/checks/ownedERC721?wallet=${walletAddress}&contract=${contractAddress}&network=${selectedCollection?.network}&metadata=true`
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch token IDs: ${response.statusText}`);
        }

        const data = await response.json();

        let tokenIds = data.tokens.map((token: any) => token.tokenId);

        setNftSelection(data.tokens);
        setTokenIdList(tokenIds); // Assuming we want to set the first tokenId, adjust as needed

        if (selectedCollection.version == 2) {
          setTokenId(tokenIds[0]);
          setLoadedOwnedNfts(true);
        }

        if (selectedCollection.version == 3) {
          v3_setTokenId([tokenIds[0]]);
          setLoadedOwnedNfts(true);
        }
      } catch (error) {
        console.error("Failed to fetch token IDs:", error);
      }
    }

    if (selectedCollection?.type === "ERC1155") {
      const contractAddress = selectedCollection?.nftAddress;
      let url = `/api/checks/ownedERC1155?wallet=${walletAddress}&tokenId=${selectedCollection?.tokenId}&contract=${contractAddress}&network=${selectedCollection?.network}`;

      if (selectedCollection?.version == 3) {
        url = `/api/checks/ownedERC1155?wallet=${walletAddress}&tokenId=${selectedERC1155v3TokenId}&contract=${contractAddress}&network=${selectedCollection?.network}`;
      }

      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`Failed to fetch token IDs: ${response.statusText}`);
        }

        let data = await response.json();
        data = await parseInt(data.balance);

        setOwnedERC1155(data);
        setLoadedOwnedNfts(true);
      } catch (error) {
        console.error("Failed to fetch token IDs:", error);
      }
    }
  };

  const fetchBalance = async () => {
    try {
      let contractAddress = selectedCollection?.liquidifyContract; // Assuming selectedCollection holds the contract address
      if (selectedCollection?.liquidifyContract == LiquidifyMutatio) {
        contractAddress = "0x8b67f2E56139cA052a7EC49cBCd1aA9c83F2752a";
      }

      const response = await fetch(
        `/api/checks/balances?wallet=${walletAddress}&contract=${contractAddress}&network=${selectedCollection?.network}`
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
    if (selectedCollection?.type === "ERC721") {
      try {
        const contractAddress = selectedCollection?.nftAddress; // Assuming selectedCollection holds the contract address
        const liquidifyContractAddress = selectedCollection?.liquidifyContract; // Replace with your actual Liquidify contract address
        const response = await fetch(
          `/api/checks/approvalERC721?wallet=${walletAddress}&contract=${contractAddress}&operator=${liquidifyContractAddress}&network=${selectedCollection?.network}`
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

    if (selectedCollection?.type === "ERC1155") {
      try {
        const contractAddress = selectedCollection?.nftAddress; // Assuming selectedCollection holds the contract address
        const liquidifyContractAddress = selectedCollection?.liquidifyContract; // Replace with your actual Liquidify contract address
        const response = await fetch(
          `/api/checks/approvalERC1155?wallet=${walletAddress}&contract=${contractAddress}&tokenId=${selectedCollection?.tokenId}&operator=${liquidifyContractAddress}&network=${selectedCollection?.network}`
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
    if (selectedCollection?.liquidifyContract == LiquidifyMutatio) {
      return setTierQty(999999);
    }

    console.log(selectedTier);
    let url = `/api/checks/qtyForTier?wallet=${walletAddress}&contract=${selectedCollection?.liquidifyContract}&network=${selectedCollection?.network}&tier=${selectedTier.amount}`;

    if (
      selectedCollection?.type === "ERC1155" &&
      selectedCollection?.version === 3
    ) {
      url = `/api/checks/qtyForTier?wallet=${walletAddress}&contract=${selectedCollection?.liquidifyContract}&network=${selectedCollection?.network}&tokenId=${selectedERC1155v3TokenId}&type=ERC1155`;
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
    if (selectedCollection == undefined || !selectedCollection) return;

    if (selectedCollection?.tiers) {
      setSelectedTier(selectedCollection?.tiers[0]);
      if (
        selectedCollection?.version == 3 &&
        selectedCollection?.type == "ERC1155"
      ) {
        setSelectedERC1155v3TokenId(selectedCollection?.tiers[0].tokenId);
      }
    }

    if (selectedCollection?.liquidifyContract == LiquidifyMutatio) {
      fetchMutatioERC20Allowance();
    }

    fetchBalance();
    fetchApproval();
    fetchNftBalances();
  }, [selectedCollection, walletAddress]);

  const selectNft = (tokenId: number) => {
    if (selectedCollection.type != "ERC721") return;

    if (selectedCollection.version == 2) {
      setTokenId(tokenId);
      setShowNftSelection(false);
    }

    if (selectedCollection.version == 3) {
      if (!v3_tokenId.includes(tokenId)) {
        return v3_setTokenId([...v3_tokenId, tokenId]);
      }

      const newV3TokenIds = v3_tokenId.filter((id) => id !== tokenId);
      v3_setTokenId(newV3TokenIds);
    }
  };

  const approveMutatioERC20 = () => {
    console.log("approve mutatio");

    try {
      const tx = writeContract(
        {
          address: "0x8b67f2E56139cA052a7EC49cBCd1aA9c83F2752a",
          abi: [
            {
              inputs: [
                { internalType: "address", name: "spender", type: "address" },
                { internalType: "uint256", name: "value", type: "uint256" },
              ],
              name: "approve",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
          ],
          functionName: "approve",
          args: [selectedCollection?.liquidifyContract, MaxUint256],
        },
        {
          onSuccess: async (tx: any) => {
            toastTx(tx);

            await new Promise((resolve) => setTimeout(resolve, 3000));
            fetchMutatioERC20Allowance();
          },
        }
      );
    } catch (err) {}
  };

  useEffect(() => {
    fetchNftBalances();
    getQtyForTier();
  }, [selectedERC1155v3TokenId]);

  useEffect(() => {}, [showNftSelection]);

  return (
    <>
      <div className="flex flex-col w-screen h-screen">
        <Navbar page="collection" />
        {selectedCollection !== undefined && (
          <>
            <title>{selectedCollection.tokenName}</title>
            <div className="absolute text-white h-[calc(100vh)] w-full flex items-center justify-center z-[999]">
              <div className="flex h-[170px] min-h-[170px] max-h-[170px] w-full items-center justify-center w-[340px] max-w-[340px]">
                <div className="p-3 w-full flex flex-col rounded-lg bg-white bg-opacity-10 ">
                  <div className="flex ">
                    <img
                      className="mr-3 h-[110px] w-[110px] min-w-[110px] max-w-[110px] select-none bg-white bg-opacity-10 min-h-[110px] max-h-[110px] object-cover rounded-md outline-none overflow-hidden pointer-events-none"
                      src={selectedCollection?.nftProjectImage || "/temp.png"}
                    />
                    <div className="flex flex-col">
                      <span className="select-none text-xl font-semibold flex text-center items-center justify-left">
                        ${selectedCollection?.tokenSymbol}
                      </span>
                      <span className="select-none mb-1 text-left ">
                        {selectedCollection?.nftName ||
                          selectedCollection?.tokenName}
                      </span>
                      <span className="mb-3 select-none flex text-sm item-center justify-left flex">
                        {new Intl.NumberFormat().format(
                          selectedCollection?.tokensPerNft
                        )}{" "}
                        ${selectedCollection?.tokenSymbol} = 1 NFT
                      </span>
                      <div className="flex items-center gap-x-3.5 justify-left h-[20px] mb-4">
                        <img
                          src="/opensea.png"
                          onClick={() => {
                            window.open(
                              `https://opensea.io/assets/${selectedCollection?.network.toLowerCase()}/${
                                selectedCollection?.nftAddress
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
                              selectedCollection?.network == "Ethereum"
                                ? "https://etherscan.io/token/"
                                : selectedCollection?.network === "Base"
                                ? "https://basescan.org/token/"
                                : selectedCollection?.network === "Polygon"
                                ? "https://polygonscan.com/token/"
                                : selectedCollection?.network === "Blast"
                                ? "https://blastscan.io/token/"
                                : "";
                            window.open(
                              `${baseUrl}${selectedCollection?.liquidifyContract}`
                            );
                          }}
                        />
                        <img
                          src="/uniswap.png"
                          onClick={() => {
                            window.open(
                              `https://app.uniswap.org/#/swap?theme=dark&inputCurrency=ETH&outputCurrency=${selectedCollection?.liquidifyContract}`
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
                        {(selectedCollection?.type === "ERC721" ||
                          selectedCollection?.version == 3) &&
                          selectedCollection?.type != "ERC1155" && (
                            <>
                              <div className="flex">
                                <div className="flex group w-full">
                                  <div
                                    className={
                                      "items-center relative rounded-lg z-[99999] flex flex-grow select-none bg-white bg-opacity-10 px-3 py-2 " +
                                      (loadedOwnedNfts == true &&
                                      tokenIdList.length >= 1
                                        ? "group-hover:bg-opacity-20 cursor-pointer"
                                        : "cursor-not-allowed")
                                    }
                                  >
                                    <div className="text-white flex flex-grow">
                                      {loadedOwnedNfts == false && "Loading"}
                                      {loadedOwnedNfts == true &&
                                      tokenIdList.length >= 1 ? (
                                        <>
                                          {selectedCollection.version == 2 && (
                                            <>{tokenId}</>
                                          )}

                                          {selectedCollection.version == 3 && (
                                            <>
                                              {v3_tokenId.length == 0
                                                ? "Select"
                                                : `${v3_tokenId.length} selected NFTs`}
                                            </>
                                          )}
                                        </>
                                      ) : (
                                        loadedOwnedNfts == true &&
                                        tokenIdList.length == 0 &&
                                        "No owned NFTs"
                                      )}
                                    </div>
                                    <ChevronLeft
                                      className={
                                        "h-[15px] transition-all -mr-1.5 " +
                                        (loadedOwnedNfts == true &&
                                          tokenIdList.length >= 1 &&
                                          "group-hover:rotate-[-90deg]")
                                      }
                                    />
                                  </div>

                                  {tokenIdList?.length >= 1 && (
                                    <>
                                      <div className="select-none flex pt-[43px] absolute rounded-lg transition-all group-hover:block hidden shadow-xl w-[268px]  ">
                                        <div className="flex flex-col bg-[#272727] rounded-lg shadow-xl z-[999] p-1 gap-y-1 w-full max-h-[280px] overflow-y-auto">
                                          {tokenIdList.map((_tokenId) => {
                                            if (
                                              selectedCollection?.version === 2
                                            ) {
                                              return (
                                                <div
                                                  onClick={() => {
                                                    setTokenId(_tokenId);
                                                  }}
                                                  className="px-3 w-full cursor-pointer bg-white bg-opacity-0 hover:bg-opacity-5 py-1 rounded-md"
                                                >
                                                  {_tokenId}
                                                </div>
                                              );
                                            }

                                            if (
                                              selectedCollection?.version === 3
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
                                                    v3_setTokenId(
                                                      newV3TokenIds
                                                    );
                                                  }}
                                                  className={
                                                    "px-3 w-full cursor-pointer bg-white bg-opacity-0 py-1 rounded-md " +
                                                    (v3_tokenId.includes(
                                                      _tokenId
                                                    )
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
                                <button
                                  onClick={() => {
                                    if (!account.address)
                                      return toast.error(
                                        "Please connect your wallet"
                                      );

                                    if (tokenIdList.length < 1)
                                      return toast.error("No owned NFTs found");

                                    setShowNftSelection(true);
                                  }}
                                  className={
                                    "group flex bg-white bg-opacity-[10%] text-opacity-50 text-white px-2 items-center rounded-lg transition-all ml-2 " +
                                    (tokenIdList.length >= 1
                                      ? "hover:bg-opacity-20 group-hover:text-opacity-70"
                                      : "cursor-not-allowed")
                                  }
                                >
                                  <ImagesIcon className="transition-all scale-[0.9]" />
                                </button>
                              </div>
                            </>
                          )}

                        {selectedCollection?.type === "ERC1155" &&
                          selectedCollection?.version == 2 && (
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
                    </>
                  )}

                  {selectedCollection?.type === "ERC1155" &&
                    selectedCollection?.version == 3 && (
                      <>
                        {/* ERC1155 V3 */}
                        <div
                          className={
                            "flex gap-x-2 " +
                            (mode == "unwrap" && "mt-[16px] mb-0")
                          }
                        >
                          <div className="group">
                            <div className="cursor-pointer min-w-[150px] max-w-[150px] items-center relative rounded-md flex flex-grow select-none group-hover:bg-opacity-20 transition-all bg-white bg-opacity-10 px-3 py-2">
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
                              <ChevronLeft
                                className={
                                  "h-[15px] transition-all -mr-1.5 group-hover:rotate-[-90deg]"
                                }
                              />
                            </div>

                            <div className="select-none flex pt-[3.5px] absolute rounded-lg group-hover:block z-[99999] shadow-xl hidden min-w-[150px] max-w-[150px] ">
                              <div className="flex flex-col bg-[#272727] rounded-lg shadow-xl p-1 w-full max-h-[280px] overflow-y-auto">
                                {selectedCollection?.tiers.map((tier: any) => {
                                  return (
                                    <div
                                      onClick={() => {
                                        setSelectedERC1155v3TokenId(
                                          tier.tokenId
                                        );
                                      }}
                                      className={
                                        "px-3 w-full cursor-pointer items-center bg-white bg-opacity-0 py-1 rounded-md " +
                                        (tier.tokenId ==
                                        selectedERC1155v3TokenId
                                          ? "bg-opacity-10"
                                          : "hover:bg-opacity-5")
                                      }
                                    >
                                      {tier.name}
                                      <span className="opacity-50 ml-1 text-[8px]">
                                        ID #{tier.tokenId}
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
                                        selectedCollection?.tiers.find(
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
                                    {tierQty != 0 &&
                                    selectedCollection?.liquidifyContract !=
                                      LiquidifyMutatio ? (
                                      <>
                                        {" "}
                                        {balance /
                                          selectedCollection?.tiers.find(
                                            (tier: any) =>
                                              tier?.tokenId ==
                                              selectedERC1155v3TokenId
                                          )?.amount}
                                      </>
                                    ) : tierQty != 0 &&
                                      selectedCollection?.liquidifyContract ==
                                        LiquidifyMutatio ? (
                                      <> {Math.floor(balance)}</>
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
                        {selectedCollection?.type === "ERC1155" &&
                          selectedCollection?.version == 2 && (
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

                        {selectedCollection?.version == 2 &&
                          selectedCollection?.type != "ERC1155" && (
                            <>
                              <span className="select-none mt-6 mb-2 text-center items-center justify-center flex">
                                <span className="select-none mr-2">
                                  Balance:
                                </span>
                                {parseFloat(balance.toFixed(5)).toString()} $
                                {selectedCollection?.tokenSymbol}
                              </span>
                            </>
                          )}

                        {selectedCollection?.type === "ERC721" &&
                          selectedCollection?.version == 3 && (
                            <>
                              <div className="flex flex-col group">
                                {selectedCollection?.version == 3 && (
                                  <>
                                    <div className="flex">
                                      <div className="cursor-pointer mt-[14px] mb-[2px] items-center relative rounded-lg z-[9999] flex flex-grow select-none group-hover:bg-opacity-20 bg-white bg-opacity-10 px-3 py-2">
                                        <div className="text-white flex flex-grow">
                                          {selectedTier.name}
                                        </div>
                                        <ChevronLeft className="group-hover:rotate-[-90deg] h-[15px] transition-all -mr-1.5" />
                                      </div>
                                    </div>
                                    {selectedCollection?.tiers && (
                                      <>
                                        <div className="z-[100] mt-3.5 select-none flex pt-[43px] absolute shadow-xl rounded-lg transition-all group-hover:block hidden w-[317px]">
                                          <div className="flex flex-col bg-[#272727] rounded-lg shadow-xl z-[999] p-1 w-full max-h-[280px] gap-y-1 overflow-y-auto">
                                            {selectedCollection?.tiers?.map(
                                              (tier: any) => {
                                                return (
                                                  <div
                                                    onClick={() => {
                                                      setSelectedTier(tier);
                                                    }}
                                                    className={
                                                      "px-3 w-full cursor-pointer items-center flex justify-between bg-white bg-opacity-0 hover:bg-opacity-5 py-1 rounded-md " +
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
                            selectedCollection?.network == "Ethereum" &&
                            currentChain != 1
                          ) {
                            switchChain(config, { chainId: 1 });
                          }

                          if (
                            selectedCollection?.network == "Base" &&
                            currentChain != 8453
                          ) {
                            switchChain(config, { chainId: 8453 });
                          }

                          if (
                            selectedCollection?.liquidifyContract ==
                              LiquidifyMutatio &&
                            mutatioAllowance === 0
                          ) {
                            return approveMutatioERC20();
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
                            {tierQty == 0 &&
                            selectedCollection?.version == 3 ? (
                              <>
                                <span className="w-full items-center justify-center">
                                  No NFTs to unwrap in this tier
                                </span>
                              </>
                            ) : selectedCollection?.liquidifyContract ==
                                LiquidifyMutatio && mutatioAllowance == 0 ? (
                              <span className="w-full items-center">
                                Approve transfer
                              </span>
                            ) : (
                              (tierQty != 0 ||
                                selectedCollection?.type == "ERC1155" ||
                                selectedCollection?.version == 2) && (
                                <>
                                  <span
                                    className={
                                      selectedCollection?.version == 2
                                        ? "w-full text-center"
                                        : ""
                                    }
                                  >
                                    Unwrap
                                  </span>
                                  {selectedCollection?.version == 3 && (
                                    <>
                                      <span className="text-xs opacity-70">
                                        {selectedCollection?.type ==
                                          "ERC1155" &&
                                        selectedCollection?.liquidifyContract !=
                                          LiquidifyMutatio ? (
                                          <>
                                            {(
                                              parseInt(
                                                selectedCollection?.tiers.find(
                                                  (tier: any) =>
                                                    tier.tokenId ==
                                                    selectedERC1155v3TokenId
                                                )?.amount
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
            {showNftSelection && (
              <>
                <div className="absolute h-screen w-screen z-[999] flex items-center justify-center ">
                  <div
                    onClick={() => {
                      setShowNftSelection(false);
                    }}
                    className="absolute bg-black h-screen w-screen flex items-center justify-center opacity-50"
                  />
                  <div className="bg-[#202020] h-[390px] w-[500px] rounded-lg z-[999] p-3">
                    <div className="flex w-full items-center justify-between">
                      <div className="flex items-center">
                        <ImagesIcon className="mr-1 text-white opacity-[50%] h-[17px]" />
                        <span className="text-white select-none text-lg opacity-50">
                          {selectedCollection.version == 3
                            ? "Select NFTs to wrap"
                            : "Select NFT to wrap"}
                        </span>
                      </div>
                      <X
                        className="cursor-pointer text-white opacity-[35%] hover:opacity-70 transition-all h-[20px]"
                        onClick={() => {
                          setShowNftSelection(false);
                        }}
                      />
                    </div>
                    <div className="flex flex-wrap w-full h-[90%] z-[9999] mt-3 overflow-y-scroll gap-2 rounded-md">
                      {nftSelection?.map((nft: any) => {
                        console.log("nft", nft);
                        return (
                          <>
                            <div
                              onClick={() => {
                                selectNft(nft.tokenId);
                              }}
                              className={
                                "overflow-hidden rounded-md relative h-[100px] border-2 w-[100px] max-h-[100px] max-w-[100px] min-h-[100px] min-w-[100px] cursor-pointer transition-all duration-[100ms] " +
                                (v3_tokenId.includes(nft.tokenId) ||
                                tokenId == nft.tokenId
                                  ? "border-white border-opacity-70 "
                                  : "border-[#282828] hover:border-white hover:border-opacity-[15%]")
                              }
                            >
                              <div className="relative h-[100px] w-[100px]">
                                <img
                                  src={nft.image}
                                  className="h-[100px] rounded-md w-[100px] z-[100] absolute"
                                  onLoad={(e) => {
                                    e.currentTarget.style.display = "block";
                                  }}
                                  onError={(e) => {
                                    e.currentTarget.style.display = "none";
                                  }}
                                  style={{ display: "none" }}
                                />
                                <div className="bg-white h-full w-full bg-opacity-10 flex items-center justify-center">
                                  <span className="select-none opacity-50 font-mono text-uppercase text-white text-xs">
                                    Image
                                  </span>
                                </div>
                              </div>

                              <span className="absolute bottom-1 select-none z-[999] rounded-sm left-1 text-white bg-black text-xs font-mono px-1 bg-opacity-20">
                                #{nft.tokenId}
                              </span>
                            </div>
                          </>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default LegacyWrapUnwrap;
