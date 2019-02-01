//checkbox cbx generator



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
    this.valueid=this.id + "_value";
    this.source = cbxtempsample;
    this.init = function () {
        var div = $("#" + this.id);
        div.html('');
        if (this.source.length > 0)
        {
            for(var i =0;i< this.source.length;i++)
            {
                var tt = "";
                var itm = this.source[i];
                var itmID = this.id + "_" + (itm.name.replace(" ", "_"));
                var checked = "";
                if (itm.checked == "1")
                {
                    checked = "checked";
                }
                if (itm.tooltip != null && itm.tooltip != "")
                {
                    tt = "data-toggle='tooltip' data-html='true' title='"+ itm.tooltip +"' data-placement='top'";
                }

                var template = "<div class=\"form-check form-check-inline\" " + tt+">";
                template += "<input id=\"" + itmID + "\" name=\"" + itmID + "\" type=\"checkbox\" class=\"form-check-input\" " + checked +" />";
                template += "<label class=\"form-check-label\" for=\"" + itmID + "\">" +itm.name +"</label></div>"; 
              
                div.append(template);

            }


            var valueTmp = "<input id=\"" + this.valueid + "\" name=\"" + this.valueid + "\" type=\"text\" style='visibility: hidden;'  />";
            div.append(valueTmp);

        }

    };

    this.enabled = true;//default true


    this.setEnabled = function (enable) {
        this.enabled = enable;

        $("#" + this.id + " input").each(function (index) {
            $(this).prop("disabled", !enable);
            $(this).prop("readonly", !enable);
        });
        $("#" + this.id + " select").each(function (index) {
            $(this).prop("disabled", !enable);
            $(this).prop("readonly", !enable);
        });
    };

    this.val = function ()
    {
        if (!this.enabled)
        {
            return;
        }

        for (var i = 0; i < this.source.length; i++) {
            var itm = this.source[i];
            var itmID = this.id + "_" + (itm.name.replace(" ", "_")); 
            this.source[i].checked = ($('input[name="' + itmID + '"]:checked').length > 0); 
        }
        $("#" + this.valueid).val( JSON.stringify(this.source));

        return $("#"+this.valueid).val();
    };
}
