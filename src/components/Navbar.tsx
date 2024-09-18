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
          <div
            className="flex cursor-default items-center justify-start min-w-[300px] max-h-[25px] cursor-pointer"
            onClick={() => {
              window.location.href = "/";
            }}
          >
            <svg
              viewBox="0 0 230 47"
              className="h-[35px] -ml-[3px]"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <mask
                id="mask0_0_1"
                maskUnits="userSpaceOnUse"
                x="47"
                y="5"
                width="183"
                height="37"
              >
                <rect x="47" y="5" width="183" height="37" fill="#D9D9D9" />
              </mask>
              <g mask="url(#mask0_0_1)">
                <path
                  d="M55.5092 10.0992V32.6576H66.77V37H50.7988V10.0992H55.5092ZM75.3107 10.0992V37H70.6003V10.0992H75.3107ZM102.397 39.024L99.453 35.712C97.5394 36.816 95.2578 37.4416 92.7186 37.4416C85.0274 37.4416 79.7282 31.7376 79.7282 23.5312C79.7282 15.3616 85.0642 9.6208 92.7554 9.6208C100.447 9.6208 105.819 15.3248 105.819 23.5312C105.819 27.3952 104.642 30.7072 102.544 33.136L105.415 36.3376L102.397 39.024ZM100.851 23.5312C100.851 17.7904 97.6866 14.1472 92.7554 14.1472C87.8242 14.1472 84.6594 17.7904 84.6594 23.5312C84.6594 29.272 87.8242 32.9152 92.7554 32.9152C94.0802 32.9152 95.2578 32.6576 96.325 32.1424L92.7554 28.1312L95.7362 25.4448L99.3058 29.456C100.299 27.9104 100.851 25.8864 100.851 23.5312ZM110.019 27.1744V10.0992H114.73V26.88C114.73 30.744 116.827 32.8784 120.655 32.8784C124.482 32.8784 126.616 30.7072 126.616 26.88V10.0992H131.327V27.1744C131.327 33.4672 127.205 37.4416 120.655 37.4416C114.141 37.4416 110.019 33.504 110.019 27.1744ZM141.831 10.0992V37H137.121V10.0992H141.831ZM157.472 37H147.794V10.0992H157.215C165.164 10.0992 170.647 15.5824 170.647 23.6048C170.647 31.5168 165.274 37 157.472 37ZM156.773 14.4416H152.504V32.6576H157.031C162.404 32.6576 165.679 29.1984 165.679 23.6048C165.679 17.9008 162.33 14.4416 156.773 14.4416ZM179.745 10.0992V37H175.035V10.0992H179.745ZM200.428 25.9968H190.419V37H185.708V10.0992H202.342V14.4416H190.419V21.7648H200.428V25.9968ZM213.065 26.4016L203.975 10.0992H209.237L214.537 19.888C214.941 20.624 215.199 21.2128 215.493 21.8752C215.825 21.2128 215.972 20.7712 216.45 19.888L221.713 10.0992H226.828L217.775 26.4016V37H213.065V26.4016Z"
                  fill="white"
                />
              </g>
              <circle cx="23.5" cy="23.5" r="23.5" fill="black" />
              <path
                d="M23 35C24.8565 35 26.637 34.1072 27.9497 32.5181C29.2625 30.929 30 28.7737 30 26.5263C30 24.1053 29 21.8053 27 19.8684C25 17.9316 23.5 15.0263 23 12C22.5 15.0263 21 17.9316 19 19.8684C17 21.8053 16 24.1053 16 26.5263C16 28.7737 16.7375 30.929 18.0503 32.5181C19.363 34.1072 21.1435 35 23 35Z"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </div>
        <div className="flex w-full mr-1.5 font-medium pl-1.5 gap-x-2 xs:hidden -ml-[100px]">
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
                  (page == "manage" || page == "create" || page == "launchpad"
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
