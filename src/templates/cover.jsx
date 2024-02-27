import React from "react"
import { chainIdToName } from "../mappings/chain-id.esm";

export default function Cover({ pageContext }) {
  console.log(pageContext);

  return (
    <div>
      <h1>CoverKey: {pageContext.cover.coverKeyString}</h1>
      <p>Chain Id: {pageContext.cover.chainId} - {chainIdToName[pageContext.cover.chainId]}</p>
    </div>
  )
}
