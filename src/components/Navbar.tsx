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
          <a
            className="flex cursor-default items-center min-w-[300px]"
            href="/"
          >
            <img
              src="/icon.png"
              className="cursor-pointer h-[35px] mr-0.5 select-none"
            />
            <img
              src="/logo.png"
              className="cursor-pointer h-[30px] select-none"
            />
          </a>
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
                  (page == "manage" ||
                  page == "create" ||
                  page == "launchpad"
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
