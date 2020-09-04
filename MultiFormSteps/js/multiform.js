var lang = "";
$(function(){
    lang = $("body").hasClass("en") ? true : false;

    // poputMessage({"type":"warning","message": "ok","time":6000});

    //all form validation 
    //menu dropdown
    $(".logistics_nav .nav_right ul li.typeSelect").hover(function(){
        $(this).find("dl").show();
    },function(){
        $(this).find("dl").hide();
    });

    //select transformation
    $("#checkTransIcon .check_sort").on('click', function(e){
        var elementIndex = $(this).attr("data-value");
        var elementHasClass = $(this).hasClass("check_checked");   
        
        // console.log(e)

        if(elementIndex == 5){
            if(e.target.nodeName != "INPUT"){
                if(elementHasClass) {
                    $(this).removeClass("check_checked");
                    $("#checkTransIcon input.checkOthersinput").val("");
                } else{
                    $(this).addClass("check_checked");
                } 
                elementHasClass ? $("#checkTransIcon input.checkOthersinput").hide() : $("#checkTransIcon input.checkOthersinput").show();
            }
        }else{
            elementHasClass ? $(this).removeClass("check_checked") : $(this).addClass("check_checked");
        }
           
         var checklistVal = $("#checkTransIcon .check_sort.check_checked");
        if(checklistVal.length > 0 ){
            $("#part1 .check p.checkBoxValidate").removeClass("warningBlock");
        }
        else{
            $("#part1 .check p.checkBoxValidate").addClass("warningBlock");
        }       


        // var chekValue5 = $("#checkTransIcon .value5.check_checked");
        // var chekValue6 = $("#checkTransIcon .check_checked.value5");
        // if(chekValue5){
        //     $("#checkTransIcon .value5.check_checked input").show();
        // }
        // if(chekValue6){
        //     $("#checkTransIcon .value5.check_checked input").hide();
        // }

        // $("#checkTransIcon .value5.check_checked").on('click', function(){
        //     var chekValue5 = $("#checkTransIcon .value5.check_checked input").val();
        //     console.log(chekValue5)
        //     if(chekValue5 == ''){
        //         $("#checkTransIcon .value5").removeClass('check_checked');
        //     }else{
        //         $("#checkTransIcon .value5").addClass('check_checked');
        //     }
        // })

        var newArrar = [];
        $(checklistVal).each(function() {
            newArrar.push($(this).attr('data-value'));
            $("#checkTransIcon").attr('data-value', newArrar.toString())
        });

        
    })
    
    //radio
    $(".radio_icons").attr('data-value',"1");
    $("#radioTransIcon .radio_sort.general").on('click', function(){
        $(this).addClass("radio_check");
        $("#radioTransIcon .radio_sort.chemical, #radioTransIcon .radio_sort.dangerous").removeClass("radio_check");
        $(this).attr('data-value');
        $(".radio_icons").attr('data-value',"1");
    })
    $("#radioTransIcon .radio_sort.chemical").on('click', function(){
        $(this).addClass("radio_check");
        $("#radioTransIcon .radio_sort.general, #radioTransIcon .radio_sort.dangerous").removeClass("radio_check");
        $(this).attr('data-value');
        $(".radio_icons").attr('data-value',"2");
    })
    $("#radioTransIcon .radio_sort.dangerous").on('click', function(){
        $(this).addClass("radio_check");
        $("#radioTransIcon .radio_sort.general, #radioTransIcon .radio_sort.chemical").removeClass("radio_check");
        $(this).attr('data-value');
        $(".radio_icons").attr('data-value',"3");
    })

    //append the package
    $('#addPackage').on('click',function(){
        var length = $(".packing_Div .packClassAdd #add_qwer123 .adding_OnclickFunction").first().html();
        $(".packing_Div .packClassAdd #add_qwer123").append("<div class='adding_OnclickFunction'>"+length+"</div>");
        customFun()
    });

    //delete
    $("#add_packageAdding").on('click', ".deletePackage", function(){
        if($(".packing_Div .packClassAdd .adding_OnclickFunction").length!=1){
            $(this).parents(".adding_OnclickFunction").remove()  //there judge
            customFun()
        }
    });

    //onkeypress
    $("input.inputValide, textarea.inputValide, input.inputBorderVal").on('keypress', function(e){
        $(this).css({'border': '1px solid #2296F3', 'background-color': '#ffffff'});
        $(this).siblings("p").removeClass("warningBlock");
    });

    $("textarea.inputBorderVal, input.inputBorderVal").on('keypress', function(e){
        $(this).css({'border': '1px solid #2296F3', 'background-color': '#ffffff'});
    });

    function customFun(){
        $(".adding_OnclickFunction").each(function(k,v){
            $(this).find('.head .text .packingCount').text(k+1);
        }); 
        $(".adding_OnclickFunction").find('.head .deletePackage').addClass("del_iconA");
        if($(".adding_OnclickFunction").length == 1){
            $(".adding_OnclickFunction .head .deletePackage").removeClass("del_iconA").addClass("del_icon");
        }

        $("input.inputValide, textarea.inputValide").on('keypress', function(e){
            $(this).siblings("p").removeClass("warningBlock");
            $(this).css({'border': '1px solid #2296F3', 'background-color': '#ffffff'});
        });
    }
    

    //decimal validation
    $("#add_packageAdding").on('keypress', ".pakVal input.inputValide", function(){
        var $this = $(this);
        if ((event.which != 46 || $this.val().indexOf('.') != -1) &&
        ((event.which < 48 || event.which > 57) &&
        (event.which != 0 && event.which != 8))) {
            event.preventDefault();
        }
    
        var text = $(this).val();
        if ((event.which == 46) && (text.indexOf('.') == -1)) {
            setTimeout(function() {
                if ($this.val().substring($this.val().indexOf('.')).length > 3) {
                    $this.val($this.val().substring(0, $this.val().indexOf('.') + 3));
                }
            }, 1);
        }
    
        if ((text.indexOf('.') != -1) &&
            (text.substring(text.indexOf('.')).length > 2) &&
            (event.which != 0 && event.which != 8) &&
            ($(this)[0].selectionStart >= text.length - 2)) {
            event.preventDefault();
        }
    });

    $("#add_packageAdding").bind('paste', ".pakVal input.inputValide", function(){
        var text = e.originalEvent.clipboardData.getData('Text');
        if ($.isNumeric(text)) {
            if ((text.substring(text.indexOf('.')).length > 3) && (text.indexOf('.') > -1)) {
                e.preventDefault();
                $(this).val(text.substring(0, text.indexOf('.') + 3));
            }
        }else{
            e.preventDefault();
        }
    });

    // $("#add_packageAdding").on('keypress', ".pakVal input.inputValide", function(){
    //     if ($(this).val().match(/[\u4E00-\u9FFF\u3400-\u4DFF\uF900-\uFAFF]+/g)) {
    //         alert('Chinese character sets');
    //     }
    //     else{
    //         alert('English');
    //     } 
    // });



    // textarea message count
    var maxLength = 1000;
    $('textarea#commudityDiscription').keyup(function() {
        var length = $(this).val().length;
        var length = maxLength-length;
        $('#chars').text(length);
    });

    var maxLength2 = 1000;
    $('textarea#adRemarks').keyup(function() {
        var length = $(this).val().length;
        var length = maxLength2-length;
        $('#chars2').text(length);
    });

    //upload validation
    // if(lang){
    //     picWindowNewUpload("file_upload", "uploadFa1", "fileType", '', false, false, true, '10MB', true, 0,3);
    // }
    // else{
    //     picWindowNewUpload("file_upload", "uploadFa1", "fileType", '', false, false, false, '10MB', true, 0,3);
    // }


    //part1 Validation
    $("#btn_part1").click(function(){
        let state = false
        var inputs = $(".js_val .inputValide");
        for(var i=0;i<inputs.length;i++) {
            if(inputs[i].value == "") {
                $(inputs[i]).css({'border': '1px solid red'});
                $(inputs[i]).siblings("p").addClass("warningBlock");
                state = false
            }
            else{
                state = true
            }
        }
        var checklist = $("#checkTransIcon .check_sort.check_checked");
        if(checklist.length == 0){
            $("#part1 .check p.checkBoxValidate").addClass("warningBlock");
            return false
            state = false
        }
        else{
            $("#part1 .check p.checkBoxValidate").removeClass("warningBlock");
            state = true
        }

        if($(".messageRequired").val().length >= 1000) {
            var txt = lang ? "Messages should not more than 1000 words" : "留言最多不能超过1000字";
            poputMessage({"type":"warning","message": txt,"time":3000});
            return false;
            state = false
        }
        else{
            state = true
        }

        for(var i=0;i<inputs.length;i++) {
            if(inputs[i].value == "") {
                return false
                state = false
            }
            else{
                state = true
            }
        }
        
        for(var i=0;i<inputs.length;i++) {
            if($.trim(inputs[i].value) == "") {
                $(inputs[i]).css({'border': '1px solid red'});
                $(inputs[i]).siblings("p").addClass("warningBlock");
                state = false
                return false
            }
        }

        var pattren = /^\d+(\.\d{1,2})?$/;
        var inputfieldText = $(".pakVal input.inputValide");
        for(var i=0;i<inputfieldText.length;i++){
            if(!pattren.test($(inputfieldText[i]).val())){
                console.log($(".pakWeight").val())
                var txt = lang ? "Format exp: 1.0, 111.00" : "格式范例: 1.0, 111.00";
                poputMessage({"type":"warning","message": txt,"time":3000});
                state = false
                return false
            }
        }

        var valueLength = $(".pakVal input.inputValide");
        for(var i=0;i<valueLength.length;i++){
            if(valueLength[i].value <= 0){
                $(valueLength[i]).css({'border': '1px solid red'});
                var txt = lang ? "Please enter a value greater than or equal to 0." : "请输入大于0的数字。";
                poputMessage({"type":"warning","message": txt,"time":3000});
                state = false
                return false
            }  
        }

        $("#btn_part1").attr('data-state', state);

        if(state) {
            $(".part1_Info").hide();
            $(".part2_Info").show();
            $("html, body").scrollTop(0);
            $(".form_steps li").eq(1).addClass("on");
        }

    });


    //part2 next
    $("#btn_part2").click(function(){
        let state = false
        var inputs = $(".js_val2 .inputValide");
        for(var i=0;i<inputs.length;i++) {
            if(inputs[i].value == "") {
                $(inputs[i]).css({'border': '1px solid red'});
                $(inputs[i]).siblings("p").addClass("warningBlock");
                state = false
            }
            else{
                state = true
            }
        }

        for(var i=0;i<inputs.length;i++) {
            if($.trim(inputs[i].value) == "") {
                $(inputs[i]).css({'border': '1px solid red'});
                $(inputs[i]).siblings("p").addClass("warningBlock");
                state = false
                return false
            }
        }

        for(var i=0;i<inputs.length;i++) {
            if(inputs[i].value == "") {
                return false
                state = false
            }
            else{
                state = true
            }
        }

        /*var email = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
        if(!email.test($(".emailRequired").val())){
            var txt = lang ? "Incorrect mailbox format!" : "邮箱格式不正确";
            poputMessage({"type":"warning","message": txt,"time":3000});
            $(".emailRequired").val("");
            $(".emailRequired").focus();
            return false
        }*/

        $("#btn_part2").attr('data-state', state)

        if(state) {
            $(".part2_Info").hide();
            $(".part3_Info").show();
            $("html, body").scrollTop(0);
            $(".form_steps li").eq(2).addClass("on");
        }
    });


    //part3 next
    $("#btn_part3").click(function(){
        let state = false
        var inputs = $(".js_val3 .inputValide");
        for(var i=0;i<inputs.length;i++) {
            if(inputs[i].value == "") {
                $(inputs[i]).css({'border': '1px solid red'});
                $(inputs[i]).siblings("p").addClass("warningBlock");
                state = false
            }
            else{
                state = true
            }
        }

        for(var i=0;i<inputs.length;i++) {
            if($.trim(inputs[i].value) == "") {
                $(inputs[i]).css({'border': '1px solid red'});
                $(inputs[i]).siblings("p").addClass("warningBlock");
                state = false
                return false
            }
        }

        for(var i=0;i<inputs.length;i++) {
            if(inputs[i].value == "") {
                return false
                state = false
            }
            else{
                state = true
            }
        }

        /*var email = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
        if(!email.test($(".emailRequired2").val())){
            var txt = lang ? "Incorrect mailbox format!" : "邮箱格式不正确";
            poputMessage({"type":"warning","message": txt,"time":3000});
            $(".emailRequired2").val("");
            $(".emailRequired2").focus();
            return false
        }*/

        $("#btn_part3").attr('data-state', state)

        if(state) {
            $(".part3_Info").hide();
            $(".part4_Info").show();
            $("html, body").scrollTop(0);
            $(".form_steps li").eq(3).addClass("on");
        }
    });

    //part4 next
    $("#btn_part4").click(function(){
        let state = false
        var inputs = $(".js_val4 .inputValide");
        for(var i=0;i<inputs.length;i++) {
            if(inputs[i].value == "") {
                $(inputs[i]).css({'border': '1px solid red'});
                // $(inputs[i]).siblings(".warning").css("display","block");
                $(inputs[i]).siblings("p").addClass("warningBlock");
                state = false
            }
            else{
                state = true
            }
        }
        if($(".textarea2 .messageRequired").val().length >= 1000) {
            var txt = lang ? "Messages should not more than 1000 words" : "留言最多不能超过1000字";
            poputMessage({"type":"warning","message": txt,"time":3000});
            return false;
            state = false
        }
        else{
            state = true
        }
        for(var i=0;i<inputs.length;i++) {
            if(inputs[i].value == "") {
                return false
                state = false
            }
            else{
                state = true
            }
        }

        for(var i=0;i<inputs.length;i++) {
            if($.trim(inputs[i].value) == "") {
                $(inputs[i]).css({'border': '1px solid red'});
                $(inputs[i]).siblings("p").addClass("warningBlock");
                state = false
                return false
            }
        }

        var email = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
        if(!email.test($(".emailRequired3").val())){
            var txt = lang ? "Incorrect mailbox format!" : "邮箱格式不正确";
            poputMessage({"type":"warning","message": txt,"time":3000});
            $(".emailRequired3").val("");
            $(".emailRequired3").focus();
            return false
        }
        // return false;
        $("#btn_part4").attr('data-state', state)
        if(state) {
            $(".part4_Info").hide();
            $(".form_process").hide();
            $("html, body").scrollTop(0);
            $(".part1234_info").show();
            // $(".form_steps li").eq(3).addClass("on");

            // Sending form data to Confirm
            // Additional Information
            var adName = document.getElementById("adName").value;
            var adEmail = document.getElementById("adEmail").value;
            var adTelephone = document.getElementById("adTelephone").value;
            var adReference = document.getElementById("adReference").value;
            var adRemarks = document.getElementById("adRemarks").value;
            // Shiipers variables
            var spCmpnyName = document.getElementById("spCmpnyName").value;
            var spCountry = document.getElementById("spCountry").value;
            var spCity = document.getElementById("spCity").value;
            var spAddress = document.getElementById("spAddress").value;
            // var spZip = document.getElementById("spZip").value;
            // var spTel = document.getElementById("spTel").value;
            // var spEmail = document.getElementById("spEmail").value;
            // Consignee variables
            var cgCmpnyName = document.getElementById("cgCmpnyName").value;
            var cgCountry = document.getElementById("cgCountry").value;
            var cgCity = document.getElementById("cgCity").value;
            var cgAddress = document.getElementById("cgAddress").value;
            // var cgZip = document.getElementById("cgZip").value;
            // var cgTel = document.getElementById("cgTel").value;
            // var cgEmail = document.getElementById("cgEmail").value;
            // Cargo variables
            var checkValue = $('#checkTransIcon .check_sort.check_checked span.text').text();
            var checkValueText = $('#otherCheck input').val();
            var cDiscription = document.getElementById("commudityDiscription").value;
            var radioValue = $("#radioTransIcon .radio_check").attr('data-value');
            var specifySS = document.getElementById("specifySS").value;
            var attachements = $("#fileType").html();
            var pkgQuantity = $('#add_qwer123 .adding_OnclickFunction').length;
            //Display the Values
            document.getElementById('adName_Dis').innerHTML = adName;
            document.getElementById('adEmail_Dis').innerHTML = adEmail;
            document.getElementById('adEmail_Dis2').innerHTML = adEmail;
            document.getElementById('adTelephone_Dis').innerHTML = adTelephone;
            document.getElementById('adRef_Dis').innerHTML = adReference;
            document.getElementById('adRemarks_Dis').innerHTML = adRemarks;

            document.getElementById('spCmpnyName_Dis').innerHTML = spCmpnyName;
            document.getElementById('spCountry_Dis').innerHTML = spCountry;
            document.getElementById('spCity_Dis').innerHTML = spCity;
            document.getElementById('spAddress_Dis').innerHTML = spAddress;
            // document.getElementById('spZip_Dis').innerHTML = spZip;
            // document.getElementById('spTel_Dis').innerHTML = spTel;
            // document.getElementById('spEmail_Dis').innerHTML = spEmail;

            document.getElementById('cgCmpnyName_Dis').innerHTML = cgCmpnyName;
            document.getElementById('cgCountry_Dis').innerHTML = cgCountry;
            document.getElementById('cgCity_Dis').innerHTML = cgCity;
            document.getElementById('cgAddress_Dis').innerHTML = cgAddress;
            // document.getElementById('cgZip_Dis').innerHTML = cgZip;
            // document.getElementById('cgTel_Dis').innerHTML = cgTel;
            // document.getElementById('cgEmail_Dis').innerHTML = cgEmail;

            document.getElementById('checkTransIcon_Dis').innerHTML = checkValue;
            document.getElementById('checkTransIcon_OtherDis').innerHTML = checkValueText;
            document.getElementById('commudityDiscription_Dis').innerHTML = cDiscription;
            document.getElementById('radioTransIcon_Dis').innerHTML = radioValue;
            document.getElementById('specifySS_Dis').innerHTML = specifySS;
            document.getElementById('fileType_Dis').innerHTML = attachements;
            document.getElementById('packageQuantity_Dis').innerHTML = pkgQuantity;

            var newIndex = 0;
            var divLength = $('#add_qwer123 .adding_OnclickFunction').length;
            console.log(divLength);
            var divElement = $('#add_qwer123 .adding_OnclickFunction');


            if(checkValueText == ''){
                $("#checkTransIcon_OtherDis").hide();
            }else {
                $("#checkTransIcon_OtherDis").show();
            }
            
            // Package variables
            $(".packing_Info").html("");
            var newConHtml = '';
            for(var i=0; i<divLength; i++){
                
                var headtxt = lang ? "PACKING" : "包装";
                var typtxt = lang ? "Type of package" : "包装类型";
                var grstxt = lang ? "Gross weight" : "总重量";
                var crgtxt = lang ? "Cargo Unit" : "货物规格";
                var crgtxtL = lang ? "Long:" : "长:";
                var crgtxtW = lang ? "Wide:" : "宽:";
                var crgtxtH = lang ? "High:" : "高:";

                var type = $('#add_qwer123 .adding_OnclickFunction:eq('+i+') .packageType').val();
                var typeValue = $('#add_qwer123 .adding_OnclickFunction:eq('+i+') .packageType option:selected');
                // console.log(typeValue.text()); 
                var weight = $('#add_qwer123 .adding_OnclickFunction:eq('+i+') .pakWeight').val();
                var long = $('#add_qwer123 .adding_OnclickFunction:eq('+i+') .pakLong').val();
                var wide = $('#add_qwer123 .adding_OnclickFunction:eq('+i+') .pakWide').val();
                var high = $('#add_qwer123 .adding_OnclickFunction:eq('+i+') .pakHigh').val();
                // console.log(parseInt(i+1));
                var newHtml = ""
                newHtml += '<div class="packing_divCss">';
                newHtml += '<div class="head">';
                newHtml += '<div class="text">' +  headtxt  + '<span class="packDisplayCount">'+ parseInt(i+1) +'</span></div>';
                newHtml += '</div>';
                newHtml += '<div class="body">';
                newHtml += '<div class="row">';
                newHtml += '<p class="lft">' +  typtxt  + '</p>';
                newHtml += '<p class="ryt packageType_Dis" data-value='+ type +'>'+ typeValue.text() +'</p>';
                newHtml += '</div>';
                newHtml += '<div class="row">';
                newHtml += '<p class="lft">' +  grstxt  + '</p>';
                newHtml += '<p class="ryt"> <span class="pakWeight_Dis">'+ weight +'</span>KG</p>';
                newHtml += '</div>';
                newHtml += '<div class="row">';
                newHtml += '<p class="lft">' +  crgtxt  + '</p>';
                newHtml += '<p class="ryt" style="width:400px;"><span>' +  crgtxtL  + '<span class="pakLong_Dis">'+ long +'</span>cm</span><span>' +  crgtxtW  + '<span class="pakWide_Dis">'+ wide +'</span>cm</span><span>' +  crgtxtH + '<span class="pakHigh_Dis">'+ high +'</span>cm</span></p>';
                newHtml += '</div>';
                newHtml += '</div>';
                newHtml += '</div>';
                newConHtml += newHtml;
            }
            $("#part1234Confirm .packing_Info").append(newConHtml);

        }
    });



    // $("#confirmPopup .divCss .head .close").on('click',function(){
    //     $(this).parents('.confirm_popUp-box').hide();
    // })
    $("#closeToTransferList").on('click', function(){
        location.href = "/logistics/rfq/list?email="+$("#adEmail").val();
    });
});
//btn_confirm Confirm the form
function submitConfirmRequistion(){

    var listRfqPack = [];
    $(".packing_Info .packing_divCss").each( function(){
        var that = $(this);
        console.log(that);
        var newArr = {};
        newArr.grossWeight = that.find(".pakWeight_Dis").text(),
        newArr.packageType = that.find(".packageType_Dis").attr('data-value'),
        newArr.leng = that.find(".pakLong_Dis").text(),
        newArr.wide = that.find(".pakWide_Dis").text(),
        newArr.high = that.find(".pakHigh_Dis").text(),
        console.log(newArr);

        listRfqPack.push(newArr);
    });

    var shipping = {}; //new Arrar()
    $('.shippers_Infor').each(function(){
        shipping.companyName = $("#spCmpnyName_Dis").text();
        shipping.country = $("#spCountry_Dis").text();
        shipping.city = $("#spCity_Dis").text();
        shipping.address = $("#spAddress_Dis").text();
        // shipping.zip = $("#spZip_Dis").text();
        // shipping.telephone = $("#spTel_Dis").text();
        // shipping.email = $("#spEmail_Dis").text();
    })

    var consignee = {}; //new Arrar()
    $('.shippers_Infor').each(function(){
        consignee.companyName = $("#cgCmpnyName_Dis").text();
        consignee.country = $("#cgCountry_Dis").text();
        consignee.city = $("#cgCity_Dis").text();
        consignee.address = $("#cgAddress_Dis").text();
        // consignee.zip = $("#cgZip_Dis").text();
        // consignee.telephone = $("#cgTel_Dis").text();
        // consignee.email = $("#cgEmail_Dis").text();
    })
    var listFile = new Array()
    if($("#fileType div.addPic").length > 0){
        for(var i=0; i<$("#fileType div.addPic").length; i++){
            listFile[i] = $("#fileType div").eq(i).attr("data-url");
        }
        // data.listFile = listFile;
    }

    var data={
        //part1
        transportMode:$("#checkTransIcon").attr('data-value'),
        transportModeOther:$("#checkTransIcon_OtherDis").text(),
        cargoType:$("#radioTransIcon").attr('data-value'),
        description:$("#commudityDiscription_Dis").text(),
        specify:$("#specifySS_Dis").text(),
        listRfqPack:listRfqPack,
        shipping:shipping,
        consignee:consignee,
        listFile:listFile,
        //part4
        name:$("#adName_Dis").text(),
        email:$("#adEmail_Dis").text(),
        telephone:$("#adTelephone_Dis").text(),
        rfqNo:$("#adRef_Dis").text(),
        message:$("#adRemarks_Dis").text(),
        packingQuantity:$("#packageQuantity_Dis").text(),
    }

    $("#btn_confirm").removeAttr('onclick');
    var url="/logistics/rfq/save";
    $.ajax({
        type: "POST",
        async: true,
        url: url,
        data: JSON.stringify(data),
        dataType: "json",
        contentType: "application/json",
        success: function (data) {
            console.log(data);
            if(data.code == '200') {
                $("#confirmPopup").css("display","flex");
            }
        },
        error: function (XHR, textStatus, errorThrown) {
            common.imgHide();
            $("#btn_confirm").attr("onclick","submitConfirmRequistion();");
            alert(msgError.error00050);
        }
    });
}




//upload images
// function callbackOperationElement(res,sourceLink,imageSrc,file_upload){
//     var txt = lang ? "Delete" : "删除";
//     var txt2 = lang ? "View" : "查看";
//     var html ="";
//     html += '<div class="addPic newThumbnail" style="float:none; width:100%; height:auto" data-url="'+ imageSrc +'" data-picname="'+ res.fname +'"><img class="icon_add" src="/static/newimages/logistics_def/icon-file.png" /><p  class="file_name clear">'+ res.fname +'</p> <p onclick="javascript:removeImg(event);" class="icon_del">' +  txt  + '</p><a class="icon_view" href=" ' + sourceLink + ' " target="_blank">'+ txt2 + '</a></div>';

//     if(file_upload == "file_upload") {  //when you frist upload delect 
//         $("#fileType").append(html); //desktop
//     }
//     var li = $("#fileType div").length; //desktop
//     $('#fileCount').html('<b>' + li + '</b>'); //desktop
// }
// function removeImg(event) {
//     $(event.target).parent().remove();
//     var li = $("#fileType div").length; //desktop
//     $('#fileCount').html('<b>' + li + '</b>'); //desktop
// }