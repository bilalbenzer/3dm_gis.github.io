var gecici_mousemove_durumu =""

function create_polygon(katman_name){
    var sayfamesajlari=document.getElementById('sayfamesajlari')
    document.getElementById("oznitelikpenceresi").innerHTML="";
    var name = katman_name
    document.getElementById('sayfamesajlari').style.backgroundColor  = "black";    
    if ((typeof window[name])!=="object"){
        document.getElementById('sayfamesajlari').innerText="Polygon Layer created\n"+name;//sayfa mesajlarında objenin oluştuğuna dair bilgi
        window[name] = new multi_polygon(class_name=name)
        window[name].menuleriolustur()
      return create_polygon(name)
    }
    else{
      sayfamesajlari.innerHTML=""
      sayfamesajlari.style.backgroundColor="black"
      var cizimebasla = document.createElement("button")
      cizimebasla.innerText="Start"
      cizimebasla.onclick=function(){
      sayfamesajlari.innerHTML=""
      sayfamesajlari.innerText="Start For New Object."
      var bitirbuton = document.createElement("button")
      bitirbuton.innerText="Finish Object Draw"
      bitirbuton.setAttribute("id","objecizimdevam")
      sayfamesajlari.appendChild(bitirbuton)
      var noktalar = [[]]
      var asd
      if (noktalar.length===1){
        var stylee = {
            color: "#00FFFF",
            weight: 4,
            fillOpacity: .4,
            dashArray: '10,15',
            lineJoin: 'round'
        }
        map.on("mousemove",function onizleme(e){
          sayfamesajlari.removeChild(bitirbuton)
          sayfamesajlari.appendChild(bitirbuton)
          map.off("click")
          try{map.removeLayer(asd)}catch{}
          asd =""
          var xx = (e.latlng.lat).toFixed(8)
          var yy = (e.latlng.lng).toFixed(8)
          noktalar[0].push([parseFloat(yy),parseFloat(xx)])

          var line = [{
              "type":"Polygon",
              "coordinates":noktalar
          }]
          asd = L.geoJSON(line,{
              style:stylee
          }).addTo(map)
          noktalar[0].splice(noktalar[0].indexOf([parseFloat(yy),parseFloat(xx)]),1)
          map.on("click", function(c){
            
            noktalar[0].push([parseFloat(yy),parseFloat(xx)])
          if (noktalar[0].length>2){
              bitirbuton.onclick=function(){
              map.off("click")
              map.off("mousemove",onizleme)
              try{
                map.removeLayer(asd)
              }
              catch{}
              sayfamesajlari.innerHTML="Process Finished"
              bekleme()
              return create_polygon(name)
            }
            
            document.getElementById("objecizimdevam").onclick= function(){
              map.off("click")
              map.off("mousemove",onizleme)
                try{
                map.removeLayer(asd)} catch{
                }

                var name2 = "polygon"+(new Date()).getMilliseconds()+Math.floor(Math.random()*1000);//benzersiz obje id alma
                window[name].objeler_ve_ozellikleri(noktalar,name2)
                window[name].haritayaekle(window[name].tum_ozellikler.objeler["'"+name2+"'"].bicim,name2)
                sayfamesajlari.innerText=name2+"object has been created."
                return create_polygon(name)
            }
          }
          })

        })
      }


    }
    sayfamesajlari.appendChild(cizimebasla)
    var cizimibitir = document.createElement("button")
    cizimibitir.innerText="Finish Draw"
    cizimibitir.onclick=function(){
      try{
        map.removeLayer(asd)
      }
      catch{}
      sayfamesajlari.innerHTML="Process Finished"
      bekleme()
      return
    }
    sayfamesajlari.appendChild(cizimibitir)
    }
}
var sayfamesajlari = document.getElementById("sayfamesajlari")
var satiratla = document.createElement("br")
class multi_polygon{
    constructor (class_name){
        this.tum_ozellikler = { //çoklu çizgiye ilişkin tüm özellikler bu objede tutulacak
            "id_nosu":class_name, //class a ait isim bu dizede tutulacak
            "objeler":{ //oluşturulan objeler ve özellikleri bu dizede tutulacak
            },
            "objeler_ve_id_nolari":[],  //oluşan objelerin id noları bu listede tutulacak
            "featuregroup":L.featureGroup().addTo(map), //tüm objeler bir grupta olacak ve bu grup haritaya eklencek
            "kolon_ve_tipleri":{"featureid" : "text",
                                "Geometry Type" : "Polygon"},
            "coordinats":[],  //yaklaşma işlevi için koordinatlar bu listede tutulacak
          }
            this.renk = renk_listesi[Math.floor(Math.random()*renk_listesi.length)]
    }
    objeler_ve_ozellikleri(coordinates,object_name){  //çoklu point oluşturma kısmında oluşturulacak pointe ilişkin parametreler bu metotta işlenecek ve class a eklenecek
        this.tum_ozellikler.objeler_ve_id_nolari.push(object_name.toString()) //obje id si ilgili yerine eklenecek
        this.tum_ozellikler.objeler["'"+object_name+"'"] ={geometrioznitelik:{  //eklenen objenin id nosu ile bir dize oluşturulacak ve tüm özellikleri eklenecek
                                                                                "type":"Feature",
                                                                                "properties": {
                                                                                                "featureid" : object_name,
                                                                                                "Geometry Type" : "Polygon"
                                                                                                },
                                                                                "geometry":   {
                                                                                                "type":"Polygon",
                                                                                                "coordinates":coordinates
                                                                                              }
                                                                              },
                                                          bicim:{
                                                                                bicim:{
                                                                                    color: this.renk,
                                                                                    weight: 1,
                                                                                    opacity: 1,
                                                                                    fillOpacity:1
                                                                                },
                                                                                  gecerli_bicim:"Çokgen"
                                                                              },
                                                          feature:null
                                                          }
                                                          /* 
Option	Type	Default	Description
stroke	Boolean	true	Whether to draw stroke along the path. Set it to false to disable borders on polygons or circles.
color	String	'#03f'	Stroke color.
weight	Number	5	Stroke width in pixels.
opacity	Number	0.5	Stroke opacity.
fill	Boolean	depends	Whether to fill the path with color. Set it to false to disable filling on polygons or circles.
fillColor	String	same as color	Fill color.
fillOpacity	Number	0.2	Fill opacity.
fillRule	String	'evenodd'	A string that defines how the inside of a shape is determined.
dashArray	String	null	A string that defines the stroke dash pattern. Doesn't work on canvas-powered layers (e.g. Android 2).
lineCap	String	null	A string that defines shape to be used at the end of the stroke.
lineJoin	String	null	A string that defines shape to be used at the corners of the stroke.
clickable	Boolean	true	If false, the vector will not emit mouse events and will act as a part of the underlying map.
pointerEvents	String	null	Sets the pointer-events attribute on the path if SVG backend is used.
className	String	''	Custom class name set on an element. */
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
        document.getElementById(this.tum_ozellikler.id_nosu).getElementsByTagName("button")[5].setAttribute('onclick',"window['"+this.tum_ozellikler.id_nosu+"'].stildegistirme('"+this.tum_ozellikler.id_nosu+"')");
        document.getElementById(this.tum_ozellikler.id_nosu).getElementsByTagName("button")[6].setAttribute('onclick',"window['"+this.tum_ozellikler.id_nosu+"'].oznitelikgoruntulemeveduzenleme('"+this.tum_ozellikler.id_nosu+"')");
        return
      }
      haritayaekle(object_bicim,object_id){
        this.tum_ozellikler.objeler["'"+object_id+"'"].feature = L.geoJSON(this.tum_ozellikler.objeler["'"+object_id+"'"].geometrioznitelik,{
            style:object_bicim.bicim
        })
        this.tum_ozellikler.objeler["'"+object_id+"'"]["feature"] = this.tum_ozellikler.objeler["'"+object_id+"'"].feature //oluşan layer, classtaki dizesine verilecek
        this.tum_ozellikler.objeler["'"+object_id+"'"].feature.addTo(this.tum_ozellikler.featuregroup) //oluşan layer, featuregroupa eklenerek haritaya eklenecek
        map_layers.push(this.tum_ozellikler.featuregroup.getLayerId(this.tum_ozellikler.objeler["'"+object_id+"'"].feature)) //obje id si map_layers listesine eklenecek
        this.tum_ozellikler.objeler["'"+object_id+"'"]["featureid"]=this.tum_ozellikler.featuregroup.getLayerId(this.tum_ozellikler.objeler["'"+object_id+"'"].feature)
        if (map_layers_id_nolari.includes(window[this.tum_ozellikler.id_nosu])===false){  //class ın tüm özellikleri map_layers_id_nolari na iletilecek
        map_layers_id_nolari.push(window[this.tum_ozellikler.id_nosu])
        }
    for (var c in this.tum_ozellikler.objeler["'"+object_id+"'"].geometrioznitelik.geometry.coordinates[0]){
        this.tum_ozellikler.coordinats.push([this.tum_ozellikler.objeler["'"+object_id+"'"].geometrioznitelik.geometry.coordinates[0][c][1],this.tum_ozellikler.objeler["'"+object_id+"'"].geometrioznitelik.geometry.coordinates[0][c][0]])
    }
    return
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
        return
      }
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
        return
      }
      haritadansil(){ //obje tamamen silinecek
        window[this.tum_ozellikler.id_nosu].haritadagizle()
        return
      }
      objeyeyaklas(){
        if(Object.keys(this.tum_ozellikler.objeler).length>0){
        var koordint_sayisi = this.tum_ozellikler.coordinats.length
        var coordinatlar = []
        for (var l in range(0,koordint_sayisi-1)){
          coordinatlar.push(L.latLng(this.tum_ozellikler.coordinats[l][0],this.tum_ozellikler.coordinats[l][1]))
        }
        var bounds = L.latLngBounds(coordinatlar)
        map.flyToBounds(bounds,9,{
            animate:true
          })
          window[this.tum_ozellikler.id_nosu].objeyiyenile()
          tilelayer_yenile(gecerli_tilelayer)
        }
        else{
          alert("You cannot zoom in because there is no object in the layer.")
        }
        return
      }
      katmanduzenle(x){
        butonlari_devre_disi_birakma()
        sayfamesajlari.innerHTML=""
        sayfamesajlari.style.backgroundColor="black"

        var islem1 = document.createElement("button")
        islem1.innerText="Edit"
        islem1.onclick = function objesecmek(){
          sayfamesajlari.innerHTML=""
          sayfamesajlari.innerText="Click on the object you want to edit."

          window[x].tum_ozellikler.featuregroup.on('click',function secilmisobje(e,b){
            try{map.removeLayer(ara_noktalar)}catch{}
            try{map.removeLayer(kose_noktalari)}catch{}
            var secilen_obje = {obje:null}
            var kose_noktalari=null
            var ara_noktalar=null
            var ara_noktalistesi=[]
            var gecici_ara_nokta
            var asdfg
            kose_noktalari = L.featureGroup().addTo(map)
            ara_noktalar =L.featureGroup().addTo(map)
            if(b===undefined){
            secilen_obje.obje = (e.layer.feature.properties.featureid).toString()
          }
          else{
            window[x].tum_ozellikler.featuregroup.off("click")
            secilen_obje.obje=b
          }

          for (var o in window[x].tum_ozellikler.objeler["'"+secilen_obje.obje+"'"].geometrioznitelik.geometry.coordinates[0]){
            var o =parseFloat(o)
            var koordinat = window[x].tum_ozellikler.objeler["'"+secilen_obje.obje+"'"].geometrioznitelik.geometry.coordinates[0][o]
            window["köşe"+o] = L.geoJSON({type:"Feature","geometry":{"type":"Point","coordinates":koordinat}},
            {pointToLayer:function(feature,latlng){
              return L.circleMarker(latlng,{radius:4,fillColor:"#56ffff",weight:1,fillOpacity:1})
            }}).addTo(kose_noktalari)
          if (0<= o &&  o < window[x].tum_ozellikler.objeler["'"+secilen_obje.obje+"'"].geometrioznitelik.geometry.coordinates[0].length-1){
            ara_noktalistesi.push({
                              koordinatlar:[(window[x].tum_ozellikler.objeler["'"+secilen_obje.obje+"'"].geometrioznitelik.geometry.coordinates[0][parseFloat(o)+1][0] + window[x].tum_ozellikler.objeler["'"+secilen_obje.obje+"'"].geometrioznitelik.geometry.coordinates[0][o][0])/2,(window[x].tum_ozellikler.objeler["'"+secilen_obje.obje+"'"].geometrioznitelik.geometry.coordinates[0][parseFloat(o)+1][1] + window[x].tum_ozellikler.objeler["'"+secilen_obje.obje+"'"].geometrioznitelik.geometry.coordinates[0][o][1])/2],
                              bir_onceki_koordinat : window[x].tum_ozellikler.objeler["'"+secilen_obje.obje+"'"].geometrioznitelik.geometry.coordinates[0][o],
                              bir_sonraki_koordinat : window[x].tum_ozellikler.objeler["'"+secilen_obje.obje+"'"].geometrioznitelik.geometry.coordinates[0][parseFloat(o)+1]} )
                              window["ara"+o] = L.geoJSON({type:"Feature","geometry":{"type":"Point","coordinates":[(window[x].tum_ozellikler.objeler["'"+secilen_obje.obje+"'"].geometrioznitelik.geometry.coordinates[0][parseFloat(o)+1][0] + window[x].tum_ozellikler.objeler["'"+secilen_obje.obje+"'"].geometrioznitelik.geometry.coordinates[0][o][0])/2,(window[x].tum_ozellikler.objeler["'"+secilen_obje.obje+"'"].geometrioznitelik.geometry.coordinates[0][parseFloat(o)+1][1] + window[x].tum_ozellikler.objeler["'"+secilen_obje.obje+"'"].geometrioznitelik.geometry.coordinates[0][o][1])/2]}},
            {pointToLayer:function(feature,latlng){
              return L.circleMarker(latlng,{radius:4,fillColor:"#FF0000",weight:1,fillOpacity:1})
            }}).addTo(ara_noktalar)

          }
          else {
            ara_noktalistesi.push({
              koordinatlar:[(window[x].tum_ozellikler.objeler["'"+secilen_obje.obje+"'"].geometrioznitelik.geometry.coordinates[0][window[x].tum_ozellikler.objeler["'"+secilen_obje.obje+"'"].geometrioznitelik.geometry.coordinates[0].length-1][0] + window[x].tum_ozellikler.objeler["'"+secilen_obje.obje+"'"].geometrioznitelik.geometry.coordinates[0][0][0])/2,(window[x].tum_ozellikler.objeler["'"+secilen_obje.obje+"'"].geometrioznitelik.geometry.coordinates[0][window[x].tum_ozellikler.objeler["'"+secilen_obje.obje+"'"].geometrioznitelik.geometry.coordinates[0].length-1][1] + window[x].tum_ozellikler.objeler["'"+secilen_obje.obje+"'"].geometrioznitelik.geometry.coordinates[0][0][1])/2],
              bir_onceki_koordinat : window[x].tum_ozellikler.objeler["'"+secilen_obje.obje+"'"].geometrioznitelik.geometry.coordinates[window[x].tum_ozellikler.objeler["'"+secilen_obje.obje+"'"].geometrioznitelik.geometry.coordinates[0].length-1],
              bir_sonraki_koordinat : window[x].tum_ozellikler.objeler["'"+secilen_obje.obje+"'"].geometrioznitelik.geometry.coordinates[0]} )
              window["ara"+o] = L.geoJSON({type:"Feature","geometry":{"type":"Point","coordinates":[(window[x].tum_ozellikler.objeler["'"+secilen_obje.obje+"'"].geometrioznitelik.geometry.coordinates[0][window[x].tum_ozellikler.objeler["'"+secilen_obje.obje+"'"].geometrioznitelik.geometry.coordinates[0].length-1][0] + window[x].tum_ozellikler.objeler["'"+secilen_obje.obje+"'"].geometrioznitelik.geometry.coordinates[0][0][0])/2,(window[x].tum_ozellikler.objeler["'"+secilen_obje.obje+"'"].geometrioznitelik.geometry.coordinates[0][window[x].tum_ozellikler.objeler["'"+secilen_obje.obje+"'"].geometrioznitelik.geometry.coordinates[0].length-1][1] + window[x].tum_ozellikler.objeler["'"+secilen_obje.obje+"'"].geometrioznitelik.geometry.coordinates[0][0][1])/2]}},
{pointToLayer:function(feature,latlng){
return L.circleMarker(latlng,{radius:4,fillColor:"#FF0000",weight:1,fillOpacity:1})
}}).addTo(ara_noktalar)

          }
          }

            var kose_sil = document.createElement("button")
            kose_sil.innerText="Delete Vertex"
            
            kose_sil.onclick=function(){
              window[x].tum_ozellikler.featuregroup.off('click')
              kose_noktalari.on("click",function(asd){

                var secilen_kose = asd.layer.feature.geometry.coordinates
                window[x].tum_ozellikler.objeler["'"+secilen_obje.obje+"'"].geometrioznitelik.geometry.coordinates[0].splice(window[x].tum_ozellikler.objeler["'"+secilen_obje.obje+"'"].geometrioznitelik.geometry.coordinates[0].indexOf(secilen_kose),1)
                window[x].tum_ozellikler.featuregroup.removeLayer(window[x].tum_ozellikler.objeler["'"+secilen_obje.obje+"'"].feature)

                window[x].tum_ozellikler.objeler["'"+secilen_obje.obje+"'"].feature = L.geoJSON(window[x].tum_ozellikler.objeler["'"+secilen_obje.obje+"'"].geometrioznitelik,{
                  style:window[x].tum_ozellikler.objeler["'"+secilen_obje.obje+"'"].bicim.bicim
              }).addTo(window[x].tum_ozellikler.featuregroup)
              kose_noktalari.off("click")
              for (var l in ara_noktalistesi){
                map.removeLayer(window["ara"+l])
                try{
                  map.removeLayer(window["köşe"+l])
                }catch{}
                try{
                  map.removeLayer(window["köşe"+(l+1)])
                }catch{}
              }

              sayfamesajlari.innerHTML=""
              return secilmisobje(e,secilen_obje.obje)  

            })
            }
            var nokta_ekle = document.createElement("button")
            nokta_ekle.innerText="Shift Midpoint"
            nokta_ekle.onclick=function(){

              window[x].tum_ozellikler.featuregroup.off('click')
              ara_noktalar.on("click",function(asd){
                var secilen_kose = asd.layer.feature.geometry.coordinates
                for (var p in ara_noktalistesi){
                  if (ara_noktalistesi[p].koordinatlar[0]===secilen_kose[0]&&ara_noktalistesi[p].koordinatlar[1]===secilen_kose[1]){
                    var indexxx= window[x].tum_ozellikler.objeler["'"+secilen_obje.obje+"'"].geometrioznitelik.geometry.coordinates[0].indexOf(ara_noktalistesi[p].bir_onceki_koordinat)
                  
                    map.on("mousemove",function onizleme(xxx){
                      map.removeLayer(kose_noktalari)
                      map.removeLayer(ara_noktalar)
                      try{
                        map.removeLayer(asdfg)
                      }
                      catch{}
                      try{map.removeLayer(gecici_ara_nokta)}catch{}
                      asdfg=""
                      
                      var gecici_koordinatlar=[xxx.latlng.lng ,  xxx.latlng.lat]
                      gecici_ara_nokta = L.geoJSON({type:"Feature","geometry":{"type":"Point","coordinates":gecici_koordinatlar}},
                          {pointToLayer:function(feature,latlng){
                            return L.circleMarker(latlng,{radius:4,fillColor:"#FF0000",weight:1,fillOpacity:1})
                          }}).addTo(map)

                      window[x].tum_ozellikler.featuregroup.removeLayer(window[x].tum_ozellikler.objeler["'"+secilen_obje.obje+"'"].feature)
                      window[x].tum_ozellikler.objeler["'"+secilen_obje.obje+"'"].geometrioznitelik.geometry.coordinates[0].splice(indexxx+1,0,gecici_koordinatlar)
                      var line = [{
                        "type":"Polygon",
                        "coordinates":window[x].tum_ozellikler.objeler["'"+secilen_obje.obje+"'"].geometrioznitelik.geometry.coordinates    
                      }]
                      asdfg = L.geoJSON(line,{
                        style : window[x].tum_ozellikler.objeler["'"+secilen_obje.obje+"'"].bicim.bicim
                    }).addTo(map)
                    window[x].tum_ozellikler.objeler["'"+secilen_obje.obje+"'"].geometrioznitelik.geometry.coordinates[0].splice(indexxx+1,1)

                    map.on("click", function (xcv){
                      map.removeLayer(gecici_ara_nokta)
                      map.removeLayer(asdfg)
                      window[x].tum_ozellikler.featuregroup.removeLayer(window[x].tum_ozellikler.objeler["'"+secilen_obje.obje+"'"].feature)
                      map.removeLayer(ara_noktalar)
                      map.off("mousemove",onizleme)
                      var new_koordinat = [xcv.latlng.lng ,  xcv.latlng.lat]
                      window[x].tum_ozellikler.objeler["'"+secilen_obje.obje+"'"].geometrioznitelik.geometry.coordinates[0].splice(indexxx+1,0,new_koordinat)
                      window[x].tum_ozellikler.objeler["'"+secilen_obje.obje+"'"].feature=L.geoJSON(window[x].tum_ozellikler.objeler["'"+secilen_obje.obje+"'"].geometrioznitelik,{
                        style: window[x].tum_ozellikler.objeler["'"+secilen_obje.obje+"'"].bicim.bicim
                    }).addTo( window[x].tum_ozellikler.featuregroup)
                    map.off("click")
                    for (var l in ara_noktalistesi){
                      map.removeLayer(window["ara"+l])
                      try{
                        map.removeLayer(window["köşe"+l])
                      }catch{}
                    }
                    sayfamesajlari.innerHTML=""
                    return secilmisobje(e,secilen_obje.obje)
                    })
                    })


                  }

                }
          
            })
            
            }
            var kose_kaydir = document.createElement("button")
            kose_kaydir.innerText="Shift Vertex"
            kose_kaydir.onclick=function(){
              window[x].tum_ozellikler.featuregroup.off('click')
              kose_noktalari.on("click",function(asd){
                
                var secilen_kose = asd.layer.feature.geometry.coordinates
                  if (window[x].tum_ozellikler.objeler["'"+secilen_obje.obje+"'"].geometrioznitelik.geometry.coordinates[0].includes(secilen_kose)){
                              var indexxx= window[x].tum_ozellikler.objeler["'"+secilen_obje.obje+"'"].geometrioznitelik.geometry.coordinates[0].indexOf(secilen_kose)
                              map.on("mousemove",function onizleme(xxx){
                                      map.removeLayer(kose_noktalari)
                                      map.removeLayer(ara_noktalar)
                                      try{
                                        map.removeLayer(asdfg)
                                        
                                      }
                                      
                                      catch{}
                                      try{map.removeLayer(gecici_ara_nokta)}catch{}
                                      asdfg=""
                                      
                                      var gecici_koordinatlar=[xxx.latlng.lng ,  xxx.latlng.lat]
                                      gecici_ara_nokta = L.geoJSON({type:"Feature","geometry":{"type":"Point","coordinates":gecici_koordinatlar}},
                                          {pointToLayer:function(feature,latlng){
                                            return L.circleMarker(latlng,{radius:4,fillColor:"#FF0000",weight:1,fillOpacity:1})
                                          }}).addTo(map)
                                      window[x].tum_ozellikler.featuregroup.removeLayer(window[x].tum_ozellikler.objeler["'"+secilen_obje.obje+"'"].feature)
                                      window[x].tum_ozellikler.objeler["'"+secilen_obje.obje+"'"].geometrioznitelik.geometry.coordinates[0].splice(indexxx,0,gecici_koordinatlar)
                                      var line = [{
                                        "type":"Polygon",
                                        "coordinates":window[x].tum_ozellikler.objeler["'"+secilen_obje.obje+"'"].geometrioznitelik.geometry.coordinates
                                      }]
                                      asdfg = L.geoJSON(line,{
                                        style : window[x].tum_ozellikler.objeler["'"+secilen_obje.obje+"'"].bicim.bicim
                                    }).addTo(map)
                                    window[x].tum_ozellikler.objeler["'"+secilen_obje.obje+"'"].geometrioznitelik.geometry.coordinates[0].splice(indexxx+1,1)

                                    map.on("click", function (xcv){
                                      map.removeLayer(gecici_ara_nokta)
                                      map.removeLayer(asdfg)
                                      window[x].tum_ozellikler.featuregroup.removeLayer(window[x].tum_ozellikler.objeler["'"+secilen_obje.obje+"'"].feature)
                                      map.removeLayer(ara_noktalar)
                                      map.off("mousemove",onizleme)
                                      var new_koordinat = [xcv.latlng.lng ,  xcv.latlng.lat]
                                      window[x].tum_ozellikler.objeler["'"+secilen_obje.obje+"'"].geometrioznitelik.geometry.coordinates[0].splice(indexxx,1,new_koordinat)
                                      window[x].tum_ozellikler.objeler["'"+secilen_obje.obje+"'"].feature=L.geoJSON(window[x].tum_ozellikler.objeler["'"+secilen_obje.obje+"'"].geometrioznitelik,{
                                        style: window[x].tum_ozellikler.objeler["'"+secilen_obje.obje+"'"].bicim.bicim
                                    }).addTo( window[x].tum_ozellikler.featuregroup)
                                        map.off("click")
                                        for (var l in ara_noktalistesi){
                                          map.removeLayer(window["ara"+l])
                                          try{
                                            map.removeLayer(window["köşe"+l])
                                          }catch{}
                                        }
                                        sayfamesajlari.innerHTML=""
                                        return secilmisobje(e,secilen_obje.obje)  
                                    })
                    })
                  }
            })
            }
            var kapatmabutonu = document.createElement("button")
            kapatmabutonu.innerText="Back"
            kapatmabutonu.onclick=function(){
              map.off("click")
              for (var l in ara_noktalistesi){
                map.removeLayer(window["ara"+l])
                try{
                  map.removeLayer(window["köşe"+l])
                }catch{}
                
              }
              try{ map.removeLayer(ara_noktalar)}catch{}
              try{ map.removeLayer(gecici_ara_nokta)}catch{}
              try{ map.removeLayer(asdfg)}catch{}
              try{ map.removeLayer(kose_noktalari)}catch{}

              window[x].tum_ozellikler.featuregroup.off('click')
              sayfamesajlari.innerHTML=""
              return objesecmek()
            }
            sayfamesajlari.appendChild(satiratla)
            sayfamesajlari.appendChild(kose_sil)
            sayfamesajlari.appendChild(nokta_ekle)
            sayfamesajlari.appendChild(kose_kaydir)
            sayfamesajlari.appendChild(kapatmabutonu)
        })
        var kapatbuton = document.createElement("button")
        kapatbuton.innerText="Finish Process"
        kapatbuton.onclick=function(){
          map.off("click")
          butonlari_etkinlestirme()
          bekleme()
          return
        }
        sayfamesajlari.appendChild(kapatbuton)
        return
        }

        var islem2 = document.createElement("button")
        islem2.innerText="Delete"
        islem2.onclick=function objesilme(){
          window[x].tum_ozellikler.featuregroup.off("click")
          sayfamesajlari.innerHTML=""
          sayfamesajlari.innerText="Please Select the Object You Want to Delete."
          sayfamesajlari.appendChild(satiratla)
          var kapatbuton = document.createElement("button")
          kapatbuton.innerText="Finish Process"
          kapatbuton.onclick=function(){
            window[x].tum_ozellikler.featuregroup.off("click")
            butonlari_etkinlestirme()
            bekleme()
            return
          }
          sayfamesajlari.appendChild(kapatbuton)
          
          
          window[x].tum_ozellikler.featuregroup.on("click",function(e){

          var object_id=e.layer.feature.properties.featureid
          map_layers.splice(map_layers.indexOf(object_id),1)
          window[x].tum_ozellikler.objeler_ve_id_nolari.splice(window[x].tum_ozellikler.objeler_ve_id_nolari.indexOf(object_id),1)
          window[x].tum_ozellikler.featuregroup.removeLayer(window[x].tum_ozellikler.objeler["'"+object_id+"'"].feature)
          for (var op in window[x].tum_ozellikler.objeler["'"+object_id+"'"].geometrioznitelik.geometry.coordinates[0]){
            var latt = window[x].tum_ozellikler.objeler["'"+object_id+"'"].geometrioznitelik.geometry.coordinates[0][op][0]
            var lngg=window[x].tum_ozellikler.objeler["'"+object_id+"'"].geometrioznitelik.geometry.coordinates[0][op][1]
            console.log(latt,lngg,window[x].tum_ozellikler.coordinats[0])
            window[x].tum_ozellikler.coordinats.splice(window[x].tum_ozellikler.coordinats[0].indexOf([lngg,latt],1))
          }
          window[x].tum_ozellikler.objeler["'"+object_id+"'"]=null
          delete window[x].tum_ozellikler.objeler["'"+object_id+"'"]
          sayfamesajlari.innerHTML=object_id+"  Object Successfully Deleted."
          window[x].tum_ozellikler.featuregroup.off("click")
          return window[x].katmanduzenle(x)
        })
        }
        var islem3 = document.createElement("button")
        islem3.innerText="Add"
        islem3.onclick = function objeekle(name){
          window[x].tum_ozellikler.featuregroup.off("click")
          sayfamesajlari=document.getElementById('sayfamesajlari')
          document.getElementById("oznitelikpenceresi").innerHTML="";
            if (typeof name==="object"){
            var name = x
          }
          else{
            var name = name
          }

          document.getElementById('sayfamesajlari').style.backgroundColor  = "black";  
          sayfamesajlari.innerText="Start Draw"
          var noktalar = []
          var asdf = []
          noktalar.push(asdf)
      var asd
      if (noktalar.length===1){
        var stylee = {
            color: window[name].renk,
            weight: 10,
            opacity: .7,
            dashArray: '20,15',
            lineJoin: 'round'
        }

        map.on("click",(e)=>{
          var x = (e.latlng.lat).toFixed(8)
          var y = (e.latlng.lng).toFixed(8)
          var nokta1= [parseFloat(y),parseFloat(x)]
          noktalar[0].push([parseFloat(y),parseFloat(x)])
          gecici_mousemove_durumu="açık"
          if (noktalar[0].length!==0){
            map.on("mousemove",function onizleme(e) {
              if(gecici_mousemove_durumu==="açık"){
              try{
                  map.removeLayer(asd)
              }
              catch{
              }
              asd =""
              x = (e.latlng.lat).toFixed(8)
              y = (e.latlng.lng).toFixed(8)
              noktalar[0].push([parseFloat(y),parseFloat(x)])
              
              var line = [{
                  "type":"Polygon",
                  "coordinates":noktalar
              }]
              asd = L.geoJSON(line,{
                  style:stylee
              }).addTo(map)
              noktalar[0].splice(noktalar[0].indexOf(nokta1),1)
          }
        else if(gecici_mousemove_durumu==="kapalı"){
          try{
            map.removeLayer(asd)
        }
        catch{}
          map.off("mousemove",onizleme)
        }
        })
          }

      })
        var bitirbuton = document.createElement("button")
        bitirbuton.innerText="Finish Object Draw"
        bitirbuton.onclick=async function(){
          map.off("click")
          gecici_mousemove_durumu="kapalı"
            try{
            map.removeLayer(asd)
            var name2 = "polygon"+(new Date()).getMilliseconds()+Math.floor(Math.random()*1000);//benzersiz obje id alma
            window[name].objeler_ve_ozellikleri(noktalar,name2)
            window[name].haritayaekle(window[name].tum_ozellikler.objeler["'"+name2+"'"].bicim,name2)
            sayfamesajlari.innerText=name2+"object has been created."
            await sleep(500)
          }
          catch{
            alert("You didn't draw. Try again.")
          }
          noktalar=[]
            return objeekle(name)
        }
        sayfamesajlari.appendChild(document.createElement("br"))
        document.getElementById("sayfamesajlari").appendChild(bitirbuton)
        var kapatbuton = document.createElement("button")
        kapatbuton.innerText="Finish Process"
        kapatbuton.onclick=function(){
          map.off("click")
          butonlari_etkinlestirme()
          bekleme()
          return
        }
        sayfamesajlari.appendChild(kapatbuton)
    } 



        }

        sayfamesajlari.appendChild(islem1)
        sayfamesajlari.appendChild(islem2)
        sayfamesajlari.appendChild(islem3)
        sayfamesajlari.appendChild(satiratla)
        var kapatbuton = document.createElement("button")
        kapatbuton.innerText="Finsih"
        kapatbuton.onclick=function(){
          map.off("click")
          butonlari_etkinlestirme()
          bekleme()
          return
        }
        sayfamesajlari.appendChild(kapatbuton)
        return
      }
      stildegistirme(class_id){

        var class_id=class_id
        var sayfamesajlari = document.getElementById("sayfamesajlari")
        sayfamesajlari.style.backgroundColor="black"
        sayfamesajlari.innerText=""
        
        var objesecerek = document.createElement("button")
        objesecerek.innerText="Select Object"
        var gecici_cizgiler = []  
        objesecerek.onclick=function(){
          var gecici_cizgi_group = L.featureGroup().addTo(map)
          var secilen_objeler=[]
          sayfamesajlari.innerText="You can perform the selection process by clicking on the relevant lines on the screen."
          window[class_id].tum_ozellikler.featuregroup.on("click",function objsecme(e){
            var id_no = e.layer.feature.properties.featureid 
            if(secilen_objeler.includes(id_no)===false){
              secilen_objeler.push(id_no)
            window[class_id].tum_ozellikler.featuregroup.removeLayer(window[class_id].tum_ozellikler.objeler["'"+id_no+"'"]["feature"])

            window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].bicim.bicim.color =  "#56ffff"  //seçilen objeye seçi mrengi verilir
            gecici_cizgiler.push()
            window[class_id].tum_ozellikler.objeler["'"+id_no+"'"]["feature"]= L.geoJSON(window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].geometrioznitelik,{
              style:{
                color: "#56ffff",
                weight: 3,
                opacity: .7,
            }
            }).addTo(gecici_cizgi_group)
          }
          else{
            alert("This object has been selected")
          }
          })

          var secimibitir= document.createElement("button")
          secimibitir.innerText="Finish Selection"
          secimibitir.onclick=function secimibitir(xxx){
          if (xxx.length>0){
            secilen_objeler=xxx
          }
                            if (secilen_objeler.length>0){
                            
                            window[class_id].tum_ozellikler.featuregroup.off("click")
                                    /* Önceki menüde seçilen objelerin kendi renklerine çevirme */
                            /* İşlem Türünün Seçilmesi */
                            var sayfamesajlari = document.getElementById("sayfamesajlari")
                            sayfamesajlari.style.backgroundColor="black"
                            sayfamesajlari.innerText="Select Process Type"
                            sayfamesajlari.appendChild(document.createElement("br"))
                                      var sayfamesajlari = document.getElementById("sayfamesajlari")
                                      sayfamesajlari.innerText="Select Process Type"
                                      var tumuaynitip=document.createElement("button")
                                      tumuaynitip.innerText="Monotype"
                                      /* Tek Tip Objeler İçin Fonksiyonlar */
                                      tumuaynitip.onclick=function(){
                                        map.removeLayer(gecici_cizgi_group)
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
                                          for (var m in secilen_objeler){
                                            var id_no=secilen_objeler[m]
                                          window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].bicim.bicim.color=yeni_renk
                                          window[class_id].tum_ozellikler.featuregroup.removeLayer(window[class_id].tum_ozellikler.objeler["'"+id_no+"'"]["feature"])

                                          window[class_id].tum_ozellikler.objeler["'"+id_no+"'"]["feature"]= L.geoJSON(window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].geometrioznitelik,{
                                            style:window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].bicim.bicim
                                          }).addTo(window[class_id].tum_ozellikler.featuregroup)
                                          }
                                          return secimibitir(secilen_objeler)
                                        }
                                        var buyukluksecimlabel = document.createElement("label")
                                        buyukluksecimlabel.setAttribute("for","buyukluksecim")
                                        buyukluksecimlabel.innerText="Enter My Outline Thickness."
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
                                          for (var m in secilen_objeler){
                                            var id_no=secilen_objeler[m]                                          
                                          window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].bicim.bicim.weight=yeni_boyut
                                          window[class_id].tum_ozellikler.featuregroup.removeLayer(window[class_id].tum_ozellikler.objeler["'"+id_no+"'"]["feature"])

                                          window[class_id].tum_ozellikler.objeler["'"+id_no+"'"]["feature"]= L.geoJSON(window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].geometrioznitelik,{
                                            style:window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].bicim.bicim
                                          }).addTo(window[class_id].tum_ozellikler.featuregroup)
                                          }
                                          return secimibitir(secilen_objeler)
                                        }
                                        var saydamliklabel = document.createElement("label");
                                        saydamliklabel.setAttribute("for","saydamliksecim");
                                        saydamliklabel.innerText="Enter Transparency Value.";
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
                                          for (var m in secilen_objeler){
                                            var id_no=secilen_objeler[m]                                          
                                          window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].bicim.bicim.fillOpacity=yeni_saydamlik
                                          window[class_id].tum_ozellikler.featuregroup.removeLayer(window[class_id].tum_ozellikler.objeler["'"+id_no+"'"]["feature"])

                                          window[class_id].tum_ozellikler.objeler["'"+id_no+"'"]["feature"]= L.geoJSON(window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].geometrioznitelik,{
                                            style:window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].bicim.bicim
                                          }).addTo(window[class_id].tum_ozellikler.featuregroup)
                                          }
                                          return secimibitir(secilen_objeler)
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
                                          var id_no=secilen_objeler[0]
                                          map.removeLayer(gecici_cizgi_group)
                                          for (var n in secilen_objeler){
                                            var id_no=secilen_objeler[n]                
                                              window[class_id].tum_ozellikler.featuregroup.removeLayer(window[class_id].tum_ozellikler.objeler["'"+id_no+"'"]["feature"])
                                              
                                              window[class_id].tum_ozellikler.objeler["'"+id_no+"'"]["feature"]= L.geoJSON(window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].geometrioznitelik,{
                                                style:window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].bicim.bicim //seçilen obje yeni rengiyle tekrar eklenir
                                              }).addTo(window[class_id].tum_ozellikler.featuregroup)
                                          }
                 
                                          var nitelik =Object.keys(window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].geometrioznitelik.properties)
                                          if (nitelik.length===2){//Varsayılan kolonlar dışında bir kolon yoksa eğer, sınıflandırma yapılamaz
                                            alert("The Object Does Not Have a Classifiable Column.")
                                            return secimibitir(secilen_objeler)
                                          }
                                        sayfamesajlari.innerText="Select Column for Classification. In Columns with Data Type 'Text', Attributes with Data Type 'Number' are Sorted According to Alphabet Order, and According to Value Size. Check Quality"
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
                                          if (v<2){}
                                          else{
                                            var buton = document.createElement("button")
                                            var kolontip

                                                                    if (window[class_id].tum_ozellikler.kolon_ve_tipleri[nitelik[v]]==="text"){
                                                                      kolontip="Column Data Type = Text";
                                                                    }
                                                                    else if(window[class_id].tum_ozellikler.kolon_ve_tipleri[nitelik[v]]==="tam sayı"){
                                                                      kolontip="Column Data Type = Integer";
                                                                    }
                                                                    else if(window[class_id].tum_ozellikler.kolon_ve_tipleri[nitelik[v]]==="ondalıklı sayı"){
                                                                      kolontip="Column Data Type = Float";
                                                                    }
                                                                  
                                            buton.innerText="Column Name: "+nitelik[v]+kolontip
                                            buton.style.backgroundColor="black"
                                            buton.style.color="white"
                                            buton.style.border="1 px white solid"
                                            /* Kolonlara tıklayınca açılacak menü */
                                            buton.onclick=function(){
                                              referanssinif.innerHTML=""
                                              var rengegore=document.createElement("button")
                                              rengegore.innerText="Renge Göre Sınıflandırma"
                                              /* Renge Göre Sınıflandırma İşlemleri */
                                              rengegore.onclick=function(){
                                                sayfamesajlari.innerText=""
                                                var sinifsayisilabel =document.createElement("label")
                                                sinifsayisilabel.innerText="Column Data Type = Text."
                                                sinifsayisilabel.setAttribute("for","sinifsayisialma")
                                                var sinifsayisigir=document.createElement("input")
                                                sinifsayisigir.innerText="Column Data Type = Text"
                                                sinifsayisigir.setAttribute("type","number") 
                                                sinifsayisigir.setAttribute("step","1")
                                                sinifsayisigir.setAttribute("min","0")
                                                sinifsayisigir.setAttribute("id","sinifsayisial")
                                                var baslangicrenklabel = document.createElement("label")
                                                baslangicrenklabel.setAttribute("for","baslangicrenk")
                                                baslangicrenklabel.innerText="Select Start Color."
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
                                                    for (var c in secilen_objeler){
                                                      var id_no=secilen_objeler[c]
                                                      niteliksiralamasi[id_no] = window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].geometrioznitelik.properties[nitelik[v]]
                                                    }
                                                    /* niteliklerin ve renk aralıklarının sınıf sayısına göre puanlanması */
                                                    var puanlama = alfabeyegorepuanlama(niteliksiralamasi,sinifsayisi,renkaralik)
                                                    niteliksiralamasi=puanlama._yeninitelik
                                                    var puanlirenk=puanlama._puanlirenk
                                                    /* puanlanan obje ve renk aralıklarının eşleştiirlmesi */
                                                    for (var c in secilen_objeler){
                                                      var id_no=secilen_objeler[c]
                                                      var obje_puan = niteliksiralamasi[id_no]["puan"]
                                                      for (var d in Object.keys(puanlirenk)){
                                                        if (obje_puan>puanlirenk[Object.keys(puanlirenk)[d]].baslangic && obje_puan<=puanlirenk[Object.keys(puanlirenk)[d]].bitis){
                                                          window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].bicim.bicim.color=Object.keys(puanlirenk)[d]
                                                          window[class_id].tum_ozellikler.featuregroup.removeLayer(window[class_id].tum_ozellikler.objeler["'"+id_no+"'"]["feature"])
                                                          window[class_id].tum_ozellikler.objeler["'"+id_no+"'"]["feature"]= L.geoJSON(window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].geometrioznitelik,{
                                                            style:window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].bicim.bicim
                                                          }).addTo(window[class_id].tum_ozellikler.featuregroup)
                                                        }
                                                      }
                                                    }
                                                    
                                                  }
                                                  /* Kolon tipi tam sayı veya ondalıklı sayı ise çalışacak blok */
                                                  else if (window[class_id].tum_ozellikler.kolon_ve_tipleri[nitelik[v]]!=="text"){
                                                    var niteliksiralamasi = {}
                                                    for (var c in secilen_objeler){
                                                      var id_no=secilen_objeler[c]
                                                      niteliksiralamasi[id_no] = window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].geometrioznitelik.properties[nitelik[v]]
                                                    }
                                                    var puanlama = sayiyagoresiralama(niteliksiralamasi,sinifsayisi,renkaralik)
                                                    niteliksiralamasi=puanlama._yeninitelik
                                                    var puanlirenk=puanlama._puanlirenk
                                                    for (var c in secilen_objeler){
                                                      var id_no=secilen_objeler[c]
                                                      var obje_puan = niteliksiralamasi[id_no]["puan"]
                                                      for (var d in Object.keys(puanlirenk)){
                                                        if (obje_puan===0){

                                                        }
                                                        if (obje_puan > puanlirenk[Object.keys(puanlirenk)[d]].baslangic && obje_puan <= puanlirenk[Object.keys(puanlirenk)[d]].bitis){
                                                          window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].bicim.bicim.color=Object.keys(puanlirenk)[d]
                                                          window[class_id].tum_ozellikler.featuregroup.removeLayer(window[class_id].tum_ozellikler.objeler["'"+id_no+"'"]["feature"])
                                                          window[class_id].tum_ozellikler.objeler["'"+id_no+"'"]["feature"]= L.geoJSON(window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].geometrioznitelik,{
                                                            style:window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].bicim.bicim //seçilen obje yeni rengiyle tekrar eklenir
                                                            
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
                                              buyuklugegore.innerText="Classification by Outer Thickness"
                                              /* Büyüklüğe göre sıralmaa yapımı */
                                              buyuklugegore.onclick= function(){
                                                sayfamesajlari.innerText=""
                                                var sinifsayisilabel =document.createElement("label")
                                                sinifsayisilabel.innerText="Enter the Number of Classes."
                                                sinifsayisilabel.setAttribute("for","sinifsayisialma")
                                                var sinifsayisigir=document.createElement("input")
                                                sinifsayisigir.innerText="Sınıf Sayısını Giriniz"
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
                                                      for (var c in secilen_objeler){
                                                        var id_no=secilen_objeler[c]
                                                        niteliksiralamasi[id_no] = window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].geometrioznitelik.properties[nitelik[v]]
                                                      }
                                                      var puanlama = alfabeyegorepuanlama(niteliksiralamasi,sinifsayisi,renkaralik)
                                                      niteliksiralamasi=puanlama._yeninitelik
                                                      var puanlirenk=puanlama._puanlirenk
                                                      for (var c in secilen_objeler){
                                                        var id_no=secilen_objeler[c]
                                                        var obje_puan = niteliksiralamasi[id_no]["puan"]
                                                        for (var d in Object.keys(puanlirenk)){
                                                          if (obje_puan>puanlirenk[Object.keys(puanlirenk)[d]].baslangic && obje_puan<=puanlirenk[Object.keys(puanlirenk)[d]].bitis){
                                                            window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].bicim.bicim.weight=parseFloat(Object.keys(puanlirenk)[d])
                                                            window[class_id].tum_ozellikler.featuregroup.removeLayer(window[class_id].tum_ozellikler.objeler["'"+id_no+"'"]["feature"])
                                                            window[class_id].tum_ozellikler.objeler["'"+id_no+"'"]["feature"]= L.geoJSON(window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].geometrioznitelik,{
                                                              style:window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].bicim.bicim//seçilen obje yeni rengiyle tekrar eklenir
                                                              
                                                            }).addTo(window[class_id].tum_ozellikler.featuregroup)
                                                          }
                                                        }
                                                      }
                                                      
                                                    }
                                                    else if (window[class_id].tum_ozellikler.kolon_ve_tipleri[nitelik[v]]!=="text"){
                                                      var niteliksiralamasi = {}
                                                      for (var c in secilen_objeler){
                                                        var id_no=secilen_objeler[c]
                                                        niteliksiralamasi[id_no] = window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].geometrioznitelik.properties[nitelik[v]]
                                                      }
                                                      var puanlama = sayiyagoresiralama(niteliksiralamasi,sinifsayisi,renkaralik)
                                                      niteliksiralamasi=puanlama._yeninitelik
                                                      var puanlirenk=puanlama._puanlirenk
                                                      for (var c in secilen_objeler){
                                                        var id_no=secilen_objeler[c]
                                                        var obje_puan = niteliksiralamasi[id_no]["puan"]
                                                        for (var d in Object.keys(puanlirenk)){
                                                          if (obje_puan>puanlirenk[Object.keys(puanlirenk)[d]].baslangic && obje_puan<=puanlirenk[Object.keys(puanlirenk)[d]].bitis){
                                                            window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].bicim.bicim.weight=parseFloat(Object.keys(puanlirenk)[d])
                                                            window[class_id].tum_ozellikler.featuregroup.removeLayer(window[class_id].tum_ozellikler.objeler["'"+id_no+"'"]["feature"])
                                                            window[class_id].tum_ozellikler.objeler["'"+id_no+"'"]["feature"]= L.geoJSON(window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].geometrioznitelik,{
                                                              style:window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].bicim.bicim//seçilen obje yeni rengiyle tekrar eklenir
                                                              
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
                                                sinifsayisilabel.innerText="Enter the Number of Classes."
                                                sinifsayisilabel.setAttribute("for","sinifsayisialma")
                                                var sinifsayisigir=document.createElement("input")
                                                sinifsayisigir.innerText="Enter the Number of Classes."
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
                                                bitissaydamliklabel.innerText="Enter Maximum Transparency Amount."
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
                                                      for (var c in secilen_objeler){
                                                        var id_no=secilen_objeler[c]
                                                        niteliksiralamasi[id_no] = window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].geometrioznitelik.properties[nitelik[v]]
                                                      }
                                                      var puanlama = alfabeyegorepuanlama(niteliksiralamasi,sinifsayisi,renkaralik)
                                                      niteliksiralamasi=puanlama._yeninitelik
                                                      var puanlirenk=puanlama._puanlirenk
                                                      for (var c in secilen_objeler){
                                                        var id_no=secilen_objeler[c]
                                                        var obje_puan = niteliksiralamasi[id_no]["puan"]
                                                        for (var d in Object.keys(puanlirenk)){
                                                          if (obje_puan>puanlirenk[Object.keys(puanlirenk)[d]].baslangic && obje_puan<=puanlirenk[Object.keys(puanlirenk)[d]].bitis){
                                                            window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].bicim.bicim.fillOpacity=parseFloat(Object.keys(puanlirenk)[d])
                                                            window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].bicim.gecerli_bicim="nokta"
                                                            window[class_id].tum_ozellikler.featuregroup.removeLayer(window[class_id].tum_ozellikler.objeler["'"+id_no+"'"]["feature"])
                                                            window[class_id].tum_ozellikler.objeler["'"+id_no+"'"]["feature"]= L.geoJSON(window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].geometrioznitelik,{
                                                              style:window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].bicim.bicim//seçilen obje yeni rengiyle tekrar eklenir
                                                              
                                                            }).addTo(window[class_id].tum_ozellikler.featuregroup)
                                                          }
                                                        }
                                                      }
                                                      
                                                    }
                                                    else if (window[class_id].tum_ozellikler.kolon_ve_tipleri[nitelik[v]]!=="text"){
                                                      var niteliksiralamasi = {}
                                                      for (var c in secilen_objeler){
                                                        var id_no=secilen_objeler[c]
                                                        niteliksiralamasi[id_no] = window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].geometrioznitelik.properties[nitelik[v]]
                                                      }
                                                      var puanlama = sayiyagoresiralama(niteliksiralamasi,sinifsayisi,renkaralik)
                                                      niteliksiralamasi=puanlama._yeninitelik
                                                      var puanlirenk=puanlama._puanlirenk
                                                      for (var c in secilen_objeler){
                                                        var id_no=secilen_objeler[c]
                                                        var obje_puan = niteliksiralamasi[id_no]["puan"]
                                                        for (var d in Object.keys(puanlirenk)){
                                                          if (obje_puan>puanlirenk[Object.keys(puanlirenk)[d]].baslangic && obje_puan<=puanlirenk[Object.keys(puanlirenk)[d]].bitis){
                                                            window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].bicim.bicim.fillOpacity=parseFloat(Object.keys(puanlirenk)[d])
                                                            window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].bicim.gecerli_bicim="nokta"
                                                            window[class_id].tum_ozellikler.featuregroup.removeLayer(window[class_id].tum_ozellikler.objeler["'"+id_no+"'"]["feature"])
                                                            window[class_id].tum_ozellikler.objeler["'"+id_no+"'"]["feature"]= L.geoJSON(window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].geometrioznitelik,{
                                                              style:window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].bicim.bicim//seçilen obje yeni rengiyle tekrar eklenir
                                                              
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
                                        map.removeLayer(gecici_cizgi_group)
                                        for (var n in secilen_objeler){
                                          var id_no=secilen_objeler[n]                
                                            window[class_id].tum_ozellikler.featuregroup.removeLayer(window[class_id].tum_ozellikler.objeler["'"+id_no+"'"]["feature"])
                                            
                                            window[class_id].tum_ozellikler.objeler["'"+id_no+"'"]["feature"]= L.geoJSON(window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].geometrioznitelik,{
                                              style:window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].bicim.bicim //seçilen obje yeni rengiyle tekrar eklenir
                                            }).addTo(window[class_id].tum_ozellikler.featuregroup)
                                          
               
                                        }
                                        sayfamesajlari.innerText=""
                                        sayfamesajlari.innerHTML=""
                                        sayfamesajlari.style.backgroundColor="unset"
                                        return
                                      }
                                      sayfamesajlari.appendChild(kapatbuton)

                           

                            sayfamesajlari.appendChild(document.createElement("br"))
                            var kapatbuton = document.createElement("button")
                            kapatbuton.innerText="Finish"
                            kapatbuton.onclick = function(){
                              for (var n in secilen_objeler){
                                var id_no=secilen_objeler[n]
                                if (window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].bicim.gecerli_bicim !=="simge"){
                                if (window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].bicim.bicim.color==="#56ffff"){
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
                                  style:window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].bicim.bicim
                                }).addTo(window[class_id].tum_ozellikler.featuregroup)
                              }
                              }
                              sayfamesajlari.innerText=""
                              sayfamesajlari.innerHTML=""
                              sayfamesajlari.style.backgroundColor="unset"
                              return
                            }
                            
                            return
                            }
                            else{
                              alert("Object Not Selected. Please Select the Objects You Want to Style.")

                            }
                        }
                        sayfamesajlari.appendChild(secimibitir)
        }
        var tumunusec = document.createElement("button")
        tumunusec.innerText="Tümünü Seç"
        tumunusec.onclick = function tumusecili(){
          var secilen_objeler=[]
          for (var nm in window[class_id].tum_ozellikler.objeler_ve_id_nolari){
            secilen_objeler.push(window[class_id].tum_ozellikler.objeler_ve_id_nolari[nm])
          }
          if (secilen_objeler.length>0){
                            
            window[class_id].tum_ozellikler.featuregroup.off("click")
                    /* Önceki menüde seçilen objelerin kendi renklerine çevirme */
            /* İşlem Türünün Seçilmesi */
            var sayfamesajlari = document.getElementById("sayfamesajlari")
            sayfamesajlari.style.backgroundColor="black"
            sayfamesajlari.innerText="Select Process Type"
            sayfamesajlari.appendChild(document.createElement("br"))
                      var sayfamesajlari = document.getElementById("sayfamesajlari")
                      sayfamesajlari.innerText="Select Process Type"
                      var tumuaynitip=document.createElement("button")
                      tumuaynitip.innerText="Monotype"
                      /* Tek Tip Objeler İçin Fonksiyonlar */
                      tumuaynitip.onclick=function(){
                        map.removeLayer(gecici_cizgi_group)
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
                          for (var m in secilen_objeler){
                            var id_no=secilen_objeler[m]
                          window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].bicim.bicim.color=yeni_renk
                          window[class_id].tum_ozellikler.featuregroup.removeLayer(window[class_id].tum_ozellikler.objeler["'"+id_no+"'"]["feature"])

                          window[class_id].tum_ozellikler.objeler["'"+id_no+"'"]["feature"]= L.geoJSON(window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].geometrioznitelik,{
                            style:window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].bicim.bicim
                          }).addTo(window[class_id].tum_ozellikler.featuregroup)
                          }
                          return secimibitir(secilen_objeler)
                        }
                        var buyukluksecimlabel = document.createElement("label")
                        buyukluksecimlabel.setAttribute("for","buyukluksecim")
                        buyukluksecimlabel.innerText="Enter My Outline Thickness."
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
                          for (var m in secilen_objeler){
                            var id_no=secilen_objeler[m]                                          
                          window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].bicim.bicim.weight=yeni_boyut
                          window[class_id].tum_ozellikler.featuregroup.removeLayer(window[class_id].tum_ozellikler.objeler["'"+id_no+"'"]["feature"])

                          window[class_id].tum_ozellikler.objeler["'"+id_no+"'"]["feature"]= L.geoJSON(window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].geometrioznitelik,{
                            style:window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].bicim.bicim
                          }).addTo(window[class_id].tum_ozellikler.featuregroup)
                          }
                          return secimibitir(secilen_objeler)
                        }
                        var saydamliklabel = document.createElement("label");
                        saydamliklabel.setAttribute("for","saydamliksecim");
                        saydamliklabel.innerText="Enter Transparency Value.";
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
                          for (var m in secilen_objeler){
                            var id_no=secilen_objeler[m]                                          
                          window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].bicim.bicim.fillOpacity=yeni_saydamlik
                          window[class_id].tum_ozellikler.featuregroup.removeLayer(window[class_id].tum_ozellikler.objeler["'"+id_no+"'"]["feature"])

                          window[class_id].tum_ozellikler.objeler["'"+id_no+"'"]["feature"]= L.geoJSON(window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].geometrioznitelik,{
                            style:window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].bicim.bicim
                          }).addTo(window[class_id].tum_ozellikler.featuregroup)
                          }
                          return secimibitir(secilen_objeler)
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
                          var id_no=secilen_objeler[0]
                          map.removeLayer(gecici_cizgi_group)
                          for (var n in secilen_objeler){
                            var id_no=secilen_objeler[n]                
                              window[class_id].tum_ozellikler.featuregroup.removeLayer(window[class_id].tum_ozellikler.objeler["'"+id_no+"'"]["feature"])
                              
                              window[class_id].tum_ozellikler.objeler["'"+id_no+"'"]["feature"]= L.geoJSON(window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].geometrioznitelik,{
                                style:window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].bicim.bicim //seçilen obje yeni rengiyle tekrar eklenir
                              }).addTo(window[class_id].tum_ozellikler.featuregroup)
                          }
 
                          var nitelik =Object.keys(window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].geometrioznitelik.properties)
                          if (nitelik.length===2){//Varsayılan kolonlar dışında bir kolon yoksa eğer, sınıflandırma yapılamaz
                            alert("The Object Does Not Have a Classifiable Column.")
                            return secimibitir(secilen_objeler)
                          }
                        sayfamesajlari.innerText="Select Column for Classification. In Columns with Data Type 'Text', Attributes with Data Type 'Number' are Sorted According to Alphabet Order, and According to Value Size. Check Quality"
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
                          if (v<2){}
                          else{
                            var buton = document.createElement("button")
                            var kolontip

                                                    if (window[class_id].tum_ozellikler.kolon_ve_tipleri[nitelik[v]]==="text"){
                                                      kolontip="Column Data Type = Text";
                                                    }
                                                    else if(window[class_id].tum_ozellikler.kolon_ve_tipleri[nitelik[v]]==="tam sayı"){
                                                      kolontip="Column Data Type = Integer";
                                                    }
                                                    else if(window[class_id].tum_ozellikler.kolon_ve_tipleri[nitelik[v]]==="ondalıklı sayı"){
                                                      kolontip="Column Data Type = Float";
                                                    }
                                                  
                            buton.innerText="Column Name: "+nitelik[v]+kolontip
                            buton.style.backgroundColor="black"
                            buton.style.color="white"
                            buton.style.border="1 px white solid"
                            /* Kolonlara tıklayınca açılacak menü */
                            buton.onclick=function(){
                              referanssinif.innerHTML=""
                              var rengegore=document.createElement("button")
                              rengegore.innerText="Renge Göre Sınıflandırma"
                              /* Renge Göre Sınıflandırma İşlemleri */
                              rengegore.onclick=function(){
                                sayfamesajlari.innerText=""
                                var sinifsayisilabel =document.createElement("label")
                                sinifsayisilabel.innerText="Column Data Type = Text."
                                sinifsayisilabel.setAttribute("for","sinifsayisialma")
                                var sinifsayisigir=document.createElement("input")
                                sinifsayisigir.innerText="Column Data Type = Text"
                                sinifsayisigir.setAttribute("type","number") 
                                sinifsayisigir.setAttribute("step","1")
                                sinifsayisigir.setAttribute("min","0")
                                sinifsayisigir.setAttribute("id","sinifsayisial")
                                var baslangicrenklabel = document.createElement("label")
                                baslangicrenklabel.setAttribute("for","baslangicrenk")
                                baslangicrenklabel.innerText="Select Start Color."
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
                                    for (var c in secilen_objeler){
                                      var id_no=secilen_objeler[c]
                                      niteliksiralamasi[id_no] = window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].geometrioznitelik.properties[nitelik[v]]
                                    }
                                    /* niteliklerin ve renk aralıklarının sınıf sayısına göre puanlanması */
                                    var puanlama = alfabeyegorepuanlama(niteliksiralamasi,sinifsayisi,renkaralik)
                                    niteliksiralamasi=puanlama._yeninitelik
                                    var puanlirenk=puanlama._puanlirenk
                                    /* puanlanan obje ve renk aralıklarının eşleştiirlmesi */
                                    for (var c in secilen_objeler){
                                      var id_no=secilen_objeler[c]
                                      var obje_puan = niteliksiralamasi[id_no]["puan"]
                                      for (var d in Object.keys(puanlirenk)){
                                        if (obje_puan>puanlirenk[Object.keys(puanlirenk)[d]].baslangic && obje_puan<=puanlirenk[Object.keys(puanlirenk)[d]].bitis){
                                          window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].bicim.bicim.color=Object.keys(puanlirenk)[d]
                                          window[class_id].tum_ozellikler.featuregroup.removeLayer(window[class_id].tum_ozellikler.objeler["'"+id_no+"'"]["feature"])
                                          window[class_id].tum_ozellikler.objeler["'"+id_no+"'"]["feature"]= L.geoJSON(window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].geometrioznitelik,{
                                            style:window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].bicim.bicim
                                          }).addTo(window[class_id].tum_ozellikler.featuregroup)
                                        }
                                      }
                                    }
                                    
                                  }
                                  /* Kolon tipi tam sayı veya ondalıklı sayı ise çalışacak blok */
                                  else if (window[class_id].tum_ozellikler.kolon_ve_tipleri[nitelik[v]]!=="text"){
                                    var niteliksiralamasi = {}
                                    for (var c in secilen_objeler){
                                      var id_no=secilen_objeler[c]
                                      niteliksiralamasi[id_no] = window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].geometrioznitelik.properties[nitelik[v]]
                                    }
                                    var puanlama = sayiyagoresiralama(niteliksiralamasi,sinifsayisi,renkaralik)
                                    niteliksiralamasi=puanlama._yeninitelik
                                    var puanlirenk=puanlama._puanlirenk
                                    for (var c in secilen_objeler){
                                      var id_no=secilen_objeler[c]
                                      var obje_puan = niteliksiralamasi[id_no]["puan"]
                                      for (var d in Object.keys(puanlirenk)){
                                        if (obje_puan===0){

                                        }
                                        if (obje_puan > puanlirenk[Object.keys(puanlirenk)[d]].baslangic && obje_puan <= puanlirenk[Object.keys(puanlirenk)[d]].bitis){
                                          window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].bicim.bicim.color=Object.keys(puanlirenk)[d]
                                          window[class_id].tum_ozellikler.featuregroup.removeLayer(window[class_id].tum_ozellikler.objeler["'"+id_no+"'"]["feature"])
                                          window[class_id].tum_ozellikler.objeler["'"+id_no+"'"]["feature"]= L.geoJSON(window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].geometrioznitelik,{
                                            style:window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].bicim.bicim //seçilen obje yeni rengiyle tekrar eklenir
                                            
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
                              buyuklugegore.innerText="Classification by Outer Thickness"
                              /* Büyüklüğe göre sıralmaa yapımı */
                              buyuklugegore.onclick= function(){
                                sayfamesajlari.innerText=""
                                var sinifsayisilabel =document.createElement("label")
                                sinifsayisilabel.innerText="Enter the Number of Classes."
                                sinifsayisilabel.setAttribute("for","sinifsayisialma")
                                var sinifsayisigir=document.createElement("input")
                                sinifsayisigir.innerText="Sınıf Sayısını Giriniz"
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
                                      for (var c in secilen_objeler){
                                        var id_no=secilen_objeler[c]
                                        niteliksiralamasi[id_no] = window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].geometrioznitelik.properties[nitelik[v]]
                                      }
                                      var puanlama = alfabeyegorepuanlama(niteliksiralamasi,sinifsayisi,renkaralik)
                                      niteliksiralamasi=puanlama._yeninitelik
                                      var puanlirenk=puanlama._puanlirenk
                                      for (var c in secilen_objeler){
                                        var id_no=secilen_objeler[c]
                                        var obje_puan = niteliksiralamasi[id_no]["puan"]
                                        for (var d in Object.keys(puanlirenk)){
                                          if (obje_puan>puanlirenk[Object.keys(puanlirenk)[d]].baslangic && obje_puan<=puanlirenk[Object.keys(puanlirenk)[d]].bitis){
                                            window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].bicim.bicim.weight=parseFloat(Object.keys(puanlirenk)[d])
                                            window[class_id].tum_ozellikler.featuregroup.removeLayer(window[class_id].tum_ozellikler.objeler["'"+id_no+"'"]["feature"])
                                            window[class_id].tum_ozellikler.objeler["'"+id_no+"'"]["feature"]= L.geoJSON(window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].geometrioznitelik,{
                                              style:window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].bicim.bicim//seçilen obje yeni rengiyle tekrar eklenir
                                              
                                            }).addTo(window[class_id].tum_ozellikler.featuregroup)
                                          }
                                        }
                                      }
                                      
                                    }
                                    else if (window[class_id].tum_ozellikler.kolon_ve_tipleri[nitelik[v]]!=="text"){
                                      var niteliksiralamasi = {}
                                      for (var c in secilen_objeler){
                                        var id_no=secilen_objeler[c]
                                        niteliksiralamasi[id_no] = window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].geometrioznitelik.properties[nitelik[v]]
                                      }
                                      var puanlama = sayiyagoresiralama(niteliksiralamasi,sinifsayisi,renkaralik)
                                      niteliksiralamasi=puanlama._yeninitelik
                                      var puanlirenk=puanlama._puanlirenk
                                      for (var c in secilen_objeler){
                                        var id_no=secilen_objeler[c]
                                        var obje_puan = niteliksiralamasi[id_no]["puan"]
                                        for (var d in Object.keys(puanlirenk)){
                                          if (obje_puan>puanlirenk[Object.keys(puanlirenk)[d]].baslangic && obje_puan<=puanlirenk[Object.keys(puanlirenk)[d]].bitis){
                                            window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].bicim.bicim.weight=parseFloat(Object.keys(puanlirenk)[d])
                                            window[class_id].tum_ozellikler.featuregroup.removeLayer(window[class_id].tum_ozellikler.objeler["'"+id_no+"'"]["feature"])
                                            window[class_id].tum_ozellikler.objeler["'"+id_no+"'"]["feature"]= L.geoJSON(window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].geometrioznitelik,{
                                              style:window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].bicim.bicim//seçilen obje yeni rengiyle tekrar eklenir
                                              
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
                                sinifsayisilabel.innerText="Enter the Number of Classes."
                                sinifsayisilabel.setAttribute("for","sinifsayisialma")
                                var sinifsayisigir=document.createElement("input")
                                sinifsayisigir.innerText="Enter the Number of Classes."
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
                                bitissaydamliklabel.innerText="Enter Maximum Transparency Amount."
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
                                      for (var c in secilen_objeler){
                                        var id_no=secilen_objeler[c]
                                        niteliksiralamasi[id_no] = window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].geometrioznitelik.properties[nitelik[v]]
                                      }
                                      var puanlama = alfabeyegorepuanlama(niteliksiralamasi,sinifsayisi,renkaralik)
                                      niteliksiralamasi=puanlama._yeninitelik
                                      var puanlirenk=puanlama._puanlirenk
                                      for (var c in secilen_objeler){
                                        var id_no=secilen_objeler[c]
                                        var obje_puan = niteliksiralamasi[id_no]["puan"]
                                        for (var d in Object.keys(puanlirenk)){
                                          if (obje_puan>puanlirenk[Object.keys(puanlirenk)[d]].baslangic && obje_puan<=puanlirenk[Object.keys(puanlirenk)[d]].bitis){
                                            window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].bicim.bicim.fillOpacity=parseFloat(Object.keys(puanlirenk)[d])
                                            window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].bicim.gecerli_bicim="nokta"
                                            window[class_id].tum_ozellikler.featuregroup.removeLayer(window[class_id].tum_ozellikler.objeler["'"+id_no+"'"]["feature"])
                                            window[class_id].tum_ozellikler.objeler["'"+id_no+"'"]["feature"]= L.geoJSON(window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].geometrioznitelik,{
                                              style:window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].bicim.bicim//seçilen obje yeni rengiyle tekrar eklenir
                                              
                                            }).addTo(window[class_id].tum_ozellikler.featuregroup)
                                          }
                                        }
                                      }
                                      
                                    }
                                    else if (window[class_id].tum_ozellikler.kolon_ve_tipleri[nitelik[v]]!=="text"){
                                      var niteliksiralamasi = {}
                                      for (var c in secilen_objeler){
                                        var id_no=secilen_objeler[c]
                                        niteliksiralamasi[id_no] = window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].geometrioznitelik.properties[nitelik[v]]
                                      }
                                      var puanlama = sayiyagoresiralama(niteliksiralamasi,sinifsayisi,renkaralik)
                                      niteliksiralamasi=puanlama._yeninitelik
                                      var puanlirenk=puanlama._puanlirenk
                                      for (var c in secilen_objeler){
                                        var id_no=secilen_objeler[c]
                                        var obje_puan = niteliksiralamasi[id_no]["puan"]
                                        for (var d in Object.keys(puanlirenk)){
                                          if (obje_puan>puanlirenk[Object.keys(puanlirenk)[d]].baslangic && obje_puan<=puanlirenk[Object.keys(puanlirenk)[d]].bitis){
                                            window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].bicim.bicim.fillOpacity=parseFloat(Object.keys(puanlirenk)[d])
                                            window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].bicim.gecerli_bicim="nokta"
                                            window[class_id].tum_ozellikler.featuregroup.removeLayer(window[class_id].tum_ozellikler.objeler["'"+id_no+"'"]["feature"])
                                            window[class_id].tum_ozellikler.objeler["'"+id_no+"'"]["feature"]= L.geoJSON(window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].geometrioznitelik,{
                                              style:window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].bicim.bicim//seçilen obje yeni rengiyle tekrar eklenir
                                              
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
                        for (var n in secilen_objeler){
                          var id_no=secilen_objeler[n]                
                            window[class_id].tum_ozellikler.featuregroup.removeLayer(window[class_id].tum_ozellikler.objeler["'"+id_no+"'"]["feature"])
                            
                            window[class_id].tum_ozellikler.objeler["'"+id_no+"'"]["feature"]= L.geoJSON(window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].geometrioznitelik,{
                              style:window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].bicim.bicim //seçilen obje yeni rengiyle tekrar eklenir
                            }).addTo(window[class_id].tum_ozellikler.featuregroup)
                          

                        }
                        sayfamesajlari.innerText=""
                        sayfamesajlari.innerHTML=""
                        sayfamesajlari.style.backgroundColor="unset"
                        return
                      }
                      sayfamesajlari.appendChild(kapatbuton)

           

            sayfamesajlari.appendChild(document.createElement("br"))
            var kapatbuton = document.createElement("button")
            kapatbuton.innerText="Finish"
            kapatbuton.onclick = function(){
              for (var n in secilen_objeler){
                var id_no=secilen_objeler[n]
                if (window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].bicim.gecerli_bicim !=="simge"){
                  window[class_id].tum_ozellikler.featuregroup.removeLayer(window[class_id].tum_ozellikler.objeler["'"+id_no+"'"]["feature"])
                  
                  window[class_id].tum_ozellikler.objeler["'"+id_no+"'"]["feature"]= L.geoJSON(window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].geometrioznitelik,{
                    style:window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].bicim.bicim
                  }).addTo(window[class_id].tum_ozellikler.featuregroup)
                
              }
              else {
                /* objenin yenilenemsi */
                window[class_id].tum_ozellikler.featuregroup.removeLayer(window[class_id].tum_ozellikler.objeler["'"+id_no+"'"]["feature"])
                  
                window[class_id].tum_ozellikler.objeler["'"+id_no+"'"]["feature"]= L.geoJSON(window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].geometrioznitelik,{
                  style:window[class_id].tum_ozellikler.objeler["'"+id_no+"'"].bicim.bicim
                }).addTo(window[class_id].tum_ozellikler.featuregroup)
              
              }
              }
              sayfamesajlari.innerText=""
              sayfamesajlari.innerHTML=""
              sayfamesajlari.style.backgroundColor="unset"
              return
            }
            
            return
            }
            else{
              alert("Object Not Selected. Please Select the Objects You Want to Style.")

            }
        }
        sayfamesajlari.appendChild(tumunusec)
        sayfamesajlari.appendChild(objesecerek)
      }
      oznitelikgoruntulemeveduzenleme(class_id){
        // öznitelik penceresinin en üstünde, obje featureid i ve kapat butonu eklenmesi
        document.getElementById("oznitelikpenceresi").innerHTML="";
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
          window[class_id].oznitelikpenceresikapat()
          return
        }
        kapatbuton.setAttribute("value","Finish");
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
        kolonlarin_divi.style.overflow="scroll"
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
                kolon.style.width="145px";
                kolon.style.height="auto";
                kolon.style.float="left"
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
                 
                  saga_kolon_ekle.onclick= function(){  
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
      //ekle butonu
      var uygula_buton=document.createElement("input");
      uygula_buton.setAttribute("type","submit");
      uygula_buton.innerText="Apply";
      uygula_buton.onclick=function(){
        
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
          window[class_id].tum_ozellikler.kolon_ve_tipleri[yeni_kolon_ad]=veri_tip
          for (var h in window[class_id].tum_ozellikler.objeler_ve_id_nolari){
            var object_name = window[class_id].tum_ozellikler.objeler_ve_id_nolari[h]
            

            window[class_id].tum_ozellikler.objeler["'"+object_name+"'"].geometrioznitelik.properties[yeni_kolon_ad]=veri_tip
          }
        }
        else{
          alert("Column Name Not Available")
        }
        window[class_id].objeyiyenile(window[window[class_id].tum_ozellikler.id_nosu]);
        window[class_id].oznitelikgoruntulemeveduzenleme(class_id);
        bekleme();
        return}
        else {
          alert("Column Name Not Available")
        }return
      }
      document.getElementById("tipsecim").appendChild(uygula_buton);
      return
                  }
                  
                  kolonmenu_ozellikler.onclick=function(){
                    var sayfamesajlari=document.getElementById("sayfamesajlari");
        sayfamesajlari.style.backgroundColor="black";
        sayfamesajlari.innerText="";
        var kolonadi=document.createElement("label");
        kolonadi.innerText="Column Name=     "+kolonun_adi;
        var kolontip=document.createElement("label");
        kolontip.innerText="Column Data Type: "+window[class_id].tum_ozellikler.kolon_ve_tipleri[kolonun_adi]
        
        document.getElementById("sayfamesajlari").appendChild(kolonadi);
        document.getElementById("sayfamesajlari").appendChild(document.createElement("br"));
        document.getElementById("sayfamesajlari").appendChild(kolontip);
        document.getElementById("sayfamesajlari").appendChild(document.createElement("br"));
        var kapatbutonu=document.createElement("button");
        kapatbutonu.setAttribute("value","Finish");
        kapatbutonu.setAttribute("onclick","bekleme()");
        kapatbutonu.innerText="Finish";
        document.getElementById("sayfamesajlari").appendChild(kapatbutonu);return
                  }
                  // featureid, Geometri Tipi, X Koordinatı(Enlem) ve Y Koordinatı(Boylam) öznitelikleri değiştirilemez niteliklerdir. Bu yüzden bu 
                  // niteliklerin kolon adı ve niteliği değiştirilemez.
                  if (kolonun_adi!=="featureid" && kolonun_adi !=="Geometri Tipi" && kolonun_adi !=="X Koordinatı (Enlem)" && kolonun_adi !== "Y Koordinatı (Boylam)"){
        
                    kolonmenu_duzenle.onclick=function(){
                      document.getElementById("'"+kolonun_adi+"'_details").removeAttribute("open");
                      //bilgilerin sayfa mesajlarına yazılması
                      var sayfamesajlari=document.getElementById("sayfamesajlari");
                      sayfamesajlari.style.backgroundColor="black";
                      sayfamesajlari.innerText="";
                      var labelbir = document.createElement("label");
                      labelbir.innerText="Colum Name:";
                      labelbir.setAttribute("for","kolonadiduzenle");
                      var kolonadigir=document.createElement("input");
                      kolonadigir.setAttribute("id","kolonadiduzenle");
                      kolonadigir.setAttribute("type","Kolon Adı");
                      kolonadigir.setAttribute("value",kolonun_adi);
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
                      veritip_uc.setAttribute("name","cevap1");nda
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
                      uygula_buton.onclick = function(){
                        var yeni_kolon_ad = document.getElementById("kolonadiduzenle").value;
                        try{
                        var veri_tip=document.querySelector('input[name = cevap1]:checked').value;
                        }
                        catch{
                         var veri_tip=window[class_id].tum_ozellikler.kolon_ve_tipleri[kolonun_adi]
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
                            window[class_id].tum_ozellikler.kolon_ve_tipleri[yeni_kolon_ad]=window[class_id].tum_ozellikler.kolon_ve_tipleri[kolonun_adi]
                            delete window[class_id].tum_ozellikler.kolon_ve_tipleri[kolonun_adi]
                            window[class_id].tum_ozellikler.kolon_ve_tipleri[yeni_kolon_ad]=veri_tip
                            for (var h in window[class_id].tum_ozellikler.objeler_ve_id_nolari){
                              var object_name = window[class_id].tum_ozellikler.objeler_ve_id_nolari[h]
                              window[class_id].tum_ozellikler.objeler["'"+object_name+"'"].geometrioznitelik.properties[yeni_kolon_ad]=window[class_id].tum_ozellikler.objeler["'"+object_name+"'"].geometrioznitelik.properties[kolonun_adi]
                              delete window[class_id].tum_ozellikler.objeler["'"+object_name+"'"].geometrioznitelik.properties[kolonun_adi]
                              if (window[class_id].tum_ozellikler.kolon_ve_tipleri[kolonun_adi]==="text"){
                                try{
                                  window[class_id].tum_ozellikler.objeler["'"+object_name+"'"].geometrioznitelik.properties[yeni_kolon_ad]=window[class_id].tum_ozellikler.objeler["'"+object_name+"'"].geometrioznitelik.properties[yeni_kolon_ad].toString();
                              }
                              catch{
                                window[class_id].tum_ozellikler.objeler["'"+object_name+"'"].geometrioznitelik.properties[yeni_kolon_ad]=null
                              }
                              }
                              else if (window[class_id].tum_ozellikler.kolon_ve_tipleri[kolonun_adi]==="tam sayı"){
                                try{
                                  window[class_id].tum_ozellikler.objeler["'"+object_name+"'"].geometrioznitelik.properties[yeni_kolon_ad]=parseInt(window[class_id].tum_ozellikler.objeler["'"+object_name+"'"].geometrioznitelik.properties[yeni_kolon_ad])
                                }
                                catch{
                                  window[class_id].tum_ozellikler.objeler["'"+object_name+"'"].geometrioznitelik.properties[yeni_kolon_ad]=null
                                }
                              }
                              else if (window[class_id].tum_ozellikler.kolon_ve_tipleri[kolonun_adi]==="ondalıklı sayı"){
                                try{window[class_id].tum_ozellikler.objeler["'"+object_name+"'"].geometrioznitelik.properties[yeni_kolon_ad]=parseFloat (window[class_id].tum_ozellikler.objeler["'"+object_name+"'"].geometrioznitelik.properties[yeni_kolon_ad])
                              }
                              catch{
                                window[class_id].tum_ozellikler.objeler["'"+object_name+"'"].geometrioznitelik.properties[yeni_kolon_ad]=null
                              }
                              }
                            }
                          }
                          window[class_id].objeyiyenile(class_id);
                          window[class_id].oznitelikgoruntulemeveduzenleme(class_id);
                          bekleme();
                          return}
                          
                        else{
                          alert("column name is not appropriate")
                        }
                        return
                      }
                      document.getElementById("tipsecim").appendChild(uygula_buton);
                      return
                    }
                    kolonmenu_sil.onclick=function(){
                      for (var n in window[class_id].tum_ozellikler.objeler_ve_id_nolari){
                        var obje_name = window[class_id].tum_ozellikler.objeler_ve_id_nolari[n]
                        delete window[class_id].tum_ozellikler.objeler["'"+obje_name+"'"].geometrioznitelik.properties[kolonun_adi]
                        delete window[class_id].tum_ozellikler.kolon_ve_tipleri[kolonun_adi]
                      }
                      window[class_id].oznitelikgoruntulemeveduzenleme(class_id);
                      window[class_id].objeyiyenile(window[class_id]);return
                    }
                    
                  }
                  else{
                    kolonmenu_duzenle.onclick=function(){
                      alert("Cannot Edit Colon.")
                  }              
                    kolonmenu_sil.onclick=function(){
                      alert("Cannot Edit Colon.")
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
            for (var k in window[class_id].tum_ozellikler.objeler_ve_id_nolari){
            var object_namee = window[class_id].tum_ozellikler.objeler_ve_id_nolari[k]
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
                objeyeyaklasbuton.onclick=function(){
                    var coordinatlar = []
                    for (var l in window[class_id].tum_ozellikler.objeler["'"+object_namee+"'"].geometrioznitelik.geometry.coordinates){
                      coordinatlar.push(L.latLng(window[class_id].tum_ozellikler.objeler["'"+object_namee+"'"].geometrioznitelik.geometry.coordinates[l][1],window[class_id].tum_ozellikler.objeler["'"+object_namee+"'"].geometrioznitelik.geometry.coordinates[l][0]))
   
                    }
                    var bounds = L.latLngBounds(coordinatlar)
                    map.flyToBounds(bounds,9,{
                        animate:true
                      })
                    return
                }
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

            kolon_icerik_name.setAttribute("id","'"+object_namee+"-"+kolonun_adi+"'_iceriksummary");
            if (window[class_id].tum_ozellikler.objeler["'"+object_namee+"'"].geometrioznitelik.properties[kolonun_adi]==="text" || window[class_id].tum_ozellikler.objeler["'"+object_namee+"'"].geometrioznitelik.properties[kolonun_adi]==="tam sayı" || window[class_id].tum_ozellikler.objeler["'"+object_namee+"'"].geometrioznitelik.properties[kolonun_adi]==="ondalıklı sayı" ){
              kolon_icerik_name.innerText=""
            }
            else{
            kolon_icerik_name.innerText=window[class_id].tum_ozellikler.objeler["'"+object_namee+"'"].geometrioznitelik.properties[kolonun_adi]
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
            kolonicerik_menu.innerText="Düzenle";
            kolonicerik_menu.setAttribute("id","'"+object_namee+"-"+kolonun_adi+"'_icerik")
            kolonicerik_menu.setAttribute("value","'"+object_namee+"'")
            kolonicerik_menu.style.width="auto";
            kolonicerik_menu.style.height="auto";
            kolonicerik_menu.style.border="solid red 5px";
            kolonicerik_menu.style.marginLeft="0px";
            kolonicerik_menu.style.position="absolute";
            kolonicerik_menu.style.color="white";
            kolonicerik_menu.style.backgroundColor="black";
            kolonicerik_menu.style.position="relative"
      
            if (kolonun_adi!=="featureid" && kolonun_adi !=="Geometri Tipi"){
              kolonicerik_menu.onclick= function(object_namee){
                              object_namee = ((object_namee.target.id.replace(/'/g,"")).replace(kolonun_adi+"_icerik","")).replace("-","")
                              var sayfamesajlari=document.getElementById("sayfamesajlari");
                              sayfamesajlari.innerText="";
                              sayfamesajlari.style.backgroundColor="black";
                              var kolonicerik_bilgi=document.createElement("label");
                              kolonicerik_bilgi.setAttribute("for","kolonicerikal");
                              var icerikalma=document.createElement("input");
                              icerikalma.setAttribute("id","kolonicerikal");
                              if(window[class_id].tum_ozellikler.objeler["'"+object_namee+"'"].geometrioznitelik.properties[kolonun_adi]===null){
                                kolonicerik_bilgi.innerText=""
                                icerikalma.setAttribute("value",window[class_id].tum_ozellikler.objeler["'"+object_namee+"'"].geometrioznitelik.properties[kolonun_adi]);
                              }
                              else{
                              if (window[class_id].tum_ozellikler.kolon_ve_tipleri[kolonun_adi]==="text"){
                                kolonicerik_bilgi.innerText="Column Data Type: Text";
                                icerikalma.setAttribute("type","text");

                                icerikalma.setAttribute("value",window[class_id].tum_ozellikler.objeler["'"+object_namee+"'"].geometrioznitelik.properties[kolonun_adi]);
                              }
                              else if (window[class_id].tum_ozellikler.kolon_ve_tipleri[kolonun_adi]==="tam sayı"){
                                kolonicerik_bilgi.innerText="Column Data Type: Integer";
                                icerikalma.setAttribute("type","number");
                                icerikalma.setAttribute("value",window[class_id].tum_ozellikler.objeler["'"+object_namee+"'"].geometrioznitelik.properties[kolonun_adi]);
                              }
                              else if (window[class_id].tum_ozellikler.kolon_ve_tipleri[kolonun_adi]==="ondalıklı sayı"){
                                kolonicerik_bilgi.innerText="Column Data Type: Float";
                                icerikalma.setAttribute("type","number");
                                icerikalma.setAttribute("step","0.001");
                                icerikalma.setAttribute("value",window[class_id].tum_ozellikler.objeler["'"+object_namee+"'"].geometrioznitelik.properties[kolonun_adi]);

                              }
                            }
                              sayfamesajlari.appendChild(kolonicerik_bilgi);
                              sayfamesajlari.appendChild(document.createElement("br"));
                              sayfamesajlari.appendChild(icerikalma);
                              var degistir_buton=document.createElement("input");
                              degistir_buton.setAttribute("type","submit");
                              degistir_buton.setAttribute("value","Change");
                              degistir_buton.onclick=function(){
                                
                              document.getElementById("'"+object_namee+"-"+kolonun_adi+"'_kolonicerik_detail").removeAttribute("open")
                              var aaa=document.getElementById("kolonicerikal").value;
                              if(window[class_id].tum_ozellikler.objeler["'"+object_namee+"'"].geometrioznitelik.properties[kolonun_adi]===null){
                                window[class_id].tum_ozellikler.objeler["'"+object_namee+"'"].geometrioznitelik.properties[kolonun_adi]=aaa
                              }
                              else{
                              if (kolonicerik_bilgi.innerText==="Column Data Type: Text"){
                                window[class_id].tum_ozellikler.objeler["'"+object_namee+"'"].geometrioznitelik.properties[kolonun_adi]=aaa.toString();
                              }
                              else if (kolonicerik_bilgi.innerText==="Column Data Type: Integer"){
                                window[class_id].tum_ozellikler.objeler["'"+object_namee+"'"].geometrioznitelik.properties[kolonun_adi]=parseInt(aaa);
                              }
                              else if (kolonicerik_bilgi.innerText==="Column Data Type: Float"){
                                window[class_id].tum_ozellikler.objeler["'"+object_namee+"'"].geometrioznitelik.properties[kolonun_adi]=parseFloat(aaa);
                              }}
                            document.getElementById("'"+object_namee+"-"+kolonun_adi+"'_iceriksummary").innerText=window[class_id].tum_ozellikler.objeler["'"+object_namee+"'"].geometrioznitelik.properties[kolonun_adi];
                            

                            bekleme();
                            return
                              }
                              sayfamesajlari.appendChild(degistir_buton);return
              }
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
      oznitelikpenceresikapat(){
        document.getElementById("oznitelikpenceresi").innerText="";
        document.getElementById("oznitelikpenceresi").backgroundColor="unset"
        return
      }
}

