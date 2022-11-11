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
        String s = "Blah blah blah!!";
        MatchFinder matchFinder = new MatchFinder();
        Dictionary d = matchFinder.lookForMatch(s);
        ArrayList<Entry> list = d.getDictionary();
        for (Entry e : list){
            System.out.println(e.getOffset() +","+e.getLength()+","+ e.getNextSymbol());
        }
        Decoder decoder = new Decoder();
        String decodedString = decoder.decode(list);
        System.out.println(decodedString);
    }
}
