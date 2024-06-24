import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Board from "@/components/TeamManager/Board";
import Header from "@/components/TeamManager/Header"

const TeamManager = () => {
    return (
        <DefaultLayout>
            <Breadcrumb pageName="Teams " />
            <Header />
            <Board />
        </DefaultLayout>
    );
};

export default TeamManager;