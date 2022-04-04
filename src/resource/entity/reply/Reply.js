export default class Reply {
  marsking;
  constructor(result) {
    const _data = result || {};
    this.replyId = _data.replyId || 0;
    this.boardId = _data.boardId || 0;
    this.parentId = _data.parentId || 0;

    this.content = _data.content || "";
    this.depth = _data.depth || 0;

    this.writeDate = _data.writeDate || 0;
    this.writer = _data.writer || "";
    this.delYn = _data.delYn || "";
    this.useYn = _data.useYn || "";
    this.groupId = _data.groupId || 0;
    this.masking = false;
  }

  replyInsertParam() {
    return {
      boardId: this.boardId,
      content: this.content,
      writer: "어드민",
      writeDate: new Date().getTime(),
      depth: this.depth,
      parentId: this.parentId,
    };
  }
}
