// global variables:
let dictionary;
let decodeButton = document.getElementById("decode-button");
let encodeButton = document.getElementById("encode-button");
let speed = 1.0;
let securedSpeed;
let skip = false;
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
    skip = false;
    let info = document.getElementById("encode-info");
    let ratio = document.getElementById("compression-ratio");

    // get input:
    let string = document.getElementById("text").value.replace(/\s/g, '\u2423');
    let searchBufferLength = Number(document.getElementById("search-buffer").value);
    let lookaheadBufferLength = Number(document.getElementById("lookahead-buffer").value);

    // check if valid input:
    if (Number.isInteger(searchBufferLength) && searchBufferLength > 0 && Number.isInteger(lookaheadBufferLength) && lookaheadBufferLength > 0) {
        info.style = "background-color: rgb(153, 153, 153)";
        ratio.classList.remove("info");
        ratio.innerHTML = "";

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

        // calculate bit size of input and output:
        const entrySize = Math.ceil(getBaseLog(2, searchBufferLength)) + Math.ceil(getBaseLog(2, lookaheadBufferLength)) + 8;

        const inputBitSize = string.length * 8;
        const outputBitSize = dictionary.getDictionary().length * entrySize;

        info.innerHTML = "Input: " + inputBitSize + " Bits, Output: " + outputBitSize + " Bits";
        info.style = "background-color: #009879";

        ratio.classList.add("info");
        ratio.style = "background-color: #009879";
        ratio.innerHTML = "Einsparung: " + (100 - (outputBitSize * 100) / inputBitSize).toFixed(2) + " %";

        skip = false;

        // enable buttons:
        encodeButton.disabled = false;
        decodeButton.disabled = false;
        
    }
}

function getBaseLog(x, y) {
    return Math.log(y) / Math.log(x);
}

async function startDecoding() {
    skip = false;

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
    skip = false;

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
        coloredText += string.slice(lastEnd, begin) + "<span class='" + color + "-text'>" + string.slice(begin, end) + "</span>";
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
    if (size == 2 || size == 4) {
        spans = size/2;
        index = index + spans * 28;
        searchBufferLength = searchBufferLength + spans * 28;
    } else if (size == 5) {
        spans = 4
        index = index + 1 * 28;
        searchBufferLength = searchBufferLength + 1 * 28;
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

function finishNow() {
    skip = true
}

function sleep(ms) {
    if (skip) {
        return null;
    } else {
        // wait for ms / speed-button input:
        return new Promise(resolve => setTimeout(resolve, ms / speed));
    }
}