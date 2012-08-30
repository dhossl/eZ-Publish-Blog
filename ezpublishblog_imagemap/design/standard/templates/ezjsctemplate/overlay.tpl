<div id="osx-modal-content">
	<div id="osx-modal-title">eZ Publish Image Map</div>
	<div class="close"><a href="#" class="simplemodal-close">x</a></div>
	<div id="osx-modal-data">
	    <p>
		<img src="images/pool.jpg" id="target" />
	    </p>
	    <p>
		<form id="coords" class="coords" onsubmit="return false;">
		    <div>
			<label>X1 <input type="text" size="4" id="x1" name="x1" /></label>
			<label>Y1 <input type="text" size="4" id="y1" name="y1" /></label>
			<label>X2 <input type="text" size="4" id="x2" name="x2" /></label>
			<label>Y2 <input type="text" size="4" id="y2" name="y2" /></label>
			<label>W <input type="text" size="4" id="w" name="w" /></label>
			<label>H <input type="text" size="4" id="h" name="h" /></label>
		    </div>
		    <div class="clear"></div>
		</form>
	    </p>
	    <p>
		<input type="button" class="button" id="modify" value="modify selection" />
		<input type="button" class="button" id="add" value="add selection" />
		<input type="button" class="button" id="remove" value="remove selection" />
		<input type="button" class="button" id="save" value="save all" />
		<div id="imagemaps">
		    <ul id="list">
		    </ul>
		</div>
	    </p>
	    <p><button class="simplemodal-close">Close</button> <span>(or press ESC or click the overlay)</span></p>
	</div>
</div>