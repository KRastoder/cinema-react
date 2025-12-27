import AdminSideBar from "@/components/mycomponents/AdminSideBar";
import CreateMovieForm from "./CreateMoviesForm";


export default function AdminMovies() {
    return (
        <>
            <main className="flex h-full">
                <AdminSideBar />
                <div className="w-full flex items-center justify-center h-full">
                    <CreateMovieForm />
                </div>
            </main>


        </>

    )

}
