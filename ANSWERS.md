<!-- Answers to the Short Answer Essay Questions go here -->

1. What is the purpose of using _sessions_?
Sessions enable you to log in to a server on a website once and stay logged in over multiple requests. It's a way of providing state to an otherwise stateless protocol, HTTP.
2. What does bcrypt do to help us store passwords in a secure manner.
Bcrypt hashes (one-way encrypts) your password and then hashes the hash multiple times.
3. What does bcrypt do to slow down attackers?
It runs multiple times and add salt to every hash.
4. What are the three parts of the JSON Web Token?
The header, the payload, and the signature.