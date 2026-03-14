import React, { useState } from 'react';
import './AcademicCalendar.css';

const AcademicCalendar = ({ events = [] }) => {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 2, 14)); // March 14, 2026
  const [selectedDate, setSelectedDate] = useState(null);

  // Mock academic events
  const mockEvents = [
    { date: '2026-03-15', title: 'Midterm Exams Begin', type: 'exam', color: '#ff6b6b' },
    { date: '2026-03-20', title: 'Spring Break Starts', type: 'holiday', color: '#4ecdc4' },
    { date: '2026-03-27', title: 'Spring Break Ends', type: 'holiday', color: '#4ecdc4' },
    { date: '2026-03-28', title: 'Classes Resume', type: 'important', color: '#45b7d1' },
    { date: '2026-04-01', title: 'Assignment Due: Capstone Proposal', type: 'deadline', color: '#f7b731' },
    { date: '2026-04-10', title: 'Lab Practical Exam', type: 'exam', color: '#ff6b6b' },
    { date: '2026-04-15', title: 'Faculty Development Day', type: 'holiday', color: '#4ecdc4' },
    { date: '2026-04-20', title: 'Project Presentation Day', type: 'event', color: '#5f27cd' },
    { date: '2026-05-01', title: 'Last Day of Classes', type: 'important', color: '#45b7d1' },
    { date: '2026-05-05', title: 'Final Exams Begin', type: 'exam', color: '#ff6b6b' },
    { date: '2026-05-22', title: 'Final Exams End', type: 'exam', color: '#ff6b6b' },
    { date: '2026-06-01', title: 'Summer Break Begins', type: 'holiday', color: '#4ecdc4' },
  ];

  const getEventsForDate = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    return mockEvents.filter(event => event.date === dateStr);
  };

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  const days = [];

  // Empty cells for days before month starts
  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }

  // Days of the month
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(new Date(currentDate.getFullYear(), currentDate.getMonth(), i));
  }

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const selectedDateEvents = selectedDate ? getEventsForDate(selectedDate) : [];

  return (
    <div className="academic-calendar">
      <div className="calendar-container">
        {/* Calendar View */}
        <div className="calendar-main">
          <div className="calendar-header">
            <button className="nav-btn" onClick={handlePrevMonth}>←</button>
            <h3>{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</h3>
            <button className="nav-btn" onClick={handleNextMonth}>→</button>
          </div>

          <div className="calendar-weekdays">
            <div className="weekday">Sun</div>
            <div className="weekday">Mon</div>
            <div className="weekday">Tue</div>
            <div className="weekday">Wed</div>
            <div className="weekday">Thu</div>
            <div className="weekday">Fri</div>
            <div className="weekday">Sat</div>
          </div>

          <div className="calendar-days">
            {days.map((day, index) => {
              if (!day) {
                return <div key={`empty-${index}`} className="calendar-day empty"></div>;
              }

              const dayEvents = getEventsForDate(day);
              const isSelected = selectedDate && day.toDateString() === selectedDate.toDateString();
              const isToday = day.toDateString() === new Date().toDateString();

              return (
                <div
                  key={day.toISOString()}
                  className={`calendar-day ${isToday ? 'today' : ''} ${isSelected ? 'selected' : ''} ${dayEvents.length > 0 ? 'has-events' : ''}`}
                  onClick={() => setSelectedDate(day)}
                >
                  <div className="day-number">{day.getDate()}</div>
                  {dayEvents.length > 0 && (
                    <div className="event-indicators">
                      {dayEvents.slice(0, 2).map((event, idx) => (
                        <div key={idx} className="event-dot" style={{ backgroundColor: event.color }}></div>
                      ))}
                      {dayEvents.length > 2 && <div className="event-dot-more">+</div>}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Events Sidebar */}
        <div className="calendar-sidebar">
          <div className="sidebar-header">
            <h4>
              {selectedDate 
                ? selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
                : 'Select a Date'}
            </h4>
          </div>

          {selectedDate && selectedDateEvents.length > 0 ? (
            <div className="events-list">
              {selectedDateEvents.map((event, idx) => (
                <div key={idx} className="event-item" style={{ borderLeftColor: event.color }}>
                  <div className="event-type-badge" style={{ backgroundColor: event.color }}>
                    {event.type}
                  </div>
                  <div className="event-title">{event.title}</div>
                </div>
              ))}
            </div>
          ) : selectedDate ? (
            <div className="no-events">No events scheduled</div>
          ) : (
            <div className="no-events">Click on a date to view events</div>
          )}

          {/* Legend */}
          <div className="calendar-legend">
            <h5>Legend</h5>
            <div className="legend-item">
              <span className="legend-color" style={{ backgroundColor: '#ff6b6b' }}></span>
              <span>Exams</span>
            </div>
            <div className="legend-item">
              <span className="legend-color" style={{ backgroundColor: '#4ecdc4' }}></span>
              <span>Holidays</span>
            </div>
            <div className="legend-item">
              <span className="legend-color" style={{ backgroundColor: '#45b7d1' }}></span>
              <span>Important</span>
            </div>
            <div className="legend-item">
              <span className="legend-color" style={{ backgroundColor: '#f7b731' }}></span>
              <span>Deadlines</span>
            </div>
            <div className="legend-item">
              <span className="legend-color" style={{ backgroundColor: '#5f27cd' }}></span>
              <span>Events</span>
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Events Section */}
      <div className="upcoming-events">
        <h4>Upcoming Events</h4>
        <div className="upcoming-list">
          {mockEvents
            .filter(event => new Date(event.date) >= new Date())
            .sort((a, b) => new Date(a.date) - new Date(b.date))
            .slice(0, 5)
            .map((event, idx) => (
              <div key={idx} className="upcoming-item">
                <div className="upcoming-date">
                  {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </div>
                <div className="upcoming-event">
                  <div className="upcoming-title">{event.title}</div>
                  <div className="upcoming-type" style={{ color: event.color }}>
                    {event.type}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default AcademicCalendar;
