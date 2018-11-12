/**
 * Created by walter on 17.12.15.
 */

function parseResponse(response) {
    if (response.replaces instanceof Array) {
        for (var i = 0, ilen = response.replaces.length; i < ilen; i++) {
            $(response.replaces[i].what).replaceWith(response.replaces[i].data);
        }
    }
    if (response.append instanceof Array) {
        for (i = 0, ilen = response.append.length; i < ilen; i++) {
            $(response.append[i].what).append(response.append[i].data);
        }
    }
    if (response.content instanceof Array) {
        for (i = 0, ilen = response.content.length; i < ilen; i++) {
            $(response.content[i].what).html(response.content[i].data);
        }
    }
    if (response.js) {
        $("body").append(response.js);
    }
    if (response.refresh) {
        window.location.reload(true);
    }
    if (response.redirect) {
        window.location.href = response.redirect;
    }
}

function executeAjaxRequest(url, data, type, successCallback, completeCallback) {
    var csrfParam = $('meta[name="csrf-param"]').attr('content');
    var csrfToken = $('meta[name="csrf-token"]').attr('content');

    var postData = {};
    if (!type) {
        type = 'GET';
        postData[csrfParam] = csrfToken;
    }
    postData = data ? $.extend(postData, data) : postData;

    jQuery.ajax({
        'cache': false,
        'type': type,
        'dataType': 'json',
        'data': postData,
        'success': successCallback ? successCallback : function (response) {
                parseResponse(response);
            },
        'error': function (response) {
            alert(response.responseText);
        },
        'beforeSend': function () {
        },
        'complete': completeCallback ? completeCallback : function () {
            },
        'url': url
    });
}

function backgrounds() {

    var backgrounds = document.querySelectorAll('[data-bg-src]');
    var backgroundsLen = backgrounds.length;
    var i = 0;

    for (i; i < backgroundsLen; i++) {
        var block = backgrounds[i];

        var src = block.getAttribute("data-bg-src") || "";
        var size = block.getAttribute("data-bg-size") || "auto";
        var pos = block.getAttribute("data-bg-pos") || "auto";
        var repeat = "no-repeat";

        block.style.background = "url(" + src + ") " + pos + " / " + size + " " + repeat;
    }
};

$(function () {
    $(document).on('click', 'a.ajax-link', function (event) {
        event.preventDefault();
        var that = this;
        if ($(that).data('confirm') && !confirm($(that).data('confirm'))) {
            return false;
        }
        executeAjaxRequest(that.href, $(that).data('params'))
    });

    $(document).on('submit', '.ajax-form', function (event) {
        event.preventDefault();
        var that = this;
        var formData = new FormData(that);
        jQuery.ajax({
            'cache': false,
            'type': 'POST',
            'dataType': 'json',
            'data': formData,
            'processData': false,
            'contentType': false,
            'success': function (response) {
                parseResponse(response);
            },
            'error': function (response) {
                alert(response.responseText);
            },
            'beforeSend': function () {
            },
            'complete': function () {
            },
            'url': that.action
        });
    });

    $(document).on("click", ".form-submit", function (e) {
        e.preventDefault();
        var form = $(this).parents('form');
        if (form.length) {
            form.submit();
        } else {
            var formId = $(this).data('id');
            $('#' + formId).submit();
        }
    });

    /* team page - loadMore btn click */
    $(document).on("click", "[data-load_more_team_url]", function (e) {
        e.preventDefault();
        var url = $(this).data('load_more_team_url');

        jQuery.ajax({
            'cache': false,
            'type': 'GET',
            'dataType': 'json',
            'data': {},
            'success': function (response) {
                parseResponse(response);
                backgrounds();
            },
            'url': url
        });
    });

    /* articles page - loadMore btn click */
    $(document).on("click", "[data-load_more_articles_url]", function (e) {
        e.preventDefault();
        var url = $(this).data('load_more_articles_url');

        jQuery.ajax({
            'cache': false,
            'type': 'GET',
            'dataType': 'json',
            'data': {},
            'success': function (response) {
                parseResponse(response);
            },
            'url': url
        });
    });

    $(document).on('pjax:success', function(e) {
        var $container = $(e.target);
        if ($container.attr('id') === 'publications_pjax') {
            tools.backgrounds(); // init images
        }
    });

    $(document).on('click', '.publications__sorting', function(e) {
        console.log();
        var btn = $('.publications__sorting');
        var nav = $('.publications__nav');
        if(btn.hasClass('publications__sorting_active')){
            nav.slideUp();
            btn.removeClass('publications__sorting_active');
        }else{
            nav.slideDown();
            btn.addClass('publications__sorting_active');
        }
    });

    $(document).on('click', function(e){
        var btn = $('.publications__sorting');
        var target = $(e.target);
        var nav = $('.publications__nav');
        if (!target.hasClass('publications__sorting')){
            nav.slideUp();
            btn.removeClass('publications__sorting_active');
        }
    });
});
