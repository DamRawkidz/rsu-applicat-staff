import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'thaibath',
  pure: true
})
export class ThaibathPipe implements PipeTransform {

  transform(value: any): String {
	  // credit https://github.com/tpsumeta/ThaiBath/blob/master/thaibath.js
    return this.ThaiNumberToText(value);
  }

  ThaiNumberToText(number: string){
	number = number.replace (/๐/gi,'0');  
	number = number.replace (/๑/gi,'1');  
	number = number.replace (/๒/gi,'2');
	number = number.replace (/๓/gi,'3');
	number = number.replace (/๔/gi,'4');
	number = number.replace (/๕/gi,'5');
	number = number.replace (/๖/gi,'6');
	number = number.replace (/๗/gi,'7');
	number = number.replace (/๘/gi,'8');
	number = number.replace (/๙/gi,'9');
	return 	this.ArabicNumberToText(number);
}

ArabicNumberToText(Number)
{
	var Number = this.CheckNumber(Number);
	var NumberArray = new Array ("ศูนย์", "หนึ่ง", "สอง", "สาม", "สี่", "ห้า", "หก", "เจ็ด", "แปด", "เก้า", "สิบ");
	var DigitArray = new Array ("", "สิบ", "ร้อย", "พัน", "หมื่น", "แสน", "ล้าน");
	var BahtText = "";
	if (isNaN(Number))
	{
		return "ข้อมูลนำเข้าไม่ถูกต้อง";
	} else
	{
		if ((Number - 0) > 9999999.9999)
		{
			return "ข้อมูลนำเข้าเกินขอบเขตที่ตั้งไว้";
		} else
		{
			Number = Number.split (".");
			if (Number[1].length > 0)
			{
				Number[1] = Number[1].substring(0, 2);
			}
			var NumberLen = Number[0].length - 0;
			for(var i = 0; i < NumberLen; i++)
			{
				var tmp = Number[0].substring(i, i + 1) - 0;
				if (tmp != 0)
				{
					if ((i == (NumberLen - 1)) && (tmp == 1))
					{
						BahtText += "เอ็ด";
					} else
					if ((i == (NumberLen - 2)) && (tmp == 2))
					{
						BahtText += "ยี่";
					} else
					if ((i == (NumberLen - 2)) && (tmp == 1))
					{
						BahtText += "";
					} else
					{
						BahtText += NumberArray[tmp];
					}
					BahtText += DigitArray[NumberLen - i - 1];
				}
			}
			BahtText += "บาท";
			if ((Number[1] == "0") || (Number[1] == "00"))
			{
				BahtText += "ถ้วน";
			} else
			{
				let DecimalLen = Number[1].length - 0;
				for (var i = 0; i < DecimalLen; i++)
				{
					var tmp = Number[1].substring(i, i + 1) - 0;
					if (tmp != 0)
					{
						if ((i == (DecimalLen - 1)) && (tmp == 1))
						{
							BahtText += "เอ็ด";
						} else
						if ((i == (DecimalLen - 2)) && (tmp == 2))
						{
							BahtText += "ยี่";
						} else
						if ((i == (DecimalLen - 2)) && (tmp == 1))
						{
							BahtText += "";
						} else
						{
							BahtText += NumberArray[tmp];
						}
						BahtText += DigitArray[DecimalLen - i - 1];
					}
				}
				BahtText += "สตางค์";
			}
			return BahtText;
		}
	}
}

 CheckNumber(Number){
	var decimal = false;
	Number = Number.toString();						
	Number = Number.replace (/ |,|บาท|฿/gi,'');  		
	for (var i = 0; i < Number.length; i++)
	{
		if(Number[i] =='.'){
			decimal = true;
		}
	}
	if(decimal == false){
		Number = Number+'.00';
	}
	return Number
}

}

