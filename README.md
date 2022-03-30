<p align='center'>
<img src="https://user-images.githubusercontent.com/66371206/156014259-8fb4d24b-c853-42ed-a429-4a2fe0170298.gif" />
</p>

## 개요

이 프로젝트는 보드게임 Decrypto를 웹사이트에서 즐기기 위해 시작한 프로젝트입니다. Decrypto는 최소 4인이서 즐길 수 있는 보드게임입니다. 룰 영상은 [여기](https://www.youtube.com/watch?v=AXc-z5Sp1Hc)에서 확인하실 수 있으며, Rulebook.md에서도 룰을 확인하실 수 있으니 참고해주세요!

## 사용 기술 스택
<p align='center'>
<img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" />
<img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
<img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" />
<img src="https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white" />
<img src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E" />
<img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />
<img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white" />
</p>

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
|byukim|junseo|sjo|yeoyoo|
|---|---|---|---|
|[AndroidNetrunner](https://github.com/AndroidNetrunner)|[gamguma](https://github.com/Seojunhwan)|[Sara-Jo](https://github.com/Sara-Jo)|[071yoon](https://github.com/071yoon)|

## 워크플로우
[WorkFlow Wiki](https://github.com/AndroidNetrunner/decrypto/wiki/디크립토-플로우차트-&-데이터베이스-스키마)
## 실행 화면

## 배포 환경

## 폴더 구조

```bash
├── Assets 
│   ├── Fonts
│   └── Images
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
├── Utils
├── Styles
```

## 디자인 컨셉

##
