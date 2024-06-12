"use client"

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin, { Draggable, DropArg } from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import { useEffect, useState } from 'react'
import { Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Input, useDisclosure } from "@nextui-org/react";

const CalendarPage = () => {
    const [idToDelete, setIdToDelete] = useState(null);
    const [events, setEvents] = useState([
        { title: 'event 1', id: '1' },
        { title: 'event 2', id: '2' },
        { title: 'event 3', id: '3' },
        { title: 'event 4', id: '4' },
        { title: 'event 5', id: '5' },
    ]);
    const [allEvents, setAllEvents] = useState([]);
    const [newEvent, setNewEvent] = useState({
        title: '',
        start: '',
        allDay: false,
        id: 0
    });

    const { isOpen: showModal, onOpen: openModal, onClose: closeModal } = useDisclosure();
    const { isOpen: showDeleteModal, onOpen: openDeleteModal, onClose: closeDeleteModal } = useDisclosure();

    useEffect(() => {
        let draggableEl = document.getElementById('draggable-el');
        if (draggableEl) {
            new Draggable(draggableEl, {
                itemSelector: ".fc-event",
                eventData: function (eventEl) {
                    let title = eventEl.getAttribute("title");
                    let id = eventEl.getAttribute("data");
                    let start = eventEl.getAttribute("start");
                    return { title, id, start };
                }
            });
        }
    }, []);

    useEffect(() => {
        console.log(allEvents);
    }, [allEvents]);

    function handleDateClick(arg) {
        setNewEvent({ ...newEvent, start: arg.date, allDay: arg.allDay, id: new Date().getTime().toString() });
        openModal();
    }

    function addEvent(data) {
        const event = { ...newEvent, start: data.date.toISOString(), title: data.draggedEl.innerText, allDay: data.allDay, id: new Date().getTime().toString() };
        setAllEvents([...allEvents, event]);
    }

    function handleDeleteModal(data) {
        openDeleteModal();
        setIdToDelete(data.event.id);
    }

    function handleDelete() {
        const arrayWithoutId = allEvents.filter(event => event.id !== idToDelete);
        console.log("Deleting event with ID:", idToDelete);
        console.log("New events array:", arrayWithoutId);
        setAllEvents(arrayWithoutId);
        closeDeleteModal();
        setIdToDelete(null);
    }

    function handleCloseModal() {
        closeModal();
        setNewEvent({
            title: '',
            start: '',
            allDay: false,
            id: 0
        });
        closeDeleteModal();
        setIdToDelete(null);
    }

    const handleChange = (e) => {
        setNewEvent({
            ...newEvent,
            title: e.target.value
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
        setAllEvents([...allEvents, newEvent]);
        closeModal();
        setNewEvent({
            title: '',
            start: '',
            allDay: false,
            id: 0
        });
    }

    return (
        <DefaultLayout>
            <nav className="flex justify-between mb-12 border-b border-violet-100 p-4">
                <h1 className="font-bold text-2xl text-gray-700">Calendar</h1>
            </nav>
            <main className="flex min-h-screen flex-col items-center justify-between p-24">
                <div className="grid grid-cols-10">
                    <div className="col-span-8">
                        <FullCalendar
                            plugins={[
                                dayGridPlugin,
                                interactionPlugin,
                                timeGridPlugin
                            ]}
                            headerToolbar={{
                                left: 'prev,next today',
                                center: 'title',
                                right: 'dayGridMonth,timeGridWeek'
                            }}
                            events={allEvents}
                            nowIndicator={true}
                            editable={true}
                            droppable={true}
                            selectable={true}
                            selectMirror={true}
                            dateClick={handleDateClick}
                            drop={(data) => addEvent(data)}
                            eventClick={(data) => handleDeleteModal(data)}
                        />
                    </div>
                    <div id="draggable-el" className="ml-8 w-full border-2 p-2 rounded-md mt-16 lg:h-1/2 bg-violet-50">
                        <h1 className="font-bold text-lg text-center">Drag Event</h1>
                        {events.map(event => (
                            <div
                                className="fc-event border-2 p-1 m-2 w-full rounded-md ml-auto text-center bg-white"
                                title={event.title}
                                key={event.id}
                                data={event.id}
                            >
                                {event.title}
                            </div>
                        ))}
                    </div>
                </div>

                <Modal backdrop="opaque" isOpen={showDeleteModal} onClose={closeDeleteModal}>
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1">Delete Event</ModalHeader>
                                <ModalBody>
                                    <h2>Are you sure you want to delete this event?</h2>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="danger" variant="light" onPress={handleDelete}>
                                        Delete
                                    </Button>
                                    <Button color="primary" onPress={onClose}>
                                        Cancel
                                    </Button>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </Modal>

                <Modal backdrop="opaque" isOpen={showModal} onClose={closeModal}>
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1">Add Event</ModalHeader>
                                <ModalBody>
                                    <Input
                                        fullWidth
                                        clearable
                                        bordered
                                        label="Title"
                                        value={newEvent.title}
                                        onChange={handleChange}
                                    />
                                </ModalBody>
                                <ModalFooter>
                                    <Button auto onPress={handleSubmit} disabled={newEvent.title === ''}>
                                        Create
                                    </Button>
                                    <Button auto flat onPress={onClose}>
                                        Cancel
                                    </Button>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </Modal>
            </main>
        </DefaultLayout>
    );
};

export default CalendarPage;
