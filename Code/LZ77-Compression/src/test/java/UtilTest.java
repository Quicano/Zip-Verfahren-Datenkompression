import org.example.Util.Dictionary;
import org.example.Util.Entry;
import org.testng.Assert;
import org.testng.annotations.Test;

public class UtilTest {

    @Test
    public void newEntry(){
        Dictionary dictionary = new Dictionary();
        dictionary.createEntry(0,0,'e');
        char c = 'e';

        Entry entry = new Entry();
        entry.setOffset(3);
        entry.setLength(2);
        entry.setNextSymbol('p');
        dictionary.addEntry(entry);

        Assert.assertTrue(dictionary.getDictionary().get(0).getOffset() == 0);
        Assert.assertTrue(dictionary.getDictionary().get(0).getLength()== 0);
        Assert.assertTrue(dictionary.getDictionary().get(0).getNextSymbol() == c);

        Assert.assertTrue(dictionary.getDictionary().get(1).getOffset() == 3);
        Assert.assertTrue(dictionary.getDictionary().get(1).getLength()== 2);
        Assert.assertTrue(dictionary.getDictionary().get(1).getNextSymbol() == 'p');

    }

}
