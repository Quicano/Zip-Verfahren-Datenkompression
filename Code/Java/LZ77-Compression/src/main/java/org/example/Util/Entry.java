package org.example.Util;

public class Entry {
    private int offset;
    private int length;
    private char nextSymbol;

    public Entry(){}
    public Entry(int offset, int length, char nextSymbol){
        this.offset = offset;
        this.length = length;
        this.nextSymbol = nextSymbol;
    }

    public int getOffset() {
        return offset;
    }

    public int getLength() {
        return length;
    }

    public char getNextSymbol() {
        return nextSymbol;
    }

    public void setOffset(int offset) {
        this.offset = offset;
    }

    public void setLength(int length) {
        this.length = length;
    }

    public void setNextSymbol(Character nextSymbol) {
        this.nextSymbol = nextSymbol;
    }
}
