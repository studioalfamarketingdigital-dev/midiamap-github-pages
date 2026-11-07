import type {MetadataRoute} from 'next';import {spaces} from '../lib/spaces';
const base='https://midiamap.studioalfamkt.online';
const staticPaths=['','espacos/','mapa/','anunciar/','seja-parceiro/','sobre/','contato/','planos/','faq/','como-funciona/','formatos/outdoor/','formatos/painel-led/','formatos/dooh/','formatos/indoor/','formatos/tv/','formatos/radio/','formatos/midia-impressa/'];
export default function sitemap():MetadataRoute.Sitemap{const now=new Date();return [...staticPaths.map(path=>({url:base+'/'+path,lastModified:now,changeFrequency:'weekly' as const,priority:path===''?1:0.7})),...spaces.map(space=>({url:base+'/espacos/'+space.id+'/',lastModified:now,changeFrequency:'weekly' as const,priority:0.8}))]}
