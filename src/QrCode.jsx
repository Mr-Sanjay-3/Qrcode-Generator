import React, { useState, useEffect } from 'react'
import { LoadingSpinner } from './Components/LoadingSpinner'

export const QrCode = () => {

  const[pageLoading, setPageLoading] =useState(true)
  const [img, setImg] = useState('')
  const [Loading, setLoading] = useState(false)
  const [Error, setError] = useState(false)
  const [QrData, setQrData] = useState('Sanjay')
   const[QrSize, setQrSize] = useState('150')

   useEffect(() => {
    // Simulate loading page
    const timer = setTimeout(() => setPageLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

// // Load from localStorage on component mount
// useEffect(() => {
//   const SavedData = localStorage.getItem('qr-data');
//   const SavedSize = localStorage.getItem('qr-size');
//   if (SavedData) setQrData(SavedData);
//   if (SavedSize) setQrSize(SavedSize); 

//   const timer = setTimeout(() => setPageLoading(false), 2000);
//   return () => clearTimeout(timer);
// }, []);

// // Save QrData to localStorage when it changes
// useEffect(() => {
//   localStorage.setItem('qr-data', QrData);
// }, [QrData]);

// // Save QrSize to localStorage when it changes
// useEffect(() => {
//   localStorage.setItem('qr-size', QrSize);
// }, [QrSize]);


 function generateQr() {
setError(false);
if (QrData.trim() === '') {
  setError(true);
  setImg(''); // clear old QR code image
  return;

}
setLoading(true)

  try {
    const url = `https://api.qrserver.com/v1/create-qr-code/?size=${QrSize}x${QrSize}&data=${encodeURIComponent(QrData)}`;
    setImg(url);
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  };
};

function downloadqr() {
fetch(img)
.then((Response) => Response.blob())
.then((blob)=> {
const keyLink = document.createElement("a");
keyLink.href = URL.createObjectURL(blob);
keyLink.download ="QrCode.png";
document.body.appendChild(keyLink)
keyLink.click();
document.body.removeChild(keyLink)
}).catch((error)=> {
  console.error("Error on Downloading", error)
})


}

if (pageLoading) return <LoadingSpinner />;
 return (
<>

<div className='AppContainer'>
<h1>QR CODE GENERATER</h1>
{Loading && <p
style={{
 fontFamily:'sans-serif',
 fontStyle:'italic',
 textTransform:'uppercase',
 color:'black',
}}>Loading...</p>}

{Error && <p
style={{
  color:'rgb(245, 203, 13)',
  textShadow:'0 0 10px (white)',
}}>Please Enter Valid Data</p>}


{img && <img src={img} className='QrImage' />}


<label htmlFor="datainput" className='inputlable'>Data For Qr Code:
</label>
<input type="text" className='datainput' value={QrData}  placeholder='Enter Data For QrCode..'
 onChange={(e)=>setQrData(e.target.value)} />
<label htmlFor="sizeinput" className='lable2'>
    Image Size (e.g..150)
</label>
<input 
type="text"
id='sizeinput' 
value={QrSize}
 placeholder='Enter Image Size'
onChange={(e)=>setQrSize(e.target.value)}/>
<button className='buttonG' disabled ={Loading} onClick={generateQr}>Generate Qr Code</button>
<button className='buttonD' onClick = {downloadqr}>Downlode Qr Code</button>
<p className='footer'>Designed By <a href="mailto:sanjayprogrammer3@gmail.com">Sanjay</a></p>

</div>
</>
  )
}
//Designed By Sanjay
export default QrCode










