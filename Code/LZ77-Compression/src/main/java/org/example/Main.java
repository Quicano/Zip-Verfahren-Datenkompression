package org.example;

import org.example.Encoding.MatchFinder;
import org.example.GUI.MainFrame;
import org.example.Util.Dictionary;
import org.example.Util.Entry;

import javax.swing.*;
import java.util.ArrayList;
import java.util.Scanner;

public class Main {
    /*public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        MatchFinder matchFinder = new MatchFinder();

        System.out.println("Enter Text:");
        String text = scanner.nextLine();
        System.out.println("Enter length of search buffer:");
        int searchBufferLength = scanner.nextInt();
        System.out.println("Enter length of lookahead buffer:");
        int lookaheadBufferLength = scanner.nextInt();

        Dictionary dictionary = matchFinder.lookForMatch(text, searchBufferLength, lookaheadBufferLength);
        ArrayList<Entry> list = dictionary.getDictionary();
        for (Entry e : list){
            System.out.println(e.getOffset() +","+e.getLength()+","+ e.getNextSymbol());
        }

    }*/

    public static void main(String[] args) throws UnsupportedLookAndFeelException, ClassNotFoundException, InstantiationException, IllegalAccessException {
        MainFrame mainFrame = new MainFrame();
    }
}