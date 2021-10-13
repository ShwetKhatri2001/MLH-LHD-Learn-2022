
import axios from "axios"

const baseUrl = "https://api.iextrading.com/1.0"

const getOne = async ({ stockId, historyRange = "1d" }) => {
  const companyInfo = await axios.get(`${baseUrl}/stock/${stockId}/company`)
  const quote = await axios.get(`${baseUrl}/stock/${stockId}/quote`)
  const stockTradingInfo = await axios.get(`${baseUrl}/stock/${stockId}/chart/${historyRange}`)

  const symbolInfo = {
    info: companyInfo.data,
    quote: quote.data,
    tradingData: stockTradingInfo.data,
  }

  return symbolInfo
}

const getLogo = async (stockId) => {
  const response = await axios.get(`${baseUrl}/stock/${stockId}/logo`)

  return response.data.url
}

const getPrice = async (stockId) => {
  const response = await axios.get(`${baseUrl}/stock/${stockId}/price`)

  return response.data
}

const getNews = async (stockId) => {
  const response = await axios.get(`${baseUrl}/stock/${stockId}/news`)

  return response.data
}

const stockService = {
  getOne,
  getLogo,
  getPrice,
  getNews,
}

export default stockService