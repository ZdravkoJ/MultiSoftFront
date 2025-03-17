import React from "react";
import { Card, Container } from "react-bootstrap";
import { Helmet } from "react-helmet-async";

import FullCalendar from "@fullcalendar/react";
import srLocale from "@fullcalendar/core/locales/sr";
import bootstrapPlugin from "@fullcalendar/bootstrap";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useTranslation } from "react-i18next";
import { format } from "date-fns";

const Calendar = () => {
  const { t } = useTranslation();

  const currentDate = new Date();
  const formattedDate = format(currentDate, "yyyy-MM-dd");
  // const testing = (info: EventClickArg) => {
  //   console.log("testing, info: ", info.value);
  // };

  const demoEvents = [
    {
      title: "All Day Event",
      start: formattedDate,
      url: "https://www.google.com",
    },
    {
      title: "Long Event",
      start: formattedDate,
      end: formattedDate,
    },
    {
      groupId: "999",
      title: "Repeating Event",
      start: formattedDate,
    },
    {
      groupId: "999",
      title: "Repeating Event",
      start: formattedDate,
    },
    {
      title: "Conference",
      start: formattedDate,
      end: formattedDate,
    },
    {
      title: "Meeting",
      start: formattedDate,
      end: formattedDate,
    },
  ];

  return (
    <React.Fragment>
      <Helmet title="Calendar" />
      <Container fluid className="p-0">
        <h1 className="h3 mb-3">Calendar</h1>

        <Card>
          <Card.Header>
            <Card.Title>{t("Calendar")}</Card.Title>
            <h6 className="card-subtitle text-muted"></h6>
          </Card.Header>
          <Card.Body>
            <FullCalendar
              locale={srLocale}
              headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,timeGridWeek,timeGridDay",
              }}
              editable={true}
              selectable={true}
              plugins={[bootstrapPlugin, dayGridPlugin, timeGridPlugin]}
              initialDate={currentDate}
              themeSystem="bootstrap"
              initialView="dayGridMonth"
              events={demoEvents}
              bootstrapFontAwesome={false}
              eventColor="#378006"
              eventBorderColor="#000000"
            />
          </Card.Body>
        </Card>
      </Container>
    </React.Fragment>
  );
};

export default Calendar;
