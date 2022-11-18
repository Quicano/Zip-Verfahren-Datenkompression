package org.example.Util;

import java.util.ArrayList;

public class Dictionary {
    private final ArrayList<Entry>  dictionary;

    public Dictionary(){
        dictionary = new ArrayList<Entry>();
    }

    public void createEntry(int offset, int length, char nextSymbol){
        Entry entry = new Entry(offset,length,nextSymbol);
        dictionary.add(entry);
    }

    public void addEntry(Entry entry){
        dictionary.add(entry);
    }

    public ArrayList<Entry> getDictionary() {
        return dictionary;
    }
}
