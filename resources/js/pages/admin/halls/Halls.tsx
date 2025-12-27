import AdminLayout from "@/components/mycomponents/AdminLayout";

export default function Halls() {

    return (
        <div>
            <h1 className="text-xl">Hello World</h1>
        </div>
    )
}

Halls.layout = (page: React.ReactNode) => (
    <AdminLayout>{page}</AdminLayout>
);

