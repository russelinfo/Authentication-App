Feature: Inscription utilisateur

  En tant qu'utilisateur
  Je veux créer un compte
  Afin de pouvoir me connecter à l'application

  Scenario: Inscription réussie avec des identifiants valides
    Given le serveur est démarré
    When il envoie une requête POST à "/register" avec
      | email                | password  |
      | integration@test.com | Abcdef1!  |
    Then la réponse a le status 201
    And le message retourné est "Utilisateur créé avec succès"

  Scenario: Échec si l'email existe déjà
    Given le serveur est démarré
    When il envoie une requête POST à "/register" avec
      | email                | password  |
      | integration@test.com | Abcdef1!  |
    And il envoie une requête POST à "/register" avec
      | email                | password  |
      | integration@test.com | Abcdef1!  |
    Then la réponse a le status 400
    And le message d'erreur est "Email déjà utilisé"