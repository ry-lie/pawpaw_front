
<img src="https://github.com/user-attachments/assets/5fdb2b75-3b9a-48f8-860a-f87220384f09" alt="배너" width="100%"/>

<br/>
<br/>

# 0. Getting Started (시작하기)
```bash
$ npm start
```

<br/>
<br/>

# 1. Project Overview (프로젝트 개요)
- 프로젝트 명: 포포
- 프로젝트 설명: 공공 API를 통해 내 위치에 기반한 반려동물 동반 가능 장소를 추천하고, 산책메이트 찾기 서비스 및 채팅 기능을 제공하는 Mobile-First 웹 서비스

<br/>
<br/>

# 2. Team Members (팀원 및 팀 소개)
| 손석경 | 이서빈 | 이주영 | 하정우 | 한바울
|:------:|:------:|:------:|:------:|:------:|
| <img src="https://github.com/user-attachments/assets/7f938be0-8092-4deb-a292-bece1cde6911" alt="손석경" width="150"> | <img src="https://github.com/user-attachments/assets/f83312f7-6258-4986-b42b-38991d77d215" alt="이서빈" width="150"> | <img src="https://github.com/user-attachments/assets/3895cdc9-d328-4c66-ae91-1b9418212259" alt="이주영" width="150"> | <img src="https://github.com/user-attachments/assets/9560694b-2384-4ae0-91b8-256f4a5849cb" alt="하정우" width="150">  | <img src="https://github.com/user-attachments/assets/811ff8f0-0d4b-4501-b81f-7311f4085051" alt="한바울" width="150"> |
| BE | FE | FE | FE | BE |
| [GitHub](https://github.com/SonSETO) | [GitHub](https://github.com/ry-lie) | [GitHub](https://github.com/jjyy0804) | [GitHub](https://github.com/jay7314) | [GitHub](https://github.com/Paul-Han97) |

<br/>
<br/>

# 3. 사용자 플로우
<img src="https://github.com/user-attachments/assets/8451ad47-777b-4db8-90af-60b37110f3ef" alt="user-flow"  width="100%"/>

<br/>
<br/>

# 4. Key Features (주요 기능)
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

<br/>
<br/>

# 5. Tasks & Responsibilities (작업 및 역할 분담)
<img src="https://github.com/user-attachments/assets/c4122def-ba0f-4194-aed3-30854ee97abc" alt="역할" width="100%"/>


<br/>
<br/>

# 6. 화면구성
|                         로그인 페이지                         |                      회원가입 페이지                      |                           메인 페이지                            |
| :-----------------------------------------------------------: | :-------------------------------------------------------: | :--------------------------------------------------------------: |
|       <img width="200" alt="Image" src="https://github.com/user-attachments/assets/182096f9-aa41-45f8-99ae-3d5e2ff39202" />        |     <img width="200" alt="Image" src="https://github.com/user-attachments/assets/a6a6f2ed-5502-4198-9994-57c02b1c63e5" />     |                   |
|                        커뮤니티 페이지                         |                       게시글 상세 페이지                       |                         댓글 기능                         |
|    <img width="200" alt="Image" src="https://github.com/user-attachments/assets/ce3a8b68-a305-40e8-9909-0a60a412579b" />    |    <img width="200" alt="Image" src="https://github.com/user-attachments/assets/f5bf6ab2-4695-45e0-8d70-32e282f4240e" />    | <img width="200" alt="Image" src="https://github.com/user-attachments/assets/ed98b336-dc65-4b98-b8e7-1ec9aa48402c" /> |
|                        게시글 작성 페이지                         |                      지도 페이지                      |                           장소 상세 모달                           |
| <img width="200" alt="Image" src="https://github.com/user-attachments/assets/c29d9a62-d17c-4a2d-8a4b-9d6b7d70e243" /> | <img width="200" alt="Image" src="https://github.com/user-attachments/assets/73e28e05-1692-4395-bba8-f5bd7a3e719e" /> |     <img width="200" alt="Image" src="https://github.com/user-attachments/assets/6cc842eb-8e1a-499e-8cb3-064139490e26" />     |
|                        리뷰 작성 페이지                         |                      리뷰 상세 페이지                      |                           산책메이트 찾기 페이지                           |
| <img width="200" alt="Image" src="https://github.com/user-attachments/assets/29347940-e944-4f80-93a4-5df9da81e239" /> |  |          |
|                        채팅 페이지                         |                      마이 페이지                      |                           내가 쓴 리뷰 조회 페이지                           |
|  | <img width="200" alt="Image" src="https://github.com/user-attachments/assets/dcd8e303-14c9-45eb-82ba-601fafdf483b" /> |     <img width="200" alt="Image" src="https://github.com/user-attachments/assets/364526e3-6e16-463a-a045-b1576b274b85" />     |
|                        내가 쓴 글 조회 페이지                         |                                            |                                                      |
|  |  |          |
<br/>

# 7. Technology Stack (기술 스택)

## (1) Frotend
<img src="https://github.com/user-attachments/assets/640c8e48-2718-4ce2-9cd6-514e6b565de5" alt="frontend-technology" width="100%"/>

<br/>

## (2) Backend
<img src="https://github.com/user-attachments/assets/6d926a04-0cc4-4ed1-8729-9944be8ed2a1" alt="backend-technology" width="100%"/>

<br/>

## (3) Cooperation
|  |  |
|-----------------|-----------------|
| Git    |  <img src="https://github.com/user-attachments/assets/483abc38-ed4d-487c-b43a-3963b33430e6" alt="git" width="100">    |
| Discord    |  <img src="https://upload.wikimedia.org/wikipedia/en/9/98/Discord_logo.svg" alt="discord" width="100">    |
| Notion    |  <img src="https://github.com/user-attachments/assets/34141eb9-deca-416a-a83f-ff9543cc2f9a" alt="Notion" width="100">    |

<br/>

# 6. Project Structure (프로젝트 구조)

- frontend
  
```plaintext
project/
├── public/
│   ├── images               # 지도 마커 이미지 파일
│   └── favicon.ico          # 아이콘 파일
├── src/
|   ├── app/                 # page.tsx와 해당페이지에서 사용하는 컴포넌트 작성
│   ├── assets/              # 이미지, 폰트 등 정적 파일
│   ├── components/          # 재사용 가능한 공통UI 컴포넌트
│   ├── constants/           # 공통으로 사용하는 상수
│   ├── hooks/               # 커스텀 훅 모음
│   ├── lib/                 # api 관련 함수 모음
│   ├── stores               # zustand 관리 스토어 파일
│   ├── types                # 공통으로 사용하는 type 모음
│   ├── utils                # 공통으로 사용하는 util 함수 모음
│   ├── middleware.ts        # 권한없는 페이지 접근 제한
├── Dockerfile               # 도커 배포를 위한 파일
├── package-lock.json        # 정확한 종속성 버전이 기록된 파일로, 일관된 빌드를 보장
├──  package.json            # 프로젝트 종속성 및 스크립트 정의
├── .gitignore               # Git 무시 파일 목록
└── README.md                # 프로젝트 개요 및 사용법
```

<br/>
<br/>


