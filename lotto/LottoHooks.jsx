import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback
} from "react";
import Ball from "./Ball";

// useMemo는 리턴되는 값을 기억하고
// useCallback 리턴되는 함수를 기억한다.

function getWinNumbers() {
  console.log("getWinNumbers");
  const candidate = Array(45)
    .fill()
    .map((v, i) => i + 1);
  const shuffle = [];
  while (candidate.length > 0) {
    shuffle.push(
      candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]
    );
  }
  const bonusNumber = shuffle[shuffle.length - 1];
  const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c);
  return [...winNumbers, bonusNumber];
}
// Hooks는 순서가 중요하다.
const LottoHooks = () => {
  // Hooks방식은 함수 전체가 계속 실행되기 때문에
  // useMemo를 이용해서 기억해주어야 한다.
  const lottoNumbers = useMemo(() => {
    return getWinNumbers();
  }, []); // 두번째 인자가 바뀌지 않는 이상 변경이 되지 않는다.

  const [winNumbers, setWinNumbers] = useState(lottoNumbers);
  const [winBalls, setWinBalls] = useState([]);
  const [bonus, setBonus] = useState(null);
  const [redo, setRedo] = useState(false);
  const timeouts = useRef([]);

  // componentDitUpdate만하고 싶을때 꼼수
  // const mounted = useRef(false);
  // useEffect(() => {
  //   if (!mounted.current) {
  //     mounted.current = true;
  //   } else {
  //     // ajax
  //   }
  // }, [바뀌는값]);

  useEffect(() => {
    console.log("useEffet");
    for (let i = 0; i < winNumbers.length - 1; i++) {
      timeouts.current[i] = setTimeout(() => {
        setWinBalls(prevWinBalls => {
          return [...prevWinBalls, winNumbers[i]];
        });
      }, (i + 1) * 1000);
    }
    timeouts.current[6] = setTimeout(() => {
      setBonus(winNumbers[6]);
      setRedo(true);
    }, 7000);

    // return이 componentWillUnmount 실행
    return () => {
      timeouts.current.forEach(v => clearTimeout(v));
    };
  }, [timeouts.current]); // 빈 배열이면 componentDidMount
  // 배열 요소가 있으면 componentDitMount와 componentDitUpdate 둘다 실행
  // timeouts가 바뀌면 timeouts.current = [];는 바뀌는건데 timeouts.current[i]는 바뀌는 부분이 아니다.

  // 자식컴포넌트에 함수를 넘겨줄때는 무조건 useCallback을 해줘야한다.
  // 변경되는것을 자식에게 보내주면 자식이 부모가 새로운것을 보내준다고 인식하여  계속 렌더링 한다.
  const onClickRedo = useCallback(() => {
    console.log(winNumbers);

    setWinNumbers(getWinNumbers());
    setWinBalls([]);
    setBonus(null);
    setRedo(false);

    timeouts.current = [];
  }, [winNumbers]); // 두번째 인자가 변경되야 다시 호출된다.

  return (
    <>
      <div>담청 숫자</div>
      <div id="result">
        {winBalls.map(v => (
          <Ball key={v} number={v} />
        ))}
      </div>
      <div>보너스 숫자</div>
      {bonus && <Ball number={bonus} />}
      {redo && <button onClick={onClickRedo}>한번더</button>}
    </>
  );
};

export default LottoHooks;
