<?if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) die();

$arResult['type'] = $arParams['type'];


//
// Инициализация шаблона формы / успешная отправка
//
    
if( $arResult['type'] == 'order_modal_init' || $arResult['type'] == 'order_modal_success' ){
       
    // дополнительный параметр при запуске формы
    $arResult['more_param'] = strip_tags($arParams['data']['more_param']);
    
    // подключаем шаблон
    $this->IncludeComponentTemplate();
    
}

//
// отправка данных формы
//

elseif( $arResult['type'] == 'order_modal_action' ) {
    
    // имя    
    $name = strip_tags($arParams['data']['name']);
    
    // контактный email
    $email = strip_tags($arParams['data']['email']);
    
    // контактный номер
    $phone = strip_tags($arParams['data']['phone']);
    
    // сообщение
    $message = strip_tags($arParams['data']['message']);

    // доп параметр при запуске мод окна
    $more_param = strip_tags($arParams['data']['more_param']);
    
    
    //
    // Проверка ошибок
    //

    if ( mb_strlen($name, "UTF-8") == 0 ) {
        $arResult['errors']['name'] = 'Введите имя';
    }elseif( mb_strlen($name, "UTF-8" ) < 2){
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
    
    if ( !$arResult['errors'] ) {
    
        
        //
        // Отправка письма
        //

        $arFields = array(
            'NAME' => $name,
            'EMAIL' => $email,
            'PHONE' => $phone,
            'MESSAGE' => $message,
        );

        CEvent::SendImmediate('ORDER_FORM', 's1', $arFields, $Duplicate = "N");
             
        
        // показываем модальное окно об успешной отправке
        $arResult['SUCCESS_TYPE'] = 'order_modal_success';
        
        // заголовок окна об успешной отправке
        $arResult['SUCCESS_TITLE'] = 'Заявка успешно отправлена';
        
        if( $more_param ){
            $arResult['MORE_PARAM'] = $more_param;
        }
        
        $arResult['result'] = 'ok';
      
    }
    
    echo json_encode($arResult);
}
?>