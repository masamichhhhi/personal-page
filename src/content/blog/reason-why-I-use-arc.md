---
title: "開発が止まったArcブラウザから、それでも離れられない4つの理由"
publishedAt: 2025-05-23
summary: "Arcブラウザの新規開発停止後も、なお乗り換えられないUXや機能の理由を整理。"
tags: ["Arc", "browser", "productivity", "UX", "Developer-tools"]
---

## はじめに

2025年5月、Arc ブラウザの開発元である The Browser Company が、Arc の積極的な開発を停止し、新しい AI ブラウザ「Dia」に注力することを発表した。

また、それ以外もChatGPT Atlas, Cometなど、様々なAIブラウザが台頭しようとしている。

そもそも開発が止まったプロダクトを使い続けるのはリスクがあるので、このニュースを聞いた時、そろそろ別のブラウザに移行しないとなとは思った。セキュリティパッチは提供されるとはいえ、新機能は追加されない。

泣く泣くChrome や Zen Browser などを試してみたが、やはりArc の UX が良すぎて、他に移行する気に今のところなれていない。

改めて、なぜ私がArcブラウザから離れられないかを考えるとともに、自分がブラウザに求めていることを整理してみようと思う。

## なぜ離れられないのか

### 1. サイドバー中心のタブ管理が良すぎる

Arc は従来の横並びタブではなく、左サイドバーにタブを縦に並べる設計になっている。自分はウルトラワイドモニターを使っているので、サイドバーにタブを置いても表示領域を圧迫せず、むしろ横長の画面を有効活用できる。

これはDiaやZen Browserでもできるのだが、個人的にはどうしても後付け感が否めない…

それと、AIブラウザを使うと基本的に右側にチャットのバーが表示されることが多くて、その分スペースが埋まってしまい中々慣れない。

<figure style="max-width: 800px;">
  <img src="/reason-why-I-use-arc/dia-sidebar.png" alt="Split Viewの表示例" style="width: 100%; display: block;" />
  <figcaption>Diaでサイドバー表示をしつつチャットを開くと、メインのブラウザ領域がかなり狭くなる</figcaption>
</figure>

Arcブラウザは元々このサイドバーが設計思想の根幹にある感じがする。Space（ワークスペース）単位でタブをグルーピングできたり、Split View で複数タブを1つのウィンドウ内に横並び・縦並びで表示することもできる。



<figure>
  <img src="/reason-why-I-use-arc/01_split-view_exit-split-view.png" alt="Split Viewの表示例" />
  <figcaption>Split View で複数タブを1つのウィンドウ内に並べて表示できる</figcaption>
</figure>

このサイドバーが中心となっている構造がすごく気に入っている。

### 2. 外部アプリからのリンクのプレビュー（Little Arc）
>  ※Windows 版ではこの機能は利用できないようです。


正直これのためにArcを使っていると言ってもいい。

自分の場合、業務中や開発中に外部アプリからURLを開くタイミングは数え切れないほどある。

- slackで共有されたURLを開く
- ターミナルでClaude Codeに調査させた結果のURLを開く
- エディタでコード内コメントに記載されているドキュメントのURLを開く
- Notionアプリからタスクの内容に記載してあるURLを開く

などなど。

そして他のブラウザを使っていると、リンクを開く度に別ウインドウで表示しているブラウザに画面が切り替わり、新規タブで開く。そして見終わったらSlackなどの元のアプリに戻り、元々やってた作業に戻る。そして大体タブはずっと残ったまま。

Arcブラウザであれば、「Little Arc」という小さなプレビューウィンドウを開いてくれる。

<figure>
  <img src="/reason-why-I-use-arc/02_little-arc_opening-from-slack.gif" alt="SlackからLittle Arcでリンクを開く" />
  <figcaption>Slack のリンクをクリックすると、Little Arc が小さなウィンドウで内容をプレビューしてくれる</figcaption>
</figure>


メインのブラウザウィンドウに影響を与えず、サッと内容を確認して閉じられる。いちいちタブが増えないので、集中が途切れない。


この体験に慣れた後で他のブラウザを使うと、URLを開く度に余計な視覚情報が入ってくるし、フロー状態が途切れる感覚を強く感じてしまう。



### 3. GitHub との連携が勝手にされている

これは開発者にとって地味に嬉しい。Arc は GitHub との連携が組み込まれていて、自分が作成した PR や、レビューリクエストが来ている PR が自動的にサイドバーに表示される。

わざわざ GitHub を開いて通知を確認しにいかなくても、ブラウザのサイドバーをチラッと見るだけで自分に関係のある PR を把握できる。

<figure>
  <img src="/reason-why-I-use-arc/11_github-live-folders_demo.gif" alt="GitHub Live Foldersのデモ" />
  <figcaption>GitHub の PR やレビューリクエストがサイドバーに自動で表示される</figcaption>
</figure>

### 4. タブの自動アーカイブで毎朝まっさらになる

これはChrome拡張などを使えば簡単にできることかもしれないが、デフォルトでこれをやってくれるという点が嬉しい。

Arc のタブは、一定時間（デフォルトは12時間）操作しないと自動的にアーカイブされる。つまり、次の日にブラウザを開くと、ピン留めしたタブ以外はすべてきれいに消えている。

最初はタブが消えるのは不安だったが、実際に使ってみると **何の不便もない** 。

本当に必要なページは検索すればすぐに見つかるし、ピン留めしておけば残る。むしろ、毎朝まっさらな状態から始められることで、余計な情報に目が入らず、その日やりたいことからフォーカスできる。

前日見ていたタブが大量に溜まった状態から業務を始めて、整理しようとしても「これ後で見るかもな…」という感情が出てしまう優柔不断な自分にとっては、勝手にすべて消えるのはすごくありがたい。


<figure>
  <img src="/reason-why-I-use-arc/tab-archive-setting.png" alt="自動アーカイブの設定画面" />
  <figcaption>自動アーカイブの設定画面。アーカイブまでの時間を調整できる</figcaption>
</figure>



## 私がブラウザに求めていること


## 開発停止プロダクトを使い続ける不安

もちろん不安はある。

- 新しい Web 標準への対応が遅れる可能性
- Chromium のベースアップデートがいつまで続くか不明
- The Browser Company が Atlassian に買収され、Arc の将来がさらに不透明に

合理的に考えれば、どこかで移行すべきだろう。でも今のところ、上記の機能を同時に提供してくれるブラウザは見つかっていない。Zen Browser や Vivaldi など、垂直タブに対応したブラウザはあるが、Arc の「全体の統合感」には及ばない。


## おわりに

Arc の体験を通じて感じるのは、**ブラウザの UX で本当に大事なのは「個々の機能の優劣」ではなく「機能同士の統合感」** だということだ。

垂直タブ、Split View、Little Arc、自動アーカイブ――それぞれを個別に見れば、他のブラウザでも代替できる機能はある。でも、それらが一つのプロダクトとして一貫した思想のもとに統合されている体験は、簡単には代替できない。

開発が止まったことは残念だが、Arc が示した「ブラウザ UX のあるべき姿」は、今後のブラウザ開発に影響を与え続けるだろうと思う。

## 参考

- [The Browser Company stops active development of Arc](https://www.engadget.com/ai/the-browser-company-stops-active-development-of-arc-in-favor-of-new-ai-focused-product-153045276.html)
- [Arc Browser Development Ceases: Meet Dia](https://securityonline.info/arc-browser-development-ceases-meet-dia-the-browser-companys-new-focus/)
- [Split View: View Multiple Tabs at Once – Arc Help Center](https://resources.arc.net/hc/en-us/articles/19335393146775-Split-View-View-Multiple-Tabs-at-Once)
- [Little Arc: Quick Lookups & Instant Triaging – Arc Help Center](https://resources.arc.net/hc/en-us/articles/19235387524503-Little-Arc-Quick-Lookups-Instant-Triaging)
- [Auto Archive: Clean as you go – Arc Help Center](https://resources.arc.net/hc/en-us/articles/19228855311127-Auto-Archive-Clean-as-you-go)

## 更新履歴

- 2026-02-23: 初版公開


## メモ



- 書きたいこと
  - ChatGPT AtlasやDiaなどのAIブラウザが流行っているが、タブやウインドウ管理の快適さではArcに勝てない
  - 自分がブラウザを使うときに感じる「脳の処理スタックにどんどん積まれていく感覚」を一番排除してくれるのがarcなのかもしれない