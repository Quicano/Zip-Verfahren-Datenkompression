package org.example.Encoding;


import org.example.Util.Dictionary;
import org.example.Util.Entry;

public class MatchFinder {
    private static int searchBufferLength = 5;
    private static int lookaheadBufferLength = 4;

    public Dictionary lookForMatch(String s){
        Dictionary dictionary = new Dictionary();
        int i = 0;
        while(i < s.length()){
            char c = s.charAt(i);
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
            if (matchFound == false){
                dictionary.creatEntry(0,0, c);
            }
            i = i+length;
        }
        return dictionary;
    }
}
