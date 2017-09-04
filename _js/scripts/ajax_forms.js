$(function() {
    new ajaxForms();
});

function ajaxForms() {
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

ajaxForms.prototype = {
    type: '',
    action_url: '/ajax.php',
    default_type: 'default',
    container: null,
    container_class: "page_wrapper",
    form: null,
    form_class: "simple_form",
    modal: null,
    modal_params:{
        modal_window_class: "modal_window",
        open_class: "show_modal",
        default_title: "Информация",
        fixed: true,
        blockScroll: true,
        closeButtonType: 'box',
        position: {},
        success_width: 'auto',
        success_title: ""
    },
    afterCloseModal: function () {},
    current_name: "",
    current_text: "",
    current_val: "",
    error_block: '<div class="error"><div class="errortext"></div></div>',
    init: function() {
               
        // общий контейнер
        this.container = $('.' + this.container_class);

        // скрывать ошибки при фокусе на поле
        this.hideFormErrors();
        
        // отправка данных формы
        this.submitForm();
        
        // открытие модальных окон
        this.openModal();
        
        // первичная инициализация плагинов
        this.loadPlugins();
    },
    
    
    //
    // скрыть ошибку у поля ввода при фокусе
    //
    
    hideFormErrors: function(){

        // для инпутов, селектов и текстареа
        $('body').on('focus', 'input:not(input[type=submit], input[type=button]), textarea, select', function () {
            if ($(this).hasClass('error_input')) {
                $(this).removeClass('error_input');
                if ($(this).closest('.wrap_input').length) {
                    $(this).closest('.wrap_input').find('.error').fadeOut(300, function(){
                        $(this).remove()
                    });
                }
            }
        });
        
        // для стилизованных селектов
        $('body').on('change', 'select', function () {
            $(this).parent().find('.jq-selectbox__select').removeClass('error_input');
        });
    },
    
    
    //
    // подгрузка плагинов после ajax запроса
    //
    
    loadPlugins: function(){
                
        // maskedinput
        $('input.phone').mask("+7 (999) 999-99-99");
        $('input.date').mask("99.99.9999");
        $('input[name=passport]').mask("Серия 9999 №999999");
        
        // formstyler
        $('.styler').styler({
            singleSelectzIndex: 50
        });

    },
    
    
    //
    // Сабмит формы
    //
    
    submitForm: function(){
        
        var _this = this;
        
        _this.container.on('submit', '.' + _this.form_class, function(event){
            
            event.preventDefault();

            _this.type = $(this).data('action');

            _this.form = $(this);
            _this.sendData();
        });
        
    },
    
    
    //
    // Отправка данных из формы на сервер
    //
    
    sendData: function(){
        
        var _this = this;

        $.ajax({
            url: _this.action_url,
            type: 'POST',
            dataType: 'json',
            data: {
                type: _this.type,
                data: _this.form.serializeObject(),
            },
        }).done(function (data) {
            
            if (data.errors) {

                // скрываем старые ошибки
                _this.form.find('input.error_input, select.error_input, textarea.error_input')
                        .removeClass('error_input')
                        .closest('.wrap_input').find('.error').fadeOut(300, function(){
                            $(this).remove()
                        });
                
                // показываем новые ошибки
                $.each(data.errors, function (index, val) {
                    
                    _this.form.find('[name=' + index + ']').addClass('error_input');
                    
                    // добавляем в разметку блоки с ошибками к каждому полю, где неверно введены данные
                    var err_block_wrap = _this.form.find('[name=' + index + ']').closest('.wrap_input').append(_this.error_block);
                    var err_block = err_block_wrap.find('.error');
                    err_block.find('.errortext').text(val);
                    err_block.fadeIn(300);
                    
                });

            } else {

                // изменения страницы после успешной отправки формы
                _this.successChanges(data.SUCCESS_TYPE, data.SUCCESS_TITLE, data.MORE_PARAM);        

            }            
            
        });
        
    },

    
    //
    // Открыть модальное окно
    //
    
    openModal: function(){
        
        var _this = this;
        
        _this.container.on('click', '.' + _this.modal_params.open_class, function(){
            
            _this.type = $(this).data('modal__type');
            var _more_params = $(this).data('modal__more_params');
            var _title = $(this).data('modal__title');
            
            _this.showModal( _title, _more_params );
        });
        
    },
    
    
    //
    // показать модальные окна 
    //
    
    showModal: function( _TITLE, _MORE_PARAM ){
        
        var _this = this;
        
        // объект с данными для передачи на сервер
        var _data = {};
        
        // переменные, которые можно переопределить в зависимости от какого-нибудь условия
        var _fixed = _this.modal_params.fixed;
        var _blockScroll = _this.modal_params.blockScroll;
        var _position = _this.modal_params.position;
        
        // сброс функции, выполняющейся после закрытия мод окна
        _this.afterCloseModal = function(){};
        
        // тип запроса к серверу
        if( !_this.type ){
            _this.type = _this.default_type;
        }
        
        // заголовок окна
        if( !_TITLE ){
            _TITLE = _this.modal_params.default_title;
        }        

        // дополнительные параметры и данные
        if( _MORE_PARAM ){
            
            // передача данных дополнительных данных в окно об успешном выполнении заявки
            if( _this.type === "order_form_success" ){
                _data.more_param = _MORE_PARAM;
            }
            
        }  
        
        // изменения для окна об успешной отправке
        if( _this.type.indexOf('_success') + 1 && _this.modal_params.success_width ){
            _TITLE = _this.modal_params.success_title;
        }
        
        _this.modal = new jBox('Modal', {
            addClass: _this.modal_params.modal_window_class + ' ' + _this.type,
            title: _TITLE,
            closeButton: _this.modal_params.closeButtonType,            
            fixed: _fixed,
            blockScroll: _blockScroll,
            position: _position,
            reposition: true,
            maxWidth: "100%",
            adjustDistance:  {top: 20, right: 0, bottom: 20, left: 0},
            ajax: {
                url: _this.action_url,
                data: {
                    type: _this.type,
                    data: _data,
                },
                type: 'POST',
                reload: true,
                setContent: true,                
                spinner: true,
                spinnerReposition: false,
                complete: function () {
                    
                    // определяем форму в мод окне для последующей отправки, если она есть
                    _this.form = $('.' + _this.modal_params.modal_window_class + '.' + _this.type).find('.' + _this.form_class);
                    
                    if( _this.form.length ){
                        _this.submitModalForm();
                    }
                    
                    // пересчет позиции при замене контента
                    _this.modal.position();
                    
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
    
    
    //
    // Сабмит формы в модальном окне
    //
    
    submitModalForm: function(){
        
        var _this = this;
        
        _this.form.submit(function(event){
            
            event.preventDefault();
            
            _this.type = $(this).data('action');

            _this.sendData();
        });
        
    },
    
    
    //
    // Сообщение об успешной отправке
    //
    
    showModalSuccess: function(_SUCCESS_TITLE, _MORE_PARAM){
        
        var _this = this;
        
        // если ранее было создано модальное окно, то заменяем в нем контент
        if( _this.modal ){
            
            if( _SUCCESS_TITLE ){
                var _title = _SUCCESS_TITLE;
            }else{
                var _title = "";
            }
            
            // добавляем к модальному окну класс success
            if( _this.modal_params.modal_window_class ){
                $('.' + _this.modal_params.modal_window_class).addClass('success');
            }
            
            _this.modal.setTitle(_title).ajax({
                url: _this.action_url,
                data: {
                    type: _this.type,
                    data: {
                        more_param: _MORE_PARAM
                    }
                },
                type: 'POST',
                reload: true,
                getData: 'data-ajax',
                setContent: true,
                spinner: true,
                complete: function () {                    

                    // изменяем ширину окна и скрываем кнопку закрытия
                    if( _this.modal_params.success_width ){
                        _this.modal.setWidth(_this.modal_params.success_width);
                    }
                    
                    // пересчет позиции при замене контента
                    _this.modal.position();

                    // подгрузка плагинов
                    _this.loadPlugins();
                },
            });

        // если форма была на странице без мод окна, то создаем новую
        }else{

            _this.form.find('input[type=text], textarea').val("");
            
            _this.showModal(_SUCCESS_TITLE, _MORE_PARAM);

        }
                    
    },
    
    
    //
    // Изменения на странице после успешной отправки формы
    //
    
    successChanges: function(_SUCCESS_TYPE, _SUCCESS_TITLE, _MORE_PARAM){
        
        var _this = this;
        
        //console.log('start successChanges');
        //console.log('param _SUCCESS_TYPE = ' + _SUCCESS_TYPE);
        //console.log('param _SUCCESS_TITLE = ' + _SUCCESS_TITLE);
        //console.log('param _MORE_PARAM = ' + _MORE_PARAM);
        
        
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
                
                // обновляем кол-во в шапке
                _this.container.find('.top_ilike .ilike_icon .counter').text(_MORE_PARAM.COUNT);
                                
            // если окно открыто на странице проекта
            }else if( _MORE_PARAM.FROM_PAGE === "detail_page"){
                
                // обновляем кол-во в шапке
                _this.container.find('.top_ilike .ilike_icon .counter').text(_MORE_PARAM.COUNT);
                
            }
            
        // изменения после удаления проекта из понравившихся
        }else if( _this.type === "remove_like_project" ){
            
            // если открыта общая страница каталога
            if( _MORE_PARAM.FROM_PAGE === "catalog"){
                               
                // обновляем кол-во в шапке
                _this.container.find('.top_ilike .ilike_icon .counter').text(_MORE_PARAM.COUNT);

            // если окно открыто на странице проекта
            }else if( _MORE_PARAM.FROM_PAGE === "detail_page"){
                
                // обновляем кол-во в шапке
                _this.container.find('.top_ilike .ilike_icon .counter').text(_MORE_PARAM.COUNT);
                
            }
            
        }
        
        
        // удаляем данные о форме
        _this.form = null;
        
    },
    
};