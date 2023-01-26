/*Nokta Oluşturma Aşamaları
1-Kullanıcıdan öncelikle katman adı girilmesi istenir. Girilen katman adının uygunluğu kontrol edilir. 
2-Katman adı uygun ise haritada tıklama olayı ile veya maanuel koordinat girerek nokta oluşturulur.
3-Nokta oluşturulduğu gibi haritaya eklenir ve noktaya ait class oluşturulur
4- Class oluşturulduğu an, vektör penceresine eklenir ve menüleri oluşturulur
5- obje istenildiği an haritada gizlenebilir ve tekrar gösterilebilir.
6-istenilen anda objeye yakınlaşılabilir
7-objenin stili nokta veya simge olarak seçiiebilir. büyüklük, saydamlık ayarlanabilir
8-objeye ait öznitelik bilgisi eklenebilir ve düzenlenebilir

*/

/* Uygun olmayan karakterlerin girilmemesi için harflerden oluşan liste */
var alfabe_harfler = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","r","s","t","u","v","x","w","y","z",
                      "A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","R","S","T","U","X","W","Y","Y","Z",
                    "1","2","3","4","5","6","7","8","9","0"]  
var sayilar =["1","2","3","4","5","6","7","8","9","0"]  

/* Katman oluşturulurken kullanıcıdan katman adı girilmesi */
function create_layer_name(obje_type){ //oluşturulacak obje için kullanıcıdan katman adı istenir.
  document.getElementById("create_object").open = false
  document.getElementById("sayfamesajlari").style.backgroundColor="black";
  document.getElementById("sayfamesajlari").innerText="Enter the Layer Name.";
  var isimal = document.createElement("input");
  isimal.setAttribute("id","isimal");
  isimal.setAttribute("name","Katman Adı");
  isimal.setAttribute("value","");
  var isimgonder = document.createElement("input");
  isimgonder.setAttribute("id","isimgonder");
  isimgonder.setAttribute("type","submit");
  isimgonder.setAttribute("value","Apply");
  // katman adı hangi işlem için kullanılıcaksa ilgili işlem, ilgili fonksiyona bildirilir
  if (obje_type==="createpolygon"){
    isimgonder.onclick=function(){
      check_layer_name('createpolygon')
      return
    }
    }
    
  else if (obje_type==="createmultipoint"){
    isimgonder.onclick=function(){
      check_layer_name('createmultipoint')
      return
    }
  }
  else if (obje_type==="createline"){
    isimgonder.onclick=function(){
      check_layer_name('createline')
      return
    }
    
  }
  var kapat = document.createElement("button");
  kapat.setAttribute("onclick","bekleme()");
  kapat.innerText="Finish"
  document.getElementById("sayfamesajlari").appendChild(isimal);
  document.getElementById("sayfamesajlari").appendChild(isimgonder);
  document.getElementById("sayfamesajlari").appendChild(kapat)
}

/* Kullanıcıdan gelen katman isminin uygunluğunun kontrolü */
function check_layer_name(layer_name){ //kullanıcıdan gelen katman adı, bir kontrolden geçer. Katman Adı boşluk-rakam veya özel karakterle başlayamaz. İçerisinde özel karakter ve boşluk içeremez.
                        //aykırı bir durumda kullanıcıya uyarı verilir ve tekrar giriş penceresi açılır
  var layer_demo_name = document.getElementById("isimal").value
  /*  KULLANICIDAN GELEN KATMAN ADININ İLK HARFİ SAYI,ÖZEL KARAKTER, ÖÜİÇöçı GİBİ HARFLERİN OLUP OLMADIĞININ KONTROLÜ */
    if (alfabe_harfler.includes(layer_demo_name[0])===true && isNaN(parseFloat(layer_demo_name[0]))===true && typeof window[layer_demo_name]!=="object"){
      var kontrol_durum
      // KULLANICIDAN GELEN KATMAN ADININ TÜM HARFLERİNİN KONTROLÜ
      for (var c in range(0,(layer_demo_name.length-1))){
        //HARFLER TEKER TEKER KONTROLDEN GEÇER. ALFABE HARFLER LİSTESİNDE OLMAYAN HARFLER İÇİN UYARI VERİLİR
          if (alfabe_harfler.includes(layer_demo_name[c])===true){
            kontrol_durum="sorun yok"
          }
          else {
            alert("The Layer Name You Enter Cannot Contain Special Characters and Spaces.")
            kontrol_durum="sorun var"
            //KULLANICIDAN TEKRAR KATMAN ADI GİRMESİ İÇİN ÖNCEKİ FNKSİYONA GÖNDERİLİR
            if (layer_name==="createpolygon"){
            create_layer_name("createpolygon")
            return
            }
            else if (layer_name==="createmultipoint"){
            create_layer_name("createmultipoint")
            return
            }
            else if (layer_name==="createline")
            break
          }
        }
        // KATMAN ADINDA SORUN YOKSA EĞER OBJE OLUŞTURMAYA YÖNLENDİRİLİR
      if (kontrol_durum==="sorun yok"){
        if (layer_name==="createpolygon"){
          create_polygon(layer_demo_name)
          return
          }
        else if(layer_name==="createmultipoint"){
          multi_create_point(layer_demo_name)
          return
          }
        else if (layer_name==="createline"){
          create_line(layer_demo_name)
          return
        }
      }
      
    } 
    // katman adı daha önceden kullanılmışsa uyarı verilir ve farklı bir ad girmesi istenir
    else if (typeof window[layer_demo_name]==="object"){
      alert("A Layer Has Been Created With This Layer Name Before. Try a Different Name.")
      if (layer_name==="createpolygon"){
        create_layer_name("createpolygon")
        return
        }
        else if(layer_name==="createmultipoint"){
          create_layer_name("createmultipoint")
          return
        }
        else if (layer_name="createline"){
          create_line(layer_demo_name)
          return
        }
    }
    else {
      alert("Layer Name cannot start with Special Characters, numbers and spaces.\nTry again.")
      if (layer_name==="createpolygon"){
        create_layer_name("createpolygon")
        return
        }
        else if(layer_name==="createmultipoint"){
          create_layer_name("createmultipoint")
          return
        }
        else if (layer_name="createline"){
          create_line(layer_demo_name)
          return
        }
    }
}

/* nokta objesinin oluşturulacağı fonksiyon */
function create_point(a){
    document.getElementById("oznitelikpenceresi").innerHTML="";
    var a = a
    //Sayfa Mesajlarında Çizime Başlamaya Dair Bildiri
    var koordinat_gir_buton=document.createElement("button")
    koordinat_gir_buton.innerText="Enter Coordinate"
    koordinat_gir_buton.onclick= function(){
      map.off("click")
      document.getElementById('obje_girdi').style.backgroundColor = "black";
      document.getElementById('obje_girdi').innerHTML='<label for="xbuton">Lat :</label><input type="number" maxlength="999999" id="xbuton" step="0.001" value="" required><br><label for="ybuton">Lng :</label><input type="number" maxlength="999999" id="ybuton" step="0.001" value="" required><input id="koordinatal" type="submit"  value="Create">';
      document.getElementById("koordinatal").setAttribute("onclick","koordinatileolustur('"+"olustur"+"')")
      document.getElementById("sayfamesajlari").innerText="Please enter the coordinates of the point you want to create."
      document.getElementById("sayfamesajlari").appendChild(document.createElement("br"))
      var iptal_buton=document.createElement("button")
      iptal_buton.innerText="Finish"
      iptal_buton.onclick=function(){
        document.getElementById("sayfamesajlari").innerText="Process Canceled"
        document.getElementById('obje_girdi').innerHTML=""
        bekleme()
        return
      }
      document.getElementById("sayfamesajlari").appendChild(iptal_buton)  
    }
    var islemi_bitir=document.createElement("button")
    islemi_bitir.innerText="Finish"
    document.getElementById('sayfamesajlari').innerText=a+" Layer Created.\nYou can start drawing.";
    document.getElementById('sayfamesajlari').appendChild(document.createElement("br"))
    document.getElementById('sayfamesajlari').appendChild(koordinat_gir_buton)
    document.getElementById('sayfamesajlari').appendChild(islemi_bitir)
    document.getElementById('sayfamesajlari').style.backgroundColor  = "black";
    //harita üzerinde tıklama olayı ile koordinat almanın etkinleştirilmesi
      map.on('click', (e)=>{
      x = (e.latlng.lat).toFixed(8);
      y = (e.latlng.lng).toFixed(8);
      var name = "point"+(new Date()).getMilliseconds()+Math.floor(Math.random()*1000);  //benzersiz id alma
      document.getElementById("vektor").open = true
      document.getElementById('sayfamesajlari').style.backgroundColor  = "black"; 
      document.getElementById('sayfamesajlari').innerText=name+" created \n"+"Lat="+x+"   "+"Lng="+y;//sayfa mesajlarında objenin oluştuğuna dair bilgi
      window[a]= new point_object(x_coordinats=x,y_coordinats=y,object_name=a); //objenin oluşturulması
      window[a].haritayaekle(window[a].bicim);//objenin haritaya eklenmesi
      window[a].menuleriolustur();  //objeye ait vektörler penceresindeki menülerin oluşturulması
      window[a].oznitelikgoruntulemeveduzenleme();
      bekleme(); //sayfa mesajlarındaki yazının kaybolması
      map.off('click');  //tıklama ile point eklemenin pasifleştiirlmesi
    })
  }
  
  //-------------------------------------------------------------------------------------------------------------------------------------
    // koordinat girerek nokta oluşturma
  function koordinatileolustur(n,q){
    var w = n
    var q = q
  if (w==="olustur"){
      var x = document.getElementById('xbuton').value;
      var y = document.getElementById('ybuton').value;
      while (true){
                // x veya y girişlerinin boş olmaması durumunda aşağıdaki if bloğu çalışır
                if (x!=="" && y!==""){
                  //benzersiz bir id oluşturulur ve var olup olmadığı kontrol edilir
                var name = "point"+(new Date()).getMilliseconds()+Math.floor(Math.random()*1000);
                if ((typeof window[name])!=="object"){  //id in daha önceden var olup olmadığının kontrolü
                  document.getElementById('sayfamesajlari').style.backgroundColor  = "black"; 
                  document.getElementById('sayfamesajlari').innerText=name+" creaated \n"+"Lat="+x+"   "+"Lng="+y;//sayfa mesajlarında objenin oluştuğuna dair bilgi
                  window[name]= new point_object(x_coordinats=x,y_coordinats=y,object_name=name);  //objenin oluşturulması
                  window[name].haritayaekle(window[name].bicim); //objenin haritaya eklenmesi
                  window[name].menuleriolustur();  //objeye ait vektörler penceresindeki menülerin oluşturulması
                  bekleme(); //sayfa mesajlarındaki yazının kaybolması
                  document.getElementById('obje_girdi').innerText="";
                  document.getElementById('obje_girdi').style.backgroundColor="unset";
                  }
                else{
                  // atanan id ye ait bir obje varsa uyarı çıkar
                  alert("There Is An Object With This Id.");
                    break;
                    }
                break;
                }
                else{
                  alert("X or Y value cannot be left blank.");
                  document.getElementById('obje_girdi').innerText="";
                  document.getElementById('obje_girdi').style.backgroundColor="unset";
                  break;
                }
                  bekleme();
                  document.getElementById('obje_girdi').innerText="";
                  document.getElementById('obje_girdi').style.backgroundColor="unset";
                  break;
              }
            }
            //FONKSİYONA EĞER DÜZENLEME PARAMETRESİ GELDİYSE İLGİLİ NOKTA MANUEL KOORDİNATLAR İLE YENİ YERİNE TAŞINIR
  else if(w==="duzenle"){
    var x = document.getElementById('xbuton').value;
    var y = document.getElementById('ybuton').value;
    document.getElementById("sayfamesajlari").innerText="Show the New Coordinate of the Object by Left Clicking.\nPress the Home Button to Enter Manual Coordinates.\nPress the End Key to Finish."+"\n"+"Lat:"+x+"Lng:"+y
    window[q].properties["X Koordinatı(Enlem)"]=parseFloat(x)
    window[q].properties["Y Koordinatı(Boylam)"]=parseFloat(y)
    window[q].geojsonfeature.geometry.coordinates = [y,x]
    eski_x=window[q].coordinates_bound[0]
    eski_y=window[q].coordinates_bound[1]
    window[q].coordinates_bound[0]=x
    window[q].coordinates_bound[1]=y
    window[q].objeyiyenile(window[q])
    document.getElementById('obje_girdi').innerText="";
    document.getElementById('obje_girdi').style.backgroundColor="unset";
    document.getElementById("sayfamesajlari").innerText=window[q].id_nosu +  " Object Successfully Moved From Coordinates ,"+eski_x+"--"+eski_y+"  to Coordinates "+x+"--"+y+" ."
    bekleme()


  }      
      }
  //--------------point objesine ait class-----------------------------------------------------------------------------------------------------------------------
  

  /* KATMAN SİLME */
  async function katman_sil(i){
    document.getElementById('sayfamesajlari').style.backgroundColor  = "black";
    document.getElementById('sayfamesajlari').innerText = "Deleting Layer";
    await sleep(500);
    document.getElementById('sayfamesajlari').innerText = "Layer Deleted";
    await sleep(500);
    document.getElementById('sayfamesajlari').style.backgroundColor  = "unset";
    document.getElementById('sayfamesajlari').innerText = "";
    window[i].oznitelikpenceresikapat()
    window[i].haritadansil();
    delete window[i];
    document.getElementById(i).remove();
    return
  }

  //-------------------url olup olmadığına dair kontrol 
var elm;
function isValidURL(u){
  if(u!==""){
      if(!elm){
      elm = document.createElement('input');
      elm.setAttribute('type', 'url');
      }
  elm.value = u;
  return elm.validity.valid;
  }
  else{
      console.log("Url Address Cannot Be Entered Empty.");
      return
  }
}
/* SEMBOLLER */
const symbol_list={
    agac:{"point_sembols/tree_black.png":"Tree"},
    havaalani:{"point_sembols/airport_black.png":"Airport"},
    liman:{"point_sembols/liman.png":"Port"},
    fabrika:{"point_sembols/fabrika.png":"Fabric"}
    };
/* RENKLER */
var renk_listesi = [
    ' #f8f8ff ',
    ' #f5f5f5 ',
    ' #dcdcdc ',
    ' #ffffff ',
    ' #000000 ',
    ' #808080 ',
    ' #908f8f ',
    ' #666666 ',
    ' #5f5f5f ',
    ' #696969 ',
    ' #dddddd ',
    ' #d3d3d3 ',
    ' #bebebe ',
    ' #1c1c1c ',
    ' #363636 ',
    ' #4f4f4f ',
    ' #696969 ',
    ' #828282 ',
    ' #9c9c9c ',
    ' #b5b5b5 ',
    ' #cfcfcf ',
    ' #e8e8e8 ',
    ' #a9a9a9 ',
    ' #778899 ',
    ' #708090 ',
    ' #c6e2ff ',
    ' #b9d3ee ',
    ' #9fb6cd ',
    ' #6c7b8b ',
    ' #2f4f4f ',
    ' #97ffff ',
    ' #8deeee ',
    ' #79cdcd ',
    ' #528b8b ',
    ' #4a804d ',
    ' #6f804a ',
    ' #8b658b ',
    ' #eee8aa ',
    ' #fffaf0 ',
    ' #fafad2 ',
    ' #8b4513 ',
    ' #a0522d ',
    ' #fdf5e6 ',
    ' #faf0e6 ',
    ' #ffefd5 ',
    ' #ffebcd ',
    ' #ffe4b5 ',
    ' #cd853f ',
    ' #f5f5dc ',
    ' #f4a460 ',
    ' #fffafa ',
    ' #eee9e9 ',
    ' #cdc9c9 ',
    ' #8b8989 ',
    ' #fff5ee ',
    ' #eee5de ',
    ' #cdc5bf ',
    ' #8b8682 ',
    ' #faebd7 ',
    ' #ffefdb ',
    ' #eedfcc ',
    ' #cdc0b0 ',
    ' #8b8378 ',
    ' #ffe4c4 ',
    ' #eed5b7 ',
    ' #cdb79e ',
    ' #8b7d6b ',
    ' #ffdab9 ',
    ' #eecbad ',
    ' #cdaf95 ',
    ' #8b7765 ',
    ' #ffdead ',
    ' #eecfa1 ',
    ' #cdb38b ',
    ' #8b795e ',
    ' #fffacd ',
    ' #eee9bf ',
    ' #cdc9a5 ',
    ' #8b8970 ',
    ' #fff8dc ',
    ' #eee8cd ',
    ' #cdc8b1 ',
    ' #8b8878 ',
    ' #fffff0 ',
    ' #eeeee0 ',
    ' #cdcdc1 ',
    ' #8b8b83 ',
    ' #f5fffa ',
    ' #f0fff0 ',
    ' #e0eee0 ',
    ' #c1cdc1 ',
    ' #838b83 ',
    ' #fff0f5 ',
    ' #eee0e5 ',
    ' #cdc1c5 ',
    ' #8b8386 ',
    ' #e6e6fa ',
    ' #ffe4e1 ',
    ' #eed5d2 ',
    ' #cdb7b5 ',
    ' #8b7d7b ',
    ' #f0ffff ',
    ' #e0eeee ',
    ' #c1cdcd ',
    ' #838b8b ',
    ' #f0f8ff ',
    ' #8470ff ',
    ' #7b68ee ',
    ' #6a5acd ',
    ' #836fff ',
    ' #7a67ee ',
    ' #6959cd ',
    ' #473c8b ',
    ' #483d8b ',
    ' #4169e1 ',
    ' #4876ff ',
    ' #436eee ',
    ' #3a5fcd ',
    ' #27408b ',
    ' #0000ff ',
    ' #0000ee ',
    ' #00008b ',
    ' #1c0f45 ',
    ' #000080 ',
    ' #191970 ',
    ' #6495ed ',
    ' #0000cd ',
    ' #b0e0e6 ',
    ' #087EB0 ',
    ' #1e90ff ',
    ' #1c86ee ',
    ' #1874cd ',
    ' #104e8b ',
    ' #4682b4 ',
    ' #63b8ff ',
    ' #5cacee ',
    ' #4f94cd ',
    ' #36648b ',
    ' #00bfff ',
    ' #00b2ee ',
    ' #009acd ',
    ' #00688b ',
    ' #87ceeb ',
    ' #87ceff ',
    ' #7ec0ee ',
    ' #6ca6cd ',
    ' #4a708b ',
    ' #87cefa ',
    ' #b0e2ff ',
    ' #a4d3ee ',
    ' #8db6cd ',
    ' #607b8b ',
    ' #b0c4de ',
    ' #cae1ff ',
    ' #bcd2ee ',
    ' #a2b5cd ',
    ' #6e7b8b ',
    ' #add8e6 ',
    ' #bfefff ',
    ' #b2dfee ',
    ' #9ac0cd ',
    ' #68838b ',
    ' #1b8bb4 ',
    ' #e0ffff ',
    ' #d1eeee ',
    ' #b4cdcd ',
    ' #7a8b8b ',
    ' #5f9ea0 ',
    ' #98f5ff ',
    ' #8ee5ee ',
    ' #7ac5cd ',
    ' #53868b ',
    ' #afeeee ',
    ' #bbffff ',
    ' #aeeeee ',
    ' #96cdcd ',
    ' #668b8b ',
    ' #48d1cc ',
    ' #00ced1 ',
    ' #40e0d0 ',
    ' #00f5ff ',
    ' #00e5ee ',
    ' #00c5cd ',
    ' #00868b ',
    ' #00ffff ',
    ' #00eeee ',
    ' #00cdcd ',
    ' #008b8b ',
    ' #1c6071 ',
    ' #7fffd4 ',
    ' #76eec6 ',
    ' #66cdaa ',
    ' #458b74 ',
    ' #8fbc8f ',
    ' #c1ffc1 ',
    ' #b4eeb4 ',
    ' #9bcd9b ',
    ' #698b69 ',
    ' #2e8b57 ',
    ' #54ff9f ',
    ' #4eee94 ',
    ' #43cd80 ',
    ' #98fb98 ',
    ' #9aff9a ',
    ' #90ee90 ',
    ' #7ccd7c ',
    ' #548b54 ',
    ' #00ff7f ',
    ' #00ee76 ',
    ' #00cd66 ',
    ' #008b45 ',
    ' #00ff00 ',
    ' #00ee00 ',
    ' #00cd00 ',
    ' #008b00 ',
    ' #006400 ',
    ' #4ba123 ',
    ' #3cb371 ',
    ' #20b2aa ',
    ' #90ee90 ',
    ' #7cfc00 ',
    ' #00fa9a ',
    ' #adff2f ',
    ' #32cd32 ',
    ' #9acd32 ',
    ' #228b22 ',
    ' #7fff00 ',
    ' #76ee00 ',
    ' #66cd00 ',
    ' #458b00 ',
    ' #6b8e23 ',
    ' #c0ff3e ',
    ' #b3ee3a ',
    ' #9acd32 ',
    ' #698b22 ',
    ' #556b2f ',
    ' #caff70 ',
    ' #bcee68 ',
    ' #a2cd5a ',
    ' #6e8b3d ',
    ' #fff68f ',
    ' #eee685 ',
    ' #cdc673 ',
    ' #8b864e ',
    ' #bdb76b ',
    ' #eedd82 ',
    ' #ffec8b ',
    ' #eedc82 ',
    ' #cdbe70 ',
    ' #8b814c ',
    ' #ffffe0 ',
    ' #eeeed1 ',
    ' #cdcdb4 ',
    ' #8b8b7a ',
    ' #ffff00 ',
    ' #eeee00 ',
    ' #cdcd00 ',
    ' #8b8b00 ',
    ' #ffc000 ',
    ' #ffd700 ',
    ' #eec900 ',
    ' #cdad00 ',
    ' #8b7500 ',
    ' #ffe413 ',
    ' #daa520 ',
    ' #ffc125 ',
    ' #eeb422 ',
    ' #cd9b1d ',
    ' #8b6914 ',
    ' #b8860b ',
    ' #ffb90f ',
    ' #eead0e ',
    ' #cd950c ',
    ' #bc8f8f ',
    ' #ffc1c1 ',
    ' #eeb4b4 ',
    ' #cd9b9b ',
    ' #8b6969 ',
    ' #cd5c5c ',
    ' #ff6a6a ',
    ' #ee6363 ',
    ' #cd5555 ',
    ' #8b3a3a ',
    ' #ff8247 ',
    ' #ee7942 ',
    ' #cd6839 ',
    ' #8b4726 ',
    ' #deb887 ',
    ' #ffd39b ',
    ' #eec591 ',
    ' #cdaa7d ',
    ' #8b7355 ',
    ' #f5deb3 ',
    ' #ffe7ba ',
    ' #eed8ae ',
    ' #cdba96 ',
    ' #8b7e66 ',
    ' #d2b48c ',
    ' #ffa54f ',
    ' #ee9a49 ',
    ' #cd853f ',
    ' #8b5a2b ',
    ' #d2691e ',
    ' #ff7f24 ',
    ' #ee7621 ',
    ' #cd661d ',
    ' #8b4513 ',
    ' #b22222 ',
    ' #ff3030 ',
    ' #ee2c2c ',
    ' #cd2626 ',
    ' #8b1a1a ',
    ' #a52a2a ',
    ' #ff4040 ',
    ' #ee3b3b ',
    ' #cd3333 ',
    ' #8b2323 ',
    ' #fa8072 ',
    ' #ff8c69 ',
    ' #ee8262 ',
    ' #cd7054 ',
    ' #8b4c39 ',
    ' #ffa07a ',
    ' #ee9572 ',
    ' #cd8162 ',
    ' #8b5742 ',
    ' #ffa500 ',
    ' #ee9a00 ',
    ' #cd8500 ',
    ' #8b5a00 ',
    ' #ee7e15 ',
    ' #ff8c00 ',
    ' #ff7f00 ',
    ' #ee7600 ',
    ' #cd6600 ',
    ' #8b4500 ',
    ' #f08080 ',
    ' #ff7f50 ',
    ' #ff7256 ',
    ' #ee6a50 ',
    ' #cd5b45 ',
    ' #8b3e2f ',
    ' #ff6347 ',
    ' #ee5c42 ',
    ' #cd4f39 ',
    ' #8b3626 ',
    ' #ff4500 ',
    ' #ee4000 ',
    ' #cd3700 ',
    ' #cc5a11 ',
    ' #ff0000 ',
    ' #ee0000 ',
    ' #cd0000 ',
    ' #a40000 ',
    ' #8b0000 ',
    ' #c60000 ',
    ' #dc143c ',
    ' #ff1493 ',
    ' #ee1289 ',
    ' #cd1076 ',
    ' #8b0a50 ',
    ' #ff69b4 ',
    ' #ff6eb4 ',
    ' #ee6aa7 ',
    ' #cd6090 ',
    ' #8b3a62 ',
    ' #ffc0cb ',
    ' #ffb5c5 ',
    ' #eea9b8 ',
    ' #cd919e ',
    ' #8b636c ',
    ' #ffb6c1 ',
    ' #ffaeb9 ',
    ' #eea2ad ',
    ' #cd8c95 ',
    ' #8b5f65 ',
    ' #db7093 ',
    ' #ff82ab ',
    ' #ee799f ',
    ' #cd6889 ',
    ' #8b475d ',
    ' #800000 ',
    ' #b03060 ',
    ' #ff34b3 ',
    ' #ee30a7 ',
    ' #cd2990 ',
    ' #8b1c62 ',
    ' #d02090 ',
    ' #ff3e96 ',
    ' #ee3a8c ',
    ' #cd3278 ',
    ' #8b2252 ',
    ' #ff00ff ',
    ' #ee00ee ',
    ' #cd00cd ',
    ' #8b008b ',
    ' #da70d6 ',
    ' #ff83fa ',
    ' #ee7ae9 ',
    ' #cd69c9 ',
    ' #8b4789 ',
    ' #dda0dd ',
    ' #ffbbff ',
    ' #eeaeee ',
    ' #cd96cd ',
    ' #8b668b ',
    ' #ba55d3 ',
    ' #e066ff ',
    ' #d15fee ',
    ' #b452cd ',
    ' #7a378b ',
    ' #9932cc ',
    ' #bf3eff ',
    ' #b23aee ',
    ' #9a32cd ',
    ' #68228b ',
    ' #c71585 ',
    ' #ee82ee ',
    ' #9400d3 ',
    ' #8a2be2 ',
    ' #800080 ',
    ' #a020f0 ',
    ' #9b30ff ',
    ' #912cee ',
    ' #7d26cd ',
    ' #551a8b ',
    ' #9370db ',
    ' #ab82ff ',
    ' #9f79ee ',
    ' #8968cd ',
    ' #5d478b ',
    ' #d8bfd8 ',
    ' #ffe1ff ',
    ' #eed2ee ',
    ' #cdb5cd ',
    ' #8b7b8b ',
    ' #ddc488 ',
    ' #ffde66 ',
    ' #ecab53 ',
    ' #c0c0c0 ',
    ' #008080 ',
    ' #ffcc99 '
    ];
    