import * as React from 'react'
import { useConnectWallet, useConnectWalletPopup } from '../packages/web3-core'

export const Option = ({ name, Icon, onClick, isInstalled, getInstallationURL }) => {
  if (isInstalled()) {
    return (
      <button
        onClick={onClick}
        type='button'
        className='ui secondary gray button'
        data-text-size='lg'
      >
        <Icon className='mr-6' width={24} />
        <p>{name}</p>
      </button>
    )
  }

  if (getInstallationURL()) {
    return (
      <a
        href={getInstallationURL()}
        target='_blank'
        rel='noreferrer noopener nofollow'
        className='ui secondary gray button'
        data-text-size='lg'
      >
        <Icon className='mr-6' width={24} />
        <p>Install {name}</p>
      </a>
    )
  }

  return null
}


export const Popup = () => {
  const { login } = useConnectWallet()
  const { wallets, isOpen, setIsOpen, isConnecting } = useConnectWalletPopup()

  const onConnect = async (id) => {
    const wallet = wallets.find((x) => x.id === id)

    if (!wallet) {
      throw Error('Invalid wallet id: ' + id)
    }

    await login(wallet.connectorName)
  }

  if (!isOpen) {
    return null
  }

  if (isConnecting) {
    return (
      <>
      <p>Connecting...</p>
      </>
    )
  }

  return (
    <>
    {wallets.map((wallet) => (
      <Option
        key={wallet.id}
        onClick={() => onConnect(wallet.id)}
        Icon={wallet.Icon}
        name={wallet.name}
        isInstalled={wallet.isInstalled}
        getInstallationURL={wallet.getInstallationURL}
      />
    ))}
    </>
  )
}