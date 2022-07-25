$(document).ready(function()
{
	"use strict";
	$('.done').on('click', (e)=> {
		$(e.target).parents('.ex_cont').text('')
		new Toast({
			title: false,
			text: "Упражнение выполнено!",
			theme: 'light',
			autohide: true,
			interval: 10000
		});
		if(!$('.ex_cont').text()) {
			$('.ex_container').prepend($('<div class="completed"><p>Тренировка выполнена!</p><a class="button " href="/workout">Завершить тренировку</a></div>'));
		}
	})
});