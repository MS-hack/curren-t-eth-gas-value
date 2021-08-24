import React from 'react'

import ForgeUI, {
  Button,
  Text,
  useEffect,
  useState,
  Fragment,
  IssuePanel,
  render,
} from '@forge/ui'

import { fetch } from '@forge/api'

const sendLog = async () => Promise.resolve('send!')

const LogData = ({ counter }) => {
  const [logSend, setLogSend] = useState()
  const [trader, setTrader] = useState()
  const [fast, setFast] = useState()
  const [safeLow, setSafeLow] = useState()

  const fetchGasInfo = async () => {
    const result = await fetch('https://ethgasstation.info/api/ethgasAPI.json')
    const data = await result.json();
    const status = JSON.stringify(data)
    setTrader(data.fastest/10)
    setFast(data.fast/10)
    setSafeLow(data.safeLow/10)
    setLogSend(status)
  }

  useEffect(async () => {
    await sendLog()
    setLogSend(Date.now())
    await fetchGasInfo()
  }, [counter])

  return (
    <Fragment>
      <Text>Trader (Fastest): {trader}</Text>
      <Text>Fast (less than 2m): {fast}</Text>
      <Text>Standard (less than 5m): {safeLow}</Text>
      <Text>Last log: {logSend}</Text>
    </Fragment>
  )
}

const App = () => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCount(count + 1)
    }, 5000)
  }, [])

  return (
    <Fragment>
      <Button
        text={`Refetch Data, ${count} ${count == 1 ? 'time' : 'times'}`}
        onClick={() => {
          setCount(count + 1)
        }}
      />
      <LogData counter={count} />
    </Fragment>
  )
}

export const run = render(
  <IssuePanel>
    <App />
  </IssuePanel>,
)
