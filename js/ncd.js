function MM_SubmitForm_new(form){ //v3.0

    form.FTMRTA.value = "Yes";
    //alert("Status:"+ FormValidation(form));
    if(FormValidation(form) == true)
        form.submit();
}
/*
 function MM_reloadPage(init) {  //reloads the window if Nav4 resized
 if (init==true) with (navigator) {if ((appName=="Netscape")&&(parseInt(appVersion)==4)) {
 document.MM_pgW=innerWidth; document.MM_pgH=innerHeight; onresize=MM_reloadPage; }}
 else if (innerWidth!=document.MM_pgW || innerHeight!=document.MM_pgH) location.reload();
 }
 MM_reloadPage(true);*/
//-->

/* BEGIN -- ISM NCD Integration */
function checkNCD(form)
{
    if(FormValidation(form) == true)
    {
        var ncd_counter = parseInt(form.ncd_counter.value) + 1;
        var curVehNo = form.arc_quo_reg_num.value;
        var idNo1 = form.frm_pers_NRIC1.value + form.frm_pers_NRIC2.value + form.frm_pers_NRIC3.value;
        var NRIC = form.frm_pers_NRIC1.value + "-" + form.frm_pers_NRIC2.value + "-" + form.frm_pers_NRIC3.value;
        var OtherID = form.frm_pers_OldIC2.value;
        if(!isFilled(form.frm_pers_NRIC1) && !isFilled(form.frm_pers_NRIC2) && !isFilled(form.frm_pers_NRIC3)){
            var idNo1 = form.frm_pers_OldIC2.value;
        }

        var idNo2 = '';
        var preInsCode =  form.arc_quo_prev_insurer.options[form.arc_quo_prev_insurer.selectedIndex].value;
        var agent = form.agent.value;
        /* hide transfer of NCD, 11/04/2011 */
        /* if(form.arc_ncd_confirmation[0].checked)
         {
         var preVehNo = form.frm_pers_old_regno.value;
         } else { var preVehNo = form.arc_quo_reg_num.value;
         } */
        var preVehNo = form.arc_quo_reg_num.value;
        /* if(isSelected(form.frm_pers_OldIC1) && isFilled(form.frm_pers_OldIC2))
         {
         var sel = form.frm_pers_OldIC1;
         idNo2 = sel.options[sel.selectedIndex].value + form.frm_pers_OldIC2.value;
         }
         else if (isFilled(form.frm_pers_OldIC3))
         {
         idNo2 = form.frm_pers_OldIC3.value;
         }
         if (isFilled(form.frm_pers_OldIC2))
         {
         idNo2 = form.frm_pers_OldIC2.value;
         }*/

        if (isFilled(form.frm_pers_OldIC2)&&(isFilled(form.frm_pers_NRIC1) && isFilled(form.frm_pers_NRIC2) && isFilled(form.frm_pers_NRIC3)))
        {
            idNo2 = form.frm_pers_OldIC2.value;
        }

        rowTR = document.getElementById('ncd_confirmation4');
        rowTR.style.display = '';
        document.getElementById("ncd_msg").innerHTML='<p>&nbsp;&nbsp;<!-- img src="tn_motortakaful/images/ajax-loader2.gif" border=0 --></p>';

        getNCD(form,preVehNo,curVehNo,idNo1,idNo2,preInsCode,agent,ncd_counter,NRIC,OtherID);
    }
}

function getNCD(form,preVehNo,curVehNo,idNo1,idNo2,preInsCode,agent,ncd_counter,NRIC,OtherID)
{
    var xmlhttp;
    var doctype = 'ENQ';

    if (window.XMLHttpRequest)
    {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    }
    else if (window.ActiveXObject)
    {
        // code for IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    } else { alert("Your browser does not support XMLHTTP!");
    }
    xmlhttp.onreadystatechange=function()
    {
        if(xmlhttp.responseText != "")
        {
            eval(xmlhttp.responseText);
            $(".ncd-response").html($("#ncd_msg_next_level").html() + $("#ncd_msg_next_eff_date").html() + $("#ncd_msg_qq_blocked").html()).show();
        }
    }

    //xmlhttp.open("GET","inc/ncd_soap_confirm_left.php?preVehNo="+preVehNo+"&curVehNo="+curVehNo+"&idNo1="+idNo1+"&idNo2="+idNo2+"&preInsCode="+preInsCode+"&ncd_counter="+ncd_counter+"&lang=ENG&agent="+agent+"&doctype="+doctype+"&NRIC="+NRIC+"&OtherID="+OtherID+"&iframe="+0,true);
    xmlhttp.open("GET","./ncd?preVehNo="+preVehNo+"&curVehNo="+curVehNo+"&idNo1="+idNo1+"&idNo2="+idNo2+"&preInsCode="+preInsCode+"&ncd_counter="+ncd_counter+"&lang=ENG&agent="+agent+"&doctype="+doctype+"&NRIC="+NRIC+"&OtherID="+OtherID+"&iframe="+0,true);
    //eval(xmlhttp.responseText);

    xmlhttp.send(null);

    /*
    var request = { "form" : form ,"preVehNo" : preVehNo, "curVehNo" : curVehNo, "idNo1" : idNo1, "idNo2" : idNo2, "preInsCode" : preInsCode, "agent" : agent, "ncd_counter" : ncd_counter, "NRIC" : NRIC, "OtherID" : OtherID };
    $.get('http://localhost/myinsuran.my/ncd', function (data) {
            //$("body").append(data);
            //eval(data);
    });
    */
}

function FormValidation(form)
{
    var iICNumberCount = 0;//To calculate how many ic number was filled in.


    if(!isFilled(form.arc_quo_reg_num)) {
        alert(qq3_your_vahicle_reg_no); form.arc_quo_reg_num.focus(); return false;}

    if(!isFilled(form.frm_pers_NRIC1) && !isFilled(form.frm_pers_NRIC2) && !isFilled(form.frm_pers_NRIC3) && !isFilled(form.frm_pers_OldIC2)) {
        alert(qq1_ic_note); form.frm_pers_NRIC1.focus(); return false;
    }

    if((!isFilled(form.frm_pers_NRIC1) || !isFilled(form.frm_pers_NRIC2) || !isFilled(form.frm_pers_NRIC3 )) && !isFilled(form.frm_pers_OldIC2))
    {
        if(!isFilled(form.frm_pers_NRIC1)) { alert(qq1_new_ic); form.frm_pers_NRIC1.focus(); return false; } else { if(!isNRIC1(form.frm_pers_NRIC1)) { alert(qq1_new_ic); form.frm_pers_NRIC1.focus(); return false; } }
        if (!isValidNRIC(form.frm_pers_NRIC1)) { alert(qq1_new_ic); form.frm_pers_NRIC1.focus(); return false; }
        if(!isFilled(form.frm_pers_NRIC2)) { alert(qq1_new_ic); form.frm_pers_NRIC2.focus(); return false; } else { if(!isNRIC2(form.frm_pers_NRIC2)) { alert(qq1_new_ic); form.frm_pers_NRIC2.focus(); return false; } }
        if(!isFilled(form.frm_pers_NRIC3)) { alert(qq1_new_ic); form.frm_pers_NRIC3.focus(); return false; } else { if(!isNRIC3(form.frm_pers_NRIC3)) { alert(qq1_new_ic); form.frm_pers_NRIC3.focus(); return false; } }
        iICNumberCount++;//If user fill in new IC no.
    }
    /*
     if(!isFilled(form.frm_pers_NRIC1) || !isFilled(form.frm_pers_NRIC2) || !isFilled(form.frm_pers_NRIC3))
     {
     if(!isFilled(form.frm_pers_NRIC1)) { alert(qq1_new_ic); form.frm_pers_NRIC1.focus(); return false; } else { if(!isNRIC1(form.frm_pers_NRIC1)) { alert(qq1_new_ic); form.frm_pers_NRIC1.focus(); return false; } }
     if (!isValidNRIC(form.frm_pers_NRIC1)) { alert(qq1_new_ic); form.frm_pers_NRIC1.focus(); return false; }
     if(!isFilled(form.frm_pers_NRIC2)) { alert(qq1_new_ic); form.frm_pers_NRIC2.focus(); return false; } else { if(!isNRIC2(form.frm_pers_NRIC2)) { alert(qq1_new_ic); form.frm_pers_NRIC2.focus(); return false; } }
     if(!isFilled(form.frm_pers_NRIC3)) { alert(qq1_new_ic); form.frm_pers_NRIC3.focus(); return false; } else { if(!isNRIC3(form.frm_pers_NRIC3)) { alert(qq1_new_ic); form.frm_pers_NRIC3.focus(); return false; } }
     iICNumberCount++;//If user fill in new IC no.
     }*/

    /* hide transfer of NCD, 11/04/2011 */
    /* if(form.arc_ncd_confirmation[0].checked == false && form.arc_ncd_confirmation[1].checked == false)
     {
     alert(qq1_transfer_ncd);
     form.arc_ncd_confirmation[0].focus;
     return false;
     }

     if(form.arc_ncd_confirmation[0].checked)
     {
     // transfer NCD
     //if(form.quo_id.value = "")
     //{
     if(form.frm_pers_old_regno.value == ""){ alert(qq2_vehicle_registration); form.frm_pers_old_regno.focus(); return false;}

     //if(form.arc_quo_prev_insurer.value == ""){ alert(qq2_previous_insurance_bearer); form.arc_quo_prev_insurer.focus(); return false;}
     //}
     } */
    if(form.arc_quo_prev_insurer.value == ""){ alert(qq2_previous_insurance_bearer); form.arc_quo_prev_insurer.focus(); return false;}
    return true;
}

function DisableAllFields()
{
    var form = document.frm_motor_left;

    form.frm_pers_NRIC1.readOnly = true;
    form.frm_pers_NRIC2.readOnly = true;
    form.frm_pers_NRIC3.readOnly = true;
    //form.frm_pers_OldIC1.readOnly = true;
    form.frm_pers_OldIC2.readOnly = true;
    //form.frm_pers_OldIC3.readOnly = true;
    form.arc_quo_reg_num.readOnly = true;
    form.frm_pers_old_regno.readOnly = true;
    form.arc_quo_prev_insurer.disabled = true;
}

/* END -- ISM NCD Integration */
function transferNCD(radio)
{
    if(radio.value == 'yes')
    {
        rowTR = document.getElementById('ncd_confirmation');
        rowTR.style.display = '';
        rowTR1 = document.getElementById('ncd_confirmation1');
        rowTR1.style.display = '';
        /* rowTR2 = document.getElementById('ncd_confirmation2');
         rowTR2.style.display = '';
         rowTR3 = document.getElementById('ncd_confirmation3');
         rowTR3.style.display = '';
         rowTR5 = document.getElementById('ncd_confirmation5');
         rowTR5.style.display = '';
         rowTR6 = document.getElementById('ncd_confirmation6');
         rowTR6.style.display = 'none'; */
    } else { rowTR = document.getElementById('ncd_confirmation');
        rowTR.style.display = 'none';
        rowTR1 = document.getElementById('ncd_confirmation1');
        rowTR1.style.display = 'none';
        /*  rowTR2 = document.getElementById('ncd_confirmation2');
         rowTR2.style.display = 'none';
         rowTR3 = document.getElementById('ncd_confirmation3');
         rowTR3.style.display = 'none';
         rowTR5 = document.getElementById('ncd_confirmation5');
         rowTR5.style.display = 'none';
         rowTR6 = document.getElementById('ncd_confirmation6');
         rowTR6.style.display = ''; */
    }
}
function removeSpaces() {
    document.frm_motor_left.arc_quo_reg_num.value = document.frm_motor_left.arc_quo_reg_num.value.split(' ').join('');
    document.frm_motor_left.arc_quo_reg_num.value = document.frm_motor_left.arc_quo_reg_num.value.toUpperCase();
    document.frm_motor_left.frm_pers_old_regno.value = document.frm_motor_left.frm_pers_old_regno.value.split(' ').join('');
    document.frm_motor_left.frm_pers_old_regno.value = document.frm_motor_left.frm_pers_old_regno.value.toUpperCase();
    document.frm_motor_left.frm_pers_OldIC2.value = document.frm_motor_left.frm_pers_OldIC2.value.split(' ').join('');
    document.frm_motor_left.frm_pers_OldIC2.value = document.frm_motor_left.frm_pers_OldIC2.value.toUpperCase();
}
function keyup(varfield,strvalidate,varfocus)
{
    //var form = document.forms[0];
    var form = document.frm_motor_left;
    if(window.event.keyCode != 8 && window.event.keyCode != 37 && window.event.keyCode != 39 && window.event.keyCode != 16)
    {
        if (varfield.value.match(strvalidate) != null){
            varfocus.focus();
        }
    }
}

function current_date()
{
    var thetime=new Date();
    var nmonth=thetime.getMonth();
    var ntoday=thetime.getDate();
    var nyear=thetime.getYear();
    var AorP=" ";

    nmonth+=1;

    if (nyear<=99)
        nyear= "19"+nyear;

    if ((nyear>99) && (nyear<2000))
        nyear+=1900;

    var DateReturned = " "+nmonth+"/"+ntoday+"/"+nyear;
    return DateReturned;
}