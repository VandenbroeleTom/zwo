(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{282:function(e,t,n){"use strict";n.r(t);var o={name:"DownloadButton",props:{workoutFile:Object},computed:{download(){return(this.workoutFile.name||"Workout")+".zwo"},href(){return"data:text/xml;charset=utf8,"+encodeURIComponent(this.xml)},xml(){if("undefined"==typeof document)return"";const e=document.implementation.createDocument("","",null),t=e.createElement("workout_file"),n=e.createElement("author");n.innerHTML=this.workoutFile.author,t.appendChild(n);const o=e.createElement("name");o.innerHTML=this.workoutFile.name,t.appendChild(o);const r=e.createElement("description");r.innerHTML=this.workoutFile.description,t.appendChild(r);const i=e.createElement("sportType");i.innerHTML="bike",t.appendChild(i);const a=e.createElement("tags");for(const t of this.workoutFile.tags){const n=e.createElement("tag");n.setAttribute("name",t.toUpperCase()),a.appendChild(n)}const l=e.createElement("workout");for(const t of this.workoutFile.workout)t.tag&&l.appendChild((()=>{const n=e.createElement(t.tag);for(const e of Object.keys(t.attributes))console.log(e),n.setAttribute(e,t.attributes[e]);return n})());t.appendChild(l),e.appendChild(t);const s=new XMLSerializer;return console.log(s.serializeToString(e.documentElement)),s.serializeToString(e.documentElement)}}},r=n(10),i=Object(r.a)(o,(function(){var e=this._self._c;return e("div",{staticClass:"download"},[e("a",{staticClass:"btn btn-primary",attrs:{download:this.download,href:this.href}},[this._v("Download")])])}),[],!1,null,null,null);t.default=i.exports}}]);