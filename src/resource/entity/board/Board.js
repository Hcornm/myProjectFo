export default class Board {
  constructor(result) {
    const _data = result || {};

    this.boardId = _data.boardId || 0;

    this.boardType = _data.boardType || "";
    this.content = _data.content || "";
    this.replyCount = _data.replyCount || 0;
    this.hits = _data.hits || 0;
    this.title = _data.title || "";
    this.writeDate = _data.writeDate || 0;
    this.writer = _data.writer || "";
  }
}
