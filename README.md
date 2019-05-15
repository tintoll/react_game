# react_game

- 제로초님의 리액트 기초를 배우면서 간단한 게임을 만들자

```shell
// 아무옵션을 안주면 --save랑 같이 동작
$ npm i react react-dom

// -D 옵션은 --save-dev랑 같다
$ npm i -D webpack webpack-cli

// jsx문법을 해석하지 못하기때문에 바베일 설치하여 webpack에 설정한다.
npm i -D @babel/core @babel/preset-env @babel/preset-react babel-loader

// state = {}를 해석하지 못해서 추가
npm i -D @babel/plugin-proposal-class-properties
```

#### webpack-dev-server and hot-loader적용

```javascript
// 설치
$ npm i -D webpack-dev-server react-hot-loader

// webpack.config.js module 설정 에 plugin추가
plugins: [
  "@babel/plugin-proposal-class-properties",
  "react-hot-loader/babel"
]

// ReactDom.render 부분에 hot으로 감싼 클래스를 넘겨준다.
const { hot } = require("react-hot-loader/root"); // 맨마지막에 /root를 꼭붙여야 한다.
const WordRelay = require("./WordReply");
const Hot = hot(WordRelay);
ReactDom.render(<Hot />, document.querySelector("#root"));

// package.json scripts에 webpack-dev-server 설정 해준다.
"scripts": {
  "dev": "webpack-dev-server --hot"
},

```

## 성능향상

- 크롬의 리액트 도구에서 설정에서 보면 HightLight updates를 체크하면 렌더링 되는 부분이 화면에 보인다.
- 이 부분을 보면서 렌더링 할필요가 없는데 렌더링 하는 부분이 있으면 성능 최적화 작업을 해줘야한다.

```javascript
// 오버라이드를 안해주면 무조건 true를 리턴한다.
// shouldComponentUpdate에서 렌더링이 필요할때만 하도록 조건을 줄수 있다.
shouldComponentUpdate(nextProps, nextState, nextContext) {
  if(this.state.counter !== nextState.counter) {
    return true;
  }
  return false;
}
```

위와 같이 매번 shouldComponentUpdate를 하는 부분이 힘들편 편하게 하는 2가지 방법이 있다

- PureComponent 사용방법 (클래스 방식에서 사용) : 부모-자식에 다 적용해줘야한다.

  ```javascript
  import React, { PureComponent } from "react";
  class NumberBaseball extends PureComponent {
   ...
  }
  ```

- memo 함수 사용방법 (Hooks방식에서 사용) : 부모-자식에 다 적용해줘야한다.

  ```javascript
  import React, { memo } from "react";

  const Try = memo(({ tryInfo }) => {
    return (
      <li>
        <div>{tryInfo.try}</div>
        <div>{tryInfo.result}</div>
      </li>
    );
  });

  export default Try;
  ```

##### Class 방식에서 ref를 Hooks랑 비슷하게 사용하는 방식

```javascript
import React, { createRef } from "react";
class NumberBaseball extends PureComponent {
  inputRef = createRef();
	this.inputRef.current.focus();
}
```

##### props의값은 자식컴포넌트가 변경하면 안된다. 무조건 부모 컴포넌트가 변경해야한다.

- 자식컴포넌트에서 props의 값을 변경하고 싶으면 자식컴포넌트의 state로 만들어서 사용해야 한다.

##### Context API란

- A -> B -> C -> D 구조에서 A에서 D로 데이터를 줄려면 필요없는 B,C를 거처야하는데 이걸 거치치 않고 A -> D로 주는 방법이다. Redux도 같은 구조이다.

##### Hooks에서 클래스 변수 사용법

```javascript
// 클래스 방식
class Test extends React.Component {
  ...

  timeout;

  onChange = () => {
    this.timeout = setTimeout(test, 100);
  }
  ...
}

// Hooks 방식
// this의 속성을 Hooks에서는 ref로 표현한다.
const Test = () =>{
  ...
  const timeout = useRef();
  onChange = () => {
    // 가져올때 timeout.current로 가져와야한다.
    timeout.current = setTimeout(test, 100);
  }
  ...
}
```



#### Object.entries()

`Object.entries()`는 `object`에 직접있는 enumerable 속성 `[key, value]` 쌍에 해당하는 배열을 반환합니다. 속성의 순서는 개체의 속성 값을 수동으로 반복하여 주어진 순서와 동일합니다.

```javascript
const obj = { foo: 'bar', baz: 42 };
console.log(Object.entries(obj)); // [ ['foo', 'bar'], ['baz', 42] ]
console.log(Object.entries(obj)[1]); // Array ["baz", 42]
```



#### Array.**includes()**

- includes() 메서드는 배열이 특정 요소를 포함하고 있는지 여부를 확인하고, 알맞게 `true` 또는 `false`를 반환합니다

```javascript
var array1 = [1, 2, 3];
console.log(array1.includes(2));
// expected output: true

var pets = ['cat', 'dog', 'bat'];
console.log(pets.includes('cat'));
// expected output: true

console.log(pets.includes('at'));
// expected output: false
```



#### 라이프 사이클

##### 클래스 방식

- constructor -> render -> ref -> componentDidMount(비동기 요청)  -> (setState/props바뀔때 ) -> shouldComponentUpdate(true) -> render -> componentDitUpdate -> 부모가 나를 없앴을때 -> componentWillUnmount(비동기 요청 정리) -> 소멸

##### 함수 변경 방법 

```javascript
onClickBtn = (choice) => {
	... 
}
onClick={ () => this.onClickBtn('바위')}

// 변경할려면 
onClickBtn = (choice) => () => {
	... 
}
onClick={this.onClickBtn('바위')}
```

##### Hooks에서 라이프 사이클
- useEffect()를 이용하여 사용 구현한다. 

```javascript
// class 방식 예제
componentDidMount() {
  this.setState({
    imgCoord: 3,
    score: 1,
    result: 2,
  })
}

// Hooks 구현 예제
// 첫번째 인자로 함수, 두번째 인자로 첫번째 인자에서 사용할 state값을 넣어준다.
useEffect(() => { // componentDidMount, componentDidUpdate 역할(1대1 대응은 아님)
  setImgCoord();
  setScore();
  return () => { // componentWillUnmount 역할
    console.log('componentWillUnmount');
  }
}, [imgCoord, score]); // 빈배열이면 componentDidMount역할 만 수행
useEffect(() => {
  setResult();
}, [result]);


// componentDidUpdate만 호출되게끔하는 방법
const mounted = useRef(false);
useEffect(() => {
	if (!mounted.current) {
  	mounted.current = true;
  } else {
  	// ajax
  }
}, [바뀌는값]);
```

- useMemo : 리턴되는 값을 기억한다.
- useCallback : 리턴되는 함수를 기억한다. 
  - 자식에게 함수를 전달할때 매번 새로운 함수를 보내면 자식은 계속 렌더링을 하게되서 문제가 발생한다.

```javascript
// useMemo
const lottoNumbers = useMemo(() => {
    return getWinNumbers();
  }, []); // 두번째 인자가 바뀌지 않는 이상 변경이 되지 않는다.
const [winNumbers, setWinNumbers] = useState(lottoNumbers);

// useCallback
const onClickRedo = useCallback(() => {
  console.log(winNumbers);

  setWinNumbers(getWinNumbers());
  setWinBalls([]);
  setBonus(null);
  setRedo(false);

  timeouts.current = [];
}, [winNumbers]); // 두번째 인자가 변경되야 다시 호출된다.
```

