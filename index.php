<?
require($_SERVER["DOCUMENT_ROOT"]."/bitrix/header.php");
$APPLICATION->SetTitle("Интернет-магазин \"Одежда\"");
?>

<div class="container">
    <div class="row">
        <div class="col-lg-4">
            <h1>Сборка стартового проекта левая колонка</h1>
        </div>
        <div class="col-lg-4">
            <h1>Сборка стартового проекта средняя колонка</h1>
        </div>   
        <div class="col-lg-4">
            <h1>Сборка стартового проекта правая колонка</h1>
        </div>
    </div>
    <div class="row">
        <div class="col-lg-4 col-lg-offset-4">
            <div class="wrap_btn mt_50 mb_50">
                <div class="button green show_modal" data-modal__type="order_modal_init" data-modal__title="Заказать обычную типичную скорую услугу">Показать модальное окно</div> 
            </div>
        </div>
    </div>    
    <div class="row mb_50">
        <div class="col-lg-6 col-lg-offset-3">
            <?
            // форма обратной связи
            $APPLICATION->IncludeComponent("develop:feedback.form", "",
                Array(
                    "type" => "feedback_form_init",
                )
            );
            ?>
        </div>
    </div>   
    
</div>

<?require($_SERVER["DOCUMENT_ROOT"]."/bitrix/footer.php");?>