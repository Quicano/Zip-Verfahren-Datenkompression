class Entry {

    constructor(offset, length, nextSymbol) {
      this.offset = offset;
      this.length = length;
      this.nextSymbol = nextSymbol;
    }

    getOffset() {
        return this.offset;
    }

    getLength() {
        return this.length;
    }

    getNextSymbol() {
        return this.nextSymbol;
    }

    setOffset(offset) {
        this.offset = offset;
    }

    setLength(length) {
        this.length = length;
    }

    setNextSymbol(nextSymbol) {
        this.nextSymbol = nextSymbol;
    }
}