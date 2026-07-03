// ===== BOOKING FORM HANDLER =====
function showBookingMessage(text, isError) {
    let msgDiv = document.getElementById('bookingStatusMsg');
    if (!msgDiv) return;
    msgDiv.className = isError ? 'msg-error' : 'msg-success';
    msgDiv.innerHTML = text;
    msgDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function storeBooking() {
    let fullName = document.getElementById('fullName').value.trim();
    let email = document.getElementById('emailAddr').value.trim();
    let phone = document.getElementById('phoneNum').value.trim();
    let service = document.getElementById('serviceChoice').value;
    let date = document.getElementById('sessionDate').value;
    let time = document.getElementById('timeSlot').value;
    let notes = document.getElementById('notes').value.trim();

    if (!fullName) { showBookingMessage('❌ Please enter your full name.', true); return false; }
    if (!email || email.indexOf('@') === -1) { showBookingMessage('❌ Please enter a valid email address.', true); return false; }
    if (!service) { showBookingMessage('❌ Please select a shaving service.', true); return false; }
    if (!date) { showBookingMessage('❌ Please select a preferred date.', true); return false; }

    let today = new Date().toISOString().split('T')[0];
    if (date < today) { showBookingMessage('❌ Please select today or a future date.', true); return false; }

    let booking = { 
        id: Date.now(), 
        fullName, 
        email, 
        phone, 
        service, 
        date, 
        timeSlot: time, 
        notes, 
        timestamp: new Date().toISOString() 
    };
    
    let bookings = JSON.parse(localStorage.getItem('barber_shaving_bookings') || '[]');
    bookings.push(booking);
    localStorage.setItem('barber_shaving_bookings', JSON.stringify(bookings));

    showBookingMessage(`✅ Booking confirmed! Thank you ${fullName}. Your ${service} is scheduled on ${date} at ${time}. Confirmation sent to ${email}.`, false);
    
    document.getElementById('fullName').value = '';
    document.getElementById('emailAddr').value = '';
    document.getElementById('phoneNum').value = '';
    document.getElementById('notes').value = '';
    document.getElementById('serviceChoice').selectedIndex = 0;
    document.getElementById('sessionDate').value = '';
    return false;
}

// ===== CONTACT FORM HANDLER =====
function showContactMessage(text, isError) {
    let msgDiv = document.getElementById('contactStatusMsg');
    if (!msgDiv) return;
    msgDiv.className = isError ? 'msg-error' : 'msg-success';
    msgDiv.innerHTML = text;
    msgDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function storeContactMessage() {
    let name = document.getElementById('contactName').value.trim();
    let email = document.getElementById('contactEmail').value.trim();
    let subject = document.getElementById('contactSubject').value.trim();
    let message = document.getElementById('contactMsg').value.trim();

    if (!name) { showContactMessage('❌ Please provide your name.', true); return false; }
    if (!email || email.indexOf('@') === -1) { showContactMessage('❌ Please provide a valid email address.', true); return false; }
    if (!message) { showContactMessage('❌ Please write your message.', true); return false; }

    let inquiry = { 
        id: Date.now(), 
        name, 
        email, 
        subject: subject || 'General inquiry', 
        message, 
        date: new Date().toISOString() 
    };
    
    let messages = JSON.parse(localStorage.getItem('barber_contact_messages') || '[]');
    messages.push(inquiry);
    localStorage.setItem('barber_contact_messages', JSON.stringify(messages));

    showContactMessage(`📩 Thanks ${name}! Your message has been received. Our barber will answer within 24 hours.`, false);
    document.getElementById('contactName').value = '';
    document.getElementById('contactEmail').value = '';
    document.getElementById('contactSubject').value = '';
    document.getElementById('contactMsg').value = '';
    return false;
}

// ===== SET MIN DATE FOR DATE INPUT =====
window.onload = function() {
    let datePicker = document.getElementById('sessionDate');
    if (datePicker) {
        let today = new Date().toISOString().split('T')[0];
        datePicker.setAttribute('min', today);
    }
};