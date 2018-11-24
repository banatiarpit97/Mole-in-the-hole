angular.module('moleGame',['ngMaterial'])
.controller('mainController', function ($scope, $mdDialog) {
    $('.plus1').hide();
    $('.minus1').hide();

    var game,
    pause,
    score,
    lives,
    clicks = 0,
    clickDelay = 1000,
    timer,
    timeout,
    toExit,
    liferemove;

    $("#mole").on('animationend webkitAnimationEnd oAnimationEnd', (e) => {
        console.log(e.originalEvent.animationName)
        if((e.originalEvent.animationName.indexOf('hit') > -1) && (clicked)){
            createMole();                        
        }
        if((e.originalEvent.animationName.indexOf('moleexit') > -1) && (!clicked)){
            createMole();                        
        }
        if((e.originalEvent.animationName.indexOf('moleentry') > -1)){
            toExit = setTimeout(() => {
                    timeout = true;
                    if(!clicked){
                        noHitMole();
                    }   
                },frequency);
            // noHitMole();                        
        }
    })

    $scope.start = function(ev) {
        $mdDialog.show({
            controller: DialogStartController,
            templateUrl: 'templates/gameModes.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true// Only for -xs, -sm breakpoints.
        });

    };

    function DialogStartController($scope, $mdDialog) {
        if(liferemove){
                clearInterval(liferemove);
                liferemove = null;
        }
        if(toExit){
                clearInterval(toExit);
                toExit = null;
        }
        $scope.speed = "Amateur";
        score = 0;
        lives = 5;
        pause = false;

        $("#score").html(score);

        $scope.close = function() {
            $mdDialog.cancel();
        };
        $scope.cancel = function() {
            $mdDialog.cancel();
        };
        $scope.confirmMode = function() {
            $(".pausebtn, .restartbtn").removeClass("hidden");
            $('.startbtn').addClass('hidden');

            speed = $scope.speed;
            if(speed == "Beginner"){
                frequency = 4000;
            }
            else if(speed == "Amateur"){
                frequency = 2500;
            }
            else if(speed == "Professional"){
                frequency = 2000;
            }
            $mdDialog.cancel();
            $(".whiteBack").css({opacity:0.5})
            $(".hole").css({opacity:0.3})
            $('.timer').removeClass('hidden').addClass('animated zoomIn');

            timer = setInterval(function(){
                count = $('.timer').html();
                if(count>1) {
                    count--;
                    $('.timer').html(count).addClass('animated zoomIn')
                }
                else{
                    clearInterval(timer)
                    $('.timer').addClass('hidden')
                    startGame();
                }
             }, 1000)
            function startGame(){
                $(".whiteBack, .hole").css({opacity:1})
               game = true;
               createMole();
            }
        };
    };

    $scope.pause = function(){
        if($('.pausebtn').text() == 'Pause'||$('.pausebtn').text() == 'PAUSE'){
            pause = true;
            game = false;
            $('.pausebtn').text('RESUME')
            if($('#mole').css('animation') == 'moleexit 0.8s ease 0s 1 normal forwards running'){
                // clearInterval(b);
            }
            $('#mole').css('animation-play-state', 'paused')

        }
        else{
            pause = false;
            game  = true;
            // b = setInterval(nohitmole, frequency)
            $('.pausebtn').text('PAUSE')
            // if($('#mole').css('animation') == 'moleexit 0.8s ease 0s 1 normal forwards paused'){
            //     $('#mole').one('animationend', function (e) {
            //         createMole();
            //     })
            // }
            $('#mole').css('animation-play-state', 'running')
        }

    }
    $scope.restart = function(){
        $('.timer').html(3)
        $(".life").css('color','red');
        $('.gameover').addClass('hidden')
        $('#mole').addClass('hidden');
        bb = false;
        $scope.start();
    }

	// $('#hammer').css(left, )
	var holePositions = [{left:'13.5%', bottom:'20%', height:'115px', width:'106px'},
                         {left:'44.5%', bottom:'20%', height:'115px', width:'106px'},
                         {left:'72.5%', bottom:'20%', height:'115px', width:'106px'},
                         {left:'29.3%', bottom:'37%', height:'105px', width:'96px'},
                         {left:'60.5%', bottom:'37%', height:'105px', width:'96px'},
                         {left:'46.5%', bottom:'47%', height:'96px', width:'89px'},
                         {left:'10.5%', bottom:'43%', height:'96px', width:'89px'},
                         {left:'81.5%', bottom:'44%', height:'96px', width:'89px'}];
    // createMole();
    // clicked = false;
	var bb = false;
	var clicked;

	function noHitMole(){
            lives--;
            $('#mole').css({animation: 'moleexit 0.8s', 'animation-fill-mode': 'forwards'});
            $('.minus1').fadeIn();
                liferemove = setTimeout(function () {
                    $('.minus1').fadeOut();
                    let l = lives + 1;
                    $(".life:nth-child(" + l + ")").css('color', 'grey')
                }, 1000)
            if(lives <= 0) {
                game = false;
                // clearInterval(b);
                $('.gameover').removeClass('hidden').addClass('animated bounceInDown');
                $('.whiteBack').css('opacity', '0.5');
                $('.hole').css('opacity', '0.3')
                $('.pausebtn').addClass('hidden')
            }


	    // if(game && !clicked) {
     //        bb = true;
     //        lives--;
     //        $('#mole').css({animation: 'moleexit 0.8s', 'animation-fill-mode': 'forwards'});
     //        console.log($('#mole').css('animation'));
     //        a = setTimeout(function () {
     //          if(!clicked){

     //            $('.minus1').fadeIn();
     //            liferemove = setTimeout(function () {
     //                $('.minus1').fadeOut();
     //            }, 1000)
     //            $('#hammer').css('animation', '');
     //            l = lives + 1;
     //            $(".life:nth-child(" + l + ")").css('color', 'grey')
     //            if (lives > 0) {

     //                createMole();
     //            }
     //            else {
     //                clearInterval(b);
     //                $('.gameover').removeClass('hidden').addClass('animated bounceInDown');
     //                $('.whiteBack').css('opacity', '0.5');
     //                $('.hole').css('opacity', '0.3')
     //                $('.pausebtn').addClass('hidden')
     //            }
     //          }  
     //          else{
     //                createMole();
     //          }
     //        }, 1000)
     //    }
    }

	function createMole(){
		if(game) {
			clicked = false;
            timeout = false;
            clicks = 0;
            if(toExit){
                clearInterval(toExit);
                toExit = null;
            }
            holeNumber = Math.floor(Math.random() * 8);
            // holeNumber = 2;
            currentMolePosition = holePositions[holeNumber];
            $('#mole').css(currentMolePosition).removeClass('hidden');
            switch(holeNumber){
                case 0:
                case 1:
                case 2: $('#mole').css({'animation': 'moleentry1 0.8s', 'animation-fill-mode': 'forwards'})
                        break;
                case 3:
                case 4: $('#mole').css({'animation': 'moleentry2 0.8s', 'animation-fill-mode': 'forwards'})
                        break;
                case 5:
                case 6:
                case 7: $('#mole').css({'animation': 'moleentry3 0.8s', 'animation-fill-mode': 'forwards'})
                        
            }

            // if (!clicked && !bb) {
            //     b = setInterval(nohitmole, frequency)
            // }
        }
    }
    $('#mole').click(function(){

    	if((!timeout) && (($('#mole').css('animation') != 'moleexit 1s ease 0s 1 normal forwards running') || ($('#mole').css('animation') != 'hit1 1s ease 0s 1 normal forwards running') || ($('#mole').css('animation') != 'hit2 1s ease 0s 1 normal forwards running') || ($('#mole').css('animation') != 'hit3 1s ease 0s 1 normal forwards running'|| (!clicked)))) {
            var animationNumber;
            clicked = true;
            // clicks++;
            if(++clicks == 1){
                // timer = setTimeout(function(){
                // clicks = 0;
                // }, clickDelay)

                // clearInterval(b)
                // bb = false;
                score++;
                $('.plus1').fadeIn();
                scoreremove = setTimeout(function(){$('.plus1').fadeOut();}, 1000)
                $('#score').html(score);

                switch(holeNumber){
                    case 0 :
                    case 1:
                    case 2: $(this).css({'animation': 'hit1 1s', 'animation-fill-mode': 'forwards'})
                            break;

                    case 3:
                    case 4: $(this).css({'animation': 'hit2 1s', 'animation-fill-mode': 'forwards'})
                            break;

                    case 5:
                    case 6:
                    case 7: $(this).css({'animation': 'hit3 1s', 'animation-fill-mode': 'forwards'})
                }
                // console.log('a', $('#hammer').css('animation'))
                // console.log('a', $('#hammer').css('animation'))
                $('#hammer').css({'animation': '' , 'animation-play-state':'initial'})
                setTimeout(() => {
                        $('#hammer').css({'animation': 'hammer 0.4s', 'animation-iteration-count': 1,  'animation-fill-mode': 'forwards', 'animation-play-state':'initial'})

                    }, 0);

                // $(this).on('animationend webkitAnimationEnd oAnimationEnd', (e) => {
                //     console.log(e.originalEvent.animationName)
                //     if((e.originalEvent.animationName.indexOf('hit') > -1) && (clicked)){
                //         createMole();                        
                //     }
                // })

                // $(this).css({animation: 'hit 1s', 'animation-fill-mode': 'forwards'});

                // a = setTimeout(function () {
                //     $('#hammer').css('animation', '');
                //     createMole();
                // }, 1000)
            }


        }

    })

    $('#mole').dblclick(function(e){
        e.preventDefault();
    })

    $('.whiteBack, .hole, #mole').mouseover(function(){
        $('#hammer').css('display', 'block')
    })
    $('.whiteBack, .hole, #mole').mouseleave(function(){
        $('#hammer').css('display','none')
    })

    $(document).mousemove(function(event){
        mouseX = event.pageX;
        mouseY = event.pageY;
        imgWidth = $("#hammer").width();
        imgHeight = $('#hammer').height();
        mouseX = mouseX - (imgWidth / 2);
        mouseY = mouseY - (imgHeight / 2);
        // if(!pause) {
            //     $('#hammer').css({visibilty:visible})

            $("#hammer").css({left: mouseX, top: mouseY});

        // }
        });

});


