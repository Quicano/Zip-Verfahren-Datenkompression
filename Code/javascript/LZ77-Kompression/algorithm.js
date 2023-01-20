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
                            slidingWindow.innerHTML = displayBuffer(generateColoredText(string, new Array([j, j+length, "g"], [j+length, j+length+1, "r"], [i, i+length, "g"], [i+length, i+length+1, "r"])), searchBufferLength, lookaheadBufferLength, i, 4);
                        } else {
                            // in case match reaches into lookahead buffer:
                            slidingWindow.innerHTML = displayBuffer(generateColoredText(string, new Array([j, j+length, "g"], [j+length, j+length+1, "r"], [j+length+1, i+length, "g"], [i+length, i+length+1, "r"])), searchBufferLength, lookaheadBufferLength, i, 4);
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
        tableRows[tableRows.length-1].scrollIntoView(options2);
        tableRows[tableRows.length-1].style.backgroundColor = tableRowBorder;
        await sleep(1000);
        tableRows[tableRows.length-1].style.backgroundColor = "";
        
        if (maxLength == 0) {
            i++;
        } else {
            i = i+maxLength+1;
        }
    }
    slidingWindow.innerHTML = string.replace(/\u2423/g, ' ');
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

        tableRows[e+1].scrollIntoView(options2);
        tableRows[e + 1].style.backgroundColor = tableRowBorder;
        
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
    paragraph.innerHTML = decodedString.replace(/\u2423/g, ' ');

    return decodedString;
}
