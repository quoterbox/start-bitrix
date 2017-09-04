<?
if (!defined('B_PROLOG_INCLUDED') || B_PROLOG_INCLUDED !== true)
    die();
?>
<!DOCTYPE html>
<html>
    <head>
        <? $APPLICATION->ShowHead(); ?>
        <title><? $APPLICATION->ShowTitle(); ?></title>
        <link rel="shortcut icon" type="image/x-icon" href="/favicon.png" /> 	
        <?
        $APPLICATION->IncludeComponent("bitrix:main.include", "", Array(
            "AREA_FILE_SHOW" => "file",
            "PATH" => "/_include/for_all_pages.php",
            "AREA_FILE_SUFFIX" => "inc",
            "AREA_FILE_RECURSIVE" => "N",
            "EDIT_TEMPLATE" => ""
                )
        );
        ?>	
    </head>
    <body>
        <?
        global $USER;
        if ($USER->IsAdmin() ):?>
            <div id="panel">
                <?$APPLICATION->ShowPanel();?>
            </div>
        <?endif?>
        
        <? 
        $url = $APPLICATION->GetCurPage(false);
        if ($url === '/' || $url === '/index.php') {
            $page_class = 'main_page';
        }
        ?>
        
        <?/*
        // меню для маленьких экранов
        // основное меню
        $APPLICATION->IncludeComponent(
                "bitrix:menu", "mobile_main_catalog", Array(
            "ROOT_MENU_TYPE" => "mobile",
            "CHILD_MENU_TYPE" => "catalog",
            "MAX_LEVEL" => "3",
            "USE_EXT" => "Y",
            "MENU_CACHE_TYPE" => "A",
            "MENU_CACHE_TIME" => "36000",
            "MENU_CACHE_USE_GROUPS" => "Y",
            "MENU_CACHE_GET_VARS" => Array()
                )
        );
        */?>

        
        <?//обертка для использования мобильного меню?>
        <div id="page_container">

            <div class="page_wrapper <?$APPLICATION->ShowProperty("page_class");?>">

                <header>
                    <?
                    $APPLICATION->IncludeComponent("bitrix:main.include", "", Array(
                        "AREA_FILE_SHOW" => "file",
                        "PATH" => "/_include/header.php",
                        "AREA_FILE_SUFFIX" => "inc",
                        "AREA_FILE_RECURSIVE" => "N",
                        "EDIT_TEMPLATE" => ""
                            )
                    );
                    ?>                
                </header>

                <div class="wrap_container">
                    <div class="content">

                        <?if($page_class != "main_page"):?>

                            <div class="breadcrumb_wrap">
                                <div class="container">
                                <?
                                if(ERROR_404 != 'Y'){
                                    $APPLICATION->IncludeComponent("bitrix:breadcrumb","breadcrumb",Array(
                                            "START_FROM" => "0",
                                            "PATH" => "",
                                            "SITE_ID" => "s1"
                                        )
                                    );
                                }
                                ?> 
                                </div>
                            </div>
                            <div class="container page_header_container">
                            </div>
                        <? endif; ?>

