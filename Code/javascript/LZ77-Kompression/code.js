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
    let info = document.getElementById("encode-info");
    let tableRows = document.getElementById("dictionary-table-encode").rows;

    // loop through string:
    while (i < string.length) {
        let char = string.charAt(i);
        let offset = 0;
        let maxLength = 0;
        let j = i-1;

        info.innerHTML = "Offset: " + offset + ", Length: " + maxLength;

        // color text and wait:
        slidingWindow.innerHTML = displayBuffer(generateColoredText(string, new Array([i, i + 1, "g"])), searchBufferLength, lookaheadBufferLength, i, 1);
        await sleep(1000);

        // go backwards through searchbuffer:
        while (j >= 0 && i-j <= searchBufferLength) {

            // color text and wait:
            slidingWindow.innerHTML = displayBuffer(generateColoredText(string, new Array([j, j + 1, "b"], [i, i + 1, "g"])), searchBufferLength, lookaheadBufferLength, i, 2);
            await sleep(1000);

            if (string.charAt(i) == string.charAt(j)) {
                let length = 1;

                // color text and wait:
                slidingWindow.innerHTML = displayBuffer(generateColoredText(string, new Array([j, j+1, "g"], [i, i+1, "g"])), searchBufferLength, lookaheadBufferLength, i, 2);
                await sleep(1000);

                // get length of match:
                while (length < lookaheadBufferLength && i+length < string.length) {
                    if (string.charAt(j+length) == string.charAt(i+length)) {
                        length++;

                        // color text and wait:
                        if (j + length < i) {
                            slidingWindow.innerHTML = displayBuffer(generateColoredText(string, new Array([j, j+length, "g"], [i, i+length, "g"])), searchBufferLength, lookaheadBufferLength, i, 2);
                        } else {
                            // in case match reaches into lookahead buffer:
                            slidingWindow.innerHTML = displayBuffer(generateColoredText(string, new Array([j, i, "g"], [i, i+length, "g"])), searchBufferLength, lookaheadBufferLength, i, 2);
                        }
                        await sleep(1000);

                    } else {
                        // color text and wait:
                        if (j + length < i) {
                            //slidingWindow.innerHTML = displayBuffer(generateColoredText(string, new Array([j, j+length, "g"], [j+length, j+length+1, "r"], [i, i+length, "g"], [i+length, i+length+1, "r"])), searchBufferLength, lookaheadBufferLength, i, 4);
                            slidingWindow.innerHTML = generateColoredText(string, new Array([j, j+length, "g"], [j+length, j+length+1, "r"], [i, i+length, "g"], [i+length, i+length+1, "r"]));
                        } else {
                            // in case match reaches into lookahead buffer:
                            //slidingWindow.innerHTML = displayBuffer(generateColoredText(string, new Array([j, j+length, "g"], [j+length, j+length+1, "r"], [j+length+1, i+length, "g"], [i+length, i+length+1, "r"])), searchBufferLength, lookaheadBufferLength, i, 4);
                            slidingWindow.innerHTML = generateColoredText(string, new Array([j, j+length, "g"], [j+length, j+length+1, "r"], [j+length+1, i+length, "g"], [i+length, i+length+1, "r"]));
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
        tableRows[tableRows.length-1].style.backgroundColor = tableRowBorder;
        await sleep(1000);
        tableRows[tableRows.length-1].style.backgroundColor = "";
        
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
    let paragraph = document.getElementById("decode-string");
    let tableRows = document.getElementById("dictionary-table-decode").rows;

    for (let e = 0; e < dictionary.length; e++) {
        let offset = dictionary[e].getOffset();
        let length = dictionary[e].getLength();
        let char = dictionary[e].getNextSymbol();

        tableRows[e+1].style.backgroundColor = tableRowBorder;
        
        // append to string:
        if (length > 0) {
            const startGreen = decodedString.length - offset;
            let startBlack = decodedString.length;

            for (let i = 0; i < length; i++) {
                const index = decodedString.length - offset;

                // color text and wait:
                if (index + 1 > startBlack) {
                    // in case match reached into lookahead buffer:
                    startBlack = index + 1;
                }
                paragraph.innerHTML = generateColoredText(decodedString, new Array([startGreen, index+1, "g"], [startBlack, decodedString.length, "b"]));
                await sleep(1000);

                decodedString += decodedString.charAt(index);

                // color text and wait:
                startBlack = decodedString.length - (i + 1);
                if (index + 1 > startBlack) {
                    // in case match reached into lookahead buffer:
                    startBlack = index + 1;
                }
                paragraph.innerHTML = generateColoredText(decodedString, new Array([startGreen, index+1, "g"], [startBlack, decodedString.length, "b"]));
                await sleep(1000);
            }
        }
        if (char != "Ende") {
            decodedString += char;

            paragraph.innerHTML = generateColoredText(decodedString, new Array([-1, decodedString.length, "b"]));
            await sleep(1000);
        }
        tableRows[e+1].style.backgroundColor = "";
    }
    // display final string:
    paragraph.innerHTML = decodedString;

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

async function startEncoding() {
    let encodeButton = document.getElementById("encode-button");
    let info = document.getElementById("encode-info");

    // get input:
    let string = document.getElementById("text").value;
    let searchBufferLength = Number(document.getElementById("search-buffer").value);
    let lookaheadBufferLength = Number(document.getElementById("lookahead-buffer").value);

    // check if valid input:
    if (Number.isInteger(searchBufferLength) && searchBufferLength > 0 && Number.isInteger(lookaheadBufferLength) && lookaheadBufferLength > 0) {
        info.style = "background-color: rgb(153, 153, 153)";

        // disable buttons:
        encodeButton.disabled = true;
        decodeButton.disabled = true;
        
        // clear table body:
        let table = document.getElementById("dictionary-table-encode");
        let tableBody = table.getElementsByTagName("tbody")[0];
        tableBody.innerHTML = "";

        // scroll to fieldset:
        document.getElementById("encode-fieldset").scrollIntoView(options);

        // encode:
        dictionary = await encode(string, searchBufferLength, lookaheadBufferLength);

        info.innerHTML = "Original: " + string.length + ", Komprimiert: " + dictionary.getDictionary().length * 3;
        info.style = "background-color: #009879";

        // enable buttons:
        encodeButton.disabled = false;
        decodeButton.disabled = false;
        
    }
}

async function startDecoding() {
    // disable button:
    decodeButton.disabled = true;

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

    // enable button:
    decodeButton.disabled = false;
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

        // wrap segements with span elements:
        coloredText += string.slice(lastEnd, begin) + "<span class='" + color + "-text'>" + string.replace(/\s/g, '_').slice(begin, end) + "</span>";
        lastEnd = end;
    }
    return coloredText + string.slice(lastEnd);
}

function displayBuffer(string, searchBufferLength, lookaheadBufferLength, index, size) {

    if (searchBufferLength > index) {
        searchBufferLength = index;
    }

    // recalculate values using size:
    let spans = size;
    if (size > 1) {
        spans = size/2;
        index = index + spans * 28;
        searchBufferLength = searchBufferLength + spans * 28;
    }
    lookaheadBufferLength = lookaheadBufferLength + spans * 28;

    // get string segements:
    const beforesb = string.slice(0, index - searchBufferLength);
    const sb = string.slice(index - searchBufferLength, index);
    const lb = string.slice(index, index + lookaheadBufferLength);
    const afterlb = string.slice(index + lookaheadBufferLength);

    // wrap segements with span elements:
    return beforesb + "<span class='sb-background'>" + sb + "</span><span class='lb-background'>" + lb + "</span>" + afterlb;
}

function fastForward() {
    let button = document.getElementById("fast-forward-button");
    let speedButton = document.getElementById("speed-button");

    if (speed != 0) {
        securedSpeed = speed;
        speed = 0;
        button.textContent = "Stop";
        speedButton.disabled = true;
    } else {
        speed = securedSpeed;
        button.textContent = "Vorspulen";
        speedButton.disabled = false;
    }
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
let decodeButton = document.getElementById("decode-button");
let speed = 1.0;
let securedSpeed;
const options = { behavior: "smooth" };
const tableRowBorder = "#909999a8";

// disable decode button at start:
decodeButton.disabled = true;


// open/close legend:
let modal = document.getElementById("legend");
let legendButton = document.getElementById("legend-button");
let closeLegend = document.getElementsByClassName("close")[0];

legendButton.onclick = function() {
  modal.style.display = "block";
}

closeLegend.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
} 

/* TODO:
- Buffer für rote Buchstaben fixen
- Andere Farbe für Buffer?
- Gefärbte Buchstaben vergrößern?
*/