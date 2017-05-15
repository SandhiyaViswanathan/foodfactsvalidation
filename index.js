let fs=require('fs');
let ln = require('readline').createInterface({
  input: fs.createReadStream('data/FoodFacts.csv')
});

let country = ['Netherlands', 'Canada', 'United Kingdom' , 'United States' , 'Australia' , 'France' , 'Germany' , 'Spain', 'South Africa'];
let region=['northEurope','centralEurope','southEurope'];
let northEurope = ['United Kingdom', 'Denmark', 'Sweden', 'Norway'];
let centralEurope = ['France', 'Belgium', 'Germany', 'Switzerland', 'Netherlands'];
let southEurope = ['Portugal', 'Greece', 'Italy', 'Spain', 'Croatia', 'Albania'];
let data=[],final=[],final_c=[];
let sugarindex=0,saltindex=0,countryindex=0,countryv = 0,sugar = 0,salt = 0,i=0;
let carbohydrateindex=0,fatindex=0,proteinindex=0;
let Carbohydrates = 0,fat = 0,protein=0;
let Carbohydratesv = Array(3).fill(0);
let fatv = Array(3).fill(0);
let proteinv = Array(3).fill(0);
let sugarv = Array(9).fill(0);
let saltv = Array(9).fill(0);

ln.on('line', function (line) {
  data=line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);


while(i<1) 
  {
    countryindex=data.indexOf('countries_en');
    sugarindex=data.indexOf('sugars_100g');
    saltindex=data.indexOf('salt_100g');
    fatindex=data.indexOf('fat_100g');
    proteinindex=data.indexOf('proteins_100g');
    carbohydrateindex=data.indexOf('carbohydrates_100g');
    i++;
  }




  countryv=data[countryindex];
  sugar=data[sugarindex];
  salt=data[saltindex];
  fat=data[fatindex];
  protein=data[proteinindex];
  carbohydrate=data[carbohydrateindex];
   
   if(salt=="") salt=0;
   if(sugar=="") sugar=0;
   if(fat=="")  fat=0;
   if(protein=="") protein=0;
   if(carbohydrate=="")carbohydrate=0;
   

  let index=country.indexOf(countryv);
     if(index!=-1)
      {
        sugarv[index]+=parseFloat(sugar);
        saltv[index]+=parseFloat(salt);
      }

  let aa=northEurope.indexOf(countryv);
 
     if(aa!=-1)
      {
        proteinv[0]+=parseFloat(protein);
        Carbohydratesv[0]+=parseFloat(carbohydrate);
        fatv[0]+=parseFloat(fat);
      } 

  let bb=centralEurope.indexOf(countryv);
       
      if(bb!=-1)
       {
        proteinv[1]+=parseFloat(protein);
        Carbohydratesv[1]+=parseFloat(carbohydrate);
        fatv[1]+=parseFloat(fat);
        }

  let cc=southEurope.indexOf(countryv);

      if(cc!=-1)
        {
          proteinv[2]+=parseFloat(protein);
          Carbohydratesv[2]+=parseFloat(carbohydrate);
          fatv[2]+=parseFloat(fat);
        }
    });


ln.on('close', function() {
  
  for(let h1=0;h1<country.length;h1++) 
  {
    final.push({Country:country[h1],
    Sugar:sugarv[h1],
    Salt:saltv[h1]
  });
  }
  for(let h=0;h<region.length;h++) 
  {
    final_c.push({Region:region[h],
    
    fat:fatv[h],
    protein:proteinv[h],
    Carbohydrates:Carbohydratesv[h],
  });
  }
console.log(final);
console.log(final_c);
fs.writeFileSync('output/outputjson3.json', JSON.stringify(final));  
fs.writeFileSync('output/outputjson4.json',JSON.stringify(final_c));  
});