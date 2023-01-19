class Entry {

    constructor(offset, length, nextSymbol) {
      this.offset = offset;
      this.len = length;
      this.nextSymbol = nextSymbol;
    }

    getOffset() {
        return this.offset;
    }

    getLength() {
        return this.len;
    }

    getNextSymbol() {
        return this.nextSymbol;
    }
}