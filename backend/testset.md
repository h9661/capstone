`auth/join`

```json
{
  "email": "guscksdn123@naver.com",
  "username": "chanwoo",
  "password": "5565"
}
```

`auth/login`

```json
{
  "username": "chanwoo",
  "password": "5565"
}
```

`post/write`

```json
{
  "title": "test",
  "category": "test",
  "content": "test",
  "password": "test",
  "writer": "chanwoo"
}
```

`post/1/comment/write`

```json
{
  "writer": "chanwoo",
  "content": "test",
  "post_id": "1"
}
```

`post/1/comment/1/recomment/write`

```json
{
  "writer": "chanwoo",
  "content": "test",
  "post_id": "1",
  "comment_id": "1"
}
```
