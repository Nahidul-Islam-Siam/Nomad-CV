"use client"

import { useState, useEffect } from "react"
import {
  DatePicker,
  Select,
  InputNumber,
  Button,
  Card,
  Typography,
  Space,
  Divider,
  message,
} from "antd"
import { SwapOutlined, CalendarOutlined } from "@ant-design/icons"
import dayjs, { Dayjs } from "dayjs"

const { Title } = Typography
const { Option } = Select

interface ExchangeRateData {
  rate: number
  symbol: string
  flag: string
}

interface ExchangeRates {
  [currencyCode: string]: ExchangeRateData
}

const exchangeRates: ExchangeRates = {
  USD: { rate: 1, symbol: "$", flag: "🇺🇸" },
  EUR: { rate: 0.85, symbol: "€", flag: "🇪🇺" },
  GBP: { rate: 0.73, symbol: "£", flag: "🇬🇧" },
  JPY: { rate: 110.0, symbol: "¥", flag: "🇯🇵" },
  AUD: { rate: 1.35, symbol: "A$", flag: "🇦🇺" },
  CAD: { rate: 1.25, symbol: "C$", flag: "🇨🇦" },
  CHF: { rate: 0.92, symbol: "Fr", flag: "🇨🇭" },
  CNY: { rate: 6.45, symbol: "¥", flag: "🇨🇳" },
  AED: { rate: 3.67, symbol: "د.إ", flag: "🇦🇪" },
  INR: { rate: 74.5, symbol: "₹", flag: "🇮🇳" },
}

const parseInputNumber = (value?: string): number => {
  if (!value) return 0
  const num = Number(value.replace(/[^\d.]/g, ""))
  return isNaN(num) ? 0 : num
}

const CurrencyExchangeCard = () => {
  const [fromCurrency, setFromCurrency] = useState<string>("USD")
  const [toCurrency, setToCurrency] = useState<string>("EUR")
  const [fromAmount, setFromAmount] = useState<number>(100)
  const [toAmount, setToAmount] = useState<number>(0)
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs())
  const [loading, setLoading] = useState<boolean>(false)

  const calculateConversion = (amount: number, from: string, to: string): number => {
    const fromRate = exchangeRates[from]?.rate ?? 1
    const toRate = exchangeRates[to]?.rate ?? 1
    const usdAmount = amount / fromRate
    const converted = usdAmount * toRate
    return Number(converted.toFixed(2))
  }

  useEffect(() => {
    setToAmount(calculateConversion(fromAmount, fromCurrency, toCurrency))
  }, [fromAmount, fromCurrency, toCurrency])

  const handleSwapCurrencies = (): void => {
    setLoading(true)
    setTimeout(() => {
      setFromCurrency(toCurrency)
      setToCurrency(fromCurrency)
      setFromAmount(toAmount)
      setLoading(false)
      message.success("Currencies swapped successfully!")
    }, 500)
  }

  const handleToAmountChange = (value: number | null): void => {
    if (value && value > 0) {
      const reverse = calculateConversion(value, toCurrency, fromCurrency)
      setFromAmount(reverse)
      setToAmount(value)
    }
  }

  const getExchangeRateText = (): string => {
    const rate = calculateConversion(1, fromCurrency, toCurrency)
    return `1 ${fromCurrency} = ${rate} ${toCurrency}`
  }

  const renderCurrencyOptions = () =>
    Object.entries(exchangeRates).map(([code, data]) => (
      <Option key={code} value={code}>
        <Space>
          <span style={{ fontSize: 16 }}>{data.flag}</span>
          <strong>{code}</strong>
          <span style={{ color: "#888" }}>{data.symbol}</span>
        </Space>
      </Option>
    ))

  return (
    <div style={{ padding: 24, maxWidth: 800, margin: "0 auto" }}>
      <Title level={2} style={{ textAlign: "center", marginBottom: 32 }}>
        Currency Exchange
      </Title>

      <Card style={{ borderRadius: 12, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 24 }}>
          <Space>
            <CalendarOutlined />
            <DatePicker
              value={selectedDate}
              onChange={(date) => setSelectedDate(date ?? dayjs())}
              format="YYYY-MM-DD"
              allowClear={false}
            />
          </Space>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          {/* From Currency */}
          <div style={{ flex: 1 }}>
            <Select
              value={fromCurrency}
              onChange={setFromCurrency}
              style={{ width: "100%", marginBottom: 12 }}
              size="large"
              showSearch
              filterOption={(input, option) =>
                String(option?.value).toLowerCase().includes(input.toLowerCase())
              }
            >
              {renderCurrencyOptions()}
            </Select>

            <InputNumber
              value={fromAmount}
              onChange={(val) => setFromAmount(val ?? 0)}
              style={{ width: "100%" }}
              size="large"
              min={0}
              precision={2}
              formatter={(value) =>
                `${exchangeRates[fromCurrency]?.symbol} ${value}`.replace(
                  /\B(?=(\d{3})+(?!\d))/g,
                  ","
                )
              }
              parser={parseInputNumber}
            />
          </div>

          {/* Swap Button */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Button
              type="primary"
              shape="circle"
              icon={<SwapOutlined />}
              loading={loading}
              onClick={handleSwapCurrencies}
              size="large"
              style={{
                backgroundColor: "#ff7a00",
                borderColor: "#ff7a00",
                boxShadow: "0 2px 8px rgba(255,122,0,0.3)",
              }}
              aria-label="Swap currencies"
            />
          </div>

          {/* To Currency */}
          <div style={{ flex: 1 }}>
            <Select
              value={toCurrency}
              onChange={setToCurrency}
              style={{ width: "100%", marginBottom: 12 }}
              size="large"
              showSearch
              filterOption={(input, option) =>
                String(option?.value).toLowerCase().includes(input.toLowerCase())
              }
            >
              {renderCurrencyOptions()}
            </Select>

            <InputNumber
              value={toAmount}
              onChange={(val) => handleToAmountChange(val ?? 0)}
              style={{ width: "100%" }}
              size="large"
              min={0}
              precision={2}
              formatter={(value) =>
                `${exchangeRates[toCurrency]?.symbol} ${value}`.replace(
                  /\B(?=(\d{3})+(?!\d))/g,
                  ","
                )
              }
              parser={parseInputNumber}
            />
          </div>
        </div>

        <Divider />

        <div style={{ textAlign: "center", fontSize: 14, color: "#666" }}>
          <Space>
            <span>Exchange Rate:</span>
            <strong style={{ color: "#ff7a00" }}>{getExchangeRateText()}</strong>
          </Space>
        </div>

        <div style={{ marginTop: 24, display: "flex", justifyContent: "center", gap: 12 }}>
          <Button
            onClick={() => {
              setFromAmount(0)
              setToAmount(0)
              message.info("Amounts cleared")
            }}
          >
            Clear
          </Button>
          <Button
            type="primary"
            style={{ backgroundColor: "#ff7a00", borderColor: "#D4B896" }}
            onClick={() =>
              message.success(`Converted ${fromAmount} ${fromCurrency} to ${toAmount} ${toCurrency}`)
            }
          >
            Convert
          </Button>
        </div>
      </Card>
    </div>
  )
}

export default CurrencyExchangeCard
