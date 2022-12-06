package org.example.GUI;

<<<<<<< HEAD
import com.intellij.uiDesigner.core.GridConstraints;
import com.intellij.uiDesigner.core.GridLayoutManager;
=======
>>>>>>> fc217a4333ce5b6c98d6d18bb2833921c3530cfb
import org.example.Encoding.MatchFinder;
import org.example.Util.Dictionary;
import org.example.Util.Entry;

import javax.swing.*;
import javax.swing.table.DefaultTableModel;
import java.awt.*;
<<<<<<< HEAD
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.util.ArrayList;
import java.util.Vector;

public class MainFrame extends JFrame implements ActionListener {
=======
import java.util.ArrayList;
import java.util.Vector;

public class MainFrame extends JFrame {
>>>>>>> fc217a4333ce5b6c98d6d18bb2833921c3530cfb
    private JTextField inputText;
    private JTextField inputSearchBuffer;
    private JTextField inputLookaheadBuffer;
    private JTable dictionaryTable;
<<<<<<< HEAD
=======
    private JButton startButton;
>>>>>>> fc217a4333ce5b6c98d6d18bb2833921c3530cfb
    private JPanel mainPanel;
    private JButton nextButton;
    private JLabel lookaheadBufferLabel;
    private JButton fullForceButton;
    private JLabel searchBufferLabel;

<<<<<<< HEAD
    private String text;
    private int searchBufferLength;
    private int lookaheadBufferLength;

    private Timer timer;

=======
>>>>>>> fc217a4333ce5b6c98d6d18bb2833921c3530cfb
    public MainFrame() throws UnsupportedLookAndFeelException, ClassNotFoundException, InstantiationException, IllegalAccessException {
        MatchFinder matchFinder = new MatchFinder();

        UIManager.setLookAndFeel(UIManager.getSystemLookAndFeelClassName());

        setContentPane(mainPanel);
        setTitle("LZ77 - Demo Kit");
        setSize(800, 400);
        setDefaultCloseOperation(WindowConstants.EXIT_ON_CLOSE);
        setVisible(true);

<<<<<<< HEAD

        fullForceButton.addActionListener(e -> {
            text = inputText.getText();
            searchBufferLength = Integer.parseInt(inputSearchBuffer.getText());
            lookaheadBufferLength = Integer.parseInt(inputLookaheadBuffer.getText());
=======
        startButton.addActionListener(e -> {
            String text = inputText.getText();
            int searchBufferLength = Integer.parseInt(inputSearchBuffer.getText());
            int lookaheadBufferLength = Integer.parseInt(inputLookaheadBuffer.getText());
>>>>>>> fc217a4333ce5b6c98d6d18bb2833921c3530cfb

            Dictionary dictionary = matchFinder.lookForMatch(text, searchBufferLength, lookaheadBufferLength);
            ArrayList<Entry> list = dictionary.getDictionary();

            DefaultTableModel tableModel = new DefaultTableModel();
            tableModel.addColumn("offset");
            tableModel.addColumn("length");
            tableModel.addColumn("symbol");

            for (Entry entry : list) {
                Vector<Object> row = new Vector<>();
                row.add(entry.getOffset());
                row.add((entry.getLength()));
                row.add(entry.getNextSymbol());
                tableModel.addRow(row);
            }

            dictionaryTable.setModel(tableModel);
<<<<<<< HEAD
        });



        /*nextButton.addActionListener(e -> {
            text = inputText.getText();
            searchBufferLength = Integer.parseInt(inputSearchBuffer.getText());
            lookaheadBufferLength = Integer.parseInt(inputLookaheadBuffer.getText());



            searchBufferLabel.setText(text.substring(0, 10));
            lookaheadBufferLabel.setText(text.substring(10));
        });*/
    }

    @Override
    public void actionPerformed(ActionEvent e) {
        if (e.getSource() == nextButton) {
            searchBufferLabel.setText("Klappt");
            }
=======
            lookaheadBufferLabel.setText(text.split("Dübel")[0]);
            searchBufferLabel.setText(text.split("Dübel")[1]);
        });
>>>>>>> fc217a4333ce5b6c98d6d18bb2833921c3530cfb
    }

    {
// GUI initializer generated by IntelliJ IDEA GUI Designer
// >>> IMPORTANT!! <<<
// DO NOT EDIT OR ADD ANY CODE HERE!
        $$$setupUI$$$();
    }

    /**
     * Method generated by IntelliJ IDEA GUI Designer
     * >>> IMPORTANT!! <<<
     * DO NOT edit this method OR call it in your code!
     *
     * @noinspection ALL
     */
    private void $$$setupUI$$$() {
        mainPanel = new JPanel();
<<<<<<< HEAD
        mainPanel.setLayout(new GridLayoutManager(8, 6, new Insets(0, 0, 0, 0), -1, -1));
        final JLabel label1 = new JLabel();
        label1.setText("Dictionary:");
        mainPanel.add(label1, new GridConstraints(3, 4, 1, 2, GridConstraints.ANCHOR_WEST, GridConstraints.FILL_NONE, GridConstraints.SIZEPOLICY_FIXED, GridConstraints.SIZEPOLICY_FIXED, null, null, null, 0, false));
        final JSeparator separator1 = new JSeparator();
        mainPanel.add(separator1, new GridConstraints(2, 0, 1, 6, GridConstraints.ANCHOR_CENTER, GridConstraints.FILL_BOTH, GridConstraints.SIZEPOLICY_WANT_GROW, GridConstraints.SIZEPOLICY_WANT_GROW, null, null, null, 0, false));
        final JLabel label2 = new JLabel();
        label2.setText("Sliding Window:");
        mainPanel.add(label2, new GridConstraints(3, 0, 1, 3, GridConstraints.ANCHOR_WEST, GridConstraints.FILL_NONE, GridConstraints.SIZEPOLICY_FIXED, GridConstraints.SIZEPOLICY_FIXED, null, null, null, 0, false));
        nextButton = new JButton();
        nextButton.setText("Next");
        mainPanel.add(nextButton, new GridConstraints(7, 0, 1, 1, GridConstraints.ANCHOR_CENTER, GridConstraints.FILL_HORIZONTAL, GridConstraints.SIZEPOLICY_CAN_SHRINK | GridConstraints.SIZEPOLICY_CAN_GROW, GridConstraints.SIZEPOLICY_FIXED, null, null, null, 0, false));
        final JScrollPane scrollPane1 = new JScrollPane();
        mainPanel.add(scrollPane1, new GridConstraints(4, 4, 4, 2, GridConstraints.ANCHOR_CENTER, GridConstraints.FILL_BOTH, GridConstraints.SIZEPOLICY_CAN_SHRINK | GridConstraints.SIZEPOLICY_WANT_GROW, GridConstraints.SIZEPOLICY_CAN_SHRINK | GridConstraints.SIZEPOLICY_WANT_GROW, null, null, null, 0, false));
=======
        mainPanel.setLayout(new com.intellij.uiDesigner.core.GridLayoutManager(7, 6, new Insets(0, 0, 0, 0), -1, -1));
        final JLabel label1 = new JLabel();
        label1.setText("search Buffer:");
        mainPanel.add(label1, new com.intellij.uiDesigner.core.GridConstraints(0, 2, 1, 1, com.intellij.uiDesigner.core.GridConstraints.ANCHOR_WEST, com.intellij.uiDesigner.core.GridConstraints.FILL_NONE, com.intellij.uiDesigner.core.GridConstraints.SIZEPOLICY_FIXED, com.intellij.uiDesigner.core.GridConstraints.SIZEPOLICY_FIXED, null, new Dimension(72, 25), null, 0, false));
        inputText = new JTextField();
        inputText.setText("Gar nicht übel sprach der Dübel und verschwand in der Wand.");
        mainPanel.add(inputText, new com.intellij.uiDesigner.core.GridConstraints(1, 0, 1, 1, com.intellij.uiDesigner.core.GridConstraints.ANCHOR_WEST, com.intellij.uiDesigner.core.GridConstraints.FILL_HORIZONTAL, com.intellij.uiDesigner.core.GridConstraints.SIZEPOLICY_WANT_GROW, com.intellij.uiDesigner.core.GridConstraints.SIZEPOLICY_FIXED, null, new Dimension(150, 25), null, 0, false));
        final JLabel label2 = new JLabel();
        label2.setText("Text:");
        mainPanel.add(label2, new com.intellij.uiDesigner.core.GridConstraints(0, 0, 1, 1, com.intellij.uiDesigner.core.GridConstraints.ANCHOR_WEST, com.intellij.uiDesigner.core.GridConstraints.FILL_NONE, com.intellij.uiDesigner.core.GridConstraints.SIZEPOLICY_FIXED, com.intellij.uiDesigner.core.GridConstraints.SIZEPOLICY_FIXED, null, new Dimension(25, 25), null, 0, false));
        inputSearchBuffer = new JTextField();
        inputSearchBuffer.setText("5");
        mainPanel.add(inputSearchBuffer, new com.intellij.uiDesigner.core.GridConstraints(1, 2, 1, 1, com.intellij.uiDesigner.core.GridConstraints.ANCHOR_WEST, com.intellij.uiDesigner.core.GridConstraints.FILL_HORIZONTAL, com.intellij.uiDesigner.core.GridConstraints.SIZEPOLICY_WANT_GROW, com.intellij.uiDesigner.core.GridConstraints.SIZEPOLICY_FIXED, null, new Dimension(150, 25), null, 0, false));
        inputLookaheadBuffer = new JTextField();
        inputLookaheadBuffer.setText("4");
        mainPanel.add(inputLookaheadBuffer, new com.intellij.uiDesigner.core.GridConstraints(1, 4, 1, 1, com.intellij.uiDesigner.core.GridConstraints.ANCHOR_WEST, com.intellij.uiDesigner.core.GridConstraints.FILL_HORIZONTAL, com.intellij.uiDesigner.core.GridConstraints.SIZEPOLICY_WANT_GROW, com.intellij.uiDesigner.core.GridConstraints.SIZEPOLICY_FIXED, null, new Dimension(150, 25), null, 0, false));
        startButton = new JButton();
        startButton.setText("Start");
        mainPanel.add(startButton, new com.intellij.uiDesigner.core.GridConstraints(1, 5, 1, 1, com.intellij.uiDesigner.core.GridConstraints.ANCHOR_CENTER, com.intellij.uiDesigner.core.GridConstraints.FILL_HORIZONTAL, com.intellij.uiDesigner.core.GridConstraints.SIZEPOLICY_CAN_SHRINK | com.intellij.uiDesigner.core.GridConstraints.SIZEPOLICY_CAN_GROW, com.intellij.uiDesigner.core.GridConstraints.SIZEPOLICY_FIXED, null, new Dimension(78, 25), null, 0, false));
        final JLabel label3 = new JLabel();
        label3.setText("Dictionary");
        mainPanel.add(label3, new com.intellij.uiDesigner.core.GridConstraints(3, 4, 1, 1, com.intellij.uiDesigner.core.GridConstraints.ANCHOR_WEST, com.intellij.uiDesigner.core.GridConstraints.FILL_NONE, com.intellij.uiDesigner.core.GridConstraints.SIZEPOLICY_FIXED, com.intellij.uiDesigner.core.GridConstraints.SIZEPOLICY_FIXED, null, null, null, 0, false));
        final JSeparator separator1 = new JSeparator();
        mainPanel.add(separator1, new com.intellij.uiDesigner.core.GridConstraints(2, 0, 1, 6, com.intellij.uiDesigner.core.GridConstraints.ANCHOR_CENTER, com.intellij.uiDesigner.core.GridConstraints.FILL_BOTH, com.intellij.uiDesigner.core.GridConstraints.SIZEPOLICY_WANT_GROW, com.intellij.uiDesigner.core.GridConstraints.SIZEPOLICY_WANT_GROW, null, null, null, 0, false));
        final JLabel label4 = new JLabel();
        label4.setText("Text:");
        mainPanel.add(label4, new com.intellij.uiDesigner.core.GridConstraints(3, 0, 1, 3, com.intellij.uiDesigner.core.GridConstraints.ANCHOR_WEST, com.intellij.uiDesigner.core.GridConstraints.FILL_NONE, com.intellij.uiDesigner.core.GridConstraints.SIZEPOLICY_FIXED, com.intellij.uiDesigner.core.GridConstraints.SIZEPOLICY_FIXED, null, null, null, 0, false));
        nextButton = new JButton();
        nextButton.setText("Next");
        mainPanel.add(nextButton, new com.intellij.uiDesigner.core.GridConstraints(6, 0, 1, 1, com.intellij.uiDesigner.core.GridConstraints.ANCHOR_CENTER, com.intellij.uiDesigner.core.GridConstraints.FILL_HORIZONTAL, com.intellij.uiDesigner.core.GridConstraints.SIZEPOLICY_CAN_SHRINK | com.intellij.uiDesigner.core.GridConstraints.SIZEPOLICY_CAN_GROW, com.intellij.uiDesigner.core.GridConstraints.SIZEPOLICY_FIXED, null, null, null, 0, false));
        final JScrollPane scrollPane1 = new JScrollPane();
        mainPanel.add(scrollPane1, new com.intellij.uiDesigner.core.GridConstraints(4, 4, 3, 2, com.intellij.uiDesigner.core.GridConstraints.ANCHOR_CENTER, com.intellij.uiDesigner.core.GridConstraints.FILL_BOTH, com.intellij.uiDesigner.core.GridConstraints.SIZEPOLICY_CAN_SHRINK | com.intellij.uiDesigner.core.GridConstraints.SIZEPOLICY_WANT_GROW, com.intellij.uiDesigner.core.GridConstraints.SIZEPOLICY_CAN_SHRINK | com.intellij.uiDesigner.core.GridConstraints.SIZEPOLICY_WANT_GROW, null, null, null, 0, false));
>>>>>>> fc217a4333ce5b6c98d6d18bb2833921c3530cfb
        dictionaryTable = new JTable();
        scrollPane1.setViewportView(dictionaryTable);
        fullForceButton = new JButton();
        fullForceButton.setText("Full Force");
<<<<<<< HEAD
        mainPanel.add(fullForceButton, new GridConstraints(7, 2, 1, 1, GridConstraints.ANCHOR_CENTER, GridConstraints.FILL_HORIZONTAL, GridConstraints.SIZEPOLICY_CAN_SHRINK | GridConstraints.SIZEPOLICY_CAN_GROW, GridConstraints.SIZEPOLICY_FIXED, null, null, null, 0, false));
        final JSeparator separator2 = new JSeparator();
        separator2.setOrientation(1);
        mainPanel.add(separator2, new GridConstraints(5, 1, 2, 1, GridConstraints.ANCHOR_CENTER, GridConstraints.FILL_BOTH, GridConstraints.SIZEPOLICY_WANT_GROW, GridConstraints.SIZEPOLICY_WANT_GROW, null, null, null, 0, false));
        lookaheadBufferLabel = new JLabel();
        lookaheadBufferLabel.setHorizontalAlignment(4);
        lookaheadBufferLabel.setText("LookaheadBuffer");
        mainPanel.add(lookaheadBufferLabel, new GridConstraints(5, 2, 1, 1, GridConstraints.ANCHOR_WEST, GridConstraints.FILL_NONE, GridConstraints.SIZEPOLICY_FIXED, GridConstraints.SIZEPOLICY_FIXED, null, new Dimension(90, 206), null, 0, false));
        searchBufferLabel = new JLabel();
        searchBufferLabel.setHorizontalAlignment(2);
        searchBufferLabel.setText("SearchBuffer");
        mainPanel.add(searchBufferLabel, new GridConstraints(5, 0, 1, 1, GridConstraints.ANCHOR_WEST, GridConstraints.FILL_NONE, GridConstraints.SIZEPOLICY_FIXED, GridConstraints.SIZEPOLICY_FIXED, null, new Dimension(67, 206), null, 0, false));
        final JLabel label3 = new JLabel();
        label3.setText("Text:");
        mainPanel.add(label3, new GridConstraints(0, 4, 1, 2, GridConstraints.ANCHOR_WEST, GridConstraints.FILL_NONE, GridConstraints.SIZEPOLICY_FIXED, GridConstraints.SIZEPOLICY_FIXED, null, new Dimension(25, 25), null, 0, false));
        inputText = new JTextField();
        inputText.setText("Gar nicht übel sprach der Dübel und verschwand in der Wand.");
        mainPanel.add(inputText, new GridConstraints(1, 4, 1, 2, GridConstraints.ANCHOR_WEST, GridConstraints.FILL_HORIZONTAL, GridConstraints.SIZEPOLICY_WANT_GROW, GridConstraints.SIZEPOLICY_FIXED, null, new Dimension(150, 25), null, 0, false));
        inputLookaheadBuffer = new JTextField();
        inputLookaheadBuffer.setText("4");
        mainPanel.add(inputLookaheadBuffer, new GridConstraints(1, 2, 1, 1, GridConstraints.ANCHOR_WEST, GridConstraints.FILL_HORIZONTAL, GridConstraints.SIZEPOLICY_WANT_GROW, GridConstraints.SIZEPOLICY_FIXED, null, new Dimension(150, 25), null, 0, false));
        inputSearchBuffer = new JTextField();
        inputSearchBuffer.setText("5");
        mainPanel.add(inputSearchBuffer, new GridConstraints(1, 0, 1, 1, GridConstraints.ANCHOR_WEST, GridConstraints.FILL_HORIZONTAL, GridConstraints.SIZEPOLICY_WANT_GROW, GridConstraints.SIZEPOLICY_FIXED, null, new Dimension(150, 25), null, 0, false));
        final JLabel label4 = new JLabel();
        label4.setText("search Buffer:");
        mainPanel.add(label4, new GridConstraints(0, 0, 1, 1, GridConstraints.ANCHOR_WEST, GridConstraints.FILL_NONE, GridConstraints.SIZEPOLICY_FIXED, GridConstraints.SIZEPOLICY_FIXED, null, new Dimension(72, 25), null, 0, false));
        final JLabel label5 = new JLabel();
        label5.setText("lookahead Buffer:");
        mainPanel.add(label5, new GridConstraints(0, 2, 1, 1, GridConstraints.ANCHOR_WEST, GridConstraints.FILL_NONE, GridConstraints.SIZEPOLICY_FIXED, GridConstraints.SIZEPOLICY_FIXED, null, new Dimension(93, 25), null, 0, false));
=======
        mainPanel.add(fullForceButton, new com.intellij.uiDesigner.core.GridConstraints(6, 2, 1, 1, com.intellij.uiDesigner.core.GridConstraints.ANCHOR_CENTER, com.intellij.uiDesigner.core.GridConstraints.FILL_HORIZONTAL, com.intellij.uiDesigner.core.GridConstraints.SIZEPOLICY_CAN_SHRINK | com.intellij.uiDesigner.core.GridConstraints.SIZEPOLICY_CAN_GROW, com.intellij.uiDesigner.core.GridConstraints.SIZEPOLICY_FIXED, null, null, null, 0, false));
        final JSeparator separator2 = new JSeparator();
        separator2.setOrientation(1);
        mainPanel.add(separator2, new com.intellij.uiDesigner.core.GridConstraints(5, 1, 1, 1, com.intellij.uiDesigner.core.GridConstraints.ANCHOR_CENTER, com.intellij.uiDesigner.core.GridConstraints.FILL_BOTH, com.intellij.uiDesigner.core.GridConstraints.SIZEPOLICY_WANT_GROW, com.intellij.uiDesigner.core.GridConstraints.SIZEPOLICY_WANT_GROW, null, null, null, 0, false));
        searchBufferLabel = new JLabel();
        searchBufferLabel.setHorizontalAlignment(2);
        searchBufferLabel.setText("SearchBuffer");
        mainPanel.add(searchBufferLabel, new com.intellij.uiDesigner.core.GridConstraints(5, 2, 1, 1, com.intellij.uiDesigner.core.GridConstraints.ANCHOR_WEST, com.intellij.uiDesigner.core.GridConstraints.FILL_NONE, com.intellij.uiDesigner.core.GridConstraints.SIZEPOLICY_FIXED, com.intellij.uiDesigner.core.GridConstraints.SIZEPOLICY_FIXED, null, null, null, 0, false));
        lookaheadBufferLabel = new JLabel();
        lookaheadBufferLabel.setHorizontalAlignment(4);
        lookaheadBufferLabel.setText("LookaheadBuffer");
        mainPanel.add(lookaheadBufferLabel, new com.intellij.uiDesigner.core.GridConstraints(5, 0, 1, 1, com.intellij.uiDesigner.core.GridConstraints.ANCHOR_WEST, com.intellij.uiDesigner.core.GridConstraints.FILL_NONE, com.intellij.uiDesigner.core.GridConstraints.SIZEPOLICY_FIXED, com.intellij.uiDesigner.core.GridConstraints.SIZEPOLICY_FIXED, null, null, null, 0, false));
        final JLabel label5 = new JLabel();
        label5.setText("lookahead Buffer:");
        mainPanel.add(label5, new com.intellij.uiDesigner.core.GridConstraints(0, 4, 1, 1, com.intellij.uiDesigner.core.GridConstraints.ANCHOR_WEST, com.intellij.uiDesigner.core.GridConstraints.FILL_NONE, com.intellij.uiDesigner.core.GridConstraints.SIZEPOLICY_FIXED, com.intellij.uiDesigner.core.GridConstraints.SIZEPOLICY_FIXED, null, new Dimension(93, 25), null, 0, false));
>>>>>>> fc217a4333ce5b6c98d6d18bb2833921c3530cfb
    }

    /**
     * @noinspection ALL
     */
    public JComponent $$$getRootComponent$$$() {
        return mainPanel;
    }

<<<<<<< HEAD

=======
>>>>>>> fc217a4333ce5b6c98d6d18bb2833921c3530cfb
}
