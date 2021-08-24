import ForgeUI, {
  Button,
  Text,
  useEffect,
  useState,
  Fragment,
  IssuePanel,
  render,
} from '@forge/ui'
import { Sdk } from 'etherspot';

import axios from 'axios';
import fetch from 'node-fetch';

const sendAnalytics = async () => {
  const instance = axios.create({
    baseURL: 'https://www.google-analytics.com',
    timeout: 1000
  });

  // your google analytics config
  const measurement_id = `G-XD25QBVJ7K`;
  const api_secret = `PWGCgBtJRq-ZfJK6GWPosg`;

  await instance.post(`/mp/collect?measurement_id=${measurement_id}&api_secret=${api_secret}`, JSON.stringify({
    "ming": "test"
  }));
};

const sendLog = async () => Promise.resolve('send!')

const LogData = ({ counter }) => {
  const [logSend, setLogSend] = useState()

  useEffect(async () => {
    await sendLog()

    setLogSend(Date.now())
  }, [counter])

  return <Text>Last log: {logSend}</Text>
}

const App = () => {
  const [count, setCount] = useState(0)
  const [gas, setGas] = useState('unknown')

  const getData = async () => {
    const testURL = 'https://api.github.com/users/mingderwang';
    const myInit = {
      method: 'HEAD',
      mode: 'no-cors',
    };
    const myRequest = new Request(testURL, myInit);

	     fetch(myRequest).then((res) => {
         console.log(res)
       
          setCount(count + 1)
      })

      let sdk

      sdk = new Sdk('0x91ceaef213a7dd754aff3156d8717bad7a540114fc7ab519c363d9493be7a366');
      console.log('sdk created')
      console.log(sdk)
    };
  
  return (
    <Fragment>
      <Button
        text={`Count is ${count}`}
        onClick={() => {
          setCount(count + 1)
        
  //        sendAnalytics().then(() => console.log('success'));
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
