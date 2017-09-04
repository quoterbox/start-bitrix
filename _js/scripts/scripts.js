$(document).ready(function () {
    /*
    // 
    // Инициализация адаптивного меню
    //    

    $("#mobile_menu").mmenu({
        "extensions": [
            "pageshadow",
            "pagedim-black",
            "theme-dark"
        ],
                
        // options
        navbar: {
            title: "Меню сайта"
        }
    }, {
        // configuration
        offCanvas: {
            pageSelector: "#page_container"
        }
    });
      
    var API = $("#mobile_menu").data( "mmenu" );
      
    $(".open_mob_menu").click(function() {
        API.open();
    });
    

    //
    // Слайдер на странице проекта
    //

    var _detail_slider = $('.wrap_detail_slider .detail_main_slider').flickity({
        pageDots: false
    });
    
    $('.wrap_detail_slider .pager_for_detail').flickity({
        asNavFor: '.detail_main_slider',
        contain: true,
        pageDots: false
    });
    
    // управление слайдером на детальной странице проекта
    var _play_btn = '<i class="fa fa-play" aria-hidden="true"></i>';
    var _pause_btn = '<i class="fa fa-pause" aria-hidden="true"></i>';
    
    $('.slider_player_btn').click(function(){
        
        var _this = $(this);
        var _action = _this.data('do_slider');
        
        switch(_action){
            
            case "play":
                
                _detail_slider.flickity('playPlayer');
                _this.html(_pause_btn);
                _this.data('do_slider', 'pause');
                
                break;
                
            case "pause":
                
                _detail_slider.flickity('stopPlayer');
                _this.html(_play_btn);
                _this.data('do_slider', 'play');
                
                break;
            
        }
        
    });
    
    var flkty = _detail_slider.data('flickity');
    
    // изменение ссылки увеличения выбранного слайда
    _detail_slider.on( 'select.flickity', function() {

        // получаем ссылку на большое изображение из текущего слайда
        var _new_href = $(flkty.selectedElement).find('a').attr('href');

        // заменяем ссылкой старую
        $('.icons_panel .zoom_project_btn a').attr('href', _new_href);
        
    });
    */
    
    //
    // formstyler
    //
    
    $('.styler').styler({
        singleSelectzIndex: 30
    });
    
    
    
    //
    // увеличение фото
    //
    
    $(".fancybox").fancybox({
        padding: 0,
        beforeLoad: function() {
            this.title = $(this.element).data('title');
        },
        tpl: {
            closeBtn : '<div class="close_fancy_window"><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 496.158 496.158" style="enable-background:new 0 0 496.158 496.158;" xml:space="preserve"><path d="M496.158,248.085c0-137.021-111.07-248.082-248.076-248.082C111.07,0.003,0,111.063,0,248.085 c0,137.002,111.07,248.07,248.082,248.07C385.088,496.155,496.158,385.087,496.158,248.085z"/><path d="M277.042,248.082l72.528-84.196c7.91-9.182,6.876-23.041-2.31-30.951 c-9.172-7.904-23.032-6.876-30.947,2.306l-68.236,79.212l-68.229-79.212c-7.91-9.188-21.771-10.216-30.954-2.306 c-9.186,7.91-10.214,21.77-2.304,30.951l72.522,84.196l-72.522,84.192c-7.91,9.182-6.882,23.041,2.304,30.951 c4.143,3.569,9.241,5.318,14.316,5.318c6.161,0,12.294-2.586,16.638-7.624l68.229-79.212l68.236,79.212 c4.338,5.041,10.47,7.624,16.637,7.624c5.069,0,10.168-1.749,14.311-5.318c9.186-7.91,10.22-21.77,2.31-30.951L277.042,248.082z"/></svg></div>',
            next: '<div class="next_fancy fancy_nav_btns"><svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 54 54" style="enable-background:new 0 0 54 54;" xml:space="preserve"><g><path d="M27,53L27,53C12.641,53,1,41.359,1,27v0C1,12.641,12.641,1,27,1h0c14.359,0,26,11.641,26,26v0 C53,41.359,41.359,53,27,53z"/><path d="M27,54C12.112,54,0,41.888,0,27S12.112,0,27,0s27,12.112,27,27S41.888,54,27,54z M27,2	C13.215,2,2,13.215,2,27s11.215,25,25,25s25-11.215,25-25S40.785,2,27,2z"/><path d="M22.294,40c-0.256,0-0.512-0.098-0.707-0.293c-0.391-0.391-0.391-1.023,0-1.414L32.88,27 L21.587,15.707c-0.391-0.391-0.391-1.023,0-1.414s1.023-0.391,1.414,0l11.498,11.498c0.667,0.667,0.667,1.751,0,2.418	L23.001,39.707C22.806,39.902,22.55,40,22.294,40z"/></g></svg></div>',
            prev: '<div class="prev_fancy  fancy_nav_btns"><svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 54 54" style="enable-background:new 0 0 54 54;" xml:space="preserve"><g><path d="M27,1L27,1c14.359,0,26,11.641,26,26v0c0,14.359-11.641,26-26,26h0C12.641,53,1,41.359,1,27v0 C1,12.641,12.641,1,27,1z"/><path d="M27,54C12.112,54,0,41.888,0,27S12.112,0,27,0s27,12.112,27,27S41.888,54,27,54z M27,2 C13.215,2,2,13.215,2,27s11.215,25,25,25s25-11.215,25-25S40.785,2,27,2z"/><path d="M31.706,40c-0.256,0-0.512-0.098-0.707-0.293L19.501,28.209c-0.667-0.667-0.667-1.751,0-2.418 l11.498-11.498c0.391-0.391,1.023-0.391,1.414,0s0.391,1.023,0,1.414L21.12,27l11.293,11.293c0.391,0.391,0.391,1.023,0,1.414 C32.218,39.902,31.962,40,31.706,40z"/></g></svg></div>',
        },
        helpers	: {
            title: {
                type: 'outside'
            },
            thumbs: {
                width: 50,
                height: 50
            },
            buttons: {}
        }
    });

        
    //
    // Плавный переход к якорю о производителях
    //
    
    $('.go_to_ancor').click(function(event){
        
        event.preventDefault();
        
        var _ancor = $(this).attr('href');
        
        $('html,body').stop(false,false).animate({
            scrollTop: $(_ancor).offset().top - 70
        }, 700);
                
    });
    
    
    //
    // Переход на внешние ресурсы
    //
    
    $('.go_link').mousedown(function(event){
        
        if( $(this).data('go') !== "" ){
        
            switch(event.which){
                case 1:
                    $(this).attr('href', $(this).data('go'));
                    $(this).attr('data-go',"");
                    $(this).click();

                    return false;
                break;
                case 2:
                    $(this).attr('href', $(this).data('go'));
                    $(this).attr('data-go',"");
                    $(this).click();

                    return false;
                break;
                case 3:
                    //right Click
                break;
            }
            
        }else{
            return true;
        }
        
    });
        
    
    
    //
    // наверх
    //
    
    $('.top_button').click(function(){
        $('html, body').animate({
            "scrollTop": 0
        }, 600, function(){
            $('.top_button').fadeOut(300);
        });
    });
    
    $(window).scroll(function(){
        
        // окно браузера
        var w=$(window); 
        
        // смещение
        var topOffset =  600; 
        
        // смещение окна просмотра относительно страницы        
        var winOffset = w.scrollTop();  

        if( topOffset < winOffset ){
            $('.top_button').fadeIn(300);     
        }else{
            $('.top_button').fadeOut(300);
        }
        
    });

});