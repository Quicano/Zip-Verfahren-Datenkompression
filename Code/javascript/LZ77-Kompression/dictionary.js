class Dictionary {

    constructor(){
        this.dictionary = new Array();
    }

    addEntry(entry){
        this.dictionary.push(entry);
    }

    getDictionary() {
        return this.dictionary;
    }
}