export const postDetails = [
  {
    id: '1',
    title: '温柔通勤风｜米白针织 + 卡其半裙',
    author: '穿搭研究所',
    avatar: '/static/home/card0.png',
    publishTime: '2026-03-22 09:30',
    cover: '/static/home/card0.png',
    summary: '适合春季上班和日常通勤的轻熟穿搭，颜色温柔，拍照也很出片。',
    stats: { likes: 128, comments: 36, collects: 54 },
    tags: [
      { text: '通勤', theme: 'primary' },
      { text: '春季', theme: 'warning' },
      { text: '温柔风', theme: 'success' },
    ],
    sections: [
      {
        type: 'text',
        title: '穿搭思路',
        content:
          '这套用米白色针织打底做上身主角，搭配卡其色半裙，整体干净又显气质。鞋子建议选择浅口单鞋或低跟乐福鞋，能把通勤感和温柔感都保留下来。',
      },
      {
        type: 'image',
        title: '主图展示',
        src: '/static/home/card0.png',
      },
      {
        type: 'text',
        title: '搭配清单',
        content:
          '上衣：米白色薄针织\n下装：高腰卡其半裙\n包包：棕色腋下包\n鞋子：奶咖色低跟单鞋\n配饰：珍珠耳钉、细表带手表',
      },
    ],
    comments: [
      { user: 'Yuki', content: '这个配色太适合上班了，看起来很高级。' },
      { user: 'Momo', content: '求半裙链接，版型看起来很显瘦。' },
    ],
  },
  {
    id: '2',
    title: '校园元气感｜卫衣 + 百褶裙轻松出门',
    author: '今日份搭配',
    avatar: '/static/home/card1.png',
    publishTime: '2026-03-21 18:20',
    cover: '/static/home/card1.png',
    summary: '适合上课、逛街、拍照的一套青春感穿搭，舒适度和氛围感都在线。',
    stats: { likes: 96, comments: 18, collects: 27 },
    tags: [
      { text: '校园', theme: 'primary' },
      { text: '休闲', theme: 'success' },
      { text: '少女感', theme: 'warning' },
    ],
    sections: [
      {
        type: 'text',
        title: '适合场景',
        content:
          '这套特别适合校园通勤、图书馆、自习室或者周末和朋友出门。宽松卫衣提升舒适度，百褶裙让整体更灵动，照片也更有层次。',
      },
      {
        type: 'image',
        title: '穿搭效果',
        src: '/static/home/card1.png',
      },
      {
        type: 'text',
        title: '小建议',
        content:
          '天气偏凉时可以叠穿衬衫领，鞋子换成帆布鞋会更有校园感；如果想更显腿长，记得把上衣前摆微微塞进裙腰。',
      },
    ],
    comments: [
      { user: 'Nana', content: '百褶裙真的很减龄，这套我能直接抄。' },
      { user: 'Lynn', content: '感觉特别适合春天，清清爽爽。' },
    ],
  },
  {
    id: '3',
    title: '夜晚氛围感｜深色系穿搭也能很有层次',
    author: '氛围感制造机',
    avatar: '/static/home/card3.png',
    publishTime: '2026-03-20 21:15',
    cover: '/static/home/card3.png',
    summary: '深蓝和黑灰色也能穿出丰富层次，适合夜景拍照与周末约会。',
    stats: { likes: 143, comments: 41, collects: 63 },
    tags: [
      { text: '夜景', theme: 'primary' },
      { text: '层次感', theme: 'success' },
      { text: '约会', theme: 'danger' },
    ],
    sections: [
      {
        type: 'text',
        title: '色彩重点',
        content:
          '深色穿搭最怕显闷，所以要注意不同材质之间的对比。比如针织、皮质、牛仔这三种面料叠搭，就算颜色接近，也会更有层次。',
      },
      {
        type: 'image',
        title: '夜景展示',
        src: '/static/home/card3.png',
      },
      {
        type: 'text',
        title: '拍照建议',
        content:
          '夜晚拍照可以利用路灯或橱窗灯源，人物站位稍微侧身，能更好体现衣服线条。妆容上适合稍微加强眼妆和唇色。',
      },
    ],
    comments: [
      { user: 'Kiki', content: '终于看到适合夜景的穿搭示例了，很有参考价值。' },
      { user: 'Ava', content: '深色真的很吃材质，这个思路很实用。' },
    ],
  },
  {
    id: '4',
    title: '周末出游｜轻户外舒适穿搭示范',
    author: '出门就这么穿',
    avatar: '/static/home/card2.png',
    publishTime: '2026-03-19 10:10',
    cover: '/static/home/card2.png',
    summary: '适合公园散步、露营、短途出游的轻户外穿法，舒服又上镜。',
    stats: { likes: 77, comments: 12, collects: 20 },
    tags: [
      { text: '出游', theme: 'primary' },
      { text: '舒适', theme: 'success' },
      { text: '轻户外', theme: 'warning' },
    ],
    sections: [
      {
        type: 'text',
        title: '整体建议',
        content:
          '上装可以选防风外套或宽松衬衫，内搭基础 T 恤，下装优先考虑宽松长裤。颜色上推荐大地色系，和自然环境更协调。',
      },
      {
        type: 'image',
        title: '实拍氛围',
        src: '/static/home/card2.png',
      },
      {
        type: 'text',
        title: '必备单品',
        content:
          '渔夫帽、双肩包、运动鞋是很稳妥的组合。如果是长时间步行，记得优先舒适度，再考虑造型感。',
      },
    ],
    comments: [
      { user: 'Jojo', content: '这套好适合周末去公园晒太阳。' },
      { user: 'Mia', content: '轻户外这个方向不错，准备照着搭。' },
    ],
  },
  {
    id: '5',
    title: '彩色系穿搭｜让整体一眼更有记忆点',
    author: '色彩实验室',
    avatar: '/static/home/card4.png',
    publishTime: '2026-03-18 14:00',
    cover: '/static/home/card4.png',
    summary: '用一件亮色单品点亮整体，非常适合春夏想穿得更有活力的时候。',
    stats: { likes: 112, comments: 22, collects: 33 },
    tags: [
      { text: '彩色系', theme: 'primary' },
      { text: '春夏', theme: 'success' },
      { text: '吸睛', theme: 'danger' },
    ],
    sections: [
      {
        type: 'text',
        title: '颜色搭配原则',
        content:
          '当你选择一件高饱和亮色上衣时，其他单品尽量保持低饱和或基础色，这样整体不会杂乱，还能突出重点。',
      },
      {
        type: 'image',
        title: '亮色示意',
        src: '/static/home/card4.png',
      },
      {
        type: 'text',
        title: '适合人群',
        content:
          '适合想尝试变化、提升存在感，或者拍照想更上镜的人。刚开始尝试亮色时，可以先从包包、鞋子、外套这类单品入手。',
      },
    ],
    comments: [
      { user: 'Sisi', content: '原来亮色不难搭，思路一下就清楚了。' },
      { user: 'Tina', content: '这类内容很适合做首页详情展示。' },
    ],
  },
];

export function getPostDetailById(id) {
  const targetId = String(id || '').trim();
  const matched = postDetails.find((item) => {
    const itemId = String(item.id);
    return itemId === targetId || `post-${itemId}` === targetId;
  });
  return matched || postDetails[0];
}
