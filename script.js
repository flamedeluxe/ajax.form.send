# ajax.form.send

$('body').on('submit', 'form', function() {
        
        var popup = $(this).closest('.modal');
        var id = $(this).parent().attr('data-id');
        var formwrap = $(this).parent();
        
        var values = $(this).serializeArray();
        var btn = $(this).find('button[type="submit"]');
        btn.attr('disabled', 'disabled');
        btn.find('span').html('<i class="fa fa-spinner fa-pulse"></i>');
        
        $.ajax({
            type: 'POST',
            dataType: 'html',
            url: $(this).attr('action'),
            data: values,
            success: function(data) {
                
                var cut_data = $(data).find('.orderform[data-id='+id+'] form');
                formwrap.html(cut_data);
                btn.find('span').remove('.i');
                var error = $('.orderform[data-id='+id+'] .error');
                
                if(error.length == 0) {
                    $('.modal').fadeOut(200);
                    $('#thanks').fadeIn(300);
                    setTimeout(function(){
                        $('#thanks').fadeOut(200);
                        $('.overlay').hide();
                        popup.removeClass('show');

                    }, 2000);
                    $('.orderform[data-id='+id+']').find('input[type=text]').val('');
                }
            }
        });

        return false;
    });
    
$('body').on('click', 'a[data-modal]', function(event) {
		event.preventDefault();
		var modal = $(this).attr('data-modal');
		$('.modal').fadeOut(300);
			
		if(!$('body').find('.modal').hasClass('show')) {
			var modal = $(this).attr('data-modal');

			$('body').after('<div class="overlay"></div>');
			$(modal).fadeIn(300).addClass('show');
		}
	});
	
	$('body').on('click', '.close-modal', function(event) {
		event.preventDefault();

		$(this).closest('.modal').removeClass('show').fadeOut(300);
		$('.overlay').remove();
	});
