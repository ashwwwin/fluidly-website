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
import { useDisconnect, useConnect, useAccount, useChains } from "wagmi";
import { injected } from "wagmi/connectors";
import {
  ConnectButton,
  useConnectModal,
  useAccountModal,
  useChainModal,
} from "@rainbow-me/rainbowkit";

const Navbar = ({ page }: { page: string }) => {
  const account = useAccount();
  const { openConnectModal } = useConnectModal();
  const { openAccountModal } = useAccountModal();
  const { openChainModal } = useChainModal();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();

  return (
    <>
      <div className="w-full z-[99999] bg-black shadow-2xl xs:items-center xs:justify-center border-b-[1.75px] border-white border-opacity-10 fixed items-center px-3 py-3.5 flex">
        <a className="flex cursor-default items-center" href="/">
          <img src="/icon.png" className="h-[35px] mr-2 select-none" />
          <img
            src="/logo.png"
            className="h-[30px] select-none pointer-events-none"
          />
        </a>
        <div className="flex flex-grow xs:hidden" />
        <div className="flex mr-1.5 items-center gap-x-3 xs:hidden">
          <a
            href="https://x.com/Liquidify_gg"
            className="outline-none flex items-center bg-white text-white duration-[150ms] rounded-md py-2 bg-opacity-0 transition-all px-3 rounded-md select-none text-opacity-50 hover:text-opacity-100 hover:bg-opacity-[7.5%]"
          >
            <img
              src="/x.png"
              className="h-[15px] opacity-50 pointer-events-none"
            />
          </a>
          <div className="bg-white h-full px-[1px] rounded-full opacity-10 py-[12.5px]" />

          <div className="flex gap-x-2.5">
            <a
              href="/faq"
              className={
                "outline-none flex items-center bg-white text-white duration-[150ms] rounded-md py-1 bg-opacity-0 transition-all pr-3 pl-2 rounded-md select-none " +
                (page == "faq"
                  ? " text-opacity-100 bg-opacity-10"
                  : " text-opacity-50 hover:text-opacity-100 hover:bg-opacity-[7.5%]")
              }
            >
              <HelpCircle className="h-[15px] mr-1" /> FAQ
            </a>
            <a
              href="/"
              className={
                "outline-none flex items-center bg-white text-white duration-[150ms] rounded-md py-1 bg-opacity-0 transition-all pr-3 pl-2 rounded-md select-none " +
                (page == "collection"
                  ? " text-opacity-100 bg-opacity-10"
                  : " text-opacity-50 hover:text-opacity-100 hover:bg-opacity-[7.5%]")
              }
            >
              <BookCheckIcon className="h-[15px] mr-1" /> Collections
            </a>
            <div className="flex flex-col group relative">
              <button
                className={
                  "outline-none flex z-[10000] items-center bg-white text-white duration-[150ms] rounded-md py-1 bg-opacity-0 transition-all pr-3 pl-2 rounded-md select-none " +
                  (page == "manage" || page == "liquidify"
                    ? " text-opacity-100 bg-opacity-10"
                    : " text-opacity-50 group-hover:text-opacity-100 group-hover:bg-opacity-[7.5%]")
                }
              >
                <Droplet className="h-[15px] mr-1" />
                Liquidify
              </button>
              <div className="absolute pt-[38px] w-full hidden group-hover:block">
                <div className="bg-[#0D0D0D] rounded-md text-sm p-1 select-none flex flex-col gap-y-1 text-white">
                  <a
                    href="/manage"
                    className={
                      "outline-none flex items-center bg-white text-white duration-[150ms] rounded-[4.5px] py-1 bg-opacity-0 transition-all pr-3 pl-2 rounded-[4.3px] select-none " +
                      (page == "manage"
                        ? " text-opacity-100 bg-opacity-10"
                        : " text-opacity-50 hover:text-opacity-100 hover:bg-opacity-[7.5%]")
                    }
                  >
                    <PencilRuler className="h-[15px] mr-1" /> Manage
                  </a>
                  <a
                    href="/create"
                    className={
                      "outline-none flex items-center bg-white text-white duration-[150ms] rounded-[4.5px] py-1 bg-opacity-0 transition-all pr-3 pl-2 rounded-[4.3px] select-none " +
                      (page == "liquidify"
                        ? " text-opacity-100 bg-opacity-10"
                        : " text-opacity-50 hover:text-opacity-100 hover:bg-opacity-[7.5%]")
                    }
                  >
                    <StarsIcon className="h-[15px] mr-1" /> Create
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white h-full px-[1px] rounded-full opacity-10 py-[12.5px]" />
          <div className="flex gap-x-1.5">
            <button
              className="group flex items-center py-1 px-3 rounded-md bg-white bg-opacity-0 text-white hover:bg-opacity-[7.5%] text-opacity-50 hover:text-opacity-100 transition-all duration-[150ms]"
              onClick={openChainModal}
              type="button"
            >
              {!account?.address ? (
                <>
                  <Globe className="h-[15px]" /> Network{" "}
                </>
              ) : (
                <>
                  <span className="flex group-hover:opacity-100 opacity-80 duration-[150ms] mr-1.5">
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
                    ) : (
                      <div className="items-center flex text-red-500">
                        <Globe className="h-[15px]" /> Network
                      </div>
                    )}
                  </span>
                  {account?.chain?.name}
                </>
              )}

              {/* {getChains} */}

              {/* <Image
              alt={chain.name ?? "Chain icon"}
              src={chain.iconUrl}
              style={{ width: 12, height: 12 }}
            /> */}
            </button>
            <div className="flex flex-col group">
              <button
                onClick={() => {
                  if (!account.isConnected && openConnectModal)
                    return openConnectModal();
                }}
                className="flex items-center z-[10000] rounded-md text-white mr-2 py-1 bg-opacity-0 transition-all bg-white group-hover:text-opacity-100 pr-3 pl-2 select-none text-opacity-50 group-hover:bg-opacity-[7.5%]"
                type="button"
              >
                <Wallet className="h-[15px] mr-1" />
                Wallet
              </button>
              {account.isConnected && (
                <>
                  <div className="absolute pt-[38px] group-hover:block hidden right-[26px]">
                    <div className="bg-[#0D0D0D] rounded-md text-sm p-1 flex-col text-white">
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
                                  return (
                                    <button
                                      className="flex items-center py-1 pr-2 pl-1.5 rounded-[3.8px] bg-white bg-opacity-0 text-white hover:bg-opacity-[7.5%] text-opacity-50 hover:text-opacity-100 transition-all duration-[150ms]"
                                      onClick={openChainModal}
                                      type="button"
                                    >
                                      <Globe className="h-[14px] mr-1" />
                                      Change network
                                    </button>
                                  );
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
      </div>
    </>
  );
};

export default Navbar;
