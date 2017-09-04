<?if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) die();

//
// Инициализация формы
//

if ( $arResult['type'] == 'order_modal_init' ):?>

    <form class="feedback_modal_form simple_form" action="" data-action="order_modal_action">
        
        <?if( $arResult['more_param'] ):?>
            <input type="hidden" name="more_param" value="<?=$arResult['more_param']?>" />
        <?endif?>
        
        <div class="inputs">
            <div class="wrap_field">
                <div class="wrap_title">Ваше имя</div>
                <div class="wrap_input">
                    <input type="text" name="name" value=""/>
                </div>
            </div>
            <div class="wrap_field">
                <div class="wrap_title">Контактный телефон</div>
                <div class="wrap_input">
                    <input class="phone" type="text" name="phone" value=""/>
                </div>
            </div>
            <div class="wrap_field">
                <div class="wrap_title">Контактный email</div>
                <div class="wrap_input">
                    <input type="text" name="email" value=""/>
                </div>
            </div>
            <div class="wrap_field">
                <div class="wrap_title">Комментарий</div>
                <div class="wrap_input">
                    <textarea type="text" name="message" placeholder="Расскажите подробнее какого вида услуга Вам требуется"></textarea>
                </div>
            </div>
            <div class="wrap_field wrap_btn">
                <input class="button green" type="submit" value="Отправить"/>
            </div>
        </div>
    </form>

<?
//
// Сообщение об успешной отправке формы
//

elseif($arResult['type'] == 'order_modal_success'):?>

    <div class="success_form">
        <?/*<p class="text">Ваша заявка<br/> успешно отправлена</p>*/?>
        <p class="manager_text">В ближайшее время мы свяжемся с Вами<br/> по указанным контактным данным.</p>
    </div>

<?endif?>