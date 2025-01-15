import { useEffect, useState } from "react";


const CuntryCard=({flag,name})=>{
    return(
        <div className="countryCard"
            style={{
                height:"200px",
                width:"200px",
                border:"1px solid black",
                borderRadius:"5px",
                display:"flex",
                flexDirection:"column",
                justifyContent:"center",
                alignItems:"center",
                
                textAlign:"center"

                
            }}
            >
            <img src={flag} alt={name + "flag"}
            style={{
                height:"100px",
                width:"100px"
            }}
            />
            <p2>{name}</p2>
            
        </div>
    )

}
export default function CuntryFlag(){


    const citiesApi="  https://countries-search-data-prod-812920491762.asia-south1.run.app/countries ";
   
    const [serchText,setserchText]=useState("");
    const [countryData,setCountryData]=useState([]);
    useEffect(()=>{
      const fetchCuntries= async()=>{
        try{
            const response= await fetch(citiesApi);
            const jsonData= await response.json();
            setCountryData(jsonData)
        }catch(error){
            console.error("Error fetching data:",error)
        }
      };
      fetchCuntries();
    },[])
     const filteredData=countryData.filter((country)=> country.common.toLocaleLowerCase().includes(serchText.toLocaleLowerCase()));
    const handelChange=(e)=>{
        setserchText(e.target.value)

    }
    
    return(
            <>
            <input type="text" placeholder="Serch for countries"  style={{marginTop:"10px",height:"30px",width:"50vw"}} onChange={handelChange} value={serchText}></input>
            <div
            style={{
                marginTop:"20px",
                display:"flex",
                justifyContent:"center",
                alignItems:"center",
                flexWrap:"wrap",
                gap:"10px"
            }}
            >
              
           {filteredData.map((cuntryData)=>(
            <CuntryCard key={cuntryData.abbr} name={cuntryData.common} flag={cuntryData.png}/>
           ))

           }
            
        </div>
        </>
    )
}