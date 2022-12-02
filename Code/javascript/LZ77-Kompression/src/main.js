//import "./Util/Dictionary.js";

class Dictionary {

  constructor(){
      this.dictionary = new Array();
  }

  createEntry(offset, length, nextSymbol){
      const entry = new Entry(offset, length, nextSymbol);
      this.dictionary.push(entry);
  }

  addEntry(entry){
      this.dictionary.push(entry);
  }

  getDictionary() {
      return this.dictionary;
  }
}

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

function main() {
  let dictionary = new Dictionary();
  dictionary.addEntry(0,0,"z");
  dictionary.addEntry(1,1,"c");
  
  console.log(dictionary)
}

main();
