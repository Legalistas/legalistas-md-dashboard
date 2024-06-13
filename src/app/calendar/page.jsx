"use client";

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { Draggable, DropArg } from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Input, useDisclosure } from "@nextui-org/react";
import { getGoogleCalendarEvents, createGoogleCalendarEvent } from '@/../lib/googleCalendar'; // Ajusta la ruta según tu estructura

const CalendarPage = () => {
  const { data: session } = useSession();
  const [idToDelete, setIdToDelete] = useState(null);
  const [hoverEvent, setHoverEvent] = useState(null);
  const [events, setEvents] = useState([]);
  const [allEvents, setAllEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    title: '',
    start: '',
    end: '',
    allDay: false,
    id: 0
  });

  const { isOpen: showModal, onOpen: openModal, onClose: closeModal } = useDisclosure();
  const { isOpen: showDeleteModal, onOpen: openDeleteModal, onClose: closeDeleteModal } = useDisclosure();

  useEffect(() => {
    if (session) {
      fetchEvents(session.accessToken);
    }
  }, [session]);

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
      fetchGoogleCalendarEvents();
    }
  }, [session]);

  const fetchGoogleCalendarEvents = async () => {
    try {
      const data = await getGoogleCalendarEvents(session.accessToken);
      const formattedEvents = data.map(event => ({
        id: event.id,
        title: event.summary,
        start: event.start.dateTime || event.start.date,
        end: event.end.dateTime || event.end.date,
        allDay: !event.start.dateTime,
      }));
      setAllEvents(formattedEvents);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const fetchEvents = async (accessToken) => {
    const events = await getGoogleCalendarEvents(accessToken);
    setAllEvents(events.map(event => ({
      id: event.id,
      title: event.summary,
      start: event.start.dateTime || event.start.date,
      end: event.end.dateTime || event.end.date,
      allDay: !event.start.dateTime,
    })));
  };

  const handleDateClick = (arg) => {
    const startDate = new Date(arg.date);
    startDate.setMinutes(startDate.getMinutes() - startDate.getTimezoneOffset());
    const formattedDate = startDate.toISOString().slice(0, 16);
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 1);
    const formattedEndDate = endDate.toISOString().slice(0, 16);
    setNewEvent({
      ...newEvent,
      start: formattedDate,
      end: formattedEndDate,
      allDay: arg.allDay,
      id: new Date().getTime().toString()
    });
    openModal();
  };

  const handleSubmit = async () => {
    const newEvent = {
      summary: newEvent.title,
      start: {
        dateTime: newEvent.start,
        timeZone: 'America/New_York' // Ajusta esto según tu zona horaria
      },
      end: {
        dateTime: newEvent.end,
        timeZone: 'America/New_York'
      }
    };
  
    if (session) {
      const createdEvent = await createGoogleCalendarEvent(session.accessToken, newEvent);
      if (createdEvent) {
        setAllEvents([...allEvents, {
          id: createdEvent.id,
          title: createdEvent.summary,
          start: createdEvent.start.dateTime || createdEvent.start.date,
          end: createdEvent.end.dateTime || createdEvent.end.date,
          allDay: !createdEvent.start.dateTime,
        }]);
        closeModal();
      }
    }
  };

  const handleDateChange = (e) => {
    setNewEvent({
      ...newEvent,
      [e.target.name]: e.target.value
    });
  }

  const handleChange = (e) => {
    setNewEvent({
      ...newEvent,
      title: e.target.value
    });
  }
  // ...

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
