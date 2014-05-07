$(document).ready(function() {
    
    
    $('form#formEvents input[name="location_type"]').change(function(){
        switch($(this).val()) {
            case 'store':
                $('.location-type-public').hide();        
                $('.location-type-store').show();
                break;
            case 'public':
                $('.location-type-store').hide();
                $('.location-type-public').show();
                break
            default:
                break;
        }
    });
});

function getStores(cid) {
    $.ajax({
        type: "post",
        dataType: "json",
        url: "/admin/ajax/get-store-addresses-by-city-id",
        data: {
            cid: cid
        },
        success: function(response) {
            $.each(response, function(k, v) {
                if (k === 'data') {
                    $('#stores-block').html('');
                    $.each(v, function(k1, v1) {
                        $('#stores-block').append(
                                "<label><input type=\"checkbox\" name=\"sid[]\" id=\"sid-" + v1.sid + "\" value=\"" + v1.sid + "\">" + v1.cn_address + "<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + v1.address + "</lable><br>");
                    });
                }
            });
         /*   <?php if ( isset($this->notUpdated) && isset($this->data['sid'])) { ?>
                <?php foreach ($this->data['sid'] as $sid) { ?>
                    $('#sid-<?php echo $sid ?>').attr('checked', 'true');
                <?php } ?>
            <?php } ?>
            */
        }
    });
}

function getStoresByCityName(city) {
    $.ajax({
        type: "post",
        dataType: "json",
        url: "/admin/ajax/get-store-addresses-by-city",
        data: {
            city: city
        },
        success: function(response) {
            $.each(response, function(k, v) {
                if (k === 'data') {
                    $('#stores-block').html('');
                    $.each(v, function(k1, v1) {
                        $('#stores-block').append(
                                "<label><input type=\"checkbox\" name=\"sid[]\" id=\"sid-" + v1.sid + "\" value=\"" + v1.sid + "\">" + v1.cn_address + "<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + v1.address + "</lable><br>");
                    });
                }
            });
        }
    });
}

function getStoresByAdminId() {
    $.ajax({
        type: "post",
        dataType: "json",
        url: "/admin/ajax/get-store-addresses-by-admin-id",
        data: {},
        success: function(response) {
            $.each(response, function(k, v) {
                if (k === 'data') {
                    $('#stores-block').html('');
                    $.each(v, function(k1, v1) {
                        $('#stores-block').append(
                                "<label><input type=\"checkbox\" name=\"sid[]\" id=\"sid-" + v1.sid + "\" value=\"" + v1.sid + "\">" + v1.cn_address + "<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + v1.address + "</lable><br>");
                    });
                }
            });
        }
    });
}

function getEventTeasers(size) {
    $.ajax({
        type: "post",
        dataType: "json",
        url: "/admin/ajax/get-event-teasers",
        data: {
            size: size
        },
        success: function(response) {
            $.each(response, function(k, v) {
                if (k === 'data') {
                    $('#teasers'+size).html('');
                //    $('#image'+size).html('');
                    $.each(v, function(k1, v1) {
                        $('#teasers'+size).append(
                                "<option value=\"" + v1 + "\">" + v1 + "</option>");
                //        $('#image'+size).append("<option value=\"" + v1 + "\">" + v1 + "</option>");
                    });
                    $('#teasers'+size).trigger("liszt:updated");
                //    $('#image'+size).trigger("liszt:updated");
                }
            });
        }
    });
}


