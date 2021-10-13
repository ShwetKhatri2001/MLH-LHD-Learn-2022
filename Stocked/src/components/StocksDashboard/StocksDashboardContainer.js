
import React, { useState, useEffect } from "react"
import StocksDashboard from "./StocksDashboard"
import io from "socket.io-client"

const urlLast = 'https://ws-api.iextrading.com/1.0/last'
const socketLast = io(urlLast)

const urlTradingStatus = 'https://ws-api.iextrading.com/1.0/deep'
const socketTradingStatus = io(urlTradingStatus)

const StocksDashboardContainer = () => {
  const [stocks, setStocks] = useState({})

  socketLast.on("message", message => {
    const info = JSON.parse(message)

    stocks[info.symbol] = info

    setStocks({ ...stocks })
  })

  socketTradingStatus.on("message", message => {
    const info = JSON.parse(message)

    stocks[info.symbol] = { ...stocks[info.symbol], trading: (info.data.status === "T")}

    setStocks({ ...stocks })
  })

  socketLast.on("connect", () => {
    socketLast.emit("subscribe", "snap,fb,aapl,dis,pen,twlo,jnj,mc.pa")
  })

  socketTradingStatus.on("connect", () => {
    socketLast.emit("subscribe", JSON.stringify({
      symbols: ["snap,fb,aapl,dis,pen,twlo,jnj,mc.pa"],
      channels: ['tradingstatus'],
    }))
  })

  return (
    <StocksDashboard stocks={stocks} />
  )
}

export default StocksDashboardContainer