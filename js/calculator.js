// JavaScript Document
 tarifArray = new Array (8);
	 for (i=0; i <=8; i++) 
	 { tarifArray[i] = new Array(3) };
	 
	 //0 to 1400cc
	 tarifArray[0][0] = 249.50;
	 tarifArray[0][1] = 96.30;
	 tarifArray[0][2] = 184.20;
	 tarifArray[0][3] = 55.50;
	 
	 //1401 to 1650cc
	 tarifArray[1][0] = 278.50;
	 tarifArray[1][1] = 108.00;
	 tarifArray[1][2] = 206.20;
	 tarifArray[1][3] = 61.80;
	 
	 //1651 to 2200
	 tarifArray[2][0] = 308.50;
	 tarifArray[2][1] = 120.60;
	 tarifArray[2][2] = 228.30;
	 tarifArray[2][3] = 69.60;
	 
	 //2201 to 3050
	 tarifArray[3][0] = 338.40;
	 tarifArray[3][1] = 133.20;
	 tarifArray[3][2] = 249.70;
	 tarifArray[3][3] = 76.80;
	 
	 //3051 to 4100
	 tarifArray[4][0] = 367.40;
	 tarifArray[4][1] = 144.90;
	 tarifArray[4][2] = 271.80;
	 tarifArray[4][3] = 83.10;
	 
	 //4101 to 4250
	 tarifArray[5][0] = 396.40;
	 tarifArray[5][1] = 156.60;
	 tarifArray[5][2] = 293.20;
	 tarifArray[5][3] = 90.30;
	 
	 //4251 to 4400
	 tarifArray[6][0] = 426.40;
	 tarifArray[6][1] = 169.20;
	 tarifArray[6][2] = 315.30;
	 tarifArray[6][3] = 96.90;
	 
	 //4401 and above
	 tarifArray[7][0] = 455.40;
	 tarifArray[7][1] = 180.90;
	 tarifArray[7][2] = 336.70;
	 tarifArray[7][3] = 103.80;
	 
//=====================================
   ncdArray = new Array (6);
   ncdArray[0]= 0  
   ncdArray[1]= 0.25 
   ncdArray[2]= 0.3
   ncdArray[3]= 0.3833
   ncdArray[4]= 0.45
   ncdArray[5]= 0.55
 //=====================================

function validateCC(field, message_prefix){
	var strCC = new String(field.value);
	if (strCC.match(/^\d*$/) == null){
		alert(message_prefix + " (Tanpa koma, titik perpuluhan dan ruang kosong)");
		return false;
	}
	return true;
}

function validateAmount(field, message_prefix){
	var strAmount = new String(field.value);
	if (strAmount.match(/^[0-9]*$/) == null){
		alert(message_prefix + " (Tanpa RM, koma, titik perpuluhan dan ruang kosong)");
		return false;
	}
	return true;
}

function trigCCPremium(element)
{
	//alert(element.arc_quo_cubic_capacity_amount.value);
	if (!isFilled(element.arc_quo_cubic_capacity_amount))
		return false;

	if (!validateCC(element.arc_quo_cubic_capacity_amount, 'Sila isikan kapasiti enjin (cc) yang sah')){
		element.arc_quo_cubic_capacity_premium.value = "0";
		element.arc_quo_cubic_capacity_premium_loading.value = "0";//
		return false;
	}
/*
	if (element.arc_quo_cubic_capacity_amount.value < 4101)
	{
*/
		var element_index = -1;
	
		switch (true) {
			case ((element.arc_quo_cubic_capacity_amount.value > -1) && (element.arc_quo_cubic_capacity_amount.value < 1400)):
				element_index = 0;
				break
			case ((element.arc_quo_cubic_capacity_amount.value >= 1400) && (element.arc_quo_cubic_capacity_amount.value < 1650)):
				element_index = 1;
				break
			case ((element.arc_quo_cubic_capacity_amount.value >= 1650) && (element.arc_quo_cubic_capacity_amount.value < 2200)):
				element_index = 2;
				break
			case ((element.arc_quo_cubic_capacity_amount.value >= 2200) && (element.arc_quo_cubic_capacity_amount.value < 3050)):
				element_index = 3;
				break
			case ((element.arc_quo_cubic_capacity_amount.value >= 3050) && (element.arc_quo_cubic_capacity_amount.value < 4100)):
				element_index = 4;
				break
			case ((element.arc_quo_cubic_capacity_amount.value >= 4100) && (element.arc_quo_cubic_capacity_amount.value < 4250)):
				element_index = 5;
				break
			case ((element.arc_quo_cubic_capacity_amount.value >= 4250) && (element.arc_quo_cubic_capacity_amount.value < 4400)):
				element_index = 6;
				break
			case ((element.arc_quo_cubic_capacity_amount.value >= 4400)):
				element_index = 7;
				break
		}
		//alert(element_index);
		//return;
		if(element.arc_quo_vehicle_location.value == 0){
			premium  = (tarifArray[element_index][0]) + ((element.arc_quo_sum_insured.value-1000)/1000*26);
		}else if(element.arc_quo_vehicle_location.value == 1){
			premium  = (tarifArray[element_index][2]) + ((element.arc_quo_sum_insured.value-1000)/1000*20.3);
		}
		
		total_premium = premium.toFixed(2);
		
/*	}
	else //error
	{
		alert("Sila isikan kapasiti enjin yang sah (Tidak lebih 4100 cc)");
//		element.arc_quo_cubic_capacity_amount.focus();
		element.arc_quo_cubic_capacity_premium.value = "0"
	}
*/
}	

			
function trigNCD(element)
{
	//alert(element.arc_quo_cubic_capacity_premium.value);
	//alert(element.arc_quo_loading.value);
	loading_amount = Number(element.arc_quo_cubic_capacity_premium.value) * (element.arc_quo_loading.value/100);
	element.arc_quo_loading_amount.value = FormatFloat(Number(loading_amount),2);
	//alert(element.arc_quo_loading_amount.value);
	//element.arc_quo_cubic_capacity_premium_loading.value = FormatFloat((Number(element.arc_quo_cubic_capacity_premium.value) + loading_amount),2);//
	element.arc_quo_cubic_capacity_premium_loading.value = FormatFloat(Number(element.arc_quo_cubic_capacity_premium.value),2);
	ncd_amount = ncdArray[element.arc_quo_ncd_percentage.value] * (Number(element.arc_quo_cubic_capacity_premium.value) + loading_amount);
	
	element.arc_quo_ncd_amount.value= FormatFloat(ncd_amount,2);
	element.arc_quo_ncd_amount.readOnly = true;
	if(element.arc_quo_ncd_percentage.value >= 1){
		val = false;
	} else {
		val = true;
	}
	if(element.is_PFNO.value !=1){
		//element.arc_quo_prev_insurer.disabled = val;
		//element.arc_quo_prev_reg_num.disabled = val; -- field is always disabled
	}
	else {
		//element.arc_quo_prev_insurer.disabled = val;
	}
}

function trigFlood(element)
{
	if (element.arc_quo_flood_amount.checked == true)
		element.arc_quo_flood_premium.value= FormatFloat((element.arc_quo_sum_insured.value * (0.5 /100)),2); //x 0.5%
	else
		element.arc_quo_flood_premium.value=0;
}

function trigSRCC(element)
{
	if (element.arc_quo_strike_amount.checked == true)
		element.arc_quo_strike_premium.value = FormatFloat((element.arc_quo_sum_insured.value * (0.3/100)),2);  //x 0.3%
	else
		element.arc_quo_strike_premium.value=0;
}

function trigLLAN(element)
{
	if (element.arc_quo_liability_negligence_amount.checked == true)
		element.arc_quo_liability_negligence_premium.value = FormatFloat(7.50, 2);
	else
		element.arc_quo_liability_negligence_premium.value = 0;
}

function trigWS(element)
{
	if (!validateAmount(element.arc_quo_windscreen_insured_amount, 'Sila isikan nilai perlindungan cermin kereta yang betul')){
		return false;
	}

	element.arc_quo_windscreen_insured_premium.value = FormatFloat(element.arc_quo_windscreen_insured_amount.value * 0.15,2); //15%
}

function trigRC(element)
{
	if (!validateAmount(element.arc_quo_radio_insured_amount, 'Sila isikan nilai perlindungan radio kaset yang betul')){
		return false;
	}

	element.arc_quo_radio_insured_premium.value = FormatFloat(element.arc_quo_radio_insured_amount.value * 0.15,2); // 15%
}

function trigADDrive(element)
{
	if (element.arc_quo_add_driver.value > 2)
		element.arc_quo_add_driver_amount.value = (element.arc_quo_add_driver.value - 2) * 10; // RM 10
	else
		element.arc_quo_add_driver_amount.value = 0;
}

function trigLLP(element)
{
	// get 25% from premium
	if (element.arc_quo_liability_passenger_amount.checked == true)
	{
		if (element.arc_quo_cubic_capacity_amount.value =="" && element.arc_quo_cubic_capacity_amount.value > 4100)
		{
			alert("Sila isikan kapasiti enjin yang sah");
		}
		else
		{		
	
		var element_index = -1;
  
		switch (true) {
		case ((element.arc_quo_cubic_capacity_amount.value > -1) && (element.arc_quo_cubic_capacity_amount.value < 1400)):
			element_index = 0;
		break
		case ((element.arc_quo_cubic_capacity_amount.value >= 1400) && (element.arc_quo_cubic_capacity_amount.value < 1650)):
			element_index = 1;
		break
		case ((element.arc_quo_cubic_capacity_amount.value >= 1650) && (element.arc_quo_cubic_capacity_amount.value < 2200)):
			element_index = 2;
		break
		case ((element.arc_quo_cubic_capacity_amount.value >= 2200) && (element.arc_quo_cubic_capacity_amount.value < 3050)):
			element_index = 3;
		break
		case ((element.arc_quo_cubic_capacity_amount.value >= 3050) && (element.arc_quo_cubic_capacity_amount.value < 4100)):
			element_index = 4;
		break
		case ((element.arc_quo_cubic_capacity_amount.value >= 4100) && (element.arc_quo_cubic_capacity_amount.value < 4250)):
			element_index = 5;
		break
		case ((element.arc_quo_cubic_capacity_amount.value >= 4250) && (element.arc_quo_cubic_capacity_amount.value < 4400)):
			element_index = 6;
		break
		case ((element.arc_quo_cubic_capacity_amount.value >= 4400)):
			element_index = 7;
		break
		}
		
		if(element.arc_quo_vehicle_location.value == 0){
		 grossTotal = tarifArray[element_index][1] * 0.25; //25%
		} else if(element.arc_quo_vehicle_location.value == 1) {
		 grossTotal = tarifArray[element_index][3] * 0.25; //25%
		}
		
		if (element.arc_quo_passenger.value > 5)
		{
			psgCharge = (element.arc_quo_passenger.value - 5) * 10; //addition 5 x RM 10
			//alert(psgCharge);
		}
		else
		{	
			psgCharge = 0;
		}
	
		element.arc_quo_liability_passenger_premium.value = FormatFloat(grossTotal + psgCharge,2);
		}
	}	
	else
		element.arc_quo_liability_passenger_premium.value = 0;
	
}

function trigPSG(element)
{
	if (element.arc_quo_liability_passenger_amount.checked == true)
		trigLLP(element);

}

function trigVSI(element)
{
	if (!validateAmount(element.arc_quo_sum_insured, 'Sila isikan jumlah insuran kenderaan yang betul')){
		return false;
	}

	if (element.arc_quo_strike_amount.checked == true)
		trigSRCC(element);
		
	if (element.arc_quo_flood_amount.checked == true)
		trigFlood(element);

	DisableEnableFields();	//to call the function to check..
}

function FormatFloat(expr, decplaces)
{
	var str = "" + Math.round(eval(expr) * Math.pow(10, decplaces));
	var decpoint = 0;
		
	while (str.length <= decplaces)
	{
		str = "0" + str
	}
	
	decpoint = str.length - decplaces;
	
	return str.substring(0,decpoint) + "." + str.substring(decpoint, str.length);
		
}

function cal_total(element)
{
	trigCCPremium(element);
	
	with (element)
	{
		//alert(total_premium);
		loading_amount = Number(total_premium)*arc_quo_loading.value/100;
		element.arc_quo_loading_amount.value = FormatFloat(Number(loading_amount),2);
		sumbangan_sebelum_ncd = Number(total_premium) + loading_amount;
		//arc_quo_cubic_capacity_premium_loading.value = FormatFloat((Number(total_premium) + loading_amount), 2);//
		arc_quo_cubic_capacity_premium_loading.value = FormatFloat(Number(total_premium), 2);		
		trigNCD(element);
		//arc_quo_cubic_capacity_premium_loading.value = FormatFloat((Number(total_premium) + loading_amount), 2);//	
		arc_quo_cubic_capacity_premium_loading.value = FormatFloat(Number(total_premium), 2);//	
		arc_quo_cubic_capacity_premium.value = FormatFloat(total_premium, 2);		
		arc_quo_cubic_capacity_premium.readOnly = true;
		
		sumbangan_kasar = sumbangan_sebelum_ncd - Number(arc_quo_ncd_amount.value);
		sumbangan_sebelum_cukai = sumbangan_kasar + 
					Number(arc_quo_liability_passenger_premium.value) +
					Number(arc_quo_liability_negligence_premium.value) +
					Number(arc_quo_strike_premium.value) +
					Number(arc_quo_flood_premium.value) +
					Number(arc_quo_windscreen_insured_premium.value) +
					Number(arc_quo_radio_insured_premium.value) +
					Number(arc_quo_add_driver_amount.value);
		
		
		arc_quo_gross_premium.value = FormatFloat(sumbangan_sebelum_cukai, 2);
		payable_amount = sumbangan_sebelum_cukai;
		
		if(arc_quo_mandatory_rebate.value != '0' && is_MRTA.value != '1' && is_PFNO.value != '1') // updated on 14/12/2009
		{
			/* old mandatory rebate fomula -- 
			sumbangan_rebat = Number(sumbangan_kasar)*arc_quo_mandatory_rebate.value/100;
			sumbangan_selepas_rebat = sumbangan_kasar - sumbangan_rebat;
		
			sumbangan_selepas_rebat_sebelum_cukai = sumbangan_selepas_rebat + 
					Number(arc_quo_liability_passenger_premium.value) +
					Number(arc_quo_liability_negligence_premium.value) +
					Number(arc_quo_strike_premium.value) +
					Number(arc_quo_flood_premium.value) +
					Number(arc_quo_windscreen_insured_premium.value) +
					Number(arc_quo_radio_insured_premium.value) +
					Number(arc_quo_add_driver_amount.value);
			arc_quo_gross_premium_after_rebate.value = FormatFloat(sumbangan_selepas_rebat_sebelum_cukai, 2);
			arc_quo_mandatory_rebate_amount.value = FormatFloat(sumbangan_rebat, 2);
			payable_amount = sumbangan_selepas_rebat_sebelum_cukai;
			*/
			
			/* new mandatory rebate fomula -- 07102009 */
			/*
			Sum Insured + Loading - NCD entitlement (if any) + Additional cover (if any) - 5% BNM mandatory rebate (only for direct biz cases) + RM 10 stamp duty = Total Takaful Contribution Payable. 
			*/
			sumbangan_rebat = Number(sumbangan_sebelum_cukai)*arc_quo_mandatory_rebate.value/100;
			sumbangan_selepas_rebat = sumbangan_sebelum_cukai - sumbangan_rebat;

			sumbangan_selepas_rebat_sebelum_cukai = sumbangan_selepas_rebat;
			arc_quo_gross_premium_after_rebate.value = FormatFloat(sumbangan_selepas_rebat_sebelum_cukai, 2);
			arc_quo_mandatory_rebate_amount.value = FormatFloat(sumbangan_rebat, 2);
			payable_amount = sumbangan_selepas_rebat_sebelum_cukai;
		}
		else
		{
			arc_quo_gross_premium_after_rebate.value = 0;
			arc_quo_mandatory_rebate_amount.value = 0;
		}
		
		if (is_MRTA.value == '1') {
		  //alert('mrta')
		  mrta_diskaun = arc_quo_discount.value/100 * arc_quo_gross_premium.value;
	      arc_quo_discount_amount.value = FormatFloat(mrta_diskaun, 2);
	      TPP_value = Number(sumbangan_sebelum_cukai) + 10 - Number(mrta_diskaun);
		  
		}else if (is_PFNO.value == '1') {
		  //alert('pfno')
		  pfno_diskaun = arc_quo_discount.value/100 * arc_quo_gross_premium.value;
	      arc_quo_discount_amount.value = FormatFloat(pfno_diskaun, 2);
	      TPP_value = Number(sumbangan_sebelum_cukai) + 10 - Number(pfno_diskaun);
		  
		}else {
		  //alert('not mrta')
		  //TPP_value = Number(sumbangan_sebelum_cukai) + 10;
		  TPP_value = Number(payable_amount) + 10;
		}
		arc_quo_total_premium_payable.value = FormatFloat(TPP_value, 2);
//		TPP.value = form_TPP.toFixed(2);
	}
}

function margin(){
window.open('marginduration.htm','','height=300,width=600,left=80,top=80,scrollbars=1')}

function calcRound(num) {

   result=Math.floor(num)+"." ;

   var cents=100*(num-Math.floor(num))+0.5;

   result += Math.floor(cents/10);
   result += Math.floor(cents%10);

   return(result)

}

function cal ()
{
var myindex
var Month
var tDownpayment
var tIntrate
var tcprice

myindex = document.tor.periods.selectedIndex;    
Month = document.tor.periods.options[myindex].value;
tDownpayment = document.tor.downpayment.value;
tIntrate = document.tor.intrate.value;
tcprice = document.tor.cprice.value;

year = Month/12;
loanprice = tcprice-tDownpayment;
cInstallment = (((loanprice * (tIntrate/100))* year) + loanprice) / Month;
document.tor.installment.value = calcRound(cInstallment);

if (tDownpayment == "")
	{
		document.tor.downpayment.focus();
   		document.tor.downpayment.select();
	}

check_dpayment()
}

function check_dpayment()
{
if (document.tor.downpayment.value != "")
	{
	margin = (document.tor.cprice.value - document.tor.downpayment.value) / document.tor.cprice.value
	if (margin > 0.9)
		{
		alert("Sila isikan jumlah bayaran pendahuluan. Nilai hendaklah sekurang-kurangnya 10% daripada harga pembelian.")
		document.tor.downpayment.focus();
   		document.tor.downpayment.select();
		}
	}
}


function button4_onclick() {
	var region=document.form3.region.value;
	var fuel=document.form3.fuel.value;
	var cc=document.form3.cc.value;
	var tax=0;
	if (isNaN(cc)) {
		alert (cc + " bukanlah nombor.");
		document.form3.cc.focus();
	}
	
	if (document.form3.owner[0].checked) {
		tax=calcIndividual(cc)
	}
	else {
		if (document.form3.owner[1].checked) {
			tax=calcCompany(cc)
		}
	}
//	alert (tax)
	document.form3.rdtax.value = calcRound(tax) ;
}

function calcIndividual(cc){
	var tax=0;
	if (document.form3.region[0].checked) {
	   if (cc > 1000) {
		tax = 130;	 		
		cc = cc - 1000;
		if (cc > 200) {
		    tax = 160;
		    cc = cc - 200;
		    if (cc > 300) {
			tax = 220;
			cc = cc - 300;
			if (cc > 500) {
			    tax = 395;
			    cc = cc - 500;
			    if (cc > 500) {
				tax = 895;
				cc= cc-500;
				if (cc > 500) {
				    tax = 2145;
				    cc= cc-500;
				    if (cc > 0) {
					tax = tax + (cc * 4.5);
				    }
				}
				else {
				    tax = tax + (cc * 2.5);
				}
			    }
			    else {
				tax = tax + (cc * 1);
			    }
			}
			else {
			    tax = tax + (cc * 0.35);
			}
		    }
		    else {
			tax = tax + (cc * 0.2);
		    }
		}
		else {
		    tax = tax + (cc * 0.15);
		}
	   }
	   else {
		tax = tax + (cc * 0.13);
		if (tax < 100) {
		   tax = 100;
		}
	   }
		if (document.form3.fuel[1].checked) {
			tax = tax * 4;
		}
		else{
			if (document.form3.fuel[2].checked) {
				tax = tax * 2;
			}
		}
	}

	else {
	if (document.form3.region[1].checked) {
	   if (cc > 1000) {
		tax = 100;	 		
		cc = cc - 1000;
		if (cc > 200) {
		    tax = 124;
		    cc = cc - 200;
		    if (cc > 300) {
			tax = 178;
			cc = cc - 300;
			if (cc > 500) {
			    tax = 303;
			    cc = cc - 500;
			    if (cc > 500) {
				tax = 583;
				cc= cc-500;
				if (cc > 500) {
				    tax = 1083;
				    cc= cc-500;
				    if (cc > 0) {
					tax = tax + (cc * 1.75);
				    }
				}
				else {
				    tax = tax + (cc * 1);
				}
			    }
			    else {
				tax = tax + (cc * 0.56);
			    }
			}
			else {
			    tax = tax + (cc * 0.25);
			}
		    }
		    else {
			tax = tax + (cc * 0.18);
		    }
		}
		else {
		    tax = tax + (cc * 0.12);
		}
	   }
	   else {
		tax = tax + (cc * 0.10);
		if (tax < 100) {
		   tax = 100;
		}
	   }
		if (document.form3.fuel[1].checked) {
			tax = tax * 3.5;
		}
		else{
			if (document.form3.fuel[2].checked) {
				tax = tax * 1.75;
			}
		}
	}
	else {
	if (document.form3.region[2].checked) {
	   if (cc > 1000) {
		tax = 120;	 		
		cc = cc - 1000;
		if (cc > 500) {
		    tax = 195;
		    cc = cc - 500;
		    if (cc > 500) {
			tax = 345;
			cc = cc - 500;
			if (cc > 500) {
			    tax = 660;
			    cc = cc - 500;
			    if (cc > 500) {
				tax = 1160;
				cc= cc-500;
				if (cc > 0) {
				    tax = tax + (cc * 1.5);
				}
			    }
			    else {
				tax = tax + (cc * 1);
			    }
			}
			else {
			    tax = tax + (cc * 0.63);
			}
		    }
		    else {
			tax = tax + (cc * 0.30);
		    }
		}
		else {
		    tax = tax + (cc * 0.15);
		}
	   }
	   else {
		tax = tax + (cc * 0.12);
		if (tax < 100) {
		   tax = 100;
		}
	   }
		if (document.form3.fuel[2].checked) {
			tax = tax / 2;
		}
		
	}
	}
}
   return(tax)

}

function calcCompany(cc){
	var tax=0;
	if (document.form3.region[0].checked) {
	   if (cc > 1000) {
		tax = 260;	 		
		cc = cc - 1000;
		if (cc > 200) {
		    tax = 320;
		    cc = cc - 200;
		    if (cc > 300) {
			tax = 440;
			cc = cc - 300;
			if (cc > 500) {
			    tax = 790;
			    cc = cc - 500;
			    if (cc > 500) {
				tax = 2290;
				cc= cc-500;
				if (cc > 500) {
				    tax = 6040;
				    cc= cc-500;
				    if (cc > 0) {
					tax = tax + (cc * 13.5);
				    }
				}
				else {
				    tax = tax + (cc * 7.5);
				}
			    }
			    else {
				tax = tax + (cc * 3);
			    }
			}
			else {
			    tax = tax + (cc * 0.7);
			}
		    }
		    else {
			tax = tax + (cc * 0.4);
		    }
		}
		else {
		    tax = tax + (cc * 0.3);
		}
	   }
	   else {
		tax = tax + (cc * 0.26);
		if (tax < 100) {
		   tax = 100;
		}
	   }
		if (document.form3.fuel[1].checked) {
			tax = tax * 8;
		}
		else{
			if (document.form3.fuel[2].checked) {
				tax = tax * 4;
			}
		}
	}
	else {
	if (document.form3.region[1].checked) {
	   if (cc > 1000) {
		tax = 100;	 		
		cc = cc - 1000;
		if (cc > 200) {
		    tax = 124;
		    cc = cc - 200;
		    if (cc > 300) {
			tax = 178;
			cc = cc - 300;
			if (cc > 500) {
			    tax = 303;
			    cc = cc - 500;
			    if (cc > 500) {
				tax = 583;
				cc= cc-500;
				if (cc > 500) {
				    tax = 1083;
				    cc= cc-500;
				    if (cc > 0) {
					tax = tax + (cc * 1.75);
				    }
				}
				else {
				    tax = tax + (cc * 1);
				}
			    }
			    else {
				tax = tax + (cc * 0.56);
			    }
			}
			else {
			    tax = tax + (cc * 0.25);
			}
		    }
		    else {
			tax = tax + (cc * 0.18);
		    }
		}
		else {
		    tax = tax + (cc * 0.12);
		}
	   }
	   else {
		tax = tax + (cc * 0.10);
		if (tax < 100) {
		   tax = 100;
		}
	   }
		if (document.form3.fuel[1].checked) {
			tax = tax * 3.5;
		}
		else{
			if (document.form3.fuel[2].checked) {
				tax = tax * 1.75;
			}
		}
	}
	else {
	if (document.form3.region[2].checked) {
	   if (cc > 1000) {
		tax = 120;	 		
		cc = cc - 1000;
		if (cc > 500) {
		    tax = 195;
		    cc = cc - 500;
		    if (cc > 500) {
			tax = 345;
			cc = cc - 500;
			if (cc > 500) {
			    tax = 660;
			    cc = cc - 500;
			    if (cc > 500) {
				tax = 1160;
				cc= cc-500;
				if (cc > 0) {
				    tax = tax + (cc * 1.5);
				}
			    }
			    else {
				tax = tax + (cc * 1);
			    }
			}
			else {
			    tax = tax + (cc * 0.63);
			}
		    }
		    else {
			tax = tax + (cc * 0.30);
		    }
		}
		else {
		    tax = tax + (cc * 0.15);
		}
	   }
	   else {
		tax = tax + (cc * 0.12);
		if (tax < 100) {
		   tax = 100;
		}
	   }
		if (document.form3.fuel[2].checked) {
			tax = tax / 2;
		}
		
	}
	}
}
   return(tax)

}


function calcRound(num) {

   result=Math.floor(num)+"." ;

   n = result.length;

   var cents=100*(num-Math.floor(num))+0.5;

   result += Math.floor(cents/10);

   result += Math.floor(cents%10);

   return(result)

}
//-->
