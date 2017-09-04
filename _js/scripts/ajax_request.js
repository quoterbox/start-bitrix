$(function() {
    new ajaxRequest();
});

function ajaxRequest() {
    this.init();
}

$.fn.serializeObject = function() {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};

ajaxRequest.prototype = {
    type: '',
    container: null,
    do_object: null,
    send_ajax_data: null,
    error_block: '<div class="error"><div class="errortext"></div></div>',
    init: function() {
        
        // общий контейнер
        this.container = $('#page_container .page_wrapper');
        
        // отлавливание событий
        this.startAction();
    },
       
    
    //
    // подгрузка плагинов после ajax запроса
    //
    
    loadPlugins: function(){
        
        // formstyler
        $('.styler').styler();
        
        // maskedinput
        $('input.phone').mask("+7 (999) 999-99-99");
    },
    
    
    //
    // Клик по отслеживаемому элементу
    //
    
    startAction: function(){
        
        var _this = this;
        
        //console.log('start action');
        
        _this.container.on('click', '[data-do_action="ajax_request"]', function(){
            
            //console.log('click start action');
            
            _this.do_object = $(this);
            _this.type = $(this).data('do_type');
            var _more_param = $(this).data('do_more_param');
            
            _this.routeAction( _more_param);
            
        });
        
    },
    
    
    //
    // Функция для перенаправления запросов, изменения данных до их отправки
    //
    
    routeAction: function(_more_param){
        
        var _this = this;        
        
        //console.log('start routing');
        
        // добавить/удалить в понравившиеся из каталога
        if( (_this.type === "add_like_project" || _this.type === "remove_like_project") && _more_param === "catalog" ){
            
            _this.send_ajax_data = {
                id_project: _this.do_object.closest('.product_item').data('id_project'),
                more_param: _more_param
            };
        
        // добавить/удалить в понравившиеся с детальной страницы проекта
        }else if( (_this.type === "add_like_project" || _this.type === "remove_like_project") && _more_param === "detail_page" ){
            
            _this.send_ajax_data = {
                id_project: _this.do_object.closest('.catalog_element').data('id_project'),
                more_param: _more_param
            };
            
        }
        
        // отправляем данные на сервер
        _this.sendData();
        
    },
    
    
    //
    // Отправка данных на сервер
    //
    
    sendData: function(){
        
        var _this = this;

        //console.log('start send data');

        $.ajax({
            url: '/ajax.php',
            type: 'POST',
            dataType: 'json',
            data: {
                type: _this.type,
                data: _this.send_ajax_data,
            },
        }).done(function (data) {
            
            //console.log('recive responce after sending data');
            //console.log(data);

            if (data.errors) {

                // скрываем старые ошибки
                
                // показываем новые ошибки

            } else {
                
                // изменения страницы после успешной отправки формы
                _this.successChanges(data.SUCCESS_TYPE, data.SUCCESS_TITLE, data.MORE_PARAM);
                
            }
            
            // удаляем данные
            _this.send_ajax_data = null;
        });
        
    },   
    
    
    //
    // Изменения на странице после успешной отправки формы
    //
    
    successChanges: function(_SUCCESS_TYPE, _SUCCESS_TITLE, _MORE_PARAM){
        
        var _this = this;
        
        //console.log('start succes changes');
        
        
        //
        // если необходимо показать модальное окно с сообщением
        //
        
        if( _SUCCESS_TYPE ){
            
            _this.type = _SUCCESS_TYPE;

            // показываем сообщение об успешном действии
            _this.showModalSuccess(_SUCCESS_TITLE, _MORE_PARAM);

        }
        
        
        //
        // Если необходимо выполнить дополнительные действия
        //

        // изменения после добавления проекта в понравившиеся
        if( _this.type === "add_like_project" ){
            
            // если открыта общая страница каталога
            if( _MORE_PARAM.FROM_PAGE === "catalog"){
                
                // добавляем класс к понравившемуся проекту
                _this.do_object.closest('.product_item').addClass('is_like');
                
                // добавляем возможность удалить из понравившихся
                _this.do_object.data('do_type', "remove_like_project");
                
                // обновляем кол-во в шапке
                _this.container.find('.top_ilike .ilike_icon .counter').text(_MORE_PARAM.COUNT);
                                
            // если окно открыто на странице проекта
            }else if( _MORE_PARAM.FROM_PAGE === "detail_page"){
                
                // добавляем класс к понравившемуся проекту
                _this.do_object.closest('.catalog_element').addClass('is_like');
                
                // добавляем возможность удалить из понравившихся
                _this.do_object.data('do_type', "remove_like_project");
                
                // обновляем кол-во в шапке
                _this.container.find('.top_ilike .ilike_icon .counter').text(_MORE_PARAM.COUNT);
                
            }
            
        // изменения после удаления проекта из понравившихся
        }else if( _this.type === "remove_like_project" ){
            
            // если открыта общая страница каталога
            if( _MORE_PARAM.FROM_PAGE === "catalog"){
                
                // добавляем класс к понравившемуся проекту
                _this.do_object.closest('.product_item').removeClass('is_like');
                
                // добавляем возможность удалить из понравившихся
                _this.do_object.data('do_type', "add_like_project");
                
                // обновляем кол-во в шапке
                _this.container.find('.top_ilike .ilike_icon .counter').text(_MORE_PARAM.COUNT);

            // если окно открыто на странице проекта
            }else if( _MORE_PARAM.FROM_PAGE === "detail_page"){
                
                // добавляем класс к понравившемуся проекту
                _this.do_object.closest('.catalog_element').removeClass('is_like');
                
                // добавляем возможность удалить из понравившихся
                _this.do_object.data('do_type', "add_like_project");
                
                // обновляем кол-во в шапке
                _this.container.find('.top_ilike .ilike_icon .counter').text(_MORE_PARAM.COUNT);
                
            }
            
        }
        
        
    },
    

    //
    // Сообщение об успешной отправке
    //
    
    showModalSuccess: function( _SUCCESS_TITLE, _MORE_PARAM ){
        
        var _this = this;
        
        //console.log('start show modal success');
        
        
        // если ранее было создано модальное окно, то заменяем в нем контент
        if(_this.modal){
            
            //console.log('show modal success already exist');
            
            _this.modal.setTitle(_SUCCESS_TITLE).ajax({
                url: '/ajax.php',
                data: {
                    type: _this.type,
                },
                type: 'POST',
                reload: true,
                getData: 'data-ajax',
                setContent: true,
                spinner: true,
                complete: function () {

                    // изменяем ширину окна и скрываем кнопку закрытия
                    _this.modal.setWidth(359);
                    $('.modal_window').addClass('success').find('.jBox-closeButton').css('display','none');

                    // подгрузка плагинов
                    _this.loadPlugins();
                },
            });

        // если на странице не было мод. окна, то создаем новое
        }else{
            
            //console.log('show new modal');

            _this.showModal(_SUCCESS_TITLE, _MORE_PARAM);

        }
                    
    },
    
    
    //
    // показать модальные окна 
    //
    
    showModal: function( _title, _more_param ){

        var _this = this;

        // сброс функции, выполняющейся после закрытия мод окна
        _this.afterCloseModal = function(){};

        if(!_title){
            _title = 'Информация';
        }

        var _data = {};
        if(_more_param){

        }

        var _width = 320;
        var _fixed = true;
        var _blockScroll = true;
        var _position = {};

        // изменения для окно об успешной отправке
        if( _this.type.indexOf('_success') + 1){

        }else if( _this.type === 'credit_modal_init' ){

        }
        
        //console.log('start creating new modal');

        _this.modal = new jBox('Modal', {
            width: _width,
            addClass: 'modal_window ' + _this.type,
            title: _title,
            closeButton: 'box',            
            fixed: _fixed,
            blockScroll: _blockScroll,
            position: _position,
            ajax: {
                url: '/ajax.php',
                data: {
                    type: _type,
                    data: _data,
                },
                type: 'POST',
                reload: true,
                getData: 'data-ajax',
                setContent: true,
                spinner: true,
                complete: function () {

                    // подгрузка плагинов
                    _this.loadPlugins();

                },                    
            },
            onCloseComplete: function () {

                // функция для переопределения закрытия окна
                _this.afterCloseModal();

                _this.modal.destroy();
                _this.modal = null;   

            },
        }).open();
    },
    

};