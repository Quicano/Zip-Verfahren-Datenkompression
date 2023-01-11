package org.example.Encoding;


import org.example.Util.Dictionary;
import org.example.Util.Entry;

<<<<<<< HEAD
import javax.swing.*;

=======
>>>>>>> fc217a4333ce5b6c98d6d18bb2833921c3530cfb
public class MatchFinder {

    public Dictionary lookForMatch(String s, int searchBufferLength, int lookaheadBufferLength){
        Dictionary dictionary = new Dictionary();
        int i = 0;
        while(i < s.length()){
            char c = s.charAt(i);
<<<<<<< HEAD

=======
>>>>>>> fc217a4333ce5b6c98d6d18bb2833921c3530cfb
            int j = i-1;
            int length = 1;
            boolean matchFound = false;
            while(j >= 0 && (i-j) <= searchBufferLength){
                if(s.charAt(i) == s.charAt(j)){
                    matchFound = true;
                    Entry entry = new Entry();
                    entry.setOffset(i-j);
                    while(length < lookaheadBufferLength && (i+length) < s.length()){
                        if(s.charAt(j+length) == s.charAt(i+length)){
                            length++;
                        }else{
                            break;
                        }
                    }
                    entry.setLength(length);
                    if(i+length < s.length()){
                        entry.setNextSymbol(s.charAt(i+length));
                    }else{
                        entry.setNextSymbol(Character.MIN_VALUE);
                    }
                    dictionary.addEntry(entry);
                    length++;
                }
                j--;
            }
            if (!matchFound){
                dictionary.createEntry(0,0, c);
            }
            i = i+length;
        }
        return dictionary;
    }
<<<<<<< HEAD

    public Dictionary encode(String string, int searchBufferLength, int lookaheadBufferLength) {
        Dictionary dictionary = new Dictionary();
        int i = 0;

        // loop through string:
        while (i < string.length()) {
            char chr = string.charAt(i);
            int offset = 0;
            int maxLength = 0;
            int j = i-1;

            // go backwards through searchbuffer:
            while (i-j <= searchBufferLength) {
                if (j >= 0 && string.charAt(i) == string.charAt(j)) {
                    int length = 1;

                    // get length of match:
                    while (length < lookaheadBufferLength && i+length < string.length()) {
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
                        if (i+length < string.length()) {
                            chr = string.charAt(i+length);
                        } else {
                            chr = ' ';
                        }
                    }
                }
                j--;
            }
            dictionary.addEntry(new Entry(offset, maxLength, chr));

            if (maxLength == 0) {
                i++;
            } else {
                i = i+maxLength;
            }
        }
        return dictionary;
    }
=======
>>>>>>> fc217a4333ce5b6c98d6d18bb2833921c3530cfb
}
