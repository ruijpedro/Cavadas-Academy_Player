import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
export async function exportElementToPdf(id, filename='relatorio.pdf') {
  const el=document.getElementById(id); if(!el) throw new Error('Elemento não encontrado')
  const c=await html2canvas(el,{scale:2,backgroundColor:'#000',useCORS:true})
  const img=c.toDataURL('image/png'); const pdf=new jsPDF('p','mm','a4')
  const w=pdf.internal.pageSize.getWidth(); const h=c.height*w/c.width
  pdf.addImage(img,'PNG',0,0,w,h); const blob=pdf.output('blob'); pdf.save(filename); return blob
}
