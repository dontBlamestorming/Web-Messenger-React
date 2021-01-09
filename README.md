# Web-Messenger

## 요약

본인의 이름만 입력하면 다수와 채팅을 즐길 수 있는 Messenger입니다. 

***

## 기술스택

### Client-side
- React
- material-ui

### Server-side(Server, Database, Deploy)
- firebase

***

## 자세히
### Folder Structure
    ├── README.md         - README file
    │
    ├── src               
    │   ├── App.js        - Main Component
    │   ├── Message.js    - Card Component
    │   └── firebase.js   - config firebase(git ignored)
    │ 
    ├── .firebaserc       - project public name
    ├── firebase.json     
    └── package.json      - npm 설정
    
***

### Architecture

<p align="center">
  <img width="858" alt="architecture" src="https://user-images.githubusercontent.com/41932978/103866098-910bf400-5108-11eb-8ab6-917958fd0e69.png">
</p>



#### Front-end Architecture

##### **Components**
> App.js는 메인 컴포넌트입니다. state를 모두 관장하고 있으며 사용자가 입력할 수 있는 Form Control를 렌더링하고 있습니다. 또한 firebase의 firestore에 저장되어 있는 collection값을 바탕으로 Card Content를 렌더링하며 이는 하위 컴포넌트인  Message.js에서 불러옵니다.

##### **forwardRef() and react-flip-move**
> React에서 일반적인 Functional Components는 ref 값을 갖고있지 않습니다. ref는 이 프로젝트에서 react-flip-move가 동작하기 위해 필요합니다. 사용자가 입력한 text가 렌더링 될 때, 애니메이션 적용은 ref 값을 바탕으로 DOM이나 class에 접근하여 구현되기 때문입니다. 따라서 forwardRef()를 사용하여 ref을 같이 보내고 이를 props로서 Message 컴포넌트에 적용시킵니다.

##### **Collection** 
> useEffect hook을 사용하여 불필요한 함수의 실행을 막고 .collection() 메서드를 통해 데이터에 접근하고 있습니다. ‘정렬’과 관련해서는 사용자가 데이터를 입력하는 순간마다 time stamp를 발생시켜 시간을 기록하고 이를 통해 정렬하고 있습니다.

```javascript
import db from "./firebase";

// 생성
db.collection("messages").add()

// 읽기
db.collection("messages").orderBy("timestap", "desc").onSnapshot()
```


#### Back-end Architecture

##### **Firebase**
> firebase는 발급받은 API key와 config json을 바탕으로 firebase.js에서 실행 후 export하고 있습니다. cloud store에 저장되는 데이터는 username, message, timestamp로 각각 사용자 이름, 내용, 입력한 시간 순 입니다. BaaS(Backend as a Service)로 해당 웹 서비스는 제공되고 있어 설명이 부족한 점 양해 바랍니다.

***

### Application 동작 영상
  ![Web-messenger-video mov](https://user-images.githubusercontent.com/41932978/103981253-ce35bc00-51c4-11eb-8020-e41e57710949.gif)
***
## 개발 후기

### 어려웠던 부분

#### **Ref** 
> Ref는 DOM과 class에 접근하는데에 참조된다는 것을 체감하기 어려웠었다. 아무래도 눈에 직접적으로 보이는 것이 아니다보니 여러가지 용례를 많이 찾아봤어야 했다. 이 부분에 있어 '리액트를 다루는 기술(저자 - 김민준)'을 많이 참고하였다. 관련된 로직을 조금 더 다뤄봐야 완전히 이해할 수 있을 것 같다.

#### **Sort** 
> 입력한 데이터를 Cloud firestore에서 실시간으로 확인해보니 순서대로 입력되는 것이 아니라 가나다 순으로 정렬되어 입력되는 것을 확인하였다. 처음 firebase를 다뤄보는 입장으로 난감하였다. 이리저리 찾아보다가 결국 시간순으로 입력되야하는 것을 깨닫고 검색하다가 기본적으로 firebase 제공하는 api를 사용하면 된다는 것을 알았지만 local에서 개발하며 console로 찍어보는 것이 아니라 직관적으로 이해하기 어려웠었다.

#### **Config firebase** 
> firebase를 config하는 방법은 여러가지가 있었지만, 전에 했었던 프로젝트에서 MySQL를 nodeJS와 연결하는 형태와 가장 비슷한 패턴으로 골랐다. 지금에서야 보면 단순하게 느껴지지만 처음 사용하는 입장에서는 생소한 것 투성이었다. 이해가 안가도 계속 보니까 조금씩 패턴이 보이는 것 같다.

### 느낀점
게시판이나 로그인 인증페이지와 같은 Routing하는 부분이 없어서 쉽게 생각했었다. 하지만 firebase를 config하는 부분, Ref를 사용하는 부분 등에 있어서 생각보다 시간이 매우 오래 걸렸다. 특히 firebase같은 경우에는 너무도 손쉽게 Server-side를 처리할 수 있어서 신기하고 재미있었던 부분이 많았던 프로젝트이다. 다음에는 nodeJS의 socket을 이용하여 서버쪽을 만들어 보고 싶다는 생각이 들었다. 또한 내가 만든 웹페이지의 대략적인 골격을 만들고 친구와 채팅을 해본다는 것은 매우 뿌듯하고 보람된 순간이었다.

***

## 향후 추가할 기능들
- [ ] 누군가 채팅창에 내용을 작성하면 Push notification 기능 개발
- [ ] 이용자의 신규접속, 접속종료를 알림 (예시 - '*** 님이 접속하셨습니다.')
- [ ] 모바일에 최적화된 반응형으로 스타일 디자인

***

