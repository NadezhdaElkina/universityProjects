public class Word {
    private final String word;
    private final int diffCount;

    public Word(String word, int diffCount) {

        this.word = word;
        this.diffCount = diffCount;
    }

    public String getWord() {
        return word;
    }

    public int getDiffCount() {
        return diffCount;
    }
}
