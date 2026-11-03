'use client';
import {useEffect,useState} from 'react';
import AdminPanel from '../components/AdminPanel';
export default function AdminHashPanel(){const [open,setOpen]=useState(false);useEffect(()=>{const sync=()=>setOpen(window.location.hash==='#adm');sync();window.addEventListener('hashchange',sync);return()=>window.removeEventListener('hashchange',sync);},[]);return open?<div id="adm"><AdminPanel/></div>:null;}
