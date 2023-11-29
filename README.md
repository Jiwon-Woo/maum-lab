# [마음연구소]

<br>

# 서버 실행 및 접속 방법

## 1. git clone
```
git clone https://github.com/Jiwon-Woo/maum-lab.git
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

![Query](https://github.com/Jiwon-Woo/maum-lab/assets/74581396/c77163d9-a288-4f9b-8f96-14d6b9c4987d)

![Mutation](https://github.com/Jiwon-Woo/maum-lab/assets/74581396/aa63a4db-2453-480e-9536-fee9eababae9)

<br>

# 데이터베이스 설계

![DB](https://github.com/Jiwon-Woo/maum-lab/assets/74581396/70ac7e81-24e5-4e4a-aad8-9c47e6a20a6b)

<br>

# GraphQL 스키마 명세

> http://localhost:4000/graphql

![Schema](https://github.com/Jiwon-Woo/maum-lab/assets/74581396/7115dbd1-c5dd-4840-b892-83fc6808fa4c)
