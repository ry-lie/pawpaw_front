<img src="https://github.com/user-attachments/assets/5fdb2b75-3b9a-48f8-860a-f87220384f09" alt="배너" width="100%"/>

<br/>
<br/>

# 0. Getting Started
```bash
$ npm start
```

<br/>
<br/>

# 1. Project Overview 🐾
**PawPaw**  
Mobile-first web service for pet owners (find pet-friendly spots, walking mates, and chat in real time).

<details>
<summary>🇰🇷 Korean Description</summary>
프로젝트 명: 포포  
프로젝트 설명: 공공 API를 통해 내 위치 기반 반려동물 동반 가능 장소 추천 및 산책메이트 매칭, 실시간 채팅 기능을 제공하는 Mobile-First 웹 서비스
</details>
<br/>

# 2. Project Timeline 👥
- Development Period: December 17, 2024 – January 8, 2025
- Team: </br>
	•	Frontend: Seobin Lee, Jooyoung Lee, Jungwoo Ha </br>
	•	Backend: Baul Han, Seokkyung Son

<details>
<summary>🇰🇷 Korean Description</summary>
- 개발 기간 : 2024/12/17 ~ 2025/01/08 <br/>
- 개발 인원 : 프론트엔드 3명(이서빈, 이주영, 하정우) / 백엔드 2명(한바울, 손석경) 
</details>
<br/>

# 3. User Flow 🌊
<img width="100%" alt="User Flow Image" src="https://github.com/user-attachments/assets/557c749b-c489-405c-8906-038a3e340895" />

<details>
<summary>🇰🇷 Korean User Flow</summary>
<img src="https://github.com/user-attachments/assets/8451ad47-777b-4db8-90af-60b37110f3ef" alt="user-flow"  width="100%"/>
</details>

<br/>
<br/>

# 4. Key Features 🔑
- 🐶 **Community** </br>
	•	Browse trending and recent posts from the main page </br>
	•	Filter posts by category or search by keyword </br>
	•	Like and comment on posts </br>
	•	Create, edit, and delete posts and comments </br>
- 📍 **Location Map** </br>
	•	View pet-friendly locations on a map based on your current location </br>
	•	Filter by category (cafes, parks, etc.) with custom markers </br>
	•	Access detailed info and user reviews for each place </br>
	•	Write, edit, and delete reviews </br>

- 💬 **Real-time Chat** </br>
	•	Find nearby users who have activated the “Walking Mate” mode </br>
	•	Send direct messages and connect instantly </br>

- 👤 **My Page** </br>
	•	Register, edit, or delete pet profiles </br>
	•	Edit your user profile (profile photo, nickname, password) </br>
	•	View your own posts and reviews at a glance </br>
<details>
<summary>🇰🇷 Korean Description</summary>
	
- **커뮤니티**:
  - 메인페이지에서 커뮤니티의 인기글 및 최신글을 모아 볼 수 있습니다.
  - 카테고리별로 게시글을 모아 볼 수 있고, 검색을 통해 게시글을 쉽게 찾을 수 있습니다.
  - 게시글에 대해 좋아요 및 댓글 등록/수정/삭제가 가능합니다.

- **지도**:
  - 내 위치를 기반으로 반려동물 동반 가능 장소를 카테고리별로 마커 표시 하여 사용자에게 보여줍니다.
  - 장소에 대한 상세정보를 얻을 수 있으며, 리뷰 등록/수정/삭제가 가능합니다.

- **채팅**:
  - 내 위치를 기반으로 주변 사용자 (산책메이트 기능이 ON인 사용자)를 찾아 채팅을 보낼 수 있습니다.

- **마이페이지**:
  - 사용자의 반려동물을 등록/수정/삭제가 가능합니다.
  - 내 정보 수정을 통해 프로필사진/닉네임/비밀번호 변경이 가능합니다.
  - 내가 쓴 글, 내가 쓴 리뷰를 모아 볼 수 있습니다.
</details>
<br/>

# 5. Screen Layout

## - User Authentication 

<table>
  <tr>
    <td align="center"><strong>Sign up (회원가입)</strong></td>
    <td align="center"><strong>Log in (로그인)</strong></td>
  </tr>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/bb9a144d-c67b-4dbc-a016-357def168069" alt="회원가입" width="100%"/></td>
    <td><img src="https://github.com/user-attachments/assets/079343b7-57e5-4325-b00f-4827a77fb653" alt="로그인" width="100%"/></td>
  </tr>
  <tr>
    <td align="center"><strong>Log in with Kakao (카카오 로그인)</strong></td>
    <td align="center"><strong>forgot password (비밀번호 찾기)</strong></td>
  </tr>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/1a0bd881-1dfd-434f-8903-3ba996c76ccf" alt="카카오 로그인" width="100%"/></td>
    <td><img src="https://github.com/user-attachments/assets/3cd78c40-8ce7-4f52-a4f7-fa3a80d26ffe" alt="비밀번호 찾기" width="100%"/></td>
  </tr>
</table>

## - Community 

<table>
   <tr>
    <td align="center"><strong>Community1 (커뮤니티 1)</strong></td>
    <td align="center"><strong>Community2 (커뮤니티 2)</strong></td>
  </tr>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/0eaebc92-5ec0-49ab-8c7c-56883077718e" alt="커뮤니티 기능1" width="100%"/></td>
    <td><img src="https://github.com/user-attachments/assets/f6ac61a0-3c8e-4213-9a73-3fbd079439c2" alt="커뮤니티 기능2" width="100%"/></td>
  </tr>
</table>

## - Location-Based Place Recommendations & Walking Mate Finder 

<table>
  <tr>
    <td align="center"><strong>Map (지도)</strong></td>
    <td align="center"><strong>Chat (채팅)</strong></td>
  </tr>
<tr>
  <td><img src="https://github.com/user-attachments/assets/690c3e88-751c-4997-afb5-de74d5662874" alt="지도" width="100%"/></td>
   <td><img src="https://github.com/user-attachments/assets/de19a40c-44c7-4ccd-8a75-57d85839650d" alt="채팅" width="100%"/></td>
</tr>
</table>

## - My Page

<table>
  <tr>
    <td align="center"><strong>Edit user info (내 정보 수정)</strong></td>
    <td align="center"><strong>View my posts & Toggle Walking Mate mode (내 글 조회 및 산책메이트 ON/OFF)</strong></td>
  </tr>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/3f81fb07-bad6-4fbf-a9a4-525228c6b8d9" alt="내 정보수정" width="100%"/></td>
    <td><img src="https://github.com/user-attachments/assets/0aa5d4f6-2610-4ed9-b716-c5de094afe8a" alt="내 글 조회" width="100%"/></td>
  </tr>
  <tr>
    <td align="center"><strong>Manage Pet Profile (반려동물 수정)</strong></td>
    <td></td>
  </tr>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/15ea8c02-7fd2-410c-8c88-d5bb1d0bf3ea" alt="반려동물 수정" width="100%"/></td>
    <td></td>
  </tr>
</table>
</br>

# 6. Technology Stack 🔧

## (1) Frotend
<img src="https://github.com/user-attachments/assets/640c8e48-2718-4ce2-9cd6-514e6b565de5" alt="frontend-technology" width="100%"/>

<br/>

## (2) Backend
<img src="https://github.com/user-attachments/assets/6d926a04-0cc4-4ed1-8729-9944be8ed2a1" alt="backend-technology" width="100%"/>

<br/>

## (3) Cooperation
<table>
  <thead>
    <tr>
      <th>Git</th>
      <th>Discord</th>
      <th>Notion</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td align="center">
        <img src="https://github.com/user-attachments/assets/483abc38-ed4d-487c-b43a-3963b33430e6" alt="git" width="80" height="80">
      </td>
      <td align="center">
        <img src="https://upload.wikimedia.org/wikipedia/en/9/98/Discord_logo.svg" alt="discord" width="80" height="80">
      </td>
      <td align="center">
        <img src="https://github.com/user-attachments/assets/34141eb9-deca-416a-a83f-ff9543cc2f9a" alt="notion" width="80" height="80">
      </td>
    </tr>
  </tbody>
</table>

<br/>

# 7. Project Structure

- frontend
  
```plaintext
project/
├── public/
│   ├── images               # Custom map markers (지도 마커 이미지 파일)
│   └── favicon.ico          # Favicon (아이콘 파일)
├── src/
|   ├── app/                 # Pages and page-specific components (page.tsx와 해당페이지에서 사용하는 컴포넌트 작성)
│   ├── assets/              # Static assets (images, fonts) (이미지, 폰트 등 정적 파일)
│   ├── components/          # Reusable UI components (재사용 가능한 공통 UI 컴포넌트)
│   ├── constants/           # Shared constants (공통으로 사용하는 상수)
│   ├── hooks/               # Custom React hooks (커스텀 훅 모음)
│   ├── lib/                 # API functions and services (api 관련 함수 모음)
│   ├── stores               # Zustand state management stores (zustand 관리 스토어 파일)
│   ├── types                # Shared TypeScript types (공통으로 사용하는 type 모음)
│   ├── utils                # Utility functions (공통으로 사용하는 util 함수 모음)
│   ├── middleware.ts        # Route guards for protected pages (권한없는 페이지 접근 제한)
├── Dockerfile               # Docker config for deployment (도커 배포를 위한 파일)
├── package-lock.json        # Project dependencies and scripts (정확한 종속성 버전이 기록된 파일로, 일관된 빌드를 보장)
├──  package.json            # Exact dependency versions for reproducible builds (프로젝트 종속성 및 스크립트 정의)
├── .gitignore               # Files to be ignored by Git (Git 무시 파일 목록)
└── README.md                # Project overview and documentation (프로젝트 개요 및 사용법)
```

<br/>
<br/>
