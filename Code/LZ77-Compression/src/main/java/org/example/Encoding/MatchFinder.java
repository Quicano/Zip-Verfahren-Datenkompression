package org.example.Encoding;


import org.example.Util.Dictionary;

public class MatchFinder {
    private static int searchBufferLength = 5;
    private static int lookaheadBufferLength = 4;

    public void lookForMatch(String s){
        Dictionary dictionary = new Dictionary();
        int i = 0;
        while(i < s.length()){
            char c = s.charAt(i);
            int j = i-1;
            boolean matchFound = false;
            while(j >= 0 && (i-j) >= searchBufferLength){
                if(s.charAt(i) == s.charAt(j)){
                    matchFound = true;

                }
                j--;
            }
            if (matchFound == false){
                dictionary.creatEntry(0,0, c);
            }
        }
    }
}
