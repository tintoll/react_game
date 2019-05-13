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
