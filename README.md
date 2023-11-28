# [마음연구소]

<br>

# 서버 실행 및 접속 방법

## 1. git clone
```
https://github.com/Jiwon-Woo/mind-lab.git
```
<br>

## 2. 루트 디렉토리에 `.env` 생성
```
POSTGRES_HOST=...
POSTGRES_PORT=...
POSTGRES_USER=...
POSTGRES_PASSWORD=...
POSTGRES_DB=...
```
ex) `.env`
```
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=jwoo
POSTGRES_PASSWORD=jwoo42
POSTGRES_DB=maumlab
```
<br>

## 3. 도커 실행

도커와 docker-compose 설치가 필요하며, 도커 엔진을 실행해야합니다.

<br>

## 4. 서버 실행

아래 두가지 모드 중 하나를 선택하여 실행합니다.

### 4-1. 개발 모드

로컬에 애플리케이션 구축에 필요한 npm 패키지를 다운 받고 실행합니다.
단, 데이터베이스는 도커를 활용하여 격리된 환경에서 실행합니다.

```
docker-compose up -d postgres
```
```
npm i && npm run start
```

### 4-2 프로덕션 모드
백엔드 애플리케이션과 데이터베이스 모두 도커 컨테이너에서 실행합니다. 애플리케이션과 데이터베이스는 다른 컨테이너에 분리되어 있으며, 도커 네트워크를 통해 소통합니다.
```
docker-compose up -d
```

<br>

## 5. Apollo 서버 접속

> http://localhost:4000/graphql

![Query](https://github.com/Jiwon-Woo/wanted-pre-onboarding-backend/assets/74581396/fd8543f4-c01d-451a-bf2c-12933131907d)

![Mutation](https://github.com/Jiwon-Woo/wanted-pre-onboarding-backend/assets/74581396/49011cd4-2baf-4d62-88e7-cd9569566f0a)

<br>

# 데이터베이스 설계

![](https://github.com/Jiwon-Woo/wanted-pre-onboarding-backend/assets/74581396/35e4f7cf-eedc-4b2a-a626-7b1a5820a30d)

<br>

# GraphQL 스키마 명세

> http://localhost:4000/graphql

![Schema](https://github.com/Jiwon-Woo/wanted-pre-onboarding-backend/assets/74581396/b8d42df3-37f0-4832-9204-7f9c1f69c156)
