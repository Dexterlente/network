import{c as m,r as n,A as l,a as r,j as s,L as o,B as h}from"./index-335e13f3.js";import"http://localhost:5173/@react-refresh";const p=()=>{const{id:a}=m(),[i,c]=n.useState(null),[t,d]=n.useState([]);return n.useEffect(()=>{fetch(`${l}/api/profile/${a}`).then(e=>e.json()).then(e=>c(e)).catch(e=>console.error(e))},[]),n.useEffect(()=>{fetch(`${l}/api/profile/${a}/followers`).then(e=>e.json()).then(e=>d(e)).catch(e=>console.error(e))},[]),!t||!i?r("div",{children:"Loading..."}):s("div",{className:"border-x-2 h-screen",children:[s("div",{className:"ml-5 mt-5 grid grid-cols-10",children:[r(o,{to:`/profile/${a}`,className:"w-4/12",children:r(h,{className:"h-8 w-8 mt-3"})}),r("div",{className:"col-span-3",children:s("h1",{className:"text-3xl font-semibold",children:[i.first_name," ",i.last_name,s("h2",{className:"font-normal text-lg text-gray-600",children:["@",i.profile_username]})]})})]}),s("div",{className:"grid grid-cols-2 text-center text-lg border-b-2",children:[r(o,{to:`/profile/${a}/following`,className:"hover:bg-gray-300 transition duration-300 ease-in-out py-5 cursor-pointer underline decoration-indigo-500 decoration-4",children:"Following"}),r(o,{to:`/profile/${a}/followers`,className:"hover:bg-gray-300 transition duration-300 ease-in-out py-5 cursor-pointer",children:"Followers"})]}),r("ul",{children:t.map(e=>s("div",{className:"flex py-4  hover:bg-gray-200 transition duration-300 ease-in-out",children:[r("div",{className:"ml-4",children:r("img",{src:e.image,className:"h-16 w-16 rounded-full"})}),s("div",{className:"ml-2 mt-1",children:[s(o,{to:`/profile/${e.pk}`,className:"font-bold cursor-pointer hover:underline",children:[e.first_name," ",e.last_name]}),s("div",{children:["@",e.profile_username]})]})]},e.pk))})]})};export{p as default};
