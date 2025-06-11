/* Menu Mobile */
jQuery(function($){
	$('#slide-in-open').click(function(){
		$(this).toggleClass('open');
		$('.slide-in-menu-container').toggleClass('slide-in-menu');
	});
});

jQuery(document).ready(function(){

    var totalheight = 0;
    jQuery(".et-l--header .et_builder_inner_content .et_pb_section").each(function(){
        totalheight = totalheight + jQuery(this).outerHeight();
    });

    totalheight = totalheight + "px";

    jQuery("#et-main-area").css("padding-top",totalheight);
});