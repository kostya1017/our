/*!
 * validation.js for Native Software 
 *
 * Copyright 2014 v2.0.0
 * Created By Amit Parekh
 * Created Date 10/07/2014
 * Modify By Amit Parekh
 * Modify Date 18/09/2014
 */

//------------------[ User defined functions ]------------------//
function validateData(requiredClass, displayType) {
    var validationSummary = "<ul>";
    if (requiredClass == undefined) {
        requiredClass = "";
    }
    var cnt = 0;
    $.each($("." + (requiredClass != "" ? requiredClass : "nat-required")), function () {

        if ($(this).val().trim() == "") {
            if (displayType == '1') {
                validationSummary += "<li>" + $(this).attr("requirederrormessage") + "</li>";
            }
            else if (displayType == '2') {
                showErrorMessage($(this), "requirederrormessage");
                return false;
            }
            else {
                validationSummary += "<li>" + $(this).attr("requirederrormessage") + "</li>";
                showErrorMessage($(this), "requirederrormessage");
            }
            cnt++;
            //return false;
        }
    });

    $.each($(".nat-custom"), function () {
        var customFunction = $(this).attr("customfunction");
        if (customFunction != undefined) {
            if ($(this).parent().find("span.nat-err-msg").length == 0 || $(this).parent().find("span.uniqueerrormessage").length == 1) {
                var result = window[customFunction]($(this).val());
                if (result) {
                    if (displayType == '1') {
                        validationSummary += "<li>" + $(this).attr("customerrormessage") + "</li>";
                    }
                    else if (displayType == '2') {
                        showErrorMessage($(this), "customerrormessage");
                    }
                    else {
                        validationSummary += "<li>" + $(this).attr("customerrormessage") + "</li>";
                        showErrorMessage($(this), "customerrormessage");
                    }
                    cnt++;
                }
                else {
                    hideErrorMessage($(this), "customerrormessage");
                }
            }
            else {
                if ($(this).parent().find("span.nat-err-msg").length > 1) {
                    hideErrorMessage($(this), "customerrormessage");
                }
            }
        }
        else {
            hideErrorMessage($(this), "customerrormessage");
        }
    });

    if (cnt > 0) {
        if (validationSummary != '<ul>') {
            validationSummary += "</ul>";
            showValidationSummary(validationSummary);
        }
        return false;
    }
    else {
        $.each($(".nat-err-msg"), function () {

            if (requiredClass != "") {
                var reqcls = $(this).siblings(".nat-required").attr("class");
                
                if (!(reqcls == undefined || reqcls == "undefined")) {
                    if (reqcls.indexOf(requiredClass) >= 0) {
                        if ($(this).text() != "") {//&& $(this).css('display') == 'block') {
                            validationSummary += "<li>" + $(this).text() + "</li>";
                            cnt++;
                        }
                    }
                }
            }
            else {
                if ($(this).text() != "" && $(this).css('display') == 'block') {
                    validationSummary += "<li>" + $(this).text() + "</li>";
                    cnt++;
                }
            }

        });
        if (cnt > 0) {
            if (validationSummary != '<ul>') {
                validationSummary += "</ul>";
                showValidationSummary(validationSummary);
            }
            return false;
        }
        else {
            $.each($(".required-text"), function () {
                if (requiredClass != "") {
                    var reqcls = $(this).siblings(".nat-required").attr("class");
                    if (!(reqcls == undefined || reqcls == "undefined")) {
                        if (reqcls.indexOf(requiredClass) >= 0) {
                            if ($(this).text() != "") {//&& $(this).css('display') == 'block') {
                                validationSummary += "<li>" + $(this).text() + "</li>";
                                cnt++;
                            }
                        }
                    }
                } else {
                    validationSummary += "<li>" + $(this).text() + "</li>";
                    cnt++;
                }
            });
            if (cnt > 0) {
                if (validationSummary != '<ul>') {
                    validationSummary += "</ul>";
                    showValidationSummary(validationSummary);
                }
                return false;
            }
            else {
                hideValidationSummary();
                return true;
            }
        }
    }
}

//------------------[ Validation Script ]------------------//
$(document).ready(function () {

    jQuery.expr.filters.offscreen = function (el) {
        return (
                    (el.offsetLeft + el.offsetWidth) < 0
                    || (el.offsetTop + el.offsetHeight) < 0
                    || (el.offsetLeft > window.innerWidth || el.offsetTop > window.innerHeight)
               );
    };

    $.each($(".nat-compare"), function () {
        natCompareAssignSource($(this));
    });

    $(".modal").on('hidden', function () {
        resetValidation();
    });

    //------------------[ focus Events ]------------------//

    $(document).on("focus", ".nat-required", function () {
        //$(".nat-required").focus(function () {
        natRequiredFocus($(this));
    });

    //------------------[ keydown Events ]------------------//

    //A-Z : 65-90
    //0-9 : 48-57, Numpad 0-9 : 96-105
    //Space : 32
    //Backspace : 8
    //Delete : 46
    //Enter : 13
    //Tab : 9
    //Shift : 16
    //Esc : 27
    //Ctrl : 17
    //Arrow : 37-40
    //Function Keys (F1-F12) : 112-123

    $(document).on("keydown", ".nat-alphabet", function (event) {
        //$(".nat-alphabet").keydown(function (event) {
        natAlphabetKeyDown($(this), event);
    });

    $(document).on("keydown", ".nat-number", function (event) {
        //$(".nat-number").keydown(function (event) {
        natNumberKeyDown($(this), event);
    });

    $(document).on("keydown", ".nat-alphanumeric", function (event) {
        //$(".nat-alphanumeric").keydown(function (event) {
        natAlhpaNumericKeyDown($(this), event);
    });

    //------------------[ blur Events ]------------------//
    $(document).on("blur", ".nat-required", function () {
        //$(".nat-required").blur(function () {
        natRequiredBlur($(this));
    });

    $(document).on("blur", ".nat-alphabet", function () {
        //$(".nat-alphabet").blur(function () {
        natAlphabetBlur($(this));
    });

    $(document).on("blur", ".nat-number", function () {
        //$(".nat-number").blur(function () {
        natNumberBlur($(this));
    });

    $(document).on("blur", ".nat-alphanumeric", function () {
        //$(".nat-alphanumeric").blur(function () {
        natAlphaNumericBlur($(this));
    });

    $(document).on("blur", ".nat-string", function () {
        //$(".nat-string").blur(function () {
        natStringBlur($(this));
    });

    $(document).on("blur", ".nat-email", function () {
        //$(".nat-email").blur(function () {
        natEmailBlur($(this));
    });

    $(document).on("blur", ".nat-url", function () {
        //$(".nat-url").blur(function () {
        natURLBlur($(this));
    });

    $(document).on("blur", ".nat-regex", function () {
        //$(".nat-regex").blur(function () {
        natRegexBlur($(this));
    });

    $(document).on("blur", ".nat-compare", function () {
        //$(".nat-compare").blur(function () {
        natCompareBlur($(this));
    });

    $(document).on("blur", ".nat-compare-source", function () {
        //$(".nat-compare-source").blur(function () {
        natCompareSourceBlur($(this));
    });

    $(document).on("blur", ".nat-unique", function () {
        //$(".nat-unique").blur(function () {
        natUniqueBlur($(this));
    });

    $(document).on("blur", ".nat-custom", function () {
        //$(".nat-custom").click(function () {
        natCustomClick($(this));
    });
});

//------------------[ Validation Summary Close ]------------------//
$(document).on("click", ".validation-summary a", function () {
    hideValidationSummary();
});

//------------------[ Functions ]------------------//

function showErrorMessage(obj, errorMessageAttr) {
    
    obj.addClass("required-text");
    var errorMessage = obj.attr(errorMessageAttr);
    if (errorMessage != undefined && errorMessage != "undefined" && errorMessage != "") {
        if (obj.parent().find("span." + errorMessageAttr).length == 0) {
            obj.parent().append("<span class='" + errorMessageAttr + " nat-err-msg'>" + errorMessage + "</span>");
        }
        else {
            obj.parent().find("span." + errorMessageAttr).text(errorMessage);
        }
    }
}

function hideErrorMessage(obj, errorMessageAttr) {
    obj.parent().find("span." + errorMessageAttr).remove();
    if (obj.parent().find("span.nat-err-msg").length == 0) {
        obj.removeClass("required-text");
    }
}

function resetValidation(obj) {
    if (obj == undefined) {
        $(".nat-err-msg").each(function () {
            $(this).remove();
        });
        $(".required-text").each(function () {
            $(this).removeClass("required-text");
        });
    }
    else {
        obj.next(".nat-err-msg").remove();
        obj.removeClass("required-text");
    }
}

function natRequiredFocus(obj) {
    hideErrorMessage(obj, "requirederrormessage");
}

function natAlphabetKeyDown(obj, event) {
    if (obj.attr("allowspace") == "true") {
        if (event.which == 32) {
            return true;
        }
    }
    if (!((event.which >= 65 && event.which <= 90) || event.which == 8 || event.which == 46 || event.which == 13 || event.which == 9 || event.which == 27 || event.which == 17 || (event.which >= 37 && event.which <= 40) || (event.which >= 112 && event.which <= 123))) {
        event.preventDefault();
    }
}

function natNumberKeyDown(obj, event) {
    debugger;
    if (obj.attr("allowdecimal") == "true") {
        if (event.which == 190 || event.which == 110) {
            return true;
        }
    }
    if (obj.attr("allowspace") == "true") {
        if (event.which == 32) {
            return true;
        }
    }
    if (!event.shiftKey || (event.shiftKey && event.which == 9)) {
        if (!((event.which >= 48 && event.which <= 57) || (event.which >= 96 && event.which <= 105) || event.which == 8 || event.which == 46 || event.which == 13 || event.which == 9 || event.which == 27 || event.which == 17 || (event.which >= 37 && event.which <= 40) || (event.which >= 112 && event.which <= 123))) {
            event.preventDefault();
        }
    }
    else {
        event.preventDefault();
    }
}

function natAlhpaNumericKeyDown(obj, event) {
    if (obj.attr("allowspace") == "true") {
        if (event.which == 32) {
            return true;
        }
    }
    if (!event.shiftKey || (event.shiftKey && event.which == 9) || (event.shiftKey && (event.which >= 65 && event.which <= 90))) {
        if (!((event.which >= 65 && event.which <= 90) || (event.which >= 48 && event.which <= 57) || (event.which >= 96 && event.which <= 105) || event.which == 8 || event.which == 46 || event.which == 13 || event.which == 9 || event.which == 27 || event.which == 17 || (event.which >= 37 && event.which <= 40) || (event.which >= 112 && event.which <= 123))) {
            event.preventDefault();
        }
    }
    else {
        event.preventDefault();
    }
}

function natRequiredBlur(obj) {
    if (obj.val().trim() == "") {
        showErrorMessage(obj, "requirederrormessage");
    }
    else {
        hideErrorMessage(obj, "requirederrormessage");
    }
}

function natAlphabetBlur(obj) {
    if (obj.val().trim() != "") {
        if (obj.attr("minlength") != undefined) {
            if (obj.val().length < obj.attr("minlength")) {
                showErrorMessage(obj, "valuelengtherrormessage");
            }
            else {
                hideErrorMessage(obj, "valuelengtherrormessage");
            }
        }
        var regExp = new RegExp(/^[a-zA-Z]+$/i);
        if (obj.attr("allowspace") == "true") {
            regExp = new RegExp(/^[a-zA-Z\s]+$/i);
        }
        if (regExp.test(obj.val())) {
            hideErrorMessage(obj, "valueerrormessage");
        }
        else {
            showErrorMessage(obj, "valueerrormessage");
        }
    }
    else {
        hideErrorMessage(obj, "valuelimiterrormessage");
        hideErrorMessage(obj, "valueerrormessage");
    }
}

function natNumberBlur(obj) {
    if (obj.val().trim() != "") {
        if (obj.attr("minlength") != undefined) {
            if (obj.val().length < obj.attr("minlength")) {
                showErrorMessage(obj, "valuelengtherrormessage");
            }
            else {
                hideErrorMessage(obj, "valuelengtherrormessage");
            }
        }
        if (obj.attr("minvalue") != undefined) {
            if (parseFloat(obj.val()) < parseFloat(obj.attr("minvalue"))) {
                showErrorMessage(obj, "minvalueerrormessage");
            }
            else {
                hideErrorMessage(obj, "minvalueerrormessage");
            }
        }
        
        var regExp = new RegExp(/^[\d]+$/i);
        if (obj.attr("allowspace") == "true") {
            regExp = new RegExp(/^[\d\s]+$/i);
        }

        var regExp = new RegExp(/^\d+(\.\d{1,2})?$/);
        if (obj.attr("allowdecimal") == "true") {
            regExp = new RegExp(/^\d+(\.\d{1,2})?$/);
        }

        if (regExp.test(obj.val())) {
            hideErrorMessage(obj, "valueerrormessage");
        }
        else {
            showErrorMessage(obj, "valueerrormessage");
        }
    }
    else {
        hideErrorMessage(obj, "valuelengtherrormessage");
        hideErrorMessage(obj, "valueerrormessage");
    }
}

function natAlphaNumericBlur(obj) {
    if (obj.val().trim() != "") {
        if (obj.attr("minlength") != undefined) {
            if (obj.val().length < obj.attr("minlength")) {
                showErrorMessage(obj, "valuelengtherrormessage");
            }
            else {
                hideErrorMessage(obj, "valuelengtherrormessage");
            }
        }
        var regExp = new RegExp(/^[a-zA-Z\d]+$/i);
        if (obj.attr("allowspace") == "true") {
            regExp = new RegExp(/^[a-zA-Z\d\s]+$/i);
        }
        if (regExp.test(obj.val())) {
            hideErrorMessage(obj, "valueerrormessage");
        }
        else {
            showErrorMessage(obj, "valueerrormessage");
        }
    }
    else {
        hideErrorMessage(obj, "valuelengtherrormessage");
        hideErrorMessage(obj, "valueerrormessage");
    }
}

function natStringBlur(obj) {
    if (obj.val().trim() != "") {
        if (obj.attr("minlength") != undefined) {
            if (obj.val().length < obj.attr("minlength")) {
                showErrorMessage(obj, "valuelengtherrormessage");
            }
            else {
                hideErrorMessage(obj, "valuelengtherrormessage");
            }
        }
    }
    else {
        hideErrorMessage(obj, "valuelengtherrormessage");
    }
}

function natEmailBlur(obj) {
    var RegPattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
    if (obj.val().trim() != "") {
        var minValues = obj.attr("minvalues");
        var maxValues = obj.attr("maxvalues");
        var values = obj.val().split(",");

        if (minValues == undefined && maxValues == undefined) {
            if (values.length > 1) {
                showErrorMessage(obj, "valueerrormessage");
                return;
            }
        } else if (minValues != "" && minValues != undefined) {
            if (values.length < minValues) {
                showErrorMessage(obj, "valuelimiterrormessage");
                return;
            }
            else {
                hideErrorMessage(obj, "valuelimiterrormessage");
            }
        } else if (maxValues != "" && maxValues != undefined) {
            if (values.length > maxValues) {
                showErrorMessage(obj, "valuelimiterrormessage");
                return;
            }
            else {
                hideErrorMessage(obj, "valuelimiterrormessage");
            }
        }

        if (values.length > 0) {
            for (var i = 0; i < values.length; i++) {
                if (!RegPattern.test(values[i].trim())) {
                    showErrorMessage(obj, "valueerrormessage");
                    return;
                }
            }
            if (i == values.length) {
                hideErrorMessage(obj, "valueerrormessage");
            }
        }
        else {
            hideErrorMessage(obj, "valueerrormessage");
        }
    }
    else {
        hideErrorMessage(obj, "valueerrormessage");
        hideErrorMessage(obj, "valuelimiterrormessage");
    }
}

function natURLBlur(obj) {
    var RegPattern = new RegExp(/((ftp|http|https):\/\/)?[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?/);
    if (obj.val().trim() != "") {
        var minValues = obj.attr("minvalues");
        var maxValues = obj.attr("maxvalues");
        var values = obj.val().split(",");

        if (minValues == undefined && maxValues == undefined) {
            if (values.length > 1) {
                showErrorMessage(obj, "valueerrormessage");
                return;
            }
        } else if (minValues != "" && minValues != undefined) {
            if (values.length < minValues) {
                showErrorMessage(obj, "valuelimiterrormessage");
                return;
            }
            else {
                hideErrorMessage(obj, "valuelimiterrormessage");
            }
        } else if (maxValues != "" && maxValues != undefined) {
            if (values.length > maxValues) {
                showErrorMessage(obj, "valuelimiterrormessage");
                return;
            }
            else {
                hideErrorMessage(obj, "valuelimiterrormessage");
            }
        }

        if (values.length > 0) {
            for (var i = 0; i < values.length; i++) {
                if (!RegPattern.test(values[i].trim())) {
                    showErrorMessage(obj, "valueerrormessage");
                    return;
                }
            }
            if (i == values.length) {
                hideErrorMessage(obj, "valueerrormessage");
            }
        }
        else {
            hideErrorMessage(obj, "valueerrormessage");
        }
    }
    else {
        hideErrorMessage(obj, "valueerrormessage");
        hideErrorMessage(obj, "valuelimiterrormessage");
    }
}

function natRegexBlur(obj) {
    var RegPattern = new RegExp(obj.attr("valueexpression"));
    if (obj.val().trim() != "") {
        var minValues = obj.attr("minvalues");
        var maxValues = obj.attr("maxvalues");
        var values = obj.val().split(",");

        if (minValues == undefined && maxValues == undefined) {
            if (values.length > 1) {
                showErrorMessage(obj, "valueerrormessage");
                return;
            }
        } else if (minValues != "" && minValues != undefined) {
            if (values.length < minValues) {
                showErrorMessage(obj, "valuelimiterrormessage");
                return;
            }
            else {
                hideErrorMessage(obj, "valuelimiterrormessage");
            }
        } else if (maxValues != "" && maxValues != undefined) {
            if (values.length > maxValues) {
                showErrorMessage(obj, "valuelimiterrormessage");
                return;
            }
            else {
                hideErrorMessage(obj, "valuelimiterrormessage");
            }
        }

        if (values.length > 0) {
            for (var i = 0; i < values.length; i++) {
                if (!RegPattern.test(values[i].trim())) {
                    showErrorMessage(obj, "valueerrormessage");
                    return;
                }
            }
            if (i == values.length) {
                hideErrorMessage(obj, "valueerrormessage");
            }
        }
        else {
            hideErrorMessage(obj, "valueerrormessage");
        }
    }
    else {
        hideErrorMessage(obj, "valueerrormessage");
        hideErrorMessage(obj, "valuelimiterrormessage");
    }
}

function natCompareBlur(obj) {
    var basefield = obj.attr("comparefieldid");
    if (obj.val().trim() != "") {
        if (obj.val() != $("#" + basefield).val()) {
            showErrorMessage(obj, "compareerrormessage");
        }
        else {
            hideErrorMessage(obj, "compareerrormessage");
        }
    }
    else {
        hideErrorMessage(obj, "compareerrormessage");
    }
}

function natCompareAssignSource(obj) {
    var basefield = obj.attr("comparefieldid");
    $("#" + basefield).addClass("nat-compare-source");
    $("#" + basefield).attr("destfieldid", obj.attr("id"));
}

function natCompareSourceBlur(obj) {
    var destfield = obj.attr("destfieldid");
    if (obj.val().trim() != "") {
        if (obj.val() != $("#" + destfield).val() && $("#" + destfield).val() != "") {
            showErrorMessage($("#" + destfield), "compareerrormessage");
        }
        else {
            hideErrorMessage($("#" + destfield), "compareerrormessage");
        }
    }
    else {
        hideErrorMessage($("#" + destfield), "compareerrormessage");
    }
}

function natUniqueBlur(obj) {
    var uniqueFunction = obj.attr("uniquefunction");
    if (uniqueFunction != undefined) {
        if (obj.parent().find("span.nat-err-msg").length == 0 || obj.parent().find("span.uniqueerrormessage").length == 1) {
            var result = window[uniqueFunction](obj.val());
            if (result) {
                showErrorMessage(obj, "uniqueerrormessage");
            }
            else {
                hideErrorMessage(obj, "uniqueerrormessage");
            }
        }
        else {
            if (obj.parent().find("span.nat-err-msg").length > 1) {
                hideErrorMessage(obj, "uniqueerrormessage");
            }
        }
    }
    else {
        hideErrorMessage(obj, "uniqueerrormessage");
    }
}

function natCustomClick(obj) {
    var customFunction = obj.attr("customfunction");
    if (customFunction != undefined) {
        var result = window[customFunction](obj.val());
        if (result) {
            showErrorMessage(obj, "customerrormessage");
        }
        else {
            hideErrorMessage(obj, "customerrormessage");
        }
    }
    else {
        hideErrorMessage(obj, "customerrormessage");
    }
}

//------------------[ Public Functions ]------------------//

function bindNatRequiredEvents(obj) {
    obj.addClass("nat-required");
    obj.bind('focus', function () {
        natRequiredFocus(obj);
    });

    obj.bind('blur', function () {
        natRequiredBlur(obj);
    });
}

function bindNatAlphabetEvents(obj) {
    obj.bind('keydown', function (event) {
        natAlphabetKeyDown(obj, event);
    });

    obj.bind('blur', function () {
        natAlphabetBlur(obj);
    });
}

function bindNatNumberEvents(obj) {
    obj.bind('keydown', function (event) {
        natNumberKeyDown(obj, event);
    });

    obj.bind('blur', function () {
        natNumberBlur(obj);
    });
}

function bindNatAlhpaNumericEvents(obj) {
    obj.bind('keydown', function (event) {
        natAlhpaNumericKeyDown(obj, event);
    });

    obj.bind('blur', function () {
        natAlphaNumericBlur(obj);
    });
}

function bindNatStringEvents(obj) {
    obj.bind('blur', function () {
        natStringBlur(obj);
    });
}

function bindNatEmailEvents(obj) {
    obj.bind('blur', function () {
        natEmailBlur(obj);
    });
}

function bindNatURLEvents(obj) {
    obj.bind('blur', function () {
        natURLBlur(obj);
    });
}

function bindNatRegexEvents(obj) {
    obj.bind('blur', function () {
        natRegexBlur(obj);
    });
}

function bindNatCompareEvents(obj) {
    obj.bind('blur', function () {
        natCompareBlur(obj);
    });

    natCompareAssignSource(obj);
}

function bindNatUniqueEvents(obj) {
    obj.bind('blur', function () {
        natUniqueBlur(obj);
    });
}

function bindNatCustomEvents(obj) {
    obj.bind('click', function () {
        natCustomClick(obj);
    });
}

function showValidationSummary(validationSummary) {
    try {

        if (validationSummary != "") {
            try {
                $(".validation-summary").find('ul').remove();
            } catch (e) {

            }
            $(".validation-summary").prepend(validationSummary);
            $(".validation-summary").show();
            //if ($('.validation-summary').is(':offscreen'))
            $(window).scrollTop($('.validation-summary').offset().top - 300);
        }

    } catch (e) {

    }
}

function hideValidationSummary() {
    try {

        $(".validation-summary").find('ul').remove();
        $(".validation-summary").hide();

    } catch (e) {

    }
}

function addValidation(obj, validationClass, validationGroupClass, validationErrorMessageAttr, validationErrorMessage, objLabel) {
    if (objLabel != "") {
        objLabel.addClass("required-label");
    }
    obj.addClass(validationClass);
    obj.addClass(validationGroupClass);
    if (validationErrorMessageAttr != "") {
        obj.attr(validationErrorMessageAttr, validationErrorMessage);
    }
}

function removeValidation(obj, validationClass, validationGroupClass, validationErrorMessageAttr, objLabel) {
    if (objLabel != "") {
        objLabel.removeClass("required-label");
    }
    obj.removeClass(validationClass);
    obj.removeClass(validationGroupClass);
    if (validationErrorMessageAttr != "") {
        obj.removeAttr(validationErrorMessageAttr);
    }
    resetValidation(obj);
}