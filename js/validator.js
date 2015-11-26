function isVSI(obj) {
	var string = new String(obj.value);
	if (string.match(/^[0-9]{5,6}.[0-9]{1,2}$/) == null && string.match(/^[0-9]{5,6}$/) == null){
		return false;
	}
	return true;
}

function isFigure(obj) {
	var string = new String(obj.value);
	if (string.match(/^[0-9]{1,6}.[0-9]{1,2}$/) == null && string.match(/^[0-9]{1,6}$/) == null){
		return false;
	}
	return true;
}

function isVehicleYear(obj){
	var str = new String(obj.value);
	if (str.match(/^[0-9]{4}$/) == null) return false;
	return true;
}

//purpose: to check if a variable is a valid contact no (where both Mobile and House Phone are acceptable)
//------------------------------------------------------
function isFixPhone_1(obj) {
	var str = new String(obj.value);
	if (str.match(/^[0-9]{2,3}$/) == null) {
		return false; 
	}
	return true;
}
function isFixPhone_2(obj) {
	var str = new String(obj.value);
	if (str.match(/^[0-9]{6,8}$/) == null) {
		return false; 
	}
	return true;
}
//------------------------------------------------------

function isMOBILE1(obj) {
	var str = new String(obj.value);
	if (str.match(/^01[0,1,2,3,6,7,8,9]{1}$/) == null) {
		return false; 
	}
	return true;
}
function isMOBILE2(obj) {
	var str = new String(obj.value);
	if (str.match(/^[0-9]{7}$/) == null) {
		return false; 
	}
	return true;
}

function isOneFilled(obj){
	if (obj[0].type!="text")
		return false;
	var str;
	for (var i=0;i<obj.length;i++){
		if (obj[i]!=null){
			str = new String(obj[i].value);
			if (str.length>0)
				return true;
		}
	}
//	alert(msg);
	return false;
}

//------------------------------------------------------------------CHECK DATE FUNCTION---------------------------------------------------START

function checkdate(objName) 
{
	var datefield = objName;
	if (chkdate(objName) == false) 
	{
		//datefield.select();
		//alert("That date is invalid.  Please try again.");
		//datefield.focus();
		return false;
	}
	else 
	{
		return true;
	}
}

function chkdate(objName) 
{
	var strDatestyle = "US"; //United States date style
	//var strDatestyle = "EU";  //European date style
	var strDate;
	var strDateArray;
	var strDay;
	var strMonth;
	var strYear;
	var intday;
	var intMonth;
	var intYear;
	var booFound = false;
	var datefield = objName;
	var strSeparatorArray = new Array("-"," ","/",".");
	var intElementNr;
	var err = 0;
	var strMonthArray = new Array(12);
	strMonthArray[0] = "01";
	strMonthArray[1] = "02";
	strMonthArray[2] = "03";
	strMonthArray[3] = "04";
	strMonthArray[4] = "05";
	strMonthArray[5] = "06";
	strMonthArray[6] = "07";
	strMonthArray[7] = "08";
	strMonthArray[8] = "09";
	strMonthArray[9] = "10";
	strMonthArray[10] = "11";
	strMonthArray[11] = "12";
	strDate = datefield;
	if (strDate.length < 1) 
	{
		return true;
	}
	for (intElementNr = 0; intElementNr < strSeparatorArray.length; intElementNr++) 
	{
		if (strDate.indexOf(strSeparatorArray[intElementNr]) != -1) 
		{
			strDateArray = strDate.split(strSeparatorArray[intElementNr]);
			if (strDateArray.length != 3) 
			{
				err = 1;
				return false;
			}
			else 
			{
				strDay = strDateArray[0];
				strMonth = strDateArray[1];
				strYear = strDateArray[2];
			}
			booFound = true;
	    }
	}
	if (booFound == false) 
	{
		if (strDate.length>5) 
		{
			strDay = strDate.substr(0, 2);
			strMonth = strDate.substr(2, 2);
			strYear = strDate.substr(4);
	    }
	}
	if (strYear.length == 2) 
	{
		strYear = '20' + strYear;
	}
	// US style
	if (strDatestyle == "US") 
	{
		strTemp = strDay;
		strDay = strMonth;
		strMonth = strTemp;
	}
	intday = parseInt(strDay, 10);
	if (isNaN(intday)) 
	{
		err = 2;
		return false;
	}
	intMonth = parseInt(strMonth, 10);
	if (isNaN(intMonth)) 
	{
		for (i = 0;i<12;i++) 
		{
			if (strMonth.toUpperCase() == strMonthArray[i].toUpperCase()) 
			{
				intMonth = i+1;
				strMonth = strMonthArray[i];
				i = 12;
		    }
		}
		if (isNaN(intMonth)) 
		{
			err = 3;
			return false;
	    }
	}
	intYear = parseInt(strYear, 10);
	if (isNaN(intYear)) 
	{
		err = 4;
		return false;
	}
	if (intMonth>12 || intMonth<1) 
	{
		err = 5;
		return false;
	}
	if ((intMonth == 1 || intMonth == 3 || intMonth == 5 || intMonth == 7 || intMonth == 8 || intMonth == 10 || intMonth == 12) && (intday > 31 || intday < 1)) 
	{
		err = 6;
		return false;
	}
	if ((intMonth == 4 || intMonth == 6 || intMonth == 9 || intMonth == 11) && (intday > 30 || intday < 1)) 
	{
		err = 7;
		return false;
	}
	if (intMonth == 2) 
	{
		if (intday < 1) 
		{
			err = 8;
			return false;
		}
		if (LeapYear(intYear) == true) 
		{
			if (intday > 29) 
			{
				err = 9;
				return false;
			}
		}
		else 
		{
			if (intday > 28) 
			{
				err = 10;
				return false;
			}
		}
	}
	if (strDatestyle == "US") 
	{
		datefield = strMonthArray[intMonth-1] + "/" + intday+"/" + strYear;
	}
	else 
	{
		datefield = intday + "/" + strMonthArray[intMonth-1] + "/" + strYear;
	}
	return true;
}

function LeapYear(intYear) 
{
	if (intYear % 100 == 0) 
	{
		if (intYear % 400 == 0) 
		{ 
			return true; 
		}
	}
	else 
	{
		if ((intYear % 4) == 0) 
		{ 
			return true; 
		}
	}
	return false;
}

function doDateCheck(from, to) 
{
	if (Date.parse(from.value) <= Date.parse(to.value)) 
	{
		//alert("The date is valid.");
		return true;
	}
	else 
	{		
			alert("Your departure date must occur after your arrival date.");
			return false;
    }
}

function doDateCheckLastVisit(LastVisit)
{
	var TodayDate = new Date();
	var MyTodayDate = (TodayDate.getMonth() + 1) + "/" + TodayDate.getDate() + "/" + TodayDate.getYear();
	//alert(MyDate);
	//alert(LastVisit);
	if(Date.parse(LastVisit) > Date.parse(MyTodayDate))
	{
			alert("Your last visited date must not occur after today.");
			return false;
	}
	else
	{
			return true;
	}
		
}
//-------------------------------------------------------------------------------------------------------------------------------------------END


// purpose: to check a group of check boxes for at least one box ticked
function isOneTicked(obj)
{
	if (new String(obj.length).valueOf() == "undefined")
	{
		return isTicked(obj);
	}
	
	if (obj[0].type!="checkbox" && obj[0].type!="radio")
		return false;
		
	for (var i=0;i<obj.length;i++){
		if (obj[i].checked==true)
			return true;
	}
	obj[0].focus();
	return false;
}

function isArray(a) { return isObject(a) && a.constructor == Array; }

// purpose: to check a group of textfield / textarea for at least N box(es) filled
function isNFilled(obj, minfilled){
	if (obj[0].type!="text")
		return false;
	var str;
	var count = 0;
	for (var i=0;i<obj.length;i++){
		if (obj[i]!=null){
			str = new String(obj[i].value);
			if (str.length>0){
				count++;
			}
			if (count >= minfilled)
				return true;
		}
	}
	return false;
}
// purpose: to check a checkbox if it is checked
function isTicked(obj){
	if (!obj.checked){
		return false;
	}
	return true;
}
// purpose: to check a textfield / textarea if it is filled.
function isFilled(obj){
	if (obj.value.length<1){
		return false;
	}
	return true;
}
// purpose: to check a option menu if it has been selected
function isSelected(obj){
	if (obj[0].selected){
		return false;
	}
	return true;
}

// Purpose: to check a radio button if it is clicked
function isOneClicked(obj, field_quantity)
{
    //var form = document.forms[0];
    for(var i=0; i<field_quantity; i++)
    {            
        if(obj[i].checked == true)
        {
            return true;
        }
    }
    return false;    
}

// purpose: to check if an entry is a valid email
function isEmail(obj){
	var str = new String(obj.value); 
	if (str.match(/^[a-zA-Z0-9_\.\-\+\#\%]+@[a-zA-Z0-9_\.\-]+\.[a-zA-Z]{2,3}$/) == null){
		return false;
	}
	return true;
}
// purpose: to check if an antry is a valid Malaysian postcode
function isPostCode(obj){
	var str = new String(obj.value); 
	if (str.match(/^[0-9]{5}$/) == null){
		return false;
	}
	return true;
}
// purpose: to check if an entry is a valid Malaysian mobile phone number
function isMobilePhone(obj){
	var str = new String(obj.value); 
	if (str.match(/^01[0,2,3,4,6,7,8,9]{1}-[0-9]{7}$/) == null){
		return false;
	}
	return true;
}

// purpose: to check if an entry is a valid Malaysian mobile phone network
function isMobileNetwork(obj){
	var str = new String(obj.value);
	if (str.match(/^[6]{0,1}01[0,2,3,6,7,8,9]{1}$/) == null){
		return false;
	}
	return true;
}

// purpose: to check if an entry is a valid Malaysian mobile phone number
function isMobileNo(obj){
	var str = new String(obj.value); 
	if (str.match(/^[0-9]{7}$/) == null){
		return false;
	}
	return true;
}

// purpose: to check if an entry is a valid fixed line phone number
function isFixedPhone(obj){
	var str = new String(obj.value); 
	if (str.match(/^0[0-9]{1,2}-[0-9]{6,8}$/) == null){
		return false;
	}
	return true;
}

// purpose: to check if an entry is a valid fixed line phone area
function isPhoneArea(obj){
	var str = new String(obj.value); 
	if (str.match(/^[6]{0,1}0[0-9]{1,2}$/) == null){
		return false;
	}
	return true;
}

// purpose: to check if it is a valid age
function isAge(obj){
	var str = new String(obj.value); 
	if (str.match(/^[1-9]{1}[0-9]{0,1}$/) == null){
		return false;
	}
	return true;
}

// purpose: to check if an entry is a valid fixed line phone number
function isFixedNo(obj){
	var str = new String(obj.value); 
	if (str.match(/^[0-9]{6,8}$/) == null){
		return false;
	}
	return true;
}

// purpose: to check a single field IC number for a valid entry length
function is1FNRIC(obj){
	var str = new String(obj.value);
	if (str.match(/^[0-9]{12}$/) == null) return false;
	return true;
}


// purpose: to check NRIC1
function isNRIC1(obj){
	var str = new String(obj.value);
	if (str.match(/^[0-9]{6}$/) == null) return false;
	return true;
}
// purpose: to check NRIC2
function isNRIC2(obj){
	var str = new String(obj.value);
	if (str.match(/^[0-9]{2}$/) == null) return false;
	return true;
}
// purpose: to check NRIC3
function isNRIC3(obj){
	var str = new String(obj.value);
	if (str.match(/^[0-9]{4}$/) == null) return false;
	return true;
}



// purpose: to check a 3 field IC numbers for a valid entry length
function is3FNRIC(obj1, obj2, obj3){
	var str1 = new String(obj1.value);
	var str2 = new String(obj2.value);
	var str3 = new String(obj3.value);
	if (str1.match(/^[0-9]{6}$/) == null) return false;
	if (str2.match(/^[0-9]{2}$/) == null) return false;
	if (str3.match(/^[0-9]{4}$/) == null) return false;
	return true;
}
// purpose: to check the first field of an IC number if valid
function isValidNRIC(obj){
	var str = new String(obj.value);
	var vYear  = parseInt(str.substring(0,2),10);
	var vMonth = parseInt(str.substring(2,4),10);
	var vDate  = parseInt(str.substring(4,6),10);

	switch (vMonth) {
		case 1: case 3: case 5: case 7: case 8: case 10: case 12:
			if (vDate > 31) return false;
			break;
		case 2:
			if (vDate > 29) return false;
			break;
		case 4: case 6: case 9: case 11:
			if (vDate > 30) return false;
			break;
		default:
			return false;
	}
	return true;
}
// purpose: to check the entry if it is alphanumeric, with ignore white space flag
function isAlphanumeric(obj, ignoreWhiteSpace) {
	var string = new String(obj.value);
	if (string.search) {
		if ((ignoreWhiteSpace && string.search(/[^\w\s]/) != -1) || (!ignoreWhiteSpace && string.search(/\W/) != -1)){
			return false;
		}
	}
	return true;
}

// purpose:  Check that a string contains only letters
function isAlphabetic(obj, ignoreWhiteSpace) {
	var string = new String(obj.value);
	if (string.search) {
		if ((ignoreWhiteSpace && string.search(/[^a-zA-Z\s]/) != -1) || (!ignoreWhiteSpace && string.search(/[^a-zA-Z]/) != -1)){
			return false;
		}
	}
	return true;
}

// purpose: Check for a valid name
function isName(obj, ignoreWhiteSpace) {
	var string = new String(obj.value);
	if (string.search) {
		if ((ignoreWhiteSpace && string.search(/[^a-zA-Z\.\@\'\-\s]/) != -1) || (!ignoreWhiteSpace && string.search(/[^a-zA-Z\.\@\'\-]/) != -1)){
			return false;
		}
	}
	return true;
}

// purpose:  Check that a string contains only numbers
function isNumeric(obj, ignoreWhiteSpace) {
	var string = new String(obj.value);
	if (string.search) {
		if ((ignoreWhiteSpace && string.search(/[^\d\s\.]/) != -1) || (!ignoreWhiteSpace && string.search(/\D\./) != -1)){
			return false;
		}
	}
	return true;
}
// purpose: 
function fieldError(elem, errMsg)
{
	if (elem.type == "textfield" || elem.type == "textarea" || elem.type=="select")
		elem.select();
	if (elem.length > 1) elem[0].focus();
	else elem.focus();
	alert(errMsg);
}
// purpose: 
function selectError(elem, errMsg)
{
	if (elem.type == "textfield" || elem.type == "textarea" || elem.type=="select")
		elem.select();
	if (elem.length > 1 && elem && elem.type == "text") elem[0].focus();
	else elem.focus();
	alert(errMsg);
}

//Detect enter key stroke event, and avoid form to be submitted.
function noEnter(e){
var characterCode
	 if(e && e.which){
	 e = e
	 characterCode = e.which
	 }
	 else{
	 e = event
	 characterCode = e.keyCode
	 }	 
	 if(characterCode == 13){
 	 return false
	 }
	 else{
	 return true
	 }
}

function IsNumericOrFloat(x) {
var x = new String(x);
// I use this function like this: if (isNumeric(myVar)) { } 
// regular expression that validates a value is numeric 
var RegExp = /^(-)?(\d*)(\.?)(\d*)$/; // Note: this WILL allow a number that ends in a decimal: -452. 
// compare the argument to the RegEx 
// the 'match' function returns 0 if the value didn't match 
var result = x.match(RegExp);
return result;
}
