# Decrypto 룰 설명서

## 개요
Decrypto(이하 '디크립토)는 우리 팀의 코드는 안전하게 전달하고, 상대방의 코드는 훔쳐 점수를 획득하는 게임입니다.

---

## 메인 페이지

메인 페이지에서는 **새로운 방을 만들거나, 이미 만들어진 방에 참가**하실 수 있습니다.

새로운 방을 만들기 위해서는 닉네임을 입력하시고 (방 번호는 필요 없습니다.) 방 만들기 버튼을 눌러주세요.

만들어진 방에 참가하기 위해서는 닉네임과 참가하실 방 번호를 입력하신 후에 참가하기 버튼을 눌러주세요.

---

## 로비

로비에서는 팀과 제한시간을 정하는 공간입니다.

**팀을 변경**하기 위해서는 가운데 있는 화살표 버튼을 눌러주세요.

**제한시간**은 오른쪽에 있는 버튼을 통해 설정할 수 있습니다. 방장만이 제한시간을 변경할 수 있으며, 방장은 닉네임 오른쪽을 확인해 아실 수 있습니다.

게임이 준비되셨다면 **게임 시작** 버튼을 누르시면 됩니다. 각 팀의 인원 수가 최소 2명이 아니라면 아무도 버튼을 누를 수 없으며, 인원을 충족했다면 방장만이 게임을 시작할 권한을 가집니다. (방장이 아니라면 버튼을 눌러도 아무런 일이 일어나지 않습니다.)

---

## 게임

게임이 시작되면 모든 플레이어들은 우리팀에게 주어진 4개의 단어(이하 '비밀 단어')를 확인할 수 있습니다. 이 단어는 후술할 힌트를 제공하는데 사용됩니다.

한 게임은 총 8라운드로 이루어져 있으며, 한 라운드의 진행은 **힌트 제출**과 **코드 추측** 단계로 이루어져 있습니다.

### 힌트 제출
팀원 중 한 명이 새로운 팀장이 되며, 팀장은 이번 라운드의 화면 상단에 적힌 **정답 코드**를 확인합니다. 정답 코드는 1 ~ 4 중 3개의 숫자가 무작위 순서로 결정되며, 각 라운드의 목표는 상대팀에게 들키지 않고 우리팀에게만 정답 코드를 전달하는 것입니다.

코드를 전달하기 위해 팀장은 세 개의 단어로 이루어진 힌트를 줄 수 있습니다. 힌트를 통해 코드를 유추할 수 있어야 하지만, 상대팀에게 코드를 들키면 안 되므로 비밀 단어를 활용해 힌트를 줍니다.

예시) 정답 코드: 2 - 1 - 4이고, 비밀 단어가...
1. 폭포
2. 태양
3. 우주
4. 사랑

이라면, **태양 - 폭포 - 사랑**과 연관된 힌트를 줄 수 있겠죠! 예를 들면, **불 - 낙하 - 콩깍지** 이렇게요!

힌트 단어들은 각 칸에 따로따로 입력해주시고, 모두 입력하셨다면 제출 버튼을 눌러주세요! 제출하셨다면 코드 추측 단계로 넘어갑니다.

만약 제한시간이 지나도 비어있는 힌트가 있을 경우 힌트가 비어있는 채로 강제 제출됩니다.

### 코드 추측

우리팀과 상대팀은 이제 제한시간동안 정답 코드가 무엇인지 논의 후 추측을 하게 됩니다. (제한시간이 지나도 코드를 추측하지 않으면 랜덤으로 코드를 추측합니다.) 대부분의 경우, 비밀 단어를 우리팀만 알고 있으므로 우리 팀은 맞히고, 상대 팀은 틀리게 될 것입니다.

추측이 끝나면 정답 코드를 공개하며, 라운드 결과를 정산합니다.

만약 **우리 팀이** 비밀 단어를 알고 있었음에도 정답 코드를 못 맞혔다면 우리 팀은 **오답 토큰**을 하나 받습니다. **오답 토큰을 2개 얻는 팀은 게임에서 즉시 패배합니다.**

만약 **상대 팀이** 비밀 단어를 몰랐음에도 정답 코드를 맞혔다면 상대 팀은 **해독 토큰**을 하나 받습니다. **해독 토큰을 2개 얻는 팀은 게임에서 즉시 승리합니다.**

---

그런데 비밀 단어를 모르는 상대 팀이 어떻게 정답 코드를 맞출 수 있을까요?

라운드가 진행되면서, 상대 팀은 팀장이 준 힌트를 기록하게 됩니다. 정답 코드가 **2 - 1 - 4**이고, **불 - 낙하 - 콩깍지**가 힌트라면, 상대방은 2번째 단어가 불, 1번째 단어가 낙하, 4번째 단어가 콩깍지와 관련있다는 것을 알 것입니다. 라운드를 거듭하면서 힌트들은 누적되고, 상대팀은 비밀 단어 대신 우리 팀이 준 힌트를 보면서 정답 코드를 유추할 수 있죠.

그래서 **힌트를 너무 명확하게 주면 상대팀이 비밀 단어를 알아차릴 수 있습니다.** 대신 **힌트를 너무 애매하게 주면 우리 팀이 코드를 못 알아차릴 수 있습니다.** 결국 둘 사이의 균형이 매우 중요하죠.

---

### 승리 조건

게임의 승리 조건은 다음과 같습니다.

* 우리 팀이 해독 토큰 2개를 획득한다.
* 상대 팀이 오답 토큰 2개를 획득한다.

두 조건 중 하나라도 충족하면 게임을 승리하게 됩니다. 참 쉽죠?