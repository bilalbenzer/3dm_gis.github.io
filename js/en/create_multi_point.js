

/* ÇOKLU NOKTA OBJESİNİN OLUŞTURULMA FONKSİYONU */
function multi_create_point(katman_name){
  document.getElementById("oznitelikpenceresi").innerHTML="";
  var name = katman_name
  document.getElementById('sayfamesajlari').style.backgroundColor  = "black";
  document.getElementById('sayfamesajlari').innerText="Multi Point Layer created\n"+name;//sayfa mesajlarında objenin oluştuğuna dair bilgi
  var koordinatilebuton = document.createElement("button")
  koordinatilebuton.innerText="Creating by Entering Coordinates"
  koordinatilebuton.onclick=function koordinatileolusturma(){
    document.getElementById('obje_girdi').style.backgroundColor = "black";
    var e_label = document.createElement("label")
    e_label.innerText="Enter Latitude."
    e_label.setAttribute("for","e_gir")
    var e_gir = document.createElement("input")
    e_gir.setAttribute("type","number")
    e_gir.setAttribute("id","e_gir")
    e_gir.setAttribute("min","0")
    e_gir.required=true
    var b_label = document.createElement("label")
    b_label.innerText="Enter Longitude."
    b_label.setAttribute("for","b_gir")
    var b_gir = document.createElement("input")
    b_gir.setAttribute("type","number")
    b_gir.setAttribute("id","b_gir")
    b_gir.setAttribute("min","0")
    b_gir.required=true
    var degeral =document.createElement("input")
    degeral.setAttribute("type","submit")
    degeral.innerText="Apply"
    degeral.onclick = function(){
      var x = document.getElementById("e_gir").value
      var y = document.getElementById("b_gir").value
      if (typeof window[name]!=="object"){
        var name2 = "point"+(new Date()).getMilliseconds()+Math.floor(Math.random()*1000);//benzersiz obje id alma
        window[name]= new multi_point(class_name=name); //alınan koordinat ve alınan rastgele obje adına göre çoklu point sınıfı oluşturulur
        window[name].objeler_ve_ozellikleri(x_coordinats=x,y_coordinats=y,object_name=name2)
        window[name].menuleriolustur()
        window[name].haritayaekle(window[name].tum_ozellikler.objeler["'"+name2+"'"].bicim,name2)
        var kapatbuton=document.createElement("button")
        kapatbuton.innerText="Finish"
        document.getElementById('sayfamesajlari').innerHTML=""
        document.getElementById('sayfamesajlari').innerText=name2+" object created \n"+"Lat="+x+"   "+"Long="+y+"\n";//sayfa mesajlarında objenin oluştuğuna dair bilgi

      }
      else if ((typeof window[name])=="object" && (window[name].tum_ozellikler.objeler_ve_id_nolari.length > 0)) {  //class yani katmana 1den fazla nokta eklenecekse bu blok devreye girecek
        document.getElementById("vektor").open = true //vektor penceresi açık olacak
        document.getElementById('sayfamesajlari').style.backgroundColor  = "black"; 
        var name2 = "point"+(new Date()).getMilliseconds()+Math.floor(Math.random()*1000);//benzersiz obje id alma  //obje için id alınacak
        if (window[name].tum_ozellikler.objeler_ve_id_nolari.includes(name2)===true){ //bu id eğer mevcutsa tekrar denenmesi istenecek
            alert("tekrar deneyiniz")}
        else{
          window[name].objeler_ve_ozellikleri(x_coordinats=x,y_coordinats=y,object_name=name2)  //obje id si uygun ise obje oluşturulacak
          window[name].haritayaekle(window[name].tum_ozellikler.objeler["'"+name2+"'"].bicim,name2) // oluştuurlan obje haritaya eklenecek
          document.getElementById('sayfamesajlari').innerHTML=""
          document.getElementById('sayfamesajlari').innerText=name2+"object created \n"+"Lat="+x+"   "+"Long="+y+"\n";//sayfa mesajlarında objenin oluştuğuna dair bilgi
        }
        }
      else{
          alert("There Is An Object With This Id.");
          map.off("click")   //katman adı eğer daha önce tanımlanmış ise uyarı verilecek
          var asd = "createmultipoint"
          return create_layer_name(asd)
          //katman adı eğer daha önce tanımlanmış ise uyarı verilecek
             }
      document.getElementById('obje_girdi').innerHTML=""
      return koordinatileolusturma()
    }
    var kapatbuton=document.createElement("button")
    kapatbuton.innerText="Finish"
    kapatbuton.onclick=async function(){
      document.getElementById('obje_girdi').innerHTML=""
      map.off("click")
      await sleep(500)
      bekleme()
      return
    }
    document.getElementById('sayfamesajlari').appendChild(kapatbuton)
    document.getElementById('obje_girdi').appendChild(e_label)
    document.getElementById('obje_girdi').appendChild(e_gir)
    document.getElementById('obje_girdi').appendChild(document.createElement("br"))
    document.getElementById('obje_girdi').appendChild(b_label)
    document.getElementById('obje_girdi').appendChild(b_gir)
    document.getElementById('obje_girdi').appendChild(document.createElement("br"))
    document.getElementById('obje_girdi').appendChild(degeral)
    map.off('click'); //haritadaki tıklama olayı kapatılacak
    }
  document.getElementById('sayfamesajlari').appendChild(document.createElement("br"))
  document.getElementById('sayfamesajlari').appendChild(koordinatilebuton)
  //harita üzerinde tıklama olayı ile koordinat almanın etkinleştirilmesi
  map.on('click', (e)=>{
  x = (e.latlng.lat).toFixed(8);
  y = (e.latlng.lng).toFixed(8);
  // oluşturulacak point için benzersiz bir id üretilir ve daha önceden bu id verilmiş mi kontrol edilir
    if ((typeof window[name])!=="object"){  //id in daha önceden var olup olmadığının kontrolü
        document.getElementById("vektor").open = true //katman penceresi sürekli açık olacak
        document.getElementById('sayfamesajlari').style.backgroundColor  = "black"; 
        var name2 = "point"+(new Date()).getMilliseconds()+Math.floor(Math.random()*1000);//benzersiz obje id alma
        window[name]= new multi_point(class_name=name); //alınan koordinat ve alınan rastgele obje adına göre çoklu point sınıfı oluşturulur
        window[name].objeler_ve_ozellikleri(x_coordinats=x,y_coordinats=y,object_name=name2)
        window[name].menuleriolustur()
        window[name].haritayaekle(window[name].tum_ozellikler.objeler["'"+name2+"'"].bicim,name2)
        document.getElementById('sayfamesajlari').innerText=name2+" object created \n"+"Lat="+x+"   "+"Long="+y+"\n";//sayfa mesajlarında objenin oluştuğuna dair bilgi
        var kapatbuton=document.createElement("button")
        kapatbuton.innerText="Finish"
        kapatbuton.onclick=async function(){
          map.off("click")
          await sleep(500)
          bekleme()
          return
        }
        document.getElementById('sayfamesajlari').appendChild(kapatbuton)
        //window[name].menuleriolustur()
        //window[name].haritayaekle(window[name].object_stil[window[name2].bicim])
      }
    else if ((typeof window[name])=="object" && (window[name].tum_ozellikler.objeler_ve_id_nolari.length > 0)) {  //class yani katmana 1den fazla nokta eklenecekse bu blok devreye girecek
      document.getElementById("vektor").open = true //vektor penceresi açık olacak
      document.getElementById('sayfamesajlari').style.backgroundColor  = "black"; 
      var name2 = "point"+(new Date()).getMilliseconds()+Math.floor(Math.random()*1000);//benzersiz obje id alma  //obje için id alınacak
      if (window[name].tum_ozellikler.objeler_ve_id_nolari.includes(name2)===true){ //bu id eğer mevcutsa tekrar denenmesi istenecek
          alert("tekrar deneyiniz")}
      else{
        window[name].objeler_ve_ozellikleri(x_coordinats=x,y_coordinats=y,object_name=name2)  //obje id si uygun ise obje oluşturulacak
        window[name].haritayaekle(window[name].tum_ozellikler.objeler["'"+name2+"'"].bicim,name2) // oluştuurlan obje haritaya eklenecek
        document.getElementById('sayfamesajlari').innerText=name2+" object created \n"+"Lat="+x+"   "+"Long="+y+"\n";//sayfa mesajlarında objenin oluştuğuna dair bilgi
        var kapatbuton=document.createElement("button")
        kapatbuton.innerText="Finish"
        kapatbuton.onclick=async function(){
          map.off("click")
          await sleep(500)
          bekleme()
          return
        }
        document.getElementById('sayfamesajlari').appendChild(kapatbuton)
      }
      }
    else{
      alert("There Is An Object With This Id.");
      map.off("click")   //katman adı eğer daha önce tanımlanmış ise uyarı verilecek
      var asd = "createmultipoint"
      return create_layer_name(asd)
         }});
}
/* ÇOKLU POİNT OBJESİNE AİT TÜM İŞLEVLERİN VE BİLGİLERİN TUTULDUĞU CLASS */

class multi_point {
  constructor(class_name){ //constructor kısmında multi point classına ait boş listeler ve objeler oluşturulacak
      this.tum_ozellikler = { //çoklu pointe ilişkin tüm özellikler bu objede tutulacak
        "id_nosu":class_name, //class a ait isim bu dizede tutulacak
        "objeler":{ //oluşturulan objeler ve özellikleri bu dizede tutulacak
        },
        "objeler_ve_id_nolari":[],  //oluşan objelerin id noları bu listede tutulacak
        "featuregroup":L.featureGroup().addTo(map), //tüm objeler bir grupta olacak ve bu grup haritaya eklencek
        "kolon_ve_tipleri":{"featureid" : "text",
                            "Geometry Type" : "text",},
        "coordinats":[],  //yaklaşma işlevi için koordinatlar bu listede tutulacak
      }
        this.renk = renk_listesi[Math.floor(Math.random()*renk_listesi.length)]
    }
    /*  OBJE OLUŞTURULURKEN BU FONKSİYONA OBJE BİLGİLERİ ÇAĞIRILIR VE OBJENİN BİLGİLERİ AKTARILIR */
  objeler_ve_ozellikleri(x_coordinats,y_coordinats,object_name){  //çoklu point oluşturma kısmında oluşturulacak pointe ilişkin parametreler bu metotta işlenecek ve class a eklenecek
    this.tum_ozellikler.objeler_ve_id_nolari.push(object_name.toString()) //obje id si ilgili yerine eklenecek
    this.tum_ozellikler.objeler["'"+object_name+"'"] ={geometrioznitelik:{  //eklenen objenin id nosu ile bir dize oluşturulacak ve tüm özellikleri eklenecek
      "type":"Feature",
      "properties": {
                      "featureid" : object_name,
                      "Geometry Type" : "Point",
                      },
      "geometry":   {
                      "type":"Point",
                      "coordinates":[y_coordinats,x_coordinats]
                    }
    },
                                                      bicim:{
                                                        bicim:{radius: 8,
                                                          fillColor: this.renk, //her oluşan obje bu algoritma ile rastgele bir renk alır
                                                          color: "#000",  //dış çizginin renki
                                                          weight: 1,  //dış çizginin kalınlığı
                                                          opacity: 3, //dış çizginin opaklığı
                                                          fillOpacity: 0.8},

                                                          ikon:{ //objenin sembol ayarları bu nesneye gider
                                                            iconUrl:null,
                                                            iconSize:[50,50],
                                                          },
                                                          gecerli_bicim:"nokta"
                                                      },
                                                      feature:null
                                                      }
                                                      return
  }
  menuleriolustur(){ // katmana ilişkin menü kısmı ve elemanları oluştuurlacak
    this.details_katman =document.createElement("details");
    this.details_katman.setAttribute("id",this.tum_ozellikler.id_nosu);
    this.details_katman.setAttribute("name",this.tum_ozellikler.id_nosu);
    this.summary_katman = document.createElement("summary");
    this.summary_katman.setAttribute("id",this.tum_ozellikler.id_nosu+"_summary");
    document.getElementById("layers_vektor").appendChild(this.details_katman);
    document.getElementById(this.tum_ozellikler.id_nosu).innerHTML='<button class="haritadagosterme" type="menu" >Show </button><button class="haritadagizleme" type="menu" >Hide</button><button class="sil" type="menu">Delete</button><button class="duzenle" type="menu">Edit</button><button class="yaklasma" type="menu" >Zoom</button><button class="stildegistir" type="menu" >Change Sytle</button><button class="oznitelikbilgi" type="menu" >Attributes</button>';
    document.getElementById(this.tum_ozellikler.id_nosu).appendChild(this.summary_katman);
    document.getElementById(this.tum_ozellikler.id_nosu+"_summary").innerText=this.tum_ozellikler.id_nosu;
    document.getElementById(this.tum_ozellikler.id_nosu+"_summary").style.listStyle="none";
    document.getElementById(this.tum_ozellikler.id_nosu+"_summary").style.fontSize="medium";
    document.getElementById(this.tum_ozellikler.id_nosu+"_summary").style.fontWeight="bolder";
    document.getElementById(this.tum_ozellikler.id_nosu+"_summary").style.color="black";
    document.getElementById(this.tum_ozellikler.id_nosu+"_summary").style.fontFamily="'Courier New', Courier, monospace";
    document.getElementById(this.tum_ozellikler.id_nosu+"_summary").style.cursor="pointer";
    document.getElementById(this.tum_ozellikler.id_nosu+"_summary").style.listStyle="none";
    document.getElementById(this.tum_ozellikler.id_nosu+"_summary").style.borderStyle="solid";
    document.getElementById(this.tum_ozellikler.id_nosu+"_summary").style.backgroundColor=this.renk;
    document.getElementById(this.tum_ozellikler.id_nosu+"_summary").style.borderColor="white";
    //butonlar ve kullanılacakları işlevler
    
    document.getElementById(this.tum_ozellikler.id_nosu).getElementsByTagName("button")[0].setAttribute('onclick',"window['"+this.tum_ozellikler.id_nosu+"'].objeyiyenile()");
    document.getElementById(this.tum_ozellikler.id_nosu).getElementsByTagName("button")[1].setAttribute('onclick',"window['"+this.tum_ozellikler.id_nosu+"'].haritadagizle()");
    document.getElementById(this.tum_ozellikler.id_nosu).getElementsByTagName("button")[2].setAttribute('onclick',"katman_sil('"+this.tum_ozellikler.id_nosu+"')");
    document.getElementById(this.tum_ozellikler.id_nosu).getElementsByTagName("button")[3].setAttribute('onclick',"window['"+this.tum_ozellikler.id_nosu+"'].katmanduzenle('"+this.tum_ozellikler.id_nosu+"')");
    document.getElementById(this.tum_ozellikler.id_nosu).getElementsByTagName("button")[4].setAttribute('onclick',"window['"+this.tum_ozellikler.id_nosu+"'].objeyeyaklas()");
    document.getElementById(this.tum_ozellikler.id_nosu).getElementsByTagName("button")[5].setAttribute('onclick',"window['"+this.tum_ozellikler.id_nosu+"'].stildegistirme()");
    document.getElementById(this.tum_ozellikler.id_nosu).getElementsByTagName("button")[6].setAttribute('onclick',"window['"+this.tum_ozellikler.id_nosu+"'].oznitelikgoruntulemeveduzenleme()");
    return}

  haritayaekle(object_bicim,object_id){  // oluşan obje özelikleri parametrelerle bu metota verilecek ve featuregroupa layer olarak eklenecek
                                        //obje id si map_layers listesine eklenecek
                                        //obje fature objesi map_layers_id_nolari listesine eklenecek

    this.tum_ozellikler.objeler["'"+object_id+"'"].feature = L.geoJSON(this.tum_ozellikler.objeler["'"+object_id+"'"].geometrioznitelik,{
      pointToLayer:function(feature,latlng){                              //objeye ait layerin oluşması
        return L.circleMarker(latlng,object_bicim.bicim)
      } 
    })
    this.tum_ozellikler.objeler["'"+object_id+"'"]["feature"] = this.tum_ozellikler.objeler["'"+object_id+"'"].feature //oluşan layer, classtaki dizesine verilecek
    this.tum_ozellikler.objeler["'"+object_id+"'"].feature.addTo(this.tum_ozellikler.featuregroup) //oluşan layer, featuregroupa eklenerek haritaya eklenecek
    map_layers.push(this.tum_ozellikler.featuregroup.getLayerId(this.tum_ozellikler.objeler["'"+object_id+"'"].feature)) //obje id si map_layers listesine eklenecek
    this.tum_ozellikler.objeler["'"+object_id+"'"]["featureid"]=this.tum_ozellikler.featuregroup.getLayerId(this.tum_ozellikler.objeler["'"+object_id+"'"].feature)
    this.tum_ozellikler.coordinats.push([this.tum_ozellikler.objeler["'"+object_id+"'"].feature._layers[this.tum_ozellikler.featuregroup.getLayerId(this.tum_ozellikler.objeler["'"+object_id+"'"].feature)-1]._latlng.lat,//objeye ait koordinatlar, class taki coordinates listesine eklenecek
    this.tum_ozellikler.objeler["'"+object_id+"'"].feature._layers[this.tum_ozellikler.featuregroup.getLayerId(this.tum_ozellikler.objeler["'"+object_id+"'"].feature)-1]._latlng.lng])  //objeye ait koordinatlar, class taki coordinates listesine eklenecek
    if (map_layers_id_nolari.includes(window[this.tum_ozellikler.id_nosu])===false){  //class ın tüm özellikleri map_layers_id_nolari na iletilecek
      map_layers_id_nolari.push(window[this.tum_ozellikler.id_nosu])
    }return
  }
  objeyiyenile(){ //bazı durumlarda objelerde değişiklik yaplabilmesi için obje haritadan kaldırılıp tekrar eklenecek
    
    window[this.tum_ozellikler.id_nosu].haritadagizle() //obje haritadan gizlenecek (kaldırılacak)-obje id leri map_layersdan kaldırılacak-class objesi map_layers_id den kaldırılacak
    this.tum_ozellikler.featuregroup.addTo(map) //obje tekrar eklenecek
    var c = Object.keys(this.tum_ozellikler.featuregroup._layers) //layerların id nolari alınacak ve map_layers a tekrar eklenecek
    for (var x in c){
      map_layers.push(parseInt(c[x]))
    }
    if (map_layers_id_nolari.includes(window[this.tum_ozellikler.id_nosu])===false){  //class objesi tekrar map_layers_id_nolarina eklenecek
      map_layers_id_nolari.push(window[this.tum_ozellikler.id_nosu])
    }
    return}
  haritadagizle(){  //obje haritadan kaldırılacak
    map.removeLayer(this.tum_ozellikler.featuregroup) //obje haritadan kaldırılacak
    var c = Object.keys(this.tum_ozellikler.featuregroup._layers) //layerların id nolari alınacak
    for (var x in c){
      if (map_layers.includes(parseInt(c[x]))===true){
        var sd = parseInt(c[x])
        map_layers.splice(map_layers.indexOf(sd),1) //layer id leri map_layers dan kaldırılacak
      }
      if (map_layers_id_nolari.includes(window[this.tum_ozellikler.id_nosu])===true){
        map_layers_id_nolari.splice(map_layers_id_nolari.indexOf(window[this.tum_ozellikler.id_nosu]),1)  //class objesi map_layers_id_nolari ndan kaldırılacak
      }
    }
    return}
  haritadansil(){ //obje tamamen silinecek
    window[this.tum_ozellikler.id_nosu].haritadagizle()
    return}

  objeyeyaklas(){ //haritada katmana yaklaşmak için metot
    var koordint_sayisi = this.tum_ozellikler.coordinats.length
    var coordinatlar = []
    for (var l in range(0,koordint_sayisi-1)){
      coordinatlar.push(L.latLng(this.tum_ozellikler.coordinats[l][0],this.tum_ozellikler.coordinats[l][1]))
    }
    var bounds = L.latLngBounds(coordinatlar)
    if (this.tum_ozellikler.coordinats.length===1){ //eğer tek nokta varsa bu blok kullanılarak yaklaşılır
        map.flyTo([this.tum_ozellikler.coordinats[0][0], this.tum_ozellikler.coordinats[0][1]],15,{
          animate:true
        })
        tilelayer_yenile(gecerli_tilelayer)
        window[this.tum_ozellikler.id_nosu].objeyiyenile()
    }
    else{ //birden fazla obje varsa hepsine yaklaşır
      map.flyToBounds(bounds,9,{
        animate:true
      })
      window[this.tum_ozellikler.id_nosu].objeyiyenile()
      tilelayer_yenile(gecerli_tilelayer)
    }
    return}
  seciliobjeyeyaklas(object_name){
    map.flyTo([this.tum_ozellikler.objeler["'"+object_name+"'"].geometrioznitelik.properties["X Koordinatı (Enlem)"],this.tum_ozellikler.objeler["'"+object_name+"'"].geometrioznitelik.properties["Y Koordinatı (Boylam)"]],15,{
      animate:false
    })
    tilelayer_yenile(gecerli_tilelayer)
    window[this.tum_ozellikler.id_nosu].objeyiyenile()
    
    return}
  katmanduzenle(x){ //katmanda düzenleme işlemleri için metot. haritada click olayı açılarak obje seçilir. seçilen obje açık mavi renk alır ve işlemlere başlanır
    document.getElementById("sayfamesajlari").innerText="You Can Select The Objects You Want To Edit On The Map By Clicking On The Map.\nPlease Select 1 Object For Moving Operation.\nDeletion Operation Can Be Performed As Mass Changes\nPress 'N' Key To End Selection Process."
    document.getElementById('sayfamesajlari').style.backgroundColor = "black";
    var object_id_ve_renk = {}
    var noktaekleme = document.createElement("button")
    noktaekleme.innerText="Add"
    noktaekleme.onclick=function(){
      var sayfamesajlari=document.getElementById("sayfamesajlari")
      sayfamesajlari.innerText="You can add a point by clicking where you want to add."
      var koordinatile=document.createElement("button")
        koordinatile.innerText="Add By Coordinate"
        koordinatile.onclick=function (){
            document.getElementById('obje_girdi').style.backgroundColor = "black";
            var e_label = document.createElement("label")
            e_label.innerText="Enter Latitude."
            e_label.setAttribute("for","e_gir")
            var e_gir = document.createElement("input")
            e_gir.setAttribute("type","number")
            e_gir.setAttribute("id","e_gir")
            e_gir.setAttribute("min","0")
            e_gir.required=true
            var b_label = document.createElement("label")
            b_label.innerText="Enter Longitude."
            b_label.setAttribute("for","b_gir")
            var b_gir = document.createElement("input")
            b_gir.setAttribute("type","number")
            b_gir.setAttribute("id","b_gir")
            b_gir.setAttribute("min","0")
            b_gir.required=true
            var degeral =document.createElement("input")
            degeral.setAttribute("type","submit")
            degeral.innerText="Apply"
            degeral.onclick = function(){
              var xx = document.getElementById("e_gir").value
              var yy = document.getElementById("b_gir").value
                var name2 = "point"+(new Date()).getMilliseconds()+Math.floor(Math.random()*1000);//benzersiz obje id alma
                window[x].objeler_ve_ozellikleri(x_coordinats=xx,y_coordinats=yy,object_name=name2)
                window[x].haritayaekle(window[x].tum_ozellikler.objeler["'"+name2+"'"].bicim,name2)
                document.getElementById('sayfamesajlari').innerHTML=""
                document.getElementById('sayfamesajlari').innerText=name2+" object created \n"+"Lat="+x+"   "+"Lng="+y+"\n";//sayfa mesajlarında objenin oluştuğuna dair bilgi
            }
            var kapatbuton=document.createElement("button")
            kapatbuton.innerText="Finish"
            kapatbuton.onclick=function(){
              document.getElementById('obje_girdi').innerHTML=""
              map.off("click")
              bekleme()
              return
            }
            document.getElementById('obje_girdi').appendChild(e_label)
            document.getElementById('obje_girdi').appendChild(e_gir)
            document.getElementById('obje_girdi').appendChild(document.createElement("br"))
            document.getElementById('obje_girdi').appendChild(b_label)
            document.getElementById('obje_girdi').appendChild(b_gir)
            document.getElementById('obje_girdi').appendChild(document.createElement("br"))
            document.getElementById('obje_girdi').appendChild(degeral)
            document.getElementById('obje_girdi').appendChild(kapatbuton)
            map.off('click'); //haritadaki tıklama olayı kapatılacak
            
        }
        document.getElementById('sayfamesajlari').appendChild(document.createElement("br"))
        document.getElementById('sayfamesajlari').appendChild(koordinatile)
      map.on("click",(e)=>{
        var xx = (e.latlng.lat).toFixed(8);
        var yy = (e.latlng.lng).toFixed(8);
        var name2 = "point"+(new Date()).getMilliseconds()+Math.floor(Math.random()*1000)
        window[x].objeler_ve_ozellikleri(x_coordinats=xx,y_coordinats=yy,object_name=name2)  //obje id si uygun ise obje oluşturulacak
        window[x].haritayaekle(window[x].tum_ozellikler.objeler["'"+name2+"'"].bicim,name2) // oluştuurlan obje haritaya eklenecek
        document.getElementById('sayfamesajlari').innerText=name2+" object created \n"+"Lat="+x+"   "+"Lng="+y+"\n";//sayfa mesajlarında objenin oluştuğuna dair bilgi
        var kapatbuton=document.createElement("button")
        kapatbuton.innerText="Finish"
        kapatbuton.onclick=async function(){
          map.off("click")
          await sleep(500)
          bekleme()
          return
        }
        document.getElementById('sayfamesajlari').appendChild(kapatbuton)
        var koordinatile=document.createElement("button")
        koordinatile.innerText="Add By Coordinate"
        koordinatile.onclick=function koordinatileolusturma(){
            document.getElementById('obje_girdi').style.backgroundColor = "black";
            var e_label = document.createElement("label")
            e_label.innerText="Enter Latitude."
            e_label.setAttribute("for","e_gir")
            var e_gir = document.createElement("input")
            e_gir.setAttribute("type","number")
            e_gir.setAttribute("id","e_gir")
            e_gir.setAttribute("min","0")
            e_gir.required=true
            var b_label = document.createElement("label")
            b_label.innerText="Enter Longitude."
            b_label.setAttribute("for","b_gir")
            var b_gir = document.createElement("input")
            b_gir.setAttribute("type","number")
            b_gir.setAttribute("id","b_gir")
            b_gir.setAttribute("min","0")
            b_gir.required=true
            var degeral =document.createElement("input")
            degeral.setAttribute("type","submit")
            degeral.innerText="Apply"
            degeral.onclick = function(){
              var xx = document.getElementById("e_gir").value
              var yy = document.getElementById("b_gir").value
                var name2 = "point"+(new Date()).getMilliseconds()+Math.floor(Math.random()*1000);//benzersiz obje id alma
                window[x]= new multi_point(class_name=x); //alınan koordinat ve alınan rastgele obje adına göre çoklu point sınıfı oluşturulur
                window[x].objeler_ve_ozellikleri(x_coordinats=xx,y_coordinats=yy,object_name=name2)
                window[x].menuleriolustur()
                window[x].haritayaekle(window[x].tum_ozellikler.objeler["'"+name2+"'"].bicim,name2)
                document.getElementById('sayfamesajlari').innerHTML=""
                var kapatbutonn=document.createElement("button")
                kapatbutonn.innerText="Finish"
                kapatbutonn.onclick=function(){
                  document.getElementById('obje_girdi').innerHTML=""
                  map.off("click")
                  bekleme()
                  return
                }
                document.getElementById('sayfamesajlari').innerText=name2+"  object created \n"+"Lat="+xx+"   "+"Lng="+yy+"\n"+kapatbutonn;//sayfa mesajlarında objenin oluştuğuna dair bilgi


            }

            
            document.getElementById('obje_girdi').appendChild(e_label)
            document.getElementById('obje_girdi').appendChild(e_gir)
            document.getElementById('obje_girdi').appendChild(document.createElement("br"))
            document.getElementById('obje_girdi').appendChild(b_label)
            document.getElementById('obje_girdi').appendChild(b_gir)
            document.getElementById('obje_girdi').appendChild(document.createElement("br"))
            document.getElementById('obje_girdi').appendChild(degeral)
            map.off('click'); //haritadaki tıklama olayı kapatılacak
            
        }
        sayfamesajlari.appendChild(koordinatile)
      })
    }
    document.getElementById("sayfamesajlari").appendChild(document.createElement("br"))
    document.getElementById("sayfamesajlari").appendChild(noktaekleme)
    var kapatbuton = document.createElement("button")
    kapatbuton.innerText="Finish"
    kapatbuton.onclick = function(){
      if (Object.keys(object_id_ve_renk)[0] !== undefined){
        for (var i in Object.keys(object_id_ve_renk)){
          var object_id=Object.keys(object_id_ve_renk)[i]
          var eski_renk = object_id_ve_renk[object_id].renk
          window[x].tum_ozellikler.objeler["'"+object_id+"'"].bicim.bicim.fillColor =eski_renk
          window[x].tum_ozellikler.objeler["'"+object_id+"'"]["feature"]= L.geoJSON(window[x].tum_ozellikler.objeler["'"+object_id+"'"].geometrioznitelik,{
            pointToLayer:function(feature,latlng){
              return L.circleMarker(latlng,window[x].tum_ozellikler.objeler["'"+object_id+"'"].bicim.bicim) //seçilen obje yeni rengiyle tekrar eklenir
            }
          }).addTo(window[x].tum_ozellikler.featuregroup)
        }
        document.getElementById("sayfamesajlari").innerHTML=""
        object_id_ve_renk=undefined
        return
      }
      else{
        document.getElementById("sayfamesajlari").innerHTML=""
        return
      }
    }
    document.getElementById("sayfamesajlari").appendChild(kapatbuton)
    this.tum_ozellikler.featuregroup.on('click',function(e){
        //seçme işlemi için featuregroup objesinde click işlevi açılır
      object_id_ve_renk[e.layer.feature.properties.featureid] = {"renk":window[x].tum_ozellikler.objeler["'"+e.layer.feature.properties.featureid+"'"].bicim.bicim.fillColor,
                                                                  "id":parseInt(Object.keys(e.layer._eventParents))}   //seçilen layerın id nosu alınır
  //seçilen layerın mevcut rengi alınır
      window[x].tum_ozellikler.featuregroup.removeLayer(window[x].tum_ozellikler.objeler["'"+e.layer.feature.properties.featureid+"'"]["feature"]) //seçilen obje kaldırılır
      window[x].tum_ozellikler.objeler["'"+e.layer.feature.properties.featureid+"'"].bicim.bicim.fillColor =  "#56ffff"  //seçilen objeye seçi mrengi verilir
      window[x].tum_ozellikler.objeler["'"+e.layer.feature.properties.featureid+"'"]["feature"]= L.geoJSON(window[x].tum_ozellikler.objeler["'"+e.layer.feature.properties.featureid+"'"].geometrioznitelik,{
        pointToLayer:function(feature,latlng){
          return L.circleMarker(latlng,window[x].tum_ozellikler.objeler["'"+e.layer.feature.properties.featureid+"'"].bicim.bicim) //seçilen obje yeni rengiyle tekrar eklenir
        }
      }).addTo(window[x].tum_ozellikler.featuregroup)

      //document.getElementById("sayfamesajlari").innerText=e.layer.feature.properties.featureid+" Objesi Şuanda Seçili"
      //window[x].objeduzenle(object_id_ve_renk[e.layer.feature.properties.featureid].renk,e.layer.feature.properties.featureid)
    })
    var secimibitirbuton = document.createElement("button")
    secimibitirbuton.innerText="Finish Selection"
    secimibitirbuton.onclick=function(){
      window[x].tum_ozellikler.featuregroup.off("click")
      var secilen_objeler = ""
      for (var c in Object.keys(object_id_ve_renk)){
       secilen_objeler +=  Object.keys(object_id_ve_renk)[c] +"\n"
      }
    window[x].objeduzenle(object_id_ve_renk,secilen_objeler,x)
    }
    document.getElementById("sayfamesajlari").appendChild(secimibitirbuton)
    return}
  /* SEÇİLEN OBJELERİN SİLİNMESİ, DÜZENLENMESİ, TAŞINMASINA İLİŞKİN FONKSİYON */
  objeduzenle(object_id_ve_renk,secilen_objeler,x){
    this.tum_ozellikler.featuregroup.off('click')
    var buton1 = document.createElement("button")
    buton1.innerText="Move"
    var buton2 = document.createElement("button")
    buton2.innerText="Delete"
    var metin = document.createElement("p")
    metin.innerText="Selection Process Ended. Selected Objects:\n"+secilen_objeler
    var islemiptal = document.createElement("button")
    islemiptal.innerText="Finish"
    islemiptal.onclick=function(){
      if (Object.keys(object_id_ve_renk)[0] !== undefined){
        for (var i in Object.keys(object_id_ve_renk)){
          var object_id=Object.keys(object_id_ve_renk)[i]
          var eski_renk = object_id_ve_renk[object_id].renk
          window[x].tum_ozellikler.objeler["'"+object_id+"'"].bicim.bicim.fillColor =eski_renk
          window[x].tum_ozellikler.objeler["'"+object_id+"'"]["feature"]= L.geoJSON(window[x].tum_ozellikler.objeler["'"+object_id+"'"].geometrioznitelik,{
            pointToLayer:function(feature,latlng){
              return L.circleMarker(latlng,window[x].tum_ozellikler.objeler["'"+object_id+"'"].bicim.bicim) //seçilen obje yeni rengiyle tekrar eklenir
            }
          }).addTo(window[x].tum_ozellikler.featuregroup)
        }
        document.getElementById("sayfamesajlari").innerHTML=""
        object_id_ve_renk=undefined
        return
      }
      else{
        document.getElementById("sayfamesajlari").innerHTML=""
      }
    }
    if (Object.keys(object_id_ve_renk).length===1){
      document.getElementById("sayfamesajlari").innerHTML=""
      buton1.onclick = function(){
        window[x].objetasi(object_id_ve_renk,x)
        return
      }
      buton2.onclick = function(){
        window[x].objesil(object_id_ve_renk)
        return
      }
      document.getElementById("sayfamesajlari").appendChild(document.createElement("br"))
      document.getElementById("sayfamesajlari").appendChild(buton1)
      document.getElementById("sayfamesajlari").appendChild(buton2)
      document.getElementById("sayfamesajlari").appendChild(document.createElement("br"))
      document.getElementById("sayfamesajlari").appendChild(metin)
      document.getElementById("sayfamesajlari").appendChild(islemiptal)
    }

    else if(Object.keys(object_id_ve_renk).length>1){
      document.getElementById("sayfamesajlari").innerHTML=""
      buton2.onclick = function(){
        window[x].objesil(object_id_ve_renk)
        return
      }
      document.getElementById("sayfamesajlari").appendChild(document.createElement("br"))
      document.getElementById("sayfamesajlari").appendChild(buton2)
      document.getElementById("sayfamesajlari").appendChild(document.createElement("br"))
      document.getElementById("sayfamesajlari").appendChild(metin)
      document.getElementById("sayfamesajlari").appendChild(islemiptal)
    }
    else{
      alert("No Objects Selected.")
    }
    return
  }
  /* SEÇİLEN OBJENİN SİLİNMESİ İÇİN FONKSİYON */
  objesil(object_id_ve_renk){
    var secilen_objeler = Object.keys(object_id_ve_renk)
    var objeler_yazi = ""
    for (var j in secilen_objeler){
        objeler_yazi+=secilen_objeler[j]+"\n"
        var eski_x = this.tum_ozellikler.objeler["'"+secilen_objeler[j]+"'"].geometrioznitelik.geometry.coordinates[1]
        var eski_y = this.tum_ozellikler.objeler["'"+secilen_objeler[j]+"'"].geometrioznitelik.geometry.coordinates[0]
        console.log(eski_x,eski_y)
        map_layers.splice(map_layers.indexOf(this.tum_ozellikler.objeler["'"+secilen_objeler[j]+"'"].featureid),1)
        this.tum_ozellikler.objeler_ve_id_nolari.splice((this.tum_ozellikler.objeler_ve_id_nolari.indexOf(secilen_objeler[j])),1)
        this.tum_ozellikler.featuregroup.removeLayer(this.tum_ozellikler.objeler["'"+secilen_objeler[j]+"'"].feature)
          for (var c in this.tum_ozellikler.coordinats){
            if (this.tum_ozellikler.coordinats[c].includes(eski_x)===true && this.tum_ozellikler.coordinats[c].includes(eski_y)===true){
                this.tum_ozellikler.coordinats.splice(this.tum_ozellikler.coordinats[c],1)
            }
            }
        this.tum_ozellikler.objeler["'"+secilen_objeler[j]+"'"] = null
        delete this.tum_ozellikler.objeler["'"+secilen_objeler[j]+"'"]
    
    }
    objeler_yazi+=" Successfully Deleted."
    document.getElementById("sayfamesajlari").innerText = objeler_yazi
    bekleme()
    return
  }
  /* SEÇİLEN OBJENİN TAŞINAMSINA İLİŞKİN FONKSİYON */
   objetasi(object_id_ve_renk,class_id){
    var z = object_id_ve_renk
    this.tum_ozellikler.featuregroup.removeLayer(this.tum_ozellikler.objeler["'"+Object.keys(z)[0]+"'"].feature)
    document.getElementById("sayfamesajlari").innerText="Transport Process Started.Drag and Click the Mouse Cursor to Where You Want to Move.\nPress the 'Home' Key to Perform the Move by Entering Coordinates."
    map.addEventListener('mousemove' ,async function tasima(tasi){
      var x = (tasi.latlng.lat).toFixed(8)
      var y=(tasi.latlng.lng).toFixed(8)
      var object_id = Object.keys(z)[0]
      window[class_id].tum_ozellikler.objeler["'"+object_id+"'"].geometrioznitelik.geometry.coordinates = [parseFloat(y),parseFloat(x)]

      var asd = L.geoJSON(window[class_id].tum_ozellikler.objeler["'"+object_id+"'"].geometrioznitelik,{
        pointToLayer:function(feature,latlng){                              //objeye ait layerin oluşması
          return L.circleMarker(latlng,window[class_id].tum_ozellikler.objeler["'"+object_id+"'"].bicim.bicim)
        } 
      }).addTo(window[class_id].tum_ozellikler.featuregroup)
      await sleep(100)
      window[class_id].tum_ozellikler.featuregroup.removeLayer(asd)
      map.on('click',function tiktik(birak){
        map.off('click')
        
        var x1 = (birak.latlng.lat).toFixed(8)
        var y1 = (birak.latlng.lng).toFixed(8)
        var object_id2=Object.keys(z)[0]
        var eski_renk= object_id_ve_renk[Object.keys(object_id_ve_renk)[0]].renk
        var eski_x=window[class_id].tum_ozellikler.objeler["'"+object_id2+"'"].geometrioznitelik.geometry.coordinates[1]
        var eski_y=window[class_id].tum_ozellikler.objeler["'"+object_id2+"'"].geometrioznitelik.geometry.coordinates[0]
        for (var c in window[class_id].tum_ozellikler.coordinats){
          if (window[class_id].tum_ozellikler.coordinats[c].includes(eski_x)===true && window[class_id].tum_ozellikler.coordinats[c].includes(eski_y)===true){
            window[class_id].tum_ozellikler.coordinats[c][0]= parseFloat(x1)
            window[class_id].tum_ozellikler.coordinats[c][1]=parseFloat(y1)
          }
          }
        window[class_id].tum_ozellikler.objeler["'"+object_id2+"'"].bicim.bicim.fillColor=eski_renk
        window[class_id].tum_ozellikler.objeler["'"+object_id2+"'"].geometrioznitelik.geometry.coordinates = [parseFloat(y1),parseFloat(x1)]
  
        window[class_id].tum_ozellikler.objeler["'"+object_id2+"'"].feature= L.geoJSON(window[class_id].tum_ozellikler.objeler["'"+object_id2+"'"].geometrioznitelik,{
          pointToLayer:function(feature,latlng){                              //objeye ait layerin oluşması
            return L.circleMarker(latlng,window[class_id].tum_ozellikler.objeler["'"+object_id2+"'"].bicim.bicim)
          } 
        }).addTo(window[class_id].tum_ozellikler.featuregroup)
      document.getElementById("sayfamesajlari").innerText="\n"+object_id2 + " Object  Successfully Moved To Coordinate "+x1+"---"+y1+".\n"+bekleme()+map.removeEventListener('mousemove',tasima)
      window[class_id].objeyiyenile()
      })
    })

    document.addEventListener('keydown', function koordinatal_event(event)  {
      if(event.key==="Home"){
        map.off('click')
        window[class_id].objeyitasi_koordinatile(object_id_ve_renk,class_id)
        document.removeEventListener('keydown',koordinatal_event)
      }
      else{
      }
      })
      return
  }
  /* SEÇİLEN OBJENİN MANUEL GİRİLEN KOORDİNATA TAŞINMASI */
  objeyitasi_koordinatile(object_id_ve_renk,class_id){
    document.getElementById("sayfamesajlari").innerText="Manual Coordinate Entry Process Started. Please Enter the Appropriate Latitude and Longitude."
    document.getElementById('obje_girdi').style.backgroundColor = "black";
    var label1 = document.createElement("label")
    label1.setAttribute("for","xbutton")
    label1.innerText="Lat:"
    var e1=document.createElement("input")
    e1.innerText="Lat:"
    e1.setAttribute("id","xbutton")
    e1.setAttribute("type","number")
    e1.setAttribute("step","0.001")
    e1.required=true
    var label2=document.createElement("label")
    label2.setAttribute("for","ybutton")
    label2.innerText="Lng:"
    var b1=document.createElement("input")
    b1.innerText="Lng:"
    b1.setAttribute("id","ybutton")
    b1.setAttribute("type","number")
    b1.setAttribute("step","0.001")
    b1.required=true
    var koordinatal=document.createElement("input")
    koordinatal.setAttribute("type","submit")
    koordinatal.onclick=function(){
      window[class_id].objeduzenlekoordinatile(object_id_ve_renk,class_id)
    }
    koordinatal.innerText="Taşı"
    document.getElementById("obje_girdi").appendChild(label1)
    document.getElementById("obje_girdi").appendChild(e1)
    document.getElementById("obje_girdi").appendChild(document.createElement("br"))
    document.getElementById("obje_girdi").appendChild(label2)
    document.getElementById("obje_girdi").appendChild(b1)
    document.getElementById("obje_girdi").appendChild(document.createElement("br"))
    document.getElementById("obje_girdi").appendChild(koordinatal)   
    return
  }
  objeduzenlekoordinatile(object_id_ve_renk,class_id){
  var x1  = (parseFloat(document.getElementById("xbutton").value)).toFixed(8)
  var y1  =(parseFloat(document.getElementById("ybutton").value)).toFixed(8)

  var object_id2=Object.keys(object_id_ve_renk)[0]
  var eski_renk= object_id_ve_renk[Object.keys(object_id_ve_renk)[0]].renk
  window[class_id].tum_ozellikler.objeler["'"+object_id2+"'"].bicim.bicim.fillColor=eski_renk
  window[class_id].tum_ozellikler.objeler["'"+object_id2+"'"].geometrioznitelik.geometry.coordinates = [parseFloat(y1),parseFloat(x1)]

  window[class_id].tum_ozellikler.objeler["'"+object_id2+"'"].feature= L.geoJSON(window[class_id].tum_ozellikler.objeler["'"+object_id2+"'"].geometrioznitelik,{
    pointToLayer:function(feature,latlng){                              //objeye ait layerin oluşması
      return L.circleMarker(latlng,window[class_id].tum_ozellikler.objeler["'"+object_id2+"'"].bicim.bicim)
    } 
  }).addTo(window[class_id].tum_ozellikler.featuregroup)
  document.getElementById("obje_girdi").style.backgroundColor="unset"
  document.getElementById("obje_girdi").innerHTML=""
  document.getElementById("sayfamesajlari").innerText=object_id2+" Object, Successfully Moved to " + x1+"----"+y1+" Coordinates."
  return
}
/* ÖZNİTELİK BİLGİLERİNİN GÖRÜNTÜLENDİĞİ VE EKLENEN İŞLEVLERİN TUTULDUĞU BÖLÜM */
oznitelikgoruntulemeveduzenleme(){
  var id_no=this.tum_ozellikler.id_nosu
  // öznitelik penceresinin en üstünde, obje featureid i ve kapat butonu eklenmesi
  document.getElementById("oznitelikpenceresi").innerText="";
  var ustsekme=document.createElement("div");
  ustsekme.innerText=this.tum_ozellikler.id_nosu;
  ustsekme.value=this.tum_ozellikler.id_nosu;
  ustsekme.setAttribute("id",this.tum_ozellikler.id_nosu+"kapat");
  ustsekme.style.height="30px";
  ustsekme.style.backgroundColor="white";
  ustsekme.style.border="5px solid black";
  ustsekme.style.textAlign="center";
  ustsekme.style.fontSize="large";
  ustsekme.style.fontWeight="bolder";
  var kapatbuton=document.createElement("button");
  kapatbuton.onclick = function(){
    window[ustsekme.value].oznitelikpenceresikapat()
    return
  }
  kapatbuton.setAttribute("value","Kapat");
  kapatbuton.style.width="100px";
  kapatbuton.style.height="30px";
  kapatbuton.innerText="Finish";
  kapatbuton.style.float="right";
  document.getElementById("oznitelikpenceresi").appendChild(ustsekme);
  document.getElementById(this.tum_ozellikler.id_nosu+"kapat").appendChild(kapatbuton);
  // özniteliklerin eklenmesi için, öznitelik değişkenindeki tüm keyler for ile döner ve teker teker eklenir
  var obje_key = Object.keys(this.tum_ozellikler.objeler)[0].replace(/'/g,"")
  var kolonlar = this.tum_ozellikler.objeler["'"+obje_key+"'"].geometrioznitelik.properties
  var kolonlarin_divi = document.createElement("div")
  kolonlarin_divi.style.width="auto"
  kolonlarin_divi.style.height="180px"
  kolonlarin_divi.style.overflowY="scroll"
  kolonlarin_divi.style.overflowX="scroll"
  kolonlarin_divi.setAttribute("id","kolonlarindivi")
  document.getElementById("oznitelikpenceresi").appendChild(kolonlarin_divi)
  var objeyaklasmadivi = document.createElement("div");
  objeyaklasmadivi.setAttribute("id","objeyeyaklasma")
  objeyaklasmadivi.style.width="50px";
  objeyaklasmadivi.style.height="auto";
  objeyaklasmadivi.style.float="left";
  objeyaklasmadivi.style.backgroundColor="black";
  objeyaklasmadivi.style.fontSize="medium";
  objeyaklasmadivi.style.fontWeight="bold";
  document.getElementById("kolonlarindivi").appendChild(objeyaklasmadivi);
  var objeyaklasmailksutun = document.createElement("div")
  objeyaklasmailksutun.style.width="50px";
  objeyaklasmailksutun.style.height="50px";
  objeyaklasmailksutun.style.backgroundColor="black"
  document.getElementById("objeyeyaklasma").appendChild(objeyaklasmailksutun);
  for (var c in Object.keys(kolonlar)){
    var kolonun_adi = Object.keys(kolonlar)[c].toString()
    var kolon = document.createElement("div");
          kolon.setAttribute("id","'"+kolonun_adi+"'")
          kolon.style.width="auto";
          kolon.style.height="180px";
          kolon.style.float="left";
          kolon.style.backgroundColor="black";
          kolon.style.fontSize="medium";
          kolon.style.fontWeight="bold";
          var kolonmenu = document.createElement("details")
          kolonmenu.setAttribute("id","'"+kolonun_adi+"'"+"_details");
          kolonmenu.style.width="140px";
          kolonmenu.style.height="50px";
          var kolonmenu_summary=document.createElement("summary");
          kolonmenu_summary.innerText=kolonun_adi;
          kolonmenu_summary.style.cursor="pointer";
          kolonmenu_summary.style.listStyle="none";
          kolonmenu_summary.style.color="red";
          kolonmenu_summary.style.backgroundColor="black";
          kolonmenu_summary.style.width="140px";
          kolonmenu_summary.style.height="50px";
          kolonmenu_summary.setAttribute("id","'"+kolonun_adi+"'"+"_summary");
          document.getElementById("kolonlarindivi").appendChild(kolon);
          document.getElementById("'"+kolonun_adi+"'").appendChild(kolonmenu);
          document.getElementById("'"+kolonun_adi+"'_details").appendChild(kolonmenu_summary);
    var menudiv=document.createElement("div");
            menudiv.setAttribute("id","'"+kolonun_adi+"'"+"menudiv");
            menudiv.style.width="200px";
            menudiv.style.height="110px";
            menudiv.style.border="red solid 5px";
            menudiv.style.marginLeft="0px";
            menudiv.style.position="absolute";
            menudiv.style.backgroundColor="black";
            var kolonmenu_duzenle=document.createElement("button");
            kolonmenu_duzenle.setAttribute("value","Edit");
            kolonmenu_duzenle.innerText="Edit";
            kolonmenu_duzenle.setAttribute("id","'"+kolonun_adi+"'"+"_duzenle")
            var kolonmenu_sil=document.createElement("button");
            kolonmenu_sil.setAttribute("value","Delete");
            kolonmenu_sil.innerText="Delete";
            kolonmenu_sil.setAttribute("id","'"+kolonun_adi+"'"+"_sil")
            var kolonmenu_ozellikler=document.createElement("button");
            kolonmenu_ozellikler.setAttribute("value","Features");
            kolonmenu_ozellikler.innerText="Features";
            kolonmenu_ozellikler.setAttribute("id","'"+kolonun_adi+"'"+"_ozellikler")
            var saga_kolon_ekle=document.createElement("button");
            saga_kolon_ekle.setAttribute("value","Add Column");
            saga_kolon_ekle.innerText="Add Column";
            saga_kolon_ekle.setAttribute("onclick","window['"+this.tum_ozellikler.id_nosu+"'].sagakolonekle('"+kolonun_adi+"')");
            kolonmenu_ozellikler.setAttribute("onclick","window['"+this.tum_ozellikler.id_nosu+"'].oznitelikmenuozellikler('"+kolonun_adi+"')");
            // featureid, Geometri Tipi, X Koordinatı(Enlem) ve Y Koordinatı(Boylam) öznitelikleri değiştirilemez niteliklerdir. Bu yüzden bu 
            // niteliklerin kolon adı ve niteliği değiştirilemez.
            if (kolonun_adi!=="featureid" && kolonun_adi !=="Geometri Tipi" && kolonun_adi !=="X Koordinatı (Enlem)" && kolonun_adi !== "Y Koordinatı (Boylam)"){
  
              kolonmenu_duzenle.setAttribute("onclick","window['"+this.tum_ozellikler.id_nosu+"'].oznitelikkolonduzenle('"+kolonun_adi+"')");
              kolonmenu_sil.setAttribute("onclick","window['"+this.tum_ozellikler.id_nosu+"'].oznitelikkolonsil('"+kolonun_adi+"')");
              
            }
            else{
              kolonmenu_duzenle.onclick=function(){
                alert("Column Not Editable.")
            }              
              kolonmenu_sil.onclick=function(){
                alert("Column Not Editable.")
              }
            }
            document.getElementById("'"+kolonun_adi+"'"+"_details").appendChild(menudiv);
            document.getElementById("'"+kolonun_adi+"'"+"menudiv").appendChild(kolonmenu_duzenle);
            document.getElementById("'"+kolonun_adi+"'"+"menudiv").appendChild(document.createElement("br"));
            document.getElementById("'"+kolonun_adi+"'"+"menudiv").appendChild(kolonmenu_sil);
            document.getElementById("'"+kolonun_adi+"'"+"menudiv").appendChild(document.createElement("br"));
            document.getElementById("'"+kolonun_adi+"'"+"menudiv").appendChild(kolonmenu_ozellikler);
            document.getElementById("'"+kolonun_adi+"'"+"menudiv").appendChild(document.createElement("br"));
            document.getElementById("'"+kolonun_adi+"'"+"menudiv").appendChild(saga_kolon_ekle);
            document.getElementById("'"+kolonun_adi+"'").appendChild(document.createElement("br"));
      for (var k in Object.keys(this.tum_ozellikler.objeler_ve_id_nolari)){
      var object_namee = Object.values(this.tum_ozellikler.objeler_ve_id_nolari)[k]
      if(document.getElementById("'"+object_namee+"'_objeyaklasma")===null){
          var objeyeyaklasbuton = document.createElement("button")
          objeyeyaklasbuton.style.backgroundImage="url(static/zoomin.png)"
          objeyeyaklasbuton.style.backgroundSize="100%"
          objeyeyaklasbuton.style.opacity="0.5"
          objeyeyaklasbuton.style.float="left"
          objeyeyaklasbuton.style.width="52px";
          objeyeyaklasbuton.style.height="52px";
          objeyeyaklasbuton.style.borderWidth="2px"
          objeyeyaklasbuton.style.borderStyle="solid"
          objeyeyaklasbuton.style.borderColor="white"    
          objeyeyaklasbuton.setAttribute("onclick","window['"+this.tum_ozellikler.id_nosu+"'].seciliobjeyeyaklas('"+object_namee+"')")
          objeyeyaklasbuton.setAttribute("id","'"+object_namee+"'_objeyaklasma")
          document.getElementById("objeyeyaklasma").appendChild(document.createElement("br"))
          document.getElementById("objeyeyaklasma").appendChild(objeyeyaklasbuton)
        }
      
      var kolonicerik_detail=document.createElement("details");
      kolonicerik_detail.setAttribute("id","'"+object_namee+"-"+kolonun_adi+"'_kolonicerik_detail");
      kolonicerik_detail.style.width="140px";
      kolonicerik_detail.style.height="50px";
      kolonicerik_detail.style.borderWidth="1px"
      kolonicerik_detail.style.borderStyle="solid"
      kolonicerik_detail.style.borderColor="white"
      kolonicerik_detail.style.textAlign="center"
      kolonicerik_detail.style.verticalAlign="middle"
      var kolon_icerik_name = document.createElement("summary");
      var genislik = document.getElementById("'"+kolonun_adi+"'").getElementsByTagName("details")[0].clientWidth;
      kolon_icerik_name.setAttribute("id","'"+object_namee+"-"+kolonun_adi+"'_iceriksummary");
      if (this.tum_ozellikler.objeler["'"+object_namee+"'"].geometrioznitelik.properties[kolonun_adi]==="text" || this.tum_ozellikler.objeler["'"+object_namee+"'"].geometrioznitelik.properties[kolonun_adi]==="tam sayı" || this.tum_ozellikler.objeler["'"+object_namee+"'"].geometrioznitelik.properties[kolonun_adi]==="ondalıklı sayı" ){
        kolon_icerik_name.innerText=""
      }
      else{
      kolon_icerik_name.innerText=this.tum_ozellikler.objeler["'"+object_namee+"'"].geometrioznitelik.properties[kolonun_adi]
      }
      kolon_icerik_name.style.color="white";
      kolon_icerik_name.style.width="140px";
      kolon_icerik_name.style.height="50px";
      kolon_icerik_name.style.cursor="pointer";
      kolon_icerik_name.style.listStyle="none";
      kolon_icerik_name.style.backgroundColor="black";
      document.getElementById("'"+kolonun_adi+"'").appendChild(kolonicerik_detail);
      document.getElementById("'"+object_namee+"-"+kolonun_adi+"'_kolonicerik_detail").appendChild(kolon_icerik_name);
      var kolonicerik_menu=document.createElement("button");
      kolonicerik_menu.innerText="Edit";
      kolonicerik_menu.style.width="auto";
      kolonicerik_menu.style.height="auto";
      kolonicerik_menu.style.border="solid red 5px";
      kolonicerik_menu.style.marginLeft="0px";
      kolonicerik_menu.style.position="absolute";
      kolonicerik_menu.style.color="white";
      kolonicerik_menu.style.backgroundColor="black";
      kolonicerik_menu.style.position="relative"

      if (kolonun_adi!=="featureid" && kolonun_adi !=="Geometri Tipi" && kolonun_adi !=="X Koordinatı (Enlem)" && kolonun_adi !== "Y Koordinatı (Boylam)"){
        kolonicerik_menu.setAttribute("onclick","window['"+this.tum_ozellikler.id_nosu+"'].oznitelikicerikdegistir('"+kolonun_adi+"','"+object_namee+"')");
      }
      else{
        kolonicerik_menu.onclick=function(){
          alert("Column Not Editable.")
        }
      }
      document.getElementById("'"+object_namee+"-"+kolonun_adi+"'_kolonicerik_detail").appendChild(kolonicerik_menu);
    }
  }
  return
}
/* SEÇİLEN KOLONUN DÜZENLENDİĞİ FONSKİYON */
  oznitelikkolonduzenle(kolon_adi){
        document.getElementById("'"+kolon_adi+"'_details").removeAttribute("open");
        //bilgilerin sayfa mesajlarına yazılması
        var sayfamesajlari=document.getElementById("sayfamesajlari");
        sayfamesajlari.style.backgroundColor="black";
        sayfamesajlari.innerText="";
        var labelbir = document.createElement("label");
        labelbir.innerText="Column Name:";
        labelbir.setAttribute("for","kolonadiduzenle");
        var kolonadigir=document.createElement("input");
        kolonadigir.setAttribute("id","kolonadiduzenle");
        kolonadigir.setAttribute("type","Kolon Adı");
        kolonadigir.setAttribute("value",kolon_adi);
        sayfamesajlari.appendChild(labelbir);
        sayfamesajlari.appendChild(kolonadigir);
        sayfamesajlari.appendChild(document.createElement("br"));
        // veri tipinin seçimi
        var div_tip=document.createElement("div");
        div_tip.setAttribute("id","tipsecim");
        var labeliki=document.createElement("label");
        labeliki.innerText="Data Type:";
        labeliki.setAttribute("for","cevap");
        var veritip_bir=document.createElement("input");
        veritip_bir.setAttribute("type","radio");
        veritip_bir.setAttribute("class","cevap");
        veritip_bir.setAttribute("name","cevap1");
        veritip_bir.setAttribute("value","text");
        var veritip_iki=document.createElement("input");
        veritip_iki.setAttribute("type","radio");
        veritip_iki.setAttribute("class","cevap");
        veritip_iki.setAttribute("name","cevap1");
        veritip_iki.setAttribute("value","Integer");
        var veritip_uc=document.createElement("input");
        veritip_uc.setAttribute("type","radio");
        veritip_uc.setAttribute("class","cevap");
        veritip_uc.setAttribute("name","cevap1");
        veritip_uc.setAttribute("value","Float");
        sayfamesajlari.appendChild(div_tip);
        document.getElementById("tipsecim").appendChild(document.createTextNode("Metin"));
        document.getElementById("tipsecim").appendChild(veritip_bir);
        document.getElementById("tipsecim").appendChild(document.createTextNode("Tam Sayı"));
        document.getElementById("tipsecim").appendChild(veritip_iki);
        document.getElementById("tipsecim").appendChild(document.createTextNode("Ondalıklı Sayı"));
        document.getElementById("tipsecim").appendChild(veritip_uc);
        document.getElementById("tipsecim").appendChild(document.createElement("br"));
        var uygula_buton=document.createElement("input");
        uygula_buton.setAttribute("type","submit");
        uygula_buton.innerText="Apply";
        uygula_buton.setAttribute("onclick","window['"+this.tum_ozellikler.id_nosu+"'].oznitelikdegisiklikuygula('"+kolon_adi+"')");
        document.getElementById("tipsecim").appendChild(uygula_buton);
        return
  }
  /* DÜZENLENEN FONKSİYONUN BİLGİLERİNİN UYGULANMASI */
  oznitelikdegisiklikuygula(kolon_adi){
    var yeni_kolon_ad = document.getElementById("kolonadiduzenle").value;
    try{
    var veri_tip=document.querySelector('input[name = cevap1]:checked').value;
    }
    catch{
     var veri_tip=this.tum_ozellikler.kolon_ve_tipleri[kolon_adi]
    }

    document.getElementById("sayfamesajlari").innerText=""
    /* YENİ KOLON ADININ UYGUNLUĞUNUN TESTİ*/

    if(sayilar.includes(yeni_kolon_ad[0])===false && alfabe_harfler.includes(yeni_kolon_ad[0])===true){
      var kolonaduygunluk 
      for (var h in yeni_kolon_ad){

        if (alfabe_harfler.includes(yeni_kolon_ad[h])){
          kolonaduygunluk="uygun"
        }
        else{
          kolonaduygunluk="uygunsuz"
          break
        }
      }
      if (kolonaduygunluk==="uygun"){
        this.tum_ozellikler.kolon_ve_tipleri[yeni_kolon_ad]=this.tum_ozellikler.kolon_ve_tipleri[kolon_adi]
        delete this.tum_ozellikler.kolon_ve_tipleri[kolon_adi]
        this.tum_ozellikler.kolon_ve_tipleri[yeni_kolon_ad]=veri_tip
        for (var h in this.tum_ozellikler.objeler_ve_id_nolari){
          var object_name = this.tum_ozellikler.objeler_ve_id_nolari[h]
          this.tum_ozellikler.objeler["'"+object_name+"'"].geometrioznitelik.properties[yeni_kolon_ad]=this.tum_ozellikler.objeler["'"+object_name+"'"].geometrioznitelik.properties[kolon_adi]
          delete this.tum_ozellikler.objeler["'"+object_name+"'"].geometrioznitelik.properties[kolon_adi]
          if (this.tum_ozellikler.kolon_ve_tipleri[kolon_adi]==="text"){
            try{
            this.tum_ozellikler.objeler["'"+object_name+"'"].geometrioznitelik.properties[yeni_kolon_ad]=this.tum_ozellikler.objeler["'"+object_name+"'"].geometrioznitelik.properties[yeni_kolon_ad].toString();
          }
          catch{
            this.tum_ozellikler.objeler["'"+object_name+"'"].geometrioznitelik.properties[yeni_kolon_ad]=null
          }
          }
          else if (this.tum_ozellikler.kolon_ve_tipleri[kolon_adi]==="Integer"){
            try{
            this.tum_ozellikler.objeler["'"+object_name+"'"].geometrioznitelik.properties[yeni_kolon_ad]=parseInt(this.tum_ozellikler.objeler["'"+object_name+"'"].geometrioznitelik.properties[yeni_kolon_ad])
            }
            catch{
              this.tum_ozellikler.objeler["'"+object_name+"'"].geometrioznitelik.properties[yeni_kolon_ad]=null
            }
          }
          else if (this.tum_ozellikler.kolon_ve_tipleri[kolon_adi]==="Float"){
            try{this.tum_ozellikler.objeler["'"+object_name+"'"].geometrioznitelik.properties[yeni_kolon_ad]=parseFloat (this.tum_ozellikler.objeler["'"+object_name+"'"].geometrioznitelik.properties[yeni_kolon_ad])
          }
          catch{
            this.tum_ozellikler.objeler["'"+object_name+"'"].geometrioznitelik.properties[yeni_kolon_ad]=null
          }
          }
        }
      }
      window[this.tum_ozellikler.id_nosu].objeyiyenile(window[this.tum_ozellikler.id_nosu]);
      window[this.tum_ozellikler.id_nosu].oznitelikgoruntulemeveduzenleme();
      bekleme();
      return}
      
    else{
      alert("column name is not appropriate")
    }
    return
  }
  /* KOLON EKLEME */
  sagakolonekle(kolon_adi){
//bilgilerin sayfa mesajlarına yazılması
      var sayfamesajlari=document.getElementById("sayfamesajlari");
      sayfamesajlari.style.backgroundColor="black";
      sayfamesajlari.innerText="";
      var labelbir = document.createElement("label");
      labelbir.innerText="Column Name:";
      labelbir.setAttribute("for","kolonadiduzenle");
      var kolonadigir=document.createElement("input");
      kolonadigir.setAttribute("id","kolonadiduzenle");
      kolonadigir.setAttribute("type","Kolon Adı");
      sayfamesajlari.appendChild(labelbir);
      sayfamesajlari.appendChild(kolonadigir);
      sayfamesajlari.appendChild(document.createElement("br"));
      // veri tipinin seçimi
      var div_tip=document.createElement("div");
      div_tip.setAttribute("id","tipsecim");
      var labeliki=document.createElement("label");
      labeliki.innerText="Data Type:";
      labeliki.setAttribute("for","cevap");
      var veritip_bir=document.createElement("input");
      veritip_bir.setAttribute("type","radio");
      veritip_bir.setAttribute("class","cevap");
      veritip_bir.setAttribute("name","cevap1");
      veritip_bir.setAttribute("value","text");
      var veritip_iki=document.createElement("input");
      veritip_iki.setAttribute("type","radio");
      veritip_iki.setAttribute("class","cevap");
      veritip_iki.setAttribute("name","cevap1");
      veritip_iki.setAttribute("value","tam sayı");
      var veritip_uc=document.createElement("input");
      veritip_uc.setAttribute("type","radio");
      veritip_uc.setAttribute("class","cevap");
      veritip_uc.setAttribute("name","cevap1");
      veritip_uc.setAttribute("value","ondalıklı sayı");
      sayfamesajlari.appendChild(div_tip);
      document.getElementById("tipsecim").appendChild(document.createTextNode("Metin"));
      document.getElementById("tipsecim").appendChild(veritip_bir);
      document.getElementById("tipsecim").appendChild(document.createTextNode("Tam Sayı"));
      document.getElementById("tipsecim").appendChild(veritip_iki);
      document.getElementById("tipsecim").appendChild(document.createTextNode("Ondalıklı Sayı"));
      document.getElementById("tipsecim").appendChild(veritip_uc);
      document.getElementById("tipsecim").appendChild(document.createElement("br"));
      //ekle butonu
      var uygula_buton=document.createElement("input");
      uygula_buton.setAttribute("type","submit");
      uygula_buton.innerText="Add";
      uygula_buton.setAttribute("onclick","window['"+this.tum_ozellikler.id_nosu+"'].sagakolonekleson('"+kolon_adi+"')");
      document.getElementById("tipsecim").appendChild(uygula_buton);
      return
      }
/* KOLON EKLEME İŞLEMİ UYGULANMASI */
  sagakolonekleson(kolon_adi){

      var yeni_kolon_ad = document.getElementById("kolonadiduzenle").value;
      try {
      var veri_tip = document.querySelector('input[name = cevap1]:checked').value}
      catch{
        alert("Data Type Of The Column Is Set To Text Because No Data Type Is Selected")
        var veri_tip="text"
      }
      document.getElementById("sayfamesajlari").innerText=""
      if(sayilar.includes(yeni_kolon_ad[0])===false && alfabe_harfler.includes(yeni_kolon_ad[0])===true){

        var kolonaduygunluk 
        for (var h in yeni_kolon_ad){

          if (alfabe_harfler.includes(yeni_kolon_ad[h])){
            kolonaduygunluk="uygun"
          }
          else{
            kolonaduygunluk="uygunsuz"
            break
          }
        }

        if (kolonaduygunluk==="uygun"){
          this.tum_ozellikler.kolon_ve_tipleri[yeni_kolon_ad]=veri_tip
          for (var h in this.tum_ozellikler.objeler_ve_id_nolari){
            var object_name = this.tum_ozellikler.objeler_ve_id_nolari[h]
            

            this.tum_ozellikler.objeler["'"+object_name+"'"].geometrioznitelik.properties[yeni_kolon_ad]=veri_tip
          }
        }
        else{
          alert("Column Name Not Available")
        }
        window[this.tum_ozellikler.id_nosu].objeyiyenile(window[this.tum_ozellikler.id_nosu]);
        window[this.tum_ozellikler.id_nosu].oznitelikgoruntulemeveduzenleme();
        bekleme();
        return}
        else {
          alert("Column Name Not Available")
        }return
      }
      /* KOLON SİLME  */
  oznitelikkolonsil(kolon_adi){
    for (var n in this.tum_ozellikler.objeler_ve_id_nolari){
      var obje_name = this.tum_ozellikler.objeler_ve_id_nolari[n]
      delete this.tum_ozellikler.objeler["'"+obje_name+"'"].geometrioznitelik.properties[kolon_adi]
      delete this.tum_ozellikler.kolon_ve_tipleri[kolon_adi]
    }
    window[this.tum_ozellikler.id_nosu].oznitelikgoruntulemeveduzenleme();
    window[this.tum_ozellikler.id_nosu].objeyiyenile(window[this.tum_ozellikler.id_nosu]);return
  }
  /* KOLON ÖZELLİKLERİ */
  oznitelikmenuozellikler(kolon_adi){
    var sayfamesajlari=document.getElementById("sayfamesajlari");
        sayfamesajlari.style.backgroundColor="black";
        sayfamesajlari.innerText="";
        var kolonadi=document.createElement("label");
        kolonadi.innerText="Column Name=     "+kolon_adi;
        var kolontip=document.createElement("label");
        kolontip.innerText="Column Data Type "+this.tum_ozellikler.kolon_ve_tipleri[kolon_adi]
        
        document.getElementById("sayfamesajlari").appendChild(kolonadi);
        document.getElementById("sayfamesajlari").appendChild(document.createElement("br"));
        document.getElementById("sayfamesajlari").appendChild(kolontip);
        document.getElementById("sayfamesajlari").appendChild(document.createElement("br"));
        var kapatbutonu=document.createElement("button");
        kapatbutonu.setAttribute("value","Close");
        kapatbutonu.setAttribute("onclick","bekleme()");
        kapatbutonu.innerText="Finish";
        document.getElementById("sayfamesajlari").appendChild(kapatbutonu);return
  }
  /* NİTELİK DEĞİŞTİRME */
  oznitelikicerikdegistir(kolon_adi,obje_name){

    var sayfamesajlari=document.getElementById("sayfamesajlari");
    sayfamesajlari.innerText="";
    sayfamesajlari.style.backgroundColor="black";
    var kolonicerik_bilgi=document.createElement("label");
    kolonicerik_bilgi.setAttribute("for","kolonicerikal");
    var icerikalma=document.createElement("input");
    icerikalma.setAttribute("id","kolonicerikal");
    if(this.tum_ozellikler.objeler["'"+obje_name+"'"].geometrioznitelik.properties[kolon_adi]===null){
      kolonicerik_bilgi.innerText=""
      icerikalma.setAttribute("value",this.tum_ozellikler.objeler["'"+obje_name+"'"].geometrioznitelik.properties[kolon_adi]);
    }
    else{
    if (this.tum_ozellikler.kolon_ve_tipleri[kolon_adi]==="text"){
      kolonicerik_bilgi.innerText="Column Data Type: Text";
      icerikalma.setAttribute("type","text");
      icerikalma.setAttribute("value",this.tum_ozellikler.objeler["'"+obje_name+"'"].geometrioznitelik.properties[kolon_adi]);
    }
    else if (this.tum_ozellikler.kolon_ve_tipleri[kolon_adi]==="Integer"){
      kolonicerik_bilgi.innerText="Column Data Type: Integer";
      icerikalma.setAttribute("type","number");
      icerikalma.setAttribute("value",this.tum_ozellikler.objeler["'"+obje_name+"'"].geometrioznitelik.properties[kolon_adi]);
    }
    else if (this.tum_ozellikler.kolon_ve_tipleri[kolon_adi]==="Float"){
      kolonicerik_bilgi.innerText="Column Data Type: Float";
      icerikalma.setAttribute("type","number");
      icerikalma.setAttribute("step","0.001");
      icerikalma.setAttribute("value",this.tum_ozellikler.objeler["'"+obje_name+"'"].geometrioznitelik.properties[kolon_adi]);

    }
  }
    sayfamesajlari.appendChild(kolonicerik_bilgi);
    sayfamesajlari.appendChild(document.createElement("br"));
    sayfamesajlari.appendChild(icerikalma);
    var degistir_buton=document.createElement("input");
    degistir_buton.setAttribute("type","submit");
    degistir_buton.setAttribute("value","Change");
    degistir_buton.setAttribute("onclick","window['"+this.tum_ozellikler.id_nosu+"'].oznitelikicerikdegistir_butonlaal('"+kolon_adi+"','"+kolonicerik_bilgi.innerText+"','"+obje_name+"')");
    sayfamesajlari.appendChild(degistir_buton);return
  }
/* İÇERİK DEĞİŞİTMR E UYGULAMA  */
  oznitelikicerikdegistir_butonlaal(kolon_adi,kolonicerigi,obje_name){

    document.getElementById("'"+obje_name+"-"+kolon_adi+"'_kolonicerik_detail").removeAttribute("open")
    var aaa=document.getElementById("kolonicerikal").value;
    if(this.tum_ozellikler.objeler["'"+obje_name+"'"].geometrioznitelik.properties[kolon_adi]===null){
      this.tum_ozellikler.objeler["'"+obje_name+"'"].geometrioznitelik.properties[kolon_adi]=aaa
    }
    else{
    if (kolonicerigi==="Column Data Type: Text"){
      this.tum_ozellikler.objeler["'"+obje_name+"'"].geometrioznitelik.properties[kolon_adi]=aaa.toString();
    }
    else if (kolonicerigi==="Column Data Type: Integer"){
      this.tum_ozellikler.objeler["'"+obje_name+"'"].geometrioznitelik.properties[kolon_adi]=parseInt(aaa);
    }
    else if (kolonicerigi==="Column Data Type: Float"){
      this.tum_ozellikler.objeler["'"+obje_name+"'"].geometrioznitelik.properties[kolon_adi]=parseFloat(aaa);
    }}
  document.getElementById("'"+obje_name+"-"+kolon_adi+"'_iceriksummary").innerText=this.tum_ozellikler.objeler["'"+obje_name+"'"].geometrioznitelik.properties[kolon_adi];
  

  bekleme();
  return
  }    
  oznitelikpenceresikapat(){
    document.getElementById("oznitelikpenceresi").innerText="";
    document.getElementById("oznitelikpenceresi").backgroundColor="unset"
    return
  }
  /* STİL DEĞİŞTİRME BÖLÜMÜ */
  stildegistirme(){
    secilecekobjelerineskirenkleri = {}
    var class_id=this.tum_ozellikler.id_nosu
    var sayfamesajlari = document.getElementById("sayfamesajlari")
    sayfamesajlari.style.backgroundColor="black"
    sayfamesajlari.innerText=""
    
    var objesecerek = document.createElement("button")
    objesecerek.innerText="Select Object"
    objesecerek.setAttribute("onclick","window['"+this.tum_ozellikler.id_nosu+"'].objesecerekstildegistirme('"+this.tum_ozellikler.id_nosu+"')")
    sayfamesajlari.appendChild(objesecerek)
    var tumunusec = document.createElement("button")
    tumunusec.innerText="Select All"
    tumunusec.onclick=function(){
      var sayfamesajlari = document.getElementById("sayfamesajlari")
      sayfamesajlari.style.backgroundColor="black"
      sayfamesajlari.innerText="You can perform the selection process by clicking on the relevant points on the screen."
      for (var k in window[class_id].tum_ozellikler.objeler_ve_id_nolari){
        var id_no=window[class_id].tum_ozellikler.objeler_ve_id_nolari[k]
        if(Object.keys(secilecekobjelerineskirenkleri).includes(id_no)===false){
          var mevcut_renk = window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].bicim.bicim.fillColor
          secilecekobjelerineskirenkleri[id_no]=mevcut_renk.toString()
          window[class_id].tum_ozellikler.featuregroup.removeLayer(window[class_id].tum_ozellikler.objeler["'"+id_no+"'"]["feature"])
          window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].bicim.bicim.fillColor =  "#56ffff"  //seçilen objeye seçi mrengi verilir
          window[class_id].tum_ozellikler.objeler["'"+id_no+"'"]["feature"]= L.geoJSON(window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].geometrioznitelik,{
            pointToLayer:function(feature,latlng){
              return L.circleMarker(latlng,window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].bicim.bicim) //seçilen obje yeni rengiyle tekrar eklenir
            }
          }).addTo(window[class_id].tum_ozellikler.featuregroup)
        }
        else{
          alert("This object has been selected")
        }

      }
      var secimibitir= document.createElement("button")
              secimibitir.innerText="Finish Selection"
              secimibitir.onclick=function(){

                                if (Object.keys(secilecekobjelerineskirenkleri).length>0){
                                window[class_id].tum_ozellikler.featuregroup.off("click")
                                window[class_id].secilenobjelerstildegistir(secilecekobjelerineskirenkleri,class_id)
                                }
                                else{
                                  alert("Object Not Selected. Please Select the Objects You Want to Style.")

                                }
                            }
            sayfamesajlari.appendChild(document.createElement("br"))
            sayfamesajlari.appendChild(secimibitir)
            var kapatbuton=document.createElement("button")
            kapatbuton.innerText="Finish"
            kapatbuton.onclick=function(){

              for (var n in Object.keys(secilecekobjelerineskirenkleri)){
                var id_no=Object.keys(secilecekobjelerineskirenkleri)[n]

                if (window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].bicim.bicim.fillColor==="#56ffff"){
                  window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].bicim.bicim.fillColor=secilecekobjelerineskirenkleri[id_no]
                  window[class_id].tum_ozellikler.featuregroup.removeLayer(window[class_id].tum_ozellikler.objeler["'"+id_no+"'"]["feature"])
                  
                  window[class_id].tum_ozellikler.objeler["'"+id_no+"'"]["feature"]= L.geoJSON(window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].geometrioznitelik,{
                    pointToLayer:function(feature,latlng){
                      return L.circleMarker(latlng,window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].bicim.bicim) //seçilen obje yeni rengiyle tekrar eklenir
                    }
                  }).addTo(window[class_id].tum_ozellikler.featuregroup)
                }
              }
              sayfamesajlari.innerHTML=""
              secilecekobjelerineskirenkleri={}
              return
           }
            sayfamesajlari.appendChild(kapatbuton)
    }
    sayfamesajlari.appendChild(tumunusec)
    var kapatbuton=document.createElement("button")
    kapatbuton.innerText="Finish"
    kapatbuton.onclick=function(){
      sayfamesajlari.innerHTML=""
      return
   }
    sayfamesajlari.appendChild(document.createElement("br"))
    sayfamesajlari.appendChild(kapatbuton)      
  }
/* OBJE SEÇEREK STİL DEĞİŞTİRME  */
       objesecerekstildegistirme(class_id){
        var sayfamesajlari = document.getElementById("sayfamesajlari")
        sayfamesajlari.style.backgroundColor="black"
        sayfamesajlari.innerText="You can perform the selection process by clicking on the relevant points on the screen."
        secilecekobjelerineskirenkleri = {}

        this.tum_ozellikler.featuregroup.on("click", function objesecme(e){
          
                  var id_no = e.layer.feature.properties.featureid
                  if(Object.keys(secilecekobjelerineskirenkleri).includes(id_no)===false){
                  var mevcut_renk = window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].bicim.bicim.fillColor
                  secilecekobjelerineskirenkleri[id_no]=mevcut_renk.toString()
                  window[class_id].tum_ozellikler.featuregroup.removeLayer(window[class_id].tum_ozellikler.objeler["'"+id_no+"'"]["feature"])
                  window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].bicim.bicim.fillColor =  "#56ffff"  //seçilen objeye seçi mrengi verilir
                  window[class_id].tum_ozellikler.objeler["'"+id_no+"'"]["feature"]= L.geoJSON(window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].geometrioznitelik,{
                    pointToLayer:function(feature,latlng){
                      return L.circleMarker(latlng,window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].bicim.bicim) //seçilen obje yeni rengiyle tekrar eklenir
                    }
                  }).addTo(window[class_id].tum_ozellikler.featuregroup)
                }
                else{
                  alert("This object has been selected")
                }
              })  
              var secimibitir= document.createElement("button")
              secimibitir.innerText="Finish Selection"
              secimibitir.onclick=function(){
              
                                if (Object.keys(secilecekobjelerineskirenkleri).length>0){
                                window[class_id].tum_ozellikler.featuregroup.off("click")
                                window[class_id].secilenobjelerstildegistir(secilecekobjelerineskirenkleri,class_id)
                                }
                                else{
                                  alert("Object Not Selected. Please Select the Objects You Want to Style.")

                                }
                            }
            sayfamesajlari.appendChild(document.createElement("br"))
            sayfamesajlari.appendChild(secimibitir)
            var kapatbuton=document.createElement("button")
            kapatbuton.innerText="Finish"
            kapatbuton.onclick=function(){
              for (var n in Object.keys(secilecekobjelerineskirenkleri)){
                var id_no=Object.keys(secilecekobjelerineskirenkleri)[n]
                if (window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].bicim.gecerli_bicim !=="simge"){
                if (window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].bicim.bicim.fillColor==="#56ffff"){
                  window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].bicim.bicim.fillColor=secilecekobjelerineskirenkleri[id_no]
                  window[class_id].tum_ozellikler.featuregroup.removeLayer(window[class_id].tum_ozellikler.objeler["'"+id_no+"'"]["feature"])
                  
                  window[class_id].tum_ozellikler.objeler["'"+id_no+"'"]["feature"]= L.geoJSON(window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].geometrioznitelik,{
                    pointToLayer:function(feature,latlng){
                      return L.circleMarker(latlng,window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].bicim.bicim) //seçilen obje yeni rengiyle tekrar eklenir
                    }
                  }).addTo(window[class_id].tum_ozellikler.featuregroup)
                }
              }
              else {
                /* objenin yenilenemsi */
                window[class_id].tum_ozellikler.featuregroup.removeLayer(window[class_id].tum_ozellikler.objeler["'"+id_no+"'"]["feature"])
                window[class_id].tum_ozellikler.objeler["'"+id_no+"'"]["feature"]= L.geoJSON(window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].geometrioznitelik,{
                  pointToLayer:function(feature,latlng){
                    return L.marker(latlng,{icon:L.icon(window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].bicim.ikon),
                  opacity:window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].bicim.bicim.fillOpacity}) //seçilen obje yeni rengiyle tekrar eklenir
                  }
                }).addTo(window[class_id].tum_ozellikler.featuregroup)
              }
              }
              sayfamesajlari.innerHTML=""
              secilecekobjelerineskirenkleri={}
              return
           }
            sayfamesajlari.appendChild(kapatbuton)                                
            return
      }

      secilenobjelerstildegistir(secilecekobjelerineskirenkleri,class_id){
        /* Önceki menüde seçilen objelerin kendi renklerine çevirme */
        for (var n in Object.keys(secilecekobjelerineskirenkleri)){
          var id_no=Object.keys(secilecekobjelerineskirenkleri)[n]
          if (window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].bicim.gecerli_bicim !=="simge"){
          if (window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].bicim.bicim.fillColor==="#56ffff"){
            window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].bicim.bicim.fillColor=secilecekobjelerineskirenkleri[id_no]
            window[class_id].tum_ozellikler.featuregroup.removeLayer(window[class_id].tum_ozellikler.objeler["'"+id_no+"'"]["feature"])
            
            window[class_id].tum_ozellikler.objeler["'"+id_no+"'"]["feature"]= L.geoJSON(window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].geometrioznitelik,{
              pointToLayer:function(feature,latlng){
                return L.circleMarker(latlng,window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].bicim.bicim) //seçilen obje yeni rengiyle tekrar eklenir
              }
            }).addTo(window[class_id].tum_ozellikler.featuregroup)
          }
        }
        else {
          /* objenin yenilenemsi */
          window[class_id].tum_ozellikler.featuregroup.removeLayer(window[class_id].tum_ozellikler.objeler["'"+id_no+"'"]["feature"])
          window[class_id].tum_ozellikler.objeler["'"+id_no+"'"]["feature"]= L.geoJSON(window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].geometrioznitelik,{
            pointToLayer:function(feature,latlng){
              return L.marker(latlng,{icon:L.icon(window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].bicim.ikon),
            opacity:window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].bicim.bicim.fillOpacity}) //seçilen obje yeni rengiyle tekrar eklenir
            }
          }).addTo(window[class_id].tum_ozellikler.featuregroup)
        }
        }
        /* İşlem Türünün Seçilmesi */
        var sayfamesajlari = document.getElementById("sayfamesajlari")
        sayfamesajlari.style.backgroundColor="black"
        sayfamesajlari.innerText="Select Process Type"
        sayfamesajlari.appendChild(document.createElement("br"))
        var noktagosterimayarlari = document.createElement("button")
        noktagosterimayarlari.innerText="Point Style"
        /* Noktaasl Gösterim İçin İşlenecek Fonksiyonlar */
        noktagosterimayarlari.onclick=function noktasalgosterimayarlari(){
                  /* Noktasal Gösterim İçin İşlem Türü Seçimi */
                  var sayfamesajlari = document.getElementById("sayfamesajlari")
                  sayfamesajlari.innerText="Select Process Type"
                  var tumuaynitip=document.createElement("button")
                  tumuaynitip.innerText="Monotype"
                  /* Tek Tip Objeler İçin Fonksiyonlar */
                  tumuaynitip.onclick=function(){

                    var sayfamesajlari = document.getElementById("sayfamesajlari")
                    sayfamesajlari.innerHTML=""
                    var renksecimlabel = document.createElement("label")
                    renksecimlabel.setAttribute("for","renksecimkutusu")
                    renksecimlabel.innerText="Choose a Color and Click the 'Apply' button to apply."
                    var renksecimkutusu=document.createElement("input")
                    renksecimkutusu.setAttribute("type","color")
                    renksecimkutusu.setAttribute("id","renksecimkutusu")
                    var renkalmabuton=document.createElement("input")
                    renkalmabuton.setAttribute("type","submit")
                    renkalmabuton.innerText="Apply"
                    /* Renk Değiştirme */
                    renkalmabuton.onclick=function renksecim(){
                      var yeni_renk = document.getElementById("renksecimkutusu").value
                      for (var m in Object.keys(secilecekobjelerineskirenkleri)){
                        var id_no=Object.keys(secilecekobjelerineskirenkleri)[m]
                        window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].bicim.gecerli_bicim="nokta"
                       window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].bicim.bicim.fillColor=yeni_renk
                       window[class_id].tum_ozellikler.featuregroup.removeLayer(window[class_id].tum_ozellikler.objeler["'"+id_no+"'"]["feature"])

                       window[class_id].tum_ozellikler.objeler["'"+id_no+"'"]["feature"]= L.geoJSON(window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].geometrioznitelik,{
                        pointToLayer:function(feature,latlng){
                          return L.circleMarker(latlng,window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].bicim.bicim) //seçilen obje yeni rengiyle tekrar eklenir
                        }
                      }).addTo(window[class_id].tum_ozellikler.featuregroup)
                      }
                      return noktasalgosterimayarlari()
                    }
                    var buyukluksecimlabel = document.createElement("label")
                    buyukluksecimlabel.setAttribute("for","buyukluksecim")
                    buyukluksecimlabel.innerText="Enter the Radius of the Point."
                    var buyuklukgir = document.createElement("input")
                    buyuklukgir.setAttribute("id","buyukluksecim");
                    buyuklukgir.setAttribute("type","number");
                    buyuklukgir.setAttribute("maxlenght","1000");
                    buyuklukgir.setAttribute("step","0.001");
                    buyuklukgir.required=true;
                    var buyuklukalbuton = document.createElement("input")
                    buyuklukalbuton.innerText="Apply"
                    buyuklukalbuton.setAttribute("type","submit")
                    /* Büyüyklük Değiştirme */
                    buyuklukalbuton.onclick=function(){
                      var yeni_boyut =document.getElementById("buyukluksecim").value
                      for (var m in Object.keys(secilecekobjelerineskirenkleri)){
                        var id_no=Object.keys(secilecekobjelerineskirenkleri)[m]
                      window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].bicim.gecerli_bicim="nokta"
                       window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].bicim.bicim.radius=yeni_boyut
                       window[class_id].tum_ozellikler.featuregroup.removeLayer(window[class_id].tum_ozellikler.objeler["'"+id_no+"'"]["feature"])

                       window[class_id].tum_ozellikler.objeler["'"+id_no+"'"]["feature"]= L.geoJSON(window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].geometrioznitelik,{
                        pointToLayer:function(feature,latlng){
                          return L.circleMarker(latlng,window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].bicim.bicim) //seçilen obje yeni rengiyle tekrar eklenir
                        }
                      }).addTo(window[class_id].tum_ozellikler.featuregroup)
                      }
                      return noktasalgosterimayarlari()
                    }
                    var saydamliklabel = document.createElement("label");
                    saydamliklabel.setAttribute("for","saydamliksecim");
                    saydamliklabel.innerText="Enter the Transparency Value.";
                    var saydamlikgirme = document.createElement("input");
                    saydamlikgirme.setAttribute("id","saydamliksecim");
                    saydamlikgirme.setAttribute("type","number");
                    saydamlikgirme.setAttribute("max","1");
                    saydamlikgirme.setAttribute("min","0");
                    saydamlikgirme.setAttribute("step","0.001");
                    saydamlikgirme.setAttribute("maxlength","1");
                    saydamlikgirme.required=true;
                    var saydamlikbuton= document.createElement("input");
                    saydamlikbuton.setAttribute("type","submit");
                    saydamlikbuton.setAttribute("value","Change");
                    /* Saydamlık Değiştirme */
                    saydamlikbuton.onclick=function(){
                      var yeni_saydamlik =document.getElementById("saydamliksecim").value
                      for (var m in Object.keys(secilecekobjelerineskirenkleri)){
                        var id_no=Object.keys(secilecekobjelerineskirenkleri)[m]
                      window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].bicim.gecerli_bicim="nokta"
                       window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].bicim.bicim.fillOpacity=yeni_saydamlik
                       window[class_id].tum_ozellikler.featuregroup.removeLayer(window[class_id].tum_ozellikler.objeler["'"+id_no+"'"]["feature"])

                       window[class_id].tum_ozellikler.objeler["'"+id_no+"'"]["feature"]= L.geoJSON(window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].geometrioznitelik,{
                        pointToLayer:function(feature,latlng){
                          return L.circleMarker(latlng,window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].bicim.bicim) //seçilen obje yeni rengiyle tekrar eklenir
                        }
                      }).addTo(window[class_id].tum_ozellikler.featuregroup)
                      }
                      return noktasalgosterimayarlari()
                    }

                    sayfamesajlari.appendChild(renksecimlabel)
                    sayfamesajlari.appendChild(renksecimkutusu)
                    sayfamesajlari.appendChild(renkalmabuton)
                    sayfamesajlari.appendChild(document.createElement("br"))
                    sayfamesajlari.appendChild(buyukluksecimlabel)
                    sayfamesajlari.appendChild(buyuklukgir)
                    sayfamesajlari.appendChild(buyuklukalbuton)
                    sayfamesajlari.appendChild(document.createElement("br"))
                    sayfamesajlari.appendChild(saydamliklabel)
                    sayfamesajlari.appendChild(saydamlikgirme)
                    sayfamesajlari.appendChild(saydamlikbuton)
                  }
                  var siniflandir=document.createElement("button")
                  siniflandir.innerText="Classify"
                  /* Sınıflandırma Yöntemi */
                  siniflandir.onclick=function(){
                      var id_no=Object.keys(secilecekobjelerineskirenkleri)[0]
                      var nitelik =Object.keys(window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].geometrioznitelik.properties)
                      if (nitelik.length===4){//Varsayılan kolonlar dışında bir kolon yoksa eğer, sınıflandırma yapılamaz
                        alert("The Object Does Not Have a Classifiable Column.")
                        return noktasalgosterimayarlari()
                      }
                    sayfamesajlari.innerText="zSelect Column for Classification. In Columns with Data Type 'Text', Attributes with Data Type 'Number' are Sorted According to Alphabet Order, and According to Value Size. Check Quality"
                    sayfamesajlari.appendChild(document.createElement("br"))
                    var kapatbuton=document.createElement("button")
                    kapatbuton.innerText="Finish"
                    kapatbuton.onclick=function(){
                      document.getElementById("sayfamesajlari").innerHTML=""
                      document.getElementById("sayfamesajlari").innerText=""
                    }
                    sayfamesajlari.appendChild(kapatbuton)
                    sayfamesajlari.appendChild(document.createElement("br"))  
                    var kolonsecimi = document.createElement("div")
                    kolonsecimi.style.width="300px"
                    kolonsecimi.style.height="100px"
                    kolonsecimi.style.overflow="scroll"
                    kolonsecimi.style.float="left"
                    kolonsecimi.setAttribute("id","kolonsecimi")
                    var referanssinif=document.createElement("div")
                    referanssinif.style.height="auto"
                    referanssinif.style.width="300px"
                    referanssinif.style.float="right"
                    /* Kolonların ismi ve tiplerinin yazılı olarak eklenmesi */
                    for (var v in nitelik){                      
                      if (v<4){}
                      else{
                        var buton = document.createElement("button")
                        var kolontip

                                                if (window[class_id].tum_ozellikler.kolon_ve_tipleri[nitelik[v]]==="text"){
                                                  kolontip="Column Data Type=     Text";
                                                }
                                                else if(window[class_id].tum_ozellikler.kolon_ve_tipleri[nitelik[v]]==="tam sayı"){
                                                  kolontip="Column Data Type=    Integer";
                                                }
                                                else if(window[class_id].tum_ozellikler.kolon_ve_tipleri[nitelik[v]]==="ondalıklı sayı"){
                                                  kolontip="Column Data Type=     Flaot";
                                                }
                                               
                        buton.innerText="Column Name: "+nitelik[v]+kolontip
                        buton.style.backgroundColor="black"
                        buton.style.color="white"
                        buton.style.border="1 px white solid"
                        /* Kolonlara tıklayınca açılacak menü */
                        buton.onclick=function(){
                          referanssinif.innerHTML=""
                          var rengegore=document.createElement("button")
                          rengegore.innerText="Classification by Color"
                          /* Renge Göre Sınıflandırma İşlemleri */
                          rengegore.onclick=function(){
                            sayfamesajlari.innerText=""
                            var sinifsayisilabel =document.createElement("label")
                            sinifsayisilabel.innerText="Enter the Number of Classes."
                            sinifsayisilabel.setAttribute("for","sinifsayisialma")
                            var sinifsayisigir=document.createElement("input")
                            sinifsayisigir.innerText="Enter the Number of Classes."
                            sinifsayisigir.setAttribute("type","number") 
                            sinifsayisigir.setAttribute("step","1")
                            sinifsayisigir.setAttribute("min","0")
                            sinifsayisigir.setAttribute("id","sinifsayisial")
                            var baslangicrenklabel = document.createElement("label")
                            baslangicrenklabel.setAttribute("for","baslangicrenk")
                            baslangicrenklabel.innerText="Choose the Start Color."
                            var baslangicrenk = document.createElement("input")
                            baslangicrenk.setAttribute("type","color")
                            baslangicrenk.setAttribute("id","baslangicrenk")
                            var bitisrenklabel = document.createElement("label")
                            bitisrenklabel.setAttribute("for","bitisrenk")
                            bitisrenklabel.innerText="Select Finish Color."
                            var bitisrenk = document.createElement("input")
                            bitisrenk.setAttribute("type","color")
                            bitisrenk.setAttribute("id","bitisrenk")
                            var degerlerial=document.createElement("input")
                            degerlerial.innerText="Apply"
                            degerlerial.setAttribute("type","submit")
                            /* Değerlerin Alınması */
                            degerlerial.onclick=function(){
                              var sinifsayisi = parseInt(document.getElementById("sinifsayisial").value)
                              var baslangic_rengi=document.getElementById("baslangicrenk").value
                              var bitisrengi= document.getElementById("bitisrenk").value
                              sayfamesajlari.innerHTML=""
                              var renkaralikalma= renksikalasiolusturma(baslangic_rengi,bitisrengi,sinifsayisi)
                              var renkaralik=renkaralikalma._renkaralik   
                              /* Kolon Tipi metinse eğer, yapılacak işlemlerin bloğu */
                              if (window[class_id].tum_ozellikler.kolon_ve_tipleri[nitelik[v]]==="text"){

                                var niteliksiralamasi = {}
                                /* Seçilen objelerin idleri ve niteliklerinin objeye atılması */
                                for (var c in Object.keys(secilecekobjelerineskirenkleri)){
                                  var id_no=Object.keys(secilecekobjelerineskirenkleri)[c]
                                  niteliksiralamasi[id_no] = window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].geometrioznitelik.properties[nitelik[v]]
                                }
                                /* niteliklerin ve renk aralıklarının sınıf sayısına göre puanlanması */
                                var puanlama = alfabeyegorepuanlama(niteliksiralamasi,sinifsayisi,renkaralik)
                                niteliksiralamasi=puanlama._yeninitelik
                                var puanlirenk=puanlama._puanlirenk
                                /* puanlanan obje ve renk aralıklarının eşleştiirlmesi */
                                for (var c in Object.keys(secilecekobjelerineskirenkleri)){
                                  var id_no=Object.keys(secilecekobjelerineskirenkleri)[c]
                                  var obje_puan = niteliksiralamasi[id_no]["puan"]
                                  for (var d in Object.keys(puanlirenk)){
                                    if (obje_puan>puanlirenk[Object.keys(puanlirenk)[d]].baslangic && obje_puan<=puanlirenk[Object.keys(puanlirenk)[d]].bitis){
                                      window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].bicim.bicim.fillColor=Object.keys(puanlirenk)[d]
                                      window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].bicim.gecerli_bicim="nokta"
                                      window[class_id].tum_ozellikler.featuregroup.removeLayer(window[class_id].tum_ozellikler.objeler["'"+id_no+"'"]["feature"])
                                      window[class_id].tum_ozellikler.objeler["'"+id_no+"'"]["feature"]= L.geoJSON(window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].geometrioznitelik,{
                                        pointToLayer:function(feature,latlng){
                                          return L.circleMarker(latlng,window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].bicim.bicim) //seçilen obje yeni rengiyle tekrar eklenir
                                        }
                                      }).addTo(window[class_id].tum_ozellikler.featuregroup)
                                    }
                                  }
                                }
                                 
                              }
                              /* Kolon tipi tam sayı veya ondalıklı sayı ise çalışacak blok */
                              else if (window[class_id].tum_ozellikler.kolon_ve_tipleri[nitelik[v]]!=="text"){
                                var niteliksiralamasi = {}
                                for (var c in Object.keys(secilecekobjelerineskirenkleri)){
                                  var id_no=Object.keys(secilecekobjelerineskirenkleri)[c]
                                  niteliksiralamasi[id_no] = window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].geometrioznitelik.properties[nitelik[v]]
                                }
                                var puanlama = sayiyagoresiralama(niteliksiralamasi,sinifsayisi,renkaralik)
                                niteliksiralamasi=puanlama._yeninitelik
                                var puanlirenk=puanlama._puanlirenk
                                for (var c in Object.keys(secilecekobjelerineskirenkleri)){
                                  var id_no=Object.keys(secilecekobjelerineskirenkleri)[c]
                                  var obje_puan = niteliksiralamasi[id_no]["puan"]
                                  for (var d in Object.keys(puanlirenk)){
                                    if (obje_puan===0){

                                    }
                                    if (obje_puan > puanlirenk[Object.keys(puanlirenk)[d]].baslangic && obje_puan <= puanlirenk[Object.keys(puanlirenk)[d]].bitis){
                                      window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].bicim.bicim.fillColor=Object.keys(puanlirenk)[d]
                                      window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].bicim.gecerli_bicim="nokta"
                                      window[class_id].tum_ozellikler.featuregroup.removeLayer(window[class_id].tum_ozellikler.objeler["'"+id_no+"'"]["feature"])
                                      window[class_id].tum_ozellikler.objeler["'"+id_no+"'"]["feature"]= L.geoJSON(window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].geometrioznitelik,{
                                        pointToLayer:function(feature,latlng){
                                          return L.circleMarker(latlng,window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].bicim.bicim) //seçilen obje yeni rengiyle tekrar eklenir
                                        }
                                      }).addTo(window[class_id].tum_ozellikler.featuregroup)
                                    }
                                  }
                                }
                              }
                              sayfamesajlari.innerHTML=""
                              sayfamesajlari.appendChild(document.createElement("br"))

                            
                            }
                          sayfamesajlari.innerHTML=""
                          sayfamesajlari.appendChild(sinifsayisilabel)
                          sayfamesajlari.appendChild(sinifsayisigir)
                          sayfamesajlari.appendChild(document.createElement("br"))
                          sayfamesajlari.appendChild(baslangicrenklabel)
                          sayfamesajlari.appendChild(baslangicrenk)
                          sayfamesajlari.appendChild(document.createElement("br"))
                          sayfamesajlari.appendChild(bitisrenklabel)
                          sayfamesajlari.appendChild(bitisrenk)
                          sayfamesajlari.appendChild(document.createElement("br"))
                          sayfamesajlari.appendChild(degerlerial)
                          }
                          var buyuklugegore=document.createElement("button")
                          buyuklugegore.innerText="Classification by Size"
                          /* Büyüklüğe göre sıralmaa yapımı */
                          buyuklugegore.onclick= function(){
                            sayfamesajlari.innerText=""
                            var sinifsayisilabel =document.createElement("label")
                            sinifsayisilabel.innerText="Enter the Number of Classes."
                            sinifsayisilabel.setAttribute("for","sinifsayisialma")
                            var sinifsayisigir=document.createElement("input")
                            sinifsayisigir.innerText="Enter the Number of Classes."
                            sinifsayisigir.setAttribute("type","number") 
                            sinifsayisigir.setAttribute("step","1")
                            sinifsayisigir.setAttribute("min","0")
                            sinifsayisigir.setAttribute("id","sinifsayisial")
                            var baslangicbuyukluklabel = document.createElement("label")
                            baslangicbuyukluklabel.setAttribute("for","baslangicbuyukluk")
                            baslangicbuyukluklabel.innerText="Enter Initial Size."
                            var baslangicbuyukluk = document.createElement("input")
                            baslangicbuyukluk.setAttribute("type","number")
                            baslangicbuyukluk.setAttribute("step","0.0001")
                            baslangicbuyukluk.setAttribute("id","baslangicbuyukluk")
                            var bitisbuyukluklabel = document.createElement("label")
                            bitisbuyukluklabel.setAttribute("for","bitisbuyukluk")
                            bitisbuyukluklabel.innerText="Enter End Size."
                            var bitisbuyukluk = document.createElement("input")
                            bitisbuyukluk.setAttribute("type","number")
                            bitisbuyukluk.setAttribute("step","0.0001")
                            bitisbuyukluk.setAttribute("id","bitisbuyukluk")
                            var degerlerial=document.createElement("input")
                            degerlerial.innerText="Apply"
                            degerlerial.setAttribute("type","submit")
                            /* değerlerin alınması */
                            degerlerial.onclick=function(){
                              var sinifsayisi = parseInt(document.getElementById("sinifsayisial").value)
                              var baslangicbuyukluk =parseFloat(document.getElementById("baslangicbuyukluk").value)
                              var bitisbuyukluk = parseFloat(document.getElementById("bitisbuyukluk").value)
                              sayfamesajlari.innerHTML=""
                              var renkaralik=[]
                              var artiss = (bitisbuyukluk-baslangicbuyukluk)/(sinifsayisi-1)
                                
                              for (i in range(1,sinifsayisi)){
                                var oge = baslangicbuyukluk+(parseInt(i)*artiss)
                                renkaralik.push(oge)
                                }
                                if (window[class_id].tum_ozellikler.kolon_ve_tipleri[nitelik[v]]==="text"){

                                  var niteliksiralamasi = {}
                                  for (var c in Object.keys(secilecekobjelerineskirenkleri)){
                                    var id_no=Object.keys(secilecekobjelerineskirenkleri)[c]
                                    niteliksiralamasi[id_no] = window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].geometrioznitelik.properties[nitelik[v]]
                                  }
                                  var puanlama = alfabeyegorepuanlama(niteliksiralamasi,sinifsayisi,renkaralik)
                                  niteliksiralamasi=puanlama._yeninitelik
                                  var puanlirenk=puanlama._puanlirenk
                                  for (var c in Object.keys(secilecekobjelerineskirenkleri)){
                                    var id_no=Object.keys(secilecekobjelerineskirenkleri)[c]
                                    var obje_puan = niteliksiralamasi[id_no]["puan"]
                                    for (var d in Object.keys(puanlirenk)){
                                      if (obje_puan>puanlirenk[Object.keys(puanlirenk)[d]].baslangic && obje_puan<=puanlirenk[Object.keys(puanlirenk)[d]].bitis){
                                        window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].bicim.bicim.radius=parseFloat(Object.keys(puanlirenk)[d])
                                        window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].bicim.gecerli_bicim="nokta"
                                        window[class_id].tum_ozellikler.featuregroup.removeLayer(window[class_id].tum_ozellikler.objeler["'"+id_no+"'"]["feature"])
                                        window[class_id].tum_ozellikler.objeler["'"+id_no+"'"]["feature"]= L.geoJSON(window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].geometrioznitelik,{
                                          pointToLayer:function(feature,latlng){
                                            return L.circleMarker(latlng,window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].bicim.bicim) //seçilen obje yeni rengiyle tekrar eklenir
                                          }
                                        }).addTo(window[class_id].tum_ozellikler.featuregroup)
                                      }
                                    }
                                  }
 
                                }
                                else if (window[class_id].tum_ozellikler.kolon_ve_tipleri[nitelik[v]]!=="text"){
                                  var niteliksiralamasi = {}
                                  for (var c in Object.keys(secilecekobjelerineskirenkleri)){
                                    var id_no=Object.keys(secilecekobjelerineskirenkleri)[c]
                                    niteliksiralamasi[id_no] = window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].geometrioznitelik.properties[nitelik[v]]
                                  }
                                  var puanlama = sayiyagoresiralama(niteliksiralamasi,sinifsayisi,renkaralik)
                                  niteliksiralamasi=puanlama._yeninitelik
                                  var puanlirenk=puanlama._puanlirenk
                                  for (var c in Object.keys(secilecekobjelerineskirenkleri)){
                                    var id_no=Object.keys(secilecekobjelerineskirenkleri)[c]
                                    var obje_puan = niteliksiralamasi[id_no]["puan"]
                                    for (var d in Object.keys(puanlirenk)){
                                      if (obje_puan>puanlirenk[Object.keys(puanlirenk)[d]].baslangic && obje_puan<=puanlirenk[Object.keys(puanlirenk)[d]].bitis){
                                        window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].bicim.bicim.radius=parseFloat(Object.keys(puanlirenk)[d])
                                        window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].bicim.gecerli_bicim="nokta"
                                        window[class_id].tum_ozellikler.featuregroup.removeLayer(window[class_id].tum_ozellikler.objeler["'"+id_no+"'"]["feature"])
                                        window[class_id].tum_ozellikler.objeler["'"+id_no+"'"]["feature"]= L.geoJSON(window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].geometrioznitelik,{
                                          pointToLayer:function(feature,latlng){
                                            return L.circleMarker(latlng,window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].bicim.bicim) //seçilen obje yeni rengiyle tekrar eklenir
                                          }
                                        }).addTo(window[class_id].tum_ozellikler.featuregroup)
                                      }
                                    }
                                  }
                                }
                            }
                            sayfamesajlari.innerHTML=""
                            sayfamesajlari.appendChild(sinifsayisilabel)
                            sayfamesajlari.appendChild(sinifsayisigir)
                            sayfamesajlari.appendChild(document.createElement("br"))
                            sayfamesajlari.appendChild(baslangicbuyukluklabel)
                            sayfamesajlari.appendChild(baslangicbuyukluk)
                            sayfamesajlari.appendChild(document.createElement("br"))
                            sayfamesajlari.appendChild(bitisbuyukluklabel)
                            sayfamesajlari.appendChild(bitisbuyukluk)
                            sayfamesajlari.appendChild(document.createElement("br"))
                            sayfamesajlari.appendChild(degerlerial)
                          }
                          var saydamligagore=document.createElement("button")
                          saydamligagore.innerText="Classification by Transparency"
                          saydamligagore.onclick =  function(){
                            sayfamesajlari.innerText="Transparency Values ​​range from 0-1. Decimal numbers are accepted. Enter Values ​​Accordingly."
                            var sinifsayisilabel =document.createElement("label")
                            sinifsayisilabel.innerText="Enter Number of Classes."
                            sinifsayisilabel.setAttribute("for","sinifsayisialma")
                            var sinifsayisigir=document.createElement("input")
                            sinifsayisigir.innerText="Enter Number of Classes"
                            sinifsayisigir.setAttribute("type","number") 
                            sinifsayisigir.setAttribute("step","1")
                            sinifsayisigir.setAttribute("min","0")
                            sinifsayisigir.setAttribute("id","sinifsayisial")
                            var saydamliklabel = document.createElement("label")
                            saydamliklabel.setAttribute("for","baslangicsaydamlik")
                            saydamliklabel.innerText="Enter the Minimum Transparency Amount."
                            var baslangicsaydamlik = document.createElement("input")
                            baslangicsaydamlik.setAttribute("type","number")
                            baslangicsaydamlik.setAttribute("min","0")
                            baslangicsaydamlik.setAttribute("step","0.0001")
                            baslangicsaydamlik.setAttribute("id","baslangicsaydamlik")
                            var bitissaydamliklabel = document.createElement("label")
                            bitissaydamliklabel.setAttribute("for","bitissaydamlik")
                            bitissaydamliklabel.innerText="Enter the Maximum Transparency Amount."
                            var bitissaydamlik = document.createElement("input")
                            bitissaydamlik.setAttribute("type","number")
                            bitissaydamlik.setAttribute("step","0.0001")
                            bitissaydamlik.setAttribute("max","1")
                            bitissaydamlik.setAttribute("id","bitissaydamlik")
                            var degerlerial=document.createElement("input")
                            degerlerial.innerText="Apply"
                            degerlerial.setAttribute("type","submit")
                            /* değerlerin alınması */
                            degerlerial.onclick=function(){
                              var sinifsayisi = parseInt(document.getElementById("sinifsayisial").value)
                              var baslangicbuyukluk =parseFloat(document.getElementById("baslangicsaydamlik").value)
                              var bitisbuyukluk = parseFloat(document.getElementById("bitissaydamlik").value)
                              sayfamesajlari.innerHTML=""
                              var renkaralik=[]
                              var artiss = (bitisbuyukluk-baslangicbuyukluk)/(sinifsayisi-1)
                                
                              for (i in range(1,sinifsayisi)){
                                var oge = baslangicbuyukluk+(parseInt(i)*artiss)
                                renkaralik.push(oge)
                                }
                                if (window[class_id].tum_ozellikler.kolon_ve_tipleri[nitelik[v]]==="text"){

                                  var niteliksiralamasi = {}
                                  for (var c in Object.keys(secilecekobjelerineskirenkleri)){
                                    var id_no=Object.keys(secilecekobjelerineskirenkleri)[c]
                                    niteliksiralamasi[id_no] = window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].geometrioznitelik.properties[nitelik[v]]
                                  }
                                  var puanlama = alfabeyegorepuanlama(niteliksiralamasi,sinifsayisi,renkaralik)
                                  niteliksiralamasi=puanlama._yeninitelik
                                  var puanlirenk=puanlama._puanlirenk
                                  for (var c in Object.keys(secilecekobjelerineskirenkleri)){
                                    var id_no=Object.keys(secilecekobjelerineskirenkleri)[c]
                                    var obje_puan = niteliksiralamasi[id_no]["puan"]
                                    for (var d in Object.keys(puanlirenk)){
                                      if (obje_puan>puanlirenk[Object.keys(puanlirenk)[d]].baslangic && obje_puan<=puanlirenk[Object.keys(puanlirenk)[d]].bitis){
                                        window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].bicim.bicim.fillOpacity=parseFloat(Object.keys(puanlirenk)[d])
                                        window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].bicim.gecerli_bicim="nokta"
                                        window[class_id].tum_ozellikler.featuregroup.removeLayer(window[class_id].tum_ozellikler.objeler["'"+id_no+"'"]["feature"])
                                        window[class_id].tum_ozellikler.objeler["'"+id_no+"'"]["feature"]= L.geoJSON(window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].geometrioznitelik,{
                                          pointToLayer:function(feature,latlng){
                                            return L.circleMarker(latlng,window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].bicim.bicim) //seçilen obje yeni rengiyle tekrar eklenir
                                          }
                                        }).addTo(window[class_id].tum_ozellikler.featuregroup)
                                      }
                                    }
                                  }
                                   
                                }
                                else if (window[class_id].tum_ozellikler.kolon_ve_tipleri[nitelik[v]]!=="text"){
                                  var niteliksiralamasi = {}
                                  for (var c in Object.keys(secilecekobjelerineskirenkleri)){
                                    var id_no=Object.keys(secilecekobjelerineskirenkleri)[c]
                                    niteliksiralamasi[id_no] = window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].geometrioznitelik.properties[nitelik[v]]
                                  }
                                  var puanlama = sayiyagoresiralama(niteliksiralamasi,sinifsayisi,renkaralik)
                                  niteliksiralamasi=puanlama._yeninitelik
                                  var puanlirenk=puanlama._puanlirenk
                                  for (var c in Object.keys(secilecekobjelerineskirenkleri)){
                                    var id_no=Object.keys(secilecekobjelerineskirenkleri)[c]
                                    var obje_puan = niteliksiralamasi[id_no]["puan"]
                                    for (var d in Object.keys(puanlirenk)){
                                      if (obje_puan>puanlirenk[Object.keys(puanlirenk)[d]].baslangic && obje_puan<=puanlirenk[Object.keys(puanlirenk)[d]].bitis){
                                        window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].bicim.bicim.fillOpacity=parseFloat(Object.keys(puanlirenk)[d])
                                        window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].bicim.gecerli_bicim="nokta"
                                        window[class_id].tum_ozellikler.featuregroup.removeLayer(window[class_id].tum_ozellikler.objeler["'"+id_no+"'"]["feature"])
                                        window[class_id].tum_ozellikler.objeler["'"+id_no+"'"]["feature"]= L.geoJSON(window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].geometrioznitelik,{
                                          pointToLayer:function(feature,latlng){
                                            return L.circleMarker(latlng,window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].bicim.bicim) //seçilen obje yeni rengiyle tekrar eklenir
                                          }
                                        }).addTo(window[class_id].tum_ozellikler.featuregroup)
                                      }
                                    }
                                  }
                                }
                            }
                            sayfamesajlari.innerHTML=""
                            sayfamesajlari.appendChild(sinifsayisilabel)
                            sayfamesajlari.appendChild(sinifsayisigir)
                            sayfamesajlari.appendChild(document.createElement("br"))
                            sayfamesajlari.appendChild(saydamliklabel)
                            sayfamesajlari.appendChild(baslangicsaydamlik)
                            sayfamesajlari.appendChild(document.createElement("br"))
                            sayfamesajlari.appendChild(bitissaydamliklabel)
                            sayfamesajlari.appendChild(bitissaydamlik)
                            sayfamesajlari.appendChild(document.createElement("br"))
                            sayfamesajlari.appendChild(degerlerial)
                          }
                          referanssinif.appendChild(rengegore)
                          referanssinif.appendChild(document.createElement("br"))
                          referanssinif.appendChild(buyuklugegore)
                          referanssinif.appendChild(document.createElement("br"))
                          referanssinif.appendChild(saydamligagore)
                        }
                        kolonsecimi.appendChild(buton)
                      }
                    }
                    sayfamesajlari.appendChild(kolonsecimi)
                    sayfamesajlari.appendChild(referanssinif)
                  }
                  sayfamesajlari.appendChild(document.createElement("br"))
                  sayfamesajlari.appendChild(tumuaynitip)
                  sayfamesajlari.appendChild(siniflandir)
                  sayfamesajlari.appendChild(document.createElement("br"))
                  var kapatbuton = document.createElement("button")
                  kapatbuton.innerText="Finish"
                  kapatbuton.onclick = function(){
                    for (var n in Object.keys(secilecekobjelerineskirenkleri)){
                      var id_no=Object.keys(secilecekobjelerineskirenkleri)[n]
                      if (window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].bicim.gecerli_bicim !=="simge"){
                      if (window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].bicim.bicim.fillColor==="#56ffff"){
                        window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].bicim.bicim.fillColor=secilecekobjelerineskirenkleri[id_no]
                        window[class_id].tum_ozellikler.featuregroup.removeLayer(window[class_id].tum_ozellikler.objeler["'"+id_no+"'"]["feature"])
                        
                        window[class_id].tum_ozellikler.objeler["'"+id_no+"'"]["feature"]= L.geoJSON(window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].geometrioznitelik,{
                          pointToLayer:function(feature,latlng){
                            return L.circleMarker(latlng,window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].bicim.bicim) //seçilen obje yeni rengiyle tekrar eklenir
                          }
                        }).addTo(window[class_id].tum_ozellikler.featuregroup)
                      }
                    }
                    else {
                      /* objenin yenilenemsi */
                      window[class_id].tum_ozellikler.featuregroup.removeLayer(window[class_id].tum_ozellikler.objeler["'"+id_no+"'"]["feature"])
                      window[class_id].tum_ozellikler.objeler["'"+id_no+"'"]["feature"]= L.geoJSON(window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].geometrioznitelik,{
                        pointToLayer:function(feature,latlng){
                          return L.marker(latlng,{icon:L.icon(window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].bicim.ikon),
                        opacity:window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].bicim.bicim.fillOpacity}) //seçilen obje yeni rengiyle tekrar eklenir
                        }
                      }).addTo(window[class_id].tum_ozellikler.featuregroup)
                    }
                    }
                    sayfamesajlari.innerText=""
                    sayfamesajlari.innerHTML=""
                    sayfamesajlari.style.backgroundColor="unset"
                    return
                  }
                  sayfamesajlari.appendChild(kapatbuton)

        }


        var simgeselgosterim = document.createElement("button")
        simgeselgosterim.innerText="symbolic representation"
        simgeselgosterim.onclick=function simgeselgosterimayarlari(){
          /* Noktasal Gösterim İçin İşlem Türü Seçimi */
          var sayfamesajlari = document.getElementById("sayfamesajlari")
          sayfamesajlari.innerText="Select Process Type"
          var tumuaynitip=document.createElement("button")
          tumuaynitip.innerText="Monotype"
          /* Tek Tip Objeler İçin Fonksiyonlar */
          tumuaynitip.onclick=function(){

            var sayfamesajlari = document.getElementById("sayfamesajlari")
            sayfamesajlari.innerHTML="You Can Add Icon with Url of Any Image"
            var urlilealmalabel = document.createElement("label")
            urlilealmalabel.setAttribute("for","urlilealma")
            urlilealmalabel.innerText="Image Url"
            var urlalma=document.createElement("input")
            urlalma.setAttribute("type","url")
            urlalma.setAttribute("id","urlilealma")
            var urluygula=document.createElement("input")
            urluygula.setAttribute("type","submit")
            urluygula.innerText="Apply"
            /* Renk Değiştirme */
            urluygula.onclick=function renksecim(){
              var urlkontrol = isValidURL(document.getElementById("urlilealma").value)
              var simge_url = document.getElementById("urlilealma").value
              if (urlkontrol===true && simge_url!==""){
                for (var m in Object.keys(secilecekobjelerineskirenkleri)){
                  var id_no=Object.keys(secilecekobjelerineskirenkleri)[m]
                  window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].bicim.gecerli_bicim="simge"
                  window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].bicim.ikon.iconUrl=simge_url
                  /* objenin yenilenemsi */
                  window[class_id].tum_ozellikler.featuregroup.removeLayer(window[class_id].tum_ozellikler.objeler["'"+id_no+"'"]["feature"])
                  window[class_id].tum_ozellikler.objeler["'"+id_no+"'"]["feature"]= L.geoJSON(window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].geometrioznitelik,{
                    pointToLayer:function(feature,latlng){
                      return L.marker(latlng,{icon:L.icon(window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].bicim.ikon),
                    opacity:window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].bicim.bicim.fillOpacity}) //seçilen obje yeni rengiyle tekrar eklenir
                    }
                  }).addTo(window[class_id].tum_ozellikler.featuregroup)
                }
              }
              return simgeselgosterimayarlari()
            }
            sayfamesajlari.appendChild(urlilealmalabel)
            sayfamesajlari.appendChild(urlalma)
            sayfamesajlari.appendChild(urluygula)
            sayfamesajlari.appendChild(document.createElement("br"))
            var sembolsecme = document.createElement("details")
            
            var sembolsecmesummary = document.createElement("summary")
            sembolsecmesummary.innerText="symbols"
            sembolsecmesummary.style.cursor="point"
            sembolsecmesummary.style.listStyle="none"
            sayfamesajlari.appendChild(sembolsecme)
            sembolsecme.appendChild(sembolsecmesummary)
            for (var sm in Object.keys(symbol_list)){
              var iconname = Object.keys(symbol_list)[sm]
              var iconnurl = Object.keys(symbol_list[iconname])[0]
              var iconaciklama = Object.values(symbol_list[iconname])[0]
              var symbollabel = document.createElement("label")
              symbollabel.innerText=iconaciklama
              symbollabel.setAttribute("for","'"+iconname+"'")
              var symbolal = document.createElement("input")
              symbolal.setAttribute("type","submit")
              symbolal.setAttribute("id","'"+iconname+"'_alma")
              symbolal.setAttribute("value",iconnurl)
              symbolal.setAttribute("onclick","window['"+class_id+"'].objeurluygula('"+class_id+"','"+iconnurl+"')")
              sembolsecme.appendChild(symbollabel)
              sembolsecme.appendChild(symbolal)
              sembolsecme.appendChild(document.createElement("br"))
            }
            sayfamesajlari.appendChild(document.createElement("br"))
            var buyukluksecimlabel = document.createElement("label")
            buyukluksecimlabel.setAttribute("for","buyukluksecim")
            buyukluksecimlabel.innerText="Enter the Radius of the Point."
            var buyuklukgir = document.createElement("input")
            buyuklukgir.setAttribute("id","buyukluksecim");
            buyuklukgir.setAttribute("type","number");
            buyuklukgir.setAttribute("maxlenght","1000");
            buyuklukgir.setAttribute("step","0.001");
            buyuklukgir.required=true;
            var buyuklukalbuton = document.createElement("input")
            buyuklukalbuton.innerText="Apply"
            buyuklukalbuton.setAttribute("type","submit")
            /* Büyüyklük Değiştirme */
            /*  sembole göre değiştirilecek */
            buyuklukalbuton.onclick=function(){

            }
            var saydamliklabel = document.createElement("label");
            saydamliklabel.setAttribute("for","saydamliksecim");
            saydamliklabel.innerText="Enter the Transparency Value.";
            var saydamlikgirme = document.createElement("input");
            saydamlikgirme.setAttribute("id","saydamliksecim");
            saydamlikgirme.setAttribute("type","number");
            saydamlikgirme.setAttribute("max","1");
            saydamlikgirme.setAttribute("min","0");
            saydamlikgirme.setAttribute("step","0.001");
            saydamlikgirme.setAttribute("maxlength","1");
            saydamlikgirme.required=true;
            var saydamlikbuton= document.createElement("input");
            saydamlikbuton.setAttribute("type","submit");
            saydamlikbuton.setAttribute("value","Change");
            /* Saydamlık Değiştirme */
            saydamlikbuton.onclick=function(){
              var yeni_saydamlik =document.getElementById("saydamliksecim").value
              for (var m in Object.keys(secilecekobjelerineskirenkleri)){
                var id_no=Object.keys(secilecekobjelerineskirenkleri)[m]
               window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].bicim.bicim.fillOpacity=yeni_saydamlik
               window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].bicim.gecerli_bicim="simge"
               window[class_id].tum_ozellikler.featuregroup.removeLayer(window[class_id].tum_ozellikler.objeler["'"+id_no+"'"]["feature"])
               window[class_id].tum_ozellikler.objeler["'"+id_no+"'"]["feature"]= L.geoJSON(window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].geometrioznitelik,{
                 pointToLayer:function(feature,latlng){
                   return L.marker(latlng,{icon:L.icon(window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].bicim.ikon),
                 opacity:window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].bicim.bicim.fillOpacity}) //seçilen obje yeni rengiyle tekrar eklenir
                 }
               }).addTo(window[class_id].tum_ozellikler.featuregroup)
              }
              return noktasalgosterimayarlari()
            }
            var kapatbuton = document.createElement("button")
            kapatbuton.innerText="Finish"
            kapatbuton.onclick=function(){
              sayfamesajlari.innerHTML=""
              return
            }

            sayfamesajlari.appendChild(buyukluksecimlabel)
            sayfamesajlari.appendChild(buyuklukgir)
            sayfamesajlari.appendChild(buyuklukalbuton)
            sayfamesajlari.appendChild(document.createElement("br"))
            sayfamesajlari.appendChild(saydamliklabel)
            sayfamesajlari.appendChild(saydamlikgirme)
            sayfamesajlari.appendChild(saydamlikbuton)
            sayfamesajlari.appendChild(document.createElement("br"))
            sayfamesajlari.appendChild(kapatbuton)
          }
          var siniflandir=document.createElement("button")
          siniflandir.innerText="Classify"
          /* Sınıflandırma Yöntemi */
          siniflandir.onclick=function(){
              var id_no=Object.keys(secilecekobjelerineskirenkleri)[0]
              if (window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].bicim.gecerli_bicim==="simge"){
              var nitelik =Object.keys(window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].geometrioznitelik.properties)
              if (nitelik.length===4){//Varsayılan kolonlar dışında bir kolon yoksa eğer, sınıflandırma yapılamaz
                alert("The Object Does Not Have a Classifiable Column.")
                return simgeselgosterimayarlari()
              }
            sayfamesajlari.innerText="Select Column for Classification. In Columns with Data Type 'Text', Attributes with Data Type 'Number' are Sorted According to Alphabet Order, and According to Value Size. Check Quality"
            sayfamesajlari.appendChild(document.createElement("br"))
            var kapatbuton=document.createElement("button")
            kapatbuton.innerText="Finish"
            kapatbuton.onclick=function(){
              document.getElementById("sayfamesajlari").innerHTML=""
              document.getElementById("sayfamesajlari").innerText=""
              return
            }
            sayfamesajlari.appendChild(kapatbuton)
            sayfamesajlari.appendChild(document.createElement("br"))  
            var kolonsecimi = document.createElement("div")
            kolonsecimi.style.width="300px"
            kolonsecimi.style.height="100px"
            kolonsecimi.style.overflow="scroll"
            kolonsecimi.style.float="left"
            kolonsecimi.setAttribute("id","kolonsecimi")
            var referanssinif=document.createElement("div")
            referanssinif.style.height="auto"
            referanssinif.style.width="300px"
            referanssinif.style.float="right"
            /* Kolonların ismi ve tiplerinin yazılı olarak eklenmesi */
            for (var v in nitelik){                      
              if (v<4){}
              else{
                var buton = document.createElement("button")
                var kolontip

                                        if (window[class_id].tum_ozellikler.kolon_ve_tipleri[nitelik[v]]==="Text"){
                                          kolontip="Column Data Type = Text";
                                        }
                                        else if(window[class_id].tum_ozellikler.kolon_ve_tipleri[nitelik[v]]==="Integer"){
                                          kolontip="Column Data Type = Integer";
                                        }
                                        else if(window[class_id].tum_ozellikler.kolon_ve_tipleri[nitelik[v]]==="Float"){
                                          kolontip="Column Data Type = Floatr";
                                        }
                                       
                buton.innerText="Column Name: "+nitelik[v]+kolontip
                buton.style.backgroundColor="black"
                buton.style.color="white"
                buton.style.border="1 px white solid"
                /* Kolonlara tıklayınca açılacak menü */
                buton.onclick=function(){
                  referanssinif.innerHTML=""
                  var buyuklugegore=document.createElement("button")
                  buyuklugegore.innerText="Classification by Size"
                  /* Büyüklüğe göre sıralmaa yapımı */
                  buyuklugegore.onclick= function(){
                    sayfamesajlari.innerText=""
                    var sinifsayisilabel =document.createElement("label")
                    sinifsayisilabel.innerText="Enter Number of Classes."
                    sinifsayisilabel.setAttribute("for","sinifsayisialma")
                    var sinifsayisigir=document.createElement("input")
                    sinifsayisigir.innerText="Enter Number of Classes"
                    sinifsayisigir.setAttribute("type","number") 
                    sinifsayisigir.setAttribute("step","1")
                    sinifsayisigir.setAttribute("min","0")
                    sinifsayisigir.setAttribute("id","sinifsayisial")
                    var baslangicbuyukluklabel = document.createElement("label")
                    baslangicbuyukluklabel.setAttribute("for","baslangicbuyukluk")
                    baslangicbuyukluklabel.innerText="Enter Initial Size."
                    var baslangicbuyukluk = document.createElement("input")
                    baslangicbuyukluk.setAttribute("type","number")
                    baslangicbuyukluk.setAttribute("step","0.0001")
                    baslangicbuyukluk.setAttribute("id","baslangicbuyukluk")
                    var bitisbuyukluklabel = document.createElement("label")
                    bitisbuyukluklabel.setAttribute("for","bitisbuyukluk")
                    bitisbuyukluklabel.innerText="Enter End Size."
                    var bitisbuyukluk = document.createElement("input")
                    bitisbuyukluk.setAttribute("type","number")
                    bitisbuyukluk.setAttribute("step","0.0001")
                    bitisbuyukluk.setAttribute("id","bitisbuyukluk")
                    var degerlerial=document.createElement("input")
                    degerlerial.innerText="Apply"
                    degerlerial.setAttribute("type","submit")
                    /* değerlerin alınması */
                    degerlerial.onclick=function(){
                      var sinifsayisi = parseInt(document.getElementById("sinifsayisial").value)
                      var baslangicbuyukluk =parseFloat(document.getElementById("baslangicbuyukluk").value)
                      var bitisbuyukluk = parseFloat(document.getElementById("bitisbuyukluk").value)
                      sayfamesajlari.innerHTML=""
                      var renkaralik=[]
                      var artiss = (bitisbuyukluk-baslangicbuyukluk)/(sinifsayisi-1)
                        
                      for (i in range(1,sinifsayisi)){
                        var oge = baslangicbuyukluk+(parseInt(i)*artiss)
                        renkaralik.push(oge)
                        }
                        if (window[class_id].tum_ozellikler.kolon_ve_tipleri[nitelik[v]]==="text"){

                          var niteliksiralamasi = {}
                          for (var c in Object.keys(secilecekobjelerineskirenkleri)){
                            var id_no=Object.keys(secilecekobjelerineskirenkleri)[c]
                            niteliksiralamasi[id_no] = window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].geometrioznitelik.properties[nitelik[v]]
                          }
                          var puanlama = alfabeyegorepuanlama(niteliksiralamasi,sinifsayisi,renkaralik)
                          niteliksiralamasi=puanlama._yeninitelik
                          var puanlirenk=puanlama._puanlirenk
                          for (var c in Object.keys(secilecekobjelerineskirenkleri)){
                            var id_no=Object.keys(secilecekobjelerineskirenkleri)[c]
                            var obje_puan = niteliksiralamasi[id_no]["puan"]
                            for (var d in Object.keys(puanlirenk)){
                              if (obje_puan>puanlirenk[Object.keys(puanlirenk)[d]].baslangic && obje_puan<=puanlirenk[Object.keys(puanlirenk)[d]].bitis){
                                window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].bicim.ikon.iconSize=[parseFloat(Object.keys(puanlirenk)[d]),parseFloat(Object.keys(puanlirenk)[d])]
                                window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].bicim.gecerli_bicim="simge"
                                window[class_id].tum_ozellikler.featuregroup.removeLayer(window[class_id].tum_ozellikler.objeler["'"+id_no+"'"]["feature"])
                                window[class_id].tum_ozellikler.objeler["'"+id_no+"'"]["feature"]= L.geoJSON(window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].geometrioznitelik,{
                                  pointToLayer:function(feature,latlng){
                                    return L.marker(latlng,{icon:L.icon(window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].bicim.ikon),
                                  opacity:window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].bicim.bicim.fillOpacity}
                                      ) //seçilen obje yeni rengiyle tekrar eklenir
                                  }
                                }).addTo(window[class_id].tum_ozellikler.featuregroup)
                              }
                            }
                          }
                           
                        }
                        else if (window[class_id].tum_ozellikler.kolon_ve_tipleri[nitelik[v]]!=="text"){
                          var niteliksiralamasi = {}
                          for (var c in Object.keys(secilecekobjelerineskirenkleri)){
                            var id_no=Object.keys(secilecekobjelerineskirenkleri)[c]
                            niteliksiralamasi[id_no] = window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].geometrioznitelik.properties[nitelik[v]]
                          }
                          var puanlama = sayiyagoresiralama(niteliksiralamasi,sinifsayisi,renkaralik)
                          niteliksiralamasi=puanlama._yeninitelik
                          var puanlirenk=puanlama._puanlirenk
                          for (var c in Object.keys(secilecekobjelerineskirenkleri)){
                            var id_no=Object.keys(secilecekobjelerineskirenkleri)[c]
                            var obje_puan = niteliksiralamasi[id_no]["puan"]
                            for (var d in Object.keys(puanlirenk)){
                              if (obje_puan>puanlirenk[Object.keys(puanlirenk)[d]].baslangic && obje_puan<=puanlirenk[Object.keys(puanlirenk)[d]].bitis){
                                window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].bicim.ikon.iconSize=[parseFloat(Object.keys(puanlirenk)[d]),parseFloat(Object.keys(puanlirenk)[d])]
                                window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].bicim.gecerli_bicim="simge"
                                window[class_id].tum_ozellikler.featuregroup.removeLayer(window[class_id].tum_ozellikler.objeler["'"+id_no+"'"]["feature"])
                                window[class_id].tum_ozellikler.objeler["'"+id_no+"'"]["feature"]= L.geoJSON(window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].geometrioznitelik,{
                                  pointToLayer:function(feature,latlng){
                                    return L.marker(latlng,{icon:L.icon(window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].bicim.ikon),
                                  opacity:window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].bicim.bicim.fillOpacity}
                                      ) //seçilen obje yeni rengiyle tekrar eklenir
                                  }
                                }).addTo(window[class_id].tum_ozellikler.featuregroup)
                              }
                            }
                          }
                        }
                    }
                    sayfamesajlari.innerHTML=""
                    sayfamesajlari.appendChild(sinifsayisilabel)
                    sayfamesajlari.appendChild(sinifsayisigir)
                    sayfamesajlari.appendChild(document.createElement("br"))
                    sayfamesajlari.appendChild(baslangicbuyukluklabel)
                    sayfamesajlari.appendChild(baslangicbuyukluk)
                    sayfamesajlari.appendChild(document.createElement("br"))
                    sayfamesajlari.appendChild(bitisbuyukluklabel)
                    sayfamesajlari.appendChild(bitisbuyukluk)
                    sayfamesajlari.appendChild(document.createElement("br"))
                    sayfamesajlari.appendChild(degerlerial)

                  }
                  var saydamligagore=document.createElement("button")
                  saydamligagore.innerText="Classification by Transparency"
                  saydamligagore.onclick =  function(){
                    
                  }
                  referanssinif.appendChild(buyuklugegore)
                  referanssinif.appendChild(document.createElement("br"))
                  referanssinif.appendChild(saydamligagore)
                }
                kolonsecimi.appendChild(buton)
              }
            }
            sayfamesajlari.appendChild(kolonsecimi)
            sayfamesajlari.appendChild(referanssinif)
          }
          else{alert("Before this process, you need to select an icon.")}
          }
          sayfamesajlari.appendChild(document.createElement("br"))
          sayfamesajlari.appendChild(tumuaynitip)
          sayfamesajlari.appendChild(siniflandir)
          sayfamesajlari.appendChild(document.createElement("br"))
          var kapatbuton = document.createElement("button")
          kapatbuton.innerText="Finish"
          kapatbuton.onclick = function(){
            for (var n in Object.keys(secilecekobjelerineskirenkleri)){
              var id_no=Object.keys(secilecekobjelerineskirenkleri)[n]
              if (window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].bicim.gecerli_bicim !=="simge"){
              if (window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].bicim.bicim.fillColor==="#56ffff"){
                window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].bicim.bicim.fillColor=secilecekobjelerineskirenkleri[id_no]
                window[class_id].tum_ozellikler.featuregroup.removeLayer(window[class_id].tum_ozellikler.objeler["'"+id_no+"'"]["feature"])
                
                window[class_id].tum_ozellikler.objeler["'"+id_no+"'"]["feature"]= L.geoJSON(window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].geometrioznitelik,{
                  pointToLayer:function(feature,latlng){
                    return L.circleMarker(latlng,window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].bicim.bicim) //seçilen obje yeni rengiyle tekrar eklenir
                  }
                }).addTo(window[class_id].tum_ozellikler.featuregroup)
              }
            }
            else {
              /* objenin yenilenemsi */
              window[class_id].tum_ozellikler.featuregroup.removeLayer(window[class_id].tum_ozellikler.objeler["'"+id_no+"'"]["feature"])
              window[class_id].tum_ozellikler.objeler["'"+id_no+"'"]["feature"]= L.geoJSON(window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].geometrioznitelik,{
                pointToLayer:function(feature,latlng){
                  return L.marker(latlng,{icon:L.icon(window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].bicim.ikon),
                opacity:window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].bicim.bicim.fillOpacity}) //seçilen obje yeni rengiyle tekrar eklenir
                }
              }).addTo(window[class_id].tum_ozellikler.featuregroup)
            }
            }
            sayfamesajlari.innerText=""
            sayfamesajlari.innerHTML=""
            sayfamesajlari.style.backgroundColor="unset"
            return
          }
          sayfamesajlari.appendChild(kapatbuton)
          
        
}
        sayfamesajlari.appendChild(noktagosterimayarlari)
        sayfamesajlari.appendChild(simgeselgosterim)
        sayfamesajlari.appendChild(document.createElement("br"))
        var kapatbuton = document.createElement("button")
        kapatbuton.innerText="Finish"
        kapatbuton.onclick = function(){
          for (var n in Object.keys(secilecekobjelerineskirenkleri)){
            var id_no=Object.keys(secilecekobjelerineskirenkleri)[n]
            if (window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].bicim.gecerli_bicim !=="simge"){
            if (window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].bicim.bicim.fillColor==="#56ffff"){
              window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].bicim.bicim.fillColor=secilecekobjelerineskirenkleri[id_no]
              window[class_id].tum_ozellikler.featuregroup.removeLayer(window[class_id].tum_ozellikler.objeler["'"+id_no+"'"]["feature"])
              
              window[class_id].tum_ozellikler.objeler["'"+id_no+"'"]["feature"]= L.geoJSON(window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].geometrioznitelik,{
                pointToLayer:function(feature,latlng){
                  return L.circleMarker(latlng,window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].bicim.bicim) //seçilen obje yeni rengiyle tekrar eklenir
                }
              }).addTo(window[class_id].tum_ozellikler.featuregroup)
            }
          }
          else {
            /* objenin yenilenemsi */
            window[class_id].tum_ozellikler.featuregroup.removeLayer(window[class_id].tum_ozellikler.objeler["'"+id_no+"'"]["feature"])
            window[class_id].tum_ozellikler.objeler["'"+id_no+"'"]["feature"]= L.geoJSON(window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].geometrioznitelik,{
              pointToLayer:function(feature,latlng){
                return L.marker(latlng,{icon:L.icon(window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].bicim.ikon),
              opacity:window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].bicim.bicim.fillOpacity}) //seçilen obje yeni rengiyle tekrar eklenir
              }
            }).addTo(window[class_id].tum_ozellikler.featuregroup)
          }
          }
          sayfamesajlari.innerText=""
          sayfamesajlari.innerHTML=""
          sayfamesajlari.style.backgroundColor="unset"
          return
        }
        sayfamesajlari.appendChild(kapatbuton)
        return
      }
      objeurluygula(class_id,sembol_url){
        for (var i in Object.keys(secilecekobjelerineskirenkleri)){
          
          var id_no=Object.keys(secilecekobjelerineskirenkleri)[i]
          window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].bicim.gecerli_bicim="simge"
          window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].bicim.ikon.iconUrl=sembol_url
          /* objenin yenilenemsi */
          window[class_id].tum_ozellikler.featuregroup.removeLayer(window[class_id].tum_ozellikler.objeler["'"+id_no+"'"]["feature"])
          window[class_id].tum_ozellikler.objeler["'"+id_no+"'"]["feature"]= L.geoJSON(window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].geometrioznitelik,{
            pointToLayer:function(feature,latlng){
              return L.marker(latlng,{icon:L.icon(window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].bicim.ikon),
            opacity:window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].bicim.bicim.fillOpacity}) //seçilen obje yeni rengiyle tekrar eklenir
            }
          }).addTo(window[class_id].tum_ozellikler.featuregroup)
        }
        return
      }
}
var secilecekobjelerineskirenkleri={}
async function sureli_bekleme(x){
  await sleep(x)
  return
}


class GradientColor {
  constructor(startColor = "", endColor = "", minNum = 0, maxNum = 10) {
    this.setColorGradient = (colorStart, colorEnd) => {
      startColor = getHexColor(colorStart);
      endColor = getHexColor(colorEnd);
    };

    this.setMidpoint = (minNumber, maxNumber) => {
      minNum = minNumber;
      maxNum = maxNumber;
    };

    this.getColor = (numberValue) => {
      if (numberValue) {
        return (
          "#" +
          generateHex(
            numberValue,
            startColor.substring(0, 2),
            endColor.substring(0, 2)
          ) +
          generateHex(
            numberValue,
            startColor.substring(2, 4),
            endColor.substring(2, 4)
          ) +
          generateHex(
            numberValue,
            startColor.substring(4, 6),
            endColor.substring(4, 6)
          )
        );
      }
    };

    const generateHex = (number, start, end) => {
      if (number < minNum) {
        number = minNum;
      } else if (number > maxNum) {
        number = maxNum;
      }

      const midPoint = maxNum - minNum;
      const startBase = parseInt(start, 16);
      const endBase = parseInt(end, 16);
      const average = (endBase - startBase) / midPoint;
      const finalBase = Math.round(average * (number - minNum) + startBase);
      const balancedFinalBase =
        finalBase < 16 ? "0" + finalBase.toString(16) : finalBase.toString(16);
      return balancedFinalBase;
    };

    const getHexColor = (color) => {
      return color.substring(color.length - 6, color.length);
    };
  }
}

class Gradient {
  constructor(
    colorGradients = "",
    maxNum = 10,
    colors = ["", ""],
    intervals = []
  ) {
    const setColorGradient = (gradientColors) => {
      if (gradientColors.length < 2) {
        throw new Error(
          `setColorGradient should have more than ${gradientColors.length} color`
        );
      } else {
        const increment = maxNum / (gradientColors.length - 1);
        const firstColorGradient = new GradientColor();
        const lower = 0;
        const upper = 0 + increment;
        firstColorGradient.setColorGradient(
          gradientColors[0],
          gradientColors[1]
        );
        firstColorGradient.setMidpoint(lower, upper);
        colorGradients = [firstColorGradient];
        intervals = [
          {
            lower,
            upper,
          },
        ];

        for (let i = 1; i < gradientColors.length - 1; i++) {
          const gradientColor = new GradientColor();
          const lower = 0 + increment * i;
          const upper = 0 + increment * (i + 1);
          gradientColor.setColorGradient(
            gradientColors[i],
            gradientColors[i + 1]
          );
          gradientColor.setMidpoint(lower, upper);
          colorGradients[i] = gradientColor;
          intervals[i] = {
            lower,
            upper,
          };
        }
        colors = gradientColors;
      }
    };

    this.setColorGradient = (...gradientColors) => {
      setColorGradient(gradientColors);
      return this;
    };

    this.getColors = () => {
      const gradientColorsArray = [];
      for (let j = 0; j < intervals.length; j++) {
        const interval = intervals[j];
        const start = interval.lower === 0 ? 1 : Math.ceil(interval.lower);
        const end =
          interval.upper === maxNum
            ? interval.upper + 1
            : Math.ceil(interval.upper);
        for (let i = start; i < end; i++) {
          gradientColorsArray.push(colorGradients[j].getColor(i));
        }
      }
      return gradientColorsArray;
    };

    this.getColor = (numberValue) => {
      if (isNaN(numberValue)) {
        throw new TypeError(`getColor should be a number`);
      } else if (numberValue <= 0) {
        throw new TypeError(`getColor should be greater than ${numberValue}`);
      } else {
        const toInsert = numberValue + 1;
        const segment = (maxNum - 0) / colorGradients.length;
        const index = Math.min(
          Math.floor((Math.max(numberValue, 0) - 0) / segment),
          colorGradients.length - 1
        );
        return colorGradients[index].getColor(toInsert);
      }
    };

    this.setMidpoint = (maxNumber) => {
      if (!isNaN(maxNumber) && maxNumber >= 0) {
        maxNum = maxNumber;
        setColorGradient(colors);
      } else if (maxNumber <= 0) {
        throw new RangeError(`midPoint should be greater than ${maxNumber}`);
      } else {
        throw new RangeError("midPoint should be a number");
      }
      return this;
    };
  }
}

function renksikalasiolusturma(baslangic_rengi,bitis_rengi,araliksayisi){
  var baslangic_rengi=baslangic_rengi
  var bitis_rengi=bitis_rengi
  var araliksayisi=araliksayisi
  var renkaralik = new Gradient()
    .setColorGradient(baslangic_rengi, bitis_rengi)
    .setMidpoint(araliksayisi)
    .getColors();
  return {
    _renkaralik:renkaralik
  }
  }



var puanlı_liste ={
"a": 3.125,
"b": 6.25,
"c": 9.375,
"d": 15.625,
"e": 18.75,
"f": 21.875,
"g": 25,
"h": 31.25,
"i": 37.5,
"j": 40.625,
"k": 43.75,
"l": 46.875,
"m": 50,
"n": 53.125,
"o": 56.25,
"p": 62.5,
"q": 65.625,
"r": 68.75,
"s": 71.875,
"t": 78.125,
"u": 81.25,
"v": 87.5,
"w": 93.75,
"x": 90.625,
"y": 96.875,
"z": 100,
"ç": 12.5,
"ö": 59.375,
"ü": 84.375,
"ğ": 28.125,
"ı": 34.375,
"ş": 75
}

/* SINIFLANDIRMA İŞLEMİNDE SÖZEL NİTELİKLERDE PUANLAMA HESABI */
function alfabeyegorepuanlama(nitelikler,sinifsayisi,renkaralik){
  var nitelikler=nitelikler
  var dilimaralik = 100/sinifsayisi
  var sinifsayisiaralik={}
  var sinifsayisi=sinifsayisi
  var renkaralik=renkaralik
  for (var j in renkaralik){
    var no = parseInt(j)

          if (no===0){
          sinifsayisiaralik[renkaralik[no]]= {"baslangic":0,
                                              "bitis":dilimaralik*(no+1)}
          }
    
          else if (0  < no && no < sinifsayisi-1) {

          var oncekibaslangic = sinifsayisiaralik[renkaralik[no-1]].bitis


          sinifsayisiaralik[renkaralik[parseInt(no)]]= {"baslangic":oncekibaslangic,
          "bitis":dilimaralik*(no+1)}
          
          }

          if (no===sinifsayisi-1){

            var oncekibaslangic = sinifsayisiaralik[renkaralik[no-1]].bitis

            sinifsayisiaralik[renkaralik[parseInt(no)]]= {"baslangic":oncekibaslangic,
            "bitis":100}
          }
          }

          for (var d in Object.keys(nitelikler)){
            
            var c = parseInt(d)
            var object_id = Object.keys(nitelikler)[c]
            var objenitelik = nitelikler[Object.keys(nitelikler)[c]]

            nitelikler[object_id] = {"tip":"text",
                                    "puan":parseFloat(puanlı_liste[objenitelik[0]].toString())}
          if (parseFloat(puanlı_liste[objenitelik[0]].toString())===0){
            nitelikler[object_id] = {"tip":"text",
                                  "puan":1}
          }
          }
          return {_yeninitelik:nitelikler,
                  _puanlirenk:sinifsayisiaralik}
          }
/* SINIFLANDIRMA İŞLEMİNDE SAYISAL NİTELİİKLERDE PUANLAMA HESABI */
function sayiyagoresiralama(nitelikler,sinifsayisi,renkaralik){
  var nitelikler=nitelikler
  var dilimaralik = 100/sinifsayisi
  var sinifsayisiaralik={}
  var sinifsayisi=sinifsayisi
  var renkaralik=renkaralik
  var nitelik_valueler = []
  for (var j in renkaralik){
    var no = parseInt(j)

          if (no===0){
          sinifsayisiaralik[renkaralik[no]]= {"baslangic":0,
                                              "bitis":dilimaralik*(no+1)}
          }
    
          else if (0  < no && no < sinifsayisi-1) {

          var oncekibaslangic = sinifsayisiaralik[renkaralik[no-1]].bitis


          sinifsayisiaralik[renkaralik[parseInt(no)]]= {"baslangic":oncekibaslangic,
          "bitis":dilimaralik*(no+1)}
          
          }

          if (no===sinifsayisi-1){

            var oncekibaslangic = sinifsayisiaralik[renkaralik[no-1]].bitis

            sinifsayisiaralik[renkaralik[parseInt(no)]]= {"baslangic":oncekibaslangic,
            "bitis":100}
          }
          }

          for (var d in Object.values(nitelikler)){
            var c = parseInt(d)
            var object_id = Object.keys(nitelikler)[c]
          if (nitelikler[Object.keys(nitelikler)[c]]===NaN || nitelikler[Object.keys(nitelikler)[c]]===undefined || nitelikler[Object.keys(nitelikler)[c]]===null){
              nitelikler[Object.keys(nitelikler)[c]]= 0
          }
           nitelik_valueler.push(nitelikler[Object.keys(nitelikler)[c]])
           nitelik_valueler.sort((a, b) => a - b)

          }
          var enbuyukdeger = nitelik_valueler[nitelik_valueler.length-1]
          var enkucukdeger = nitelik_valueler[0]
          var aralik = enbuyukdeger-enkucukdeger
          var formul = 100/(nitelik_valueler.length-1)

          for (var d in Object.keys(nitelikler)){
            
            var c = parseInt(d) 
            var object_id = Object.keys(nitelikler)[c]
            var objenitelik = parseFloat(nitelikler[Object.keys(nitelikler)[c]])
            var formul = (objenitelik-enkucukdeger) * (100/(enbuyukdeger-enkucukdeger))
            nitelikler[object_id] = {"tip":"sayı",
                                      "puan":formul}
            if (formul===0){
              nitelikler[object_id] = {"tip":"sayı",
              "puan":0.1}
            }
          }

          return {_yeninitelik:nitelikler,
                  _puanlirenk:sinifsayisiaralik}
}


