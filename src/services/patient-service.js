import HttpService from "./http.service";

class PatientService {
    getAllPatients = async () => {
        return await HttpService.get('patients');
    };

    getPatientById = async (id) => {
        return await HttpService.get(`patients/${id}`);
    };

    createPatient = async (patientData) => {
        return await HttpService.post('patients', patientData);
    };

    updatePatient = async (id, patientData) => {
        return await HttpService.put(`patients/${id}`, patientData);
    };

    deletePatient = async (id) => {
        return await HttpService.delete(`patients/${id}`);
    };
}

export default new PatientService();