# socketio-example

## install
```shell
cp .env.example .env
```

## execute
```shell
docker compose up
```

## redis command 확인
redis 컨테이너 접속 후, 아래 커맨드 실행
(command 발생시 stdout 로그 발생)

```shell
redis-cli monitor
```

# redis example log
```text
1733473770.793667 [0 172.20.0.3:46400] "CLIENT" "SETINFO" "LIB-NAME" "node-redis"
1733473770.793676 [0 172.20.0.3:46400] "CLIENT" "SETINFO" "LIB-VER" "1.5.17"
1733473770.794817 [0 172.20.0.3:46410] "CLIENT" "SETINFO" "LIB-NAME" "node-redis"
1733473770.794825 [0 172.20.0.3:46410] "CLIENT" "SETINFO" "LIB-VER" "1.5.17"
1733473770.794831 [0 172.20.0.3:46410] "psubscribe" "socket.io#/#*"
1733473770.794835 [0 172.20.0.3:46410] "subscribe" "socket.io-request#/#" "socket.io-response#/#" "socket.io-response#/#YV5YOt#"
1733473779.999088 [0 172.20.0.3:46400] "PUBLISH" "socket.io#/#test-topic#" "\x93\xa6YV5YOt\x83\xa4type\x02\xa4data\x92\xacchat-message\x82\xa6author\xb4OXuAjeXMvi0LY_hYAAAB\xa7message\xactest message\xa3nsp\xa1/\x83\xa5rooms\x91\xaatest-topic\xa6except\x90\xa5flags\x80"
```