"use client";

import {
  AlertTriangle,
  ArrowLeftCircleIcon,
  CircleDollarSign,
  Copy,
  Droplet,
  Hammer,
  HammerIcon,
  Image,
  Info,
  PencilRulerIcon,
  Repeat,
  X,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import "../app/globals.css";
import LiquidifyV2Factory from "../app/abi/LiquidifyV2Factory.json";
import { useWriteContract, useReadContract, useAccount } from "wagmi";
import { switchChain, watchChainId } from "@wagmi/core";
import { config } from "../app/providers";
import LiquidERC721 from "../app/abi/LiquidERC721.json";
import LiquidERC1155 from "../app/abi/LiquidERC1155.json";

const LiquidifyPage = () => {
  const {
    data: hash,
    isSuccess,
    isError,
    isPending,
    writeContract,
    error,
  } = useWriteContract();
  const account = useAccount();
  const [selectedContract, setSelectedContract] = useState<
    "ERC721" | "ERC1155" | undefined
  >(undefined);

  // string memory tokenName,
  // string memory tokenSymbol,
  // address nftContractAddress,
  // uint256 tokensPerNft

  const [tokenName, setTokenName] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("");
  const [nftContractAddress, setNftContractAddress] = useState("");
  const [tokensPerNft, setTokensPerNft] = useState<number>(1);
  const [factoryAddress, setFactoryAddress] = useState<`0x${string}`>(
    "0x771bCAFc8125eaBF197707C60FAb77c31B74AdcC"
  );
  const [explorer, setExplorer] = useState<string>("https://etherscan.io");
  const [inputtedERC1155TokenId, setInputtedERC1155TokenId] =
    useState<string>("");
  const [sellFees, setSellFees] = useState<number>(0);
  const [ownedPairs, setOwnedPairs] = useState([]);

  const [tab, setTab] = useState<"manage" | "create">("create");
  const [manage, setManage] = useState<any>();
  const [manageTab, setManageTab] = useState<
    "liquiditypool" | "royalties" | "transfer"
  >("liquiditypool");
  const [managePage_royalty, managePage_setRoyalty] = useState<any>();
  const [managePage_royaltyInput, managePage_setRoyaltyInput] = useState<any>();
  const [
    managePage_liquidityPoolAddressInput,
    managePage_setLiquidityPoolAddressInput,
  ] = useState("");

  useEffect(() => {
    let currentChain = account.chainId;

    if (currentChain == 1) setExplorer("https://etherscan.io");
    if (currentChain === 8453) setExplorer("https://basescan.org");

    if (currentChain === 1) {
      console.log("Mainnet detected");
      // setFactoryAddress("0x3650904aa590553111f208DfE159C980b4dcdf8e");
    }

    if (currentChain === 8453) {
      setFactoryAddress("0x771bCAFc8125eaBF197707C60FAb77c31B74AdcC");
    }
  }, [account.chainId]);

  useEffect(() => {
    if (!error) return;
    let errMsg = error.toString();

    if (errMsg.includes("User rejected the request")) {
      return;
    }

    if (errMsg.includes("Connector not connected")) {
      return alert("Please connect your wallet");
    }

    if (
      errMsg.includes(
        "executing this transaction exceeds the balance of the account"
      )
    ) {
      return alert("Insufficient ETH balance for transaction and gas");
    }

    if (errMsg.includes("Listing expired")) {
      return alert("Listing expired for one or more blocks");
    }

    return alert(errMsg);
  }, [isError]);

  const createLNFT = () => {
    if (selectedContract == "ERC721") {
      const tx = writeContract(
        {
          address: factoryAddress,
          abi: LiquidifyV2Factory.abi,
          functionName: "createLiquidERC721",
          args: [
            tokenName,
            tokenSymbol,
            nftContractAddress,
            tokensPerNft,
            sellFees * 100,
          ],
        },
        {
          onSuccess: (tx: any) => {
            alert(
              "Success, opening a new tab with tx data. If you're creating an LP with this token, make sure to use Uniswap V2 for full functionality."
            );
            window.open(`${explorer}/tx/${tx}`);
          },
        }
      );
    }

    if (selectedContract == "ERC1155") {
      const tx = writeContract(
        {
          address: factoryAddress,
          abi: LiquidifyV2Factory.abi,
          functionName: "createLiquidERC1155",
          args: [
            tokenName,
            tokenSymbol,
            nftContractAddress,
            inputtedERC1155TokenId,
            tokensPerNft,
            sellFees * 100,
          ],
        },
        {
          onSuccess: (tx: any) => {
            alert("Success, opening a new tab with tx data. If you're creating an LP with this token, make sure to use Uniswap V2 for full functionality.");
            window.open(`${explorer}/tx/${tx}`);
          },
        }
      );
    }
  };

  const loadOwnedPairs = async () => {
    let _ownedPairs = await fetch(`/api/pairs/owned?wallet=${account.address}`);

    if (!_ownedPairs) return;

    let item = await _ownedPairs.json();
    item = item?.ownedPairs;

    if (!item) return;

    setOwnedPairs(item);
  };

  useEffect(() => {
    loadOwnedPairs();
  }, [account.address]);

  const loadRoyalty = async () => {
    let _royalties = await fetch(
      `/api/checks/royaltyFee?contract=${manage.liquidifyContract}&network=${manage.network}`
    );

    let item = await _royalties.json();

    if (!item?.royalty) return;

    console.log(item.royalty);

    managePage_setRoyalty(item.royalty);
  };

  const updateRoyalty = async () => {
    try {
      const tx = writeContract(
        {
          address: manage.liquidifyContract,
          abi: LiquidERC721.abi,
          functionName: "setSellFee",
          args: [managePage_royaltyInput * 100],
        },
        {
          onSuccess: (tx: any) => {
            alert("Success, opening a new tab with tx data");
            setTimeout(() => {
              console.log("Transaction successful, redirecting...");
              window.open(`${explorer}/tx/${tx.transactionHash}`);
              loadRoyalty();
            }, 2000);
          },
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  const loadPairOwner = async () => {
    let _pairOwner = await fetch(
      `/api/checks/pairOwner?contract=${manage.liquidifyContract}&network=${manage.network}`
    );

    let item = await _pairOwner.json();

    console.log(item);
  };

  const addAddressToLP = async () => {
    try {
      const tx = writeContract(
        {
          address: manage.liquidifyContract,
          abi: LiquidERC721.abi,
          functionName: "setLiquidityPool",
          args: [managePage_liquidityPoolAddressInput, true],
        },
        {
          onSuccess: (tx: any) => {
            alert("Success, opening a new tab with tx data");
            setTimeout(() => {
              console.log("Transaction successful, redirecting...");
              window.open(`${explorer}/tx/${tx.transactionHash}`);
            }, 2000);
          },
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!manage) return;
    loadRoyalty();
    loadPairOwner();
  }, [manage]);

  return (
    <div className="flex w-full flex-col h-full">
      {tab == "manage" && (
        <>
          <div className="flex flex-col items-center">
            <span className="flex text-2xl text-center justify-center items-center py-1 mt-1 select-none font-medium text-white">
              <Droplet className="h-[18px] mr-2" />
              Manage pairs
            </span>
            <span className="text-sm text-white text-opacity-50 w-[450px] text-center">
              Manage royalties and set the liquidity pools for your LNFT pairs.
            </span>
          </div>

          <div className="flex flex-col min-h-[calc(100vh-250px)] select-none items-center justify-center gap-y-2.5">
            <div className="absolute top-3 left-5 mt-[150px] ">
              <button
                onClick={() => {
                  if (!manage) {
                    return setTab("create");
                  }

                  return setManage(null);
                }}
                className="text-white cursor-pointer select-none absolute items-center flex pr-3 pl-2 py-2 text-sm bg-white rounded-md bg-opacity-[15%] transition-all hover:bg-opacity-[20.5%]"
              >
                <ArrowLeftCircleIcon className="mr-1 h-[15px]" />
                Back
              </button>
            </div>

            {!manage && (
              <>
                {ownedPairs?.map((pair: any) => (
                  <>
                    <div
                      onClick={() => {
                        setManage(pair);
                      }}
                      className="flex py-2 cursor-pointer px-3.5 transition-all duration-[100ms] items-center bg-white bg-opacity-10 hover:bg-opacity-[15%] rounded-lg"
                    >
                      <img
                        className="border-[1px] object-cover rounded-lg select-none overflow-none border-opacity-10 border-white h-[55px] mr-2 w-[55px] min-w-[55px] min-h-[55px] max-w-[55px] max-h-[55px]"
                        src={pair?.nftProjectImage || "/temp.png"}
                      />
                      <div className="flex flex-col">
                        <span className="text-white">
                          {pair?.tokenName} / ${pair.tokenSymbol}
                        </span>
                        <span className="text-white text-sm">
                          {pair?.liquidifyContract}
                        </span>
                        <span className="text-white text-sm">
                          {pair.type} on {pair.network}
                        </span>
                      </div>
                    </div>
                  </>
                ))}
              </>
            )}

            {manage && (
              <>
                <div className="flex flex-col text-white p-3 bg-white bg-opacity-5 rounded-xl shadow-2xl">
                  <span className="font-medium text-xl">
                    {manage.tokenName} / ${manage.tokenSymbol}
                  </span>
                  <div className="flex gap-x-2 items-center justify-start w-full text-left">
                    <span className="mr-1.5">{manage?.liquidifyContract}</span>
                    <img
                      onClick={() => {
                        let baseUrl =
                          manage?.network == "Ethereum"
                            ? "https://etherscan.io/address/"
                            : manage?.network === "Base"
                            ? "https://basescan.org/address/"
                            : "";
                        window.open(`${baseUrl}${manage?.liquidifyContract}`);
                      }}
                      src="/etherscan.svg"
                      className="h-4 opacity-70 hover:opacity-100 transition-all cursor-pointer"
                    />
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(
                          manage?.liquidifyContract
                        );
                        alert("Copied to clipboard");
                      }}
                    >
                      <Copy className="h-4 opacity-70 hover:opacity-100 transition-all cursor-pointer" />
                    </button>
                  </div>

                  <div className="flex w-full bg-white bg-opacity-5 p-1 gap-x-1.5 rounded-md mt-3.5">
                    <div
                      className={`flex bg-white items-center w-full p-1 pl-3 pr-5 text-white ${
                        manageTab === "liquiditypool"
                          ? "text-opacity-100 bg-opacity-10"
                          : "text-opacity-70 bg-opacity-5"
                      } rounded-md hover:bg-opacity-10 transition-all cursor-pointer whitespace-nowrap`}
                      onClick={() => setManageTab("liquiditypool")}
                    >
                      <Repeat className="h-[15px] mr-1" />
                      Liquidity pool
                    </div>
                    <div
                      className={`flex bg-white items-center w-full p-1 px-3 text-white ${
                        manageTab === "royalties"
                          ? "text-opacity-100 bg-opacity-10"
                          : "text-opacity-70 bg-opacity-5"
                      } rounded-md hover:bg-opacity-10 transition-all cursor-pointer`}
                      onClick={() => {
                        setManageTab("royalties");
                      }}
                    >
                      <CircleDollarSign className="h-[15px] mr-1" />
                      Royalties
                    </div>
                    {/* <div
                      className={`flex bg-white items-center w-full p-1 px-3 text-white ${
                        manageTab === "transfer"
                          ? "text-opacity-100 bg-opacity-10"
                          : "text-opacity-70 bg-opacity-5"
                      } rounded-md hover:bg-opacity-10 transition-all cursor-pointer`}
                      onClick={() => {
                        setManageTab("transfer");
                      }}
                    >
                      <AlertTriangle className="h-[15px] mr-1" />
                      Transfer
                    </div> */}
                  </div>
                  <div className="p-1.5 flex h-[300px] w-full items-center justify-center flex-col">
                    {manageTab == "liquiditypool" && (
                      <>
                        <div className="flex flex-col pb-3">
                          <span className="text-xl font-semibold mb-0">
                            Activate royalties
                          </span>
                          <span className="text-sm opacity-70 mb-2.5 -mt-1 text-wrap flex w-[330px]">
                            In order to receive royalties, please enter the
                            Uniswap v2 pool address for your token.
                          </span>
                          <div className="flex flex-col justify-end items-end">
                            <input
                              placeholder="Liquidity pool address"
                              onChange={(e) => {
                                managePage_setLiquidityPoolAddressInput(
                                  e.target.value
                                );
                              }}
                              className="text-white bg-white bg-opacity-10 w-[350px] outline-none py-1.5 px-2 rounded-md"
                            />
                            <button
                              onClick={addAddressToLP}
                              className="mt-3 bg-blue-500 opacity-90 hover:opacity-100 cursor-pointer select none px-3 py-1 rounded-md transition-all"
                            >
                              Confirm
                            </button>
                          </div>
                        </div>
                      </>
                    )}

                    {manageTab == "royalties" && (
                      <>
                        <div className="flex flex-col pb-3">
                          <span className="text-xl font-semibold mb-0">
                            Royalties
                          </span>
                          <span className="text-sm opacity-70 mb-2.5 -mt-1 text-wrap flex w-[330px]">
                            These will automatically get sent to your wallet on
                            every sell, royalties are currently set at{" "}
                            {parseInt(
                              `${managePage_royalty?.toString() || 0}`
                            ) / 100 || "0"}
                            %
                          </span>
                          <div className="flex flex-col justify-end items-end">
                            <div className="flex">
                              <input
                                placeholder="New royalty rate"
                                onChange={(e) => {
                                  managePage_setRoyaltyInput(e.target.value);
                                }}
                                className="text-white bg-white bg-opacity-10 w-[320px] outline-none py-1.5 px-2 rounded-l-md"
                              />
                              <div className="rounded-r-md flex h-full px-2 bg-white bg-opacity-10 w-[30px] items-center">
                                %
                              </div>
                            </div>
                            <button
                              onClick={updateRoyalty}
                              className="mt-3 bg-blue-500 opacity-90 hover:opacity-100 cursor-pointer select none px-3 py-1 rounded-md transition-all"
                            >
                              Confirm
                            </button>
                          </div>
                        </div>
                      </>
                    )}

                    {manageTab == "transfer" && (
                      <>
                        <div className="flex flex-col pb-3">
                          <span className="text-xl font-semibold mb-0">
                            Transfer ownership
                          </span>
                          <span className="text-sm opacity-70 mb-2.5 -mt-1 text-wrap flex w-[330px]">
                            By transfering ownership, you are also sending any
                            new royalties and royalty management to this
                            address. This is a permanent action.
                          </span>
                          <div className="flex flex-col justify-end items-end">
                            <div className="flex">
                              <input
                                placeholder="New royalty rate"
                                onChange={(e) => {
                                  managePage_setRoyaltyInput(e.target.value);
                                }}
                                className="text-white bg-white bg-opacity-10 w-[320px] outline-none py-1.5 px-2 rounded-l-md"
                              />
                              <div className="rounded-r-md flex h-full px-2 bg-white bg-opacity-10 w-[30px] items-center">
                                %
                              </div>
                            </div>
                            <button
                              onClick={updateRoyalty}
                              className="mt-3 bg-blue-500 opacity-90 hover:opacity-100 cursor-pointer select none px-3 py-1 rounded-md transition-all"
                            >
                              Confirm
                            </button>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </>
      )}
      {tab == "create" && (
        <>
          <div className="flex flex-col items-center">
            <span className="flex text-2xl text-center justify-center items-center py-1 mt-1 select-none font-medium text-white">
              <Droplet className="h-[18px] mr-2" />
              Liquidify
            </span>
            <span className="text-sm text-white text-opacity-50 w-[450px] text-center">
              If your collection or a collection you would like to trade as an
              ERC20 has already been liquidified there's no need to repeat this
              process unless you know what you're doing.
            </span>
          </div>

          <div className="flex flex-col min-h-[calc(100vh-250px)] items-center justify-center">
            {!selectedContract && (
              <>
                <div className="flex gap-x-3">
                  <div
                    onClick={() => {
                      setTab("manage");
                    }}
                    className="cursor-pointer flex-col shadow-xl hover:shadow-none select-none hover:bg-opacity-[7.5%] text-opacity-80 hover:text-opacity-100 text-white h-[250px] font-mono bg-white bg-opacity-5 transition-all border-white border-opacity-5 flex items-center justify-center w-[250px] border-2 rounded-lg"
                  >
                    <PencilRulerIcon className="mb-2" />
                    Manage
                    {/* <span className="text-xs">ETH L1 + BASE</span> */}
                  </div>
                  <div
                    onClick={() => {
                      setSelectedContract("ERC721");
                    }}
                    className="cursor-pointer flex-col shadow-xl hover:shadow-none select-none hover:bg-opacity-[7.5%] text-opacity-80 hover:text-opacity-100 text-white h-[250px] font-mono bg-white bg-opacity-5 transition-all border-white border-opacity-5 flex items-center justify-center w-[250px] border-2 rounded-lg"
                  >
                    <Image className="mb-2" />
                    ERC721
                    {/* <span className="text-xs">ETH L1 + BASE</span> */}
                  </div>

                  <div
                    onClick={() => {
                      setSelectedContract("ERC1155");
                    }}
                    className="cursor-pointer flex-col shadow-xl hover:shadow-none select-none hover:bg-opacity-[7.5%] text-opacity-80 hover:text-opacity-100 text-white h-[250px] font-mono bg-white bg-opacity-5 transition-all border-white border-opacity-5 flex items-center justify-center w-[250px] border-2 rounded-lg"
                  >
                    <Image className="mb-2" />
                    ERC1155
                    {/* <span className="text-xs">BASE ONLY (ATM)</span> */}
                  </div>
                </div>
              </>
            )}

            {selectedContract && (
              <>
                <div className="p-3 bg-white bg-opacity-5 rounded-md mt-8">
                  <div className="text-white mb-5 flex-col gap-y-2.5 flex items-center">
                    <span className="select-none">
                      {selectedContract} to wrap
                    </span>
                    <input
                      onChange={(e) => {
                        setNftContractAddress(e.target.value);
                      }}
                      placeholder={`${selectedContract} address`}
                      className="text-white bg-white bg-opacity-10 w-[350px] outline-none py-1.5 px-2 rounded-md"
                    />

                    {/* {selectedContract == "ERC721" && (
                  <>
                    <input
                      placeholder={`Token ids to wrap (eg. 3583,1218)`}
                      className="text-white bg-white bg-opacity-10 w-[350px] outline-none py-1.5 px-2 rounded-md"
                    />
                    <span className="text-xs -mt-1 select-none w-[350px] text-center">
                      Token ids to wrap are NFTs that belong to you that you
                      would like to wrap. You can unwrap them at any time.
                    </span>
                  </>
                )} */}

                    {selectedContract == "ERC1155" && (
                      <>
                        <input
                          onChange={(e) => {
                            setInputtedERC1155TokenId(e.target.value);
                          }}
                          placeholder={`Token id`}
                          className="text-white bg-white bg-opacity-10 w-[350px] outline-none py-1.5 px-2 rounded-md"
                        />
                        {/* <input
                      placeholder={`Quantity`}
                      className="text-white bg-white bg-opacity-10 w-[350px] outline-none py-1.5 px-2 rounded-md"
                    />
                    <span className="text-xs -mt-1 select-none w-[350px] text-center">
                      Quantity of NFTs to deposit that belong to you that you
                      would like to wrap. You can unwrap them at any time.
                    </span> */}
                      </>
                    )}

                    <span className="mt-6 select-none">ERC20 to create</span>
                    <input
                      placeholder="Token name"
                      onChange={(e) => {
                        setTokenName(e.target.value);
                      }}
                      className="text-white bg-white bg-opacity-10 w-[350px] outline-none py-1.5 px-2 rounded-md"
                    />
                    <input
                      onChange={(e) => {
                        setTokenSymbol(e.target.value);
                      }}
                      placeholder="Token symbol"
                      className="text-white bg-white bg-opacity-10 w-[350px] outline-none py-1.5 px-2 rounded-md"
                    />
                    <div className="flex gap-x-2">
                      <input
                        onChange={(e) => {
                          setTokensPerNft(parseInt(e.target.value));
                        }}
                        placeholder="Tokens per NFT"
                        className="text-white bg-white bg-opacity-10 w-[173.5px] outline-none py-1.5 px-2 rounded-md"
                      />
                      <div className="flex">
                        <input
                          onChange={(e) => {
                            setSellFees(parseInt(e.target.value));
                          }}
                          placeholder="Sell fees"
                          className="text-white bg-white bg-opacity-10 w-[142px] outline-none py-1.5 px-2 rounded-l-md"
                        />
                        <div className="select-none text-white pl-1 px-2 py-1 bg-white bg-opacity-10 text-sm flex items-center justify-center font-bold text-opacity-50 rounded-r-md">
                          %
                        </div>
                      </div>
                    </div>
                  </div>

                  <span className="mt-3 text-white text-sm w-[350px] flex text-center">
                    You can wrap & unwrap NFTs in exchange for tokens after the
                    LNFT pair has been created
                  </span>
                  <div className="flex gap-x-3 mt-5">
                    <button
                      onClick={() => {
                        setSelectedContract(undefined);
                      }}
                      className="bg-white select-none hover:bg-opacity-10 transition-all bg-opacity-5 border-2 border-opacity-10 text-white outline-none rounded-md border-white px-3 py-1"
                    >
                      Back
                    </button>
                    <button
                      onClick={createLNFT}
                      className="bg-blue-500 w-full select-none hover:bg-opacity-100 bg-opacity-90 transition-all border-2 border-opacity-10 text-white outline-none rounded-md border-white px-3 py-1"
                    >
                      Create LNFT
                    </button>
                  </div>
                </div>
                <span
                  onClick={() => {
                    window.open("https://www.youtube.com/watch?v=m_Slm6Vij5c");
                  }}
                  className="flex mb-8 gap-x-2 text-white hover:opacity-100 cursor-pointer select-none opacity-60 text-[15px] w-full items-center justify-center mt-2 text-center"
                >
                  If you're stuck, click here watch the tutorial
                </span>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default LiquidifyPage;
