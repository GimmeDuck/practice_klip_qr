import axios from "axios";

const A2P_API_PREPARE_URL = 'https://a2a-api.klipwallet.com/v2/a2a/prepare';

export const getAddress = (setQrvalue, callback) => {
    axios.post(
		A2P_API_PREPARE_URL,{
			bapp: {
				name: 'KLAY_MARKET'
			},
			type: "auth"
		}
	).then((response) => {
		const { request_key } = response.data;


		const qrcode = `https://klipwallet.com/?target=/a2a?request_key=${request_key}`;
		setQrvalue(qrcode); // 여기서 받은 주소를 큐알코드에 넣는다.
		let timerId = setInterval(()=> {
			axios.get(`https://a2a-api.klipwallet.com/v2/a2a/result?request_key=${request_key}`).then((res)=> {
				if (res.data.result) { //결과 도착!
					console.log(`[Address Result] ${JSON.stringify(res.data.result)}`); // {[Result] [object Object] 과 같이 나올때 JSON.stringify()로 풀어준다.
					callback(res.data.result.klaytn_address);  //생략한 것도 있음
					clearInterval(timerId);
				}
			})
		}, 1000)
	})
};