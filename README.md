# Cinema App

Aplikacja będzie napisana przy użyciu React z TypeScript (frontend) oraz Javy ze Spring Boot (backend). Będzie ona służyła do przeglądania repertuaru w kinie oraz rezerwacji miejsc na wybrany film oraz datę. Użytkownik będzie miał możliwość rejestracji/loginu oraz będzie do niego przypisana rola (USER/ADMIN). Dla administratora dodatkowo na stronie stworzony będzie panel z opcjami dodawania nowych filmów oraz zarządzania rezerwacjami wszystkich użytkowników.
Przewidywane usługi GCP:
- Google CloudSQL - baza danych z informacjami logowania/rejestracji użytkowników oraz z filmami i rezerwacjami
- Google Pub/Sub - wysyłanie notyfikacji emailowych do danego użytkownika z informacją o dokonanej rezerwacji
- Google Kubernetes Engine
