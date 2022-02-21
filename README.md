# DECRYPTO

## 개요
이 프로젝트는 보드게임 Decrypto를 웹사이트에서 즐기기 위해 시작한 프로젝트입니다. Decrypto는 최소 4인이서 즐길 수 있는 보드게임입니다. 룰 영상은 [여기](https://www.youtube.com/watch?v=AXc-z5Sp1Hc)에서 확인하실 수 있으며, Rulebook.md에서도 룰을 확인하실 수 있으니 참고해주세요!

## 사용 기술 스택
* Typescript
* React
* Firebase
* styled-components
* vite

## 페이지 소개
디크립토 프로젝트에는 총 4개의 페이지가 존재합니다.

1. 인트로 페이지: 본인이 사용할 닉네임을 정하는 페이지입니다. 닉네임을 정하면 **로비 페이지**로 이동합니다.

2. 로비 페이지: 현재 생성된 방과 유저들을 확인하는 방입니다. 들어가고 싶은 방의 번호를 입력하면 **방 페이지**로 이동할 수 있습니다.

3. 방 페이지: 플레이어들의 팀, 게임의 세부설정(타이머 등)을 정하는 페이지입니다. 방을 만든 사람이 방장이 되며, (방장이 사라질 경우 랜덤으로 새로운 방장을 배정) 방장만이 제한 시간 설정과 게임 시작을 할 수 있습니다. 게임을 시작하면 **게임 페이지**로 이동합니다.

4. 게임 페이지: 실제 게임을 진행하는 페이지입니다.

## 프로젝트 설치 및 실행
1. npm

터미널에 다음 명령어를 입력 후 localhost에서 웹사이트에 들어갈 수 있습니다.
```shell
npm install && npm run dev
```

2. yarn

터미널에 다음 명령어를 입력 후 localhost에서 웹사이트에 들어갈 수 있습니다.
```shell
yarn && yarn run dev
```

## 팀원
* byukim (github 링크)
* junseo (github 링크)
* sjo (github 링크)
* yeoyoon (github 링크)

## 워크플로우

## 실행 화면

## 배포 환경

## 폴더 구조
```bash
├── Components 
│   ├── Common
│   └── Layout
├── Layouts
├── Hooks
├── Pages
│   ├── Login
│   │   └── Components
│   ├── Lobby
│   │   └── Components
│   ├── Room
│   │   └── Components
│   └── Game
│       └── Components
├── Styles
└── Assets
    ├── Fonts
    └── Images
``` 
## 디자인 컨셉

## 