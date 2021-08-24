import ForgeUI, {
  Button,
  Text,
  useEffect,
  useState,
  Fragment,
  IssuePanel,
  render,
} from '@forge/ui'
import { Sdk } from 'etherspot'

import { fetch } from '@forge/api'

const sendLog = async () => Promise.resolve('send!')

const LogData = ({ counter }) => {
  const [logSend, setLogSend] = useState()

  useEffect(async () => {
    await sendLog()
    setLogSend(Date.now())
    const result = await fetch(
      'https://api.github.com/users/mingderwang',
    )
    const status = result.text()
    setLogSend(status)
  }, [counter])

  return <Text>Last log: {logSend}</Text>
}

const App = () => {
  const [count, setCount] = useState(0)
  const [gas, setGas] = useState('unknown')

  return (
    <Fragment>
      <Button
        text={`Count is ${count}`}
        onClick={() => {
          setCount(count + 1)
        }}
      />
      <Text>{`gas: ${gas}`}</Text>
      <LogData counter={count} />
    </Fragment>
  )
}

export const run = render(
  <IssuePanel>
    <App />
  </IssuePanel>,
)
