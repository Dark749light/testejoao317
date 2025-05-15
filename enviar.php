<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Honeypot: se preenchido, é spam
    if (!empty($_POST["telefone"])) {
        http_response_code(403);
        echo "Spam detectado.";
        exit;
    }

    // Limpeza e validação dos dados
    $nome = strip_tags(trim($_POST["nome"] ?? ""));
    $email = filter_var(trim($_POST["email"] ?? ""), FILTER_SANITIZE_EMAIL);
    $mensagem = strip_tags(trim($_POST["mensagem"] ?? ""));

    // Verifica se os campos estão preenchidos
    if (empty($nome) || empty($email) || empty($mensagem)) {
        http_response_code(400);
        echo "Por favor, preencha todos os campos.";
        exit;
    }

    // Valida e-mail
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo "E-mail inválido.";
        exit;
    }

    // Dados do e-mail
    $destinatario = "ti@samacontabil.com.br";
    $assunto = "Nova mensagem do site";

    $corpo = "Nome: $nome\n";
    $corpo .= "Email: $email\n\n";
    $corpo .= "Mensagem:\n$mensagem\n";

    $headers = "From: $nome <$email>\r\n";
    $headers .= "Reply-To: $email\r\n";

    // Envia o e-mail
    if (mail($destinatario, $assunto, $corpo, $headers)) {
        echo "OK";
    } else {
        http_response_code(500);
        echo "Falha ao enviar o e-mail.";
    }
}
?>
