package com.gcp.gcp_project;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessagePreparator;
import org.springframework.stereotype.Service;

import org.springframework.mail.javamail.MimeMessageHelper;

@Service
public class EmailService {
    @Autowired
    private JavaMailSender javaMailSender;

    public void sendEmail(String text) {
        String[] userData = text.split("\\|");

        MimeMessagePreparator preparator = message -> {
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setTo(userData[0]);
            helper.setSubject("CinemaApp - Rejestracja nowego użytkownika");
            helper.setText(createEmailContent(userData), true);
        };

        javaMailSender.send(preparator);
    }

    private String createEmailContent(String[] userData) {
        return "Zarejestrowano nowego użytkownika w serwisie CinemaApp.<br/><br/>" +
                "Dane użytkownika:<br/>" +
                "&nbsp;&nbsp;Login: " + userData[1] + "<br/>" +
                "&nbsp;&nbsp;Imię: " + userData[2] + "<br/>" +
                "&nbsp;&nbsp;Nazwisko: " + userData[3] + "<br/>" +
                "&nbsp;&nbsp;Numer telefonu: " + userData[4];
    }
}

