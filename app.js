/*
* Upload image
*/
let submit = document.getElementById("submit");
submit.addEventListener("click", function(e) {
    let formData = new FormData();
    let file = document.getElementsByClassName("form-control")[0];
    formData.append("upload", file.files[0]);

    let xhr = new XMLHttpRequest();

    xhr.open("post", "/uploads", true);

    xhr.onreadystatechange = function() {
        if(xhr.readyState == 4 && xhr.status == 200) {
            let imageFile = JSON.parse(xhr.responseText);
			
			let ul = document.getElementsByClassName("list-unstyled");
			let li = document.createElement("li");
			li.innerHTML = "<img src=\"" + imageFile.file + "\" class=\"img-rounded\" />";
			ul[0].appendChild(li);
        }
    }
    
	xhr.send(formData);
}, false);

/*
* Load images from folder
*/
window.onload = function() {
    let xhr = new XMLHttpRequest();
    xhr.open("get", "/images", true);

    xhr.onreadystatechange = function() {
        if(xhr.readyState == 4 && xhr.status == 200) {
            let imageList = JSON.parse(xhr.responseText);

            let ul = document.getElementsByClassName("list-unstyled");
            for(let i = 0; i < imageList.length; i++) {
                let li = document.createElement("li");
                li.innerHTML = "<img src=\"" + imageList[i] + "\" class=\"img-rounded\" />";
                ul[0].appendChild(li);
            }
        }
    }
    xhr.send();
    return;
}

$(document).ready(function() {
	//add image to canvas by clicking on it
    $(document).on("click", ".img-rounded", function(e) {
        let src = $(this)[0].src;
        let elem = $("<div><img src=\"" + src + "\" height=\"50\" class=\"img-images\" width=\"50\" /></div>");
        //element
        $(".block").append(elem);
        return;
    });

    //remove image from canvas by clicking on it
    $(document).on("click", ".img-images", function(e){
    	$(this)[0].remove();
    	return;
    });

    //add dynamic text into canvas
    $(document).on("click", "#addText", function(e) {
    	let input = $("<input type=\"text\" name=\"name[]\" class=\"input\" value=\"\" />");
    	$(".block").append(input);
    	input.focus();
    	makeInputToText(input);
    });
    editText(".input");
});

function makeInputToText(elem) {
	$(elem).on("keypress", function(e) {
		if(e.which == 13) {
			if($(elem).val() == "") {
				$(elem).remove();
			}
			else {
				let text = $("<div class=\"text\"><span class=\"input\">" + $(elem).val() + "</span></div>");
				$(elem).replaceWith(text);

			}
			editText(".input");
		}
    });
    $(elem).on("focusout", function(e) {
        if($(elem).val() == "") {
            $(elem).remove();
        }
        else {
            let text = $("<div class=\"text\"><span class=\"input\">" + $(elem).val() + "</span></div>");
            $(elem).replaceWith(text);

        }
        editText(".input");
	});
}

function editText(selector) {
	$(selector).each(function(i, el) {
		$(el).on("click", function(e) {
			let input = $("<input type=\"text\" name=\"name[]\" class=\"input\" value=\"" + $(el).html() + "\" />");
			$(el).replaceWith(input);
			input.focus();
			makeInputToText(input);
		});
	});
}