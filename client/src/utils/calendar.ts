import { Meeting } from '../types';

export const downloadICSFile = (meeting: Meeting) => {
  const formatDate = (dateString: string) => {
    const d = new Date(dateString);
    return d.toISOString().replace(/-|:|\.\d+/g, '');
  };

  const start = formatDate(meeting.startTime);
  const end = formatDate(meeting.endTime);
  const now = formatDate(new Date().toISOString());

  const meetingUrl = `${window.location.origin}/meetings/room/${meeting.meetingRoomId}`;

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//IntellMeet//Meeting Platform//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:intellimeet-${meeting._id}@intellimeet.com`,
    `DTSTAMP:${now}`,
    `DTSTART:${start}`,
    `DTEND:${end}`,
    `SUMMARY:${meeting.title}`,
    `DESCRIPTION:${meeting.description || 'IntellMeet Video Conference'}\\nJoin link: ${meetingUrl}`,
    `URL:${meetingUrl}`,
    `LOCATION:${meeting.platform} - ${meetingUrl}`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.setAttribute('download', `${meeting.title.replace(/[^a-zA-Z0-9]/g, '_')}.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
