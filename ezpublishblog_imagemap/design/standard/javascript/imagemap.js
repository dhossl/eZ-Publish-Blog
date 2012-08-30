jQuery(function ($) {
	if($('textarea[id*="imagemap"]')) {    
	var jcrop_api;    
	    
	    jQuery.ez( 'ezjsctemplate::loadsize', {}, function(data){
		
		
		$('textarea[id*="imagemap"]').prev().append('<span id="imagemap-toolbar">'+data.content + ' <input type="button" class="button" id="select-image" value="select image" /> <input id="ezpublishblog-loadimagemap" class="button" type="button" value="create new imagemap" /> <input type="button" class="button" value="load current imagemap" id="ezpublishblog-loadcurrentimagemap" /></span>');
		$('#select-image').click(function() {
		    $('.ezcca-edit-datatype-ezimage img').attr('style','').addClass('selectimage').click(function() {
			$('#imagemap-toolbar img').remove();
			$('#select-image').before('<img src="'+$(this).attr('src')+'" width="100px" height="100px" class="image-preview" />');
			$(this).removeClass('selectimage');
			$('body').removeClass('imagemap-selection');
			var image_attr = $('.ezieEditButton',$(this).parents('.ezcca-edit-datatype-ezimage')).attr('id').split('_');
			jQuery.ez( 'ezjsctemplate::getimage', {size: $('#imagemap-imagesize option:selected').attr('value'),object_id:image_attr[3],imagenode:image_attr[1], attribute_name: $(this).parents('.ezcca-edit-datatype-ezimage').attr('class').split(' ')[2].replace(/ezcca-edit-/,'')}, function(data){
			    $('body').data('imagemap', {
					    'src'	:	data.content,
					    'object_id'	:	image_attr[3],
					    'imagenode_id'	:	image_attr[1]
					});
			});
		    });
		    $('body').addClass('imagemap-selection');
		    return false;
		});
		jQuery.ez( 'ezjsctemplate::overlay', {}, function(data){
		    $('body').append(data.content);  
		    
		    var OSX = {
			container: null,
			init: function () {
				$("#ezpublishblog-loadimagemap, #ezpublishblog-loadcurrentimagemap").click(function (e) {
					e.preventDefault();
					if($(this).attr('id') == 'ezpublishblog-loadcurrentimagemap') {
					loadCoords();    
					}
					
					$("#osx-modal-content").modal({
						overlayId: 'osx-overlay',
						containerId: 'osx-container',
						closeHTML: null,
						minHeight: 80,
						opacity: 65, 
						position: ['0',],
						overlayClose: true,
						onOpen: OSX.open,
						onClose: OSX.close
					});
				});
			},
			open: function (d) {
			    
				// JCROP START
			    
				$('#target').attr('src',$('body').data('imagemap')['src']);
			    
				$('#target').Jcrop({
				  onChange:   setCoords,
				  onSelect:   showCoords,
				  onRelease:  clearCoords
				},function(){
				    jcrop_api = this;
				    jcrop_api.setImage($('body').data('imagemap')['src']);
				});

				$('#list li').live('click',function(){
				    $('#list li').removeClass('selected');
				    $('span.saved').remove();
				    $('#modify, #remove').show();
				    jcrop_api.animateTo($(this).attr('coords').split(','));
				    $(this).addClass('selected');

				});

				$('#modify').hide().click(function() {
				    updateCoords();
				});

				$('#add').click(function() {
				    addCoords();
				});


				$('#remove').hide().click(function() {
				    $('#list li.selected').remove();
				    jcrop_api.release();
				    $('#modify, #remove').hide();

				});
				
				$('#save').click(function(){
				    generateAreaMap();
				});
			    
				var self = this;
				self.container = d.container[0];
				d.overlay.fadeIn('slow', function () {
					$("#osx-modal-content", self.container).show();
					var title = $("#osx-modal-title", self.container);
					title.show();
					d.container.slideDown('slow', function () {
						setTimeout(function () {
							var h = $("#osx-modal-data", self.container).height()
								+ title.height()
								+ 20; // padding
							d.container.animate(
								{height: h}, 
								200,
								function () {
									$("div.close", self.container).show();
									$("#osx-modal-data", self.container).show();
								}
							);
						}, 100);
					});
				});
				// JCROP END
			},
			close: function (d) {
				var self = this; // this = SimpleModal object
				d.container.animate(
					{top:"-" + (d.container.height() + 20)},
					500,
					function () {
						self.close(); // or $.modal.close();
					}
				);
			}
		    };

		    OSX.init();

		    

		});
		
	    });
	    
	    
	    
	}

});

function generateAreaMap() {
    var name = $('body').data('imagemap')['imagenode_id']+'_'+$('body').data('imagemap')['object_id'];
    var map = '<img src="'+$('body').data('imagemap')['src']+'" usemap="#'+name+'" id="'+name+'" > ';
    map += '<map name="'+name+'">';
    $('#list li').each(function(i,ele){
	map += '<area shape="rect" coords="'+$(ele).attr('coords')+'" href="http://www.orf.at">';
    });
    map += '</map>';
    $('textarea[id*="imagemap"]').html(map);
}

function addCoords() {
    $('#list').append('<li coords="'+ getCurrentCoords() + '">Mapselection ' + ($('#list li').length + 1) + '</li>');
}
function getCurrentCoords() {
    return $('#x1').attr('value') + ',' + $('#y1').attr('value') + ','+ $('#x2').attr('value') + ','+ $('#y2').attr('value');
}
function updateCoords() {
    $('#list li.selected').attr('coords',getCurrentCoords()).append(' <span class="saved">(saved)</span>')
}

function setCoords(c) {
    //$('#modify').show();
}


function removeEdit() {
    $('#list li span.edit').remove();
}
function addEdit() {
    removeEdit();
    $('#list li').append(' <span class="edit">edit</span>');
}

function loadCoords() {
    
    $('#list li').remove();
    $('body').append('<div id="temp-imagemap">'+$('textarea[id*="imagemap"]').text()+'</div>');
    
    $('body').data('imagemap', {
	'src'	:	$('#temp-imagemap img').attr('src'),
	'object_id'	:	$('#temp-imagemap img').attr('id').split('_')[1],
	'imagenode_id'	:	$('#temp-imagemap img').attr('id').split('_')[0]
    });
    
    $('#temp-imagemap map area').each(function(i,ele){
	$('#list').append('<li coords="'+ $(ele).attr('coords') + '">Mapselection ' + ($('#list li').length + 1) + '</li>');
    });
    $('#temp-imagemap').remove();
    
}

// Simple event handler, called from onChange and onSelect
// event handlers, as per the Jcrop invocation above
function showCoords(c) {
  
  $('#x1').val(Math.floor(c.x));
  $('#y1').val(Math.floor(c.y));
  $('#x2').val(Math.floor(c.x2));
  $('#y2').val(Math.floor(c.y2));
  $('#w').val(Math.floor(c.w));
  $('#h').val(Math.floor(c.h));
};

function clearCoords()
{
  $('#coords input').val('');
};
function _l(msg) { {
	_log(msg);
    }
}
function _log(msg) {
    if (window.console && window.console.log){
        window.console.log(msg);
    }
    
}