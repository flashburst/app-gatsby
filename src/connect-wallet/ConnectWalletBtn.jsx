import * as React from 'react'


import { useConnectWallet } from "../packages/web3-core"

export const ConnectWalletBtn = () => {
    const { isActive, logout, openPopup } = useConnectWallet()
  
    return (
      <>
        {isActive
          ? <button onClick={logout}>Disconnect</button>
          : <button onClick={openPopup}>Connect</button>}
      </>
    )
  
}