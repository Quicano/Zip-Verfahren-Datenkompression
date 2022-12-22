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

function encode(string, searchBufferLength, lookaheadBufferLength) {
    let dictionary = new Dictionary();
    let i = 0;

    // loop through string:
    while (i < string.length) {
        let char = string.charAt(i);
        let offset = 0;
        let maxLength = 0;
        let j = i-1;

        // go backwards through searchbuffer:
        while (j >= 0 && i-j <= searchBufferLength) {
            if (string.charAt(i) == string.charAt(j)) {
                let length = 1;

                // get length of match:
                while (length < lookaheadBufferLength && i+length < string.length) {
                    if (string.charAt(j+length) == string.charAt(i+length)) {
                        length++;
                    } else {
                        break;
                    }
                }

                // update if new best match:
                if (maxLength < length) {
                    maxLength = length;
                    offset = i-j;
                    if (i+length < string.length) {
                        char = string.charAt(i+length);
                    } else {
                        char = "Ende";
                    }
                }
            }
            j--; 
        }
        // add to dictionary:
        dictionary.addEntry(new Entry(offset, maxLength, char));
        // add to html table:
        addToHTMLTable(new Entry(offset, maxLength, char));
        
        if (maxLength == 0) {
            i++;
        } else {
            i = i+maxLength+1;
        }
    }
    return dictionary;
}

function decode(dictionary) {
    let decodedString = "";

    for (let e = 0; e < dictionary.length; e++) {
        let offset = dictionary[e].getOffset();
        let length = dictionary[e].getLength();
        let char = dictionary[e].getNextSymbol();
        
        // append to string:
        if (length > 0) {
            for (let i = 0; i < length; i++) {
                decodedString += decodedString.charAt(decodedString.length - offset);
            }
        }
        if (char != "Ende") {
            decodedString += char;
        }
        // display current string:
        displayDecodeString(decodedString);
    }
    return decodedString;
}

function addToHTMLTable(entry) {
    let table = document.getElementById("dictionary-table-encode");
    let tableBody = table.getElementsByTagName("tbody")[0];
    let tableRow = tableBody.insertRow();
    tableRow.insertCell().appendChild(document.createTextNode(entry.getOffset()));
    tableRow.insertCell().appendChild(document.createTextNode(entry.getLength()));
    tableRow.insertCell().appendChild(document.createTextNode(entry.getNextSymbol()));
}

function displayDecodeString(string) {
    let paragraph = document.getElementById("decode-string");
    paragraph.innerHTML = string;
}

function startEncoding() {
    // get input:
    let string = document.getElementById("text").value;
    let searchBufferLength = Number(document.getElementById("search-buffer").value);
    let lookaheadBufferLength = Number(document.getElementById("lookahead-buffer").value);

    // check if valid input:
    if (Number.isInteger(searchBufferLength) && searchBufferLength > 0 && Number.isInteger(lookaheadBufferLength) && lookaheadBufferLength > 0) {
        // clear table body:
        let table = document.getElementById("dictionary-table-encode");
        let tableBody = table.getElementsByTagName("tbody")[0];
        tableBody.innerHTML = "";

        // scroll to fieldset:
        document.getElementById("encode-fieldset").scrollIntoView(options);

        // encode:
        dictionary = encode(string, searchBufferLength, lookaheadBufferLength);

        // enable decode button:
        button.disabled = false;
    }
}

function startDecoding() {
    // clear table body:
    let decodeTable = document.getElementById("dictionary-table-decode");
    let decodeTableBody = decodeTable.getElementsByTagName("tbody")[0];
    decodeTable.removeChild(decodeTableBody);

    // scroll to fieldset:
    document.getElementById("decode-fieldset").scrollIntoView(options);

    // copy dictionary table:
    let encodeTable = document.getElementById("dictionary-table-encode");
    let encodeTableBody = encodeTable.getElementsByTagName("tbody")[0];
    let tableBodyCopy = encodeTableBody.cloneNode(true);
    decodeTable.appendChild(tableBodyCopy);

    // decode:
    decode(dictionary.getDictionary());
}

// global variables:
let dictionary;
let button = document.getElementById("decode-button");
const options = {behavior: "smooth"};

// disable decode button at start:
button.disabled = true;