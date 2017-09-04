<?
if(!defined('B_PROLOG_INCLUDED') || B_PROLOG_INCLUDED !== true)
	die();
?>
                </div><? //content?>        
            </div><? //container?>

            <footer>
                <?
                $APPLICATION->IncludeComponent("bitrix:main.include", "", Array(
                        "AREA_FILE_SHOW" => "file",
                        "PATH" => "/_include/footer.php",
                        "AREA_FILE_SUFFIX" => "inc",
                        "AREA_FILE_RECURSIVE" => "N",
                        "EDIT_TEMPLATE" => ""
                    )
                );
                ?>
            </footer>
        </div><? //page_wrapper?>

    </div><? //page_container?>

<?
//
// Подключение скриптов после всего остального
//
$APPLICATION->IncludeComponent("bitrix:main.include", "", Array(
        "AREA_FILE_SHOW" => "file",
        "PATH" => "/_include/scripts_before_body.php",
        "AREA_FILE_SUFFIX" => "inc",
        "AREA_FILE_RECURSIVE" => "N",
        "EDIT_TEMPLATE" => ""
    )
);
?>
</body>
</html>