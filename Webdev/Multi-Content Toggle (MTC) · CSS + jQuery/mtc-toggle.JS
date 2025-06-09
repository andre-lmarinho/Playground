jQuery(function($){
	var buttons = {
		'.mtc_button_1': {
			'toggle': '', 
			'hide'  : '.mtc_element_2, .mtc_element_3, .mtc_element_4 .mtc_element_5', 
			'show'  : '.mtc_element_1'
		},
		'.mtc_button_2': {
			'toggle': '', 
			'hide'  : '.mtc_element_1, .mtc_element_3, .mtc_element_4 .mtc_element_5', 
			'show'  : '.mtc_element_2'
		},
		'.mtc_button_3': {
			'toggle': '', 
			'hide'  : '.mtc_element_1, .mtc_element_2, .mtc_element_4 .mtc_element_5', 
			'show'  : '.mtc_element_3'
		},
		'.mtc_button_4': {
			'toggle': '', 
			'hide'  : '.mtc_element_1, .mtc_element_2, .mtc_element_3', 
			'show'  : '.mtc_element_4'
		},
    '.mtc_button_5': {
			'toggle': '', 
			'hide'  : '.mtc_element_1, .mtc_element_2, .mtc_element_3 .mtc_element_4', 
			'show'  : '.mtc_element_5'
		}
	};

    $.each(buttons, function(button, elements) {
        $(button).click(function(e){
            e.preventDefault();

            // Se já está aberto, não faz nada
            if ($(button).hasClass('mtc_button_opened')) {
                return;
            }

            // Oculta todos imediatamente, sem fade
            $.each(buttons, function(otherButton, otherElements) {
                if (otherButton !== button) {
                    $(otherElements.show).hide(); // sem fade
                    $(otherButton).removeClass('mtc_button_opened').addClass('mtc_button_closed');
                }
            });

            // Mostra o atual com transição
            $(elements.show).fadeIn();
            $(button).removeClass('mtc_button_closed').addClass('mtc_button_opened');
        });
    });
});