import React from 'react'

import ForgeUI, {
  Button,
  Text,
  useEffect,
  useState,
  Fragment,
  IssuePanel,
  render,
  useProductContext,
} from '@forge/ui'

import api, { fetch, route } from '@forge/api'

const sendLog = async () => Promise.resolve('send!')

const LogData = ({ counter }) => {
  const [logSend, setLogSend] = useState(null)
  const [trader, setTrader] = useState(null)
  const [fast, setFast] = useState(null)
  const [safeLow, setSafeLow] = useState(null)
  const [contentId, setContentId] = useState('👻')

  const fetchCommentsForContent = async (contentId) => {
    setContentId(contentId)
    console.log(`issueKey: ${contentId.platformContext.issueKey}`)
    const response = await api
      .asApp()
      .requestJira(
        route`/rest/api/3/issue/${contentId.platformContext.issueKey}`,
        {
          headers: {
            Accept: 'application/json',
          },
        },
      )

    console.log(`Response: ${response.status} ${response.statusText}`)
    // console.log(await response.json());
    const data = await response.json()
    return data
  }

  const fetchGasInfo = async () => {
    const result = await fetch('https://ethgasstation.info/api/ethgasAPI.json')
    const data = await result.json()
    const status = JSON.stringify(data)
    setTrader(data.fastest / 10)
    setFast(data.fast / 10)
    setSafeLow(data.safeLow / 10)
    //setLogSend(status)
  }

  const fetchPOSTcontent = async (json) => {
    const data = await postData('https://ipfs-proxy-server.muzamint.com/', json)
    const a = JSON.stringify(data)
    setLogSend(data.ipfs_url)
    return a
  }

  useEffect(async () => {
      await sendLog()
      setLogSend(Date.now())

    const context = useProductContext()
    const data = await fetchCommentsForContent(context)
    const json = JSON.stringify(data)
    console.log('save_data: ', json)
    const ipfs = await fetchPOSTcontent(json)
    console.log('ipfs: ', ipfs)
    await fetchGasInfo()
  }, [counter])

  return (
    <Fragment>
      <Text>Trader (Fastest): {trader}</Text>
      <Text>Fast (less than 2m): {fast}</Text>
      <Text>Standard (less than 5m): {safeLow}</Text>
      <Text>Save this issue to IPFS: </Text>
      <Text>{logSend}</Text>
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
        text={`Refetch Data, ${count} ${count == 1 ? 'time' : 'times'}`}
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
