# 数据为空，无网络组件
## props
- emptySrc,  string, 数据为null展示图 ,非必须
- tipsWord, string, 文案,非必须
- picWidth, number, 图片宽度,非必须

## events
- retry 点击重试，一般请求接口

## example
<common-empty
  v-if="status==-1"
  @retry="retry"
/>
```

