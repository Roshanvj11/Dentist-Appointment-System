import axios from "axios";
const appointmentApi=axios.create();

export const doctors=async(data)=>{
    try {
        const result =await appointmentApi.get('/api/doctor/doctorList',data);
        return result.data; 
    } catch (error) {
        throw (
            error.response?.data?.msg ||
            error.response?.data?.message ||
            error.response?.data ||
            error.message
          );
    }
    
}