package org.example.Decoding;

import org.example.Util.Entry;

import java.util.ArrayList;

public class Decoder {

    public String decode(ArrayList<Entry> dictionary){
        StringBuilder decodedString = new StringBuilder();
        for (Entry entry : dictionary) {
            int offset = entry.getOffset();
            int length = entry.getLength();
            char nextSymbol = entry.getNextSymbol();

            if (offset > 0) {
                for (int j = 0; j < length; j++) {
                    char symbol = decodedString.charAt(decodedString.length() - offset);
                    decodedString.append(symbol);
                }
            }
            if (nextSymbol != Character.MIN_VALUE) {
                decodedString.append(nextSymbol);
            }
        }
        return decodedString.toString();
    }
}
