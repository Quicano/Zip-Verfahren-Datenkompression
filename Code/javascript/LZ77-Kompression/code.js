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

async function encode(string, searchBufferLength, lookaheadBufferLength) {
    let sbLabel = document.getElementById('searchBufferLabel');
    let lhbLabel = document.getElementById('lookaheadBufferLabel');

    let dictionary = new Dictionary();
    let i = 0;

    // loop through string:
    while (i < string.length) {
        sbLabel.innerHTML = string.slice(0, i);
        lhbLabel.innerHTML = string.slice(i);
        await new Promise(resolve => setTimeout(resolve, 1000));
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
        dictionary.addEntry(new Entry(offset, maxLength, char));
        
        if (maxLength == 0) {
            i++;
        } else {
            i = i+maxLength;
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
        
        if (length > 0) {
            for (let i = 0; i < length; i++) {
                decodedString += decodedString.charAt(decodedString.length - offset);
            }
        }
        if (char != "Ende") {
            decodedString += char;
        }
    }
    return decodedString;
}

function generateTable(array) {
    let body = document.getElementById('dictionaryTable');
    let table = document.createElement('table');
    table.style.width = '100px';
    table.style.border = '1px solid black';

    let tHead = table.createTHead();
    let tRow = tHead.insertRow();
    let th = document.createElement("th");
    th.appendChild(document.createTextNode("offset"));
    tRow.appendChild(th);
    th = document.createElement("th");
    th.appendChild(document.createTextNode("length"));
    tRow.appendChild(th);
    th = document.createElement("th");
    th.appendChild(document.createTextNode("symbol"));
    tRow.appendChild(th);

    for (let i = 0; i < array.length; i++) {
        let tableRow = table.insertRow();
        tableRow.insertCell().appendChild(document.createTextNode(array[i].getOffset()));
        tableRow.insertCell().appendChild(document.createTextNode(array[i].getLength()));
        tableRow.insertCell().appendChild(document.createTextNode(array[i].getNextSymbol()));
    }
    body.appendChild(table);
}

function generateSlidingWindow(string) {
    let sbLabel = document.getElementById('searchBufferLabel');
    let lhbLabel = document.getElementById('lookaheadBufferLabel');

    sbLabel.appendChild(document.createTextNode(string.slice(0, 7)));
    lhbLabel.appendChild(document.createTextNode(string.slice(7)));
}

function main() {
    const string1 = "aacaacabcabaaac";
    const string2 = "Blah blah blah!!";
    let dictionary = encode(string2, 5, 4);

    generateTable(dictionary.getDictionary());

    
    let array = dictionary.getDictionary();
    for (let index = 0; index < array.length; index++) {
        console.log(array[index].getOffset().toString() + ", " + array[index].getLength().toString() + ", " + array[index].getNextSymbol().toString());
    }

    let text = decode(dictionary.getDictionary());
    console.log(text);
}
  
main();