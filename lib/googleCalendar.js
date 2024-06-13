import axios from 'axios';

export const getGoogleCalendarEvents = async (accessToken) => {
  try {
    const response = await axios.get('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data.items;
  } catch (error) {
    console.error('Error fetching Google Calendar events:', error);
    return [];
  }
};

export const createGoogleCalendarEvent = async (accessToken, event) => {
  try {
    const response = await axios.post('https://www.googleapis.com/calendar/v3/calendars/primary/events', event, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating Google Calendar event:', error);
    return null;
  }
};
