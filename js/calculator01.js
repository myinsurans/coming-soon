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
   ncdArray[3]= 0.38333333
   ncdArray[4]= 0.45
   ncdArray[5]= 0.55
 //=====================================

function trigCCPremium(element)
{
  if (element.arc_quo_cubic_capacity_amount.value !="")
  {	
	
	//alert(element.arc_quo_vehicle_location.value);
		if(element.arc_quo_vehicle_location.value == 0){
			premium  = (tarifArray[element.arc_quo_cubic_capacity_amount.value][0]) + ((element.arc_quo_sum_insured.value-1000)/1000*26);
			//alert ('Peninsular: ' + premium);
		}else if(element.arc_quo_vehicle_location.value == 1){
			premium  = (tarifArray[element.arc_quo_cubic_capacity_amount.value][2]) + ((element.arc_quo_sum_insured.value-1000)/1000*20.3);
			//alert ('Sabah/Sarawak: ' + premium);
		}
  }
	else //error
	{
		alert("Please select a valid CC range.");
		element.arc_quo_cubic_capacity_amount.focus();
		premium = "Error!"
	}
	
	element.arc_quo_cubic_capacity_premium.value = premium;
    //alert("in trigCCPremium")
  	validate(element);
}	

			
function trigNCD(element)
{
    element.arc_quo_ncd_amount.value= FormatFloat((ncdArray[element.arc_quo_ncd_percentage.value] * element.arc_quo_cubic_capacity_premium.value),2)  ;
	//alert("in trigNCD"+element.arc_quo_ncd_amount.value)
	validate(element);
}

function trigFlood(element)
{
	if (element.cFLOOD.checked == true)
		element.FLOOD_Value.value= FormatFloat((element.arc_quo_sum_insured.value * (0.5 /100)),2); //x 0.5%
	else
		element.FLOOD_Value.value=0;
}

function trigSRCC(element)
{
	if (element.SRCC.checked == true)
		element.SRCC_Value.value = FormatFloat((element.arc_quo_sum_insured.value * (0.3/100)),2);  //x 0.3%
	else
		element.SRCC_Value.value=0;
}

function trigLLAN(element)
{
	if (element.LLAN.checked == true)
		element.LLAN_Value.value = 7.50;
	else
		element.LLAN_Value.value = 0;
}

function trigWS(element)
{
	element.WS_Value.value = FormatFloat(element.WS.value * 0.15,2); //15%
}
	
function trigRC(element)
{
	element.RC_Value.value = FormatFloat(element.RC.value * 0.15,2); // 15%
}

function trigADDrive(element)
{
	element.ADDrive_Value.value = element.ADDrive.value * 10; // RM 10
}

function trigLLP (element)
{
	// get 25% from premium
	if (element.LLP.checked == true)
	{
		if (element.arc_quo_cubic_capacity_amount.value =="")
		{
			alert("Please select a CC  range");
		}
		else
		{		
		grossTotal = tarifArray[element.arc_quo_cubic_capacity_amount.value][1] * 0.25; //25%
		if (element.PSG.value > 5)
		{
			psgCharge = (element.PSG.value - 5) * 10; //addition 5 x RM 10
		}
		else
		{	psgCharge = 0;}
	
		element.LLP_Value.value = FormatFloat(grossTotal + psgCharge,2);
		}
	}	
	else
		element.LLP_Value.value = 0;
}

function trigPSG(element)
{
	if (element.LLP.checked == true)
		trigLLP(element);

}

function trigVSI(element)
{
	DisableEnableFields();	//to call the function to check..
}

function trigLoading(element)
{

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
	with (element)
	{
		//premium  = (tarifArray[arc_quo_cubic_capacity_amount.value][0]) + ((Number(arc_quo_sum_insured.value)-1000)/1000*26);
		arc_quo_cubic_capacity_premium.value = premium;
	
		ncd = FormatFloat((ncdArray[arc_quo_ncd_percentage.value] * Number(arc_quo_cubic_capacity_premium.value)),2);
		arc_quo_ncd_amount.value = ncd;
	
		load_percent = Number(loading_percent.value);

		arc_quo_total_premium_payable.value = (Number(arc_quo_cubic_capacity_premium.value) + load_percent - Number(arc_quo_ncd_amount.value)).toFixed(2);

		//TPP.value = FormatFloat(Number(arc_quo_total_premium_payable.value )+ 10,2);
		//var TPP = FormatFloat(Number(arc_quo_total_premium_payable.value )+ 10,2);
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
		alert("Please enter a downpayment amount. The minimum downpayment shall be 10% of car purchase price.")
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
		alert (cc + " is not a number.");
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

   return(result);
}

function formatCurrency(num) {
	currency_sign = "";
	num = num.toString().replace(/\$|\,/g,'');
	if(isNaN(num))
		num = "0";
	sign = (num == (num = Math.abs(num)));
	num = Math.floor(num*100+0.50000000001);
	cents = num%100;
	num = Math.floor(num/100).toString();
	if(cents<10)
		cents = "0" + cents;
	for (var i = 0; i < Math.floor((num.length-(1+i))/3); i++)
		num = num.substring(0,num.length-(4*i+3))+',' + num.substring(num.length-(4*i+3));
	return (((sign)?'':'-') + currency_sign + num + '.' + cents);
}

//-->
