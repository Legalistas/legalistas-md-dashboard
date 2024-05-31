"use client";
import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import path from 'path';
import { useAuth } from "@/contexts/AuthContext";
import { Avatar } from "@nextui-org/avatar";
const axios = require('axios');

function Page() {
    const pathname = usePathname();
    const currentFolder = path.basename(pathname);
    const [cardData, setCardData] = useState({
        email: "",
        phone: "",
        province: "",
        city: "",
        communicationChannel: "Instagram",
        consultationReason: "Accidente laboral",
        personalInjuries: 0,
        art: 1,
        seller: "",
        internalLawyer: "",
        externalLawyer: "",
    });
    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState('');
    const { user } = useAuth();

    useEffect(() => {
        const fetchCardData = async () => {
            try {
                const response = await axios.post('https://api.legalistas.com.ar/v1/crm', {
                    userId: user.user.id,
                });
                const opportunities = response.data;
                
                // Find the opportunity with the matching leadId
                const opportunity = opportunities.find(op => 
                    op.leads.some(lead => lead.leadId.toString() === currentFolder)
                );

                if (opportunity) {
                    const lead = opportunity.leads.find(lead => lead.leadId.toString() === currentFolder);
                    
                    // Update cardData with the retrieved data
                    setCardData({
                        email: lead.customerEmail,
                        phone: "3624558877", // Asignar el valor correcto si está disponible en la respuesta
                        province: lead.customerStateName.name,
                        city: lead.customerLocalityName.name,
                        communicationChannel: "Instagram", // Actualizar con el valor correcto si está disponible
                        consultationReason: "Accidente laboral", // Actualizar con el valor correcto si está disponible
                        personalInjuries: 0, // Actualizar con el valor correcto si está disponible
                        art: 1, // Actualizar con el valor correcto si está disponible
                        seller: lead.sellerName,
                        internalLawyer: lead.internalLawyerName,
                        externalLawyer: lead.externalLawyerName,
                    });
                }
            } catch (error) {
                console.error('Error fetching card data:', error);
            }
        };

        fetchCardData();
    }, [currentFolder, user]);

    const handleNoteChange = (e) => {
        setNewNote(e.target.value);
    };

    const handleAddNote = () => {
        if (newNote.trim() === '') return;

        const newNoteEntry = {
            text: newNote,
            timestamp: new Date().toLocaleString(),
        };

        setNotes([...notes, newNoteEntry]);
        setNewNote('');
    };

    return (
        <DefaultLayout>
            <div className='flex w-full h-full'>
                <div className="w-1/2 p-4">
                    <h1 className="text-xl font-bold">Detalles de la Tarjeta - ID: {currentFolder}</h1>
                    <div className="mb-5">
                        <label className="block font-medium text-black dark:text-white">Correo Electrónico</label>
                        <p className="text-black dark:text-white">{cardData.email}</p>
                    </div>
                    <div className="mb-5">
                        <label className="block font-medium text-black dark:text-white">Teléfono</label>
                        <p className="text-black dark:text-white">{cardData.phone}</p>
                    </div>
                    <div className="mb-5">
                        <label className="block font-medium text-black dark:text-white">Canal de Comunicación</label>
                        <p className="text-black dark:text-white">{cardData.communicationChannel}</p>
                    </div>
                    <div className="mb-5">
                        <label className="block font-medium text-black dark:text-white">Motivo de Consulta</label>
                        <p className="text-black dark:text-white">{cardData.consultationReason}</p>
                    </div>
                    <div className="mb-5">
                        <label className="block font-medium text-black dark:text-white">Vendedor</label>
                        <p className="text-black dark:text-white">{cardData.seller}</p>
                    </div>
                    <div className='flex w-full justify-between'>
                        <div className="mb-5 w-1/2">
                            <label className="block font-medium text-black dark:text-white">Abogado Interno</label>
                            <p className="text-black dark:text-white">{cardData.internalLawyer}</p>
                        </div>
                        <div className="mb-5 w-1/2">
                            <label className="block font-medium text-black dark:text-white">Abogado Externo</label>
                            <p className="text-black dark:text-white">{cardData.externalLawyer}</p>
                        </div>
                    </div>
                    <div className='flex w-full justify-between'>
                        <div className="mb-5 w-1/2">
                            <label className="block font-medium text-black dark:text-white">Provincia</label>
                            <p className="text-black dark:text-white">{cardData.province}</p>
                        </div>
                        <div className="mb-5 w-1/2">
                            <label className="block font-medium text-black dark:text-white">Ciudad</label>
                            <p className="text-black dark:text-white">{cardData.city}</p>
                        </div>
                    </div>
                    <div className='flex w-full justify-between'>
                        <div className="mb-5">
                            <label className="block font-medium text-black dark:text-white">¿En el accidente han ocurrido lesiones personales?</label>
                            <p className="text-black dark:text-white">{cardData.personalInjuries == 1 ? 'Sí' : 'No'}</p>
                        </div>
                        <div className="mb-5">
                            <label className="block font-medium text-black dark:text-white">ART</label>
                            <p className="text-black dark:text-white">{cardData.art == 1 ? 'Sí' : 'No'}</p>
                        </div>
                    </div>

                </div>
                <div className="w-1/2 p-4">
                    <h2 className="text-xl font-bold">Notas</h2>
                    <div className="mb-5">
                        {notes.map((note, index) => (
                            <div key={index} className="mb-2 p-2 border border-gray-300 rounded dark:border-gray-700">
                                <div className='flex items-center gap-2'>
                                    <Avatar name={user.user.profile.firstname} className="" />
                                    <h3>{user.user.profile.firstname}, {user.user.profile.lastname}</h3>
                                </div>
                                <p className="text-black dark:text-white">{note.text}</p>
                                <span className="text-sm text-gray-500 dark:text-gray-400">{note.timestamp}</span>
                            </div>
                        ))}
                    </div>
                    <div className="flex mt-4">
                        <textarea
                            className="w-full p-2 border border-gray-300 rounded dark:border-gray-700 dark:bg-boxdark dark:text-white"
                            placeholder="Agregar una nueva nota..."
                            value={newNote}
                            onChange={handleNoteChange}
                        ></textarea>
                        <button
                            className="ml-2 px-4 py-2 bg-primary text-white rounded"
                            onClick={handleAddNote}
                        >
                            Agregar Nota
                        </button>
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
}

export default Page;