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
    let dictionary = new Dictionary();
    let i = 0;

    let slidingWindow = document.getElementById("sliding-window");
    let info = document.getElementById("info");

    // loop through string:
    while (i < string.length) {
        let char = string.charAt(i);
        let offset = 0;
        let maxLength = 0;
        let j = i-1;

        
        info.innerHTML = "Offset: " + offset + ", Length: " + maxLength;

        // color text and wait:
        slidingWindow.innerHTML = generateColoredText(string, new Array([i, i+1, "green"]));
        await sleep(1000);

        // go backwards through searchbuffer:
        while (j >= 0 && i-j <= searchBufferLength) {

            // color text and wait:
            slidingWindow.innerHTML = generateColoredText(string, new Array([j, j+1, "bold"], [i, i+1, "green"]));
            await sleep(1000);

            if (string.charAt(i) == string.charAt(j)) {
                let length = 1;

                // color text and wait:
                slidingWindow.innerHTML = generateColoredText(string, new Array([j, j+1, "green"], [i, i+1, "green"]));
                await sleep(1000);

                // get length of match:
                while (length < lookaheadBufferLength && i+length < string.length) {
                    if (string.charAt(j+length) == string.charAt(i+length)) {
                        length++;

                        // color text and wait:
                        if (j+length < i) {
                            slidingWindow.innerHTML = generateColoredText(string, new Array([j, j+length, "green"], [i, i+length, "green"]));
                        } else {
                            // in case match reaches into lookahead buffer:
                            slidingWindow.innerHTML = generateColoredText(string, new Array([j, i, "green"], [i, i+length, "green"]));
                        }
                        await sleep(1000);

                    } else {
                        // color text and wait:
                        if (j+length < i) {
                            slidingWindow.innerHTML = generateColoredText(string, new Array([j, j+length, "green"], [j+length, j+length+1, "red"], [i, i+length, "green"], [i+length, i+length+1, "red"]));
                        } else {
                            // in case match reaches into lookahead buffer:
                            slidingWindow.innerHTML = generateColoredText(string, new Array([j, j+length, "green"], [j+length, j+length+1, "red"], [j+length+1, i+length, "green"], [i+length, i+length+1, "red"]));
                        }
                        await sleep(1000); 

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
                info.innerHTML = "Offset: " + offset + ", Length: " + maxLength;
            }
            j--; 
        }
        // add to dictionary:
        dictionary.addEntry(new Entry(offset, maxLength, char));

        // add to html table and wait:
        addToHTMLTable(new Entry(offset, maxLength, char));
        await sleep(1000);
        
        if (maxLength == 0) {
            i++;
        } else {
            i = i+maxLength+1;
        }
    }
    slidingWindow.innerHTML = string;
    return dictionary;
}

async function decode(dictionary) {
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
        await sleep(1000);
    }
    return decodedString;
}

function addToHTMLTable(entry) {
    // get table and add entry:
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

async function startEncoding() {
    // disable decode button:
    button.disabled = true;

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
        dictionary = await encode(string, searchBufferLength, lookaheadBufferLength);

        let info = document.getElementById("info");
        info.innerHTML = "Original: " + string.length + ", Komprimiert: " + dictionary.getDictionary().length * 3 + ", Kompressionsrate: " + (string.length / (dictionary.getDictionary().length * 3)).toFixed(3) + ":1";

        // enable decode button:
        button.disabled = false;
    }
}

async function startDecoding() {
    // clear table body:
    let decodeTable = document.getElementById("dictionary-table-decode");
    let decodeTableBody = decodeTable.getElementsByTagName("tbody")[0];
    decodeTable.removeChild(decodeTableBody);

    // copy dictionary table:
    let encodeTable = document.getElementById("dictionary-table-encode");
    let encodeTableBody = encodeTable.getElementsByTagName("tbody")[0];
    let tableBodyCopy = encodeTableBody.cloneNode(true);
    decodeTable.appendChild(tableBodyCopy);

    // scroll to fieldset:
    document.getElementById("decode-fieldset").scrollIntoView(options);

    // decode:
    await decode(dictionary.getDictionary());
}

// coloredSegments = Array([begin, end, color])
function generateColoredText(string, coloredSegments) {
    let coloredText = "";
    let lastEnd = 0;
    // loop through segements and color text:
    for (let i = 0; i < coloredSegments.length; i++) {
        const begin = coloredSegments[i][0];
        const end = coloredSegments[i][1];
        const color = coloredSegments[i][2];

        coloredText += string.slice(lastEnd, begin) + "<span class='" + color + "-text'>" + string.replace(" ", "_").slice(begin, end) + "</span>";
        lastEnd = end;
    }
    return coloredText + string.slice(lastEnd);
}

function switchSpeed() {
    // switch speed:
    if (speed < 4) {
        speed *= 2;
    } else {
        speed = 0.5;
    }
    // update button text content:
    document.getElementById("speed-button").textContent = speed + "x";
}

function sleep(ms) {
    // wait for ms / speed-button input:
    return new Promise(resolve => setTimeout(resolve, ms / speed));
}

// global variables:
let dictionary;
let button = document.getElementById("decode-button");
const options = {behavior: "smooth"};
let speed = 1.0;

// disable decode button at start:
button.disabled = true;

/* TODO:
- Buffer visualisieren
- Dekompression visualisieren (auch färben?)
- Umgang mit zu langem Eingabestring
- Umgang mit mehrmaligem Drücken des Komprimieren (/Dekomprimieren?) Buttons
- evt. Dictionaries zentrieren
- evt. Info fieldset css
 */