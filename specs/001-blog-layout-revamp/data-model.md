# Data Model: Blog Layout Revamp

## Entities

### Post

Fields: id, title, publishedAt, summary(optional), readingTime(optional), image(optional), categoryOrTag(optional)

Validation:
- title は必須
- publishedAt は必須
- summary/readingTime/image/categoryOrTag が欠損しても表示崩れしない

### Section

Fields: name(注目/最新/トップピック), posts(Post の配列)

Validation:
- 注目セクションは 0 件でも表示崩れしない
- セクションごとに「すべて見る」導線が存在

### Archive

Fields: allPosts(Post の配列)

Validation:
- トップページから全件アーカイブへ遷移可能

## Relationships

- Section.posts -> Post (1:N)
- Archive.allPosts -> Post (1:N)
