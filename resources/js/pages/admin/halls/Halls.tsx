import AdminLayout from "@/components/mycomponents/AdminLayout";
import HallLayoutBuilder from "./HallLayoutBuilder";

export default function Halls() {

    return (
        <div>
            <HallLayoutBuilder/>
        </div>
    )
}

Halls.layout = (page: React.ReactNode) => (
    <AdminLayout>{page}</AdminLayout>
);

