package org.example.GUI;

import java.awt.BorderLayout;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.SwingConstants;
import javax.swing.Timer;

public class ZeitbombeSwingTimer extends JFrame
        implements ActionListener {

    private Timer timer;
    private JButton btStartStopp = new JButton("Start");
    private JLabel ticker = new JLabel("Tick", SwingConstants.CENTER);
    private int sekunden = 10;

    public ZeitbombeSwingTimer() {
        setLayout(new BorderLayout());
        add(BorderLayout.SOUTH, btStartStopp);
        add(BorderLayout.CENTER, ticker);
        timer = new Timer(1000, this);
        timer.setRepeats(true); // immer wieder feuern!
        btStartStopp.addActionListener(this);
        setSize(200, 100);
        setVisible(true);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
    }

    @Override
    public void actionPerformed(ActionEvent e) {
        // Wer hat die Action losgetreten?
        if (e.getSource() == btStartStopp) { // Der Button!
            sekunden = 10;
            if (timer.isRunning()) {
                timer.stop();
                btStartStopp.setText("Start");
            } else {
                timer.start();
                btStartStopp.setText("Stopp");
                ticker.setText("" + sekunden);
            }
        } else { // Es muss wohl der Timer gewesen sein.
            sekunden--;
            if (sekunden == 0) {
                ticker.setText("Bumm");
                timer.stop();
                btStartStopp.setText("Start");
            } else {
                ticker.setText("" + sekunden);
            }
        }
    }

    public static void main(String[] args) {
        new ZeitbombeSwingTimer();
    }
}
