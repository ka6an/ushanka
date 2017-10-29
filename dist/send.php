<?php
$to = 'leshka3333@mail.ru, info@ushanka.design';
$subject = 'Заявка с ushanka';
$message = '
        <html>
            <head>
                <title>'.$subject.'</title>
            </head>
            <body>
                <p>Имя: '.$_POST['name'].'</p>
                <p>email: '.$_POST['email'].'</p>
                <p>Телефон: '.$_POST['phone'].'</p>   
                <p>Сообщение: '.$_POST['text'].'</p>                        
            </body>
        </html>';
$headers  = "Content-type: text/html; charset=utf-8 \r\n";
$headers .= "From: Отправитель <from@example.com>\r\n";
mail($to, $subject, $message, $headers);
?>