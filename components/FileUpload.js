import {useState} from 'react';
import Papa from 'papaparse';
import XLSX from 'xlxsx';

const FileUpload = ({onDataUpload}) => {
    const [file, setFile]=useState(null);

    const handleFileUpload = (event)=>{
        const uploadedFile =event.target.files[0];
        setFile(uploadedFile);

        if(uploadedFile.type==='text/csv') {
            Papa.parse(uploadedFile,{
                header:true,
                complete:(results)=>{
                    onDataUpload(results.data);
                },
            });

        } else {
            const reader= new FileReader();
            reader.onload= (e) =>{
                const data= new Uint8Array(e.target.result);
                const workbook=XLSX.read(data, {type:'array'});
                const sheetName=workbook.sheetNames[0];
                const sheet=workbook.Sheets[sheetName];
                const json= XLSX.utils.sheet_to_json(sheet);
                onDataUpload(json);
            };
            reader.readAsArrayBuffer(uploadedFile);

        }
    };
    return (
        <div>
            <input type='file' onChange={handleFileUpload} />
        </div>
    );
};

export default FileUpload;