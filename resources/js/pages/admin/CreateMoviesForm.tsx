import React from 'react';
import { useForm } from '@inertiajs/react';

interface MovieFormData {
    title: string;
    duration: number;
    description: string;
    release_date: string;
    poster: File | null;
}

const CreateMovieForm: React.FC = () => {
    const { data, setData, post, processing, errors } = useForm<MovieFormData>({
        title: '',
        duration: 0,
        description: '',
        release_date: '',
        poster: null,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setData(name as keyof MovieFormData, name === 'duration' ? Number(value) : value);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setData('poster', e.target.files[0]);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Inertia automatically converts to FormData if any value is a File
        post('/admin/movies/store', {
            forceFormData: true, // <-- ensures file uploads are handled correctly
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label>Title</label>
                <input type="text" name="title" value={data.title} onChange={handleChange} />
                {errors.title && <div className="text-red-500">{errors.title}</div>}
            </div>

            <div>
                <label>Duration (minutes)</label>
                <input type="number" name="duration" value={data.duration} onChange={handleChange} />
                {errors.duration && <div className="text-red-500">{errors.duration}</div>}
            </div>

            <div>
                <label>Description</label>
                <textarea name="description" value={data.description} onChange={handleChange} />
                {errors.description && <div className="text-red-500">{errors.description}</div>}
            </div>

            <div>
                <label>Release Date</label>
                <input type="date" name="release_date" value={data.release_date} onChange={handleChange} />
                {errors.release_date && <div className="text-red-500">{errors.release_date}</div>}
            </div>

            <div>
                <label>Poster</label>
                <input type="file" name="poster" accept="image/*" onChange={handleFileChange} />
                {errors.poster && <div className="text-red-500">{errors.poster}</div>}
            </div>

            <button
                type="submit"
                disabled={processing}
                className="bg-blue-500 text-white px-4 py-2 rounded"
            >
                {processing ? 'Uploading...' : 'Create Movie'}
            </button>
        </form>
    );
};

export default CreateMovieForm;

