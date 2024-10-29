"use client";

import {
  BookCheckIcon,
  Copy,
  Droplet,
  Globe,
  HelpCircle,
  PencilRuler,
  Power,
  StarsIcon,
  UserCircle2,
  Wallet,
  X,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import {
  useDisconnect,
  useConnect,
  useAccount,
  useChains,
  useSwitchChain,
} from "wagmi";
import { injected } from "wagmi/connectors";
import {
  ConnectButton,
  useConnectModal,
  useAccountModal,
  useChainModal,
} from "@rainbow-me/rainbowkit";
import { usePathname } from "next/navigation";

import { arbitrum, base, blast, optimism, polygon } from "wagmi/chains";
import { useEffect, useState } from "react";

const Navbar = () => {
  const account = useAccount();
  const { openConnectModal } = useConnectModal();
  const { openAccountModal } = useAccountModal();
  const { openChainModal } = useChainModal();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();
  const { switchChain } = useSwitchChain();
  const pathname = usePathname();
  const [page, setPage] = useState<string>("collection");

  useEffect(() => {
    let _page = pathname.replace("/", "");
    setPage(_page);
  }, [pathname]);

  return (
    <>
      <div className="w-full z-[99999] bg-black shadow-2xl xs:items-center xs:justify-center sm:items-start border-b-[1.75px] border-white border-opacity-10 fixed items-center px-3 py-3 flex">
        <div className="xs:w-full xs:items-center xs:justify-center ">
          <div className="flex cursor-default items-center justify-start min-w-[300px] max-h-[25px] ml-[12px]">
            <svg
              width="128"
              height="25"
              viewBox="0 0 128 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="cursor-pointer"
              onClick={() => {
                window.location.href = "/";
              }}
            >
              <mask
                id="mask0_7259_103"
                style={{ maskType: "alpha" }}
                maskUnits="userSpaceOnUse"
                x="28"
                y="0"
                width="100"
                height="25"
              >
                <rect x="28" width="100" height="24.1935" fill="#D9D9D9" />
              </mask>
              <g mask="url(#mask0_7259_103)">
                <path
                  d="M40.3407 14.5368H33.5514V22H30.3565V3.75389H41.6386V6.69923H33.5514V11.6664H40.3407V14.5368ZM47.7136 3.75389V19.0547H55.3515V22H44.5186V3.75389H47.7136ZM57.0691 15.3356V3.75389H60.264V15.1359C60.264 17.7567 61.6868 19.2044 64.2826 19.2044C66.8785 19.2044 68.3262 17.7318 68.3262 15.1359V3.75389H71.5212V15.3356C71.5212 19.6038 68.7256 22.2995 64.2826 22.2995C59.8646 22.2995 57.0691 19.6288 57.0691 15.3356ZM78.646 3.75389V22H75.4511V3.75389H78.646ZM89.2552 22H82.6906V3.75389H89.0805C94.472 3.75389 98.1911 7.473 98.1911 12.9144C98.1911 18.2809 94.5468 22 89.2552 22ZM88.781 6.69923H85.8856V19.0547H88.9557C92.5999 19.0547 94.8214 16.7084 94.8214 12.9144C94.8214 9.04551 92.55 6.69923 88.781 6.69923ZM104.362 3.75389V19.0547H112V22H101.167V3.75389H104.362ZM117.09 14.8114L110.925 3.75389H114.494L118.088 10.3934C118.363 10.8926 118.538 11.292 118.737 11.7412C118.962 11.292 119.062 10.9924 119.386 10.3934L122.956 3.75389H126.425L120.285 14.8114V22H117.09V14.8114Z"
                  fill="white"
                />
              </g>
              <path
                d="M10.7393 3.16219C10.505 3.05531 10.2504 3 9.99289 3C9.73535 3 9.48082 3.05531 9.24651 3.16219L1.53987 6.66929C1.38029 6.73965 1.24462 6.8549 1.14938 7.00099C1.05413 7.14708 1.00342 7.31772 1.00342 7.49211C1.00342 7.66651 1.05413 7.83715 1.14938 7.98324C1.24462 8.12933 1.38029 8.24457 1.53987 8.31493L9.2555 11.831C9.48981 11.9379 9.74434 11.9932 10.0019 11.9932C10.2594 11.9932 10.514 11.9379 10.7483 11.831L18.4639 8.32393C18.6235 8.25356 18.7591 8.13832 18.8544 7.99223C18.9496 7.84614 19.0003 7.6755 19.0003 7.50111C19.0003 7.32671 18.9496 7.15607 18.8544 7.00998C18.7591 6.86389 18.6235 6.74865 18.4639 6.67828L10.7393 3.16219Z"
                stroke="white"
                stroke-width="1.79852"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M18.9852 17.0742L10.739 20.8151C10.5046 20.922 10.2501 20.9773 9.99258 20.9773C9.73504 20.9773 9.48051 20.922 9.24619 20.8151L1 17.0742"
                stroke="white"
                stroke-width="1.79852"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M18.9852 12.5781L10.739 16.319C10.5046 16.4259 10.2501 16.4812 9.99258 16.4812C9.73504 16.4812 9.48051 16.4259 9.24619 16.319L1 12.5781"
                stroke="white"
                stroke-width="1.79852"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>

            {/* <svg
              className="cursor-pointer"
              onClick={() => {
                window.location.href = "/";
              }}
              width="126"
              height="25"
              viewBox="0 0 126 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 13.8C1.42435 13.8 1.83131 13.6314 2.13137 13.3314C2.43143 13.0313 2.6 12.6243 2.6 12.2V9C2.6 8.57565 2.76857 8.16869 3.06863 7.86863C3.36869 7.56857 3.77565 7.4 4.2 7.4C4.62435 7.4 5.03131 7.56857 5.33137 7.86863C5.63143 8.16869 5.8 8.57565 5.8 9V19.4C5.8 19.8243 5.96857 20.2313 6.26863 20.5314C6.56869 20.8314 6.97565 21 7.4 21C7.82435 21 8.23131 20.8314 8.53137 20.5314C8.83143 20.2313 9 19.8243 9 19.4V6.6C9 6.17565 9.16857 5.76869 9.46863 5.46863C9.76869 5.16857 10.1757 5 10.6 5C11.0243 5 11.4313 5.16857 11.7314 5.46863C12.0314 5.76869 12.2 6.17565 12.2 6.6V17C12.2 17.4243 12.3686 17.8313 12.6686 18.1314C12.9687 18.4314 13.3757 18.6 13.8 18.6C14.2243 18.6 14.6313 18.4314 14.9314 18.1314C15.2314 17.8313 15.4 17.4243 15.4 17V13.8C15.4 13.3757 15.5686 12.9687 15.8686 12.6686C16.1687 12.3686 16.5757 12.2 17 12.2"
                stroke="white"
                stroke-width="1.6"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <mask
                id="mask0_7259_102"
                style={{ maskType: "alpha" }}
                maskUnits="userSpaceOnUse"
                x="26"
                y="0"
                width="100"
                height="25"
              >
                <rect x="26" width="100" height="24.1935" fill="#D9D9D9" />
              </mask>
              <g mask="url(#mask0_7259_102)">
                <path
                  d="M38.3407 14.5368H31.5514V22H28.3565V3.75389H39.6386V6.69923H31.5514V11.6664H38.3407V14.5368ZM45.7136 3.75389V19.0547H53.3515V22H42.5186V3.75389H45.7136ZM55.0691 15.3356V3.75389H58.264V15.1359C58.264 17.7567 59.6868 19.2044 62.2826 19.2044C64.8785 19.2044 66.3262 17.7318 66.3262 15.1359V3.75389H69.5212V15.3356C69.5212 19.6038 66.7256 22.2995 62.2826 22.2995C57.8646 22.2995 55.0691 19.6288 55.0691 15.3356ZM76.646 3.75389V22H73.4511V3.75389H76.646ZM87.2552 22H80.6906V3.75389H87.0805C92.472 3.75389 96.1911 7.473 96.1911 12.9144C96.1911 18.2809 92.5468 22 87.2552 22ZM86.781 6.69923H83.8856V19.0547H86.9557C90.5999 19.0547 92.8214 16.7084 92.8214 12.9144C92.8214 9.04551 90.55 6.69923 86.781 6.69923ZM102.362 3.75389V19.0547H110V22H99.1672V3.75389H102.362ZM115.09 14.8114L108.925 3.75389H112.494L116.088 10.3934C116.363 10.8926 116.538 11.292 116.737 11.7412C116.962 11.292 117.062 10.9924 117.386 10.3934L120.956 3.75389H124.425L118.285 14.8114V22H115.09V14.8114Z"
                  fill="white"
                />
              </g>
            </svg> */}
          </div>
        </div>
        <div className="flex w-full mr-1.5 font-medium pl-1.5 gap-x-2 xs:hidden -ml-[138px]">
          <div className="flex gap-x-2.5">
            <a
              href="/explore"
              className={
                "outline-none flex items-center bg-white text-white duration-[150ms] py-1 bg-opacity-0 transition-all px-3.5 rounded-md select-none " +
                (page == "explore"
                  ? " text-opacity-100 bg-opacity-10"
                  : " text-opacity-50 hover:text-opacity-100 hover:bg-opacity-[7.5%]")
              }
            >
              Explore
            </a>

            <div className="flex flex-col group relative">
              <button
                className={
                  "outline-none flex z-[10000] items-center bg-white text-white duration-[150ms] py-1 bg-opacity-0 transition-all px-3.5 rounded-md select-none " +
                  (page == "manage" ||
                  page == "create" ||
                  page == "launchpad" ||
                  page == "rarity"
                    ? " text-opacity-100 bg-opacity-10"
                    : " text-opacity-50 group-hover:text-opacity-100 group-hover:bg-opacity-[7.5%]")
                }
              >
                Creators
              </button>

              <div className="absolute pt-[38px] w-full hidden group-hover:block w-[150px] ">
                <div className="bg-[#0D0D0D] rounded-md text-sm p-1 select-none w-[150px] flex border-[1px] border-white border-opacity-5 flex-col gap-y-1 text-white">
                  <a
                    href="/manage"
                    className={
                      "outline-none flex items-center bg-white text-white rounded-[4.5px] py-1 bg-opacity-0 transition-all duration-[100ms] pr-3 pl-2 rounded-[4.3px] select-none " +
                      (page == "manage"
                        ? " text-opacity-100 bg-opacity-10"
                        : " text-opacity-50 hover:text-opacity-100 hover:bg-opacity-[7.5%]")
                    }
                  >
                    Manage
                  </a>
                  {/* <a
                    href="/launchpad"
                    className={
                      "outline-none flex items-center bg-white text-white rounded-[4.5px] py-1 bg-opacity-0 transition-all duration-[100ms] pr-3 pl-2 rounded-[4.3px] select-none " +
                      (page == "launchpad"
                        ? " text-opacity-100 bg-opacity-10"
                        : " text-opacity-50 hover:text-opacity-100 hover:bg-opacity-[7.5%]")
                    }
                  >
                    Launchpad
                  </a> */}
                  {/* <a
                    href="/rarity"
                    className={
                      "outline-none flex items-center bg-white text-white rounded-[4.5px] py-1 bg-opacity-0 transition-all duration-[100ms] pr-3 pl-2 rounded-[4.3px] select-none " +
                      (page == "rarity"
                        ? " text-opacity-100 bg-opacity-10"
                        : " text-opacity-50 hover:text-opacity-100 hover:bg-opacity-[7.5%]")
                    }
                  >
                    Rarity studio
                  </a> */}
                  <a
                    href="/create"
                    className={
                      "outline-none flex items-center bg-white text-white rounded-[4.5px] py-1 bg-opacity-0 transition-all duration-[100ms] pr-3 pl-2 rounded-[4.3px] select-none " +
                      (page == "create"
                        ? " text-opacity-100 bg-opacity-10"
                        : " text-opacity-50 hover:text-opacity-100 hover:bg-opacity-[7.5%]")
                    }
                  >
                    Create token
                  </a>
                </div>
              </div>
            </div>
            <a
              href="/faq"
              className={
                "outline-none flex items-center z-[1000] bg-white text-white duration-[150ms] rounded-md py-1 bg-opacity-0 transition-all px-3.5 select-none " +
                (page == "faq"
                  ? " text-opacity-100 bg-opacity-10"
                  : " text-opacity-50 hover:text-opacity-100 hover:bg-opacity-[7.5%]")
              }
            >
              Docs
            </a>
          </div>
        </div>
        <div className="flex flex-grow w-full xs:hidden" />

        <div className="flex gap-x-1.5 justify-end w-[330px] xs:hidden">
          <button
            className="group flex z-[1000] w-fit items-center py-1 px-3.5 rounded-md bg-white bg-opacity-0 hover:bg-opacity-[7.5%] text-[#808080] hover:text-[#ffffff] transition-all duration-[150ms]"
            onClick={openChainModal}
            type="button"
          >
            {account?.address && (
              <>
                <span className="flex group-hover:opacity-100 opacity-80 select-none duration-[150ms] mr-1.5">
                  {account.chainId == 8453 ? (
                    <>
                      <div className="border-[1px] border-white border-opacity-50 transition-all min-h-[15px] min-w-[15px] max-w-h-[15px] rounded-full overflow-hidden max-w-[15px] ">
                        <img src="/networks/base.svg" />
                      </div>
                    </>
                  ) : account.chainId == 81457 ? (
                    <>
                      <div className="border-[1px] border-white border-opacity-50 transition-all min-h-[15px] min-w-[15px] max-w-h-[15px] rounded-full overflow-hidden max-w-[15px] ">
                        <img src="/networks/blast.png" />
                      </div>
                    </>
                  ) : account.chainId == 137 ? (
                    <>
                      <div className="border-[1px] border-white border-opacity-50 transition-all min-h-[15px] min-w-[15px] max-w-h-[15px] rounded-full overflow-hidden max-w-[15px] ">
                        <img src="/networks/polygon.png" />
                      </div>
                    </>
                  ) : account.chainId == 10 ? (
                    <>
                      <div className="border-[1px] border-white border-opacity-50 transition-all min-h-[15px] min-w-[15px] max-w-h-[15px] rounded-full overflow-hidden max-w-[15px] ">
                        <img src="/networks/optimism.png" />
                      </div>
                    </>
                  ) : account.chainId == 42161 ? (
                    <>
                      <div className="border-[1px] border-white border-opacity-50 transition-all min-h-[15px] min-w-[15px] max-w-h-[15px] rounded-full overflow-hidden max-w-[15px] ">
                        <img src="/networks/arbitrum.png" />
                      </div>
                    </>
                  ) : (
                    <div className="items-center select-none flex text-red-500 -mr-2 -ml-1.5">
                      <Globe className="h-[15px]" /> Network
                    </div>
                  )}
                </span>
                <span className="select-none">{account?.chain?.name}</span>
              </>
            )}

            {/* {getChains} */}

            {/* <Image
              alt={chain.name ?? "Chain icon"}
              src={chain.iconUrl}
              style={{ width: 12, height: 12 }}
            /> */}
          </button>
          <div className="flex flex-col group items-end">
            <button
              onClick={() => {
                if (!account.isConnected && openConnectModal)
                  return openConnectModal();
              }}
              className="flex items-center xs:hidden z-[10000] rounded-md mr-2 py-1 pr-3.5 pl-2.5 bg-opacity-0 transition-all bg-white group-hover:text-[#ffffff] select-none text-[#808080] group-hover:bg-opacity-[7.5%]"
              type="button"
            >
              <Wallet className="h-[15px] mr-1" />
              Wallet
            </button>
            {account.isConnected && (
              <>
                <div className="absolute pt-[40px] group-hover:block hidden right-[21px]">
                  <div className="bg-[#0D0D0D] rounded-md text-sm p-1 flex-col text-white border-[1px] border-white border-opacity-5 ">
                    <ConnectButton.Custom>
                      {({
                        account,
                        chain,
                        openAccountModal,
                        openChainModal,
                        openConnectModal,
                        authenticationStatus,
                        mounted,
                      }) => {
                        // Note: If your app doesn't use authentication, you
                        // can remove all 'authenticationStatus' checks
                        const ready =
                          mounted && authenticationStatus !== "loading";
                        const connected =
                          ready &&
                          account &&
                          chain &&
                          (!authenticationStatus ||
                            authenticationStatus === "authenticated");

                        return (
                          <div>
                            {(() => {
                              if (!connected) {
                                return;
                              }

                              if (chain.unsupported) {
                                return;
                                // <button
                                //   className="flex items-center py-1 pr-2 pl-1.5 rounded-[3.8px] bg-white bg-opacity-0 text-white hover:bg-opacity-[7.5%] text-opacity-50 hover:text-opacity-100 transition-all duration-[150ms]"
                                //   onClick={openChainModal}
                                //   type="button"
                                // >
                                //   <Globe className="h-[14px] mr-1" />
                                //   Change network
                                // </button>
                              }

                              return (
                                <>
                                  <div className="flex items-center text-center border-b-[1px] border-white border-opacity-[15%] justify-center w-full py-1 text-sm opacity-70 cursor-default select-none px-2 font-medium">
                                    {account.address.substring(0, 6)}...
                                    {account.address.substring(36, 42)}
                                  </div>
                                  <div className="gap-y-1 flex flex flex-col">
                                    <button
                                      className="flex items-center py-1 pr-2 pl-1.5 mt-1.5 rounded-[3.8px] bg-white bg-opacity-0 text-white hover:bg-opacity-[7.5%] text-opacity-50 hover:text-opacity-100 transition-all duration-[150ms]"
                                      onClick={() => {
                                        toast.success("Address copied");
                                        window.navigator.clipboard.writeText(
                                          account.address
                                        );
                                      }}
                                      type="button"
                                    >
                                      <Copy className="h-[14px] mr-1" />
                                      Copy address
                                    </button>
                                    <button
                                      className="flex items-center py-1 pr-2 pl-1.5 rounded-[3.8px] w-full bg-white bg-opacity-0 text-white hover:bg-opacity-[7.5%] text-opacity-50 hover:text-opacity-100 transition-all duration-[150ms]"
                                      onClick={() => {
                                        disconnect();
                                      }}
                                      type="button"
                                    >
                                      <Power className="h-[14px] mr-1" />
                                      Disconnect
                                    </button>
                                  </div>
                                </>
                              );
                            })()}
                          </div>
                        );
                      }}
                    </ConnectButton.Custom>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
