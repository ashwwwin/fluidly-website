"use client";

import {
  ArrowLeftRightIcon,
  ArrowUpRightSquareIcon,
  CircleDollarSign,
  CirclePower,
  Copy,
  Droplet,
  FileWarning,
  ImagesIcon,
  LockKeyholeOpenIcon,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import "../../app/globals.css";
import { useWriteContract, useReadContract, useAccount } from "wagmi";
import { switchChain, watchChainId } from "@wagmi/core";
import { config } from "../../app/providers";
import LiquidERC721v3 from "../../app/abi/LiquidERC721v3.json";
import LiquidERC1155v3 from "../../app/abi/LiquidERC1155v3.json";
import toast from "react-hot-toast";

const ManagePage = () => {
  const {
    data: hash,
    isSuccess,
    isError,
    isPending,
    writeContract,
    error,
  } = useWriteContract();
  const account = useAccount();

  const [explorer, setExplorer] = useState<string>("https://etherscan.io");
  const [ownedPairs, setOwnedPairs] = useState([]);
  const [manage, setManage] = useState<any>();
  const [manageTab, setManageTab] = useState<
    "royalties" | "enablePairERC1155" | "ownership"
  >("royalties");

  const [feeReceiver, setFeeReceiver] = useState<string>("");
  const [currentRoyalty, setCurrentRoyalty] = useState<any>();
  const [newRoyalty, setNewRoyalty] = useState<any>();
  const [newOwner, setNewOwner] = useState<string>("");
  const [pairEnabled, setPairEnabled] = useState<boolean>(false);
  const [initERC721tab, setInitERC721tab] = useState<"setTiers" | "enablePair">(
    "setTiers"
  );
  const [newTiersInputERC721, setNewTiersInputERC721] = useState<
    [number[], number[]]
  >([[], []]);

  const [enablePairERC1155Input_TokenId, setEnablePairERC1155Input_TokenId] =
    useState<string>("");
  const [
    enablePairERC1155Input_TokenAmount,
    setEnablePairERC1155Input_TokenAmount,
  ] = useState<string>("");

  useEffect(() => {
    let currentChain = account.chainId;

    if (!currentChain) return;

    if (currentChain == 1) setExplorer("https://etherscan.io");
    if (currentChain === 8453) setExplorer("https://basescan.org");
  }, [account.chainId]);

  const toastTx = (tx: any) => {
    setTimeout(() => {
      toast.custom(
        <div className="flex flex-col p-3 bg-[#0d0d0d]">
          <span className="text-white">Transaction sent</span>
          <button
            onClick={() => {
              window.open(`${explorer}/tx/${tx}`);
            }}
            className="mt-2 flex select-none w-fit items-center opacity-80 text-white text-sm pl-2 pr-1 py-1 bg-blue-500 rounded-md bg-opacity-80 hover:bg-opacity-100 transition-all"
          >
            Explorer{" "}
            <ArrowUpRightSquareIcon className="ml-0.5 opacity-80 h-[15px]" />
          </button>
        </div>
      );
    }, 2000);
  };

  useEffect(() => {
    if (!error) return;
    let errMsg = error.toString();

    if (errMsg.includes("User rejected the request")) {
      return;
    }

    if (errMsg.includes("Connector not connected")) {
      toast.error("Please connect your wallet");
      return;
    }

    if (
      errMsg.includes(
        "executing this transaction exceeds the balance of the account"
      )
    ) {
      toast.error("Insufficient ETH balance for transaction and gas");
      return;
    }

    if (errMsg.includes("Listing expired")) {
      toast.error("Listing expired for one or more blocks");
      return;
    }

    toast.error(errMsg);
    return;
  }, [isError]);

  const loadOwnedPairs = async () => {
    if (!account.address) return;
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

  useEffect(() => {
    loadOwnedPairs();
  }, []);

  const loadRoyalty = async () => {
    let _royalties = await fetch(
      `/api/checks/royaltyFee?contract=${manage.liquidifyContract}&network=${manage.network}`
    );

    let item = await _royalties.json();

    if (!item?.royalty) return;

    console.log(item.royalty);

    setCurrentRoyalty(item.royalty);
  };

  const updateRoyalty = async () => {
    try {
      const tx = writeContract(
        {
          address: manage.liquidifyContract,
          abi: LiquidERC721v3.abi,
          functionName: "reduceSellFee",
          args: [newRoyalty * 100],
        },
        {
          onSuccess: (tx: any) => {
            toastTx(tx);
            setTimeout(() => {
              loadRoyalty();
            }, 2000);
          },
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  const changeOwner = async () => {
    try {
      const tx = writeContract(
        {
          address: manage.liquidifyContract,
          abi: LiquidERC721v3.abi,
          functionName: "changeOwner",
          args: [newOwner],
        },
        {
          onSuccess: (tx: any) => {
            toastTx(tx);
            setTimeout(() => {
              loadPairOwner();
            }, 2000);
          },
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  const renounceOwnership = async () => {
    try {
      const tx = writeContract(
        {
          address: manage.liquidifyContract,
          abi: LiquidERC721v3.abi,
          functionName: "renounceOwnership",
        },
        {
          onSuccess: (tx: any) => {
            toastTx(tx);
            setTimeout(() => {
              loadPairOwner();
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

  const isPairEnabled = async () => {
    let url = `/api/checks/pairEnabledERC721?contract=${manage.liquidifyContract}&network=${manage.network}`;

    if (manage.type == "ERC1155") {
      url = `/api/checks/pairEnabledERC1155?contract=${manage.liquidifyContract}&network=${manage.network}`;
    }

    let _pairEnabled = await fetch(url);

    let item = await _pairEnabled.json();

    console.log(item);

    if (item?.pairEnabled == false || !item) return setPairEnabled(false);

    setPairEnabled(true);
    loadRoyalty();
    loadFeeReceiver();
    loadPairOwner();
  };

  const enablePairERC721 = async () => {
    await fetch(
      `/api/checks/tiersERC721?contract=${manage.liquidifyContract}&network=${manage.network}`
    );

    try {
      const tx = writeContract(
        {
          address: manage.liquidifyContract,
          abi: LiquidERC721v3.abi,
          functionName: "enablePair",
        },
        {
          onSuccess: (tx: any) => {
            toastTx(tx);
            setTimeout(async () => {
              while (!pairEnabled) {
                console.log("Waiting for pair to enable");
                await isPairEnabled();
                await new Promise((r) => setTimeout(r, 1000));
              }
            }, 2000);
          },
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  const enablePairERC1155 = async () => {
    await fetch(
      `/api/checks/tiersERC1155?contract=${manage.liquidifyContract}&network=${manage.network}`
    );

    try {
      const tx = writeContract(
        {
          address: manage.liquidifyContract,
          abi: LiquidERC1155v3.abi,
          functionName: "enablePair",
          args: [
            enablePairERC1155Input_TokenId,
            enablePairERC1155Input_TokenAmount,
          ],
        },
        {
          onSuccess: (tx: any) => {
            toastTx(tx);
            setTimeout(async () => {
              while (!pairEnabled) {}
            }, 3900);
          },
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  const loadFeeReceiver = async () => {
    let _feeReceiver = await fetch(
      `/api/checks/feeReceiver?contract=${manage.liquidifyContract}&network=${manage.network}`
    );

    let item = await _feeReceiver.json();

    setFeeReceiver(item.feeReceiver);
  };

  const setTiers = async () => {
    try {
      const tx = writeContract(
        {
          address: manage.liquidifyContract,
          abi: LiquidERC721v3.abi,
          functionName: "setTiers",
          args: [newTiersInputERC721[0], newTiersInputERC721[1]],
        },
        {
          onSuccess: (tx: any) => {
            toastTx(tx);
          },
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!manage) return;
    isPairEnabled();
  }, [manage]);

  return (
    <div className="flex w-full flex-col h-full">
      <div className="flex flex-col items-center">
        <span className="flex text-2xl text-center justify-center items-center py-1 mt-1 select-none font-medium text-white">
          <Droplet className="h-[18px] mr-2" />
          Manage pairs
        </span>
        <span className="text-sm text-white text-opacity-50 w-[450px] text-center">
          Manage royalties, royalty receipent, contract ownership and more.
        </span>
      </div>

      <div className="flex flex-col min-h-[calc(100vh-250px)] select-none items-center justify-center gap-y-2.5">
        {!manage && (
          <>
            {ownedPairs.length >= 1 ? (
              <>
                {ownedPairs?.map((pair: any) => (
                  <>
                    <div
                      onClick={() => {
                        setManage(pair);
                      }}
                      className="flex py-2 cursor-pointer px-3.5 transition-all duration-[100ms] items-center bg-white bg-opacity-10 hover:bg-opacity-[15%] min-w-[460px] max-w-[460px] rounded-lg"
                    >
                      <img
                        className="border-[1px] object-cover rounded-md select-none overflow-none border-opacity-10 border-white h-[55px] mr-3 w-[55px] min-w-[55px] min-h-[55px] max-w-[55px] max-h-[55px]"
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
            ) : (
              <>
                <div className="flex flex-col items-center pt-[50px]">
                  <FileWarning className="text-white mb-2 opacity-80" />
                  <span className="text-white opacity-80">
                    No created pairs found
                  </span>
                  <span className="text-white text-sm opacity-50 select-text items-center text-center w-[350px]">
                    Create a pair to get started. If you just created a pair and
                    don't see it here, try refreshing.
                  </span>
                </div>
              </>
            )}
          </>
        )}

        {manage && (
          <>
            <div className="flex flex-col text-white p-3 bg-white bg-opacity-5 rounded-xl shadow-xl h-[430px] max-h-[430px] min-h-[430px]">
              <span className="font-medium text-lg">
                {manage.tokenName} / ${manage.tokenSymbol}
              </span>
              <div className="flex gap-x-2 items-center text-sm justify-start w-full text-left">
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
                    navigator.clipboard.writeText(manage?.liquidifyContract);
                    toast("Copied to clipboard");
                  }}
                >
                  <Copy className="h-4 opacity-70 hover:opacity-100 transition-all cursor-pointer" />
                </button>
              </div>
              {!pairEnabled &&
                !manage.pairEnabled &&
                manage.type != "ERC1155" && (
                  <>
                    {initERC721tab == "setTiers" && (
                      <div className="flex flex-col h-full items-center justify-center ">
                        <span className="text-xl font-semibold mb-0">
                          Set Rarity Tiers
                        </span>
                        <span className="text-sm opacity-70 mb-1.5 -mt-0.5 text-center select-text text-wrap flex w-[425px]">
                          You can repeat this process multiple times but, you
                          cannot change an NFT's token swap tier once it has
                          been set. Any token id's that are not set will default
                          to the base tier.
                        </span>
                        <textarea
                          onChange={(e) => {
                            const inputLines = e.target.value.split("\n");
                            console.log(inputLines);
                            if (inputLines[0] === "") {
                              setNewTiersInputERC721([[], []]);
                              return;
                            }

                            const tokenIds = inputLines.map((line) =>
                              parseInt(line.split(" ")[0])
                            );

                            const tokenAmounts = inputLines.map((line) =>
                              parseInt(line.split(" ")[1])
                            );

                            if (
                              tokenIds.some((id) => isNaN(id)) ||
                              tokenAmounts.some((amount) => isNaN(amount)) ||
                              tokenIds.length !== tokenAmounts.length
                            ) {
                              return;
                            }

                            setNewTiersInputERC721([tokenIds, tokenAmounts]);

                            console.log(newTiersInputERC721);
                          }}
                          className="w-full text-sm min-h-[115px] max-h-[115px] mt-1 outline-none bg-white bg-opacity-10 px-2 py-1.5 rounded-md"
                          placeholder="Token Id      Token amount"
                        />
                        <div className="flex justify-between w-full items-center">
                          <span className="pl-2 font-mono opacity-50 text-sm">
                            {newTiersInputERC721[0].length}
                          </span>
                          <div className="flex gap-x-2">
                            <button
                              onClick={() => {
                                return setTiers();
                              }}
                              className="mt-3 bg-green-500 opacity-90 hover:opacity-100 cursor-pointer select none px-3 py-1.5 rounded-md transition-all"
                            >
                              Confirm
                            </button>
                            <button
                              onClick={() => {
                                return setInitERC721tab("enablePair");
                              }}
                              className="mt-3 bg-blue-500 opacity-90 hover:opacity-100 cursor-pointer select none px-3 py-1.5 rounded-md transition-all"
                            >
                              Continue
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                    {initERC721tab == "enablePair" && (
                      <div className="flex flex-col pb-3 h-full items-center justify-center w-[425px]">
                        <span className="text-xl font-semibold mb-0">
                          You're almost done
                        </span>
                        <span className="text-sm opacity-70 mb-1.5 -mt-0.5 select-text text-center text-wrap flex w-[350px]">
                          Enable trading for your pair. This will be permanent,
                          you will not be able to edit nft rarities anymore.
                        </span>
                        <div className="flex flex-col justify-center items-end">
                          <div className="flex gap-x-2">
                            <button
                              onClick={() => {
                                setInitERC721tab("setTiers");
                              }}
                              className="mt-3 bg-white bg-opacity-10 border-2 border-opacity-[3.5%] border-white hover:bg-opacity-[12.5%] cursor-pointer select none px-3 py-1 rounded-md transition-all"
                            >
                              Back
                            </button>
                            <button
                              onClick={enablePairERC721}
                              className="mt-3 bg-green-600 opacity-90 hover:opacity-100 cursor-pointer select none px-5 py-1 rounded-md transition-all"
                            >
                              Enable pair
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}
              {(pairEnabled ||
                manage.pairEnabled ||
                manage.type == "ERC1155") && (
                <>
                  <div className="flex w-full bg-white text-[15px] bg-opacity-5 p-1 gap-x-1 rounded-md mt-3.5 min-w-[500px] max-w-[500px]">
                    {manage.type == "ERC1155" && (
                      <>
                        <div
                          className={`flex bg-white items-center w-full p-1 pl-3 pr-5 text-white ${
                            manageTab === "enablePairERC1155"
                              ? "text-opacity-100 bg-opacity-10 shadow-xl"
                              : "text-opacity-70 bg-opacity-5"
                          } rounded-[4.5px] hover:bg-opacity-10 transition-all cursor-pointer whitespace-nowrap`}
                          onClick={() => setManageTab("enablePairERC1155")}
                        >
                          {/* <Repeat className="h-[15px] mr-1" /> */}
                          <ArrowLeftRightIcon className="h-[15px] mr-1" />
                          Enable pair
                        </div>
                      </>
                    )}
                    <div
                      className={`flex bg-white items-center w-full p-1 px-3 text-white ${
                        manageTab === "royalties"
                          ? "text-opacity-100 bg-opacity-10 shadow-xl"
                          : "text-opacity-70 bg-opacity-5"
                      } rounded-[4.5px] hover:bg-opacity-10 transition-all cursor-pointer`}
                      onClick={() => {
                        setManageTab("royalties");
                      }}
                    >
                      <CircleDollarSign className="h-[13.5px] mr-1" />
                      Royalties
                    </div>
                    <div
                      className={`flex bg-white items-center w-full p-1 px-3 text-white ${
                        manageTab === "ownership"
                          ? "text-opacity-100 bg-opacity-10 shadow-xl"
                          : "text-opacity-70 bg-opacity-5"
                      } rounded-[4.5px] hover:bg-opacity-10 transition-all cursor-pointer`}
                      onClick={() => {
                        setManageTab("ownership");
                      }}
                    >
                      <LockKeyholeOpenIcon className="h-[13.5px] mr-1" />
                      Ownership
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
                    {manageTab == "royalties" && (
                      <>
                        <div className="flex gap-x-3">
                          <div className="flex flex-col pb-3">
                            <span className="text-xl font-semibold mb-0 text-[17px]">
                              Reduce royalties
                            </span>
                            <span className="text-sm opacity-70 mb-2.5 -mt-0.5 text-wrap flex w-[330px]">
                              These will automatically get sent to your wallet
                              every few hours. They are currently set at{" "}
                              {parseInt(`${currentRoyalty?.toString() || 0}`) /
                                100 || "0"}
                              %
                            </span>
                            <div className="flex gap-x-2 h-fit">
                              <div className="flex border-[1.5px] rounded-[7px] border-white border-opacity-[8%]">
                                <input
                                  placeholder="New royalty rate"
                                  onChange={(e) => {
                                    setNewRoyalty(e.target.value);
                                  }}
                                  className="text-white bg-white bg-opacity-10 w-[200px] outline-none py-1.5 px-2 rounded-l-md"
                                />
                                <div className="rounded-r-md flex h-full px-2 bg-white bg-opacity-10 w-[30px] items-center">
                                  %
                                </div>
                              </div>
                              <button
                                onClick={updateRoyalty}
                                className="bg-blue-500 opacity-90 hover:opacity-100 cursor-pointer select-none px-3 py-1 rounded-md text-white text-opacity-90 transition-all"
                              >
                                Confirm
                              </button>
                            </div>

                            <span className="text-sm text-white opacity-50 cursor-pointer mt-3 transition-all w-full hover:opacity-80">
                              Royalties go to {feeReceiver.slice(0, 10)}...
                              {feeReceiver.slice(-8)}
                            </span>
                          </div>
                        </div>
                      </>
                    )}

                    {manageTab == "ownership" && (
                      <>
                        <div className="flex gap-x-3">
                          <div className="flex flex-col pb-3">
                            <span className="text-xl font-semibold mb-0 text-[17px]">
                              Transfer ownership
                            </span>
                            <span className="text-sm opacity-70 mb-2.5 -mt-0.5 text-wrap flex w-[350px]">
                              Make sure you enter the correct address, it will
                              have full access to manage. This is permanent.
                            </span>
                            <div className="flex gap-x-2 h-fit w-full">
                              <div className="flex border-[1.5px] rounded-[7px] w-[350px] border-white border-opacity-[8%]">
                                <input
                                  placeholder="New owner"
                                  onChange={(e) => {
                                    setNewOwner(e.target.value);
                                  }}
                                  className="text-white bg-white bg-opacity-10 w-full outline-none py-1.5 px-2 rounded-md"
                                />
                              </div>
                              <button
                                onClick={changeOwner}
                                className="bg-blue-500 opacity-90 hover:opacity-100 cursor-pointer select-none px-3 py-1 rounded-md text-white text-opacity-90 transition-all"
                              >
                                Confirm
                              </button>
                            </div>
                          </div>
                        </div>
                      </>
                    )}

                    {manageTab == "enablePairERC1155" && (
                      <>
                        <div className="flex gap-x-3">
                          <div className="flex flex-col pb-3">
                            <span className="text-xl font-semibold mb-0 text-[17px]">
                              Enable pair
                            </span>
                            <span className="text-sm opacity-70 mb-2.5 -mt-0.5 text-wrap flex w-[350px]">
                              Make sure you enter the correct address, it will
                              have full access to manage. This is permanent.
                            </span>
                            <div className="flex gap-x-2 flex-col gap-y-2 h-fit w-full">
                              <div className="flex border-[1.5px] rounded-[7px] w-[350px] border-white border-opacity-[8%]">
                                <input
                                  placeholder="Token id"
                                  onChange={(e) => {
                                    setEnablePairERC1155Input_TokenId(
                                      e.target.value
                                    );
                                  }}
                                  className="text-white bg-white bg-opacity-10 w-full outline-none py-1.5 px-2 rounded-md"
                                />
                              </div>
                              <div className="flex border-[1.5px] rounded-[7px] w-[350px] border-white border-opacity-[8%]">
                                <input
                                  placeholder="Token amount"
                                  onChange={(e) => {
                                    setEnablePairERC1155Input_TokenAmount(
                                      e.target.value
                                    );
                                  }}
                                  className="text-white bg-white bg-opacity-10 w-full outline-none py-1.5 px-2 rounded-md"
                                />
                              </div>
                              <button
                                onClick={enablePairERC1155}
                                className="bg-blue-500 opacity-90 hover:opacity-100 cursor-pointer select-none px-3 py-1.5 rounded-md text-white text-opacity-90 transition-all"
                              >
                                Confirm
                              </button>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ManagePage;
