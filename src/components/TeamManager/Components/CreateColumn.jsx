import { useState } from 'react';
import { Input } from "@nextui-org/react";
import { createColumn } from '@/services/boards';
import { toast } from 'react-toastify';

const CreateColumn = () => {
    const [title, setTitle] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const column = { title };
            const response = await createColumn(column);
            toast.success('Columna creada exitosamente');
        } catch (error) {
            toast.error('Error al crear la columna');
            console.error("Error creating column:", error);
        }
    };

    return (
        <form className="w-full" onSubmit={handleSubmit}>
            <div className="-mx-3 mb-0 flex flex-wrap justify-between">
                <div className="mb-2 w-full px-3">
                    <div className="mb-2 flex w-full justify-between gap-4">
                        <div className="w-full">
                            <Input
                                label="Título"
                                required={true}
                                id="title"
                                name="title"
                                type="text"
                                placeholder="Ingrese el título"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="mb-0 flex w-full justify-between gap-4">
                        <button className="flex justify-center rounded border border-stroke px-6 py-2 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white">
                            Crear
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default CreateColumn;