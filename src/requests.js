import axios from 'axios';

async function getCarRecommandation () {
    console.log("here");
    let res = await axios.get('http://127.0.0.1:8000/carName?Price=200000&Year=2007&Kilometer=50000&Fuel=Petrol&SellerType=Individual&Transmisson=Manual&Owner=First%20Owner')
    console.log("res", res);
    return res.data;
}


export default getCarRecommandation;