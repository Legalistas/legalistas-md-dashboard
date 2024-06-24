"use client"
import React, { useEffect, useState } from 'react';
import { getBoards, setBoards as setTitle, getTeams } from "@/services/boards";
import { BsPlus } from "react-icons/bs";
import BoardCard from './BoardCard';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';



const Board = () => {
    const { user } = useAuth();
    const router = useRouter();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [boards, setBoards] = useState([]);
    const [teams, setTeams] = useState([]);
    const [inputValue, setInputValue] = useState({
        name: '',
        user_id: user?.user.id,
        team_id: 2,
        visibility_type: "public"
    });

    useEffect(() => {
        const fetchData = async () => {
            const boardsData = await getBoards();
            const teamsData = await getTeams();
            setBoards(boardsData);
            setTeams(teamsData);
        };

        fetchData();
    }, []);

    const handleOpen = () => {
        onOpen();
    }

    const handleChangeName = (e) => {
        const { value } = e.target;
        setInputValue({ ...inputValue, name: value });
    };

    const handleChangePrivacy = (e) => {
        const { value } = e.target;
        setInputValue({ ...inputValue, visibility_type: value });
    };

    const handleChangeTeamID = (e) => {
        const { value } = e.target;
        setInputValue({ ...inputValue, team_id: value });
    };

    const create_board = async () => {
        console.log(inputValue);
        const response = await setTitle(inputValue)
        if (response) {
            toast.success('Tablero creado con exito!');
            window.location.href = '/tm'
        }else {
            toast.error('Error al crear el tablero');
        }
        onClose();
    }

    return (
        <div>
            <div className="w-full flex">
                <div className="mx-auto mb-4 w-full">
                    <div className="rounded-lg border border-stroke bg-white p-1 shadow-card dark:border-strokedark dark:bg-boxdark">
                        <div className="flex flex-col items-center justify-between space-y-3 p-4 md:flex-row md:space-x-4 md:space-y-0">
                            <div className="w-full md:w-1/2">
                                <h3 className="text-xl font-medium text-black dark:text-white">
                                    Projects
                                </h3>
                            </div>
                            <div className="flex w-full flex-shrink-0 flex-col items-stretch justify-end space-y-2 md:w-auto md:flex-row md:items-center md:space-x-3 md:space-y-0"></div>
                        </div>
                        <div className="w-full p-4">
                            <div className="grid grid-cols-5 gap-4">
                                <button onClick={handleOpen} className="flex h-16 cursor-pointer items-center justify-between rounded-[8px] transition duration-300 hover:bg-black/10 ">
                                    <div className="flex items-center">
                                        <div className="ml-2 mr-2  flex h-12 w-12 items-center justify-center rounded-[8px] border-1 border-dashed border-black bg-transparent">
                                            <BsPlus className="h-6 w-6" />
                                        </div>
                                        <span className="font-semibold">Create project</span>
                                    </div>
                                </button>
                                {boards.map((board, index) => (
                                    <BoardCard key={index} board={board} />
                                ))}
                                <Modal
                                    size='md'
                                    isOpen={isOpen}
                                    onClose={onClose}
                                >
                                    <ModalContent>
                                        {(onClose) => (
                                            <>
                                                <ModalHeader className="flex flex-col gap-1">Nuevo Tablero</ModalHeader>
                                                <ModalBody>
                                                    <Input
                                                        key="name"
                                                        radius="lg"
                                                        type="text"
                                                        label="Ingresa un Título"
                                                        placeholder="EJ: Contable"
                                                        className=""
                                                        onChange={handleChangeName}
                                                    />
                                                    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                                                        <Select
                                                            key="visibilitytype"
                                                            label="Privacidad"
                                                            className="w-1/2"
                                                            onChange={handleChangePrivacy}
                                                        >
                                                            <SelectItem key="public" >
                                                                Publico
                                                            </SelectItem>
                                                            <SelectItem key="private">
                                                                Privado
                                                            </SelectItem>
                                                        </Select>
                                                        <Select
                                                            key="teamid"
                                                            label="Equipos"
                                                            className="w-1/2"
                                                            onChange={handleChangeTeamID}
                                                        >
                                                            {teams.map(team => (
                                                                <SelectItem key={team.id}>
                                                                    {team.name}
                                                                </SelectItem>
                                                            ))}
                                                        </Select>
                                                    </div>
                                                </ModalBody>
                                                <ModalFooter>
                                                    <Button color="danger" variant="light" onPress={onClose}>
                                                        Cancelar
                                                    </Button>
                                                    <Button color="primary" onPress={create_board}>
                                                        Guardar
                                                    </Button>
                                                </ModalFooter>
                                            </>
                                        )}
                                    </ModalContent>
                                </Modal>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Board;