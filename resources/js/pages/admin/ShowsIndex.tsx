import AdminLayout from "@/components/mycomponents/AdminLayout"
import ShowCreateForm from "@/components/mycomponents/ShowCreateFrom"

interface Movie {
    id: number
    title: string
}

interface Hall {
    id: number
    name: string
}

interface ShowsIndexProps {
    allMovies: Movie[]
    allHalls: Hall[]
}

export default function ShowsIndex({ allMovies, allHalls }: ShowsIndexProps) {
    return (
        <div>
            <ShowCreateForm
                movies={allMovies}
                halls={allHalls}
            />
        </div>
    )
}

ShowsIndex.layout = (page: React.ReactNode) => (
  <AdminLayout>{page}</AdminLayout>
);
