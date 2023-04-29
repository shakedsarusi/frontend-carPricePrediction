import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import Select from 'react-select'
import './styles/Predictprice.css'



const Carrec = () => {

    const [inputs, setInputs] = useState({});
    const [resCarRecommandation, setResCarRecommandation] = useState("");
    const [fuel, setFule] = useState([]);
    const [seller, setSeller] = useState([]);
    const [transmission, setTransmission] = useState([]);
    const [owner, setOwner] = useState([]);


    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
      }
    
      const handleFuleChange = (input) => {
        setInputs(values => ({...values, "fuel": input["value"]}))
    }

    const handleSellerChange = (input) => {
        setInputs(values => ({...values, "sellertype": input["value"]}))
    }
    const handleTransmissionChange = (input) => {
        setInputs(values => ({...values, "transmission": input["value"]}))

    }

    const handleOwnerChange = (input) => {
        setInputs(values => ({...values, "owner": input["value"]}))
    }
    
    const handleSubmit = (event) => {
    event.preventDefault();
    getCarRecommandation(inputs)
    }

    function convertArrayToValueLableOptions(options) {
      let ValueLableList = []
      for (const index in options){
          ValueLableList.push({ value: options[index], label: options[index] })
      }; 
      return ValueLableList;
  }

  useState(()=> {
    const fuelOptions = convertArrayToValueLableOptions(["Petrol","Diesel", "CNG", "LPG"])
    const sellerOptions = convertArrayToValueLableOptions(["Individual","Dealer"])
    const transmissionOptions = convertArrayToValueLableOptions(["Manual","Automatic"])
    const ownerOptions = convertArrayToValueLableOptions(["First Owner","Second Owner", "Third Owner", "Fourth And Above Owner"])

    setFule(fuelOptions)
    setSeller(sellerOptions)
    setTransmission(transmissionOptions)
    setOwner(ownerOptions)
})

    
    function getCarRecommandation(inputs) {
        axios.get(`http://127.0.0.1:8000/carName?Price=${inputs.selling}&Year=${inputs.year}&Kilometer=${inputs.kmdriven}&Fuel=${inputs.fuel}&SellerType=${inputs.sellertype}&Transmisson=${inputs.transmission}&Owner=${inputs.owner}`)
        .then((res) => {
          setResCarRecommandation(res.data);
        })
    }




    return (
       <form onSubmit={handleSubmit}>
         <h1>Car Recommandation page</h1>
         <br />
        
        <label>
          <div className='subTitel'>Enter Selling Price: </div>
          <input 
            type="text" 
            name="selling" 
            value={inputs.selling || ""} 
            onChange={handleChange}
            className='input'
          />
        </label>
        <br />
        <br />
        <label>
          <div className='subTitel'>Enter Year(1990-2023):</div>
            <input 
              type="text" 
              name="year" 
              value={inputs.year || ""} 
              onChange={handleChange}
              className='input'
            />
        </label>
        <br /> <br />
        <label>
          <div className='subTitel'>Enter KM Driven:</div>
          <input 
            type="text" 
            name="kmdriven" 
            value={inputs.kmdriven || ""} 
            onChange={handleChange}
            className='input'
          />
        </label>
        <br /> <br />
        <label>
          <div className='subTitel'>Choose a Fuel:</div>
          <Select options={fuel} onChange={handleFuleChange} className="select"/>
        </label>
        <br />
        <label>
          <div className='subTitel'>Choose Seller Type:</div>
          <Select options={seller} onChange={handleSellerChange} className="select"/>
        </label>
        <br />
        <label>
          <div className='subTitel'>Choose Transmission:</div>
          <Select options={transmission} onChange={handleTransmissionChange} className="select"/>
        </label>
        <br />
        <label>
          <div className='subTitel'>Choose Owner:</div>
          <Select options={owner} onChange={handleOwnerChange} className="select"/>
        </label>
        <br /> <br />

        <input type="submit" className='submit'/>
        <br />
        <div>
            {resCarRecommandation?(
                <h3 className="CarRecAnswer">The best recommended car is: {resCarRecommandation}</h3>
            ):("")}
        </div>
    </form>
  )
    
};

export default Carrec;