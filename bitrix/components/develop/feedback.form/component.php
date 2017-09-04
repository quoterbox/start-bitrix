<?if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) die();

$arResult['type'] = $arParams['type'];


//
// Инициализация шаблона формы / успешная отправка
//
    
if($arResult['type'] == 'feedback_form_init' || $arResult['type'] == 'feedback_form_success'){
    
    // подключаем шаблон
    $this->IncludeComponentTemplate();
    
}

//
// отправка данных формы
//

elseif ($arResult['type'] == 'feedback_form_action') {
    
    // имя    
    $name = strip_tags($arParams['data']['name']);
    
    // тема сообщения
    $subject = strip_tags($arParams['data']['subject']);
    
    // контактный email
    $email = strip_tags($arParams['data']['email']);
    
    // контактный номер
    $phone = strip_tags($arParams['data']['phone']);
    
    // сообщение
    $message = strip_tags($arParams['data']['message']);
    
    
    //
    // Проверка ошибок
    //
   
    if (mb_strlen($name, "UTF-8") == 0) {
        $arResult['errors']['name'] = 'Введите имя';
    }elseif(mb_strlen($name, "UTF-8") < 2){
        $arResult['errors']['name'] = 'Неверно введено имя';
    }
    
    if ( strlen($email) == 0 ) {
        $arResult['errors']['email'] = 'Введите e-mail';
    }elseif( !filter_var($email, FILTER_VALIDATE_EMAIL ) ){
        $arResult['errors']['email'] = 'Неверный e-mail';
    }
    
    if ( mb_strlen($message, "UTF-8") == 0 ) {
        $arResult['errors']['message'] = 'Напишите сообщение';
    }elseif( mb_strlen($message, "UTF-8" ) < 3){
        $arResult['errors']['message'] = 'Напишите подробнее';
    }
        

    //
    // Если нет ошибок
    //
    
    if (!$arResult['errors']) {
 
        //
        // Отправка письма
        //

        $arFields = array(
            'NAME' => $name,
            'SUBJECT' => $subject,
            'EMAIL' => $email,
            'PHONE' => $phone,
            'MESSAGE' => $message,            
        );

        CEvent::SendImmediate('FEEDBACK_FORM_CONTACTS', 's1', $arFields, $Duplicate = "N"); 
        
        // показываем модальное окно об успешной отправке
        $arResult['SUCCESS_TYPE'] = 'feedback_form_success';
        
        // заголовок окна об успешной отправке
        $arResult['SUCCESS_TITLE'] = 'Заявка успешно отправлена';
        
        $arResult['result'] = 'ok';      
    }
    
    echo json_encode($arResult);   
    
}
?>