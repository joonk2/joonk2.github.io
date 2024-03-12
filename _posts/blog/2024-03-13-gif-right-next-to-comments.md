---
title:  "[blog] 댓글창 꾸미기"
layout: post
categories: [etc, blog] 
tags: [blog, jekyll, github, git]
toc: true
toc_sticky: true
date: 2024-03-10
written: 2024-03-10 sun 12:11
---

# 이 글은 깃허브블로그 jekyll chirpy theme을 기준으로 작성한다.
블로그 댓글창이 너무 생동감이 없는 것 같아 댓글창 옆에 gif사진을 추가해보기로 했습니다!
<br><br>

![Desktop View](/assets/img/blog/gifcomments/0.png)

우선 전 utterance 댓글창을 _layout/post.html 이곳에서 맨 아래에 작성해 놓은게 있었습니다 <br>

—는 아래 내용을 찾기 쉬우라고 적어놓은 구분선입니다

```html
 </div><!-- div.post-tail-wrapper -->
----------------------------------------------------------------------------

<!-- 댓글기능 삽입 -->
<script src="https://utteranc.es/client.js"
        repo="joonk2/joonhwan2.github.io"
        issue-term="url"
        theme="github-light"
        crossorigin="anonymous"
        async>
</script>
```
<br><br>

이걸 조금 수정하여 댓글창 바로 옆에 gif사진도 올 수 있도록 CSS까지 추가해봅시다 <br>
—는 아래 내용을 찾기 쉬우라고 적어놓은 구분선입니다

```html
<!-- 부모 컨테이너 -->
<div class="comment-section">
  <!-- Utterances 댓글 기능 삽입 -->
  <script src="https://utteranc.es/client.js"
          repo="joonk2/joonk2.github.io"
          issue-term="pathname"
          theme="github-light"
          crossorigin="anonymous"
          async>
  </script>

  <!-- 휴대폰에서도 자동 크기 조절-->
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <!-- 3D GIF 추가 -->
  <img src="/assets/img/glitering.gif" alt="3D GIF" class="my-gif-class">
</div>





<!--------------------------------CSS---------------------------->
<style>
  .comment-section {
    display: flex;
    align-items: center; /* 세로 정렬 설정 */
  }

  .my-gif-class {
    max-width: 40%; 
    width: 40%; 
    height: auto; /* 이미지 세로 크기 자동 조절 */
    object-fit: contain; /* 비율을 유지한 채로 적절한 크기에 맞춤 */
    margin-left: 10px; /* 댓글창과의 간격 조절 */
  }
</style>
```

<br><br>

아래 코드를 입력하여 로컬환경에서 잘 나오나 확인해보고, <br>
업로드 후 인터넷 환경으로도 확인해봅시다 
```bash
bundle exec jekyll serve --port 4000
```
<br>

![Desktop View](/assets/img/blog/gifcomments/1.png)
---

![Desktop View](/assets/img/blog/gifcomments/2.jpg)
---
<br><br>

위의 사진은 각각 `노트북`, `휴대폰` 으로 본 것인데 둘다 작동 잘하고, <br>
와ㅋㅋ 좋네요