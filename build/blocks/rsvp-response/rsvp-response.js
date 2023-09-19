(()=>{"use strict";var e={n:t=>{var s=t&&t.__esModule?()=>t.default:()=>t;return e.d(s,{a:s}),s},d:(t,s)=>{for(var r in s)e.o(s,r)&&!e.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:s[r]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)};const t=window.wp.element,s=window.wp.domReady;var r=e.n(s);const a=window.wp.i18n,n=(e,t=!1)=>{for(const[s,r]of Object.entries(e)){let e=s;t&&(e+=t),addEventListener(e,(e=>{r(e.detail)}),!1)}};function l(e){if("object"==typeof GatherPress)return e.split(".").reduce(((e,t)=>e&&e[t]),GatherPress)}window.wp.data;const p=({eventId:e,value:s,limit:r,responses:p=[],avatarOnly:o=!1})=>{const[i,c]=(0,t.useState)(p);n({setRsvpResponse:c},e);let m="";return"object"==typeof i&&void 0!==i[s]&&(p=[...i[s].responses],r&&(p=p.splice(0,r)),m=p.map(((e,s)=>{const{profile:r,name:a,photo:n,role:l}=e;let{guests:p}=e;return p=p?" +"+p+" guest(s)":"",(0,t.createElement)("div",{key:s,className:"gp-rsvp-response__item"},(0,t.createElement)("figure",{className:"gp-rsvp-response__member-avatar"},(0,t.createElement)("a",{href:r},(0,t.createElement)("img",{alt:a,title:a,src:n}))),!1===o&&(0,t.createElement)("div",{className:"gp-rsvp-response__member-info"},(0,t.createElement)("div",{className:"gp-rsvp-response__member-name"},(0,t.createElement)("a",{href:r},a)),(0,t.createElement)("div",{className:"gp-rsvp-response__member-role"},l),(0,t.createElement)("small",{className:"gp-rsvp-response__guests"},p)))}))),(0,t.createElement)(t.Fragment,null,"attending"===s&&0===m.length&&!1===o&&(0,t.createElement)("div",{className:"gp-rsvp-response__no-responses"},!1===l("has_event_past")?(0,a.__)("No one is attending this event yet.","gatherpress"):(0,a.__)("No one went to this event.","gatherpress")),m)},o=({items:e,activeValue:s,limit:r=!1})=>{const a=l("post_id"),n=l("responses"),o=e.map(((e,l)=>{const{value:o}=e,i=o===s?"active":"hidden";return(0,t.createElement)("div",{key:l,className:`gp-rsvp-response__items gp-rsvp-response__${i}`,id:`gp-rsvp-${o}`,role:"tabpanel","aria-labelledby":`gp-rsvp-${o}-tab`},(0,t.createElement)(p,{eventId:a,value:o,limit:r,responses:n}))}));return(0,t.createElement)("div",{className:"gp-rsvp-response__content"},o)},i=()=>{let e="attending";const s=l("responses").attending.count,r=l("has_event_past"),p=l("current_user.status"),i=[{title:!1===r?(0,a.__)("Attending","gatherpress"):(0,a.__)("Went","gatherpress"),value:"attending"},{title:!1===r?(0,a.__)("Waiting List","gatherpress"):(0,a.__)("Wait Listed","gatherpress"),value:"waiting_list"},{title:!1===r?(0,a.__)("Not Attending","gatherpress"):(0,a.__)("Didn't Go","gatherpress"),value:"not_attending"}];e=void 0!==p&&"attend"!==p&&""!==p?p:e;const[c,m]=(0,t.useState)(e),[_,v]=(0,t.useState)(8),[d,g]=(0,t.useState)(s);return n({setRsvpStatus:m,setRsvpCount:g},l("post_id")),(0,t.createElement)(t.Fragment,null,(0,t.createElement)("div",{className:"gp-rsvp-response"},(0,t.createElement)("div",{className:"gp-rsvp-response__header"},(0,t.createElement)("div",{className:"gp-rsvp-response__title"},(0,a.__)("Attending","gatherpess")," (",d,")"),(0,t.createElement)("div",{className:"gp-rsvp-response__see-all"},(0,t.createElement)("a",{href:"#"},(0,a.__)("See all","gatherpress")))),(0,t.createElement)(o,{items:i,activeValue:c,limit:_})))};r()((()=>{const e=document.querySelectorAll('[data-gp_block_name="rsvp-response"]');for(let s=0;s<e.length;s++)(0,t.createRoot)(e[s]).render((0,t.createElement)(i,null))}))})();