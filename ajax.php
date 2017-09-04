<? require_once($_SERVER['DOCUMENT_ROOT'] . '/bitrix/modules/main/include/prolog_before.php');

$type = strip_tags($_POST['type']);


// мод окно обратная связь
$arFeedbackModal = array('feedback_modal_init', 'feedback_modal_action', 'feedback_modal_success');

if ( in_array($type, $arFeedbackModal) ){
    $APPLICATION->IncludeComponent("develop:feedback.modal", "",
        Array(
            "type" => $type,
            "data" => $_POST['data'],
        )
    );
}


// мод окно заказа
$arOrderkModal = array('order_modal_init', 'order_modal_action', 'order_modal_success');

if ( in_array($type, $arOrderkModal) ){
    $APPLICATION->IncludeComponent("develop:order.modal", "",
        Array(
            "type" => $type,
            "data" => $_POST['data'],
        )
    );    
}


// форма обратной связи
$arFeedbackForm = array('feedback_form_init', 'feedback_form_action', 'feedback_form_success');

if ( in_array($type, $arFeedbackForm) ){
    $APPLICATION->IncludeComponent("develop:feedback.form", "",
        Array(
            "type" => $type,
            "data" => $_POST['data'],
        )
    );    
}