// Módulo Google reutilizável: editar CLIENT_ID e API_KEY.
export const GOOGLE_CONFIG = {
  CLIENT_ID: 'COLOCA_AQUI_O_GOOGLE_CLIENT_ID',
  API_KEY: 'COLOCA_AQUI_A_GOOGLE_API_KEY',
  SCOPES: 'https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/spreadsheets https://www.googleapis.com/auth/calendar.events'
}
let tokenClient=null, ready=false
function loadScript(src){return new Promise((res,rej)=>{if(document.querySelector(`script[src="${src}"]`)) return res(); const s=document.createElement('script'); s.src=src; s.async=true; s.defer=true; s.onload=res; s.onerror=rej; document.body.appendChild(s)})}
export async function initGoogle(){if(ready)return true; await loadScript('https://apis.google.com/js/api.js'); await loadScript('https://accounts.google.com/gsi/client'); await new Promise(r=>window.gapi.load('client',async()=>{await window.gapi.client.init({apiKey:GOOGLE_CONFIG.API_KEY,discoveryDocs:['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest','https://sheets.googleapis.com/$discovery/rest?version=v4','https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest']}); r()})); tokenClient=window.google.accounts.oauth2.initTokenClient({client_id:GOOGLE_CONFIG.CLIENT_ID,scope:GOOGLE_CONFIG.SCOPES,callback:''}); ready=true}
export async function signInGoogle(){await initGoogle(); return new Promise((res,rej)=>{tokenClient.callback=r=>r.error?rej(r):res(r); tokenClient.requestAccessToken({prompt:'consent'})})}
export async function createDriveFolder(name='Cav Academy'){const r=await window.gapi.client.drive.files.create({resource:{name,mimeType:'application/vnd.google-apps.folder'},fields:'id,name,webViewLink'}); return r.result}
export async function uploadPdfToDrive(name,blob,folderId=null){const meta={name,mimeType:'application/pdf',...(folderId?{parents:[folderId]}:{})}; const f=new FormData(); f.append('metadata',new Blob([JSON.stringify(meta)],{type:'application/json'})); f.append('file',blob); const token=window.gapi.client.getToken()?.access_token; const r=await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,name,webViewLink',{method:'POST',headers:new Headers({Authorization:`Bearer ${token}`}),body:f}); return r.json()}
