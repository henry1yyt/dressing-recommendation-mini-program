import { getPostDetailById } from '~/mock/home/postDetails';

Page({
  data: {
    post: null,
  },

  onLoad(options) {
    const id = options?.id || '1';
    const post = getPostDetailById(id);

    this.setData({ post });
    wx.setNavigationBarTitle({
      title: post?.title || '帖子详情',
    });
  },
});
