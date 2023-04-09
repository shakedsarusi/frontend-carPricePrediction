import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import Select from 'react-select'

const Predictprice = () => {
    const [inputs, setInputs] = useState({});
    const [carlist, setcarlist] = useState([]);
    const [resPredictedPrice, setResPredictedPrice] = useState("");

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
      }
    
      const handleSubmit = (event) => {
        event.preventDefault();
        console.log(inputs);
        getPredictedPrice(inputs)
      }

      useState(()=> {
        axios.get('http://127.0.0.1:8000/listOfCars')
        .then(res => {
            let carlist = res.data.split(',')
            setcarlist(carlist);
        })
    })

    function getPredictedPrice(inputs) {
        axios.get(`http://127.0.0.1:8000/price?CarName=${inputs.carModel}&Year=${inputs.year}&Kilometer=${inputs.kmdriven}&Fuel=${inputs.fuel}&SellerType=${inputs.sellertype}&Transmisson=${inputs.transmission}&Owner=${inputs.owner}
        `)
        .then((res) => {
            setResPredictedPrice(res.data);
        })
    }

    return (
       <form onSubmit={handleSubmit}>
         <h1>Predict Price page</h1>
         <br />
        
         {/* <label>
        Choose Car Model: 
        <Select name="carModel" value={inputs.carModel} onChange={handleChange}>
            {carlist.map((option) => (
                <option value={option}>{option}</option>
            ))}
        </Select>
        </label> */}
        <label>
          Search Car Model:
          <input 
              type="text"
              name="carModel"
              value={inputs.carModel}
              onChange={handleChange}
              list="carModels"
          />
          <datalist id="carModels">
              {carlist.map((option) => (
                  <option value={option} />
              ))}
          </datalist>
      </label>  
        <br />
        <br />
      <label>Enter Year(1990-2023):
        <input 
          type="text" 
          name="year" 
          value={inputs.year || ""} 
          onChange={handleChange}
        />
        </label>
        <br /> <br />
        <label>Enter KM Driven:
        <input 
          type="text" 
          name="kmdriven" 
          value={inputs.kmdriven || ""} 
          onChange={handleChange}
        />
        </label>
        <br /> <br />
        <label>
        Choose a Fuel:
        <select name="fuel" value={inputs.fuel} onChange={handleChange}>
            <option value="">Select fuel type</option>
            <option value="Petrol">Petrol</option>
            <option value="Diesel">Diesel</option>
            <option value="CNG">CNG</option>
            <option value="LPG">LPG</option>
        </select>
        </label>
        <br /> <br />
        <label>
        Choose Seller Type:
        <select name="sellertype" value={inputs.sellertype} onChange={handleChange}>
            <option value="">Select seller type</option>
            <option value="Individual">Individual</option>
            <option value="Dealer">Dealer</option>
        </select>
        </label>
        <br /> <br />
        <label>
        Choose Transmission:
        <select name="transmission" value={inputs.transmission} onChange={handleChange}>
            <option value="">Select Transmission</option>
            <option value="Manual">Manual</option>
            <option value="Automatic">Automatic</option>
        </select>
        </label>
        <br /> <br />
        <label>
        Choose Owner:
        <select name="owner" value={inputs.owner} onChange={handleChange}>
            <option value="">Select Owner</option>
            <option value="First Owner">First Owner</option>
            <option value="Second Owner">Second Owner</option>
            <option value="Third Owner">Third Owner</option>
            <option value="Fourth">Fourth & Above Owner</option>
        </select>
        </label>
        <br /> <br />
        <input type="submit" />
        <br /> <br />
        <div>
            {resPredictedPrice?(
                <h3>{resPredictedPrice}</h3>
            ):("")}
        </div>
    </form>
  )
    
};

export default Predictprice;