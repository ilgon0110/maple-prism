### Maple-prism

![메이플프리즘이미지](https://github.com/ilgon0110/maple-prism/assets/82035356/893d85e5-7795-4c60-90fe-6a8848542716)

- [웹 사이트 바로가기](https://maple-prism.vercel.app/)
- 넥슨 OPEN API를 사용하여 전투력을 계산하고, 아이템을 직접 제작하여 변하는 전투력 수치를 확인할 수 있는 사이트

---

### 사용한 기술

![TypeScript](https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=black) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white) ![React Query](https://img.shields.io/badge/-React%20Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white)

---

### 유의사항

1. 제논, 데몬어벤져, 데몬슬레이어, 제로 직업 사용 불가
2. 스킬로 상승하는 수치는 전투력에 포함되지 않으나, 일부 반영되는 스킬(펫 세트효과, 이벤트 보약 스킬, 캐시 코디 세트효과)등의 API 정보 누락에 의한 연산 오류로 오차가 발생할 수 있습니다.

---

### 프로젝트 빌드 방법

- node 18버전 이상이 설치되어 있어야 합니다.
- git clone 후 terminal 경로를 맞춘 다음

```
npm i
npm run dev
```

---

### 모듈 구조

![mapleprism_module](https://github.com/ilgon0110/maple-prism/assets/82035356/3f48b78a-b807-40bf-8615-58c516512ecb)

- **Maple-prism(웹 모듈)**
  - Components, Data, Domain 호출
- **Components(컴포넌트 모듈)**
  - **ItemMaker 모듈**
    - 아이템 제작에 필요한 컴포넌트들을 모듈화
    - 장비강화가 크게 4단계가 있기에, 각각의 단계에 필요한 4개의 모듈화 진행
    - 그 중 ScrollOption 모듈의 복잡성으로 PieceOfScroll 모듈화
  - **ItemCard 모듈**
    - Data를 메이플스토리 장비 UI에 맞게 변환해주는 모듈
  - **CommonUI 모듈**
    - Select, Button, Input 등 공통으로 활용되는 UI모듈
- **Data(데이터 모듈)**
  - **Server 모듈**
    - 넥슨 OPEN API에서 받아온 데이터를 관리하는 모듈
    - tanstack query를 사용한 커스텀 훅 형태로 구현
  - **Client 모듈**
    - 전투력 계산에 필요한 데이터 중 전역 상태로 관리하는 모듈
    - Zustand를 사용하여 store 형태로 구현
- **Utils(유틸 모듈)**
  - **getPowerRate 모듈**
    - 주입된 데이터를 바탕으로 전투력을 계산하는 모듈 함수
    - 함수 의존성 분리를 위해 총 3단계로 모듈화 진행
  - **commonUtils 모듈**
    - 컴포넌트에서 공용으로 사용되는 유틸 함수들

---

### 아키텍처

- 미완. MVVM과 FSD 패턴 중 서비스에 더 적합하다고 생각되는 패턴으로 리팩토링 후 기술할 예정

---

### 사용한 라이브러리

- 네트워크 : tanstack-query, axios
- 상태관리 : zustand
- 스타일시트 : tailwindCSS, framer-motion
