import java.io.*;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.Scanner;
import java.util.zip.GZIPInputStream;

class FindWords {
    public static void main(String[] args) throws IOException {
        var scanner = new Scanner(System.in);
        System.out.println("Поиск слов по встречающимся буквам.");
        System.out.println("Введите буквы:");
        var letters = scanner.next().toLowerCase();
        System.out.println("Введите максимальное число несовпадений:");
        var maxDiffCount = scanner.nextInt();
        System.out.println("Имя файла результата:");
        var resultFileName = scanner.next();

        var diffCounter = new DiffCounter(letters);
        var words = new ArrayList<Word>();
        try (var fileInputStream = FindWords.class.getClassLoader().getResourceAsStream("words.gz");
             var gzipInputStream = new GZIPInputStream(fileInputStream);
             var inputStreamReader = new InputStreamReader(gzipInputStream, "Windows-1251");
             var bufferedReader = new BufferedReader(inputStreamReader)) {

            String line;
            while ((line = bufferedReader.readLine()) != null) {
                var diffCount = diffCounter.calculateDiffCount(line.toLowerCase());
                if(diffCount <= maxDiffCount) {
                    words.add( new Word(line, diffCount));
                }
            }
        }
        words.sort(Comparator.comparingInt(Word::getDiffCount));
        try(var file = new FileWriter(resultFileName)) {
            for (var w : words) {
                System.out.println(w.getWord());
                file.write(w.getWord());
                file.write("\n");
            }
        }
    }
}
