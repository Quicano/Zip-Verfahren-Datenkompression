class Dictionary {

    constructor(){
        this.dictionary = new Array();
    }

    createEntry(offset, length, nextSymbol){
        const entry = new Entry(offset, length, nextSymbol);
        this.dictionary.add(entry);
    }

    addEntry(entry){
        this.dictionary.add(entry);
    }

    getDictionary() {
        return this.dictionary;
    }
}