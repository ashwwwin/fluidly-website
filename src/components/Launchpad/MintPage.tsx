"use client";

import {
  Crown,
  Droplet,
  HelpCircle,
  ImagePlus,
  Info,
  Leaf,
  MessageSquareTextIcon,
  Minus,
  Paperclip,
  PieChart,
  Plus,
  Send,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import "../../app/globals.css";
import "./scrollbar.css";

const MintPage: React.FC<{ selectedCollection: any }> = ({
  selectedCollection,
}) => {
  const [userMessage, setUserMessage] = useState<string>("");
  const [messages, setMessages] = useState<{ user: string; content: string }[]>(
    []
  );
  const [mintQty, setMintQty] = useState<number>(1);
  const [socket, setSocket] = useState<any>();

  const sendMessage = async () => {
    if (!userMessage) return;

    if (socket) {
      socket.send(
        JSON.stringify({
          user: "Liquidify Admin",
          content: userMessage,
          room: selectedCollection.liquidifyContract,
        })
      );
    }

    setMessages([
      ...messages,
      { user: "Liquidify Admin", content: userMessage },
    ]);
    setUserMessage("");
  };

  useEffect(() => {
    const _socket = new WebSocket("ws://localhost:9339/chat");
    setSocket(_socket);
  }, []);

  useEffect(() => {
    if (!socket) return;
  }, [socket]);

  return (
    <>
      <div className="flex w-full h-full">
        <div className="flex w-full flex-col pt-[75px] w-[calc(100vw-350px)] max-w-[calc(100vw-350px)] pl-6">
          <span className="flex text-2xl items-center justify-start pt-1 mt-1 select-none font-medium text-white">
            <ImagePlus className="h-[18px] mr-2" />
            Mint {selectedCollection.nftName}
          </span>
          <div className="flex gap-x-3 text-sm text-white text-opacity-70 mt-1">
            <a
              href="https://telegram.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-md py-1 flex select-none cursor-pointer opacity-80 hover:opacity-100 transition-all duration-[150ms] items-center px-3 bg-white bg-opacity-10 rounded-md"
            >
              <Send className="h-[13.5px] -ml-0.5" />
              Telegram
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-md py-1 flex select-none cursor-pointer opacity-80 hover:opacity-100 transition-all duration-[150ms] items-center px-3 bg-white bg-opacity-10 rounded-md"
            >
              <img src="/x.png" className="h-[13.5px] opacity-70 mr-1.5" />
              Twitter
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-md py-1 flex select-none cursor-pointer opacity-80 hover:opacity-100 transition-all duration-[150ms] items-center px-3 bg-white bg-opacity-10 rounded-md"
            >
              <img
                src="/discord.webp"
                className="h-[13.5px] opacity-70 mr-1.5"
              />
              Discord
            </a>
            <a
              href="https://example.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-md py-1 select-none cursor-pointer opacity-80 hover:opacity-100 transition-all duration-[150ms] items-center px-3 flex bg-white bg-opacity-10 rounded-md"
            >
              <Paperclip className="h-[15px] -ml-0.5" />
              Website
            </a>
            <a
              href="https://etherscan.io"
              target="_blank"
              rel="noopener noreferrer"
              className="text-md py-1 select-none cursor-pointer opacity-80 hover:opacity-100 transition-all duration-[150ms] items-center px-3 flex bg-white bg-opacity-10 rounded-md"
            >
              <img
                src="/etherscan.svg"
                className="h-[15px] opacity-70 mr-1.5"
              />
              Etherscan
            </a>
          </div>

          <div className="mt-3 p-3 border-[2.5px] border-white w-fit flex rounded-lg border-opacity-10 bg-white bg-opacity-5">
            <img
              className="transition-all select-none duration-[200ms] opacity-80 xs:mr-3 h-[209px] w-[209px] max-w-[209px] min-w-[209px] min-h-[209px] max-h-[209px] bg-white bg-opacity-10 object-cover rounded-md outline-none overflow-hidden pointer-events-none"
              src={selectedCollection.nftProjectImage || "/temp.png"}
            />
            <div className="flex">
              <div className="flex flex-col px-5 gap-y-2">
                <div className="flex text-white flex-col">
                  <span className="text-xs -mb-1 opacity-60 select-none">
                    Minted
                  </span>{" "}
                  <span>6,950/12,000</span>
                </div>

                <div className="flex text-white flex-col">
                  <span className="text-xs -mb-1 opacity-60 select-none">
                    Launch MC
                  </span>{" "}
                  <span>$130,000</span>
                </div>
                <div className="flex text-white flex-col mt-0.5">
                  <span className="text-xs -mb-1 opacity-60 select-none">
                    Holders
                  </span>{" "}
                  <span>3,100</span>
                </div>
                <div className="flex text-white flex-col mt-0.5">
                  <span className="text-xs -mb-1 opacity-60 select-none">
                    LP Supply
                  </span>{" "}
                  <span>20%</span>
                </div>
                <div className="flex flex-grow" />
              </div>
              <div className="flex flex-col pl-5 pr-1.5 gap-y-2">
                <div className="flex text-white flex-col">
                  <span className="text-xs -mb-1 opacity-60 select-none">
                    Price
                  </span>{" "}
                  <span>{selectedCollection.mintCost} ETH</span>
                </div>

                <div className="flex text-white flex-col -mt-[2px]">
                  <span className="text-xs mb-[2px] opacity-60 select-none">
                    Quantity
                  </span>{" "}
                  <div className="flex w-full items-center">
                    <div
                      onClick={() => {
                        if (mintQty == 1) {
                          return;
                        }

                        setMintQty(mintQty - 1);
                      }}
                      className="px-1.5 text-white cursor-pointer bg-white bg-opacity-[15%] hover:bg-opacity-[17.5%] py-1 rounded-l-md text-opacity-70 hover:text-opacity-90 transition-all duration-[100ms]"
                    >
                      <Minus className="h-[15px] my-1" />
                    </div>

                    <input
                      value={mintQty}
                      onChange={(e) => {
                        try {
                          let number = parseInt(e.target.value);
                          if (isNaN(number)) {
                            setMintQty(1);
                          } else {
                            setMintQty(number);
                          }
                        } catch (err) {
                          setMintQty(1);
                        }
                      }}
                      className="outline-none text-center w-[65px] px-3 text-sm py-1.5 bg-white bg-opacity-10 text-white"
                    />
                    <div
                      onClick={() => {
                        setMintQty(mintQty + 1);
                      }}
                      className="px-1.5 text-white cursor-pointer bg-white bg-opacity-[15%] hover:bg-opacity-[17.5%] py-1 rounded-r-md text-opacity-70 hover:text-opacity-90 transition-all duration-[100ms]"
                    >
                      <Plus className="h-[15px] my-1" />
                    </div>
                  </div>
                </div>
                <div className="flex text-white flex-col mt-0.5">
                  <span className="text-xs -mb-1 opacity-60 select-none">
                    Total cost
                  </span>{" "}
                  <span>{selectedCollection.mintCost * mintQty} ETH</span>
                </div>
                <div className="flex flex-grow" />
                <button className="py-1 px-5 select-none transition-all duration-[150ms] text-white rounded-md bg-blue-500 opacity-90 hover:opacity-100">
                  Mint
                </button>
              </div>
            </div>
          </div>
          <div className="mt-3 p-3 border-[2.5px] w-[calc(100%-20px)] h-full mb-[20px] border-white flex flex-col rounded-lg border-opacity-10 bg-white bg-opacity-5">
            <span className="flex font-medium items-center text-lg text-white select-none">
              <Info className="h-[16.5px] mr-1" />
              About {selectedCollection.nftName}
            </span>
            <span className="w-full text-white opacity-70">
              {selectedCollection.nftDescription}
            </span>
          </div>
        </div>
        <div className="right-0 w-[350px] border-l-2 fixed border-white border-opacity-5 flex flex-col bg-opacity-5 p-3 h-[calc(100%-57.5px)] mt-[57.5px] bg-white">
          <span className="text-white opacity-80 font-medium select-none border-b-2 pb-2 border-white border-opacity-10 flex items-center pl-1 pt-1 flex">
            <MessageSquareTextIcon className="h-[14px] mr-0.5" /> Chat
          </span>

          <div className="flex flex-grow flex flex-col my-3 overflow-x-hidden overflow-y-scroll">
            {messages.map((message) => {
              return (
                <div
                  className="text-white flex flex-col mb-1.5"
                  key={Math.random().toString(36).substr(2, 9)}
                >
                  <span className="text-[12px] opacity-60 font-medium select-none">
                    {message.user}
                  </span>
                  <span className="-mt-[3.9px] opacity-80 text-sm">
                    {message.content}
                  </span>
                </div>
              ); // Render the message
            })}
          </div>
          <input
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                // Assuming there's a function to handle the message sending
                // This is a placeholder for the actual function call
                sendMessage();
              }
            }}
            onChange={(e) => {
              setUserMessage(e.target.value);
            }}
            value={userMessage}
            className="bg-white bg-opacity-10 outline-none px-2.5 text-white text-sm rounded-md py-1.5"
            placeholder="Press enter to send"
          ></input>
        </div>
      </div>
    </>
  );
};

export default MintPage;
