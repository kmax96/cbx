//CBX - checkbox cbx generator
//Copyright (C) 2019 kinmax96@gmail.com

//Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

//The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

//THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


var cbxtempsample = [
{

    "name": "option1",
    "checked": "1",
    "tooltip": "I am option1"

},
{
    "name": "option2",
    "checked": "0",
    "tooltip": "I am option2"

}
];
 

var cbx = function (id) {
    this.id = id;
    this.valueid = this.id + "_value";
    this.source = cbxtempsample;
    this.init = function () {

        var _self = this;
        var div = $("#" + this.id);
        div.html('');
        if (this.source.length > 0) {
            for (var i = 0; i < this.source.length; i++) {
                var tt = "";
                var itm = this.source[i];
                var itmID = this.id + "_" + (itm.name.replace(" ", "_").replace(".", "_").replace(" ", "_"));
                var checked = "";
                if (itm.checked == "1") {
                    checked = "checked";
                }
                if (itm.tooltip != null && itm.tooltip != "") {
                    tt = "data-toggle='tooltip' data-html='true' title='" + itm.tooltip + "' data-placement='top'";
                }

                //var template = "<div class=\"form-check form-check-inline\" " + tt+">";
                //template += "<input id=\"" + itmID + "\" name=\"" + itmID + "\" type=\"checkbox\" class=\"form-check-input\" " + checked +" />";
                //template += "<label class=\"form-check-label\" for=\"" + itmID + "\">" +itm.name +"</label></div>"; 

                var template = "<div class=\"form-check form-check-inline\" " + tt + ">";
                template += "<label class='cbx'>" + itm.name;
                template += "<input type='checkbox' " + checked + "  id=\"" + itmID + "\" name=\"" + itmID + "\" onchange=\"" + this.id + ".onClick('" + itm.id + "')\" >";
                template += " <span class='checkmark'></span>";
                template += "</div>"; 
                div.append(template);
                 
            }

            var valueTmp = "<input id=\"" + this.valueid + "\" name=\"" + this.valueid + "\" type=\"text\" style='visibility: hidden;' />";
            div.append(valueTmp);

        }
    };



    this.onClick = function (id) {
        this.val();
        for (var i = 0; i < this.source.length; i++) {
            if (this.source[i].id == id)
            {
                this.onClicked(this.source[i]);
            } 
        }
       
    };
    this.onClicked = function (itm) {
        //can add custom event here

    };


    this.enabled = true;//default true 
    this.setEnabled = function (enable) {
        this.enabled = enable;

        $("#" + this.id + " input").each(function (index) {
            $(this).prop("disabled", !enable);
            $(this).prop("readonly", !enable);
            if (!enable) {
                $(this).parent(".cbx").addClass("readonly");
            } else {
                $(this).parent(".cbx").removeClass("readonly");
            }
        });

        $("#" + this.id + " select").each(function (index) {
            $(this).prop("disabled", !enable);
            $(this).prop("readonly", !enable);
        });

    };
    this.checkedList = function (field) {
        var result = "";

        for (var i = 0; i < this.source.length; i++) {
            var itm = this.source[i];
            var itmID = this.id + "_" + (itm.name.replace(" ", "_"));
            this.source[i].checked = ($('input[name="' + itmID + '"]:checked').length > 0);
            if (this.source[i].checked) {
                if (field != undefined) {
                    result += itm[field] + ";";
                }else
                {
                    result += itm.name+";";
                }
            }
        }

        return result;
    }
    this.val = function () {
        if (!this.enabled) {
            return;
        }

        for (var i = 0; i < this.source.length; i++) {
            var itm = this.source[i];
            var itmID = this.id + "_" + (itm.name.replace(" ", "_").replace(".", "_").replace(" ", "_"));
            this.source[i].checked = ($('input[name="' + itmID + '"]:checked').length > 0);
        }
        $("#" + this.valueid).val(JSON.stringify(this.source));

        return $("#" + this.valueid).val();
    };
}
