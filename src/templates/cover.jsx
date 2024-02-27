import React from "react"
import { chainIdToName } from "../mappings/chain-id";

export default function Cover({ pageContext }) {
  console.log(pageContext);

  return (
    <div>
      <h1>CoverKey: {pageContext.cover.coverKeyString}</h1>
      <p>Chain Id: {pageContext.chainId} - {chainIdToName[pageContext.chainId]}</p>
    </div>
  )
}
