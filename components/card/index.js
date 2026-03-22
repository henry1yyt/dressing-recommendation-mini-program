Component({
  properties: {
    postId: String,
    url: String,
    desc: String,
    tags: Array,
  },
  data: {},
  methods: {
    handleTap() {
      this.triggerEvent('cardtap', {
        id: this.properties.postId,
      });
    },
  },
});
