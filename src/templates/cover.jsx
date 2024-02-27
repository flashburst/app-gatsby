import React, { useEffect } from "react"
import { chainIdToName } from "../mappings/chain-id.esm";
import { useConnectWallet } from "../packages/web3-core";
import { ConnectWalletBtn } from "../connect-wallet/ConnectWalletBtn";

export default function Cover({ pageContext }) {
  const {account, connectedChainId, selectedChainId, setSelectedChainId} = useConnectWallet()
  console.log(pageContext, account, connectedChainId, selectedChainId);

  useEffect(()=>{
    setSelectedChainId(parseInt(pageContext.cover.chainId))
  }, [pageContext.cover.chainId, setSelectedChainId])

  return (
    <div>
      <h1>CoverKey: {pageContext.cover.coverKeyString}</h1>
      <p>Chain Id: {pageContext.cover.chainId} - {chainIdToName[pageContext.cover.chainId]}</p>

      <ConnectWalletBtn />
    </div>
  )
}
