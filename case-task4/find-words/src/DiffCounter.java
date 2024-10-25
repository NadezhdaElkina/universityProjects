import java.util.HashMap;
import java.util.HashSet;

public class DiffCounter {
    private HashMap<Character, Integer> charCounts;

    public DiffCounter(String letters) {
        charCounts = getCharCounts(letters);
    }

    private static HashMap<Character, Integer> getCharCounts(String letters) {
        var charCounts = new HashMap<Character, Integer>();
        for (var i = 0; i < letters.length(); ++i) {
            var c = letters.charAt(i);
            if (charCounts.containsKey(c)) {
                charCounts.put(c, charCounts.get(c) + 1);
            } else {
                charCounts.put(c, 1);
            }
        }
        return charCounts;
    }

    public int calculateDiffCount(String word) {
        var wordCharCounts = getCharCounts(word);
        var diffCount = 0;
        for (var c : wordCharCounts.keySet()) {
            if (charCounts.containsKey(c))
            {
                diffCount += Math.abs(wordCharCounts.get(c) - charCounts.get(c));
            } else {
                diffCount += wordCharCounts.get(c);
            }
        }
        for (var c : charCounts.keySet()) {
            if (!wordCharCounts.containsKey(c)) {
                diffCount += charCounts.get(c);
            }
        }
        return diffCount;
    }
}
