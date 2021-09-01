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

import api, { fetch, route } from '@forge/api'

const LogData = ({ counter }) => {
  const [logSend, setLogSend] = useState(null)
  const [trader, setTrader] = useState(null)
  const [fast, setFast] = useState(null)
  const [safeLow, setSafeLow] = useState(null)

  const fetchGasInfo = async () => {
    const result = await fetch('https://ethgasstation.info/api/ethgasAPI.json')
    const data = await result.json()
    const status = JSON.stringify(data)
    setTrader(data.fastest / 10)
    setFast(data.fast / 10)
    setSafeLow(data.safeLow / 10)
    //setLogSend(status)
  }

  useEffect(async () => {
    await fetchGasInfo()
  }, [counter])

  return (
    <Fragment>
      <Text>Trader (Fastest): {trader}</Text>
      <Text>Fast (less than 2m): {fast}</Text>
      <Text>Standard (less than 5m): {safeLow}</Text>
      <Text>** Powered by https://docs.ethgasstation.info/</Text>
    </Fragment>
  )
}

const postData = async (url, data) => {
  // Default options are marked with *
  const res = await fetch(url, {
    body: data, // must match 'Content-Type' header
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    redirect: 'follow', // manual, *follow, error
  })
  return res.json()
}

const App = () => {
  const [count, setCount] = useState(0)
  const [comments, setComments] = useState('xxx')

  return (
    <Fragment>
      <Button
        text={`Reload`}
        onClick={() => {
          setCount(count + 1)
        }}
      />
      <LogData counter={comments} />
    </Fragment>
  )
}

export const run = render(
  <IssuePanel>
    <App />
  </IssuePanel>,
)
