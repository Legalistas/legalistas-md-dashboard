"use client"

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin, { Draggable, DropArg } from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import { useEffect, useState } from 'react'
import { Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Input, useDisclosure } from "@nextui-org/react";
import { signIn, useSession } from "next-auth/react";

const CalendarPage = () => {
  const { data: session } = useSession();
  const [idToDelete, setIdToDelete] = useState(null);
  const [hoverEvent, setHoverEvent] = useState(null);
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
    end: '',
    allDay: false,
    id: 0
  });
  const [createdEvent, setCreatedEvent] = useState(null);

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
    if (session) {
      fetchEvents();
    }
  }, [session]);

  const fetchEvents = async () => {
    try {
      const res = await fetch("/api/get-events");
      if (res.ok) {
        const events = await res.json();
        const formattedEvents = events.map(event => ({
          title: event.summary,
          start: event.start.dateTime || event.start.date,
          end: event.end.dateTime || event.end.date,
          id: event.id
        }));
        setAllEvents(formattedEvents);
      } else {
        console.error("Failed to fetch events");
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  function handleDateClick(arg) {
    const startDate = new Date(arg.date);
    startDate.setMinutes(startDate.getMinutes() - startDate.getTimezoneOffset()); // Ajustar la zona horaria
    const formattedDate = startDate.toISOString().slice(0, 16); // Formato datetime-local
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 1); // Añadir un día para la fecha de finalización
    const formattedEndDate = endDate.toISOString().slice(0, 16); // Formato datetime-local
    new Date().toISOString().substring(0, 16) + 1
    setNewEvent({
      ...newEvent,
      start: formattedDate,
      end: formattedEndDate,
      allDay: arg.allDay,
      id: new Date().getTime().toString()
    });
    openModal();
    setCreatedEvent(newEvent);
  }

  async function addEventToGoogleCalendar(event) {
    if (!session) {
      signIn("google");
      return;
    }

    try {
      const res = await fetch("/api/add-event", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          summary: event.title,
          description: '',
          start: event.start,
          end: event.end
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to add event to Google Calendar");
      }
    } catch (error) {
      console.error("Error adding event to Google Calendar:", error);
    }
  }

  function addEvent(data) {
    console.log(data);
    const event = {
      ...newEvent,
      start: data.date.toISOString(),
      title: data.draggedEl.innerText,
      allDay: data.allDay,
      id: new Date().getTime().toString()
    };
    setAllEvents([...allEvents, event]);
  }

  function handleDeleteModal(data) {
    openDeleteModal();
    setIdToDelete(data.event.id);
  }

  function handleDelete() {
    const arrayWithoutId = allEvents.filter(event => event.id !== idToDelete);
    setAllEvents(arrayWithoutId);
    closeDeleteModal();
    setIdToDelete(null);
  }

  const handleChange = (e) => {
    setNewEvent({
      ...newEvent,
      title: e.target.value
    });
  }

  const handleDateChange = (e) => {
    setNewEvent({
      ...newEvent,
      [e.target.name]: e.target.value
    });
  }

  const handleChangeDate = (e) => {
    const { days, months, years } = e.endDelta;
    const eventToUpdate = allEvents.find(event => event.id === hoverEvent);
    if (eventToUpdate) {
      const newEndDate = new Date(eventToUpdate.end);
      newEndDate.setDate(newEndDate.getDate() + days);
      newEndDate.setMonth(newEndDate.getMonth() + months);
      newEndDate.setFullYear(newEndDate.getFullYear() + years);
      const updatedEvent = { ...eventToUpdate, end: newEndDate.toISOString().substring(0, 16) };
      setAllEvents(allEvents.map(event => event.id === hoverEvent ? updatedEvent : event));
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const updatedEndDate = new Date(newEvent.end);
    updatedEndDate.setDate(updatedEndDate.getDate() + 1); // Sumar un día a la fecha de finalización

    const updatedEvent = {
      ...newEvent,
      end: updatedEndDate.toISOString().slice(0, 16)
    };

    setAllEvents([...allEvents, updatedEvent]);
    closeModal();
    setNewEvent({
      title: '',
      start: '',
      end: '',
      allDay: false,
      id: 0
    });

    // Agregar evento a Google Calendar
    await addEventToGoogleCalendar(updatedEvent);
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
              eventResize={(data) => handleChangeDate(data)}
              eventMouseEnter={(data) => setHoverEvent(data.event._def.publicId)}
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
                  <Input
                    fullWidth
                    bordered
                    label="Start Date"
                    type="datetime-local"
                    name="start"
                    value={newEvent.start}
                    onChange={handleDateChange}
                  />
                  <Input
                    fullWidth
                    bordered
                    label="End Date"
                    type="datetime-local"
                    name="end"
                    value={newEvent.end}
                    onChange={handleDateChange}
                  />
                </ModalBody>
                <ModalFooter>
                  <Button auto onPress={handleSubmit} disabled={newEvent.title === '' || newEvent.start === '' || newEvent.end === ''}>
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
