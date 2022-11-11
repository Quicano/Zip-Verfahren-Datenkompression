package org.example.Decoding;

import org.example.Util.Entry;

import java.util.ArrayList;

public class Decoder {

    public String decode(ArrayList<Entry> dictionary){
        String decodedString = "";
        for (int i = 0; i < dictionary.size(); i++){
            Entry entry = dictionary.get(i);
            int offset = entry.getOffset();
            int length = entry.getLength();
            char nextSymbol = entry.getNextSymbol();

            if(offset > 0){
                for(int j = 0; j < length ; j++){
                    char symbol = decodedString.charAt(decodedString.length()-offset);
                    decodedString = decodedString + symbol;
                }
            }
            if(nextSymbol != Character.MIN_VALUE){
                decodedString = decodedString + nextSymbol;
            }
        }
        return decodedString;
    }
}
