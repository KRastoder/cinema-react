import { useForm } from '@inertiajs/react'

interface Movie {
    id: number
    title: string
}

interface Hall {
    id: number
    name: string
}

interface ShowCreateFormProps {
    movies: Movie[]
    halls: Hall[]
}

const ShowCreateForm = ({ movies, halls }: ShowCreateFormProps) => {
    const { data, setData, post, processing, errors } = useForm({
        movie_id: '',
        hall_id: '',
        price: '',
        vip_price: '',
        show_time: '',
        show_date: '',
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        post('/admin/shows') 
    }

    return (
        <form
            className="max-w-xl bg-gray-900 rounded-xl p-6 shadow-lg space-y-5"
            onSubmit={handleSubmit}
        >
            <h2 className="text-xl font-semibold text-gray-100">
                Create New Show
            </h2>

            {/* Movie select */}
            <div className="space-y-1">
                <label className="text-sm text-gray-400">Movie</label>
                <select
                    name="movie_id"
                    value={data.movie_id}
                    onChange={e => setData('movie_id', e.target.value)}
                    className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    <option value="">Select a movie</option>
                    {movies.map(movie => (
                        <option key={movie.id} value={movie.id}>
                            {movie.title}
                        </option>
                    ))}
                </select>
                {errors.movie_id && (
                    <span className="text-red-500 text-sm">{errors.movie_id}</span>
                )}
            </div>

            {/* Hall select */}
            <div className="space-y-1">
                <label className="text-sm text-gray-400">Hall</label>
                <select
                    name="hall_id"
                    value={data.hall_id}
                    onChange={e => setData('hall_id', e.target.value)}
                    className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    <option value="">Select a hall</option>
                    {halls.map(hall => (
                        <option key={hall.id} value={hall.id}>
                            {hall.name}
                        </option>
                    ))}
                </select>
                {errors.hall_id && (
                    <span className="text-red-500 text-sm">{errors.hall_id}</span>
                )}
            </div>

            {/* Prices */}
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                    <label className="text-sm text-gray-400">Price</label>
                    <input
                        type="number"
                        name="price"
                        value={data.price}
                        onChange={e => setData('price', e.target.value)}
                        placeholder="Standard"
                        className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    {errors.price && (
                        <span className="text-red-500 text-sm">{errors.price}</span>
                    )}
                </div>

                <div className="space-y-1">
                    <label className="text-sm text-gray-400">VIP Price</label>
                    <input
                        type="number"
                        name="vip_price"
                        value={data.vip_price}
                        onChange={e => setData('vip_price', e.target.value)}
                        placeholder="VIP"
                        className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    {errors.vip_price && (
                        <span className="text-red-500 text-sm">{errors.vip_price}</span>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                    <label className="text-sm text-gray-400">Show Time</label>
                    <input
                        type="number"
                        name="show_time"
                        min={1}
                        max={24}
                        value={data.show_time}
                        onChange={e => setData('show_time', e.target.value)}
                        placeholder="Hour (1–24)"
                        className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    {errors.show_time && (
                        <span className="text-red-500 text-sm">{errors.show_time}</span>
                    )}
                </div>

                <div className="space-y-1">
                    <label className="text-sm text-gray-400">Show Date</label>
                    <input
                        type="date"
                        name="show_date"
                        value={data.show_date}
                        onChange={e => setData('show_date', e.target.value)}
                        className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    {errors.show_date && (
                        <span className="text-red-500 text-sm">{errors.show_date}</span>
                    )}
                </div>
            </div>

            {/* Submit */}
            <div className="pt-3">
                <button
                    type="submit"
                    disabled={processing}
                    className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-2 rounded-md transition"
                >
                    {processing ? 'Creating...' : 'Create Show'}
                </button>
            </div>
        </form>
    )
}

export default ShowCreateForm
