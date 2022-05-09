import logo from './logo.svg';
import Caver from 'caver-js'; //caver-js 연동
import './App.css';

//필요한 정보 상수로 저장하기
const CONTRACT_ADDRESS = '';  //사용할 컨트랙 주소
const ACCESS_KEY_ID = 'KASK9XUJNVES4SG25HD8OWVG';
const SECRET_ACCESS_KEY = '4RYyH2HBt6773V18VC8BIKEQZYIYOWRMoTyYQxbA';
const CHAIN_ID = '1001';  // 메인넷8217 테스트넷1001
const ABI = ' ';  //IDE에서 배포한 컨트랙트의 ABI 자동복사

//노드와 소통하는 정해진 형식이니까 그냥 따라하기! 
const option = {
	headers: [
		{
			name: "Authorization",
      //value에 Authorization 넣어도 됨
			value: "Basic " + Buffer.from(ACCESS_KEY_ID + ":" + SECRET_ACCESS_KEY).toString("base64")
		},
		{name: "x-chain-id", value: CHAIN_ID} //main net, test net 선택
	]
}

//어느 노드와 통신할지 알려주고 통신 연결
const caver = new Caver(new Caver.providers.HttpProvider("https://node-api.klaytnapi.com/v1/klaytn", option));
//컨트랙트의 어떤 컨트랙트 실행할건지, 컨트랙트 내의 함수 설명서와 주소 넣어줌
const 컨트랙트이름 = new caver.contract(ABI, CONTRACT_ADDRESS);

//컨트랙트에 read!
//컨트랙트 실행 함수
const f_name = async() => { 
  //컨트랙트 위의 실행할 함수 호출!
  const name2 = await 컨트랙트이름.methods.함수이름().call();
  console.log(name2);
}

//컨트랙트에 write! 이 과정에서는 함수를 실행시키며 트랜잭션이 발생해서 수수료가 필요하다! 따라서 지갑키가 필요하다.
const f_name2 = async (input) => {
  const deployer = caver.wallet.keyring.createFromPrivateKey(개인키); 
  caver.wallet.add(deployer); 
  //이게 개인키를 입력해서 키링을 생성해서 추가하는 과정인데, 개인키를 직접 입력하는 건 매우 위험. 그래서 klip api로 대체할 것임. 
    
  //스마트 컨트랙트에 실행 트랜잭션 날리기! read과의 차이 = call vs send
  const receipt = await 컨트랙트이름.metohds.함수이름(input).send({
    from: deployer.address,  //수수료가 빠져나갈 지갑
    gas: "뭐 아무숫자나"  //지불할 수수료(가스비)아무값이나 넣어도 필요한 만큼 알아서 나감.
  })

    //결과 확인
    console.log(receipt);
} 



function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
