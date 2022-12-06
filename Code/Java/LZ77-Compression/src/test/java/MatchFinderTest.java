import org.example.Decoding.Decoder;
import org.example.Encoding.MatchFinder;
import org.example.Util.Dictionary;
import org.example.Util.Entry;
import org.testng.Assert;
import org.testng.annotations.Test;

import java.util.ArrayList;

public class MatchFinderTest {

    @Test
    public void testExampleString(){
        String s = "aacaacabcabaaac";
        MatchFinder matchFinder = new MatchFinder();
        Dictionary d = matchFinder.lookForMatch(s, 100, 100);
        ArrayList<Entry> list = d.getDictionary();
        for (Entry e : list){
            System.out.println(e.getOffset() +","+e.getLength()+","+ e.getNextSymbol());
        }
        Decoder decoder = new Decoder();
        String decodedString = decoder.decode(list);
        System.out.println(decodedString);
    }

    @Test
    public void testRandomString(){
        /*String s = "Hier Testet ihr Hier hier der String";
        MatchFinder matchFinder = new MatchFinder();
        Dictionary d = matchFinder.lookForMatch(s, 5, 4);
        ArrayList<Entry> list = d.getDictionary();
        for (Entry e : list){
            System.out.println(e.getOffset() +","+e.getLength()+","+ e.getNextSymbol());
        }
        Decoder decoder = new Decoder();
        String decodedString = decoder.decode(list);
        System.out.println(decodedString);*/
    }
}
