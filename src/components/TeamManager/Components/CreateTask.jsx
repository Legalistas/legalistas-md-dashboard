import { useState, useEffect } from 'react';
import { Input } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";
import { getTeams, getUsers } from '@/services/users';

const CreateTask = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [teams, setTeams] = useState();
    const [selectedTeam, setSelectedTeam] = useState(null);
    const [users, setUsers] = useState();
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        //get teams
        getTeams().then((data) => {
            setTeams(data);
        });

        //get users
        getUsers().then((data) => {
            setUsers(data);
        });
    }, [])


    const handleSubmit = (e) => {
        e.preventDefault();
        // handle form submission
        console.log(title, description, selectedTeam, selectedUser);
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
                    <div className="mb-2 flex w-full justify-between gap-4">
                        <div className="w-full">
                            <Input
                                label="Descripción"
                                required={true}
                                id="description"
                                name="description"
                                type="text"
                                placeholder="Ingrese la descripción"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="mb-2 flex w-full justify-between gap-4">
                        <div className="w-1/2">
                            <Select
                                label="Equipos"
                                placeholder="Seleccione equipos"
                                selectionMode="multiple"
                                className="max-w-xs"
                                onChange={(value) => setSelectedTeam(value)}
                            >
                                {teams?.map((team) => (
                                    <SelectItem key={team.id}>
                                        {team.name}
                                    </SelectItem>
                                ))}
                            </Select>
                        </div>
                        <div className="w-1/2">
                            <Select
                                label="Usuarios"
                                placeholder="Seleccione usuarios"
                                selectionMode="multiple"
                                className="max-w-xs"
                                onChange={(value) => setSelectedUser(value)}
                            >
                                {users?.map((user) => (
                                    <SelectItem key={user.id}>
                                        {user.profile.firstname} {user.profile.lastname}
                                    </SelectItem>
                                ))}
                            </Select>
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

export default CreateTask;
