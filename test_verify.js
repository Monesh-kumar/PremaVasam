(async () => {
  const assert = (cond, msg) => {
    if (!cond) throw new Error('Assertion failed: ' + msg);
    console.log('✅ ' + msg);
  };

  const BASE = 'http://127.0.0.1:3000';

  // 1. Home page check
  const homeRes = await fetch(BASE + '/');
  assert(homeRes.status === 200, 'Home page returns HTTP 200');
  const homeHtml = await homeRes.text();
  assert(homeHtml.includes('Where Every Child Finds') && homeHtml.includes('Love, Dignity'), 'Home contains required headline');
  assert(!homeHtml.includes('href="/admin"') && !homeHtml.includes('href="/admin.html"'), 'Home page contains NO admin links');

  // 2. Admin page check
  const adminRes = await fetch(BASE + '/admin.html');
  assert(adminRes.status === 200, 'Admin page returns HTTP 200');
  const adminHtml = await adminRes.text();
  assert(adminHtml.includes('Admin Management Portal'), 'Admin contains Admin Management Portal');

  // 3. Admin login with admin / premavasam1999
  const loginRes = await fetch(BASE + '/api/admin/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: 'admin', password: 'premavasam1999' })
  });
  assert(loginRes.status === 200, 'Admin login HTTP 200');
  const loginData = await loginRes.json();
  assert(loginData.ok && loginData.token, 'Admin login returned valid token');
  const token = loginData.token;

  // 4. Verify session
  const verifyRes = await fetch(BASE + '/api/admin/verify', {
    headers: { 'Authorization': 'Bearer ' + token }
  });
  const verifyData = await verifyRes.json();
  assert(verifyData.ok && verifyData.admin.username === 'admin', 'Admin session verified');

  // 5. Dashboard Stats
  const statsRes = await fetch(BASE + '/api/admin/dashboard-stats', {
    headers: { 'Authorization': 'Bearer ' + token }
  });
  const statsData = await statsRes.json();
  assert(statsData.ok && typeof statsData.stats.totalFunds === 'number', 'Dashboard stats returned successfully');
  console.log('   Stats:', JSON.stringify(statsData.stats));

  // 6. Public Meals Booking
  const mealBookRes = await fetch(BASE + '/api/meals/book', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      sponsor_name: 'Suresh Kumar',
      sponsor_phone: '+91 98401 55667',
      sponsor_email: 'suresh.k@example.com',
      sponsor_date: '2026-11-20',
      occasion: 'Daughter\'s 5th Birthday',
      selected_items: 'Lunch with Vadai & Payasam, Ice Cream',
      total_amount: 11000,
      notes: 'Please arrange balloons if possible'
    })
  });
  const mealBookData = await mealBookRes.json();
  assert(mealBookData.ok && mealBookData.booking.id, 'Meal reservation created with ID ' + mealBookData.booking?.id);
  const createdMealId = mealBookData.booking.id;

  // 7. Update meal status via admin
  const mealUpdateRes = await fetch(BASE + '/api/admin/meals', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    body: JSON.stringify({ id: createdMealId, payment_status: 'confirmed' })
  });
  const mealUpdateData = await mealUpdateRes.json();
  assert(mealUpdateData.ok, 'Meal status updated to confirmed');

  // 8. Public Donation Record
  const donRes = await fetch(BASE + '/api/donations/record', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      donor_name: 'Anand Ramanathan',
      donor_email: 'anand.r@example.com',
      donor_phone: '+91 99620 44332',
      pan_number: 'ABCDE1234F',
      amount: 15000,
      transfer_type: 'Bank Transfer (IMPS)',
      reference_number: 'IMPS26102399881',
      notes: 'General fund for child medical care'
    })
  });
  const donData = await donRes.json();
  assert(donData.ok && donData.donation.id, 'Donation recorded with ID ' + donData.donation?.id);

  // 9. Public Volunteer Application
  const volRes = await fetch(BASE + '/api/volunteers/apply', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      full_name: 'Pooja Sundaram',
      phone: '+91 98840 11223',
      email: 'pooja.s@example.com',
      skills: 'Occupational Therapy & Sensory Integration',
      message: 'OT graduate willing to provide 4 hours weekly.'
    })
  });
  const volData = await volRes.json();
  assert(volData.ok && volData.volunteer.id, 'Volunteer application submitted with ID ' + volData.volunteer?.id);

  // 10. Public Contact Message
  const contRes = await fetch(BASE + '/api/contacts/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Ramesh Krishnan',
      email: 'ramesh.k@example.com',
      subject: 'Stationery Donation',
      message: 'We have 200 notebooks and drawing kits to donate. Can we bring them on Sunday?'
    })
  });
  const contData = await contRes.json();
  assert(contData.ok && contData.contact.id, 'Contact message sent with ID ' + contData.contact?.id);

  // 11. CSV Export
  const csvRes = await fetch(BASE + '/api/admin/export-csv?type=meals', {
    headers: { 'Authorization': 'Bearer ' + token }
  });
  assert(csvRes.status === 200, 'Meals CSV export returned HTTP 200');
  const csvText = await csvRes.text();
  assert(csvText.includes('Booking ID') && csvText.includes('Suresh Kumar'), 'CSV contains headers and new booking');

  console.log('\n🌟 ALL 11 VERIFICATION TESTS PASSED SUCCESSFULLY! 🌟');
})().catch(err => {
  console.error('❌ Verification failed:', err);
  process.exit(1);
});
