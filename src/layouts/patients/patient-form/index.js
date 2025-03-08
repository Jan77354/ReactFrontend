import { useParams } from "react-router-dom";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import PatientForm from "../components/PatientForm";

function PatientFormPage() {
    const { id, action } = useParams();

    const getTitle = () => {
        if (action === "view") return "View Patient";
        if (action === "edit") return "Edit Patient";
        return "Add New Patient";
    };

    return (
        <DashboardLayout>
            <DashboardNavbar title={getTitle()} />
            <MDBox pt={6} pb={3}>
                <MDBox mb={3}>
                    <PatientForm />
                </MDBox>
            </MDBox>
            <Footer />
        </DashboardLayout>
    );
}

export default PatientFormPage;